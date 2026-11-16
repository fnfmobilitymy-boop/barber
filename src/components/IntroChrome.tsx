/** Moving metallic light uses the existing brand artwork as its exact silhouette. */
export function IntroChrome() {
  return (
    <svg className="intro-chrome" viewBox="0 0 1254 1254" role="img" aria-label="Spartans Barbershop — Spartan helmet logo">
      <defs>
        <clipPath id="intro-logo-disc"><circle cx="627" cy="615" r="565" /></clipPath>
        <filter id="intro-logo-ink" colorInterpolationFilters="sRGB">
          <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  -.2126 -.7152 -.0722 0 1" />
        </filter>
        <mask id="intro-logo-silhouette" maskUnits="userSpaceOnUse" x="0" y="0" width="1254" height="1254" style={{ maskType: "alpha" }}>
          <g clipPath="url(#intro-logo-disc)">
            <image href={`${import.meta.env.BASE_URL}images/spartans-logo.png`} width="1254" height="1254" filter="url(#intro-logo-ink)" />
          </g>
        </mask>
        <linearGradient id="intro-chrome-metal" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#edf0f5" /><stop offset=".19" stopColor="#6b6d79" />
          <stop offset=".38" stopColor="#181922" /><stop offset=".52" stopColor="#e4e6ee" />
          <stop offset=".66" stopColor="#fafbff" /><stop offset=".81" stopColor="#343541" /><stop offset="1" stopColor="#999ca9" />
        </linearGradient>
        <linearGradient id="intro-chrome-caustic" x1="0" y1="0" x2="1" y2=".3">
          <stop stopColor="#010107" stopOpacity="0" /><stop offset=".31" stopColor="#010107" stopOpacity="0" />
          <stop offset=".39" stopColor="#222867" /><stop offset=".435" stopColor="#87ceff" />
          <stop offset=".46" stopColor="#fff" /><stop offset=".48" stopColor="#fff8b4" />
          <stop offset=".50" stopColor="#eaa95e" /><stop offset=".525" stopColor="#5b365b" />
          <stop offset=".56" stopColor="#121320" stopOpacity=".7" /><stop offset=".68" stopColor="#010107" stopOpacity="0" />
          <stop offset="1" stopColor="#010107" stopOpacity="0" />
        </linearGradient>
        <filter id="intro-chrome-flow" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency=".002 .004" numOctaves="2" seed="4" result="flow" />
          <feDisplacementMap in="SourceGraphic" in2="flow" scale="190" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g mask="url(#intro-logo-silhouette)">
        <path fill="url(#intro-chrome-metal)" d="M0 0h1254v1254H0z" />
        <g filter="url(#intro-chrome-flow)">
          <path className="intro-chrome-reflection" fill="url(#intro-chrome-caustic)" d="M-1254-627h3762v2508h-3762z" />
        </g>
      </g>
    </svg>
  );
}
