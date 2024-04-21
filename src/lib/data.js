import { Beat, User, Like, Comment } from "./models";
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
        select: "username picture isAdmin email",
      });

    const plainObjectList = [];
    //Injecting beat likes and comments info
    for (let obj of beats) {
      const commentsCount = await Comment.countDocuments({ beatId: obj?._id });

      const likesCount = await Like.countDocuments({ beatId: obj?._id });
      const currentUserLike = await Like.find({
        beatId: obj?._id,
        userId: currentUserObject?._id,
      });
      let liked = false;
      if (currentUserLike.length) {
        liked = true;
      }
      const mergedObject = {
        ...JSON.parse(JSON.stringify(obj)),
        likesCount,
        liked,
        commentsCount,
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
    const commentsCount = await Comment.countDocuments({ beatId: id });

    const likesCount = await Like.countDocuments({ beatId: id });
    const currentUserLike = await Like.find({
      beatId: id,
      userId: currentUserObject?._id,
    });
    let liked = false;
    if (currentUserLike.length) {
      liked = true;
    }

    const mergedObject = {
      ...JSON.parse(JSON.stringify(beat[0])),
      likesCount,
      liked,
      commentsCount,
    };

    return mergedObject;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'Beat' model");
  }
}

export async function getComments(params) {
  const commentPageSize = 10;

  const skip = (params.page - 1) * commentPageSize;
  console.log("to skip: ", skip);
  try {
    connectToDB();

    //Fetching comments
    const comments = await Comment.find({ beatId: params?.beatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(commentPageSize)
      .populate({
        path: "userId",
        select: "username picture",
      });

    const plainObjectList = comments.map((obj) =>
      JSON.parse(JSON.stringify(obj))
    );

    return plainObjectList;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data from 'Comment' model");
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

export async function getUserInfo(user) {
  try {
    connectToDB();
    const currentUserObject = await User.findOne({ email: user?.email });

    const likesCount = await Like.countDocuments({
      userId: currentUserObject?._id,
    });
    const commentsCount = await Comment.countDocuments({
      userId: currentUserObject?._id,
    });
    const beatsCount = await Beat.countDocuments({
      userId: currentUserObject?._id,
    });

    return {
      name: user?.name,
      email: user?.email,
      picture: currentUserObject?.picture,
      likesCount,
      commentsCount,
      beatsCount,
    };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch data");
  }
}
