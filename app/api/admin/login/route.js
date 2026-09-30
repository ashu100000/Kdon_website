import { NextResponse } from 'next/server';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { password } = body || {};
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) {
    return NextResponse.json(
      { error: 'Server is not configured with an admin password yet.' },
      { status: 500 }
    );
  }

  if (!password || password !== adminKey) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set('admin_session', adminKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return response;
}
