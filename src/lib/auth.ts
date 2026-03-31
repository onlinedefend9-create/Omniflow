import NextAuth, { type DefaultSession, type Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import type { JWT } from "next-auth/jwt";

// Type Augmentation for Session and JWT
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accountsCount: number;
    } & DefaultSession["user"];
    accessToken?: string;
    provider?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    provider?: string;
    accountsCount?: number;
  }
}

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          redirect_uri: process.env.NODE_ENV === "production" 
            ? "https://oneflow.site/api/auth/callback/google" 
            : undefined,
        },
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.NODE_ENV === "production" 
            ? "https://oneflow.site/api/auth/callback/facebook" 
            : undefined,
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          redirect_uri: process.env.NODE_ENV === "production" 
            ? "https://oneflow.site/api/auth/callback/linkedin" 
            : undefined,
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          redirect_uri: process.env.NODE_ENV === "production" 
            ? "https://oneflow.site/api/auth/callback/twitter" 
            : undefined,
        },
      },
    }),
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize/",
        params: {
          scope: "user.info.basic,video.list,video.upload",
          response_type: "code",
          redirect_uri: process.env.NODE_ENV === "production" 
            ? "https://oneflow.site/api/auth/callback/tiktok" 
            : undefined,
        },
      },
      token: "https://open.tiktokapis.com/v2/oauth/token/",
      userinfo: "https://open.tiktokapis.com/v2/user/info/",
      clientId: process.env.TIKTOK_CLIENT_ID!,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
      profile(profile: { data: { user: { open_id: string; display_name: string; avatar_url: string } } }) {
        return {
          id: profile.data.user.open_id,
          name: profile.data.user.display_name,
          image: profile.data.user.avatar_url,
          email: null, // TikTok doesn't provide email by default
        };
      },
    },
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: { id: string }; account?: { access_token?: string; provider?: string } }) {
      if (account && typeof account === "object") {
        if (account.access_token) token.accessToken = account.access_token;
        if (account.provider) token.provider = account.provider;
      }
      if (user) {
        // Fetch account count on first sign in
        const count = await prisma.account.count({
          where: { userId: user.id }
        });
        token.accountsCount = count;
      } else if (token.sub) {
        // Refresh account count on subsequent requests
        const count = await prisma.account.count({
          where: { userId: token.sub }
        });
        token.accountsCount = count;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider;
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.accountsCount = token.accountsCount || 0;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Force redirection to dashboard after login
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
  },
  useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "none" as const,
        path: "/",
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "none" as const,
        path: "/",
        secure: true,
      },
    },
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
