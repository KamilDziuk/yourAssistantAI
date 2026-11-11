import { createHash, randomBytes, timingSafeEqual } from "node:crypto";

export function generateToken() {
  return randomBytes(20).toString("hex");
}

export function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

export function tokenMatchesHash(token, tokenHash) {
  if (!token || !tokenHash) {
    return false;
  }

  const actual = Buffer.from(hashToken(token));
  const expected = Buffer.from(tokenHash);

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
