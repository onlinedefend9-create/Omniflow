import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get("hub.challenge");
  if (challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Missing challenge", { status: 400 });
}

export async function POST(req: NextRequest) {
  console.log("Webhook TikTok reçu !");

  const signature = req.headers.get("x-tiktok-signature");
  const secret = process.env.TIKTOK_WEBHOOK_SECRET;

  if (secret && signature) {
    const body = await req.text();
    const hmac = crypto.createHmac('sha256', secret).update(body).digest('hex');
    
    if (hmac !== signature) {
      console.error("TikTok webhook signature mismatch");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }
  }

  // TODO: Process the webhook payload here
  // const payload = JSON.parse(await req.text());

  return NextResponse.json({ status: "ok" }, { status: 200 });
}
