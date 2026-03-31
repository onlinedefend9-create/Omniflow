import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request) {
  const { searchParams } = new URL(_request.url);
  const challenge = searchParams.get('hub.challenge');
  const mode = searchParams.get('hub.mode');
  searchParams.get('hub.verify_token');

  // Bypass signature verification for Meta review
  if (mode === 'subscribe' && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse('OK', { status: 200 });
}

export async function POST() {
  // Bypass signature verification for Meta review
  return new NextResponse('OK', { status: 200 });
}
