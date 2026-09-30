import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — KDON Enterprises',
};

export default function TermsPage() {
  return (
    <div className="legal-page">
      <div className="wrap">
        <Link href="/" className="legal-back">← Back to site</Link>
        <h1>Terms & Conditions</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <p>
          These Terms & Conditions govern your use of this website, operated
          by DONS Enterprise, LLC, doing business as KDON Enterprises (US DOT
          5393125 · MC 91025090). By using this site, you agree to the terms
          below.
        </p>

        <h2>Quotes are not binding contracts</h2>
        <p>
          Rate quotes provided through this website or by phone are estimates
          only and do not constitute a binding agreement to transport freight.
          A shipment is only confirmed once both parties have agreed to a
          signed rate confirmation or bill of lading.
        </p>

        <h2>Website content</h2>
        <p>
          Information on this site — including stated capabilities, service
          areas, and equipment types — is provided for general informational
          purposes. We make reasonable efforts to keep it accurate but do not
          guarantee availability of specific lanes, equipment, or capacity at
          any given time.
        </p>

        <h2>Acceptable use</h2>
        <p>When using the quote request form, you agree not to:</p>
        <ul>
          <li>Submit false or fraudulent shipment information</li>
          <li>Use the form to send spam or unsolicited commercial content</li>
          <li>Attempt to disrupt or gain unauthorized access to this website or its systems</li>
        </ul>

        <h2>Limitation of liability</h2>
        <p>
          This website is provided &quot;as is&quot; without warranties of
          any kind. To the fullest extent permitted by law, DONS Enterprise,
          LLC is not liable for any indirect, incidental, or consequential
          damages arising from your use of this site. This does not limit any
          liability arising under a signed shipping contract or rate
          confirmation, which is governed separately by its own terms.
        </p>

        <h2>Intellectual property</h2>
        <p>
          The KDON Enterprises name, logo, and site content are the property
          of DONS Enterprise, LLC and may not be copied or reused without
          permission.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the Commonwealth of
          Massachusetts, without regard to its conflict of law principles.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of this
          site after changes are posted constitutes acceptance of the revised
          terms.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about these terms can be sent to{' '}
          <a href="mailto:info@kdonenterprises.com">info@kdonenterprises.com</a>{' '}
          or by calling (857) 506-3092.
        </p>
      </div>
    </div>
  );
}
