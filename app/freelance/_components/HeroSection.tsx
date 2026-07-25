"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import SpotlightButton from "@/app/_components/SpotlightButton";
import { hero } from "@/contents/page/freelance/content";
import { easeOut } from "@/lib/useReveal";

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative flex flex-col justify-center items-center min-h-screen px-8">
      <div className="w-full max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion ? { duration: 0 } : { duration: 0.6, ease: easeOut, delay: 0.1 }
          }
        >
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl md:text-7xl">
            {hero.title[0]}
            <br />
            {hero.title[1]}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-foreground-secondary">
            {hero.body}
          </p>
          <div className="mt-10 flex justify-center">
            <SpotlightButton
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-semibold text-background transition-all hover:opacity-95"
              spotlightColor="bg-indigo-600/30"
              hoverOpacity={0.6}
              focusOpacity={0.8}
              radius={500}
              haloRadius={1000}
              haloColor="bg-indigo-600/30"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              aria-label={hero.cta.ariaLabel}
            >
              {hero.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </SpotlightButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}