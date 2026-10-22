const express = require("express");
const { pool } = require("../../../db/pool");
const asyncHandler = require("../../../lib/async-handler");
const authenticateToken = require("../auth");

const router = express.Router();
router.use(authenticateToken);

router.get("/dashboard", asyncHandler(async (req, res) => {
  const result = await pool.query(
    "SELECT username FROM users WHERE id = $1",
    [req.user.id],
  );
  if (!result.rows[0]) {
    return res.status(404).json({ msg: "User not found." });
  }
  res.json({ msg: `Welcome ${result.rows[0].username}; this is your dashboard.` });
}));

router.get("/profile", asyncHandler(async (req, res) => {
  const result = await pool.query(
    `SELECT id, username, email, display_name AS "displayName",
            email_verified_at AS "emailVerifiedAt"
     FROM users WHERE id = $1`,
    [req.user.id],
  );
  if (!result.rows[0]) {
    return res.status(404).json({ msg: "User not found." });
  }
  res.json({ profile: result.rows[0] });
}));

router.patch("/profile", asyncHandler(async (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const keys = Object.keys(body);
  const allowedKeys = new Set(["username", "displayName"]);
  if (keys.length === 0 || keys.some((key) => !allowedKeys.has(key))) {
    return res.status(400).json({ msg: "Update username and/or displayName only." });
  }
  if (
    Object.hasOwn(body, "username") &&
    (typeof body.username !== "string" || !/^[a-zA-Z0-9_-]{3,32}$/.test(body.username))
  ) {
    return res.status(400).json({ msg: "Username must be 3-32 letters, numbers, underscores, or hyphens." });
  }
  if (
    Object.hasOwn(body, "displayName") &&
    body.displayName !== null &&
    (typeof body.displayName !== "string" || body.displayName.trim().length > 80)
  ) {
    return res.status(400).json({ msg: "Display name must be at most 80 characters or null." });
  }

  const username = Object.hasOwn(body, "username") ? body.username.toLowerCase() : null;
  const displayName = Object.hasOwn(body, "displayName")
    ? (body.displayName === null ? null : body.displayName.trim())
    : undefined;
  let result;
  try {
    result = await pool.query(
      `UPDATE users
       SET username = COALESCE($2, username),
           display_name = CASE WHEN $3::boolean THEN $4 ELSE display_name END
       WHERE id = $1
       RETURNING id, username, email, display_name AS "displayName",
                 email_verified_at AS "emailVerifiedAt"`,
      [req.user.id, username, displayName !== undefined, displayName === undefined ? null : displayName],
    );
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ msg: "Username is already in use." });
    }
    throw error;
  }
  if (!result.rows[0]) {
    return res.status(404).json({ msg: "User not found." });
  }
  res.json({ msg: "Profile updated.", profile: result.rows[0] });
}));

module.exports = router;
