export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
        return session;
      }
    },
    authorized({ auth, request }) {
      const user = auth?.user;

      const isOnAdminPanel = request.nextUrl?.pathname?.startsWith("/admin");
      const isOnLogin = request.nextUrl?.pathname?.startsWith("/login");
      const isOnRegister = request.nextUrl?.pathname?.startsWith("/register");
      const isOnCreateBeat =
        request.nextUrl?.pathname?.startsWith("/beats/new");
      const isOnProfile = request.nextUrl?.pathname?.startsWith("/profile");

      if (!user?.isAdmin && isOnAdminPanel) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (!user && (isOnCreateBeat || isOnProfile)) {
        return false;
      }

      if (user && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
