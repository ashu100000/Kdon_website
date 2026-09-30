import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy — KDON Enterprises',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page">
      <div className="wrap">
        <Link href="/" className="legal-back">← Back to site</Link>
        <h1>Privacy Policy</h1>
        <p className="legal-updated">Last updated: September 2026</p>

        <p>
          KDON Enterprises (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operated by
          DONS Enterprise, LLC, respects your privacy. This policy explains what
          information we collect through this website, how we use it, and the
          choices you have.
        </p>

        <h2>Information we collect</h2>
        <p>When you submit a quote request through this site, we collect:</p>
        <ul>
          <li>Your name and company name</li>
          <li>Email address and phone number</li>
          <li>Shipment origin, destination, equipment type, and load details you provide</li>
          <li>Your IP address, collected automatically for spam and fraud prevention</li>
        </ul>
        <p>
          We do not use cookies or tracking scripts for advertising purposes on
          this site.
        </p>

        <h2>How we use your information</h2>
        <p>We use the information you submit to:</p>
        <ul>
          <li>Respond to your quote request and provide freight pricing</li>
          <li>Contact you about the shipment you inquired about</li>
          <li>Maintain records of business inquiries</li>
          <li>Protect against spam, fraud, and abuse of this form</li>
        </ul>

        <h2>How we share your information</h2>
        <p>
          We do not sell your personal information. We do not share it with
          third parties except:
        </p>
        <ul>
          <li>Service providers who help us operate this website (e.g. hosting providers)</li>
          <li>If required by law, subpoena, or legal process</li>
        </ul>

        <h2>Data retention</h2>
        <p>
          We retain quote request information for as long as reasonably
          necessary to respond to your inquiry and maintain business records,
          unless you request deletion sooner.
        </p>

        <h2>Your choices</h2>
        <p>
          You may contact us at any time to request that we delete the
          information you submitted, or to ask what information we have on
          file for you.
        </p>

        <h2>Contact us</h2>
        <p>
          Questions about this policy can be sent to{' '}
          <a href="mailto:info@kdonenterprises.com">info@kdonenterprises.com</a>{' '}
          or by calling (857) 506-3092.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted
          on this page with an updated revision date.
        </p>
      </div>
    </div>
  );
}
