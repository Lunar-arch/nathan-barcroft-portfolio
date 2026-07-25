# Style & Color Cheatsheet

A quick reference for the design system used across `nathanbarcroft.com`.
All values are defined in `app/globals.css` and compiled by Tailwind v4 into `app/output.css`.

---

## 1. Design tokens (semantic)

Defined as CSS custom properties in `:root` and re-mapped into Tailwind's theme
via `@theme inline` in `app/globals.css`. Use the Tailwind utility names
(`bg-*`, `text-*`, `border-*`) in your JSX — the values below are what they
resolve to.

| Token                      | Tailwind utility                 | Light mode                          | Dark mode                           | Used for                                            |
| -------------------------- | -------------------------------- | ----------------------------------- | ----------------------------------- | --------------------------------------------------- |
| `--background`             | `bg-background`                  | `oklch(0.9418 0.0279 315.53)`       | `oklch(0.2096 0.0371 290.05)`      | Page body, base surface, form inputs                |
| `--background-secondary`   | `bg-background-secondary`        | `oklch(0.7418 0.0279 315.53)`       | `oklch(0.3096 0.0371 290.05)`      | Cards, header bar, elevated panels, feature cards  |
| `--foreground`             | `text-foreground` / `bg-foreground` | `oklch(0.2096 0.0371 290.05)`     | `oklch(0.9418 0.0279 315.53)`      | Body text, primary buttons, strong headings        |
| `--foreground-secondary`   | `text-foreground-secondary`       | `oklch(0.3096 0.0371 290.05)`       | `oklch(0.7418 0.0279 315.53)`      | Captions, eyebrow text, muted labels, borders      |
| `--accent`                 | `bg-accent` / `var(--accent)`     | `oklch(0.8591 0.0279 315.53)`       | `oklch(0.2786 0.0579 289.25)`      | Entrance-onboard overlay, mobile menu scrim        |

### How dark mode works
Tokens are swapped inside `@media (prefers-color-scheme: dark) { :root { ... } }`.
Light foreground → dark background, and vice versa. The `--accent` token shifts
to a deeper hue in dark mode.

### Opacity modifiers
All semantic tokens support Tailwind's `/` opacity syntax, e.g.
`bg-background-secondary/30`, `border-foreground-secondary/30`,
`bg-accent/75`. These are used heavily for borders, glassmorphism
(`backdrop-blur-xs`), and overlays.

---

## 2. Tailwind palette colors in use

These are the only Tailwind palette colors actually referenced in the codebase.
Their compiled values come from `app/output.css`.

| Tailwind class        | Compiled value (oklch)           | Where it's used                                                    |
| --------------------- | -------------------------------- | ------------------------------------------------------------------ |
| `bg-red-300`          | `oklch(80.8% 0.114 19.571)`      | `PillTabs` default container, border, and active pill highlight    |
| `bg-red-300/30`       | (same, 30% alpha)                | `PillTabs` container background (default)                         |
| `border-red-300`      | (same)                           | `PillTabs` border (default)                                        |
| `text-indigo-500`     | `oklch(58.5% 0.233 277.117)`     | Pricing/retainer check-mark icons                                   |
| `bg-indigo-500`       | (same)                           | Gradient start for feature icon badges                             |
| `bg-indigo-600/30`    | `oklch(51.1% 0.262 276.966)` 30% | `SpotlightButton` spotlight color (`/freelance` hero)              |
| `bg-indigo-600/20`    | (same, 20% alpha)                | `SpotlightButton` halo color                                       |
| `border-indigo-500/60`| (same, 60% alpha)                | Highlighted pricing/retainer tier card border                     |
| `from-indigo-500`     | (same)                           | Linear gradient on feature icon badges and tier "Recommended" pill |
| `to-purple-700`       | `oklch(49.6% 0.265 301.924)`    | Gradient end on the same badges and pills                          |
| `text-emerald-500`    | `oklch(69.6% 0.17 162.48)`      | "Thanks — I'll reply within 24 hours." success message             |
| `text-white`          | `#fff`                           | Text on indigo→purple gradient badges and active `PillTabs` button |

### Indigo → Purple gradient
Used for accents that should feel "premium":
```tsx
bg-linear-to-br from-indigo-500 to-purple-700
```
Appears on: feature icon badges (`Sparkles`, `Zap`, `Smartphone`, `Accessibility`),
the "Most Popular" / "Recommended" tier pill, and as the default accent ramp
when you want something other than the neutral semantic tokens.

---

## 3. Where each color shows up (by component)

### `app/page.tsx` (homepage)
- Body text on `text-foreground`, captions on `text-foreground-secondary`.
- CTAs use `bg-foreground` / `text-background` (inverted primary button).

### `app/freelance/page.tsx` (freelance page)
- **Hero**: `SpotlightButton` with `bg-indigo-600/30` spotlight + `/20` halo,
  `bg-foreground` button surface, `text-background` label.
- **Features grid**: cards are `bg-background-secondary/30` with
  `border-foreground-secondary/30`; icon badges use `from-indigo-500 to-purple-700`.
- **Process timeline**: vertical border `border-foreground-secondary/30`,
  numbered circles `bg-background` with `text-foreground`.
- **Pricing & retainers**: standard cards `bg-background-secondary/20`;
  highlighted cards `border-indigo-500/60` + `bg-background-secondary/40` +
  an indigo→purple glow `shadow-[0_0_40px_-12px_rgba(79,70,229,0.5)]`.
  Check icons in `text-indigo-500`.
- **Contact form**: inputs `bg-background/40`, focus ring
  `focus:border-indigo-500/60 focus:ring-indigo-500/30`.
- **Success message**: `text-emerald-500`.

### `app/components/Header.tsx`
- Sticky pill bar: `bg-background-secondary/50 backdrop-blur-xs`,
  border `border-foreground-secondary/30`.

### `app/components/MobileMenu.tsx`
- Fullscreen scrim: `bg-accent/75 backdrop-blur-sm`.

### `app/components/EntranceOnboard.tsx`
- Overlay background: `var(--accent)` via inline style.

### `app/components/PillTabs.tsx`
- Defaults to red (`bg-red-300/30` container, `border-red-300`, `bg-red-300` pill)
  but all three are props accepting Tailwind classes, hex, or oklch via
  the `useColorValue` hook (`lib/useColorValue.tsx`).
- Active button text flips to `text-white`; inactive is
  `text-foreground-secondary hover:text-foreground`.

---

## 4. Typography

| Utility      | Size       | Line height        | Typical use                          |
| ------------ | ---------- | ------------------ | ------------------------------------ |
| `text-xs`    | 0.75rem    | 1                  | Eyebrow labels (`uppercase tracking-widest`) |
| `text-sm`    | 0.875rem   | 1.428              | Body text in cards, form labels      |
| `text-lg`    | 1.125rem   | 1.555              | Feature body copy, hero subhead      |
| `text-xl`    | 1.25rem    | 1.4                | Step titles, card headings           |
| `text-4xl`   | 2.25rem    | 1.111              | Section headings (mobile)            |
| `text-5xl`   | 3rem       | 1                  | Section headings (sm+)               |
| `text-6xl`   | 3.75rem    | 1                  | Hero headline (sm)                   |
| `text-7xl`   | 4.5rem     | 1                  | Hero headline (md+)                  |

- **Display font**: `--font-sans` maps to `--font-geist-sans` (set in `layout.tsx`).
- **Mono font**: `--font-mono` maps to `--font-geist-mono`.
- Body fallback in `globals.css`: `Arial, Helvetica, sans-serif`.

---

## 5. Spacing & layout conventions

- **Spacing scale**: `--spacing: 0.25rem` (so `p-1` = 4px, `p-6` = 24px, `py-28` = 112px).
- **Section vertical padding**: most sections use `py-28` (112px) with
  `border-t border-foreground-secondary/30` between them.
- **Max widths**:
  - Hero / headings: `max-w-4xl`
  - Standard content: `max-w-5xl`–`max-w-6xl`
  - Forms / narrow text: `max-w-3xl`
  - Container utility values defined up to `--container-6xl: 72rem`.
- **Default transition**: `--default-transition-duration: 300ms` — used by
  `transition-all`, `transition-colors`, etc.

---

## 6. Using colors in components

### With Tailwind classes (preferred for tokens)
```tsx
<div className="bg-background-secondary/30 border border-foreground-secondary/30">
  <h3 className="text-foreground">Title</h3>
  <p className="text-foreground-secondary">Body</p>
</div>
```

### With raw values (hex / oklch)
Components that accept a `color` prop — like `PillTabs` via `useColorValue` —
let you pass any of these interchangeably:
```tsx
<PillTabs tabs={tabs} activeColor="bg-indigo-500" />
<PillTabs tabs={tabs} activeColor="oklch(0.585 0.233 277)" />
<PillTabs tabs={tabs} activeColor="#6366f1" />
```
The hook detects the format, renders a hidden swatch for Tailwind classes, and
returns a resolved CSS color you can drop into `style={{ backgroundColor }}`.

### Accessing tokens in CSS
```css
background: var(--accent);
color: var(--foreground-secondary);
```
Useful for inline styles or custom CSS (as seen in `EntranceOnboard.tsx`).

---

## 7. Quick palette swatch

| Name                  | Light                          | Dark                           |
| --------------------- | ------------------------------ | ------------------------------ |
| background            | ![#f4f2f6](https://placehold.co/80x20/f4f2f6/f4f2f6.png) `#f4f2f6`-ish | ![#322e38](https://placehold.co/80x20/322e38/322e38.png) `#322e38`-ish |
| background-secondary  | lighter gray-purple           | mid gray-purple                |
| foreground            | near-black                     | near-white                     |
| foreground-secondary  | dark gray                      | light gray                     |
| accent               | light gray-purple              | deep gray-purple               |
| indigo-500            | `#6366f1`-ish                  | same                           |
| purple-700            | `#7e22ce`-ish                  | same                           |
| red-300 (PillTabs)    | `#fca5a5`-ish                  | same                           |
| emerald-500           | `#10b981`-ish                  | same                           |

> The oklch values above are the source of truth — hex approximations are
> approximate and shown only for quick recognition.

---

## 8. File map

| File                                | Role                                                    |
| ----------------------------------- | ------------------------------------------------------- |
| `app/globals.css`                   | Defines `:root` tokens, dark mode override, `@theme inline` mapping |
| `app/output.css`                    | Tailwind v4 compiled output (palette + utilities)        |
| `app/layout.tsx`                    | Loads Geist Sans/Mono fonts, sets `<body>` bg/text       |
| `lib/useColorValue.tsx`             | Hook that parses Tailwind class / hex / oklch → CSS color |
| `lib/useResolvedTailwindColors.tsx` | Older multi-color version of the same idea               |
| `lib/utils/index.tsx`               | `cn()` = `twMerge(clsx(...))` for class merging          |