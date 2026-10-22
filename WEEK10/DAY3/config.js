require("dotenv").config();

function requiredSecret(name) {
  const value = process.env[name];
  if (!value || Buffer.byteLength(value) < 32) {
    throw new Error(`${name} must be set to a secret of at least 32 bytes`);
  }
  return value;
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL must be set to a PostgreSQL connection string");
}

const port = Number(process.env.PORT || 5000);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid TCP port");
}

module.exports = {
  config: {
    port,
    accessTokenSecret: requiredSecret("JWT_ACCESS_SECRET"),
    refreshTokenSecret: requiredSecret("JWT_REFRESH_SECRET"),
    emailBaseUrl: process.env.EMAIL_BASE_URL || `http://localhost:${port}`,
    cookieSecure: process.env.NODE_ENV === "production",
  },
};
