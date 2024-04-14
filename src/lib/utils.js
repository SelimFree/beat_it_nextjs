const { default: mongoose } = require("mongoose");
import fs from "fs";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";
const pump = promisify(pipeline);
const connection = {};

export async function connectToDB() {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection 🟢");
      return;
    }

    mongoose.set("strictQuery", true);
    const db = await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log("Database Connected Successfully!🟢");
  } catch (error) {
    console.error("Database Not Connected!🔴", error);
    process.exit(1);
  }
}

export async function saveFile(mediaFile) {
  const beatUploadFolder = "public/upload/beats";

  if (!mediaFile?.size) {
    return;
  }

  const fileGroup = mediaFile?.type.split("/")[0];
  let folder;
  switch (fileGroup) {
    case "image":
      folder = "/images";
      break;
    case "audio":
      folder = "/audio";
      break;
  }

  const fileType = mediaFile.name.split(".").pop();
  const filePath = `${beatUploadFolder}${folder}/beat_media_${Date.now()}.${fileType}`;

  try {
    if (!fs.existsSync(`${beatUploadFolder}${folder}`)) {
      fs.mkdir(`${beatUploadFolder}${folder}`, { recursive: true }, (err) => {
        if (err) {
          throw new Error(`Error creating a folder: ${err}`);
        }
      });
    }

    await pump(mediaFile.stream(), fs.createWriteStream(filePath));
    console.log("File saved successully!");
    return `${process.env.MEDIA_URL}/${filePath.replace("public/", "")}`;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteFile(fileUrl) {
  const relativeFilePath = fileUrl.replace(`${process.env.MEDIA_URL}`, "");

  const absoluteFilePath = path.join(process.cwd(), "public", relativeFilePath);

  if (fs.existsSync(absoluteFilePath)) {
    fs.unlinkSync(absoluteFilePath);
  } else {
    throw new Error("File doesn't exist");
  }
}

export function validate(formData) {
  for (let field in formData) {
    switch (field) {
      //Register form fields validation
      case "username":
        const regexUsername = /^.{2,20}$/;
        if (!regexUsername.test(formData[field])) {
          return {
            error: "Username must have 2-20 characters",
          };
        }
        break;
      case "email":
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(formData[field])) {
          return {
            error: "Invalid email",
          };
        }
        break;
      case "password":
        const regexPassword = /^.{8,}$/;

        if (!regexPassword.test(formData[field])) {
          return {
            error: "Password must have at least 8 characters",
          };
        }
        break;
      //Beat form fields validation
      case "title":
        const regexTitle = /^.{2,50}$/;
        if (!regexTitle.test(formData[field])) {
          return {
            error: "Title must have 2-50 characters",
          };
        }
        break;
      case "description":
        const regexDesc = /^.{2,250}$/;
        if (!regexDesc.test(formData[field])) {
          return {
            error: "Description must have 2-250 characters",
          };
        }
        break;
      case "cover_create":
        const coverImage = formData[field];
        console.log(coverImage);
        if (coverImage?.size === 0) {
          return {
            error: "Select a file for a cover image",
          };
        }
        const coverError = validateFile(coverImage);
        if (coverError) {
          return coverError;
        }
        break;
      case "audio_create":
        const audioFile = formData[field];
        console.log(audioFile);
        if (audioFile?.size === 0) {
          return {
            error: "Select a file for an audio",
          };
        }
        const audioError = validateFile(audioFile);
        if (audioError) {
          return audioError;
        }
        break;
      case "cover_update":
        const coverImageUpdate = formData[field];
        if (coverImageUpdate?.size === 0) {
          return;
        }
        const coverUpdateError = validateFile(coverImageUpdate);
        if (coverUpdateError) {
          return coverUpdateError;
        }
        break;
      case "audio_update":
        const audioFileUpdate = formData[field];
        if (audioFileUpdate?.size === 0) {
          return;
        }
        const audioUpdateError = validateFile(audioFileUpdate);
        if (audioUpdateError) {
          return audioUpdateError;
        }
        break;
      //Comment content validation
      case "comment_content":
        const regexContent = /^.{2,250}$/;
        if (!regexContent.test(formData[field])) {
          return {
            error: "Comment must have 2-250 characters",
          };
        }
        break;
    }
  }
}

export function validateFile(file) {
  const MAX_FILE_SIZE = 5_000_000;
  const VALID_IMG_LIST = ["image/png", "image/jpeg", "image/webp"];
  const VALID_AUDIO_LIST = ["audio/mpeg", "audio/wav", "audio/webm"];

  if (file?.size > MAX_FILE_SIZE) {
    return {
      error: "File is too large",
    };
  }
  const fileGroup = file?.type.split("/")[0];
  switch (fileGroup) {
    case "image":
      if (!VALID_IMG_LIST.includes(file.type)) {
        return {
          error: "Unsupported image type",
        };
      }
      break;
    case "audio":
      if (!VALID_AUDIO_LIST.includes(file.type)) {
        return {
          error: "Unsupported audio type",
        };
      }
      break;
    default:
      return {
        error: "Invalid file type",
      };
  }
}
