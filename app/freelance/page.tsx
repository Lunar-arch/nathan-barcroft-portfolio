"use client";

import { useCallback, useRef, useState } from "react";
import Header from "../_components/Header";
import MobileMenu from "../_components/MobileMenu";
import HeroSection from "./_components/HeroSection";
import FeaturesSection from "./_components/FeaturesSection";
import ProcessSection from "./_components/ProcessSection";
import PricingSection from "./_components/PricingSection";
import ContactSection from "./_components/ContactSection";
import Footer from "./_components/Footer";

export default function FreelancePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen(open => !open), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);
  const menuToggleRef = useRef<HTMLButtonElement | null>(null);
  const [pricingTab, setPricingTab] = useState<"Design" | "Maintenance">("Design");

  return (
    <>
      <MobileMenu open={mobileMenuOpen} onClose={closeMobileMenu} triggerRef={menuToggleRef} />
      <div className="relative min-h-screen bg-background font-sans text-foreground">
        <Header
          mobileOpen={mobileMenuOpen}
          onToggleMobileMenu={toggleMobileMenu}
          menuToggleRef={menuToggleRef}
        />
        <div id="spotlight-portal-root" className="pointer-events-none absolute inset-0 z-10" />

        <main className="flex flex-col gap-16 justify-center z-20">
          <HeroSection />
          <FeaturesSection />
          <ProcessSection />
          <PricingSection tab={pricingTab} onTabChange={setPricingTab} />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
}