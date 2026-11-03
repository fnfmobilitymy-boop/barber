import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3, Palette, Scissors, Sparkles, Crown } from "lucide-react";
import { bookingHref } from "../data/business";
import { barbers } from "../data/barbers";
import { serviceMenu } from "../data/serviceMenu";
import { AnimatedHeading, Eyebrow } from "./UI";

const icons = [Scissors, Palette, Sparkles, Crown];
const duration = (minutes: number) => minutes >= 60
  ? `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`
  : `${minutes} min`;

export function ServiceMenu() {
  const [selected, setSelected] = useState(serviceMenu[0].id);
  const [barberId, setBarberId] = useState("");
  const barber = barbers.find((item) => item.id === barberId);
  const categories = barber ? serviceMenu.filter((item) => barber.serviceCategories.includes(item.id)) : serviceMenu;
  const category = categories.find((item) => item.id === selected) ?? categories[0];
  return (
    <section id="pricing" className="section service-menu" aria-labelledby="service-menu-heading">
      <div className="section-top">
        <div>
          <Eyebrow>THE MENU</Eyebrow>
          <div id="service-menu-heading"><AnimatedHeading>Services <em>& prices.</em></AnimatedHeading></div>
        </div>
        <p>Services, timing and prices in RM.</p>
      </div>
      <div className="barber-filter">
        <label htmlFor="barber-services">View services for</label>
        <select id="barber-services" value={barberId} onChange={(event) => { setBarberId(event.target.value); setSelected(serviceMenu[0].id); }}>
          <option value="">All services</option>
          {barbers.map((item) => <option value={item.id} key={item.id}>{item.name} · {item.role}</option>)}
        </select>
      </div>
      <div className="menu-categories" role="group" aria-label="Service categories">
        {categories.map((item) => {
          const Icon = icons[serviceMenu.findIndex((category) => category.id === item.id)];
          return <button key={item.id} aria-pressed={selected === item.id} aria-controls="service-menu-items" onClick={() => setSelected(item.id)}>
            <Icon size={20} aria-hidden="true" />
            <span>{item.name}</span>
            <span className="menu-count">{item.items.length}</span>
          </button>;
        })}
      </div>
      <div id="service-menu-items" className="menu-items" aria-label={category.name}>
        {category.items.map((item) => (
          <article className="menu-item" key={item.name}>
            <div className="menu-item-copy">
              <h3>{item.name}</h3>
              <span className="menu-duration"><Clock3 size={14} aria-hidden="true" />{duration(item.minutes)}</span>
              {item.description && <details className="menu-details"><summary>Details</summary><p>{item.description}</p></details>}
              {item.includes && <ul className="menu-inclusions">{item.includes.map((entry) => <li key={entry}><Check size={14} aria-hidden="true" /><span>{entry}</span></li>)}</ul>}
            </div>
            <div className="menu-item-action">
              <strong><span>RM</span> {item.price}</strong>
              <a className="button liquid-glass" href={bookingHref} aria-label={`Book ${item.name} on Setmore`}><CalendarDays size={16} aria-hidden="true" />BOOK NOW<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <p className="menu-booking-note">{barber ? `Select ${barber.name} and an available time on Setmore to complete your booking.` : "Select your service, barber and available time on Setmore to complete your booking."}</p>
    </section>
  );
}
