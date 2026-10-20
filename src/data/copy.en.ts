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
    ready: {
      title: "Yay, it's ready!",
      line: 'Fresh out of my oven, just for you 💕',
    },
  },
  revelBar: {
    eyebrow: 'Mary And Bakes · UAE bestseller',
    title: 'You can see the oats.',
    line: "My oat revel bar, layer by layer. Keep scrolling and I'll show you what's inside.",
    diagramTitle: 'Inside an oat revel bar',
    diagramDesc:
      'Cross-section of the oat revel bar pulled apart into three layers: oat crumble on top, chocolate fudge in the middle, rolled-oat cookie base underneath.',
    layers: [
      { key: 'crumble-top', name: 'Oat crumble top', detail: 'Rolled oats, brown sugar, butter' },
      { key: 'fudge-middle', name: 'Chocolate fudge middle', detail: 'The gooey bit everyone fights over' },
      { key: 'oat-base', name: 'Rolled-oat cookie base', detail: 'Holds the whole thing together' },
    ],
    badgeAlt: 'Made with real oats',
    photoAlt: 'Oat revel bars from above, fresh from the tray',
    photoCaption: 'The real ones, straight off my tray',
    whatsapp: 'Hiii Mary! Can I save a box of 10 oat revel bars? 🍫',
  },
  tray: {
    eyebrow: 'Fresh off the tray',
    title: "Everything I'm baking",
    line: 'Tap a bake to peek at the real thing.',
    hint: 'Swipe the tray',
    noPhoto: "Photo coming soon, it's still in the oven!",
    showPhoto: 'Show the photo of',
    showDrawing: 'Show the drawing of',
    bestseller: 'Bestseller',
    currency: 'AED',
  },
  kitchens: {
    eyebrow: 'Two little kitchens',
    title: 'Pick a box, lift the lid',
    open: 'Lift the lid',
    close: 'Close the lid',
    flipHint: 'Tap a cake to flip it',
    flip: 'Flip',
    squares: {
      line: 'Square 4-inch bento cakes, made to order. Small enough to share for two, pretty enough to gift.',
      whatsapp: "Hiii Mary! I'd love a Mary And Squares cake 🎂",
    },
    bakes: {
      line: 'Our UAE bestsellers: fudgy brownies and oat revel bars, plus chunky cookies, in boxes of 10.',
      whatsapp: "Hiii Mary! I'd love to save a box of 10, please 🍪",
    },
  },
  journey: {
    eyebrow: 'How ordering works',
    title: 'From my oven to your door',
    steps: [
      { title: 'Message me', text: "Say hi on WhatsApp and tell me what you're craving." },
      { title: 'I bake it', text: 'Order 12 hours ahead, so it comes out of my oven just for you.' },
      { title: 'Boxed in tens', text: 'Everything goes into a pink box of 10.' },
      { title: 'At your door', text: 'Delivered anywhere in the UAE.' },
    ],
  },
  loveNotes: {
    eyebrow: 'On my fridge',
    title: 'Love notes',
    line: 'Sweet little messages from people who tried my bakes.',
  },
  ringBell: {
    eyebrow: 'Order slip',
    title: 'Ring the bell',
    line: "Fill in my little order slip and I'll message you back to confirm.",
    fields: {
      name: 'Your name',
      phone: 'Your WhatsApp number',
      order: 'What would you like?',
      orderHint: 'A box of 10 fudgy brownies, a Lotus cheesecake square…',
      date: 'When do you need it?',
      area: 'Where in the UAE?',
      areaHint: 'Dubai Marina, Abu Dhabi, Sharjah…',
    },
    aheadNote: 'Please order at least 12 hours ahead.',
    submit: 'Ring the bell',
    sending: 'Ringing…',
    successTitle: "Yesss, you're on my list!",
    successText: "I'll message you on WhatsApp soon to confirm. Can't wait for you to try it!",
    error: "Oops, the bell didn't ring. Try again, or just message me on WhatsApp.",
    invalid: 'Almost! Please check the highlighted bits.',
    faster: 'In a hurry? WhatsApp is faster',
    fasterLine: 'Same order, straight to my phone.',
  },
  apron: {
    title: 'See you soon!',
    line: 'Baked by me, delivered across the UAE.',
    instagram: 'My bakes on Instagram',
    whatsapp: 'Message me on WhatsApp',
    delivery: 'Delivery across the UAE',
    rights: 'Mary And Kitchen',
  },
  nav: {
    home: 'Mary And Kitchen, back to the top',
    menu: 'Menu',
    order: 'Order',
    progress: 'Page progress',
    whatsapp: 'WhatsApp Mary',
  },
} as const;

export type Copy = typeof copy;
