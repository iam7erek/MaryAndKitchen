/**
 * From My Oven to Your Door: the crumb path draws itself while Mary walks
 * from stop to stop with her tray, and each step card pops up as she arrives.
 * Desktop: pinned (pin 3 of 3). Phones: scrubbed through the section.
 * The markup is the finished journey, so reduced motion shows it all.
 */
import type { SceneInit } from '../core';

export const init: SceneInit = (root, { gsap, ease, media }) => {
  const pin = root.querySelector<HTMLElement>('[data-pin]');
  const road = root.querySelector<HTMLElement>('[data-road]');
  const walker = root.querySelector<HTMLElement>('[data-walker]');
  const steps = gsap.utils.toArray<HTMLElement>('[data-step]', root);
  if (!pin || !road || !walker || steps.length === 0) return;

  const mm = gsap.matchMedia();

  mm.add(
    { desktop: `${media.motion} and ${media.desktop}`, mobile: `${media.motion} and ${media.mobile}` },
    (context) => {
      const { desktop } = context.conditions as { desktop: boolean };
      const draw = root.querySelector<SVGRectElement>(desktop ? '[data-draw-desktop]' : '[data-draw-mobile]');
      const grow = desktop ? 'scaleX' : 'scaleY';
      const cards = steps.map((s) => s.querySelector<HTMLElement>('.step__card'));
      const stops = steps.map((s) => s.querySelector<HTMLElement>('.step__stop'));

      // Mary starts at the first stop: 3/4 of the road back from where she rests.
      const back = () => (desktop ? -road.offsetWidth * 0.75 : -road.offsetHeight * 0.75);
      const axis = desktop ? 'x' : 'y';

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: desktop
          ? { trigger: pin, start: 'top top+=24', end: '+=160%', pin: true, scrub: true, invalidateOnRefresh: true }
          : { trigger: road, start: 'top 75%', end: 'bottom 60%', scrub: true, invalidateOnRefresh: true },
      });

      tl.set(draw, { [grow]: 0, transformOrigin: '0% 0%' }, 0)
        .set(walker, { [axis]: back }, 0)
        .set(cards, { autoAlpha: 0.35, y: 16, scale: 0.96 }, 0)
        .set(stops, { scale: 0.8, autoAlpha: 0.6 }, 0);

      // The path and Mary travel together over the whole scrub.
      tl.to(draw, { [grow]: 1, duration: 4 }, 0.1).to(walker, { [axis]: 0, duration: 4 }, 0.1);

      // A little walking bounce while she moves.
      tl.to(walker, { keyframes: { rotation: [0, -4, 4, -4, 4, 0] }, duration: 4, ease: 'sine.inOut' }, 0.1);

      // Each stop and card arrives as Mary reaches it (stops at 0, 1/3, 2/3, 1 of her trip).
      steps.forEach((_, i) => {
        const at = 0.1 + (4 * i) / 3 - (i === 0 ? 0 : 0.25);
        tl.to(stops[i], { scale: 1, autoAlpha: 1, duration: 0.35, ease: ease.spring }, at).to(
          cards[i],
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: ease.spring },
          at + 0.1,
        );
      });

      if (desktop) tl.to({}, { duration: 0.5 });
    },
  );
};
