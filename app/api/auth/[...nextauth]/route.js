import connectDB from "@/models/mongoose";
import User from "@/models/user.schema";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        await connectDB();
        const { email, password } = credentials;
        const user = await User.findOne({ email, password }).select(
          "-password"
        );
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectDB();
      const user = await User.findOne({ email: session.user.email }).select(
        "-password"
      );

      return {
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
          photo: user.photo,
          location: user.location,
          locationBn: user.locationBn,
        },
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
