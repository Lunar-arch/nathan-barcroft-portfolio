"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { footer } from "@/contents/page/freelance/content";

export default function Footer() {
  return (
    <footer className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 text-sm text-foreground-secondary md:flex-row md:items-center">
          <div>{footer.copyright}</div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${footer.email}`}
              className="inline-flex items-center gap-2"
            >
              <Mail className="h-4 w-4" /> {footer.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {footer.location}
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-2"
            >
              {footer.backHome}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}