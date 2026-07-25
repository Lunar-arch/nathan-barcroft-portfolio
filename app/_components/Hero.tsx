"use client";

import React from "react";
import { motion } from "motion/react";
import TextSpotlight from "@/app/_components/TextSpotlight";
import CTAs from "./CTAs";
import { hero } from "@/contents/page/home/content";

export default function Hero() {
  return (
    <section className="mx-auto flex flex-col-reverse items-center gap-12 md:flex-row md:items-center">
      <div className="w-full md:w-2/3">
        <p className="mb-4 text-sm font-medium text-foreground-secondary">
          <span className="text-foreground uppercase font-bold text-base">
            {hero.greeting.eyebrow}{" "}
          </span>
          — {hero.greeting.title}
        </p>
        <h1 className="mb-6 text-4xl leading-tight tracking-tight text-foreground sm:text-5xl">
          {hero.heading.pre}{" "}
          <TextSpotlight
            text={hero.heading.spotlight}
            className="inline-block font-semibold bg-foreground-secondary/30"
            colors={hero.spotlightColors}
          />{" "}
          {hero.heading.post}
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-7 text-foreground-secondary">
          {hero.body}
        </p>
        <CTAs />
      </div>

      <div className="flex w-full items-center justify-center md:w-1/3">
        <div className="relative flex md:w-full md:h-auto h-48 w-48 aspect-square items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-foreground/10 to-background-secondary">
        </div>
      </div>
    </section>
  );
}