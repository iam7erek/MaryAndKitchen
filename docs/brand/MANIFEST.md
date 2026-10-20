# Mary And Kitchen — brand asset manifest

Source: the Mary And Kitchen brand identity canvas (https://claude.ai/code/artifact/ce331c72-3e94-4bfc-bb54-4806a1b822dd), exported 19 Oct 2026.
Drop the `brand/` folder into `/src/assets/brand/`. 71 files.

**How these were made.** Mascot, product, pattern and sub-brand icon artwork is the canvas's own published SVG, copied path for path (only trimmed, optimized with SVGO and given a `<title>`). Logos, lockups, seals and stickers were assembled from that same artwork. Their text is outlined from the canvas fonts (Fraunces SOFT 100 italic 700, and Nunito 900 tracked +0.42 em), and every line is placed at the exact position measured from a render of the canvas boards.

**Conventions.** Every SVG has a `viewBox`, a `<title>` and `role="img"`, with no fonts, raster images, external references or scripts. Internal IDs are prefixed with the file name (colorway files also carry the folder, for example `logo-horizontal-on-pink-…`). Logo and lockup files have transparent backgrounds, so place colorway files on the background they're named for.

| File | What it is | Where it's used |
|---|---|---|
| `elements/badge-real-oats.svg` | "Made with real oats" badge | Oat revel bar posts and packaging |
| `elements/crumbs.svg` | Crumbs | Pattern and decoration |
| `elements/heart.svg` | Heart | Pattern and decoration |
| `elements/icing-edge-full.svg` | Full icing edge divider (560 x 34) | Menu header edge, section dividers |
| `elements/icing-edge.svg` | One scallop of the icing edge, repeatable (28 x 34) | Section dividers (repeat-x) |
| `elements/sprinkle.svg` | Sprinkle | Pattern and decoration |
| `elements/square.svg` | Little square | Pattern and decoration |
| `favicon/apple-touch-icon.png` | 180 px, cream background | iOS home screen |
| `favicon/favicon.ico` | Favicon 16/32/48 | Legacy browsers |
| `favicon/favicon.svg` | Favicon (from logo-icon) | Browser tab |
| `favicon/icon-192.png` | 192 px, transparent | Web app manifest |
| `favicon/icon-512.png` | 512 px, transparent | Web app manifest |
| `favicon/icon-maskable-512.png` | 512 px maskable, cream, icon inside the safe zone | Android adaptive icon |
| `favicon/site.webmanifest` | Web app manifest: name, theme #EF7FA5, background #FFF5EA | <link rel="manifest"> |
| `icons/highlight-bakes.svg` | Bakes icon, red velvet line | Instagram highlight cover (place on a Blush #FBD5E0 circle) |
| `icons/highlight-orders.svg` | Orders icon, red velvet line | Instagram highlight cover (place on a Blush #FBD5E0 circle) |
| `icons/highlight-reviews.svg` | Reviews icon, red velvet line | Instagram highlight cover (place on a Blush #FBD5E0 circle) |
| `icons/highlight-squares.svg` | Squares icon, red velvet line | Instagram highlight cover (place on a Blush #FBD5E0 circle) |
| `logo/logo-horizontal.svg` | Horizontal logo: head icon + wordmark | Belly bands, email signature, wide banners, site header |
| `logo/logo-icon.svg` | Icon: head in pink circle with cream gap + cocoa ring | Profile picture, seals, favicon, anything under 2 cm |
| `logo/logo-primary.svg` | Primary logo: mascot badge + "Mary" + AND KITCHEN | Box lids, menu header, care card, website hero |
| `logo/logo-stacked.svg` | Stacked logo: head icon above wordmark | Square spaces: posts, stamps, business card |
| `logo/logo-wordmark.svg` | Wordmark only | Labels, small text areas, over photos |
| `logo/on-cocoa/logo-horizontal.svg` | Horizontal logo, colorway for cocoa backgrounds | Only on cocoa backgrounds (as shown under "On every background") |
| `logo/on-cocoa/logo-wordmark.svg` | Wordmark, colorway for cocoa backgrounds | Only on cocoa backgrounds |
| `logo/on-cream/logo-horizontal.svg` | Horizontal logo, colorway for cream backgrounds | Only on cream backgrounds (as shown under "On every background") |
| `logo/on-cream/logo-wordmark.svg` | Wordmark, colorway for cream backgrounds | Only on cream backgrounds |
| `logo/on-pink/logo-horizontal.svg` | Horizontal logo, colorway for pink backgrounds | Only on pink backgrounds (as shown under "On every background") |
| `logo/on-pink/logo-wordmark.svg` | Wordmark, colorway for pink backgrounds | Only on pink backgrounds |
| `logo/on-white/logo-horizontal.svg` | Horizontal logo, colorway for white backgrounds | Only on white backgrounds (as shown under "On every background") |
| `logo/on-white/logo-wordmark.svg` | Wordmark, colorway for white backgrounds | Only on white backgrounds |
| `mascot/mary-bestseller-tray.svg` | Mary with a brownie and an oat revel bar on a tray | Bestsellers, Mary And Bakes |
| `mascot/mary-christmas.svg` | Christmas Mary: fur-trimmed hat, holly, gift | Christmas packaging and posts (December) |
| `mascot/mary-cookie-box.svg` | Mary holding a cookie box | Mary And Bakes, "Order now" |
| `mascot/mary-head-christmas.svg` | Christmas head, winking | December profile picture |
| `mascot/mary-head.svg` | Head icon, no circle | Profile picture, seals |
| `mascot/mary-primary.svg` | Mary holding a square cake and a cookie | Logo, packaging hero |
| `mascot/mary-square-bento.svg` | Mary holding a square bento cake | Mary And Squares |
| `mascot/mary-waving.svg` | Mary waving | Welcome posts, thank-you card |
| `mascot/mary-winking.svg` | Mary winking with a cookie | Promos, reviews |
| `pattern/sprinkle-tile-cocoa.svg` | Seamless 200 px sprinkle tile, cocoa | Tissue paper, box insides, story backgrounds |
| `pattern/sprinkle-tile-cream.svg` | Seamless 200 px sprinkle tile, cream | Tissue paper, box insides, story backgrounds |
| `pattern/sprinkle-tile-pink.svg` | Seamless 200 px sprinkle tile, pink | Tissue paper, box insides, story backgrounds |
| `photos/brownies-and-revel-bars-trays.jpg` | Two trays: brownies and revel bars | Behind the oven, bestsellers post |
| `photos/brownies-box-in-hand.jpg` | Brownies in an open box, in hand | WhatsApp "it's ready" |
| `photos/brownies-closeup.jpg` | Brownies close-up, crackly tops | Hero, menu post, highlight cover |
| `photos/brownies-tray-closeup.jpg` | Brownies close-up in the tray | Packaging window (brownies), WhatsApp chat |
| `photos/pink-box-stack-brownies.jpg` | Brownie box on a stack of pink boxes | Signature stack shot |
| `photos/pink-box-stack-revel-bars.jpg` | Revel bars open on a stack of pink boxes | "Order now" story |
| `photos/revel-bars-box-on-pink-boxes.jpg` | Revel bars box on pink boxes | Uploaded to the canvas, not placed on a board yet |
| `photos/revel-bars-top.jpg` | Oat revel bars from above | Oat-based post, new-product post, packaging window |
| `products/blueberry-cheesecake.svg` | Blueberry cheesecake | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/brown-butter-choc-chip.svg` | Brown butter chocolate chip cookie | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/chocolate-cake.svg` | Chocolate cake (no photo yet) | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/cupcake.svg` | Cupcake (pink) | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/fudgy-brownie.svg` | Fudgy brownie | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/lotus-cheesecake.svg` | Lotus cheesecake | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/oat-revel-bar-cross-section.svg` | Oat revel bar, layers as groups: #oat-revel-bar-cross-section-crumble-top, -fudge-middle, -oat-base | Animated explainer of the oat layers |
| `products/oat-revel-bar.svg` | Oat revel bar | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/red-velvet-cookie.svg` | Red velvet cream cheese cookie | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `products/square-bento-cake.svg` | Square bento cake | Menus, labels, highlight covers, stickers, price lists (never instead of real photos in posts) |
| `stamps/seal-christmas-limited.svg` | "Limited Christmas edition" seal | Christmas box |
| `stamps/seal-cocoa.svg` | Round seal, cocoa: BAKED BY HAND · MADE WITH HEART | Box seal sticker, 5 cm |
| `stamps/seal-pink.svg` | Round seal, pink: MARY AND KITCHEN · HOMEMADE IN THE UAE | Box seal sticker, 5 cm |
| `stamps/seal-wordmark-cream.svg` | Wordmark seal, cream | Seal sticker, 5 cm |
| `stamps/stamp-baked-by-hand.svg` | "Baked by hand" stamp | Decoration, posts, packaging |
| `stamps/sticker-thank-you.svg` | Thank-you sticker with Mary waving | Box side flap, 6 cm |
| `sub-brands/bakes-icon.svg` | Mary And Bakes icon: cookie in pistachio circle | Bakes sub-brand, flavor labels |
| `sub-brands/bakes-lockup.svg` | "Mary AND BAKES" with icon, pink + cream | Bakes sub-brand headers, on cocoa backgrounds only |
| `sub-brands/squares-icon.svg` | Mary And Squares icon: cake on red velvet tile | Squares sub-brand, flavor labels |
| `sub-brands/squares-lockup.svg` | "Mary AND SQUARES" with icon | Squares sub-brand headers |

## Brand colors
Mary Pink `#EF7FA5` · Rose `#D9577F` · Blush `#FBD5E0` · Cream `#FFF5EA` · Cocoa `#3F241E` · Red Velvet `#A8263B` · Pistachio `#B8CF9C` · Biscuit `#D9A062` · Skin `#DDA77F`.
Fonts for site text: Fraunces (italic 700, SOFT 100) for headlines, Nunito for body and labels. Both are on Google Fonts.
