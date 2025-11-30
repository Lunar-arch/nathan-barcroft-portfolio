"use client";

import React from "react";
import SpotlightButton2 from "./SpotlightButton";

export default function CTAs() {
  return (
    <div className="w-full flex gap-3 flex-row items-center">
      <SpotlightButton2
        className="flex w-1/2 h-12 items-center justify-center rounded-full bg-foreground hover:bg-foreground-secondary/80 px-6 text-sm font-semibold text-background transition-all hover:opacity-95"
        spotlightColor="rgba(99,102,241,0.12)"
        hoverOpacity={0.6}
        focusOpacity={0.8}
        radius={140}
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="View my work"
      >
        View my work
      </SpotlightButton2>

      <div className="w-1/2">
        <SpotlightButton2
          className="flex not-md:w-full h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-background-secondary"
          spotlightColor="rgba(168,85,247,0.14)"
          hoverOpacity={0.7}
          focusOpacity={0.95}
          radius={160}
          onClick={() => { window.location.href = 'mailto:hello@example.com'; }}
          aria-label="Get in touch"
        >
          Get in touch
        </SpotlightButton2>
      </div>
    </div>
  );
}
