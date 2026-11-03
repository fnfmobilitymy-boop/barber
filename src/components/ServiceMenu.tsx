import { useState } from "react";
import { ArrowUpRight, CalendarDays, Check, Clock3, Palette, Scissors, Sparkles, Crown } from "lucide-react";
import { bookingHref } from "../data/business";
import { serviceMenu } from "../data/serviceMenu";
import { AnimatedHeading, Eyebrow } from "./UI";

const icons = [Scissors, Palette, Sparkles, Crown];
const duration = (minutes: number) => minutes >= 60
  ? `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`
  : `${minutes} min`;

export function ServiceMenu() {
  const [selected, setSelected] = useState(serviceMenu[0].id);
  const category = serviceMenu.find((item) => item.id === selected)!;
  return (
    <section id="pricing" className="section service-menu" aria-labelledby="service-menu-heading">
      <div className="section-top">
        <div>
          <Eyebrow>THE MENU / SENARAI HARGA</Eyebrow>
          <div id="service-menu-heading"><AnimatedHeading>Services <em>& prices.</em></AnimatedHeading></div>
        </div>
        <p>Services, timing and prices in RM.<br />Perkhidmatan, tempoh dan harga dalam RM.</p>
      </div>
      <div className="menu-categories" role="group" aria-label="Service categories / Kategori perkhidmatan">
        {serviceMenu.map((item, index) => {
          const Icon = icons[index];
          return <button key={item.id} aria-pressed={selected === item.id} aria-controls="service-menu-items" onClick={() => setSelected(item.id)}>
            <Icon size={20} aria-hidden="true" />
            <span>{item.name}<small>{item.nameMs}</small></span>
            <span className="menu-count">{item.items.length}</span>
          </button>;
        })}
      </div>
      <div id="service-menu-items" className="menu-items" aria-label={`${category.name} / ${category.nameMs}`}>
        {category.items.map((item) => (
          <article className="menu-item" key={item.name}>
            <div className="menu-item-copy">
              <h3>{item.name}</h3>
              <p className="menu-translation">{item.nameMs}</p>
              <span className="menu-duration"><Clock3 size={14} aria-hidden="true" />{duration(item.minutes)}<span>/ {item.minutes} minit</span></span>
              {item.description && <details className="menu-details"><summary>Details / Butiran</summary><p>{item.description}</p><p lang="ms">{item.descriptionMs}</p></details>}
              {item.includes && <ul className="menu-inclusions">{item.includes.map((entry, index) => <li key={entry}><Check size={14} aria-hidden="true" /><span>{entry}<small lang="ms">{item.includesMs?.[index]}</small></span></li>)}</ul>}
            </div>
            <div className="menu-item-action">
              <strong><span>RM</span> {item.price}</strong>
              <a className="button liquid-glass" href={bookingHref} aria-label={`Book ${item.name} on Setmore`}><CalendarDays size={16} aria-hidden="true" />BOOK / TEMPAH<ArrowUpRight size={16} aria-hidden="true" /></a>
            </div>
          </article>
        ))}
      </div>
      <p className="menu-booking-note">Select your service and available time on Setmore to complete your booking.<br />Pilih perkhidmatan dan masa yang tersedia di Setmore untuk melengkapkan tempahan anda.</p>
    </section>
  );
}
