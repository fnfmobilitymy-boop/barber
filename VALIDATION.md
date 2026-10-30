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

## Entry invitation and editorial imagery update

- 14 Playwright checks passed, including all seven viewport widths and the previous video/gallery/navigation checks.
- Entry booking invitation verified on 390 px and 1440 px: focus trapping, Escape dismissal, inert background, session dismissal memory and booking-information navigation.
- Twelve distinct editorial photograph IDs verified across the craft, detail, shop scenes, service cards and hairstyle collection; no image is reused in another section.
- Photographs are original AI-generated editorial inspiration and are disclosed as such. Shop/staff/customer authenticity is not claimed.
- Two original contact sheets contain six distinct square photos each; the UI displays a separate CSS-clipped cell per content location. Replaced unused typographic SVG placeholders.

## Reference motion update

- Production build and 15 browser checks passed, including the existing booking, seven viewport, gallery, unique-photo and video checks.
- Added verification that craft media expands with scrolling, its sculpted clipping is applied, the header compacts, masked heading words become fully visible and reduced-motion removes transforms/clipping.
- Desktop stable-frame review covered Hero, craft, scene layering and experience sections; browser console audit returned no errors.
- Responsive scene parallax is isolated inside clipping frames, and cards move through transforms rather than animated margins. No new photos or duplicate photo placements were introduced.

## Video playback correction

- Reproduced repeated rebuffering with the original ~7.1 Mbps/8.93 MB file at a simulated 3.6 Mbps mobile connection: after the 24-second observation window the playback position was only about 6 seconds.
- Added a same-footage 1,899,583-byte web derivative (about 79% smaller) with the same 1280×720, 24 fps, 241 frames and 10.04-second duration. Original source SHA-256 remains unchanged. FFmpeg SSIM comparison across all frames: 0.989087 (an encoding quality metric, not a guarantee of identical pixels).
- Replaced per-frame opacity and forced `currentTime = 0` resets with browser-native looping and a one-time CSS reveal. No recurring black fade or JavaScript playback-time assignments remain.
- Coalesced play requests, preserved manual pause during tab/offscreen changes, observed a stable container with a small offscreen margin and fixed the mobile control's pointer obstruction.
- Below-fold editorial photos now request low priority; the mobile welcome overlay avoids an expensive full-screen backdrop blur over video.
- All 16 browser checks passed. The mobile network regression test completed two uninterrupted native loops after buffering, with no scripted seeks, no unintended paused samples, no recurring opacity fade and no stop lasting 1.5 seconds. Offscreen return resumed playback, while a manual pause remained paused after scrolling away and back.
