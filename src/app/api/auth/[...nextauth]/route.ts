import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (credentials?.username === "admin" && credentials?.password === "admin@123") {
            return {
              id: 999,
              username: "admin",
              email: "admin@example.com",
              firstName: "Admin",
              lastName: "User",
              gender: "male",
              image: "https://dummyjson.com/icon/admin/128",
              token: "mock-jwt-token-for-admin"
            };
          }
          
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password,
            }),
          });
          const user = await res.json();
          if (res.ok && user) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as any).token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).accessToken = token.accessToken;
      (session.user as any).id = token.id;
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
