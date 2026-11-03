/** Vector energy ring keeps the short supplied reference's blue-fluid look crisp. */
export function IntroEnergy() {
  return (
    <div className="intro-energy" aria-hidden="true">
      <svg viewBox="0 0 400 400" focusable="false">
        <defs>
          <linearGradient id="intro-electric-blue" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0612b8" />
            <stop offset=".28" stopColor="#2463ff" />
            <stop offset=".48" stopColor="#8bdcff" />
            <stop offset=".65" stopColor="#0728fa" />
            <stop offset="1" stopColor="#142065" />
          </linearGradient>
          <filter id="intro-fluid" x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency=".014" numOctaves="2" seed="7" result="noise">
              <animate attributeName="baseFrequency" values=".014;.026;.014" dur="1.45s" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="27" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <radialGradient id="intro-orb-glow">
            <stop offset=".45" stopColor="#0824e8" stopOpacity="0" />
            <stop offset=".73" stopColor="#1040ff" stopOpacity=".25" />
            <stop offset="1" stopColor="#020518" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="188" fill="url(#intro-orb-glow)" />
        <g className="intro-energy-spin" filter="url(#intro-fluid)" fill="none">
          <circle cx="200" cy="200" r="149" stroke="#142b9c" strokeWidth="2" />
          <circle cx="200" cy="200" r="146" stroke="url(#intro-electric-blue)" strokeWidth="5" />
          <circle cx="200" cy="200" r="138" stroke="#245aff" strokeWidth="9" strokeDasharray="90 45 18 80 34 120" opacity=".75" />
          <circle cx="200" cy="200" r="154" stroke="#73bbff" strokeWidth="1.5" strokeDasharray="34 20 85 64 10 130" />
          <path d="M79 118C95 69 143 48 181 57C159 93 117 83 108 126C90 146 61 151 79 118ZM248 61C286 66 328 108 336 143C296 151 315 109 280 110C260 99 236 80 248 61ZM334 247C332 282 300 322 269 333C253 297 284 311 291 282C302 259 318 236 334 247Z" stroke="#204dff" strokeWidth="4" fill="#0d1ca4" fillOpacity=".35" />
        </g>
        <g className="intro-energy-counterspin" filter="url(#intro-fluid)" fill="none" stroke="url(#intro-electric-blue)">
          <circle cx="200" cy="200" r="151" strokeWidth="2" strokeDasharray="130 80 40 190" />
          <ellipse cx="109" cy="84" rx="20" ry="12" strokeWidth="5" />
          <ellipse cx="73" cy="131" rx="12" ry="19" strokeWidth="4" />
          <ellipse cx="308" cy="279" rx="16" ry="11" strokeWidth="4" />
        </g>
      </svg>
    </div>
  );
}
