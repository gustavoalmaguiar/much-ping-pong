import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Google],
  callbacks: {
    // Assure that the Player record exists in the database upon signing in.
    async signIn({ user, profile }) {
      if (!profile || !profile.email || !profile.name) {
        return false;
      }
      const player = await prisma.player.findUnique({
        where: { email: profile.email },
      });
      if (!player) {
        await prisma.player.create({
          data: {
            email: profile.email,
            name: profile.name,
            imageUrl: profile.picture,
          },
        });
      }
      user.id = player?.id;
      return true;
    },
    jwt({ token, user }) {
      if (user) { // Add database ID to the JWT
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
});
