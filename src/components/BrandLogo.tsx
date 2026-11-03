export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-logo-image ${className}`}
      src={`${import.meta.env.BASE_URL}images/spartans-logo-alt.png`}
      alt="Spartans Barbershop — Spartan helmet logo"
      width={1536}
      height={1024}
      decoding="async"
    />
  );
}
