'use client';

import { useRef, useState } from 'react';

const DEFAULT_NOTE = 'We respond within one business day, usually sooner.';

export default function QuoteForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [note, setNote] = useState(DEFAULT_NOTE);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = formRef.current;

    const payload = {
      name: form.name.value,
      company: form.company.value,
      email: form.email.value,
      phone: form.phone.value,
      origin: form.origin.value,
      destination: form.destination.value,
      equipment: form.equipment.value,
      details: form.details.value,
      website: form.website.value, // honeypot, should stay empty
    };

    setStatus('sending');
    setNote(DEFAULT_NOTE);

    try {
      const response = await fetch('/api/quote-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }

      setStatus('sent');
      setNote("Thanks — we've got it. A dispatcher will follow up within one business day.");
      form.reset();
    } catch (err) {
      setStatus('error');
      setNote("Couldn't send that just now — please call dispatch directly, or try again in a moment.");
      console.error('Quote request failed:', err);
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="form-row">
        <div>
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" placeholder="you@company.com" required />
        </div>
        <div>
          <label htmlFor="phone">Mobile</label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" required />
        </div>
      </div>
      <div className="form-row">
        <div>
          <label htmlFor="origin">Origin</label>
          <input id="origin" name="origin" type="text" placeholder="City, State" />
        </div>
        <div>
          <label htmlFor="dest">Destination</label>
          <input id="dest" name="destination" type="text" placeholder="City, State" />
        </div>
      </div>
      <div>
        <label htmlFor="equip">Equipment needed</label>
        <select id="equip" name="equipment" defaultValue="Dry Van">
          <option>Dry Van</option>
          <option>Flatbed</option>
          <option>Not sure</option>
        </select>
      </div>
      <div>
        <label htmlFor="details">Load details</label>
        <textarea id="details" name="details" placeholder="Weight, commodity, pickup date..." />
      </div>

      {/* Honeypot field: hidden from real visitors, often filled in by bots */}
      <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
        <label htmlFor="website">Leave this field blank</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button type="submit" className="submit-btn" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Request Sent' : 'Request a Rate'}
      </button>
      <p className="form-note">{note}</p>
    </form>
  );
}
