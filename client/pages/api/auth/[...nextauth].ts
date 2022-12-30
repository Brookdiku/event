import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: "working",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const res = await fetch("http://localhost:3500/auth", {
          method: "post",
          mode: "cors",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data?.accessToken) {
          const user = {
            name: data.username,
            email: data.email,
            id: data.id,
            accessToken: data.accessToken,
            roles: data.roles,
          };
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session?.user?.roles === undefined) {
        session?.user?.roles = "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
  },
};
export default NextAuth(authOptions);
