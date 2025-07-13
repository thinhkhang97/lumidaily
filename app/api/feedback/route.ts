import { NextRequest, NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";
import { z } from "zod";

// Initialize SendGrid with API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const feedbackSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  subject: z.enum(["general", "bug", "feature", "support"]),
  message: z.string().min(10),
});

function getSubjectPrefix(type: string): string {
  switch (type) {
    case "general":
      return "[General Feedback]";
    case "bug":
      return "[Bug Report]";
    case "feature":
      return "[Feature Request]";
    case "support":
      return "[Support]";
    default:
      return "[Feedback]";
  }
}

function createEmailTemplate(data: {
  name?: string;
  email?: string;
  subject: string;
  message: string;
}): string {
  const { name, email, subject, message } = data;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #333; border-bottom: 2px solid #f0f0f0; padding-bottom: 10px;">
        New Feedback from LumiDaily
      </h2>
      
      <div style="background-color: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Type:</strong> ${getSubjectPrefix(subject).replace(
          /[\[\]]/g,
          ""
        )}</p>
        ${name ? `<p><strong>Name:</strong> ${name}</p>` : ""}
        ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h3 style="color: #555; margin-top: 0;">Message:</h3>
        <p style="line-height: 1.6; color: #333;">${message.replace(
          /\n/g,
          "<br>"
        )}</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #666; font-size: 12px;">
        <p>This message was sent from the LumiDaily feedback form.</p>
        ${
          email
            ? `<p>You can reply directly to this email to respond to the user.</p>`
            : ""
        }
      </div>
    </div>
  `;
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate the data
    const validatedData = feedbackSchema.parse(body);

    // Check if required environment variables are set
    if (!process.env.SENDGRID_API_KEY) {
      console.error("SendGrid API key is not configured");
      return NextResponse.json(
        { error: "Email service is not configured" },
        { status: 500 }
      );
    }

    if (!process.env.FEEDBACK_TO_EMAIL) {
      console.error("Feedback recipient email is not configured");
      return NextResponse.json(
        { error: "Feedback recipient is not configured" },
        { status: 500 }
      );
    }

    // Prepare email content
    const emailSubject = `${getSubjectPrefix(
      validatedData.subject
    )} New feedback from LumiDaily`;
    const emailHtml = createEmailTemplate(validatedData);

    // Prepare email message
    const msg = {
      to: process.env.FEEDBACK_TO_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL || process.env.FEEDBACK_TO_EMAIL,
      subject: emailSubject,
      html: emailHtml,
      // If user provided email, set it as reply-to
      ...(validatedData.email && validatedData.email !== ""
        ? { replyTo: validatedData.email }
        : {}),
    };

    // Send email
    await sgMail.send(msg);

    // Return success response
    return NextResponse.json(
      { message: "Feedback sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending feedback:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid form data", details: error.errors },
        { status: 400 }
      );
    }

    // Handle SendGrid errors
    if (error && typeof error === "object" && "response" in error) {
      const sgError = error as { response?: { body?: unknown } };
      console.error("SendGrid error:", sgError.response?.body);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
