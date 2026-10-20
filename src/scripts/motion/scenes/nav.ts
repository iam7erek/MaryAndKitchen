/**
 * Nav pill: the cookie fills up as you scroll down the page.
 * Transform only (translateY of the cookie inside a round window).
 */
import type { SceneInit } from '../core';

export const init: SceneInit = (root, { ScrollTrigger }) => {
  const fill = root.querySelector<HTMLElement>('[data-cookie-fill]');
  if (!fill) return;
  const set = (progress: number) => fill.style.setProperty('--fill', `${(1 - progress) * 100}%`);
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => set(self.progress),
    onRefresh: (self) => set(self.progress),
  });
};
