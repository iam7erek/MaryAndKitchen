/**
 * The Doorstep: Mary's hero animation (CSS keyframes inside her SVG, a
 * 10-second loop as designed). Here it plays ONCE, faster, starting just
 * before the "Ding", and stops on the moment Mary is holding the fresh tray.
 * Then her speech bubble pops up. The oven's little ambient loops (glow,
 * coil, steam) keep going softly and pause while the hero is off screen.
 *
 * Also: the headline's piped-icing wobble and the desktop crumb trail.
 */
import { SplitText } from 'gsap/SplitText';
import type { SceneInit } from '../core';

/** Times inside the 10 s story loop (ms). */
const STORY = 10_000;
const START = 4_200; // timer nearly done, just before the Ding
const HOLD = 8_600; // tray on Mary's counter, mitts down, Mary winking
const SETTLED = 8_800; // the little hearts/steam over the tray have faded
const SPEED = 1.7; // ~2.6 s from Ding to tray

export const init: SceneInit = (root, { gsap, ease, media }) => {
  gsap.registerPlugin(SplitText);

  const html = document.documentElement;
  const stage = root.querySelector<HTMLElement>('[data-stage]');
  const svg = stage?.querySelector('svg');
  const bubble = root.querySelector<HTMLElement>('[data-mary-says]');
  const hello = root.querySelector<HTMLElement>('[data-hello]');
  const crumbLayer = root.querySelector<HTMLElement>('[data-crumbs]');

  const mm = gsap.matchMedia();

  // ---- Mary's scene: once, faster, then hold + speech bubble ----
  mm.add(media.motion, () => {
    if (bubble) gsap.set(bubble, { autoAlpha: 0, scale: 0.6, y: 12 });
    html.classList.remove('motion-pending');
    if (!svg) return;

    const all = svg.getAnimations({ subtree: true }) as CSSAnimation[];
    const isStory = (a: Animation) => a.effect?.getComputedTiming().duration === STORY;
    const story = all.filter(isStory);
    const ambient = all.filter((a) => !isStory(a));
    const delayOf = (a: Animation) => Number(a.effect?.getTiming().delay ?? 0);
    // Steam and hearts over the tray finish fading instead of freezing mid-air.
    const fleeting = (a: CSSAnimation) => a.animationName === 'ov-tsteam' || a.animationName === 'ov-h';

    const seek = (time: number) =>
      story.forEach((a) => {
        a.currentTime = (fleeting(a) && time === HOLD ? SETTLED : time) + delayOf(a);
      });

    seek(START);
    story.forEach((a) => {
      a.playbackRate = SPEED;
      a.play();
    });

    let raf = 0;
    const watch = () => {
      const lead = story[0];
      const t = lead ? Number(lead.currentTime) - delayOf(lead) : HOLD;
      if (t >= HOLD || t < START) {
        story.forEach((a) => a.pause());
        seek(HOLD);
        if (bubble) gsap.to(bubble, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'back.out(1.6)' });
        return;
      }
      raf = requestAnimationFrame(watch);
    };
    raf = requestAnimationFrame(watch);

    // Ambient loops rest while the hero is off screen.
    const io = new IntersectionObserver(([entry]) =>
      ambient.forEach((a) => (entry.isIntersecting ? a.play() : a.pause())),
    );
    if (stage) io.observe(stage);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  });

  // Reduced motion: the scene's own CSS shows a still frame; the bubble stays.
  mm.add(media.reduced, () => {
    html.classList.remove('motion-pending');
  });

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
