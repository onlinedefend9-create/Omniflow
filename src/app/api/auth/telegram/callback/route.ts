import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const telegramData = Object.fromEntries(searchParams.entries());
  const { hash, ...data } = telegramData;

  if (!hash) {
    return NextResponse.json({ status: "error", provider: "telegram", message: "Missing hash" }, { status: 400 });
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) {
    return NextResponse.json({ status: "error", provider: "telegram", message: "Bot token not configured" }, { status: 500 });
  }

  // Verify Telegram hash
  const dataCheckString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("\n");

  const secretKey = crypto.createHash("sha256").update(botToken).digest();
  const calculatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (calculatedHash !== hash) {
    return NextResponse.json({ status: "error", provider: "telegram", message: "Invalid hash" }, { status: 401 });
  }

  // Success: Redirect to dashboard with connected param
  const baseUrl = new URL(request.url).origin;
  const redirectUrl = `${baseUrl}/dashboard?connected=telegram&id=${data.id}&username=${data.username}`;
  
  return NextResponse.redirect(redirectUrl);
}
