
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { responseId, answers, contactInfo } = await req.json();
    
    console.log('Processing AI assessment for:', contactInfo.email);

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get the prompt template from the public directory
    let promptTemplate = `You are an AI business consultant analyzing a company's readiness for AI transformation. Based on the assessment responses below, provide a personalized, professional analysis that positions the business for AI success.

Assessment Responses:
- Biggest business challenge: [Q1_ANSWER]
- Biggest time waste: [Q2_ANSWER]
- Annual revenue: [Q3_ANSWER]
- Implementation timeline: [Q4_ANSWER]
- Investment priority: [Q5_ANSWER]
- Leadership readiness: [Q6_ANSWER]

Provide a response that:
1. Acknowledges their specific situation and challenges
2. Identifies 2-3 key AI opportunities based on their responses
3. Gives them a sense of where they stand compared to industry peers
4. Creates urgency around AI adoption timing
5. Positions JOURN3Y as the right partner to help

Keep the tone professional, insightful, and consultative. Limit response to 250 words maximum.`;

    try {
      // Get the origin from the request headers to construct the full URL
      const origin = req.headers.get('origin') || req.headers.get('referer')?.split('/').slice(0, 3).join('/') || 'https://journ3y.com.au';
      const promptUrl = `${origin}/prompt-template.txt`;
      console.log('Fetching prompt from:', promptUrl);
      
      const response = await fetch(promptUrl);
      if (response.ok) {
        promptTemplate = await response.text();
        console.log('Successfully loaded prompt template from public directory');
      } else {
        console.log('Failed to fetch prompt template, using fallback. Status:', response.status);
      }
    } catch (error) {
      console.log('Error fetching prompt template, using fallback:', error);
    }

    // Replace placeholders with actual answers and contact info
    const finalPrompt = promptTemplate
      .replace(/\[FIRST_NAME\]/g, contactInfo.first_name)
      .replace(/\[COMPANY_NAME\]/g, contactInfo.company_name)
      .replace(/\[Q1_ANSWER\]/g, answers.q1_business_challenge)
      .replace(/\[Q2_ANSWER\]/g, answers.q2_time_waste)
      .replace(/\[Q3_ANSWER\]/g, answers.q3_revenue)
      .replace(/\[Q4_ANSWER\]/g, answers.q4_timeline)
      .replace(/\[Q5_ANSWER\]/g, answers.q5_investment_priority)
      .replace(/\[Q6_ANSWER\]/g, answers.q6_leadership_readiness);

    let aiAssessment = '';
    let rawResponse = '';

    // Try to generate AI assessment with Anthropic
    const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
    if (anthropicApiKey) {
      try {
        const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicApiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-5-haiku-20241022',
            max_tokens: 1000,
            messages: [
              {
                role: 'user',
                content: finalPrompt
              }
            ]
          })
        });

        if (anthropicResponse.ok) {
          const data = await anthropicResponse.json();
          rawResponse = JSON.stringify(data);
          aiAssessment = data.content[0].text;
        } else {
          throw new Error(`Anthropic API error: ${anthropicResponse.status}`);
        }
      } catch (error) {
        console.error('Anthropic API error:', error);
        // Fall back to default assessment
        aiAssessment = generateFallbackAssessment(answers, contactInfo);
        rawResponse = 'Fallback assessment used due to API error';
      }
    } else {
      // No API key, use fallback
      aiAssessment = generateFallbackAssessment(answers, contactInfo);
      rawResponse = 'No API key configured - fallback assessment used';
    }

    // Update the assessment response with the result, prompt, and raw response
    const { error: updateError } = await supabase
      .from('assessment_responses')
      .update({
        ai_assessment_result: aiAssessment,
        ai_generation_status: 'completed',
        ai_prompt_used: finalPrompt,
        ai_raw_response: rawResponse
      })
      .eq('id', responseId);

    if (updateError) {
      console.error('Error updating assessment:', updateError);
      throw updateError;
    }

    console.log('AI assessment generated successfully');

    // Create campaign lead
    const { data: leadData, error: leadError } = await supabase.rpc(
      'create_campaign_lead_from_assessment',
      { assessment_response_id: responseId }
    );

    if (leadError) {
      console.error('Error creating campaign lead:', leadError);
    } else {
      console.log('Campaign lead created:', leadData);
    }

    // Send confirmation emails
    try {
      const { data: userEmailData, error: userEmailError } = await supabase.functions.invoke(
        'send-contact-email',
        {
          body: {
            to: contactInfo.email,
            subject: `Your AI Readiness Assessment Results - ${contactInfo.company_name}`,
            html: `
              <h2>Thank you for completing the AI Readiness Assessment!</h2>
              <p>Hi ${contactInfo.first_name},</p>
              <p>Your personalized AI readiness assessment has been completed. Here are your results:</p>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                ${aiAssessment.replace(/\n/g, '<br>')}
              </div>
              <p>Ready to take the next step? Book a complimentary strategy call with our AI transformation experts:</p>
              <p><a href="https://calendly.com/journ3y" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Book Strategy Call</a></p>
              <p>Best regards,<br>The JOURN3Y Team</p>
            `
          }
        }
      );

      console.log('User email sent:', { data: userEmailData, error: userEmailError });

      // Send admin notification
      const { data: adminEmailData, error: adminEmailError } = await supabase.functions.invoke(
        'send-contact-email',
        {
          body: {
            to: 'hello@journ3y.com.au',
            subject: `New AI Assessment Completed - ${contactInfo.company_name}`,
            html: `
              <h2>New AI Assessment Completed</h2>
              <p><strong>Contact:</strong> ${contactInfo.first_name} ${contactInfo.last_name}</p>
              <p><strong>Company:</strong> ${contactInfo.company_name}</p>
              <p><strong>Email:</strong> ${contactInfo.email}</p>
              <p><strong>Phone:</strong> ${contactInfo.phone_number || 'Not provided'}</p>
              <h3>Assessment Responses:</h3>
              <ul>
                <li><strong>Business Challenge:</strong> ${answers.q1_business_challenge}</li>
                <li><strong>Time Waste:</strong> ${answers.q2_time_waste}</li>
                <li><strong>Revenue:</strong> ${answers.q3_revenue}</li>
                <li><strong>Timeline:</strong> ${answers.q4_timeline}</li>
                <li><strong>Investment Priority:</strong> ${answers.q5_investment_priority}</li>
                <li><strong>Leadership Readiness:</strong> ${answers.q6_leadership_readiness}</li>
              </ul>
              <h3>Generated Assessment:</h3>
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px;">
                ${aiAssessment.replace(/\n/g, '<br>')}
              </div>
            `
          }
        }
      );

      console.log('Admin notification sent:', { data: adminEmailData, error: adminEmailError });

    } catch (emailError) {
      console.error('Error sending emails:', emailError);
    }

    return new Response(JSON.stringify({ assessment: aiAssessment }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-ai-assessment function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateFallbackAssessment(answers: any, contactInfo: any): string {
  return `Thank you ${contactInfo.first_name} for completing our AI Readiness Assessment. 

Based on your responses, particularly your focus on ${answers.q1_business_challenge.toLowerCase()} and your ${answers.q4_timeline.toLowerCase()}, ${contactInfo.company_name} appears to be in a strong position to leverage AI transformation.

Your biggest opportunity lies in addressing ${answers.q2_time_waste.toLowerCase()}, which could significantly impact your operational efficiency. With your ${answers.q3_revenue} revenue range, you have the scale to see meaningful ROI from AI initiatives.

Given your ${answers.q5_investment_priority.toLowerCase()} priority and ${answers.q6_leadership_readiness.toLowerCase()} leadership stance, we recommend starting with a focused pilot program that demonstrates quick wins while building toward long-term transformation.

Companies in similar situations typically see 20-30% efficiency gains within the first 6 months of AI implementation. The key is starting with the right strategy and implementation partner.

We'd love to discuss a tailored approach for ${contactInfo.company_name}. Book a complimentary strategy call to explore how AI can specifically address your challenges and accelerate your business goals.`;
}
