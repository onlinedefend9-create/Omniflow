import NextAuth, { type DefaultSession, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import TikTokProvider from "next-auth/providers/tiktok";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter";
import LinkedInProvider from "next-auth/providers/linkedin";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
    accounts: Record<string, unknown>;
  }
}

// Configuration NextAuth avec Fallback et Cookies Sécurisés
export const authOptions = {
  providers: [
    TikTokProvider({
      clientId: process.env.TIKTOK_CLIENT_KEY!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
      authorization: { 
        params: { 
          scope: "user.info.basic,video.list,video.upload", 
          prompt: "login",
          redirect_uri: "https://www.oneflow.site/api/auth/callback/tiktok"
        } 
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: "tweet.read tweet.write users.read offline.access",
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email w_member_social",
        },
      },
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
      // Standardize redirect to dashboard with connected param
      if (url.includes("callback")) {
        const provider = url.split("/").pop();
        return `${baseUrl}/dashboard?connected=${provider}`;
      }
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
    async jwt({ token, account, user }: { token: JWT; account: unknown; user?: unknown }) {
      // @ts-expect-error - account is unknown
      if (account) {
        const accounts = (token.accounts as Record<string, unknown>) || {};
        // @ts-expect-error - account is unknown
        accounts[account.provider] = {
          // @ts-expect-error - account is unknown
          provider: account.provider,
          // @ts-expect-error - account is unknown
          type: account.type,
          // @ts-expect-error - account is unknown
          providerAccountId: account.providerAccountId,
          // @ts-expect-error - account is unknown
          access_token: account.access_token,
          // @ts-expect-error - account is unknown
          expires_at: account.expires_at,
          // @ts-expect-error - account is unknown
          refresh_token: account.refresh_token,
          // @ts-expect-error - account is unknown
          scope: account.scope,
        };
        token.accounts = accounts;
      }
      if (user) {
        // @ts-expect-error - user is unknown
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.accounts = (token.accounts as Record<string, unknown>) || {};
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
