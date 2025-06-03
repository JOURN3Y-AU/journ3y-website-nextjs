
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
  service: 'general' | 'blueprint' | 'glean' | 'databricks' | 'ai-resources' | 'linkedin-consultation';
  campaign_source?: string;
  utm_params?: Record<string, string>;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, company, phone, message, service, campaign_source, utm_params } = formData;

    // Validate required fields
    if (!name || !email || !message || !service) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Map service codes to readable names
    const serviceNames = {
      general: "General Inquiry",
      blueprint: "Blueprint - AI Strategy",
      glean: "Accelerators - Glean",
      databricks: "Accelerators - Databricks",
      'ai-resources': "Services - AI Resources",
      'linkedin-consultation': "LinkedIn Campaign - Free Consultation"
    };

    // Determine if this is a LinkedIn campaign lead
    const isLinkedInLead = campaign_source === 'linkedin' || service === 'linkedin-consultation';
    const leadSource = isLinkedInLead ? '[LINKEDIN CAMPAIGN LEAD]' : '';

    // Prepare email content
    const emailHtml = `
      <h2>${leadSource} New Contact Form Submission</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      ${leadSource ? '<p><strong>🚨 LEAD SOURCE:</strong> LinkedIn Campaign</p>' : ''}
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Service Requested:</strong> ${serviceNames[service]}</p>
      ${utm_params && Object.keys(utm_params).length > 0 ? `
        <h3>Campaign Tracking Data:</h3>
        <ul>
          ${Object.entries(utm_params).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}
        </ul>
      ` : ''}
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;
    
    // Store notification email result
    let notificationSent = false;
    let notificationError = null;
    
    // Try to send notification email to business owners
    try {
      const subjectPrefix = isLinkedInLead ? '[LinkedIn Campaign] ' : '';
      const notificationResponse = await resend.emails.send({
        from: "Journ3y <contact@journ3y.com.au>",
        to: ["adam.king@journ3y.com.au", "kevin.morrell@journ3y.com.au"],
        subject: `${subjectPrefix}[Journ3y] New ${serviceNames[service]} Inquiry from ${name}`,
        html: emailHtml,
      });
      
      console.log("Notification email response:", notificationResponse);
      notificationSent = !notificationResponse.error;
      notificationError = notificationResponse.error;
    } catch (error) {
      console.error("Error sending notification email:", error);
      notificationError = error;
    }

    // Send confirmation email to user
    const confirmationContent = service === 'linkedin-consultation' 
      ? `
        <h2>Thank you for requesting your free AI consultation!</h2>
        <p>Hello ${name},</p>
        <p>We've received your request for a free 1-hour AI strategy consultation. Our team will review your information and contact you within 24 hours to schedule your session.</p>
        
        <h3>What happens next?</h3>
        <ul>
          <li>Our AI specialist will call you within 24 hours</li>
          <li>We'll schedule a convenient time for your consultation</li>
          <li>You'll receive a calendar invitation with meeting details</li>
          <li>Come prepared with your business challenges and goals</li>
        </ul>
        
        <p>Here's a summary of your request:</p>
        <blockquote style="border-left: 4px solid #9b87f5; padding-left: 16px; margin: 16px 0; background: #f9f9f9; padding: 16px;">
          <strong>Company:</strong> ${company || 'Not provided'}<br>
          <strong>Phone:</strong> ${phone || 'Not provided'}<br>
          <strong>Challenges/Goals:</strong> ${message || 'Will discuss during consultation'}
        </blockquote>
        
        <p>We're excited to help you discover how AI can transform your business!</p>
        <p>Best regards,<br />The Journ3y Team</p>
      `
      : `
        <h2>Thank you for contacting us!</h2>
        <p>Hello ${name},</p>
        <p>We've received your inquiry about ${serviceNames[service]}. Our team will review your message and get back to you shortly.</p>
        <p>Here's a copy of your message for reference:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${message.replace(/\n/g, "<br />")}
        </blockquote>
        <p>Best regards,<br />The Journ3y Team</p>
      `;

    const userConfirmation = await resend.emails.send({
      from: "Journ3y <contact@journ3y.com.au>",
      to: email,
      subject: service === 'linkedin-consultation' 
        ? "Your Free AI Consultation Request - We'll Contact You Soon!"
        : "We've received your inquiry - Journ3y",
      html: confirmationContent,
    });

    console.log("User confirmation email response:", userConfirmation);

    return new Response(
      JSON.stringify({ 
        success: true, 
        notificationSent,
        notificationError: notificationError ? notificationError.message : null,
        userConfirmationSent: !userConfirmation.error,
        isLinkedInLead
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-contact-email function:", error);
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
