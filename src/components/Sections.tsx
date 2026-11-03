import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Plus,
  Minus,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  CalendarDays,
  Clock3,
  Facebook,
  Instagram,
} from "lucide-react";
import { business, locations, googleMapsHref, whatsappHref } from "../data/business";
import { BrandLogo } from "./BrandLogo";
import { EditorialPhoto } from "./EditorialPhoto";
import {
  AnimatedHeading,
  Eyebrow,
  LiquidGlassButton,
  MagneticButton,
  SectionReveal,
} from "./UI";
export function AboutSection() {
  return (
    <section id="about" className="section about">
      <SectionReveal>
        <Eyebrow>01 / THE CULTURE</Eyebrow>
      </SectionReveal>
      <div>
        <AnimatedHeading>
          More than a cut.
          <br />
          It's who you <em>become.</em>
        </AnimatedHeading>
        <SectionReveal>
          <p className="body-copy">
            We believe a great haircut is more than appearance. It's confidence,
            identity, and the feeling you carry into the world.
          </p>
          <a className="text-link" href="#craft">
            WELCOME TO THE CLUB <ArrowUpRight size={16} />
          </a>
        </SectionReveal>
      </div>
      <div className="about-brand-seal"><BrandLogo /></div>
    </section>
  );
}
export function FeaturedVideoSection() {
  return (
    <section id="craft" className="section craft">
      <div className="section-top">
        <Eyebrow>02 / THE ART OF THE CRAFT</Eyebrow>
        <span className="micro">PRECISION IN EVERY FRAME</span>
      </div>
      <div className="craft-frame">
        <EditorialPhoto
          image="craft-scene"
          alt="AI-generated cinematic inspiration of a barber working in a warm, dark shop"
        />
        <span className="media-caption">
          AI EDITORIAL STILL / CRAFT FILM COMING SOON
        </span>
        <div className="craft-card liquid-glass">
          <Eyebrow>OUR APPROACH</Eyebrow>
          <h3>
            Nothing ordinary.
            <br />
            <em>Every detail intentional.</em>
          </h3>
          <p>
            Every fade is intentional. Every detail matters. Our craft combines
            precision, creativity, and a relentless commitment to personal
            style.
          </p>
          <LiquidGlassButton href="#philosophy">
            DISCOVER OUR CRAFT
          </LiquidGlassButton>
        </div>
      </div>
    </section>
  );
}
export function PhilosophySection() {
  return (
    <section id="philosophy" className="section philosophy">
      <AnimatedHeading>
        Precision <em>× personality.</em>
      </AnimatedHeading>
      <div className="split">
        <SectionReveal className="philosophy-image">
          <EditorialPhoto
            image="scissor-detail"
            alt="AI-generated editorial close-up of scissors and comb shaping a haircut"
          />
          <span className="media-caption">
            AI EDITORIAL / THE DETAILS MAKE THE DIFFERENCE
          </span>
        </SectionReveal>
        <SectionReveal className="philosophy-copy">
          <article>
            <span className="micro">01 — THE ART OF PRECISION</span>
            <h3>
              A considered cut.
              <br />
              <em>A signature finish.</em>
            </h3>
            <p>
              Great grooming is built on patience, skill, and an eye for detail.
              From sharp fades to classic cuts, every movement has a purpose.
            </p>
          </article>
          <article>
            <span className="micro">02 — THE POWER OF CONFIDENCE</span>
            <h3>
              Made to feel <em>like you.</em>
            </h3>
            <p>
              Style is personal. We create looks that complement your
              individuality and give you the confidence to own every moment.
            </p>
          </article>
        </SectionReveal>
      </div>
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section id="experience" className="experience">
      <div className="experience-lines" />
      <SectionReveal>
        <Eyebrow>MORE THAN THE MIRROR</Eyebrow>
        <h2>
          THE CHAIR.
          <br />
          <em>THE CULTURE.</em>
          <br />
          THE CONFIDENCE.
        </h2>
        <p>
          A moment for yourself.
          <br />A feeling you take with you.
        </p>
        <a className="text-link" href="#pricing">
          FIND YOUR EXPERIENCE <ArrowUpRight size={16} />
        </a>
      </SectionReveal>
      <span className="experience-number">S / 01</span>
    </section>
  );
}
export { ServiceMenu as PricingSection } from "./ServiceMenu";
export function TestimonialsSection() {
  return null; /* Only verified business testimonials may be added. */
}
const faqs = [
  [
    "Do I need an appointment?",
    "Book online through our Setmore booking page. Choose from the services, barbers, dates and times available there.",
  ],
  [
    "Do you accept walk-ins?",
    "Walk-in availability and policy will be confirmed by the team.",
  ],
  [
    "How long does a haircut take?",
    "Timing depends on the service and style. Please confirm your session length with the team.",
  ],
  [
    "What services do you offer?",
    "Explore haircuts, beard grooming, hair colour, hair treatments and Spartans packages in our service and price menu. Select your service and available time on Setmore.",
  ],
  [
    "Can I request a specific barber?",
    "Choose your preferred barber from the available team members on our Setmore booking page. Available dates and times depend on their schedule.",
  ],
  [
    "Where is the barbershop located?",
    `Find us at ${business.address}. Use the Google Maps link in our contact section for directions.`,
  ],
];
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section faq" id="faq">
      <div>
        <Eyebrow>A FEW THINGS TO KNOW</Eyebrow>
        <AnimatedHeading>
          Before you
          <br />
          <em>take a seat.</em>
        </AnimatedHeading>
      </div>
      <div>
        {faqs.map(([q, a], i) => (
          <article className="faq-item" key={q}>
            <h3>
              <button
                aria-expanded={open === i}
                aria-controls={`answer-${i}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {q}
                {open === i ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  id={`answer-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  <p>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        ))}
      </div>
    </section>
  );
}
function OpeningHours({ hours }: { hours: string }) {
  return (
    <div className="location-hours">
      <Clock3 size={19} aria-hidden="true" />
      <div>
        <span className="micro">OPENING HOURS / WAKTU OPERASI</span>
        <p>Daily / Setiap hari <strong>{hours}</strong></p>
        <small>Public holiday hours may vary.<br />Waktu operasi pada cuti umum mungkin berbeza.</small>
      </div>
    </div>
  );
}

export function BookingSection() {
  const configured = !!(business.bookingUrl || business.whatsappNumber);
  return (
    <section id="booking" className="section booking">
      <Eyebrow>YOUR CHAIR IS WAITING</Eyebrow>
      <AnimatedHeading>
        Your next look
        <br />
        starts <em>here.</em>
      </AnimatedHeading>
      <p>Book with Spartans on Setmore. Choose your service, preferred barber, date and available time, or message us on WhatsApp to arrange your visit.</p>
      {configured ? (
        <div className="booking-actions">
          <MagneticButton><CalendarDays size={18} aria-hidden="true" />BOOK ON SETMORE</MagneticButton>
          {business.whatsappNumber && (
            <LiquidGlassButton
              href={whatsappHref}
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span className="button-label">BOOK VIA WHATSAPP<small>Tempah melalui WhatsApp</small></span>
            </LiquidGlassButton>
          )}
        </div>
      ) : (
        <div className="booking-notice liquid-glass">
          <MessageCircle size={22} />
          <div>
            <strong>Booking opens soon.</strong>
            <p>
              Our appointment and WhatsApp details are being finalized. Check
              back for availability.
            </p>
          </div>
        </div>
      )}
      <p className="booking-confirmation-note">For WhatsApp bookings, our team will confirm your date and time in the chat.</p>
      <div className="contact-grid">
        {locations.map((location) => (
          <a
            key={location.id}
            className="contact-card"
            href={googleMapsHref(location.address)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${location.name} in Google Maps`}
          >
            <MapPin size={22} aria-hidden="true" />
            <span className="micro">VISIT US / KUNJUNGI KAMI</span>
            <h3>{location.name}</h3>
            <address>{location.address}</address>
            <OpeningHours hours={location.hours} />
            <span className="contact-card-link">GOOGLE MAPS / PETA LOKASI <ArrowUpRight size={15} aria-hidden="true" /></span>
          </a>
        ))}
        <div className="contact-card">
          <MessageCircle size={22} aria-hidden="true" />
          <span className="micro">CONTACT / HUBUNGI KAMI</span>
          <h3>Talk to Spartans.</h3>
          <a className="contact-detail" href={whatsappHref}><MessageCircle size={17} aria-hidden="true" />WhatsApp {business.whatsappNumber}</a>
          <a className="contact-detail" href={`mailto:${business.email}`}><Mail size={17} aria-hidden="true" />{business.email}</a>
          <a className="contact-detail" href={`tel:${business.whatsappNumber}`}><Phone size={17} aria-hidden="true" />Call / Hubungi kedai</a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  const [privacy, setPrivacy] = useState(false);
  return (
    <footer className="footer">
      <div className="footer-top">
        <a className="logo" href="#home">
          <BrandLogo />
        </a>
        <p>PRECISION. CULTURE. CONFIDENCE.</p>
        <a href="#home" className="text-link">
          BACK TO TOP ↑
        </a>
      </div>
      <div className="footer-columns">
        <div>
          <span className="micro">FIND SPARTANS</span>
          {locations.map((location) => (
            <a key={location.id} href={googleMapsHref(location.address)} target="_blank" rel="noopener noreferrer">
              {location.name}<br />{location.address}<br />Open Google Maps ↗
            </a>
          ))}
          <OpeningHours hours={business.hours} />
        </div>
        <div>
          <span className="micro">EXPLORE</span>
          <a href="#pricing">Services</a>
          <a href="#films">Films / Galeri video</a>
          <a href="#booking">Bookings & contact</a>
          <a href={whatsappHref}>WhatsApp {business.whatsappNumber}</a>
          <a href={`mailto:${business.email}`}>{business.email}</a>
        </div>
        <div>
          <span className="micro">FOLLOW US / IKUTI KAMI</span>
          {Object.entries(business.socials)
            .filter(([, url]) => url)
            .map(([name, url]) => (
              <a
                href={url}
                key={name}
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {name === "facebook" && <Facebook size={18} aria-hidden="true" />}
                {name === "instagram" && <Instagram size={18} aria-hidden="true" />}
                <span>{name === "facebook" ? "Facebook" : name === "instagram" ? "Instagram" : name}</span>
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          {!Object.values(business.socials).some(Boolean) && (
            <p>Social channels coming soon.</p>
          )}
        </div>
      </div>
      <div className="footer-brand-seal"><BrandLogo /></div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name}
        </span>
        <button onClick={() => setPrivacy(!privacy)} aria-expanded={privacy}>
          Privacy Policy {privacy ? "−" : "+"}
        </button>
        <span>NOT JUST A HAIRCUT. A LIFESTYLE.</span>
      </div>
      {privacy && (
        <div className="privacy">
          <h3>Privacy notice</h3>
          <p>
            Online appointments are completed on Setmore, or arranged directly
            with our team on WhatsApp. Information you share is handled by
            the respective service and Spartans Barbershop under their
            applicable privacy policies. This website does not store
            appointment details. Fonts are hosted locally. A business-specific
            privacy policy must be supplied before launch.
          </p>
        </div>
      )}
    </footer>
  );
}
