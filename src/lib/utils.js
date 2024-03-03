const { default: mongoose } = require("mongoose");

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
