import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB successfully connected");
    });
    connection.on("error", (err: any) => {
      console.log(err);
    });
  } catch (error: any) {
    console.log("Something went wrong");
    console.log(error.message);
  }
}
