import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import AdminLogoutButton from '@/components/AdminLogoutButton';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const cookieStore = cookies();
  const session = cookieStore.get('admin_session')?.value;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || session !== adminKey) {
    redirect('/admin/login');
  }

  const rows = db
    .prepare(
      `SELECT id, name, company, email, phone, origin, destination, equipment, details, submitted_at
       FROM quote_requests
       ORDER BY id DESC`
    )
    .all();

  return (
    <div className="admin-page">
      <div className="wrap">
        <div className="admin-header">
          <div>
            <h1>Quote Requests</h1>
            <p className="admin-count">{rows.length} total submission{rows.length === 1 ? '' : 's'}</p>
          </div>
          <AdminLogoutButton />
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Company</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Equipment</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.submitted_at}</td>
                  <td>{r.name}</td>
                  <td>{r.company}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.origin}</td>
                  <td>{r.destination}</td>
                  <td>{r.equipment}</td>
                  <td>{r.details}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={9} className="admin-empty">
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
