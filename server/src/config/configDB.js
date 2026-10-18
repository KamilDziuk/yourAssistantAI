import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "./logger.js";
dotenv.config();

export default async function mongoDB() {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB");
    throw err;
  }
}
