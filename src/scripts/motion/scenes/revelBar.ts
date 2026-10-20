/**
 * Inside the Revel Bar: pinned, scroll-scrubbed exploded view.
 *
 * Story (one scrubbed timeline):
 *   whole bar -> crumble lifts, base drops away (slight tilt, soft shadows)
 *   -> leaders draw and labels arrive, flakes drift, fudge shimmers
 *   -> "made with real oats" badge stamps in -> labels leave, layers close
 *   with a soft squish -> the real photo and CTA crossfade in (desktop).
 *
 * The fudge layer is the anchor; the other two move to meet it. All offsets
 * are measured from the layout so they stay right at every width.
 */
import type { SceneInit } from '../core';

const VIEW_W = 78; // width of each crop in the artwork's own units

export const init: SceneInit = (root, { gsap, ease, media }) => {
  const pin = root.querySelector<HTMLElement>('[data-pin]');
  const layer = (key: string) => root.querySelector<HTMLElement>(`[data-layer="${key}"]`);
  const crumble = layer('crumble-top');
  const fudge = layer('fudge-middle');
  const base = layer('oat-base');
  if (!pin || !crumble || !fudge || !base) return;

  const art = (el: HTMLElement) => el.querySelector<HTMLElement>('[data-art]')!;
  const cropY = (el: HTMLElement) => Number(el.dataset.cropY);
  const leaders = gsap.utils.toArray<SVGPathElement>('[data-leader]', root);
  const dots = gsap.utils.toArray<SVGCircleElement>('.layer__leader circle', root);
  const labels = gsap.utils.toArray<HTMLElement>('[data-label]', root);
  const shadows = gsap.utils.toArray<HTMLElement>('[data-shadow]', root);
  const flakes = gsap.utils.toArray<HTMLElement>('[data-flake]', root);
  const shimmer = root.querySelector<HTMLElement>('[data-shimmer]');
  const badge = root.querySelector<HTMLElement>('[data-badge]');
  const photo = root.querySelector<HTMLElement>('[data-photo]');

  // Where a layer's art must sit so it lines up with the fudge into one bar.
  const assembledY = (el: HTMLElement) => () => {
    const a = art(el);
    const f = art(fudge);
    const scale = f.offsetWidth / VIEW_W;
    const top = (node: HTMLElement) =>
      node.getBoundingClientRect().top - Number(gsap.getProperty(node, 'y'));
    return top(f) + (cropY(el) - cropY(fudge)) * scale - top(a);
  };

  const mm = gsap.matchMedia();

  mm.add(
    { desktop: `${media.motion} and ${media.desktop}`, mobile: `${media.motion} and ${media.mobile}` },
    (context) => {
      const { desktop } = context.conditions as { desktop: boolean };
      const arts = [art(crumble), art(fudge), art(base)];

      const tl = gsap.timeline({
        defaults: { ease: ease.soft },
        scrollTrigger: {
          trigger: pin,
          start: desktop ? 'top top+=40' : 'top top+=16',
          end: desktop ? '+=220%' : '+=140%',
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Start: the whole bar, labels away.
      tl.set(art(crumble), { y: assembledY(crumble) }, 0)
        .set(art(base), { y: assembledY(base) }, 0)
        .set(leaders, { strokeDashoffset: 1 }, 0)
        .set(dots, { autoAlpha: 0 }, 0)
        .set(labels, { autoAlpha: 0, y: 12 }, 0)
        .set(shadows, { autoAlpha: 0, scaleX: 0.6 }, 0)
        .set(flakes, { autoAlpha: 0, x: 0, y: 0 }, 0)
        .set(badge, { scale: 0, rotation: -40 }, 0);
      if (desktop && photo) tl.set(photo, { autoAlpha: 0, x: 40 }, 0);

      // Explode: crumble floats up, base drops away, each with a little tilt.
      tl.to(art(crumble), { y: 0, duration: 1.6 }, 0.5)
        .to(art(crumble), { keyframes: { rotation: [0, -3, 0] }, duration: 1.6, ease: 'sine.inOut' }, 0.5)
        .to(art(base), { y: 0, duration: 1.6 }, 0.8)
        .to(art(base), { keyframes: { rotation: [0, 2, 0] }, duration: 1.6, ease: 'sine.inOut' }, 0.8)
        .to(shadows, { autoAlpha: 1, scaleX: 1, duration: 1, stagger: 0.3 }, 1.2);

      // Oat flakes drift off the top.
      flakes.forEach((flake, i) => {
        tl.to(
          flake,
          {
            keyframes: { autoAlpha: [0, 1, 1, 0] },
            y: -40 - i * 8,
            x: (i % 2 ? 1 : -1) * (12 + i * 6),
            rotation: `+=${90 + i * 40}`,
            duration: 2,
            ease: 'power1.out',
          },
          1 + i * 0.12,
        );
      });

      // Leaders draw, labels arrive, top to bottom.
      [0, 1, 2].forEach((i) => {
        const at = 2 + i * 0.35;
        tl.to(dots[i], { autoAlpha: 1, duration: 0.2 }, at)
          .to(leaders[i], { strokeDashoffset: 0, duration: 0.6 }, at)
          .to(labels[i], { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.35);
      });

      // Glossy shimmer across the fudge, then the badge stamps in.
      if (shimmer) {
        tl.fromTo(
          shimmer,
          { xPercent: -200, autoAlpha: 0.55 },
          { xPercent: 700, autoAlpha: 0.55, duration: 1.1, ease: 'power1.inOut' },
          3.1,
        ).set(shimmer, { autoAlpha: 0 }, 4.2);
      }
      tl.to(badge, { scale: 1, rotation: -8, duration: 0.7, ease: 'back.out(2)' }, 3.6);

      // Hold the labelled frame, then close the bar with a soft squish.
      tl.to(labels, { autoAlpha: 0, y: -8, duration: 0.5, stagger: 0.08 }, 5.2)
        .to(leaders, { strokeDashoffset: 1, duration: 0.5 }, 5.2)
        .to(dots, { autoAlpha: 0, duration: 0.3 }, 5.4)
        .to(shadows, { autoAlpha: 0, duration: 0.5 }, 5.4)
        .to(art(crumble), { y: assembledY(crumble), duration: 1.2, ease: 'power2.inOut' }, 5.5)
        .to(art(base), { y: assembledY(base), duration: 1.2, ease: 'power2.inOut' }, 5.5)
        .to(
          arts,
          {
            keyframes: { scaleY: [1, 0.92, 1.03, 1], scaleX: [1, 1.04, 0.99, 1] },
            transformOrigin: '50% 100%',
            duration: 0.9,
            ease: 'sine.out',
          },
          6.7,
        );

      if (desktop && photo) tl.to(photo, { autoAlpha: 1, x: 0, duration: 1, ease: ease.spring }, 7.2);
      tl.to({}, { duration: 0.6 }); // a beat to enjoy it before the pin lets go
    },
  );

  // Mobile: the photo sits under the pinned diagram, so it just fades in.
  mm.add(`${media.motion} and ${media.mobile}`, () => {
    if (!photo) return;
    gsap.from(photo, {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: ease.soft,
      scrollTrigger: { trigger: photo, start: 'top 85%' },
    });
  });

  // Reduced motion: the exploded, labelled diagram is already in the HTML.
};
