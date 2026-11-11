import mongoose from "mongoose";

export const REGISTRY_DB_NAME = "registry";

const clientSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  dbName: { type: String, required: true, unique: true },
  tokenHash: String,
  status: {
    type: String,
    enum: ["active", "disabled"],
    default: "active",
  },
  createdAt: { type: Date, default: Date.now },
});

const registryDb = mongoose.connection.useDb(REGISTRY_DB_NAME, {
  useCache: true,
});

const Client = registryDb.model("Client", clientSchema);

export default Client;
