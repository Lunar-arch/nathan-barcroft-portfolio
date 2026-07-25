"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { process } from "@/contents/page/freelance/content";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Calculate which step is active based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const container = containerRef.current;
      const stepElements = container.querySelectorAll('li');
      
      stepElements.forEach((step, index) => {
        const stepRect = step.getBoundingClientRect();
        const stepTop = stepRect.top;
        const stepHeight = stepRect.height;
        
        // Check if step is in the middle third of the viewport
        const viewportCenter = window.innerHeight / 2;
        const stepCenter = stepTop + stepHeight / 2;
        
        // Step is considered "active" when its center is within the middle third of viewport
        if (Math.abs(stepCenter - viewportCenter) < window.innerHeight / 30 ) {
          setActiveStep(index);
        }
      });
    };

    // Initial calculation
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate progress based on active step
  useEffect(() => {
    if (activeStep >= 0 && process.steps.length > 0) {
      const calculatedProgress = ((activeStep + 1) / process.steps.length) * 100;
      setProgress(calculatedProgress);
    }
  }, [activeStep]);

  return (
    <section className="py-28">
      <div className="mx-auto max-w-4xl px-6 ">
        <div className="mb-14">
          <div className="mb-3 text-xs uppercase tracking-widest text-foreground-secondary">
            {process.eyebrow}
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {process.heading}
          </h2>
        </div>
        

        
        <ol ref={containerRef} className="relative space-y-10 border-l border-foreground-secondary/30 pl-7">
          {process.steps.map((s, i) => (
            <li 
              key={s.title} 
              className={`relative transition-all duration-300 ${i === activeStep ? 'text-foreground' : 'text-foreground/50'}`}
            >
             {process.steps.length - 1 === i ? null : (
  <div className="rounded-full -left-7.5 absolute top-2 -bottom-12 w-1 overflow-hidden">
    <div 
      className={cn(
        "bg-purple-500 w-full transition-all duration-500 ease-in-out",
        i < activeStep ? "h-full" : "h-0"
      )} 
    />
  </div>
)}
              <span 
                className={`absolute -left-[46px] top-1 flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300
                  ${i < activeStep 
                    ? 'border-foreground-secondary/15 bg-background text-foreground/50' 
                    : i === activeStep
                    ? 'border-foreground-secondary/40 bg-background text-foreground'
                    : 'border-foreground-secondary/40 bg-background text-foreground'
                  }
                `}
              >
                {i <= activeStep ? <Check className="h-5 w-5" /> : `${i + 1}` }
              </span>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="mt-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}