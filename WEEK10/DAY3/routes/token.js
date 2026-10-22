const express = require("express");
const { pool } = require("../db/pool");
const asyncHandler = require("../lib/async-handler");
const { refreshLimiter } = require("../lib/rate-limiters");
const {
  clearAuthCookies,
  hashToken,
  issueAccessToken,
  issueRefreshToken,
  REFRESH_TOKEN_SECONDS,
  setAuthCookies,
  verifyRefreshToken,
} = require("../lib/tokens");

const router = express.Router();

router.post("/refresh", refreshLimiter, asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ msg: "Refresh token is required." });
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      clearAuthCookies(res);
      return res.status(403).json({ msg: "Invalid or expired refresh token." });
    }
    throw error;
  }

  const userResult = await pool.query(
    "SELECT id FROM users WHERE id = $1 AND email_verified_at IS NOT NULL",
    [payload.sub],
  );
  if (!userResult.rows[0]) {
    clearAuthCookies(res);
    return res.status(403).json({ msg: "Refresh token is no longer valid." });
  }

  const consumed = await pool.query(
    `WITH expired_tokens AS (
       DELETE FROM revoked_refresh_tokens WHERE expires_at <= NOW()
       RETURNING token_hash
     )
     INSERT INTO revoked_refresh_tokens (token_hash, expires_at)
     VALUES ($1, $2)
     ON CONFLICT (token_hash) DO NOTHING
     RETURNING token_hash`,
    [hashToken(refreshToken), new Date(payload.exp * 1000)],
  );
  if (consumed.rowCount === 0) {
    clearAuthCookies(res);
    return res.status(403).json({ msg: "Refresh token has already been used." });
  }

  const accessToken = issueAccessToken(payload.sub);
  const nextRefreshToken = issueRefreshToken(payload.sub);
  setAuthCookies(res, accessToken, nextRefreshToken);
  res.json({ msg: "Tokens refreshed.", refreshExpiresIn: REFRESH_TOKEN_SECONDS });
}));

router.post("/logout", asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      await pool.query(
        `WITH expired_tokens AS (
           DELETE FROM revoked_refresh_tokens WHERE expires_at <= NOW()
           RETURNING token_hash
         )
         INSERT INTO revoked_refresh_tokens (token_hash, expires_at)
         VALUES ($1, $2)
         ON CONFLICT (token_hash) DO NOTHING`,
        [hashToken(refreshToken), new Date(payload.exp * 1000)],
      );
    } catch (error) {
      if (error.name !== "JsonWebTokenError" && error.name !== "TokenExpiredError") {
        throw error;
      }
    }
  }

  clearAuthCookies(res);
  res.json({ msg: "Logged out." });
}));

module.exports = router;
