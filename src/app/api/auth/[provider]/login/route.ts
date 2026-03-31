import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { provider: string } }
) {
  const { provider } = params;
  
  // Standard providers handled by NextAuth
  const standardProviders = ["google", "facebook", "tiktok", "twitter", "linkedin"];
  
  if (standardProviders.includes(provider)) {
    // This will trigger the NextAuth sign-in flow
    // In a real app, we might need to handle this differently if we want a direct redirect
    // but for NextAuth v5, we can use the signIn function.
    // However, since this is an API route, we want to return a redirect to the NextAuth signin page
    // or directly to the provider if possible.
    
    const baseUrl = new URL(request.url).origin;
    const callbackUrl = `${baseUrl}/dashboard?connected=${provider}`;
    
    // Construct the NextAuth signin URL
    const signinUrl = `${baseUrl}/api/auth/signin/${provider}?callbackUrl=${encodeURIComponent(callbackUrl)}`;
    
    return NextResponse.redirect(signinUrl);
  }

  if (provider === "telegram") {
    // Telegram is handled differently (widget on frontend)
    return NextResponse.json({ 
      status: "error", 
      message: "Telegram uses a frontend widget. Use the Telegram login button." 
    }, { status: 400 });
  }

  return NextResponse.json({ 
    status: "error", 
    message: `Provider ${provider} not supported` 
  }, { status: 404 });
}
