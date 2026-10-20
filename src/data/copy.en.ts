/** English copy in Mary's voice: warm, excited, like texting a friend. */
export const copy = {
  lang: 'en',
  dir: 'ltr',
  meta: {
    title: 'Mary And Kitchen · Homemade bakes in the UAE',
    description:
      'Fudgy brownies, oat revel bars and 4-inch square cakes, baked by Mary in her kitchen. Boxes of 10, order 12 hours ahead, delivery across the UAE.',
    ogAlt: 'Mary the cartoon chef holding a tray of brownies and oat revel bars',
  },
  a11y: {
    skip: 'Skip to the good stuff',
  },
  whatsapp: {
    message: "Hiii Mary! I'd love to save a box, please 💕",
  },
  cta: {
    saveBox: 'Save me a box',
    saveBoxOf10: 'Save me a box of 10',
  },
  shell: {
    hello: 'Hiii, welcome!',
    line: 'Baked by me, in my kitchen, for you.',
    soon: "The full kitchen tour is still in the oven. It's coming really soon!",
  },
} as const;

export type Copy = typeof copy;
