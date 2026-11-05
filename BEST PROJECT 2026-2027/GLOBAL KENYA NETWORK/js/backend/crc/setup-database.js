
"use strict";

const path = require("path");

// Load the root .env file.
require("dotenv").config({
    path: path.resolve(__dirname, "../../../../.env")
});

const { Pool } = require("pg");

// Check required database settings.
const required = [
    "DB_HOST",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD"
];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing environment variable: ${key}`);
    }
}

// Configure PostgreSQL.
const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: process.env.PGSSL === "require"
        ? { rejectUnauthorized: false }
        : false,

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000
});

// Monitor database connection errors.
pool.on("error", (error) => {
    console.error("PostgreSQL pool error:", error.message);
});

// Test database connection.
async function connectDatabase() {
    let client;

    try {
        client = await pool.connect();

        const result = await client.query(
            "SELECT current_database(), current_user"
        );

        console.log("PostgreSQL connected successfully.");
        console.log("Database:", result.rows[0].current_database);
        console.log("User:", result.rows[0].current_user);

        return result.rows[0];

    } catch (error) {
        console.error("Database connection failed:", error.message);
        throw error;

    } finally {
        if (client) {
            client.release();
        }
    }
}

// Close database connections.
async function closeDatabase() {
    await pool.end();
    console.log("PostgreSQL pool closed.");
}

// EXPORT FUNCTIONS FOR SERVER.JS
module.exports = {
    pool,
    connectDatabase,
    closeDatabase
};
``