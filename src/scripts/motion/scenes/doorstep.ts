/**
 * The Doorstep: Mary's hero animation runs on its own (CSS inside the SVG).
 * This module only:
 * - pauses that loop while the scene is off screen (saves battery),
 * - gives the headline its piped-icing wobble,
 * - leaves a faint trail of crumbs behind desktop pointers.
 */
import { SplitText } from 'gsap/SplitText';
import type { SceneInit } from '../core';

export const init: SceneInit = (root, { gsap, ease, media }) => {
  gsap.registerPlugin(SplitText);

  // Base.astro adds this class for scenes that hide things until their script
  // runs; nothing here needs it any more, so clear it straight away.
  document.documentElement.classList.remove('motion-pending');

  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const hello = root.querySelector<HTMLElement>('[data-hello]');
  const crumbLayer = root.querySelector<HTMLElement>('[data-crumbs]');

  // Pause Mary's loop while the hero is out of view.
  if (stage) {
    new IntersectionObserver(([entry]) => stage.toggleAttribute('data-paused', !entry.isIntersecting)).observe(
      stage,
    );
  }

  const mm = gsap.matchMedia();

  mm.add(media.motion, () => {
    // Letters stay visible the whole time (only transforms move), so the
    // headline never delays first paint.
    let split: SplitText | undefined;
    if (hello) {
      split = SplitText.create(hello, { type: 'words,chars', wordsClass: 'word', charsClass: 'char' });
      gsap.from(split.chars, {
        yPercent: 35,
        scaleY: 0.7,
        rotation: () => gsap.utils.random(-10, 10),
        transformOrigin: '50% 100%',
        duration: 0.9,
        ease: 'back.out(2.2)',
        stagger: 0.035,
        delay: 0.1,
      });
    }
    return () => split?.revert();
  });

  // Crumb trail: desktop pointers only.
  mm.add(`${media.motion} and ${media.finePointer}`, () => {
    if (!crumbLayer) return;
    const pool = Array.from({ length: 14 }, () => {
      const crumb = document.createElement('span');
      crumb.className = 'crumb';
      crumbLayer.append(crumb);
      return crumb;
    });
    let next = 0;
    let lastX = 0;
    let lastY = 0;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const box = root.getBoundingClientRect();
      const x = event.clientX - box.left;
      const y = event.clientY - box.top;
      if (Math.hypot(x - lastX, y - lastY) < 36) return;
      lastX = x;
      lastY = y;

      const crumb = pool[next];
      next = (next + 1) % pool.length;
      gsap.killTweensOf(crumb);
      gsap.fromTo(
        crumb,
        {
          x: x - 9,
          y: y - 9,
          autoAlpha: 0.55,
          scale: gsap.utils.random(0.5, 1),
          rotation: gsap.utils.random(0, 360),
        },
        { y: `+=${gsap.utils.random(30, 60)}`, rotation: '+=90', autoAlpha: 0, duration: 1.3, ease: ease.soft },
      );
    };

    root.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      root.removeEventListener('pointermove', onMove);
      pool.forEach((crumb) => crumb.remove());
    };
  });
};
