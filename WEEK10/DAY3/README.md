# DAY3 JWT Authentication API

Express API with PostgreSQL-backed users, email confirmation, HTTP-only JWT
cookies, refresh-token rotation and revocation, protected profile updates, and
rate limits on authentication endpoints.

## Requirements

- Node.js 18 or newer
- PostgreSQL 14 or newer

## Setup

1. Create a PostgreSQL database named `jwt_auth` and a database user with
   permission to create tables and read/write data in it.
2. Copy `.env.example` to `.env`:

   ```powershell
   Copy-Item .env.example .env
   ```

   Set `DATABASE_URL` to your PostgreSQL connection string (for example,
   `postgresql://jwt_auth_user:your-password@localhost:5432/jwt_auth`).
   Replace both JWT secrets with different random values containing at least
   32 bytes. For example, generate each secret in PowerShell:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(48).toString('hex'))"
   ```

3. Install packages and create the database tables:

   ```powershell
   npm install
   npm run db:init
   ```

4. Start the API:

   ```powershell
   npm start
   ```

The API listens on `http://localhost:5000` by default. `GET /health` checks
database connectivity. Email delivery is not configured: the email-confirmation
URL is printed in the server console; open that link before logging in. To use
an email provider in a deployment, integrate it before exposing registration to
users and set `EMAIL_BASE_URL` to the public HTTPS URL.

## Endpoints

| Method | Path | Description |
| --- | --- | --- |
| `POST` | `/auth/register` | Register with `username`, `email`, `password`, and optional `displayName` |
| `GET` | `/auth/verify-email?token=...` | Confirm an email using the one-time link |
| `POST` | `/auth/login` | Log in with `username` and `password`; sets HTTP-only cookies |
| `POST` | `/token/refresh` | Rotate the refresh token and issue a new access token |
| `POST` | `/token/logout` | Revoke the refresh token and clear authentication cookies |
| `GET` | `/protected/dashboard` | View the authenticated dashboard |
| `GET` | `/protected/profile` | View the authenticated profile |
| `PATCH` | `/protected/profile` | Update `username` and/or `displayName` |

Usernames must contain 3-32 letters, numbers, underscores, or hyphens.
Passwords must contain 12-128 characters. Refresh tokens are rotated on use;
used tokens are stored as hashes until they expire. Authentication and refresh
routes have per-IP rate limits. Cookies are `HttpOnly` and `SameSite=Strict`;
the `Secure` flag is enabled in production.

The PostgreSQL schema is in `db/schema.sql`. Keep `.env` private and use
different, randomly generated JWT secrets in each environment.
