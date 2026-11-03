import { useEffect, useState } from "react";
import { CalendarDays, MessageCircle } from "lucide-react";
import { bookingHref, whatsappHref } from "../data/business";

export function ContactDock() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const hero = document.getElementById("home");
    const observer = new IntersectionObserver(([entry]) => {
      setHidden(!entry.isIntersecting);
    }, { threshold: 0.08 });
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <div className="contact-dock" hidden={hidden}>
      <a href={whatsappHref} className="floating-whatsapp liquid-glass" aria-label="Book via WhatsApp">
        <MessageCircle size={21} aria-hidden="true" /><span>WHATSAPP</span>
      </a>
      <a href={bookingHref} className="floating-booking liquid-glass" aria-label="Book an appointment on Setmore">
        <CalendarDays size={21} aria-hidden="true" /><span>BOOK NOW</span>
      </a>
    </div>
  );
}
