const jwt = require("jsonwebtoken");
const { config } = require("../../config");

function authenticateToken(req, res, next) {
  const authorization = req.get("authorization");
  const bearerToken = authorization && authorization.startsWith("Bearer ")
    ? authorization.slice(7)
    : null;
  const token = bearerToken || (req.cookies && req.cookies.accessToken);
  if (!token) {
    return res.status(401).json({ msg: "Authentication is required." });
  }

  try {
    const payload = jwt.verify(token, config.accessTokenSecret, {
      issuer: "week10-day3-auth-api",
      audience: "week10-day3-api",
    });
    req.user = { id: payload.sub };
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return res.status(403).json({ msg: "Invalid or expired access token." });
    }
    next(error);
  }
}

module.exports = authenticateToken;
