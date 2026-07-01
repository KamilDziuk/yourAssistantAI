import logger from "../src/config/logger";


export default function errorHandler(err, req, res, next) {

  logger.error(err);


  const status = err.status ?? 500;

  res.status(status).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Internal Server Error"
        : err.message,
  });
}