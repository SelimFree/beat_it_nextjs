"use server";

import { revalidatePath } from "next/cache";
import { Beat, User } from "./models";
import { connectToDB, deleteFile, saveFile, validate } from "./utils";
import { redirect } from "next/navigation";
import { signIn, signOut } from "./auth";
import { getBeats } from "@/lib/data";
import bcrypt from "bcryptjs";

export async function handleCreateBeat(formState, formData) {
  const { title, description, cover_create, audio_create, userEmail } =
    Object.fromEntries(formData);

  let error = validate(Object.fromEntries(formData));
  if (error) {
    return error;
  }
  try {
    connectToDB();
    const coverImagePath = await saveFile(cover_create);
    const audioFilePath = await saveFile(audio_create);
    const user = await User.findOne({ email: userEmail });
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

export async function handleUpdateBeat(formState, formData) {
  const { id, title, description, cover_update, audio_update } =
    Object.fromEntries(formData);

  let error = validate(Object.fromEntries(formData));
  if (error) {
    return error;
  }

  try {
    connectToDB();
    const beatToUpdate = await Beat.find({ _id: id });

    const coverImagePath = await saveFile(cover_update);
    const audioFilePath = await saveFile(audio_update);

    const updateFields = {
      title,
      description,
    };

    if (coverImagePath) {
      updateFields["cover"] = coverImagePath;
      deleteFile(beatToUpdate[0].cover);
    }

    if (audioFilePath) {
      updateFields["audio"] = audioFilePath;
      deleteFile(beatToUpdate[0].audio);
    }

    await Beat.updateOne({ _id: id }, updateFields);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update an entry in 'Beat' model");
  }
  revalidatePath("/beats");
  redirect("/beats");
}

export async function handleDeleteBeat(id) {
  try {
    connectToDB();
    const beatToDelete = await Beat.find({ _id: id });
    const coverPath = beatToDelete[0].cover;
    const audioPath = beatToDelete[0].audio;

    deleteFile(coverPath);
    deleteFile(audioPath);

    await Beat.deleteOne({ _id: id });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete an entry in 'Beat' model");
  }
  revalidatePath("/beats");
}

export async function handleLoadMoreBeats(formState, formData) {
  const { page } = Object.fromEntries(formData);
  console.log("Current page: ", page);
  const newBeat = await getBeats({ page: parseInt(page) });
  return [...formState, ...newBeat];
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
