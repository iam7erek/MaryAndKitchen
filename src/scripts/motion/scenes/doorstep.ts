/**
 * The Doorstep: the oven door swings open, Mary peeks out, cookies tumble
 * onto the counter and settle with a soft bounce. On desktop the pointer
 * leaves a faint trail of crumbs.
 *
 * The markup is the settled state. Base.astro adds html.motion-pending before
 * first paint (motion allowed only) so the oven starts closed; this module
 * removes it and plays the opening from there in the same frame.
 */
import { SplitText } from 'gsap/SplitText';
import type { SceneInit } from '../core';

const PENDING = 'motion-pending';

export const init: SceneInit = (root, { gsap, ease, media }) => {
  gsap.registerPlugin(SplitText);

  const html = document.documentElement;
  const door = root.querySelector<HTMLElement>('[data-door]');
  const mary = root.querySelector<HTMLElement>('[data-mary]');
  const sign = root.querySelector<HTMLElement>('[data-sign]');
  const hello = root.querySelector<HTMLElement>('[data-hello]');
  const opening = root.querySelector<HTMLElement>('.oven__window');
  const cookies = gsap.utils.toArray<HTMLElement>('[data-cookie]', root);
  const crumbLayer = root.querySelector<HTMLElement>('[data-crumbs]');

  // If the safety timeout already revealed the settled scene, don't replay it.
  const playOpening = html.classList.contains(PENDING);

  const mm = gsap.matchMedia();

  mm.add(media.motion, () => {
    let openingTl: gsap.core.Timeline | undefined;
    if (playOpening && door && mary && opening) {
      // Swap the CSS "closed" state for the same state in GSAP, in one frame
      // (no paint happens in between). The class goes first so GSAP reads the
      // settled transforms, not the pending ones. End values match the CSS.
      html.classList.remove(PENDING);
      gsap.set(door, { rotationY: 0 });
      gsap.set(mary, { y: 0, yPercent: 80 });
      gsap.set(cookies, { autoAlpha: 0 });

      const windowBox = opening.getBoundingClientRect();
      const fromWindow = (el: HTMLElement) => {
        const box = el.getBoundingClientRect();
        return {
          x: windowBox.left + windowBox.width / 2 - (box.left + box.width / 2),
          y: windowBox.top + windowBox.height * 0.75 - (box.top + box.height / 2),
        };
      };

      const tl = gsap.timeline({ delay: 0.25, defaults: { ease: ease.soft } });
      openingTl = tl;

      tl.to(door, { rotationY: -108, duration: 1.1, ease: 'back.out(1.2)' })
        .to(mary, { yPercent: 0, duration: 0.8, ease: ease.spring }, '-=0.6')
        .to(mary, { rotation: -6, duration: 0.35, yoyo: true, repeat: 1, ease: 'sine.inOut' }, '>-0.1');

      cookies.forEach((cookie, i) => {
        const start = fromWindow(cookie);
        const rest = Number(cookie.dataset.rest ?? 0);
        const at = 0.85 + i * 0.14;
        tl.set(cookie, { autoAlpha: 1, x: start.x, y: start.y, scale: 0.6, rotation: rest - 140 }, at)
          .to(cookie, { x: 0, duration: 0.9, ease: 'power1.out' }, at)
          .to(cookie, { y: 0, duration: 0.9, ease: 'bounce.out' }, at)
          .to(cookie, { scale: 1, rotation: rest, duration: 0.9, ease: ease.spring }, at);
      });

      if (sign) {
        tl.from(sign, { rotation: -24, yPercent: -20, duration: 1, ease: 'elastic.out(1, 0.55)' }, 0.5);
      }
    } else {
      html.classList.remove(PENDING);
    }

    // The headline gets a little piped-icing wobble. Letters stay visible the
    // whole time (only transforms move), so it never delays first paint.
    let split: SplitText | undefined;
    if (hello) {
      split = SplitText.create(hello, { type: 'words,chars', charsClass: 'char' });
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

    // Mary keeps peeking while the oven is on screen. Starts once the opening
    // has finished so the two never fight over her position.
    let bob: gsap.core.Tween | undefined;
    const startBob = () => {
      if (!mary) return;
      bob = gsap.to(mary, {
        y: () => -mary.offsetHeight * 0.04,
        duration: 1.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        scrollTrigger: {
          trigger: root,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'play pause resume pause',
        },
      });
    };
    if (openingTl) openingTl.eventCallback('onComplete', startBob);
    else startBob();

    return () => {
      split?.revert();
      bob?.kill();
    };
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

  // Reduced motion: everything is already in its settled place.
  mm.add(media.reduced, () => {
    html.classList.remove(PENDING);
  });
};
