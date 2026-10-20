# Mary And Kitchen: what couldn't be exported to spec, and why

Nothing in the export list is missing. Every requested file is in `brand/`. Below is everything that differs from the brief, so the developer knows exactly what they're getting.

## 1. Colors outside the nine brand colors (kept on purpose)
The brief says "exact brand colors only" and also "extract, never redraw; never change Mary's face, hair or hat". The canvas artwork itself uses extra shades: Mary's hair, mouth and hat highlights, plus shading and texture on every bake. Recoloring them would change Mary and the products, so they were **kept exactly as published** and are listed here. There is **no pure black**. The only purple is the **blueberry topping** on `blueberry-cheesecake.svg`: blueberries are purple, so this is food color, not the retired brand purple. If you want it removed, it needs a design decision on the canvas first.

| Color | What it is | Files |
|---|---|---|
| `#1E1A1D` | Mary's hair (near-black, not pure black) | favicon.svg, logo-horizontal.svg, logo-icon.svg, logo-primary.svg, logo-stacked.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-head-christmas.svg, mary-head.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, seal-cocoa.svg, seal-pink.svg, sticker-thank-you.svg |
| `#5A5058` | hair shine | favicon.svg, logo-horizontal.svg, logo-icon.svg, logo-primary.svg, logo-stacked.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-head-christmas.svg, mary-head.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, seal-cocoa.svg, seal-pink.svg, sticker-thank-you.svg |
| `#8E2F3E` | inside of her mouth | favicon.svg, logo-horizontal.svg, logo-icon.svg, logo-primary.svg, logo-stacked.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-head-christmas.svg, mary-head.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, seal-cocoa.svg, seal-pink.svg, sticker-thank-you.svg |
| `#F8B6CC` | highlights on the chef hat | favicon.svg, logo-horizontal.svg, logo-icon.svg, logo-primary.svg, logo-stacked.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-head-christmas.svg, mary-head.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, seal-cocoa.svg, seal-pink.svg, sticker-thank-you.svg |
| `#FFFFFF` | chef jacket, white chocolate, flaky salt, Christmas fur | bakes-icon.svg, bakes-lockup.svg, brown-butter-choc-chip.svg, chocolate-cake.svg, logo-primary.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-head-christmas.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, sticker-thank-you.svg |
| `#C99470` | neck shadow | logo-primary.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, sticker-thank-you.svg |
| `#F6E9E0` | shade on the chef jacket | logo-primary.svg, mary-bestseller-tray.svg, mary-christmas.svg, mary-cookie-box.svg, mary-primary.svg, mary-square-bento.svg, mary-waving.svg, mary-winking.svg, sticker-thank-you.svg |
| `#EBC08A` | cookie highlight | brown-butter-choc-chip.svg, logo-primary.svg, mary-primary.svg, mary-waving.svg, mary-winking.svg, sticker-thank-you.svg |
| `#4A2A20` | food shading or texture | chocolate-cake.svg, fudgy-brownie.svg, mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#7A4A36` | food shading or texture | chocolate-cake.svg, fudgy-brownie.svg, mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#5A3326` | food shading or texture | chocolate-cake.svg, mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#F6E2B8` | oat flakes | badge-real-oats.svg, mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#5E3628` | food shading or texture | mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#B88A4E` | food shading or texture | mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#C79A5E` | food shading or texture | mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#E2BE85` | food shading or texture | mary-bestseller-tray.svg, oat-revel-bar-cross-section.svg, oat-revel-bar.svg |
| `#3A1F18` | food shading or texture | fudgy-brownie.svg, mary-bestseller-tray.svg |
| `#53301F` | food shading or texture | fudgy-brownie.svg, mary-bestseller-tray.svg |
| `#6A3F2E` | food shading or texture | fudgy-brownie.svg, mary-bestseller-tray.svg |
| `#6F9A4E` | Christmas holly leaves | mary-christmas.svg, mary-head-christmas.svg |
| `#7E4E38` | food shading or texture | fudgy-brownie.svg, mary-bestseller-tray.svg |
| `#8F5A2E` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#B57A42` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#B88468` | food shading or texture | fudgy-brownie.svg, mary-bestseller-tray.svg |
| `#C98B4E` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#E9D3B4` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#FFF0D8` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#FFF3E0` | food shading or texture | blueberry-cheesecake.svg, lotus-cheesecake.svg |
| `#3E4A8C` | blueberries (blue-purple) | blueberry-cheesecake.svg |
| `#4E2A5E` | blueberry topping (purple) | blueberry-cheesecake.svg |
| `#8A5A44` | food shading or texture | chocolate-cake.svg |
| `#9A6248` | food shading or texture | chocolate-cake.svg |
| `#A9B0E0` | blueberry highlights | blueberry-cheesecake.svg |
| `#B5743A` | food shading or texture | lotus-cheesecake.svg |
| `#B8344A` | food shading or texture | red-velvet-cookie.svg |
| `#B9855A` | food shading or texture | mary-bestseller-tray.svg |
| `#C47A3C` | food shading or texture | lotus-cheesecake.svg |
| `#C9A585` | food shading or texture | chocolate-cake.svg |
| `#D2566A` | food shading or texture | red-velvet-cookie.svg |
| `#D99A5B` | food shading or texture | lotus-cheesecake.svg |
| `#E0CDB5` | food shading or texture | brown-butter-choc-chip.svg |
| `#E7A967` | food shading or texture | lotus-cheesecake.svg |
| `#E7B47A` | food shading or texture | lotus-cheesecake.svg |
| `#E9C9A8` | food shading or texture | chocolate-cake.svg |

All logo, wordmark, lockup, seal, pattern, element and icon colors (fills, rings and type) are brand colors. The extra shades above appear only inside the mascot and product artwork they contain.

## 2. The ♥ glyph in two stickers
In the canvas, `seal-cocoa` ("…MADE WITH HEART · ♥ ·") and `sticker-thank-you` ("by Mary ♥") use a ♥ character. Nunito has no ♥, so the canvas showed a **system fallback font**. That glyph isn't brand artwork and can't be outlined from the brand fonts, so both files use the **brand heart shape** (`elements/heart.svg` path) at the same size and position.

## 3. Things exported exactly as the canvas shows them (worth fixing on the canvas)
- **`stamp-baked-by-hand.svg`:** the ring text is longer than the circle, so in the canvas "HEART" is cut to "HEA" and runs into "BAKED". It's exported exactly like that. Fix: shorten the text or reduce the letter-spacing on the canvas, then re-export.
- **`seal-pink.svg`:** the canvas drops the final "·" after "THE UAE" because it runs past the end of the circle. Exported the same way.
- **`seal-christmas-limited.svg`:** "Christmas" is wider than the disc and touches the ring, as on the canvas.
- **`seal-wordmark-cream.svg`:** "AND KITCHEN" sits tight against the descender of the "y", as on the canvas (line-height 0.9).

## 4. Small judgment calls
- **`badge-real-oats.svg`:** on the canvas, the gap between the pistachio disc and the cocoa ring shows the card behind it (`#F6E7D0`, not a brand color). It's exported as Cream `#FFF5EA` so the badge works on any background.
- **`icons/highlight-*.svg`:** exported as the line icon only, transparent. The Blush circle behind them on the canvas is plain CSS, as the brief says the site builds those.
- **Logo lockups:** layout and type positions were measured from a render of the canvas boards using the same font files (Fraunces SOFT 100 and Nunito from Fontsource). The live canvas loads the same fonts from Google Fonts, so expect differences of a pixel or less.
- **`favicon/icon-maskable-512.png`:** the icon sits inside the 80% safe zone on Cream, per the brief.

## 5. Photos
- The canvas shows **800 px crops**. `photos/` has the **original files** those crops came from, at their full received resolution (**900 x 1600**, as sent over WhatsApp), copied byte for byte and never upscaled. Higher-resolution originals, if any, are still on Mary's phone.
- The canvas holds 8 photos (7 placed on boards, plus `revel-bars-box-on-pink-boxes.jpg`, which was uploaded but not placed). The other 19 photos from Mary's folder were never added to the canvas, so they're not included.
- No photos exist yet of the chocolate cake, the chocolate cupcake, the cheesecakes, the cookies or the bento squares. Use the drawings in `products/` until they're shot.

## 6. Not available
- **The reference PDF "Mary And Kitchen — Brand Identity"** wasn't attached, so the canvas itself was the visual reference.
- **A chocolate cupcake drawing** doesn't exist yet (the cupcake is the pink one). It's planned once the trial-bake photos arrive.
