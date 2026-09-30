'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Login failed.');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h1>Admin Login</h1>
        <p>Enter the admin password to view quote requests.</p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          autoFocus
          required
        />
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="btn btn-amber" disabled={loading}>
          {loading ? 'Checking...' : 'Log in'}
        </button>
      </form>
    </div>
  );
}
