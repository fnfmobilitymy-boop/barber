import { useEffect } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { activeBranch, branchHref, locations } from "../data/business";
import { AnimatedHeading, Eyebrow } from "./UI";

export function BranchSelector() {
  useEffect(() => {
    document.title = activeBranch
      ? `Spartans Barbershop — ${activeBranch.name}`
      : "Spartans Barbershop — Choose your branch";
  }, []);
  return (
    <section id="branches" className="section branch-selector" aria-label="Spartans branches">
      <Eyebrow>{activeBranch ? activeBranch.label : "OUR BRANCHES"}</Eyebrow>
      <AnimatedHeading>{activeBranch ? activeBranch.name : "Choose your branch."}</AnimatedHeading>
      <p>Explore your branch’s services, appointments and directions.</p>
      <nav className="branch-grid" aria-label="Choose a branch">
        {locations.map((branch) => (
          <a key={branch.id} className="contact-card branch-option" href={branchHref(branch.id)} aria-current={activeBranch?.id === branch.id ? "page" : undefined}>
            <span className="micro">{branch.label}</span>
            <h3>{branch.name}</h3>
            <address><MapPin size={16} aria-hidden="true" /> {branch.address}</address>
            <span className="contact-card-link">VIEW BRANCH <ArrowUpRight size={16} aria-hidden="true" /></span>
          </a>
        ))}
      </nav>
      {activeBranch && <a className="contact-card-link" href={import.meta.env.BASE_URL}>ALL BRANCHES <ArrowUpRight size={16} /></a>}
    </section>
  );
}
