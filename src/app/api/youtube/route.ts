import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getYouTubeChannelData } from "@/lib/youtube";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !(session as any).accessToken) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const data = await getYouTubeChannelData((session as any).accessToken);

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "YouTube API error" }, { status: 500 });
  }
}
