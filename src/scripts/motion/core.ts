/**
 * Motion core: loaded once per page.
 * - Registers GSAP + ScrollTrigger once.
 * - Lenis smooth scroll on desktop (fine pointer) only, never under reduced
 *   motion; driven by gsap.ticker and synced with ScrollTrigger.
 * - Imports each scene's module (scripts/motion/scenes/<name>.ts) for every
 *   <section data-scene="<name>">: the opening scene first, the rest when the
 *   browser is idle, then one ScrollTrigger refresh.
 *
 * The HTML of every scene is its complete, final state. Scene modules set
 * their own start states inside gsap.matchMedia(), so no-JS and reduced
 * motion always show everything.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const ease = {
  soft: 'power2.out',
  spring: 'back.out(1.4)',
} as const;

export const media = {
  motion: '(prefers-reduced-motion: no-preference)',
  reduced: '(prefers-reduced-motion: reduce)',
  desktop: '(min-width: 768px)',
  mobile: '(max-width: 767.98px)',
  finePointer: '(hover: hover) and (pointer: fine)',
} as const;

export interface SceneContext {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
  ease: typeof ease;
  media: typeof media;
  lenis: () => Lenis | null;
}

export type SceneInit = (root: HTMLElement, ctx: SceneContext) => void;

let lenis: Lenis | null = null;
const tick = (time: number) => lenis?.raf(time * 1000);

function startLenis(): void {
  if (lenis) return;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
}

function stopLenis(): void {
  if (!lenis) return;
  gsap.ticker.remove(tick);
  lenis.destroy();
  lenis = null;
}

const smoothQuery = window.matchMedia(`${media.motion} and ${media.finePointer}`);
const syncLenis = () => (smoothQuery.matches ? startLenis() : stopLenis());
syncLenis();
smoothQuery.addEventListener('change', syncLenis);

// In-page links scroll through Lenis when it is running.
document.addEventListener('click', (event) => {
  const link = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
  if (!link || !lenis) return;
  const target = document.querySelector<HTMLElement>(link.getAttribute('href') ?? '');
  if (!target) return;
  event.preventDefault();
  lenis.scrollTo(target);
  target.focus({ preventScroll: true });
});

const modules = import.meta.glob<{ init: SceneInit }>('./scenes/*.ts');
const context: SceneContext = { gsap, ScrollTrigger, ease, media, lenis: () => lenis };

function loadScene(root: HTMLElement): Promise<void> {
  const name = root.dataset.scene;
  const loader = name ? modules[`./scenes/${name}.ts`] : undefined;
  return loader ? loader().then(({ init }) => init(root, context)) : Promise.resolve();
}

// All scenes are set up once, top to bottom, followed by a single refresh.
// (Refreshing every time a scene loaded made pinned scenes on screen
// re-render their start state, which showed up as a flicker.)
// The opening scene goes first so it can play straight away; the rest load
// while the browser is idle, well before anyone scrolls to them.
const scenes = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]'));
const first = scenes.find((s) => s.dataset.scene === 'doorstep') ?? scenes[0];
const rest = scenes.filter((s) => s !== first);
const idle = (fn: () => void) =>
  'requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 200);

(first ? loadScene(first) : Promise.resolve()).then(() => {
  idle(async () => {
    for (const scene of rest) await loadScene(scene);
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
});

// Fonts change line lengths, which moves pin positions.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
