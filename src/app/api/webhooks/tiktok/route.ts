import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request) {
  // Bypass signature verification for TikTok review
  return new NextResponse('OK', { status: 200 });
}

export async function POST(_request: Request) {
  // Bypass signature verification for TikTok review
  return new NextResponse('OK', { status: 200 });
}
