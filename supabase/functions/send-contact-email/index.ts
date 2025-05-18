
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
  service: 'general' | 'blueprint' | 'glean' | 'databricks' | 'ai-resources';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    const { name, email, company, phone, message, service } = formData;

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
      'ai-resources': "Services - AI Resources"
    };

    // Prepare email content
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      <hr />
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <p><strong>Service Requested:</strong> ${serviceNames[service]}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br />")}</p>
    `;
    
    // Store notification email result
    let notificationSent = false;
    let notificationError = null;
    
    // Try to send notification email to business owners
    try {
      const notificationResponse = await resend.emails.send({
        from: "Journ3y <no-reply@journ3y.com.au>", // Updated to use your domain
        to: ["adam.king@journ3y.com.au", "kevin.morrell@journ3y.com.au"],
        subject: `[Journ3y] New ${serviceNames[service]} Inquiry from ${name}`,
        html: emailHtml,
      });
      
      console.log("Notification email response:", notificationResponse);
      notificationSent = !notificationResponse.error;
      notificationError = notificationResponse.error;
    } catch (error) {
      console.error("Error sending notification email:", error);
      notificationError = error;
    }

    // Send confirmation email to user (this likely works as it's going to the submitter)
    const userConfirmation = await resend.emails.send({
      from: "Journ3y <no-reply@journ3y.com.au>", // Updated to use your domain
      to: email, // User's email from the form
      subject: "We've received your inquiry - Journ3y",
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Hello ${name},</p>
        <p>We've received your inquiry about ${serviceNames[service]}. Our team will review your message and get back to you shortly.</p>
        <p>Here's a copy of your message for reference:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${message.replace(/\n/g, "<br />")}
        </blockquote>
        <p>Best regards,<br />The Journ3y Team</p>
      `,
    });

    console.log("User confirmation email response:", userConfirmation);

    return new Response(
      JSON.stringify({ 
        success: true, 
        notificationSent,
        notificationError: notificationError ? notificationError.message : null,
        userConfirmationSent: !userConfirmation.error,
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
