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
      required: true,
      max: 1000,
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
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Beat = mongoose.models.Beat || mongoose.model("Beat", beatSchema);
