/**
 * Fresh Off the Tray.
 * - Every size: tapping a bake lifts its parchment to show the real photo.
 * - Desktop with motion: the section pins and the tray slides sideways as you
 *   scroll down (pin 1 of 3). Phones keep the native swipe.
 */
import type { SceneInit } from '../core';

export const init: SceneInit = (root, { gsap, media }) => {
  // Lift the parchment (works with reduced motion too; CSS handles timing).
  root.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-peek]');
    const bake = button?.closest<HTMLElement>('[data-bake]');
    if (!button || !bake) return;
    const open = bake.dataset.open !== 'true';
    bake.dataset.open = String(open);
    button.setAttribute('aria-pressed', String(open));
    button.setAttribute('aria-label', (open ? button.dataset.labelOpen : button.dataset.labelClosed) ?? '');
  });

  const pin = root.querySelector<HTMLElement>('[data-pin]');
  const viewport = root.querySelector<HTMLElement>('[data-viewport]');
  const track = root.querySelector<HTMLElement>('[data-track]');
  if (!pin || !viewport || !track) return;

  const mm = gsap.matchMedia();
  mm.add(`${media.motion} and ${media.desktop}`, () => {
    root.classList.add('is-pinned');
    const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    return () => root.classList.remove('is-pinned');
  });
};
