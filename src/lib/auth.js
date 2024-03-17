import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./utils";
import { User } from "./models";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";


const login = async (credentials) => {
  try {
    connectToDB();
    const dbUser = await User.findOne({ email: credentials.email });

    if (!dbUser) {
      throw new Error("Invalid credentials");
    }

    const isCorrectPassword = await bcrypt.compare(
      credentials.password,
      dbUser.password || ""
    );

    if (!isCorrectPassword) {
      throw new Error("Invalid credentials");
    }

    return dbUser;
  } catch (err) {
    throw new Error("Failed to login");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        connectToDB();
        try {
          const dbUser = await User.findOne({ email: user.email });

          if (!dbUser) {
            const newUser = new User({
              username: user.name,
              email: user.email,
              picture: user.image,
              isAdmin: false,
            });

            await newUser.save();
            return true;
          }
        } catch (err) {
          console.log(err);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
