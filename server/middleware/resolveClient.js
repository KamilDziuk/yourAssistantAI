import mongoose from "mongoose";
import mongoDB from "../src/config/configDB.js";
import Client from "../src/config/models/clientModel.js";

const CACHE_TTL_MS = 60 * 1000;
const clientCache = new Map();

async function findClient(slug) {
  const cached = clientCache.get(slug);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.client;
  }

  const client = await Client.findOne({ slug }).lean();
  clientCache.set(slug, { client, expiresAt: Date.now() + CACHE_TTL_MS });

  return client;
}

// Sets req.db to the database of the client named in the URL. Routes
// without a client slug keep using the default database.
export default async function resolveClient(req, res, next) {
  try {
    await mongoDB();

    const { client: slug } = req.params;

    if (!slug) {
      req.db = mongoose.connection;
      return next();
    }

    const client = await findClient(slug);

    if (!client || client.status !== "active") {
      return res.status(404).json({
        error: "Client not found",
      });
    }

    req.tenant = client;
    req.db = mongoose.connection.useDb(client.dbName, { useCache: true });
    next();
  } catch (err) {
    next(err);
  }
}
