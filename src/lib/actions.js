"use server";

import { revalidatePath } from "next/cache";
import { Beat, User } from "./models";
import { connectToDB, saveFile } from "./utils";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
const beatUploadFolder = "public/upload/beats";
const userUploadFolder = "public/upload/users";

export async function createBeat(formData) {
  try {
    connectToDB();
    const title = formData.get("title");
    const description = formData.get("description");
    const coverImage = formData.get("cover");
    const audioFile = formData.get("audio");
    const userId = formData.get("userId");

    const coverImagePath = await saveFile(
      coverImage,
      `${beatUploadFolder}/images`
    );
    const audioFilePath = await saveFile(
      audioFile,
      `${beatUploadFolder}/audio`
    );

    const user = await User.findById(userId);

    const newBeat = new Beat({
      userId: user._id,
      title,
      description,
      cover: coverImagePath,
      audio: audioFilePath,
    });

    await newBeat.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create an entry in 'Beat' model");
  }
  revalidatePath("/beats");
  redirect("/beats");
}

export async function handleCredentialsRegister(formData) {
  const { username, email, password, repeat_password } =
    Object.fromEntries(formData);

  if (password !== repeat_password) {
    return {
      error: "Passwords don't match",
    };
  }

  connectToDB();
  try {
    const dbUser = await User.findOne({ email });

    if (dbUser) {
      return {
        error: "User already exists",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function handleCredentialsLogin(formData) {
  const { email, password } =
    Object.fromEntries(formData);
  await signIn("credentials", { email, password });
}

export async function handleGoogleLogin() {
  await signIn("google");
}

export async function handleLogout() {
  await signOut();
}
