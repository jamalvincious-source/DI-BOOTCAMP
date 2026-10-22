const crypto = require("node:crypto");
const jwt = require("jsonwebtoken");
const { config } = require("../config");

const ACCESS_TOKEN_SECONDS = 60 * 60;
const REFRESH_TOKEN_SECONDS = 7 * 24 * 60 * 60;

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function issueAccessToken(userId) {
  return jwt.sign({}, config.accessTokenSecret, {
    subject: String(userId),
    expiresIn: ACCESS_TOKEN_SECONDS,
    issuer: "week10-day3-auth-api",
    audience: "week10-day3-api",
  });
}

function issueRefreshToken(userId) {
  return jwt.sign({}, config.refreshTokenSecret, {
    subject: String(userId),
    expiresIn: REFRESH_TOKEN_SECONDS,
    issuer: "week10-day3-auth-api",
    audience: "week10-day3-api",
    jwtid: crypto.randomUUID(),
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, config.refreshTokenSecret, {
    issuer: "week10-day3-auth-api",
    audience: "week10-day3-api",
  });
}

function setAuthCookies(res, accessToken, refreshToken) {
  const secure = config.cookieSecure;
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/",
    maxAge: ACCESS_TOKEN_SECONDS * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "strict",
    path: "/token",
    maxAge: REFRESH_TOKEN_SECONDS * 1000,
  });
}

function clearAuthCookies(res) {
  const secure = config.cookieSecure;
  res.clearCookie("accessToken", { httpOnly: true, secure, sameSite: "strict", path: "/" });
  res.clearCookie("refreshToken", { httpOnly: true, secure, sameSite: "strict", path: "/token" });
}

module.exports = {
  ACCESS_TOKEN_SECONDS,
  REFRESH_TOKEN_SECONDS,
  clearAuthCookies,
  hashToken,
  issueAccessToken,
  issueRefreshToken,
  setAuthCookies,
  verifyRefreshToken,
};
