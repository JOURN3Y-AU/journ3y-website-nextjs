import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface AssessmentResultsEmail {
  contactInfo: {
    first_name: string;
    last_name: string;
    email: string;
  };
  companyInfo: {
    company_name: string;
    selected_role: string;
    industry: string;
    company_size: string;
  };
  dashboardData: {
    overall_score: number;
    readiness_level: string;
    key_strengths: string[];
    priority_opportunities: string[];
    recommended_next_steps: string[];
  };
  writtenAssessment: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contactInfo, companyInfo, dashboardData, writtenAssessment }: AssessmentResultsEmail = await req.json();

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: linear-gradient(135deg, #2563eb, #1e40af); padding: 40px 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Your AI Readiness Assessment Results</h1>
          <p style="color: #bfdbfe; margin: 10px 0 0 0; font-size: 16px;">Thank you for taking the time to complete our assessment</p>
        </div>

        <div style="padding: 30px 20px;">
          <p style="font-size: 16px; color: #374151; margin-bottom: 25px;">
            Hi ${contactInfo.first_name},
          </p>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6; margin-bottom: 25px;">
            Thank you for completing JOURN3Y's AI Readiness Assessment. We've analyzed your responses and created a personalized report specifically for ${companyInfo.company_name}. Here's a summary of your results:
          </p>

          <div style="background: #f8fafc; border-left: 4px solid #2563eb; padding: 20px; margin: 25px 0;">
            <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 20px;">📊 Your AI Readiness Score</h2>
            <div style="display: flex; align-items: center; margin-bottom: 15px;">
              <span style="font-size: 36px; font-weight: bold; color: #2563eb; margin-right: 15px;">${dashboardData.overall_score}/100</span>
              <div>
                <div style="background: #e2e8f0; padding: 8px 16px; border-radius: 20px; display: inline-block;">
                  <span style="color: #475569; font-weight: 600;">${dashboardData.readiness_level}</span>
                </div>
              </div>
            </div>
          </div>

          <div style="background: #ecfdf5; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #065f46; margin: 0 0 15px 0; font-size: 18px;">✅ Your Key Strengths</h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              ${dashboardData.key_strengths.map(strength => `<li style="margin-bottom: 8px;">${strength}</li>`).join('')}
            </ul>
          </div>

          <div style="background: #fef3c7; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #92400e; margin: 0 0 15px 0; font-size: 18px;">🎯 Priority Opportunities</h3>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              ${dashboardData.priority_opportunities.map(opportunity => `<li style="margin-bottom: 8px;">${opportunity}</li>`).join('')}
            </ul>
          </div>

          <div style="background: #dbeafe; border-radius: 8px; padding: 20px; margin: 25px 0;">
            <h3 style="color: #1e40af; margin: 0 0 15px 0; font-size: 18px;">🚀 Recommended Next Steps</h3>
            <ol style="margin: 0; padding-left: 20px; color: #374151;">
              ${dashboardData.recommended_next_steps.map(step => `<li style="margin-bottom: 8px;">${step}</li>`).join('')}
            </ol>
          </div>

          <div style="border-top: 2px solid #e5e7eb; padding-top: 25px; margin-top: 30px;">
            <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📋 Your Personalized Assessment</h3>
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; color: #374151; line-height: 1.6;">
              ${writtenAssessment.split('\n').map(paragraph => paragraph.trim() ? `<p style="margin-bottom: 15px;">${paragraph}</p>` : '').join('')}
            </div>
          </div>

          <div style="text-align: center; margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 12px;">
            <h3 style="color: #0c4a6e; margin: 0 0 15px 0;">Ready to Take the Next Step?</h3>
            <p style="color: #075985; margin-bottom: 20px;">Our team of AI transformation experts is ready to help you turn these insights into action.</p>
            <p style="margin: 0; color: #64748b; font-size: 14px;">
              We'll be in touch soon to discuss how JOURN3Y can accelerate your AI transformation journey.
            </p>
          </div>

          <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              This assessment was generated specifically for ${companyInfo.company_name} | ${companyInfo.industry}
            </p>
            <p style="color: #6b7280; font-size: 14px; margin: 10px 0 0 0;">
              © 2024 JOURN3Y - Your AI Transformation Partner
            </p>
          </div>
        </div>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "JOURN3Y AI Assessment <noreply@journ3y.com.au>",
      to: [contactInfo.email],
      subject: `🎯 Your AI Readiness Results - ${dashboardData.overall_score}/100 Score (${dashboardData.readiness_level})`,
      html: emailHtml,
    });

    console.log("Assessment results email sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending assessment results email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);