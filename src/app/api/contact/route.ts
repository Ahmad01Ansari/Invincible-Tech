import { NextResponse } from "next/server";
import { z } from "zod";
import { createSubmission } from "@/app/actions/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  service: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
  sourcePage: z.string().default("/"),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    if (validatedData.honeypot) {
      return NextResponse.json({ success: true, message: "Transmission received" });
    }

    // 1. Persist to MongoDB
    const result = await createSubmission(validatedData);
    
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    // 2. Trigger Admin Notification (Non-blocking ideally, but await for stability here)
    const adminEmail = process.env.ADMIN_EMAIL || "rjaahmad60@gmail.com";
    
    try {
      console.log(`[TRANSMISSION_PROTOCOL]: INITIATING_NOTIFICATION_TO: ${adminEmail}`);
      
      const emailResult = await resend.emails.send({
        from: "Invinsible Tech <onboarding@resend.dev>",
        to: adminEmail,
        subject: `[NEW LEAD] ${validatedData.name} - ${validatedData.service}`,
        html: `
          <div style="font-family: monospace; background: #050506; color: #ffffff; padding: 40px; border: 1px solid #333 text-align: left;">
            <h2 style="color: #ff5c00; border-bottom: 1px solid #222; padding-bottom: 20px;">NEW INQUIRY DETECTED</h2>
            <p><strong>Operator:</strong> ${validatedData.name}</p>
            <p><strong>Contact:</strong> ${validatedData.email} ${validatedData.phone ? `(${validatedData.phone})` : ""}</p>
            <p><strong>Entity:</strong> ${validatedData.company || "Independent"}</p>
            <p><strong>Location:</strong> ${validatedData.country || "Unknown"}</p>
            <p><strong>Engineering Pillar:</strong> ${validatedData.service}</p>
            <p><strong>Capital Allocation:</strong> ${validatedData.budget}</p>
            <p><strong>Source Protocol:</strong> ${validatedData.sourcePage}</p>
            <hr style="border: 0; border-top: 1px solid #222; margin: 30px 0;" />
            <p style="white-space: pre-wrap; line-height: 1.6;">${validatedData.message}</p>
            <hr style="border: 0; border-top: 1px solid #222; margin: 30px 0;" />
            <a href="${process.env.NEXTAUTH_URL}/admin/contact/${result.id}" style="color: #00ff9d; text-decoration: none; font-size: 12px; letter-spacing: 2px;">ACCESS_DETAIL_LOG →</a>
          </div>
        `,
      });

      if (emailResult.error) {
        console.error("[TRANSMISSION_PROTOCOL]: NOTIFICATION_FAILURE_API:", emailResult.error);
      } else {
        console.log("[TRANSMISSION_PROTOCOL]: NOTIFIED_ADMIN_SUCCESS:", emailResult.data?.id);
      }
    } catch (emailError) {
      console.error("[TRANSMISSION_PROTOCOL]: NOTIFICATION_FAILURE_EXCEPTION:", emailError);
    }

    return NextResponse.json({ success: true, id: result.id }, { status: 200 });

  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: error.message || "Internal Transmission Error" }, { status: 500 });
  }
}
