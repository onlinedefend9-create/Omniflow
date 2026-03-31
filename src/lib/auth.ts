import NextAuth from "next-auth";
import TikTokProvider from "next-auth/providers/tiktok";

// Configuration NextAuth avec Fallback et Cookies Sécurisés
export const authOptions = {
  providers: [
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
      authorization: { 
        params: { 
          scope: "user.info.basic", 
          prompt: "login",
          redirect_uri: "https://oneflow.site/api/auth/callback/tiktok"
        } 
      },
    }),
  ],
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: { httpOnly: true, sameSite: "lax", path: "/", secure: process.env.NODE_ENV === "production" },
    },
  },
  callbacks: {
    async redirect({ baseUrl }: { baseUrl: string }) { return `${baseUrl}/dashboard`; },
  },
  pages: { signIn: '/', error: '/' }
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
