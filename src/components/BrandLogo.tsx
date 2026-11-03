export function BrandLogo({ className = "" }: { className?: string }) {
  return (
    <img
      className={`brand-logo-image ${className}`}
      src={`${import.meta.env.BASE_URL}images/spartans-logo.png`}
      alt="Spartans Barbershop — Spartan helmet logo"
      width={1254}
      height={1254}
      decoding="async"
    />
  );
}
