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
  doorstep: {
    hello: 'Hiii, welcome!',
    line: 'Baked by me, in my kitchen, for you.',
    tag: 'Homemade in the UAE',
    facts: ['Boxes of 10', 'Order 12 hours ahead', 'Delivery across the UAE'],
    logoAlt: 'Mary And Kitchen',
  },
} as const;

export type Copy = typeof copy;
