import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  // TODO: hier später E-Mail-Versand einbauen (Resend/Nodemailer)
  console.log("Kontakt:", { name, email, message });
  return NextResponse.json({ ok: true });
}
