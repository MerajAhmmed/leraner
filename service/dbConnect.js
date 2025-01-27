import mongoose from "mongoose";

export async function dbConnect() {
  try {
    const conn = await mongoose.connect(
      String(process.env.MONGOOSE_CONNECTION_STRING)
    );
    return conn;
  } catch (err) {
    console.error(err);
  }
}
