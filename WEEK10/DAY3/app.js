const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { config } = require("./config");
const { pool } = require("./db/pool");
const userRoutes = require("./routes/users");
const tokenRoutes = require("./routes/token");
const protectedRoutes = require("./routes/middleware/routes/protected");

const app = express();
app.use(bodyParser.json({ limit: "10kb" }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    msg: "Authentication API is running",
    endpoints: {
      register: "POST /auth/register",
      verifyEmail: "GET /auth/verify-email?token=...",
      login: "POST /auth/login",
      refresh: "POST /token/refresh",
      logout: "POST /token/logout",
      dashboard: "GET /protected/dashboard",
      profile: "GET/PATCH /protected/profile",
    },
  });
});

app.get("/health", async (req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    next(error);
  }
});

app.use("/auth", userRoutes);
app.use("/token", tokenRoutes);
app.use("/protected", protectedRoutes);

app.use((req, res) => {
  res.status(404).json({ msg: "Route not found" });
});

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ msg: "Invalid JSON body" });
  }
  console.error("Request failed:", error);
  res.status(500).json({ msg: "Internal server error" });
});

async function start() {
  await pool.query("SELECT 1");
  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

if (require.main === module) {
  start().catch((error) => {
    console.error("Unable to start server:", error);
    process.exitCode = 1;
  });
}

module.exports = app;
