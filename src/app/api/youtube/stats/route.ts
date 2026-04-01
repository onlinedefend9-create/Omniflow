import { auth } from "@/lib/auth";
import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session || !session.accessToken || session.provider !== "google") {
    return NextResponse.json({ error: "Unauthorized or not connected to Google" }, { status: 401 });
  }

  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const response = await youtube.channels.list({
      part: ["statistics", "snippet"],
      mine: true,
    });

    const channel = response.data.items?.[0];
    if (!channel) {
      return NextResponse.json({ error: "No channel found" }, { status: 404 });
    }

    return NextResponse.json({
      subscriberCount: channel.statistics?.subscriberCount,
      viewCount: channel.statistics?.viewCount,
      videoCount: channel.statistics?.videoCount,
      title: channel.snippet?.title,
      customUrl: channel.snippet?.customUrl,
      thumbnails: channel.snippet?.thumbnails,
    });
  } catch (error) {
    const err = error as Error;
    console.error("YouTube API Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
