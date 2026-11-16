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
import { business, visibleLocations, activeBranch, branchHref, googleMapsHref, whatsappHref } from "../data/business";
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
  ["Which branch should I visit?", "Choose your branch using the branch pages. Each branch has its own prices and booking options; use its map for directions."],
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
      <p>{activeBranch ? `Plan your visit to Spartans ${activeBranch.name}.` : "Choose your branch for its booking options."}</p>
      <div className="booking-actions">
        <MagneticButton><CalendarDays size={18} aria-hidden="true" />{activeBranch?.bookingUrl ? "BOOK ON SETMORE" : activeBranch ? "ASK ABOUT APPOINTMENTS" : "CHOOSE YOUR BRANCH"}</MagneticButton>
        <LiquidGlassButton href={whatsappHref}>
          <MessageCircle size={18} aria-hidden="true" />
          <span className="button-label">BOOK VIA WHATSAPP</span>
        </LiquidGlassButton>
      </div>
      <p className="booking-confirmation-note">{activeBranch ? `Booking enquiries for ${activeBranch.name}.` : "Select a branch before booking."}</p>
      <div className="contact-grid">
        {visibleLocations.map((location) => (
          <article key={location.id} className="contact-card">
            <MapPin size={22} aria-hidden="true" />
            <span className="micro">{location.label}</span>
            <h3>{location.name}</h3>
            <address>{location.address}</address>
            <OpeningHours hours={location.hours} />
            <iframe className="branch-map" title={`Google Map — ${location.name}`} src={`https://www.google.com/maps?q=${encodeURIComponent(location.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
            <a className="contact-card-link" href={location.mapsUrl || googleMapsHref(location.address)} target="_blank" rel="noopener noreferrer">GOOGLE MAPS & DIRECTIONS <ArrowUpRight size={15} /></a>
            <a className="contact-card-link" href={branchHref(location.id)}>VIEW BRANCH <ArrowUpRight size={15} /></a>
            <div className="branch-reviews">
              <h4>Google reviews</h4>
              <p>Visited this branch? Find our business on Google Maps to read reviews or share your experience.</p>
              <a className="contact-card-link" href={location.mapsUrl || googleMapsHref(`Spartans Barbershop ${location.address}`)} target="_blank" rel="noopener noreferrer">FIND US ON GOOGLE <ArrowUpRight size={15} /></a>
            </div>
          </article>
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
      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-brand-identity" href="#home" aria-label="Spartans Barbershop — back to top">
            <BrandLogo />
            <p className="footer-brand-name">SPARTANS<span>BARBERSHOP</span></p>
          </a>
          <div className="footer-brand-copy">
            <p className="footer-motto">Precision. Discipline. Confidence.</p>
            <p>Haircuts, grooming, colour and care.<br />Your branch. Your Spartans standard.</p>
          </div>
        </div>
        <div className="footer-branches">
          <h3>Visit Spartans</h3>
          {visibleLocations.map((location) => (
            <div className="footer-branch" key={location.id}>
              <span>{location.label}</span>
              <strong>{location.name}</strong>
              <address>{location.address}</address>
              <a href={location.mapsUrl || googleMapsHref(location.address)} target="_blank" rel="noopener noreferrer" aria-label={`Directions to ${location.name}`}>
                <MapPin size={16} aria-hidden="true" />Google Maps<ArrowUpRight size={14} aria-hidden="true" />
              </a>
            </div>
          ))}
        </div>
        <div className="footer-contact">
          <h3>Get in touch</h3>
          <a href={`tel:${business.whatsappNumber}`}><Phone size={17} aria-hidden="true" />{business.whatsappNumber}</a>
          <a href={whatsappHref}><MessageCircle size={17} aria-hidden="true" />Message on WhatsApp<ArrowUpRight size={14} aria-hidden="true" /></a>
          <a href={`mailto:${business.email}`}><Mail size={17} aria-hidden="true" /><span>{business.email}</span></a>
          <div className="footer-socials">
            {Object.entries(business.socials).filter(([, url]) => url).map(([name, url]) => (
              <a href={url} key={name} className="social-link" target="_blank" rel="noopener noreferrer">
                {name === "facebook" && <Facebook size={18} aria-hidden="true" />}
                {name === "instagram" && <Instagram size={18} aria-hidden="true" />}
                {name === "facebook" ? "Facebook" : name === "instagram" ? "Instagram" : name === "tiktok" ? "TikTok" : name}
                <ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-menu-row">
        <nav className="footer-quicklinks" aria-label="Footer navigation">
          <a href="#pricing">Services & Prices</a>
          <a href="#films">Videos</a>
          <a href="#the-space">Our Space</a>
          <a href="#booking">Book & Visit</a>
        </nav>
        <a href="#home" className="footer-back-top">Back to top ↑</a>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {business.name}</span>
        <button onClick={() => setPrivacy(!privacy)} aria-expanded={privacy} aria-controls="privacy-notice">Privacy Policy {privacy ? "−" : "+"}</button>
      </div>
      {privacy && (
        <div className="privacy" id="privacy-notice">
          <h3>Privacy notice</h3>
          <p>Online appointments are completed on Setmore, or arranged directly with our team on WhatsApp. Information you share is handled by the respective service and Spartans Barbershop under their applicable privacy policies. This website does not store appointment details. For privacy questions, contact <a href={`mailto:${business.email}`}>{business.email}</a>.</p>
        </div>
      )}
    </footer>
  );
}
