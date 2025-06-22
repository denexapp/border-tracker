// The `JWT` interface can be found in the `next-auth/jwt` submodule
import "next-auth/jwt";
import { forbidden, unauthorized } from "next/navigation";
import NextAuth from "next-auth";
import GitHub, { GitHubProfile } from "next-auth/providers/github";
import { alllowedGithubUserIds } from "./shared/config/consts";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub({
      profile(profile: GitHubProfile) {
        return {
          id: profile.id.toString(),
          userId: profile.id,
          name: profile.name,
          login: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.userId = user.userId;
        token.login = user.login;
      }
      return token;
    },
    session({ session, token }) {
      session.user.userId = token.userId;
      session.user.login = token.login;
      return session;
    },
  },
});

export const validateSession = async () => {
  const session = await auth();
  if (session === null) {
    unauthorized();
  }
  const { user } = session;

  if (user === undefined) {
    forbidden();
  }
  if (!alllowedGithubUserIds.includes(user.userId)) {
    forbidden();
  }
};

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    login: string;
    userId: number;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    userId: number;
    login: string;
  }
}
