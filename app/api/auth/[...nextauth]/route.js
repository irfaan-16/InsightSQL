import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connect from "@/lib/database/mongo";
import User from "@/lib/models/User";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, profile }) {
      await connect();
      try {
        const userExists = await User.findOne({
          email: user?.email,
        });

        if (!userExists) {
          await User.create({
            name: user?.name?.toLowerCase(),
            email: user?.email,
            avatar: profile?.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session, user }) {
      await connect();
      const userExists = await User.findOne({
        email: session?.user?.email,
      });
      session.user.mongoDbId = userExists._id;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
