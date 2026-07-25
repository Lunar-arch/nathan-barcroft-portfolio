"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useReveal } from "@/lib/useReveal";
import { contact } from "@/contents/page/freelance/content";

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm text-foreground-secondary">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full rounded-xl border border-foreground-secondary/30 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30"
      />
    </div>
  );
}

export default function ContactSection() {
  const revealProps = useReveal();
  const [form, setForm] = useState({
    name: "",
    email: "",
    business: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="py-28">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div {...revealProps} className="mb-10 text-center">
          <div className="mb-3 text-xs uppercase tracking-widest text-foreground-secondary">
            {contact.eyebrow}
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            {contact.heading}
          </h2>
        </motion.div>
        <motion.form
          {...revealProps}
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-5 rounded-2xl border border-foreground-secondary/30 bg-background-secondary/30 p-8 backdrop-blur-xs"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              required
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
          </div>
          <Field
            label="Business name"
            value={form.business}
            onChange={(v) => setForm({ ...form, business: v })}
          />
          <div>
            <label className="mb-2 block text-sm text-foreground-secondary">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full rounded-xl border border-foreground-secondary/30 bg-background/40 px-4 py-3 text-sm outline-none transition focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            {contact.submitLabel} <ArrowRight className="h-4 w-4" />
          </button>
          {sent && (
            <p className="text-sm text-emerald-500" role="status">
              {contact.success}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}