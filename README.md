# KDON Enterprises — Full-Stack Next.js App

This is the full-stack version of the site: one Next.js application that
serves the website AND the API that stores quote requests — no separate
backend server, and no CORS setup needed, since it's all one app now.

## What changed from the two-piece version

- The old `index.html` + separate Express server on port 3001 are now one
  Next.js project.
- The frontend lives in `app/page.js` and `components/QuoteForm.js` (React
  components instead of plain HTML/JS).
- The API lives in `app/api/quote-requests/route.js` (Next.js "API route")
  instead of a standalone `server.js`.
- Storage is still SQLite via `better-sqlite3` — same database, same table,
  just wired in through `lib/db.js`.
- Everything runs on **one port** and **one command**.

## 1. Install

Requires [Node.js](https://nodejs.org) 18 or later (same as before).

```bash
npm install
```

## 2. Configure

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and set `ADMIN_KEY` to a long random string — this is the
password needed to view stored submissions.

## 3. Run it (development)

```bash
npm run dev
```

Open **http://localhost:3000** in your browser. That single URL is now both
the website and the API — the form on the page submits to
`/api/quote-requests` on the same origin, no separate server or port to
juggle.

A SQLite file is created automatically at `data/quote_requests.db` the
first time you submit the form (or you can trigger table creation just by
starting the server).

## 4. View stored submissions

Two ways:

**A real admin page (recommended)** — visit **http://localhost:3000/admin**
in your browser and log in with your `ADMIN_KEY` as the password. You'll
see every submission in a table: name, company, email, phone, origin,
destination, equipment, details, and when it came in. This is what your
client should actually use day-to-day — no Terminal, no extra software.

**Command line (for quick checks/debugging):**
```bash
curl -H "x-admin-key: YOUR_ADMIN_KEY" http://localhost:3000/api/quote-requests
```

## 5. Running it for real (production)

```bash
npm run build
npm start
```

`npm start` serves the production build — this is what you'd run on a live
server, not `npm run dev`.

## 6. Deploying

The easiest place to deploy a Next.js app is
**[Vercel](https://vercel.com)** (made by the same team as Next.js) —
connect this project as a GitHub repo, set `ADMIN_KEY` in its environment
variables dashboard, and it deploys automatically. Railway and Render also
support Next.js directly if you'd rather keep everything on one of those.

One thing to check with whichever host you pick: make sure its filesystem
persists between deploys, since the SQLite database file lives on disk —
some serverless platforms wipe local files on every deploy, in which case
you'd want to point `lib/db.js` at a hosted database instead down the line.

## Backing up the data

Same as before — copy `data/quote_requests.db` somewhere safe on a
schedule. It's just one file.
