import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import TikTokProvider from "next-auth/providers/tiktok";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";

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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? `__Secure-next-auth.session-token` : `next-auth.session-token`,
      options: { 
        httpOnly: true, 
        sameSite: "lax", 
        path: "/", 
        secure: process.env.NODE_ENV === "production" 
      },
    },
  },
  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Permet les redirections vers le dashboard après login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, account }) {
      if (account) {
        const accounts = (token.accounts as Record<string, unknown>) || {};
        accounts[account.provider] = {
          provider: account.provider,
          type: account.type,
          providerAccountId: account.providerAccountId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
          scope: account.scope,
        };
        token.accounts = accounts;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        // @ts-expect-error - id is not defined on session.user
        session.user.id = token.sub;
        // @ts-expect-error - accounts is not defined on session
        session.accounts = token.accounts;
      }
      return session;
    },
  },
  pages: { 
    signIn: '/', 
    error: '/' 
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
