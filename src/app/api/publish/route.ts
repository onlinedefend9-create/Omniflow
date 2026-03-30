import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Distribution functions (placeholders for real API calls)
async function publishToYouTube(content: string, media: any, token: string) {
  console.log("Publishing to YouTube Shorts:", content);
  return { success: true, platform: "youtube" };
}

async function publishToTikTok(content: string, media: any, token: string) {
  console.log("Publishing to TikTok:", content);
  return { success: true, platform: "tiktok" };
}

async function publishToMeta(content: string, media: any, token: string) {
  console.log("Publishing to Meta (Facebook/Instagram):", content);
  return { success: true, platform: "meta" };
}

async function publishToX(content: string, media: any, token: string) {
  console.log("Publishing to X (Twitter):", content);
  return { success: true, platform: "x" };
}

async function publishToLinkedIn(content: string, media: any, token: string) {
  console.log("Publishing to LinkedIn:", content);
  return { success: true, platform: "linkedin" };
}

async function publishToTelegram(content: string, media: any, token: string) {
  console.log("Publishing to Telegram:", content);
  return { success: true, platform: "telegram" };
}

async function publishToPinterest(content: string, media: any, token: string) {
  console.log("Publishing to Pinterest:", content);
  return { success: true, platform: "pinterest" };
}

async function publishToReddit(content: string, media: any, token: string) {
  console.log("Publishing to Reddit:", content);
  return { success: true, platform: "reddit" };
}

export async function POST(req: Request) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { content, platforms, media } = body;
    const accounts = (session as any).accounts || {};

    console.log(`Publish requested on: ${platforms.join(", ")}`);
    console.log(`Content: ${content}`);
    if (media) console.log(`Media: ${media}`);

    // Logique de distribution par plateforme
    const results = await Promise.all(
      platforms.map(async (platform: string) => {
        try {
          const account = accounts[platform];
          const token = account?.accessToken;

          if (!token) {
            return { success: false, platform, error: "Compte non connecté" };
          }

          switch (platform) {
            case "youtube": return await publishToYouTube(content, media, token);
            case "tiktok": return await publishToTikTok(content, media, token);
            case "facebook":
            case "instagram":
            case "threads": return await publishToMeta(content, media, token);
            case "x": return await publishToX(content, media, token);
            case "linkedin": return await publishToLinkedIn(content, media, token);
            case "telegram": return await publishToTelegram(content, media, token);
            case "pinterest": return await publishToPinterest(content, media, token);
            case "reddit": return await publishToReddit(content, media, token);
            default: return { success: false, platform, error: "Unsupported Platform" };
          }
        } catch (error) {
          console.error(`Error on ${platform}:`, error);
          return { platform, status: "error", message: "Failed to send" };
        }
      })
    );

    return NextResponse.json({ 
      message: "Publishing process completed", 
      results 
    });
  } catch (error) {
    console.error("API Publish Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
