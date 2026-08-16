# PRD — Dreaming Monks Landing Page

## Original Problem Statement
Single-page marketing website for "Dreaming Monks" (dreamingmonks.com), a Digital Out-of-Home (DOOH) advertising company in Delhi-NCR, India. B2B audience: brands/advertisers buying ad space. Tagline: "Advertising That Comes Home". Brand: bold red (#E31E24), black, white; angular shapes; bold condensed typography; premium media-industry tone. Logo provided by user (red/black/white DM mark).

## Architecture
- Frontend: React 19 + Tailwind + framer-motion + Lenis (smooth scroll) + react-fast-marquee + react-countup. Single scrolling page, anchor nav via Lenis scrollTo.
- Backend: FastAPI + Motor (MongoDB). POST /api/leads (validated with pydantic + EmailStr), GET /api/leads, GET /api/ health.
- Assets: /public/logo.png (user logo), /public/media-kit.pdf (generated branded media kit via fpdf2, script at /app/scripts/generate_media_kit.py).
- Design system: /app/design_guidelines.json (Brutalist media/agency). Fonts: Bebas Neue (display), Manrope (body).

## User Personas
- Brand marketing manager / media planner evaluating DOOH inventory in Delhi-NCR.
- Agency buyer requesting rates and a media kit.

## Core Requirements (static)
Sticky nav with logo+tagline and Get a Quote CTA; kinetic hero; animated stats bar (30+ societies, 720 screens, Delhi-NCR, 55,000+ daily impressions); What We Offer (3 inventory cards); Why Us (4 value props); How It Works (3 steps); trust/logo placeholder row; lead capture form; footer with contacts. Responsive, smooth anchors, scroll animations.

## Implemented
- 2026-08-15: Full landing page — nav (desktop + mobile menu), hero (masked line reveal, red intro wipe, mouse parallax angular shapes, scroll parallax), stats bar with scroll-triggered counters, editorial marquee, Offer / Why Us / How It Works / Trust sections as numbered chapters, contact form saving leads to MongoDB with success state + toast, footer with socials and contact details, branded media-kit.pdf download, data-testids throughout. Verified: leads API (POST + GET), form submission e2e, media kit HTTP 200, desktop + mobile (390px) screenshots.
- 2026-08-16: Light theme — whole site flipped to white/light-grey backgrounds with black text and red accents (logo made transparent via PIL, no white box). Google Sign-In (Emergent-managed Google Auth) added to the quote form: /api/auth/session, /api/auth/me, /api/auth/logout; signed-in users get name/email prefilled + signed-in banner; leads optionally carry user_id. New "Our Sites" gallery section (chapter 04) with 6 marked photo-upload placeholders; Offer cards now have photo placeholder areas; nav/footer gained "Our Sites" link; Contact renumbered to 05. Verified: auth/me 401 unauth + 200 with Bearer test session, signed-in banner + prefill via cookie test, lead POST 200, mobile menu contrast, full-page desktop screenshots.
- 2026-08-16: Real hero photos swapped in — user's two real photos (elevator lobby with viewers + Corevo elevator ad screens) optimized to 1920px progressive JPEGs (~220-300KB, /public/photos/hero-1.jpg, hero-2.jpg) and set as HERO_PHOTOS, replacing the placeholder lobby stills. Same 5s/1s crossfade loop and overlay. Verified: slide 1 shows photo 1, crossfades to photo 2 at ~5s, opacity states confirmed.
- 2026-08-16: Real install videos moved to Our Sites gallery — verified uploads as genuine H.264/AAC 720p 10s MP4s via ffprobe, re-encoded for web (audio stripped, faststart, sites-1.mp4 1.5MB / sites-2.mp4 666KB + VP9 WebM fallbacks). First gallery frame is now a looping seamless video playlist (reusable VideoPlaylist.jsx component: preload next, 1.1s early start, 1s crossfade, muted autoplay, cover-fit); remaining 5 frames stay marked placeholders. Hero converted from video to a photo slideshow: HERO_PHOTOS array (module-level const in Hero.jsx, currently the 2 lobby photos, user to supply 2 more), 5s per photo, 1s opacity crossfade, loops forever, same dark overlay + text/CTAs. Verified: slide opacity flip at 5s, sites playlist state machine (v1 10s → v2 → loop), real footage frames visible, all 4 files HTTP 200.

## Backlog / Next Tasks
- P0: None blocking.
- P1: Email notification on new lead (Resend); admin view for leads (auth); real brand logos for trust wall; real social profile URLs.
- P2: Inventory/locations page with society-level map; case studies; multi-language (Hindi); SEO schema + OG image; blog/press section.
