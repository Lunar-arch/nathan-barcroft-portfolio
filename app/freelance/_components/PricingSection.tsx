"use client";

import React from "react";
import { Check } from "lucide-react";
import PillTabs, { type tabType } from "@/app/_components/PillTabs";
import { pricing, retainers } from "@/contents/page/freelance/content";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export default function PricingSection({
  tab,
  onTabChange,
}: {
  tab: "Design" | "Maintenance";
  onTabChange: (tab: "Design" | "Maintenance") => void;
}) {
  const pricingTabs: tabType[] = pricing.designTabs.map((title) => ({
    title,
    active: tab,
    onClick: (t: string) => onTabChange(t as "Design" | "Maintenance"),
  }));

  return (
    <section className="relative">
      <motion.div
        initial={{ opacity: 1}}
        animate={tab == "Design" ? { opacity: 1} : { opacity: 1}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="z-10 absolute inset-y-12 w-full rounded-l-full bg-linear-to-tr from-blue-500 via-indigo-700 to-purple-900"
      />
      <div className="z-20 mx-auto max-w-6xl px-6 flex flex-col items-center">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-widest text-foreground-secondary">
            {pricing.eyebrow}
          </div>
          <h2 className="z-20 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {tab == "Design" ? pricing.heading : retainers.heading}
          </h2>
        </div>
        <div className="z-20 mb-12 min-w-sm max-w-md flex flex-row justify-center">
          <PillTabs tabs={pricingTabs} />
        </div>
        {tab === "Design" && (
          <>
            <div className="z-20 grid gap-6 lg:grid-cols-3">
              {pricing.tiers.map((t, i) => (
                <div
                  key={t.name}
                  className={`relative flex flex-col rounded-2xl border px-8 py-4 gap-2 border-foreground-secondary/30 backdrop-blur-xl bg-background-secondary/20 backdrop-blur-xs`}
                >
                  <div className="text-sm text-center text-foreground-secondary">{t.name}</div>
                  <div className="mt-1 text-xs tracking-[0.05em] text-foreground-secondary">
                    {t.priceLabel}
                  </div>
                  <div className="mb-2 text-4xl font-bold tracking-tight text-foreground">
                    {t.price}
                  </div>
                  <ul className="space-y-3 mb-4 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`mt-auto flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium border border-foreground-secondary/40`}
                  >
                    Get started
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-foreground-secondary">
              {pricing.designFootnote}
            </p>
          </>
        )}
        {tab === "Maintenance" && (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {retainers.plans.map((t) => (
                <div
                  key={t.name}
                  className={`relative rounded-2xl border p-8 border-foreground-secondary/30 bg-background-secondary/20 backdrop-blur-xs`}
                >
                  <div className="mb-1 text-sm text-foreground-secondary">{t.name}</div>
                  <div className="mb-6 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {t.price}
                    </span>
                    <span className="text-sm text-foreground-secondary">{t.cadence}</span>
                  </div>
                  <ul className="space-y-3 text-sm">
                    {t.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" />
                        <span className="text-foreground/90">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-foreground-secondary">
              {retainers.footnote}
            </p>
          </>
        )}
      </div>
    </section>
  );
}