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
  const filePath = `${path}/beat_cover.${fileType}`;

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
