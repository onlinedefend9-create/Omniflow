import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;
  const { searchParams } = new URL(request.url);
  const baseUrl = new URL(request.url).origin;
  
  // Standard providers handled by NextAuth
  const standardProviders = ["google", "facebook", "tiktok", "twitter", "linkedin"];
  
  if (standardProviders.includes(provider)) {
    // Redirect to the NextAuth callback URL with all search parameters
    const nextAuthCallbackUrl = `${baseUrl}/api/auth/callback/${provider}?${searchParams.toString()}`;
    return NextResponse.redirect(nextAuthCallbackUrl);
  }

  if (provider === "telegram") {
    // Telegram is handled by its own route
    const telegramCallbackUrl = `${baseUrl}/api/auth/telegram/callback?${searchParams.toString()}`;
    return NextResponse.redirect(telegramCallbackUrl);
  }

  return NextResponse.json({ 
    status: "error", 
    message: `Provider ${provider} not supported` 
  }, { status: 404 });
}
