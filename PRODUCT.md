# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, weighted equally:

- **Hiring teams** (HR and technical leads) evaluating Yiğit for a full-time full-stack / software role. They arrive from a CV, LinkedIn or GitHub link, skim the range of work, open one or two projects, and decide whether to get in touch.
- **Freelance clients** (companies or individuals) who want something built. They want to see that he can take a request from idea to a working, shipped product, then email him about a project.

A third, narrower audience reaches the app pages from Google Play: users of StandBy+ and Stok+ looking for the privacy policy or support contact.

## Product Purpose

A personal portfolio for Yiğit Kalaycıoğlu, Information Systems Engineer and full-stack developer, that turns a visit into contact (email first; LinkedIn and GitHub as alternatives). Success: a hiring team or client understands what he can build within a minute and reaches out.

## Positioning

What a neighbouring junior portfolio cannot truthfully copy:

1. **Range.** Web apps, a 3D PC builder (three.js), optimisation/decision support, machine learning and reinforcement-learning studies, Android apps (Kotlin/Compose), Windows and Linux system services, and developer tooling — not one niche.
2. **Apps headed for real users.** StandBy+ (in Google Play internal testing) and Stok+ (being prepared for Google Play) are real Android products with privacy policies, subscriptions and support pages. They are **not yet publicly published**; never call them "published" or "live on Google Play".
3. **End to end, alone.** From a requirements document through data model, architecture/API and interface to tests and deployment; the internship bookkeeping app was built this way in four weeks.

## Operating Context

- Visitors evaluate quickly, often on a phone from a LinkedIn message or on a desktop next to a CV.
- Most web projects have a live demo running in the browser on GitHub Pages; others ship as downloadable releases or source on GitHub. Demos are evidence, not the headline.
- Turkish and English visitors both matter; the language is chosen from the browser and switchable.
- Google Play links point at `standby/` and `stokplus/` and their `privacy.html` / `gizlilik.html` pages.

## Capabilities and Constraints

- Static site on GitHub Pages, hand-written HTML/CSS/JS, no build step. Lenis (smooth scroll) loads from jsDelivr; fonts from Google Fonts.
- Bilingual TR/EN via `data-i18n` attributes and dictionaries (`assets/js/site.js`, `assets/js/proje.js`, per-page `<script type="application/json" id="tr">`). Every visible string needs both languages.
- Light and dark themes with a toggle; dark is the default look.
- Pages: home (`index.html`), project pages under `projects/*/`, app pages `standby/` and `stokplus/` with privacy pages. `projects/ntier-generator/` is a redirect. `shadow-runner/` is a separate site and out of scope.
- Fixed URLs: app pages and privacy pages must stay at their current paths and remain plainly readable.

## Brand Commitments

- Name: Yiğit Kalaycıoğlu; "YK" monogram as the logo mark.
- Palette (user-stated, binding): navy-black ground with electric cobalt blue. A redesign keeps this palette family.
- Must keep: TR/EN language switch (with its transition), light/dark theme toggle, the Play Store app/privacy pages.
- Contact: personal email `yigit.klycoglu@gmail.com` for the portfolio; `yeepylabs@gmail.com` for app support.

## Evidence on Hand

- **Projects (13):** PC Builder with 3D preview, Warehouse Order Placement, AlPaSa marketplace, Heart Disease Diagnosis (ML), Insulin Dose Adjustment (RL), Mini Bookkeeping App (ESBİ internship), Clean Architecture Generator, Multi-Tenant SLA Platform, WolCatcher, InstaReel Blocker, Stok+, StandBy+, Linux File System Monitoring Service. Five have live demos/reports.
- **Experience:** ESBİ Bilişim ve Telekomünikasyon, Software Intern (Sep–Oct 2026); Tırsan Treyler, Software Intern, .NET team (Jun–Aug 2025).
- **Education:** Sakarya University, Information Systems Engineering, graduation June 2026.
- **Certifications:** Full-Stack Web Development (Udemy, Angela Yu); Odoo Student Diploma; C# and .NET Programming (Udemy); AI Professional Development Program, 40 h (Social Office / TNC Group, verifiable link).
- **Assets:** project screenshots in `assets/img/`, `projects/*/img/`, `standby/img/`; app icons `standby/simge.png`, `stokplus/simge.png`; OG images per page.
- **Absent — do not fabricate:** testimonials, client names, employer quotes, usage numbers, download counts, ratings, years of experience beyond the internships above.

## Product Principles

1. Show range through real work; every claim on the page points at a project, a page or a repository.
2. Contact is always one step away.
3. Honest status: unreleased means unreleased; internship means internship.
4. Both languages are first-class; neither is a translation afterthought.
5. App pages serve their Google Play users first: privacy and support stay findable and readable.
