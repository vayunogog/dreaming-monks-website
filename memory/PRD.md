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
- 2026-08-16: Hero video playlist — the two uploaded clips arrived as static images, so they were encoded into optimized 6s web videos (Ken Burns motion, 1080p, ~400-500KB each) in both WebM (VP9) and MP4 (H.264) with poster frames (/public/videos/). Hero now plays them as a continuous muted autoplay playlist: next video preloads (preload=auto) and starts 1.1s before the current ends with a 1s opacity crossfade (no flash/gap), loops forever, edge-to-edge object-cover, playsInline for mobile. Text/CTAs unchanged on top of a bg-black/55 overlay; hero muted colors flipped back to white for readability. ffmpeg installed in container. Verified: playback state machine (v1 6s → crossfade → v2 → back to v1), correct clip order, both files HTTP 200, desktop screenshots of both clips.

## Backlog / Next Tasks
- P0: None blocking.
- P1: Email notification on new lead (Resend); admin view for leads (auth); real brand logos for trust wall; real social profile URLs.
- P2: Inventory/locations page with society-level map; case studies; multi-language (Hindi); SEO schema + OG image; blog/press section.
