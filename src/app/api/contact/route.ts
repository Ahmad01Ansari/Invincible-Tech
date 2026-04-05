import { NextResponse } from "next/server";
import { z } from "zod";

// Maintain parity with frontend schema
const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.string().min(1),
  message: z.string().min(10),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validate payload structure
    const validatedData = contactSchema.parse(body);

    // 2. Immediate Bot Rejection
    if (validatedData.honeypot) {
      // Return 200 to trick the bot into thinking it succeeded, but drop payload
      return NextResponse.json({ success: true, message: "Request received" });
    }

    // 3. Process Data
    // TODO: SPRINT 6 - Replace this block with actual fetch POST to Google Sheets Webhook URL.
    // Example:
    // await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
    //   method: 'POST',
    //   body: JSON.stringify(validatedData),
    //   headers: { 'Content-Type': 'application/json' },
    // });
    
    // Simulate latency for now
    await new Promise((resolve) => setTimeout(resolve, 800));

    // 4. Return success to frontend
    return NextResponse.json({ success: true, message: "Inquiry successfully submitted." }, { status: 200 });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Validation failed" }, { status: 400 });
    }
    
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
