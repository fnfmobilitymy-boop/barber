import { useEffect } from "react";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { business } from "../data/business";
import { BrandLogo } from "./BrandLogo";

export type Opportunity = "partnerships" | "careers";
const base = import.meta.env.BASE_URL;
export const opportunityHref = (page: Opportunity) => `${base}?page=${page}`;

export function OpportunitiesPage({ page }: { page: Opportunity }) {
  const careers = page === "careers";
  const title = careers ? "Build your future with Spartans." : "Build the next chapter with Spartans.";
  const subject = careers ? "Job application — Spartans Barbershop" : "Partnership / investment enquiry — Spartans Barbershop";
  const message = careers
    ? "Hi Spartans, I’d like to apply to join your team.\nName:\nPhone:\nPreferred branch (Shop 01 / 02 / 03):\nRole of interest:\nRelevant experience:\nAvailability:\nPortfolio / CV link (optional):"
    : "Hi Spartans, I’m interested in a partnership or investment opportunity.\nName:\nCompany (if applicable):\nContact details:\nPartnership / investment interest:\nPreferred location:\nProposal overview:\nPreferred time to talk:";
  const whatsapp = `https://wa.me/${business.whatsappNumber.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
  const email = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  useEffect(() => { document.title = `Spartans Barbershop — ${careers ? "Careers" : "Partnerships & Investment"}`; }, [careers]);
  return <div className="opportunities-page">
    <header className="opportunities-header">
      <a className="logo" href={base} aria-label="Spartans Barbershop home"><BrandLogo /></a>
      <nav aria-label="Page navigation">
        <a href={base}>Home</a>
        <a href={opportunityHref("partnerships")} aria-current={!careers ? "page" : undefined}>Partnerships & Investment</a>
        <a href={opportunityHref("careers")} aria-current={careers ? "page" : undefined}>Careers</a>
      </nav>
    </header>
    <main id="main" className="opportunities-main">
      <section className="opportunities-hero" aria-labelledby="opportunity-title">
        <p className="micro">{careers ? "CAREERS AT SPARTANS" : "PARTNERSHIPS & INVESTMENT"}</p>
        <h1 id="opportunity-title">{title}</h1>
        <p className="opportunities-lead">{careers
          ? "A sharp eye. A steady hand. Pride in every finish. If you care about your craft and the people in your chair, we’d like to hear from you."
          : "Great grooming starts with people who share a vision. We welcome conversations with potential partners and investors who want to help shape the future of Spartans Barbershop."}</p>
        <div className="opportunities-actions">
          <a className="button liquid-glass" href={whatsapp}><MessageCircle size={19} aria-hidden="true" />{careers ? "APPLY VIA WHATSAPP" : "DISCUSS ON WHATSAPP"}<ArrowUpRight size={17} /></a>
          <a className="button liquid-glass" href={email}><Mail size={19} aria-hidden="true" />{careers ? "APPLY BY EMAIL" : "EMAIL YOUR PROPOSAL"}</a>
        </div>
      </section>
      <section className="opportunities-grid" aria-label={careers ? "Application information" : "Partnership information"}>
        <article className="contact-card"><span className="micro">01</span><h2>{careers ? "Bring your craft." : "Start a conversation."}</h2><p>{careers
          ? "Tell us about your skills, experience and the role you’re interested in. Whether you’re an experienced barber or exploring a career in grooming, introduce yourself and let’s discuss potential opportunities."
          : "Interested in investing, a business partnership or a brand collaboration? Share your idea, relevant background and the kind of involvement you have in mind. Our team will review your enquiry and discuss whether there’s a fit."}</p></article>
        <article className="contact-card"><span className="micro">02</span><h2>{careers ? "Tell us about yourself." : "Share your proposal."}</h2><ul>{(careers
          ? ["Your name and contact details", "Preferred branch: Main Branch / Shop 01, Second Branch / Shop 02, or Third Branch / Shop 03", "Role of interest and relevant experience", "Availability and a CV or portfolio, if you have one"]
          : ["Your name, company and contact details", "The type of partnership or investment you’re considering", "Your preferred location and proposal overview", "Your preferred time for an introductory conversation"]
        ).map(item => <li key={item}>{item}</li>)}</ul></article>
        <article className="contact-card"><span className="micro">03</span><h2>{careers ? "Connect directly." : "Talk to the team."}</h2><p>{careers
          ? "Send your introduction by WhatsApp or email. Our team can confirm current vacancies, branch needs and next steps. Positions, pay and working arrangements will be discussed directly."
          : "Contact Spartans directly by WhatsApp or email. Any opportunity, commercial terms or investment arrangement will be reviewed and agreed individually. An enquiry does not create a commitment."}</p>
          <a className="contact-detail" href={whatsapp}><MessageCircle size={17} />{business.whatsappNumber}</a>
          <a className="contact-detail" href={email}><Mail size={17} /><span>{business.email}</span></a>
        </article>
      </section>
      <p className="opportunities-note">{careers ? "Take the next step in your grooming career. We look forward to hearing from you." : "Tell us what you have in mind. We’ll take the conversation from there."}</p>
    </main>
    <footer className="opportunities-footer"><span>© {new Date().getFullYear()} SPARTANS BARBERSHOP</span><a href={`${base}#branches`}>EXPLORE OUR BRANCHES <ArrowUpRight size={16} /></a></footer>
  </div>;
}

export function OpportunitiesLinks() {
  return <section className="section opportunities-invitation" aria-label="Work with Spartans">
    <div><p className="micro">GROW WITH SPARTANS</p><h2>Be part of our next chapter.</h2><p>Bring your ambition, your craft or your next big idea.</p></div>
    <div className="branch-grid">
      <a className="contact-card" href={opportunityHref("partnerships")}><h3>Partnerships & Investment</h3><p>Explore a business partnership, investment or collaboration with Spartans.</p><span className="contact-card-link">LET’S TALK <ArrowUpRight size={16} /></span></a>
      <a className="contact-card" href={opportunityHref("careers")}><h3>Careers</h3><p>Interested in joining our team? Introduce yourself and tell us about your craft.</p><span className="contact-card-link">JOIN THE TEAM <ArrowUpRight size={16} /></span></a>
    </div>
  </section>;
}
