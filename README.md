# Spartans Barbershop

A React + TypeScript landing page for Spartans Barbershop. The page contains the Hero, service prices, five-video showcase, real shop photos, FAQs, booking/contact details and two branch maps. Copy is in English only. There is no local booking database.

## Development

Use the existing isolated checkout; do not create a Git worktree unless explicitly requested. Node 24 and `/usr/bin/chromium` are available in the managed environment.

```sh
cd /workspace/barber
npm ci --no-audit --no-fund
npm run dev -- --port 5173 --strictPort
```

With the dev server running, use `npm run test:e2e` for browser checks and `npm run build` for TypeScript and production validation. Processes must restart after restoring a cloud snapshot.

## Branch pages

Static-host-compatible branch URLs use the `branch` query parameter and survive refresh:

- `?branch=petaling-jaya`: Seksyen 14 (existing address).
- `?branch=taman-medan`: Branch 02, with its confirmed Setmore URL and 18 services for both Ali Shah and Zabih.
- `?branch=bandar-saujana-putra`: existing Bandar Saujana Putra location.

The homepage asks customers to select a branch before booking. Each branch opens directly on its own heading, shop number, address and booking actions, with its own menu. Shop 01 is the main branch at Seksyen 14, Shop 02 is Taman Medan, and Shop 03 is Bandar Saujana Putra. Maps use Google Maps address embeds; Google review links currently search for the business and address. Supply exact Google Business Profile/review links to target the listings directly. Setmore ratings are not Google ratings and are not displayed as such.

## Content

- `src/data/business.ts`: contact details and branch addresses, each with a Google Maps embed and directions link. Branch 02 hours have not been supplied; customers are directed to contact the team. The proposed third branch is omitted at the user's request.
- `src/data/serviceMenu.ts`: 18 Taman Medan services across four categories.
- `src/data/mainBranchMenu.ts`: 27 main branch menu entries across five categories, preserving the supplied descriptions, prices and durations. Black dye appears in two categories as supplied. The supplied child haircut title (<4Y) and description (under 6) differ and are retained pending owner clarification.
- `src/data/thirdBranchMenu.ts`: 18 Branch 03 grooming services plus three free meeting slots, preserving the supplied category and item ordering.
- `src/data/barbers.ts`: Taman Medan staff Ali Shah and Zabih, both offering all 18 confirmed services.
- `src/data/videos.ts`: five independent showcase clips supplied as a–e. They never replace or enter the Hero player. Full framing, original colour and audio are retained, with muted playback by default.
- `src/data/shopPhotos.ts`: eight original photos copied unchanged from `iloveimg-compressed.zip` to `public/images/shop/`. Each appears once. Photos are not assigned to specific branches because no branch mapping was supplied.
- `src/components/BrandLogo.tsx`: the shared helmet logo used in the header and automatic intro and footer. The PNG was prepared with image generation from the user's circular logo reference; it is not an original uploaded source file.
- `src/components/ContactDock.tsx`: booking shortcuts on the Hero, hidden over the remaining content to avoid covering prices, photos or contact details.

Fonts are self-hosted; OFL licences are in `public/fonts`. Headlines and key buttons use Barlow Condensed Black Italic for the owner’s bold, condensed, slanted lettering reference; body copy retains Manrope for readability. The previous AI hairstyle gallery, service image cards, placeholder staff profiles, generic editorial sections and booking welcome popup have been removed.

## Booking

Booking destinations: Shop 01 uses https://spartansbarbershop.setmore.com/, Shop 02 uses https://spartansbarbershopsb02.setmore.com/, and Shop 03 uses https://spartansbarbershopsb03.setmore.com/. Homepage booking buttons lead to branch selection. Setmore staff accounts, calendar permissions, service availability and notifications must be configured by the owner; see `SETMORE_SETUP.md`. A website link does not configure those permissions.

## Media behaviour

The Hero uses `public/videos/barbershop-hero-web.mp4`, separately from the five showcase videos. The original source file `barbershop-hero.mp4` is retained; SHA-256: `736a16a00ad26d1fdf80bb9057d9a8f33e9130beb823ea9923934f38e6cc7746`.

Videos pause offscreen and when the tab is hidden. The showcase supports play/pause, sound, automatic switching, thumbnails, previous/next, keyboard and touch input. Reduced motion disables automatic showcase playback and switching. The logo intro uses a blue fluid-energy ring inspired by the owner’s supplied 1.43-second reference, then reveals the circular logo and exits automatically without controls. It is rendered as vector/CSS motion to avoid enlarging the 202×116 reference video. Reduced motion shows a brief static logo.

## Deployment

Push to `main` to run `.github/workflows/deploy.yml`. The workflow builds with `GITHUB_PAGES=true`, using `/barber/` as the base path, and deploys to GitHub Pages:

https://fnfmobilitymy-boop.github.io/barber/

For a matching local production preview, run `GITHUB_PAGES=true npm run build`, then `GITHUB_PAGES=true npm run preview -- --port 5175 --strictPort`. Verify the workflow result after a push; a local build alone does not establish publication. Safari/iOS and Firefox require separate browser/device verification.

The circular helmet logo (`spartans-logo.png`) is restored throughout the website and browser icons. The alternative arch-logo trial remains recoverable in Git history.

The showcase cards form a curved 3D coverflow carousel based on the owner’s later reference. The selected card is centred and enlarged while neighbouring cards tilt and recede into perspective. The selected visible card plays a muted preview. When only the card rail is visible, Auto advances every 3.5 seconds and moves the selected card to the centre; the main player pauses offscreen. Turning Auto off stops card previews and automatic switching. Reduced motion disables automatic animation.

## Partnerships and careers

`?page=partnerships` and `?page=careers` are independent pages compatible with static hosting. Both are linked in navigation, the footer and the Grow with Spartans section. WhatsApp and mailto links prefill the corresponding enquiry/application message and use the existing business contacts. No application data is stored by this website.
