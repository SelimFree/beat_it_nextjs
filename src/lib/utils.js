const { default: mongoose } = require("mongoose");
import fs from "fs";
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

export async function saveFile(mediaFile, path) {
  if (mediaFile.size === 0) {
    return;
  }

  const fileType = mediaFile.name.split(".").pop();
  const filePath = `${path}/beat_media_${Date.now()}.${fileType}`;

  try {
    if (!fs.existsSync(path)) {
      fs.mkdir(path, { recursive: false }, (err) => {
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

export function validate(formData) {
  for (let field in formData) {
    switch (field) {
      case "username":
        const regexUsername = /^.{2,20}$/;
        if (!regexUsername.test(formData["username"])) {
          return {
            error: "Username must have 2-20 characters",
          };
        }
      case "email":
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(formData["email"])) {
          return {
            error: "Invalid email",
          };
        }
      case "password":
        const regexPassword = /^.{8,}$/;

        if (!regexPassword.test(formData["password"])) {
          return {
            error: "Password must have at least 8 characters",
          };
        }
    }
  }
}
