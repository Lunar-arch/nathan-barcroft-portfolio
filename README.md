# Nathan Barcroft — Portfolio

## About

This portfolio showcases my approach to front-end development through the experience itself. Rather than just listing projects, the site demonstrates technical skills through thoughtful interactions, smooth animations, and clean code architecture.


**Live** at [nathanbarcroft.com](https://nathanbarcroft.com)


## Tech Stack

- **Next.js 14** (App Router, TypeScript) — For server-side rendering and type safety
- **Tailwind CSS** — For fast and maintainable styling
- **GSAP** — For smooth and performant animations


## Key Features

**Performance considerations:**
- Optimized bundle size and loading strategies
- Efficient font loading
- Server components by default and client components only where needed

**Animation approach:**
- GSAP for smooth interactions
- Motion used to enhance UX, not distract from content
- Responsive animations that work across devices

**Code organization:**
- TypeScript for type safety
- Component-based architecture
- Co-located styles with Tailwind



## Project Structure

```
app/
├── page.tsx          # Main landing page
├── layout.tsx        # Global layout and metadata
├── components/       # Custom reusable UI components
└── [pages]/          # Additional sections
```



## Development

```powershell
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```



## Design Approach

The site uses a minimal color palette and clean typography to keep focus on content and interaction. Accessibility was considered, with semantic HTML, ARIA labels, and keyboard navigation support.



## Deployment

Hosted on Vercel for performance and automatic deployments from the main branch.



> Built with Next.js, Tailwind CSS, and GSAP.