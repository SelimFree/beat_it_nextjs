"use server";

import { Beat, User } from "./models";
import { connectToDB, saveFile } from "./utils";

export async function createBeat(formData, files) {
  try {
    connectToDB();
    const title = formData.get("title");
    const description = formData.get("description");
    const coverImage = formData.get("cover");
    const audioFile = formData.get("audio");
    const userId = formData.get("userId");
    const uploadFolder = `public/upload/beats/beat_${userId}`;

    const coverImagePath = await saveFile(coverImage, uploadFolder);
    const audioFilePath = await saveFile(audioFile, uploadFolder);

    const user = await User.findById(userId);

    const newBeat = new Beat({
      userId: user._id,
      title,
      description,
      cover: coverImagePath,
      audio: audioFilePath,
    });

    newBeat.save();
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create an entry in 'Beat' model");
  }
}
