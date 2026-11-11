import { hashToken, tokenMatchesHash } from "../src/config/clientToken.js";

// Client routes check the token against that client's hash from the
// registry. Routes without a client still use SECRET_TOKEN.
export default function requireToken(req, res, next) {
  const { token } = req.params;
  const expectedHash = req.tenant
    ? req.tenant.tokenHash
    : process.env.SECRET_TOKEN && hashToken(process.env.SECRET_TOKEN);

  if (!tokenMatchesHash(token, expectedHash)) {
    return res.status(401).json({
      error: "Invalid request token",
    });
  }

  next();
}
