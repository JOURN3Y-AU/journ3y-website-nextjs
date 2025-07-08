import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface DiscoverySessionRequest {
  contactInfo: {
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string;
  };
  companyInfo: {
    company_name: string;
    selected_role: string;
    industry: string;
    company_size: string;
  };
  assessmentId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contactInfo, companyInfo, assessmentId }: DiscoverySessionRequest = await req.json();

    const teamEmails = [
      "adam.king@journ3y.com.au",
      "kevin.morrell@journ3y.com.au", 
      "jack.rigor@journ3y.com.au"
    ];

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">🎯 New Discovery Session Request</h2>
        
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Contact Information</h3>
          <p><strong>Name:</strong> ${contactInfo.first_name} ${contactInfo.last_name}</p>
          <p><strong>Email:</strong> ${contactInfo.email}</p>
          ${contactInfo.phone_number ? `<p><strong>Phone:</strong> ${contactInfo.phone_number}</p>` : ''}
          <p><strong>Role:</strong> ${companyInfo.selected_role}</p>
        </div>

        <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #1e293b;">Company Information</h3>
          <p><strong>Company:</strong> ${companyInfo.company_name}</p>
          <p><strong>Industry:</strong> ${companyInfo.industry}</p>
          <p><strong>Size:</strong> ${companyInfo.company_size}</p>
        </div>

        <div style="background: #ecfdf5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #065f46;">Next Steps</h3>
          <p>This prospect has completed the AI Readiness Assessment and expressed interest in a Discovery Session. They should be contacted within 24 hours while their interest is high.</p>
          <p><strong>Assessment ID:</strong> ${assessmentId}</p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="color: #64748b; font-size: 14px;">
          This notification was automatically generated from the JOURN3Y AI Readiness Assessment platform.
        </p>
      </div>
    `;

    const emailResponse = await resend.emails.send({
      from: "JOURN3Y Assessment <noreply@journ3y.com.au>",
      to: teamEmails,
      subject: `🎯 Discovery Session Request - ${contactInfo.first_name} ${contactInfo.last_name} (${companyInfo.company_name})`,
      html: emailHtml,
    });

    console.log("Discovery session notification sent:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending discovery session notification:", error);
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