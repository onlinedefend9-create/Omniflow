import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const verifyToken = searchParams.get('verify_token');
  const mode = searchParams.get('mode');

  // Using dummy secret as requested
  const TIKTOK_WEBHOOK_SECRET = process.env.TIKTOK_WEBHOOK_SECRET || "TEMP_SECRET";

  if (mode === 'subscribe' && verifyToken === TIKTOK_WEBHOOK_SECRET) {
    return new NextResponse(searchParams.get('challenge'), { status: 200 });
  }

  return new NextResponse('Forbidden', { status: 403 });
}
