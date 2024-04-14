import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 2,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
      max: 1000,
    },
    isAdmin: {
      type: Boolean,
      dafault: false,
    },
  },
  { timestamps: true }
);

const beatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    description: {
      type: String,
      required: true,
      min: 2,
      max: 250,
    },
    cover: {
      type: String,
      max: 1000,
    },
    audio: {
      type: String,
      required: true,
      max: 1000,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    beatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Beat",
    },
  },
  { timestamps: true }
);

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    beatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Beat",
    },
    content: {
      type: String,
      required: true,
      min: 2,
      max: 250,
    },
  },
  { timestamps: true }
);


export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Beat = mongoose.models.Beat || mongoose.model("Beat", beatSchema);
export const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);
export const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
