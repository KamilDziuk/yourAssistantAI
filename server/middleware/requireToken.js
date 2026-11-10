export default function requireToken(req, res, next) {
  const { token } = req.params;

  if (!process.env.SECRET_TOKEN || token !== process.env.SECRET_TOKEN) {
    return res.status(401).json({
      error: "Invalid request token",
    });
  }

  next();
}
