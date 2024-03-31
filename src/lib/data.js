import { Beat, User } from "./models";
import { connectToDB } from "./utils";

export async function getBeats(params) {
  const beatPageSize = 10;

  const skip = (params.page - 1) * beatPageSize;
  try {
    connectToDB();
    const beats = await Beat.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(beatPageSize)
      .populate({
        path: "userId",
        select: "username picture isAdmin created_at email",
      });
    const plainObjectList = beats.map((obj) => JSON.parse(JSON.stringify(obj)));
    return plainObjectList;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'Beat' model");
  }
}

export async function getBeat(id) {
  try {
    connectToDB();
    const beat = await Beat.find({ _id: id }).populate({
      path: "userId",
      select: "username picture isAdmin created_at email",
    });

    if (!beat.length) {
      throw new Error("Could not find object by given id");
    }

    const plainObject = JSON.parse(JSON.stringify(beat[0]));
    return plainObject;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'Beat' model");
  }
}

export async function getUsers() {
  try {
    connectToDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'User' model");
  }
}
