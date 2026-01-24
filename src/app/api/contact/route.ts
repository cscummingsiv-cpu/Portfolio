import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    ok: true,
    route: "contact",
    ts: new Date().toISOString(),
    env: process.env.NODE_ENV,
  });
}

export async function POST(req: Request) {
  const debugId = `contact-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  try {
    const body = await req.json().catch(() => null);

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const company = String(body?.company ?? "").trim();
    const message = String(body?.message ?? "").trim();

    if (!name || !email || !message) {
      return NextResponse.json({ ok: false, debugId, error: "Missing required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("[contact]", debugId, "Missing RESEND_API_KEY");
      return NextResponse.json({ ok: false, debugId, error: "Server not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: "Charlie Automates <noreply@charlieautomates.co>",
      to: "info@charlieautomates.co",
      replyTo: email,
      subject: `New inquiry: ${name}`,
      text: `Name: ${name}
Email: ${email}
Company: ${company || ""}
Message:
${message}`,
    });

    console.log("[contact]", debugId, "resend result:", result);

    if ((result as any)?.error) {
      return NextResponse.json(
        { ok: false, debugId, error: (result as any).error?.message ?? "Resend error" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true, debugId, resendId: (result as any)?.data?.id ?? null });
  } catch (err: any) {
    console.error("[contact]", debugId, err?.stack || err);
    return NextResponse.json({ ok: false, debugId, error: "Internal Server Error" }, { status: 500 });
  }
}
