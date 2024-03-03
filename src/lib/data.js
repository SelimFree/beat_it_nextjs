import { Beat, User } from "./models";
import { connectToDB } from "./utils";

export async function getBeats() {
  try {
    connectToDB();
    const beats = await Beat.find();
    return beats;
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
