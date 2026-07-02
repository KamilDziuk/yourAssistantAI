import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger";
dotenv.config();

export default async function mongoDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB");
    throw err;
  }
}
