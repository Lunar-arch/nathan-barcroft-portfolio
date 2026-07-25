# Portfolio Site Structure & Layout

## Overview

One domain (`nathanbarcroft.com`), three pages, one Next.js codebase.

- `/` — Homepage (hub, works for all audiences)
- `/freelance` — Freelance sales page (for clients)
- `/resume` — Formal resume page (for colleges, recruiters)

---

## Page 1: Homepage (`/`)

The hub. Demonstrates skill through interaction. Funnels people to the right place.

### Section 1: Hero
- **Full viewport height**, dark or gradient background
- **Entrance animation** (you already have this — the progress bar + reveal flow)
- **Name + one-liner**: "Nathan Barcroft — Full stack developer & web designer"
- **Subheadline**: One sentence, broad enough for both audiences. Something like "I build polished, performant web experiences with modern React and Next.js."
- **Two CTAs**:
  - "See my work" → smooth scroll to projects section
  - "Hire me" → links to `/freelance`
- **Visual element**: Your existing circular avatar area, maybe add a subtle 3D element with react-three-fiber (you have it installed). Floating geometric shape, parallax on mouse move, nothing crazy.
- **Background**: Subtle gradient or noise texture. The spotlight mouse-tracking effect you built could live here too.

### Section 2: Quick About
- **Scroll-triggered reveal** (fade + slide up)
- **2-3 sentences**: Who you are, what you care about, what you build
  - "I'm a 17-year-old full stack developer with a frontend focus. I build accessible, performant web apps with modern tools — React, Next.js, TypeScript, Three.js. I care about the details: animations that feel right, loading states that respect users, code that's clean and maintainable."
- **Small detail row**: Location, availability status ("Available for freelance"), maybe a "currently learning" tag
- **Link to `/resume`** for the full version

### Section 3: Featured Projects (2-3 projects)
- **Scroll-triggered stagger** — each project card animates in as it enters viewport
- **Each project gets a full-width row** (not small cards — bigger, more immersive):
  - **Left side**: Screenshot or live preview (iframe if deployable, screenshot otherwise)
  - **Right side**: Project name, one-sentence description, tech stack tags, links (live demo, repo)
  - **Hover effect**: Slight scale on the screenshot, maybe a spotlight or border glow
- **Projects to include** (pick your best 2-3):
  - Portfolio site itself (meta but valid — "This site" with notes on what makes it interesting)
  - openclaw-dashboard
  - scholar-doc
  - busy-work-doer
  - Church demo (once built)
- **"View all projects" link** at the bottom → could go to a `/projects` page later if you build more

### Section 4: Skills / Tech Stack
- **Interactive grid** — logos or names of technologies you use
- **Hover effect**: Each skill card lifts, shows a one-word description or a small detail
- **Group by category**:
  - Frontend: React, Next.js, TypeScript, Tailwind CSS, Three.js, Motion (Framer Motion)
  - Backend: Node.js, APIs, databases (whatever you use)
  - Tools: Git, Vercel, Figma (if you use it)
- **Animation**: Stagger in on scroll, maybe a 3D tilt on hover (you have react-three-fiber)
- This section is light on text, heavy on visual polish

### Section 5: Contact / Footer
- **Simple**: Email link, GitHub, maybe LinkedIn
- **Two links again**: "Hire me for a project" → `/freelance`, "See my resume" → `/resume`
- **Minimal text**, let the design carry it

---

## Page 2: Freelance (`/freelance`)

The sales page. Small business owners land here. Clean, confident, no fluff.

### Section 1: Hero
- **Shorter than homepage hero** — maybe 60vh
- **Headline**: "Websites built from scratch, not templated." (or similar — positive framing, not anti-AI)
- **Subheadline**: "Custom-coded, fast, accessible, and tailored to your business."
- **CTA**: "Get started" → scrolls to pricing/contact

### Section 2: What You Get
- **3-4 feature cards** with icons (lucide-react):
  - Custom Design — "Built for your brand, not a template"
  - Performance — "Fast load times, optimized for Google"
  - Mobile Responsive — "Looks great on every screen"
  - Accessibility — "Usable by everyone, not just the able"
- **Scroll-triggered stagger**, hover lift effect

### Section 3: Process
- **4 steps, scroll-triggered timeline**:
  1. Discovery — "We talk about your business and what you need"
  2. Design — "I create a mockup for your approval"
  3. Build — "I code it from scratch with modern tools"
  4. Launch — "I deploy, optimize, and hand it over"
- **Each step animates in** as you scroll. Maybe a connected line between them.

### Section 4: Pricing
- **3 tiers** in cards:
  - **Single Page — $200**: One page, mobile responsive, contact form, basic SEO, 2-3 day turnaround
  - **Standard — $500**: Up to 5 pages, custom animations, CMS setup, SEO, deployment, 1-2 week turnaround
  - **Custom — $1,200+**: Custom web apps, complex functionality, ongoing maintenance, scoped per project
- **Middle tier highlighted** ("Most popular" badge or visual emphasis)
- **Note below**: "All sites include hosting setup, domain connection, and 30 days of free fixes."

### Section 5: Portfolio / Work
- **Reuse the project cards** from the homepage, but framed for clients
- Focus on visual quality — screenshots, live demos, before/after if you have them
- Church demo goes here once built

### Section 6: Contact Form
- **Simple form**: Name, email, business name (optional), message
- "Tell me about your project"
- **Submit handler**: Could use a simple form service (Formspree, Resend) or a Next.js API route
- **No pressure copy**: "No obligation. Tell me what you're thinking and I'll get back to you within 24 hours."

### Section 7: Footer
- Email, GitHub, back to homepage

---

## Page 3: Resume (`/resume`)

The formal page. Colleges, recruiters, scholarship committees. Clean, structured, professional.

### Section 1: Header
- **Name**: Nathan Barcroft
- **Title**: Full Stack Developer
- **Contact row**: Email, location (Texas), GitHub link, maybe LinkedIn
- **No fancy animations here** — maybe a subtle fade-in, that's it. This page should feel professional and restrained.

### Section 2: Summary
- **3-4 sentences**, professional tone:
  - "Full stack developer specializing in modern web technologies. Proficient in React, Next.js, TypeScript, and Three.js with a focus on building accessible, performant user interfaces. Self-taught with hands-on project experience in frontend development, API integration, and developer tooling. Seeking opportunities to apply and grow my skills in a professional or academic environment."

### Section 3: Education
- **School name**, expected graduation year (2027?)
- **Relevant coursework** if any (CS classes, etc.)
- **GPA** if it's good (optional — only if it helps)

### Section 4: Technical Skills
- **Categorized list, no fluff**:
  - Languages: TypeScript, JavaScript, HTML, CSS, (Python? whatever you know)
  - Frameworks: React, Next.js, Node.js, Three.js
  - Tools: Git, Vercel, Tailwind CSS, Framer Motion
  - Other: REST APIs, accessibility (WCAG), responsive design

### Section 5: Projects
- **Same projects as homepage but formatted formally**:
  - Project name
  - One-sentence description
  - Tech stack
  - Link (live demo or repo)
  - Maybe 1-2 bullet points on what it does / what you learned
- Include: portfolio site, openclaw-dashboard, scholar-doc, busy-work-doer, church demo

### Section 6: Experience
- **If you have any**: freelance work, internships, volunteer work, open source contributions
- **If not yet**: "Available for freelance web design — see examples at nathanbarcroft.com/freelance"
- **Church work counts** if you end up doing their site or even the demo

### Section 7: Footer
- "Download PDF" button (generate from the page or keep a static PDF)
- Link back to homepage

---

## Interaction Patterns (apply across all pages)

### Scroll-triggered reveals
- Use `whileInView` from Motion (Framer Motion) — you already have it installed
- Fade + slide up, staggered children
- Respect `useReducedMotion` (you already handle this)

### Mouse spotlight
- Your TextSpotlight component already does this
- Could be reused on headings throughout the site

### Hover states
- Project cards: slight scale + border glow
- Buttons: your SpotlightButton component, already built
- Skill cards: 3D tilt or lift effect

### Page transitions
- Next.js app router transitions with Motion — smooth fade between routes
- Layout stays consistent (header), content fades in

### Loading
- Your entrance onboarding flow on the homepage
- Simpler fade-in on the other pages (no progress bar needed)

---

## Content You Need to Write

**Bare minimum copy (you can write this in 30 min):**

1. Homepage hero: 1 headline + 1 sentence
2. Homepage about: 2-3 sentences
3. Project descriptions: 1 sentence each (you know these projects)
4. Freelance hero: 1 headline + 1 sentence
5. Freelance features: 4 one-liners
6. Freelance process: 4 one-sentence steps
7. Freelance pricing: 3 tier descriptions (already mapped above)
8. Resume summary: 3-4 sentences
9. Resume skills: just a list
10. Resume education: factual

**That's maybe 300 words total.** No marketing copywriting needed — it's all factual or one-liners. The site's design and interactions do the heavy lifting.

---

## File Structure (Next.js App Router)

```
app/
  layout.tsx          (shared layout, header, fonts)
  page.tsx            (homepage)
  freelance/
    page.tsx          (freelance sales page)
  resume/
    page.tsx          (resume page)
  components/
    (shared components — Header, Footer, ProjectCard, etc.)
    (homepage-specific components)
    freelance/
      (freelance-specific components)
    resume/
      (resume-specific components)
  globals.css
```

---

## Priority Order for Building

1. **Homepage redesign** — update your existing page with the new section structure
2. **Resume page** — straightforward, mostly static content
3. **Freelance page** — needs the most custom components (pricing cards, process timeline, contact form)
4. **Church demo** — separate project, but feeds into the portfolio
5. **Deploy** — Vercel, free tier, custom domain