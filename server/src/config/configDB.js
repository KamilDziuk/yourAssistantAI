import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function mongoDB() {
  await mongoose
    .connect(process.env.MONGO_URI)
    .then(console.log("Connect!"))
    .catch((error) => {
      console.error("error" + error.message);
    });
}
