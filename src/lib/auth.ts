import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter as NextAuthPrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.PRISMA_DATABASE_URL || process.env.POSTGRES_URL || process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const providers: unknown[] = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(Google({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }));
} else {
  console.warn("⚠️ Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET");
}

if (process.env.FACEBOOK_CLIENT_ID && process.env.FACEBOOK_CLIENT_SECRET) {
  providers.push(Facebook({
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  }));
} else {
  console.warn("⚠️ Missing FACEBOOK_CLIENT_ID or FACEBOOK_CLIENT_SECRET");
}

if (process.env.TWITTER_CLIENT_ID && process.env.TWITTER_CLIENT_SECRET) {
  providers.push(Twitter({
    clientId: process.env.TWITTER_CLIENT_ID,
    clientSecret: process.env.TWITTER_CLIENT_SECRET,
  }));
} else {
  console.warn("⚠️ Missing TWITTER_CLIENT_ID or TWITTER_CLIENT_SECRET");
}

if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
  providers.push(LinkedIn({
    clientId: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
  }));
} else {
  console.warn("⚠️ Missing LINKEDIN_CLIENT_ID or LINKEDIN_CLIENT_SECRET");
}

if (process.env.TIKTOK_CLIENT_KEY && process.env.TIKTOK_CLIENT_SECRET) {
  providers.push({
    id: "tiktok",
    name: "TikTok",
    type: "oauth",
    authorization: {
      url: "https://www.tiktok.com/v2/auth/authorize/",
      params: {
        client_key: process.env.TIKTOK_CLIENT_KEY,
        scope: "user.info.basic,video.upload,video.publish",
        response_type: "code",
        redirect_uri: `${process.env.NEXTAUTH_URL || process.env.AUTH_URL || 'https://ais-dev-ko5d2lgfyphaeecnao63ys-707578475350.europe-west2.run.app'}/api/auth/callback/tiktok`,
      },
    },
    token: "https://open.tiktokapis.com/v2/oauth/token/",
    userinfo: "https://open.tiktokapis.com/v2/user/info/",
    profile(profile: { data: { user: { open_id: string; display_name: string; email: string; avatar_url: string } } }) {
      return {
        id: profile.data.user.open_id,
        name: profile.data.user.display_name,
        email: profile.data.user.email,
        image: profile.data.user.avatar_url,
      };
    },
    clientId: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
    allowDangerousEmailAccountLinking: true,
  });
} else {
  console.warn("⚠️ Missing TIKTOK_CLIENT_KEY or TIKTOK_CLIENT_SECRET");
}

if (process.env.TELEGRAM_BOT_TOKEN) {
  providers.push({
    id: "telegram",
    name: "Telegram",
    type: "oauth",
    // Telegram auth is usually handled via a widget, but for OAuth flow:
    authorization: {
      url: "https://oauth.telegram.org/auth",
      params: {
        client_id: process.env.TELEGRAM_BOT_TOKEN,
        response_type: "code",
        redirect_uri: `${process.env.NEXTAUTH_URL || process.env.AUTH_URL || 'https://ais-dev-ko5d2lgfyphaeecnao63ys-707578475350.europe-west2.run.app'}/api/auth/callback/telegram`,
      },
    },
    token: "https://oauth.telegram.org/token",
    userinfo: "https://oauth.telegram.org/user",
    profile(profile: any) {
      return {
        id: profile.id,
        name: profile.first_name + (profile.last_name ? ` ${profile.last_name}` : ''),
        image: profile.photo_url,
      };
    },
    clientId: process.env.TELEGRAM_BOT_TOKEN,
    clientSecret: "", // Telegram bot auth might not need a secret in the same way
  });
} else {
  console.warn("⚠️ Missing TELEGRAM_BOT_TOKEN");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NextAuthPrismaAdapter(prisma),
  providers: providers as import("next-auth/providers").Provider[],
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "fallback_secret_for_development_only_12345",
  trustHost: true,
  basePath: "/api/auth",
  callbacks: {
    async signIn({ account }) {
      if (account && account.error) {
        console.error(`Error during signIn for provider ${account.provider}:`, account.error);
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Force redirect to dashboard on success
      return `/dashboard?login=success`;
    },
    async jwt({ token, account, user }) {
      if (account) {
        const accounts = (token.accounts as Record<string, unknown>) || {};
        accounts[account.provider] = {
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
          providerAccountId: account.providerAccountId,
          user: {
            name: user?.name,
            email: user?.email,
            image: user?.image,
          }
        };
        token.accounts = accounts;
        token.primaryProvider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accounts: token.accounts,
        primaryProvider: token.primaryProvider,
      };
    },
  },
});
