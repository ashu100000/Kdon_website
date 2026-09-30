import Image from 'next/image';
import QuoteForm from '@/components/QuoteForm';

export default function HomePage() {
  return (
    <>
      <header>
        <div className="nav">
          <div className="brand">
            <Image src="/logo.png" alt="KDON Enterprises" width={140} height={95} className="brand-logo" priority />
          </div>
          <nav className="links">
            <a href="#services">Services</a>
            <a href="#why">Why Us</a>
            <a href="#contact">Contact</a>
          </nav>
          <a href="#contact" className="nav-cta">Get a Quote</a>
        </div>
      </header>

      <section className="hero">
        <div className="route-graphic" aria-hidden="true">
          <svg viewBox="0 0 500 500">
            <path
              className="route-path"
              d="M 40 420 C 150 420, 130 220, 250 220 C 370 220, 340 60, 460 60"
            />
            <path
              className="route-dash"
              d="M 40 420 C 150 420, 130 220, 250 220 C 370 220, 340 60, 460 60"
            />
            <circle className="route-node origin" cx="40" cy="420" r="7" />
            <circle className="route-node" cx="250" cy="220" r="6" />
            <circle className="route-node" cx="460" cy="60" r="7" />
          </svg>
        </div>
        <div className="wrap">
          <div className="hero-eyebrow">US DOT 5393125 · MC 91025090</div>
          <h1>Freight that shows up when you said it would.</h1>
          <p className="lede">
            Dry van and flatbed hauling across New England and the Northeast. Family-run since
            2023, still answering the phone at 2am.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-amber">Request a Rate</a>
          </div>
        </div>
      </section>

      <div className="lane-divider"></div>

      <div className="stats">
        <div className="wrap">
          <div className="stat"><b>340</b><span>Power units on the road</span></div>
          <div className="stat"><b>98.6%</b><span>On-time delivery, trailing 12mo</span></div>
          <div className="stat"><b>31</b><span>States serviced weekly</span></div>
          <div className="stat"><b>2023</b><span>Founded in Massachusetts</span></div>
        </div>
      </div>

      <section className="services" id="services">
        <div className="wrap">
          <div className="section-head">
            <h2>Two ways to move it</h2>
            <p>Equipment matched to the freight, not the other way around.</p>
          </div>
          <div className="service-list">
            <div className="service">
              <span className="tag">Dry Van</span>
              <h3>Palletized & boxed freight</h3>
              <p>
                53&apos; vans for retail, packaged goods, and general freight. Drop-and-hook
                available at our Massachusetts yard.
              </p>
            </div>
            <div className="service">
              <span className="tag">Flatbed</span>
              <h3>Building materials & steel</h3>
              <p>
                Steel, lumber, and machinery secured to FMCSA standards. Tarping and oversize
                permitting handled in-house.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="wrap">
          <h2>Why shippers stay with us</h2>
          <div className="why-points">
            <div className="why-point">
              <h3>Company drivers, not brokered loads</h3>
              <p>
                Every load on our board runs on our own trucks with our own drivers — no
                re-brokering, no surprise carriers showing up at the dock.
              </p>
            </div>
            <div className="why-point">
              <h3>Real-time load visibility</h3>
              <p>
                GPS tracking and check-calls at every stop, with a dispatcher you can actually
                reach — not a ticket queue.
              </p>
            </div>
            <div className="why-point">
              <h3>Full cargo insurance</h3>
              <p>
                $1M auto liability and $100K cargo coverage on every load, with certificates
                issued same-day.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial">
        <div className="wrap">
          <p className="quote">
            &quot;KDON picked up our first load in a snowstorm and still made the appointment
            window. Three years later they&apos;re still our first call for anything
            time-sensitive.&quot;
          </p>
          <p className="quote-attr">
            <b>Marcus Webb</b> — Logistics Manager, Tidewater Building Supply
          </p>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="wrap">
          <div>
            <h2>Get a rate in one business day</h2>
            <p>Tell us the lane and the freight. A dispatcher will call you back — not an autoresponder.</p>
            <div className="contact-info">
              <a href="tel:+18575063092" className="contact-button">
                📞 Call Dispatch: (857) 506-3092
              </a>
              <a href="tel:+18575063092" className="contact-button">
                🛡️ Safety & Compliance: (857) 506-3092
              </a>
              <a href="mailto:info@kdonenterprises.com" className="contact-button">
                ✉️ Email: info@kdonenterprises.com
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <footer>
        <div className="wrap">
          <div className="brand">
            <Image src="/logo-full.png" alt="KDON Enterprises" width={160} height={128} className="footer-logo" />
          </div>
          <nav>
            <a href="#services">Services</a>
            <a href="#why">Why Us</a>
            <a href="#contact">Contact</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
          </nav>
        </div>
        <div className="wrap footer-bottom">
          <span>© 2026 DONS Enterprise, LLC · Massachusetts</span>
          <span>US DOT 5393125 · MC 91025090</span>
        </div>
      </footer>
    </>
  );
}
