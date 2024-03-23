"use server";

import { revalidatePath } from "next/cache";
import { Beat, User } from "./models";
import { connectToDB, saveFile, validate, validateFile } from "./utils";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";

export async function handleCreateBeat(formState, formData) {
  const { title, description, cover_create, audio_create, userId } =
    Object.fromEntries(formData);

  let error = validate(Object.fromEntries(formData));
  if (error) {
    return error;
  }
  try {
    connectToDB();
    const coverImagePath = await saveFile(cover_create);
    const audioFilePath = await saveFile(audio_create);
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

export async function handleCredentialsRegister(formState, formData) {
  const { username, email, password, repeat_password } =
    Object.fromEntries(formData);

  const error = validate(Object.fromEntries(formData));
  if (error) {
    console.log(error);
    return error;
  }

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
      isAdmin: false,
    });

    await newUser.save();
    return {
      success: true,
    };
  } catch (err) {
    return {
      error: "Failed to register",
    };
  }
}

export async function handleCredentialsLogin(formState, formData) {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    if (err.message.includes("credentialssignin")) {
      return {
        error: "Invalid credentials",
      };
    }
    throw err;
  }
}

export async function handleGoogleLogin() {
  await signIn("google");
}

export async function handleLogout() {
  await signOut();
}
