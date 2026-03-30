import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import LinkedIn from "next-auth/providers/linkedin";
import { PrismaAdapter as NextAuthPrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const providers: any[] = [];

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
      },
    },
    token: "https://open.tiktokapis.com/v2/oauth/token/",
    userinfo: "https://open.tiktokapis.com/v2/user/info/",
    profile(profile: any) {
      return {
        id: profile.data.user.open_id,
        name: profile.data.user.display_name,
        email: profile.data.user.email,
        image: profile.data.user.avatar_url,
      };
    },
    clientId: process.env.TIKTOK_CLIENT_KEY,
    clientSecret: process.env.TIKTOK_CLIENT_SECRET,
  });
} else {
  console.warn("⚠️ Missing TIKTOK_CLIENT_KEY or TIKTOK_CLIENT_SECRET");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: NextAuthPrismaAdapter(prisma),
  providers,
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET || "fallback_secret_for_development_only_12345",
  trustHost: true,
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: `__Secure-authjs.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `__Secure-authjs.callback-url`,
      options: {
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `__Host-authjs.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accounts = (token.accounts as any) || {};
        (token.accounts as any)[account.provider] = {
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
        token.primaryProvider = account.provider;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accounts = token.accounts;
      session.primaryProvider = token.primaryProvider;
      return session;
    },
  },
});
