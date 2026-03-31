import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verifyToken = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');
  const TIKTOK_WEBHOOK_SECRET = process.env.TIKTOK_WEBHOOK_SECRET || "TEMP_SECRET";

  if (verifyToken === TIKTOK_WEBHOOK_SECRET) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
  // Handle incoming TikTok notifications
  // For now, just acknowledge receipt
  return new NextResponse('OK', { status: 200 });
}
