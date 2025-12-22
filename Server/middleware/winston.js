import { logger } from "../utils/winston.js";

const winstonLogger = (req, res, next) => {
  logger.info({
    type: "request",
    method: req.method,
    url: req.url,
    ip: req.ip || req.connection.remoteAddress,
    userAgent: req.get("user-agent"),
    userId: req.user?._id,
    userEmail: req.user?.email,
    timestamp: new Date().toISOString(),
  });
  next();
};

export default winstonLogger;
