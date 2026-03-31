import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return new NextResponse('OK', { status: 200 });
}

export async function POST(request: Request) {
  return new NextResponse('OK', { status: 200 });
}
