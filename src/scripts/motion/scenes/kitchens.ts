/**
 * Two Little Kitchens: the boxes start closed once JS is here (without JS
 * they stay open). Lids and flips are CSS transitions with spring easing, so
 * reduced motion simply makes them instant.
 */
import type { SceneInit } from '../core';

export const init: SceneInit = (root) => {
  const setOpen = (box: HTMLElement, open: boolean) => {
    box.dataset.open = String(open);
    const toggle = box.querySelector<HTMLButtonElement>('[data-lid-toggle]');
    if (!toggle) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = (open ? toggle.dataset.labelOpen : toggle.dataset.labelClosed) ?? '';
  };

  root.querySelectorAll<HTMLElement>('[data-box]').forEach((box) => setOpen(box, false));

  root.addEventListener('click', (event) => {
    const target = event.target as Element | null;

    const toggle = target?.closest<HTMLButtonElement>('[data-lid-toggle]');
    const box = toggle?.closest<HTMLElement>('[data-box]');
    if (toggle && box) {
      setOpen(box, box.dataset.open !== 'true');
      return;
    }

    const flip = target?.closest<HTMLButtonElement>('[data-flip]');
    if (flip) flip.setAttribute('aria-pressed', String(flip.getAttribute('aria-pressed') !== 'true'));
  });
};
