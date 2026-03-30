import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import LinkedIn from "next-auth/providers/linkedin";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Facebook({
      clientId: process.env.META_APP_ID!,
      clientSecret: process.env.META_APP_SECRET!,
    }),
    Twitter({
      clientId: process.env.X_API_KEY!,
      clientSecret: process.env.X_API_SECRET!,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_ID!,
      clientSecret: process.env.LINKEDIN_SECRET!,
    }),
    {
      id: "tiktok",
      name: "TikTok",
      type: "oauth",
      authorization: {
        url: "https://www.tiktok.com/v2/auth/authorize/",
        params: {
          client_key: process.env.TIKTOK_KEY,
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
      clientId: process.env.TIKTOK_KEY,
      clientSecret: process.env.TIKTOK_SECRET,
    },
  ],
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_only_12345",
  trustHost: true,
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
