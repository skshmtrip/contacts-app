# Contacts App - Project Context

## Project Overview
**Contacts App** is a personal contacts page built with Next.js 16 and React 19, featuring a modern, animated UI with JJBA (JoJo's Bizarre Adventure) themed images. The site displays contact information with interactive cards and dynamically rotating character images.

**Live URL:** https://contacts-app-eosin.vercel.app

---

## Tech Stack

### Framework & Runtime
- **Next.js**: 16.2.4 (with Turbopack)
- **React**: 19.2.4
- **TypeScript**: ^5
- **Node.js**: Latest (for development)

### UI & Styling
- **Tailwind CSS**: ^4.3.0 (@tailwindcss/postcss)
- **Radix UI**: @radix-ui/react-slot ^1.2.4
- **CSS Utilities**: 
  - `clsx` ^2.1.1 - Conditional CSS class handling
  - `tailwind-merge` ^3.6.0 - Merging Tailwind classes

### Development & Tooling
- **ESLint**: ^9 with next config
- **PostCSS**: ^4.3.0
- **Deployment**: Vercel

---

## Project Structure

```
contacts-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page (renders ContactsApp)
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ContactsApp.tsx     # Main contacts component (client-side)
│   │   └── ui/
│   │       └── card.tsx        # Card UI component
│   └── lib/
│       └── utils.ts            # Utility functions (cn() for class merging)
├── public/
│   ├── fonts/                  # Custom fonts (sansdiego font)
│   └── jjba pics/              # JJBA character images (SVG)
├── sansdiego/                  # Font files directory
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
└── components.json             # Shadcn/ui config (if applicable)
```

---

## Key Features

### ContactsApp Component
**Location:** `src/components/ContactsApp.tsx` (Client Component)

**Features:**
- Displays contact links: Email, GitHub, Instagram, LinkedIn, Stack Overflow
- **Animated Contact Cards**: 
  - Hover effects with scale and border transitions
  - Gradient overlays with violet/purple theme
  - Icon support with smooth transitions
- **Rotating JJBA Characters**: 
  - 3 character images rotate every 5 seconds
  - Images are SVG format (transparent backgrounds)
  - Randomized positioning on page resets
  - Smooth transitions between characters

**Character Images:**
- `/jjba pics/jotaro-kujostardust-crusadersjojos-bizarre-adventuretransparentmy-jojos-bizarre-adventure-11562915815zv7cmo7oie.svg`
- `/jjba pics/400px-Giorno_Giovanna_Infobox_Manga.svg`
- `/jjba pics/1200px-Josuke_DU_Infobox_Manga.svg`

**Contact Data:**
```javascript
{
  email: "contactskshmtrip@gmail.com",
  github: "skshmtrip",
  instagram: "stemsaksham",
  linkedin: "krishna-tripathi-009008274",
  stackoverflow: "28962747"
}
```

### Color Theme
- **Primary**: Violet (violet-500 to violet-900)
- **Secondary**: Purple (purple-900 to purple-600)
- **Accents**: Violet-400, Violet-300
- **Text**: White primary, Violet-300/400 secondary

---

## Development Scripts

```bash
npm run dev      # Start development server (Next.js dev mode)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

---

## Important Notes

### Known Characteristics
1. **Memory Usage**: ~350MB+ RAM consumption (unoptimized)
2. **Dynamic Positioning**: JJBA character images change position on each page reset
3. **Responsive Design**: Uses Tailwind CSS for responsive behavior
4. **Client-Side Rendering**: Main ContactsApp uses `"use client"` directive

### Font Licensing
- **sansdiego font**: Free-licensed, no copyright issues
- Located in `public/fonts/` and `sansdiego/` directories

### Deployment
- **Hosting**: Vercel (verified working deployment)
- **Build Tool**: Turbopack (Next.js 16 default)

---

## Dependencies Details

### Runtime Dependencies
- `next` - Next.js framework
- `react`, `react-dom` - React library
- `@radix-ui/react-slot` - Headless component primitive
- `@tailwindcss/postcss` - Tailwind CSS with PostCSS
- `clsx` - Utility for conditional classes
- `tailwind-merge` - Merge Tailwind classes

### Dev Dependencies
- `typescript` - Type checking
- `@types/react`, `@types/react-dom`, `@types/node` - Type definitions
- `eslint`, `eslint-config-next` - Linting

---

## Configuration Files

### TypeScript (`tsconfig.json`)
- Path aliases configured (e.g., `@/` for `src/`)
- Strict mode enabled
- Next.js support

### Next.js (`next.config.ts`)
- Standard Next.js 16 configuration
- Turbopack enabled by default

### Tailwind CSS (@tailwindcss/postcss)
- Version 4.3.0 with PostCSS integration
- Custom theme with violet color scheme

---

## Build Status
✅ Builds successfully with Turbopack  
✅ TypeScript checks passing  
✅ Static site generation working  
✅ ESLint configured and passing  

---

## Contact Information
**Owner**: Saksham (Krishna Tripathi)  
**Email**: contactskshmtrip@gmail.com  
**GitHub**: https://github.com/skshmtrip  

---

## Next Steps for New Agents

1. **For Styling Changes**: Modify Tailwind classes in `ContactsApp.tsx` or update global styles in `src/app/globals.css`
2. **For Content Updates**: Update contact data object in `ContactsApp.tsx`
3. **For New Features**: Ensure client components use `"use client"` directive
4. **For Deployment**: Use Vercel's automatic deployment from git (currently integrated)
5. **For Performance**: Consider optimizing image sizes and lazy loading if adding new assets

---

*Context generated on June 1, 2026 | Last Updated: Current Session*
