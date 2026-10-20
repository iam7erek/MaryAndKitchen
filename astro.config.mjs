// @ts-check
import { defineConfig, envField } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// SITE_URL is set in Vercel once the domain is live. Until then canonical/OG
// URLs fall back to the Vercel deployment URL.
const site =
  process.env.SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321');

export default defineConfig({
  site,
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'never',
  build: { inlineStylesheets: 'auto' },
  prefetch: false,
  image: {
    // Photos are 900 x 1600 WhatsApp originals: never upscale past that.
    responsiveStyles: true,
  },
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: 'server', access: 'secret', optional: true }),
      ORDER_TO_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
      ORDER_FROM_EMAIL: envField.string({ context: 'server', access: 'secret', optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
