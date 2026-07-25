"use client";

import React from "react";
import Link from "next/link";
import SpotlightButton from "@/app/_components/SpotlightButton";
import { ChevronDown } from "lucide-react";

export default function CTAs() {
  return (
    <div className="w-full flex gap-3 flex-row items-center">
      <SpotlightButton
        className="flex group/view-btn flex-row w-1/2 h-12 gap-2 items-center justify-between rounded-full bg-foreground hover:bg-foreground-secondary/80 px-6 text-sm font-semibold text-background transition-all hover:opacity-95"
        spotlightColor="bg-indigo-600/30"
        hoverOpacity={0.6}
        focusOpacity={0.8}
        radius={220}
        onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
        aria-label="View my work"
        haloRadius={300}
        haloColor="bg-indigo-600/20"
      >
        <p>View my work</p>
        <ChevronDown size={20} className="group-hover/view-btn:scale-120 duration-300 ease-in-out transition-transform"/>
      </SpotlightButton>

      <div className="w-1/2">
        <Link href="/freelance" className="not-md:w-full block">
          <SpotlightButton
            className="flex not-md:w-full h-12 items-center justify-center rounded-full border border-foreground/20 px-6 text-sm font-medium transition-colors hover:bg-background-secondary"
            spotlightColor="bg-indigo-600/30"
            hoverOpacity={0.7}
            focusOpacity={0.95}
            radius={160}
            aria-label="Hire me — view freelance pricing"
            haloColor="bg-indigo-600/20"
          >
            Hire me
          </SpotlightButton>
        </Link>
      </div>
    </div>
  );
}