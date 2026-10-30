# The Hustle Barber Club

A cinematic React + TypeScript landing page. The brand is an editable concept name, not a claim of ownership.

## Development

Node 24 was used to validate this project.

```sh
cd /workspace/barber
npm ci --no-audit --no-fund
npm run dev -- --port 5173
npm run build
npm run test:e2e
```

Browser tests use the system Chromium at `/usr/bin/chromium`, with the development server already running. The cloud environment is isolated: use this checkout; do not create worktrees unless explicitly requested. Processes must be restarted after restoring a snapshot.

## Before launch

Edit `src/data/business.ts` with verified business details. Set either `bookingUrl` or an international-format `whatsappNumber` to activate booking destinations. With both empty, booking actions lead to an explicit coming-soon notice. No reservation backend, customer form, analytics or fabricated review data is included. Confirm pricing, staff, address, opening hours, social accounts, brand ownership and a business-specific privacy policy. Edit title, description and Open Graph metadata in `index.html`; add canonical URL and business schema only after the domain and business details are confirmed.

The gallery currently shows **explicitly labeled editorial art-direction placeholders**, not actual haircut results. Replace them and staff portraits with business-provided or properly licensed photography before launch. The craft section is an editorial still, clearly labeled as awaiting a film. Other sections do not reuse the Hero video.

## Media

`public/videos/barbershop-hero.mp4` is the exact 10.04-second, 1280×720 user-uploaded Kling file (8.93 MB), copied without recompression. SHA-256: `736a16a00ad26d1fdf80bb9057d9a8f33e9130beb823ea9923934f38e6cc7746`.

`public/images/hero-poster.jpg` is a frame extracted at 2 seconds. Remaining SVG media are original typographic placeholder compositions. Their names map to editable media IDs in the data file; no stock photographs are bundled. No additional videos were supplied.

Instrument Serif and Manrope are self-hosted from the official Google Fonts repository; corresponding OFL licenses are included in `public/fonts`. No external font request is required at runtime. Automatic playback is muted, inline and optional: the poster remains when playback fails or reduced motion is enabled. A video control supports pause/resume; playback pauses when offscreen or when the tab is hidden. Loop opacity is controlled by one requestAnimationFrame loop, fading through black.

## Architecture

- `src/components/HeroSection.tsx`: Hero entrance, mouse parallax and GSAP scroll transition.
- `src/components/CinematicVideo.tsx`: video lifecycle, poster and media primitives.
- `src/components/Navbar.tsx`: desktop and animated keyboard-accessible mobile navigation.
- `src/components/Sections.tsx`: editable editorial, service, pricing, team, FAQ, booking and footer sections. Testimonials are deliberately omitted until verified reviews are supplied.
- `src/components/GallerySection.tsx`: category filtering, animated layout, keyboard/focus-trapped/swipe lightbox.
- `src/components/UI.tsx`: reusable reveals, headings, magnetic and liquid-glass buttons.
- `src/index.css`: responsive art direction and the supplied foundational liquid-glass effect.
- `tests/site.spec.ts`: seven responsive widths, video playback, gallery, menu, FAQ and reduced-motion checks.

The development runtime is tested in Chromium. Safari/iOS and Firefox require separate device/browser verification before launch. Deployment and a booking provider connection are separate from the local production build.

## GitHub Actions deployment

Push to `main` to run `.github/workflows/deploy.yml`. The workflow installs from the lockfile, builds with `GITHUB_PAGES=true` (base `/barber/`), uploads the Pages artifact and deploys using GitHub's official Pages actions. No third-party hosting service or deployment secret is required.

Expected project URL after a successful deployment: https://fnfmobilitymy-boop.github.io/barber/

If initial Pages auto-enablement is denied by GitHub, a repository administrator must select **Settings → Pages → Build and deployment → Source → GitHub Actions**, then rerun the workflow. Availability depends on repository visibility and the account's GitHub Pages plan. The expected URL is not evidence of successful deployment.
