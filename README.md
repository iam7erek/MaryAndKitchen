# Mary And Kitchen

Website for Mary And Kitchen, a home bakery in the UAE (Mary And Squares + Mary And Bakes).

Astro 7 · TypeScript · Tailwind v4 · GSAP + ScrollTrigger · Lenis · Resend · Vercel.

## Run it

```sh
npm install
npm run dev      # http://localhost:4321
npm run check    # types
npm run build
```

Copy `.env.example` to `.env` for the order form. Real keys live only in Vercel environment variables.

## Where things are

- `src/assets/brand/`: the brand export, unchanged. Never redraw or recolour these files; see `docs/brand/MANIFEST.md` and `docs/brand/MISSING.md` for what goes where.
- `src/styles/tokens.css`: every colour, font, radius and easing. Tailwind's default palette is switched off.
- `src/data/`: all facts and words. Arabic will be a sibling of `copy.en.ts`.
- `src/components/ui/Scene.astro`: the shared wrapper for each kitchen scene.
- `src/scripts/motion/core.ts`: GSAP and Lenis, set up once. Each scene's animation lives in `scripts/motion/scenes/<name>.ts` and loads when the scene gets close.
