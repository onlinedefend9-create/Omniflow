import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { content, platforms, media } = body;

    console.log(`Publication demandée sur : ${platforms.join(", ")}`);
    console.log(`Contenu : ${content}`);
    if (media) console.log(`Média : ${media}`);

    // Logique de distribution par plateforme
    const results = await Promise.all(
      platforms.map(async (platform: string) => {
        try {
          // Simulation d'appel API pour chaque plateforme
          // Exemple : if (platform === 'youtube') await publishToYouTube(content, media, session.accessToken);
          
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulation délai
          
          return { platform, status: "success" };
        } catch (error) {
          console.error(`Erreur sur ${platform}:`, error);
          return { platform, status: "error", message: "Échec de l'envoi" };
        }
      })
    );

    return NextResponse.json({ 
      message: "Processus de publication terminé", 
      results 
    });
  } catch (error) {
    console.error("Erreur API Publish:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
