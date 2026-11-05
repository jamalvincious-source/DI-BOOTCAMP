# Global Network Kenya

The frontend and backend are separate applications:

- Frontend: the static pages, styles, and `js/app.js` files. Serve the project root with a static web server such as VS Code Live Server.
- Backend: the Express API in `js/backend/crc/`, listening on port 3000 by default. It does not serve frontend files.
- Database: PostgreSQL, accessed by the backend through Prisma.

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string and `JWT_SECRET` to a unique secret of at least 32 characters. For a hosted database that requires TLS, include `sslmode=require` in `DATABASE_URL`.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Generate Prisma Client and synchronize the database schema:

   ```sh
   npm run prisma:generate
   npm run db:push
   ```

   These use the Prisma schema at `js/backend/crc/prisma/schema.prisma` and the `DATABASE_URL` from `.env`. `npm run db:setup` only checks the PostgreSQL connection; it does not create tables.
4. Start the API with `npm run dev` or `npm start`.
5. Separately serve this project directory (the folder containing `index.html`) as the frontend; do not serve its parent workspace folder. The default frontend API address is `http://localhost:3000/api`; set `window.GNK_API_BASE_URL` before loading `js/app.js` to use another API address.

The API includes health checks, registration/login/current-user and password recovery, business directory and submissions, marketplace listings, adverts, advertising packages, payments, and administrator endpoints. Data operations use Prisma Client.

The API health check is available at `http://localhost:3000/api/health`.
