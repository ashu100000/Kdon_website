import { NextResponse } from 'next/server';
import db from '@/lib/db';

const insertStmt = db.prepare(`
  INSERT INTO quote_requests (name, company, email, phone, origin, destination, equipment, details, ip_address)
  VALUES (@name, @company, @email, @phone, @origin, @destination, @equipment, @details, @ip_address)
`);

const selectAllStmt = db.prepare(`
  SELECT id, name, company, email, phone, origin, destination, equipment, details, submitted_at
  FROM quote_requests
  ORDER BY id DESC
`);

// Very small in-memory rate limiter: max 10 submissions / 10 minutes / IP.
// Resets whenever the server restarts - fine for a form like this.
const submissionLog = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (submissionLog.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  submissionLog.set(ip, timestamps);
  return timestamps.length > MAX_PER_WINDOW;
}

function clean(v) {
  return typeof v === 'string' ? v.trim().slice(0, 2000) : '';
}

export async function POST(request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const { name, company, email, phone, origin, destination, equipment, details, website } = body || {};

  // Honeypot: real visitors never fill this hidden field in; bots often do.
  if (website) {
    // Pretend success so bots don't learn the field is a trap.
    return NextResponse.json({ ok: true }, { status: 201 });
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return NextResponse.json({ error: 'Mobile number is required.' }, { status: 400 });
  }

  try {
    const info = insertStmt.run({
      name: clean(name),
      company: clean(company),
      email: clean(email),
      phone: clean(phone),
      origin: clean(origin),
      destination: clean(destination),
      equipment: clean(equipment),
      details: clean(details),
      ip_address: ip,
    });
    return NextResponse.json({ ok: true, id: Number(info.lastInsertRowid) }, { status: 201 });
  } catch (err) {
    console.error('Failed to save quote request:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}

// View all submissions - protected by an admin key so it's not public.
export async function GET(request) {
  const key = request.headers.get('x-admin-key');
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || key !== adminKey) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const rows = selectAllStmt.all();
  return NextResponse.json({ count: rows.length, requests: rows });
}
