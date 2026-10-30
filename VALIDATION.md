# Validation — 2026-10-30

- `npm ci --no-audit --no-fund`: passed; frozen lockfile installation verified.
- `npm run build`: passed (TypeScript + Vite production compilation).
- Production preview on port 5174: 10 Playwright tests passed.
- Responsive widths verified: 375, 390, 430, 768, 1024, 1440, 1920 px (900 px viewport height). Every section was visited, with no horizontal overflow, broken image or uncaught JavaScript error.
- Mobile menu open/Escape, category filtering, lightbox navigation/Escape, FAQ toggle, valid internal anchors, booking-coming-soon disclosure, reduced-motion poster, local font loading and Hero pause/resume/loop passed.
- After increasing touch targets, 375 and 390 px checks passed again.
- Final production browser audit: no console errors or failed resource responses; all three font faces loaded.
- Exact uploaded Hero video verified by matching SHA-256 checksums; no recompression or substitution.

Initial browser acquisition from the Playwright CDN was denied by network policy; the existing system Chromium was used successfully. Optional stock image downloads were also denied; original labeled SVG placeholders were used instead. No external host additions are needed for runtime assets. The configuration draft stores tested installation and startup instructions and preserves the original network presets.

The site is ready for frontend development. Business launch is pending actual booking details, verified business information, staff portraits, lookbook photography, additional films and business-approved privacy copy. Testimonials are omitted until real reviews are supplied. Safari/iOS, Firefox, deployment, publishing, and fresh-task snapshot restoration have not been verified.
