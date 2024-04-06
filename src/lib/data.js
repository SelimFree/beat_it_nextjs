import { Beat, User, Like } from "./models";
import { connectToDB } from "./utils";

export async function getBeats(params) {
  const beatPageSize = 10;

  const skip = (params.page - 1) * beatPageSize;
  try {
    connectToDB();
    //Finding user from the database using email
    const currentUserObject = await User.findOne({ email: params.user });

    //Fetching beats
    const beats = await Beat.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(beatPageSize)
      .populate({
        path: "userId",
        select: "username picture isAdmin created_at email",
      });

    const plainObjectList = [];
    //Injecting beat likes and comments info
    for (let obj of beats) {
      const likes = await Like.find({ beatId: obj?._id });
      const currentUserLiked = likes.find(
        (el) => el.userId.toString() === currentUserObject?._id.toString()
      )
        ? true
        : false;
      const mergedObject = {
        ...JSON.parse(JSON.stringify(obj)),
        likesCount: likes.length,
        liked: currentUserLiked,
      };
      plainObjectList.push(mergedObject);
    }
    return plainObjectList;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'Beat' model");
  }
}

export async function getBeat(id, email) {
  try {
    connectToDB();
    const currentUserObject = await User.findOne({ email });

    const beat = await Beat.find({ _id: id }).populate({
      path: "userId",
      select: "username picture isAdmin created_at email",
    });

    if (!beat.length) {
      throw new Error("Could not find object by given id");
    }

    const likes = await Like.find({ beatId: id });
    const currentUserLiked = likes.find(
      (el) => el.userId.toString() === currentUserObject?._id.toString()
    )
      ? true
      : false;

    const mergedObject = {
      ...JSON.parse(JSON.stringify(beat[0])),
      likesCount: likes.length,
      liked: currentUserLiked,
    };
    
    return mergedObject;
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
