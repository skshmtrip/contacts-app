# Contacts Application and Anime.js v4 Integration Context

This document outlines the codebase, the technical challenges faced during development, and the precise solutions implemented to migrate the project's interactive animations to Anime.js v4.

---

## 1. Project Overview

The project is a premium, minimalist personal contacts page built using Next.js App Router, TypeScript, Tailwind CSS, and Anime.js v4.

### Core Aesthetic and Theme

- Visual language: deep OLED black (`#050505`), sharp white typography, and an ethereal glass dark premium layout.
- Typography: `Geist`, `Geist_Mono`, and `Playfair_Display` initialized through the root layout.
- Graphic elements: subtle background accents using transparent JoJo's Bizarre Adventure images with low resting opacity (`0.03`).
- Component structures: interactive micro-beveled contact cards using `bezel-outer` and `bezel-inner` classes for nested borders, responsive flex layout, and dynamic text truncation.

---

## 2. Technical Stack and File Inventory

### `src/lib/utils.ts`

Provides a unified utility wrapper (`cn`) combining `clsx` and `tailwind-merge` to safely construct conditional Tailwind class structures without specificity conflicts.

### `src/app/globals.css`

Declares the CSS design system using the modern Tailwind `@import "tailwindcss";` format. It provisions keyframe rules (`fadeUp`, `fadeIn`, `slideInRight`), customized minimal scrollbars, and dual-bezel shadow systems.

### `src/app/layout.tsx`

Handles core metadata initialization and high-fidelity typography using Google Fonts via `Geist`, `Geist_Mono`, and `Playfair_Display`.

### `src/components/ui/card.tsx`

A flexible abstract component that uses component patterns such as `data-slot` and `data-size` to render clean layout boxes containing headers, titles, actions, descriptions, and dynamic footprints.

### `src/app/page.tsx`

Serves as the root server-rendered entry point, wrapping and exposing the client-facing presentation layer.

### `src/components/ContactsApp.tsx`

Serves as the client presentation layer. It owns the contact data, JJBA background accents, headline decode animation, Anime.js entrance choreography, and per-card magnetic hover effects.

---

## 3. Anime.js v4 Migration Challenge

During implementation, multiple critical Next.js build errors were encountered due to API differences between Anime.js v3 and Anime.js v4.

### Issue 1: Missing Default Export

- Symptom: `Type error: Property 'default' does not exist on type 'typeof import("animejs")'.`
- Cause: In v3, the library was commonly consumed through a default export. In Anime.js v4, default exports are deprecated in favor of explicit named exports such as `animate`, `stagger`, and `spring`.
- Solution: Use dynamic named imports from `animejs` inside browser-only effects.

### Issue 2: Broken Text Scramble Plugin Typing

- Symptom: `Type error: Type 'FunctionValue' is not assignable to type 'TweenModifier'.`
- Cause: Older v3-compatible text scrambling implementations used global-style modifiers. In v4, the `scrambleText` helper does not type cleanly as the `modifier` value expected by this animation call.
- Solution: Remove Anime.js text scrambling from the headline path and use a browser-native `requestAnimationFrame` decode routine for text content updates.

---

## 4. Final Production Implementation

The finalized, type-safe implementation of `ContactsApp.tsx` eliminates compilation bottlenecks by using direct native named-import destructuring, a browser-based text decode routine, and strict Anime.js v4 spring properties.

### Anime.js v4 Usage

```ts
const { animate, stagger, spring } = await import("animejs");
```

Anime.js remains responsible for:

- Headline opacity reveal.
- Subtitle fade-up motion.
- Staggered spring entrance for contact cards.
- Footer fade-in motion.
- Per-card magnetic tilt and glow interactions.

### Native Decode Routine

The headline decode effect is implemented locally with `requestAnimationFrame`, updates only in the browser, and exposes a cancellation function for React effect cleanup.

This avoids the v4 `TweenModifier` type mismatch while preserving the intended premium text-reveal interaction.

---

## 5. Verification Notes

Use these scripts for local validation:

```bash
npm run build
npm run lint
```

The production build should compile successfully with Anime.js v4 once the headline animation no longer uses `scrambleText` as an Anime.js `modifier`.
