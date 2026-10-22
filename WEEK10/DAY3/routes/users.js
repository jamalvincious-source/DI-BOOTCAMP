const express = require("express");
const bcrypt = require("bcrypt");
const crypto = require("node:crypto");
const { pool } = require("../db/pool");
const { config } = require("../config");
const asyncHandler = require("../lib/async-handler");
const { authLimiter } = require("../lib/rate-limiters");
const {
  issueAccessToken,
  issueRefreshToken,
  setAuthCookies,
  hashToken,
} = require("../lib/tokens");

const router = express.Router();
const PASSWORD_MIN_LENGTH = 12;
const USERNAME_PATTERN = /^[a-zA-Z0-9_-]{3,32}$/;

function validEmail(email) {
  return typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

router.post("/register", authLimiter, asyncHandler(async (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const { username, email, password, displayName } = body;

  if (
    typeof username !== "string" ||
    !USERNAME_PATTERN.test(username) ||
    !validEmail(email) ||
    typeof password !== "string" ||
    password.length < PASSWORD_MIN_LENGTH ||
    password.length > 128 ||
    (displayName !== undefined &&
      (typeof displayName !== "string" || displayName.trim().length > 80))
  ) {
    return res.status(400).json({
      msg: "Provide a 3-32 character username, valid email, and password of 12-128 characters.",
    });
  }

  const normalizedUsername = username.toLowerCase();
  const normalizedEmail = email.toLowerCase();
  const passwordHash = await bcrypt.hash(password, 12);
  const verificationToken = crypto.randomBytes(32).toString("base64url");
  const verificationExpiresAt = new Date(Date.now() + 30 * 60 * 1000);
  let user;

  try {
    const result = await pool.query(
      `INSERT INTO users
        (username, email, password_hash, display_name,
         email_verification_token_hash, email_verification_expires_at)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, username, email`,
      [
        normalizedUsername,
        normalizedEmail,
        passwordHash,
        displayName ? displayName.trim() : null,
        hashToken(verificationToken),
        verificationExpiresAt,
      ],
    );
    user = result.rows[0];
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ msg: "Username or email is already registered." });
    }
    throw error;
  }

  const confirmationUrl = new URL("/auth/verify-email", config.emailBaseUrl);
  confirmationUrl.searchParams.set("token", verificationToken);
  console.log(`Email confirmation URL for ${user.email}: ${confirmationUrl.toString()}`);

  res.status(201).json({
    msg: "Registration successful. Confirm your email using the link printed by the server.",
  });
}));

router.get("/verify-email", authLimiter, asyncHandler(async (req, res) => {
  const token = req.query.token;
  if (typeof token !== "string" || token.length < 20 || token.length > 200) {
    return res.status(400).json({ msg: "A valid confirmation token is required." });
  }

  const result = await pool.query(
    `UPDATE users
     SET email_verified_at = NOW(),
         email_verification_token_hash = NULL,
         email_verification_expires_at = NULL
     WHERE email_verification_token_hash = $1
       AND email_verification_expires_at > NOW()
       AND email_verified_at IS NULL
     RETURNING id`,
    [hashToken(token)],
  );
  if (result.rowCount === 0) {
    return res.status(400).json({ msg: "Confirmation token is invalid, expired, or already used." });
  }
  res.json({ msg: "Email confirmed. You can now log in." });
}));

router.post("/login", authLimiter, asyncHandler(async (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const { username, password } = body;
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ msg: "Username and password are required." });
  }

  const result = await pool.query(
    `SELECT id, username, password_hash, email_verified_at
     FROM users WHERE username = $1`,
    [username.toLowerCase()],
  );
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ msg: "Invalid username or password." });
  }
  if (!user.email_verified_at) {
    return res.status(403).json({ msg: "Confirm your email before logging in." });
  }

  const accessToken = issueAccessToken(user.id);
  const refreshToken = issueRefreshToken(user.id);
  setAuthCookies(res, accessToken, refreshToken);
  res.json({ msg: "Logged in." });
}));

module.exports = router;
