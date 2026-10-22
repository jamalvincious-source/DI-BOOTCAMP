const rateLimit = require("express-rate-limit");

function createLimiter(max) {
  return rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { msg: "Too many requests; try again later." },
  });
}

module.exports = {
  authLimiter: createLimiter(10),
  refreshLimiter: createLimiter(20),
};
