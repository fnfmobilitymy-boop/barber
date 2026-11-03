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
import {
  AnimatedHeading,
  Eyebrow,
  LiquidGlassButton,
  MagneticButton,
} from "./UI";
const faqs = [
  ["Do I need an appointment?", "Book through Setmore or message us on WhatsApp. WhatsApp appointments are confirmed by our team."],
  ["How long does a haircut take?", "A standard haircut takes 30 minutes. Service and package durations are listed in the price menu."],
  ["Can I choose my barber?", "Choose from the available team members on Setmore, or ask us on WhatsApp for your preferred barber."],
  ["Which branch should I visit?", "We have branches in Seksyen 14, Petaling Jaya and Bandar Saujana Putra. Confirm your preferred branch when booking; use the map links below for directions."],
];
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="section faq" id="faq">
      <div>
        <Eyebrow>FAQ</Eyebrow>
        <AnimatedHeading>
          Before your <em>visit.</em>
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
                <span>{q}</span>
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
function OpeningHours({ hours }: { hours: string | null }) {
  return (
    <div className="location-hours">
      <Clock3 size={19} aria-hidden="true" />
      <div>
        <span className="micro">OPENING HOURS</span>
        {hours ? <>
          <p>Daily <strong>{hours}</strong></p>
          <small>Public holiday hours may vary.</small>
        </> : <p>Contact us for opening hours.</p>}
      </div>
    </div>
  );
}

export function BookingSection() {
  return (
    <section id="booking" className="section booking">
      <Eyebrow>BOOK & VISIT</Eyebrow>
      <AnimatedHeading>
        Claim your <em>seat.</em>
      </AnimatedHeading>
      <p>Book with Spartans on Setmore, or contact our team on WhatsApp.</p>
      <div className="booking-actions">
        <MagneticButton><CalendarDays size={18} aria-hidden="true" />BOOK ON SETMORE</MagneticButton>
        <LiquidGlassButton href={whatsappHref}>
          <MessageCircle size={18} aria-hidden="true" />
          <span className="button-label">BOOK VIA WHATSAPP</span>
        </LiquidGlassButton>
      </div>
      <p className="booking-confirmation-note">Please confirm your preferred branch when booking.</p>
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
            <span className="micro">{location.label}</span>
            <h3>{location.name}</h3>
            <address>{location.address}</address>
            <OpeningHours hours={location.hours} />
            <span className="contact-card-link">GOOGLE MAPS <ArrowUpRight size={15} aria-hidden="true" /></span>
          </a>
        ))}
        <div className="contact-card">
          <MessageCircle size={22} aria-hidden="true" />
          <span className="micro">CONTACT</span>
          <h3>Talk to Spartans.</h3>
          <a className="contact-detail" href={whatsappHref}><MessageCircle size={17} aria-hidden="true" />WhatsApp {business.whatsappNumber}</a>
          <a className="contact-detail" href={`mailto:${business.email}`}><Mail size={17} aria-hidden="true" />{business.email}</a>
          <a className="contact-detail" href={`tel:${business.whatsappNumber}`}><Phone size={17} aria-hidden="true" />Call the shop</a>
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
        <p>PRECISION. DISCIPLINE. CONFIDENCE.</p>
        <a href="#home" className="text-link">
          BACK TO TOP ↑
        </a>
      </div>
      <div className="footer-columns">
        <div>
          <span className="micro">FIND SPARTANS</span>
          {locations.map((location) => (
            <a key={location.id} href={googleMapsHref(location.address)} target="_blank" rel="noopener noreferrer">
              <MapPin size={14} aria-hidden="true" /> {location.name} ↗
            </a>
          ))}
        </div>
        <div>
          <span className="micro">EXPLORE</span>
          <a href="#pricing">Services</a>
          <a href="#films">Videos</a>
          <a href="#the-space">Our space</a>
          <a href="#booking">Bookings & contact</a>
        </div>
        <div>
          <span className="micro">FOLLOW US</span>
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
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} {business.name}
        </span>
        <button onClick={() => setPrivacy(!privacy)} aria-expanded={privacy} aria-controls="privacy-notice">
          Privacy Policy {privacy ? "−" : "+"}
        </button>
      </div>
      {privacy && (
        <div className="privacy" id="privacy-notice">
          <h3>Privacy notice</h3>
          <p>
            Online appointments are completed on Setmore, or arranged directly
            with our team on WhatsApp. Information you share is handled by
            the respective service and Spartans Barbershop under their
            applicable privacy policies. This website does not store
            appointment details. For privacy questions, contact <a href={`mailto:${business.email}`}>{business.email}</a>.
          </p>
        </div>
      )}
    </footer>
  );
}
