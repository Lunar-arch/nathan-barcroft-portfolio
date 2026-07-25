import {
  Sparkles,
  Zap,
  Smartphone,
  Accessibility,
  type LucideIcon,
} from "lucide-react";

export const hero = {
  eyebrow: "Freelance",
  title: ["Websites built from scratch,", "not templated."],
  body: "Custom-coded, fast, accessible, and tailored to your business.",
  cta: {
    label: "Get started",
    ariaLabel: "Get started",
  },
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const features: {
  eyebrow: string;
  heading: string;
  items: Feature[];
} = {
  eyebrow: "Core Values",
  heading: "Here's what's important:",
  items: [
    {
      icon: Sparkles,
      title: "Custom Design",
      body: "Every layout, animation, and interaction designed to fit your brand.",
    },
    {
      icon: Zap,
      title: "Performance",
      body: "Lightning fast loads, Lighthouse 95+, performant animations. Sites that feel instant yet still interactive.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      body: "Perfect from 320px to 4K. Every layout, image, and interaction optimized for every device.",
    },
    {
      icon: Accessibility,
      title: "Accessibility",
      body: "WCAG-compliant, keyboard navigable, screen-reader friendly.",
    },
  ],
};

export const process = {
  eyebrow: "Process",
  heading: "How we work together",
  steps: [
    {
      title: "Branding & Discovery",
      body: "Together, we go over your brand: colors, logo, typography, tone. We align on what you want the site to feel like and who it's for.",
    },
    {
      title: "Component Mockups",
      body: "I design multiple versions of the core building blocks (nav, hero, cards, forms) and show how they'll look across the different pages before writing all of the pages so that we get aligned.",
    },
    {
      title: "Full Page Draft",
      body: "A complete draft of the pages in different styles and layouts, and we walk through the final details, copy, and interactions before I make the final version.",
    },
    {
      title: "Optimization & Hardening",
      body: "Performance tuning, accessibility passes, SEO essentials, security fixes, and cross-device tests before anything goes live.",
    },
    {
      title: "Launch",
      body: "Deploy to production, connect the domain, hook up analytics, and hand over a clean repo. I stick around for 21 days of fixes.",
    },
  ],
};

export type PricingTier = {
  name: string;
  priceLabel?: string;
  price: string;
  highlighted?: boolean;
  features: string[];
};

export type RetainerPlan = PricingTier & {
  cadence: string;
};

export const pricing = {
  eyebrow: "Pricing",
  heading: "Flexible starting prices.",
  designTabs: ["Design", "Maintenance"] as const,
  tiers: [
    {
      name: "Launch Sites",
      priceLabel: "Starting at",
      price: "$250",
      features: [
        "Product launches, event pages, and local business presences",
        "Single-page layout",
        "Mobile responsive",
      ],
    },
    {
      name: "Growth Sites",
      priceLabel: "Starting at",
      price: "$800",
      highlighted: true,
      features: [
        "Growing businesses, service providers, and established brands",
        "Multi-page layout for specific goals",
        "CMS integration",
        "SEO essentials",
      ],
    },
    {
      name: "Advanced Builds",
      priceLabel: "Starting at",
      price: "$1,500",
      features: [
        "Advanced functionality",
        "Custom web application logic",
        "Custom backend logic",
        "Complex interactions",
      ],
    },
  ] satisfies PricingTier[],
  designFootnote:
    "Every build includes a clean handoff: full repo ownership, domain DNS routing, and Lighthouse metrics on deployment. Domain and hosting are paid directly by you and not included in the build price.",
};

export const retainers = {
  heading: "Ongoing support",
  body: "Keep your site fast and secure. 24-hour response guarantee, including weekends.",
  plans: [
    {
      name: "Core Growth",
      price: "$120",
      cadence: "/ month",
      features: [
        "1 hr/mo backend maintenance, updates & security patches",
        "Optional 45-min strategy call (deducted from hours)",
        "24-hour response guarantee, including weekends",
      ],
    },
    {
      name: "Accelerated Growth",
      price: "$220",
      cadence: "/ month",
      highlighted: true,
      features: [
        "3 hrs/mo optimization, DB management & troubleshooting",
        "Optional 1hr 30 min strategy call (deducted from hours)",
        "24-hour response guarantee, including weekends",
      ],
    },
  ] satisfies RetainerPlan[],
  footnote:
    "Out-of-scope work billed at a flat $45/hour. Retainer hours don't roll over month to month.",
};

export const contact = {
  eyebrow: "Contact",
  heading: "Let's talk about your project.",
  success: "Thanks — I'll reply within 24 hours.",
  submitLabel: "Send message",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} Nathan Barcroft. All rights reserved.`,
  email: "hello@nathanbarcroft.com",
  location: "United Kingdom",
  backHome: "Back home",
};