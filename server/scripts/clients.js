import mongoose from "mongoose";
import mongoDB from "../src/config/configDB.js";
import Client from "../src/config/models/clientModel.js";
import { generateToken, hashToken } from "../src/config/clientToken.js";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const [command, slug] = process.argv.slice(2);

function printToken(title, token) {
  console.log(`\n${title}`);
  console.log(`  client: ${slug}`);
  console.log(`  token:  ${token}`);
  console.log("\nSave this token now. It is not stored and cannot be shown again.\n");
}

async function addClient() {
  if (await Client.exists({ slug })) {
    throw new Error(`Client "${slug}" already exists`);
  }

  const token = generateToken();
  await Client.create({
    slug,
    dbName: `client_${slug}`,
    tokenHash: hashToken(token),
  });

  printToken("Client created", token);
}

async function resetToken() {
  const token = generateToken();
  const client = await Client.findOneAndUpdate(
    { slug },
    { $set: { tokenHash: hashToken(token) } },
  );

  if (!client) {
    throw new Error(`Client "${slug}" does not exist`);
  }

  printToken("Token reset", token);
}

const commands = { add: addClient, "reset-token": resetToken };

if (!commands[command] || !SLUG_PATTERN.test(slug ?? "") || slug.length > 40) {
  console.error(
    "Usage: npm run add-client <slug>\n" +
      "       npm run reset-client-token <slug>\n" +
      "Slug: lowercase letters, digits and hyphens, max 40 characters.",
  );
  process.exit(1);
}

try {
  await mongoDB();
  await commands[command]();
} catch (err) {
  console.error(`Error: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
