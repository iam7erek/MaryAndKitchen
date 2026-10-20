/**
 * Real facts only. Anything not confirmed by Ali/Mary stays a [PLACEHOLDER].
 * All user-facing words live in src/data so an Arabic version can be added
 * as a sibling file later without touching components.
 */
import { copy } from './copy.en';

export const site = {
  name: 'Mary And Kitchen',
  subBrands: {
    squares: 'Mary And Squares',
    bakes: 'Mary And Bakes',
  },
  instagram: {
    handle: '@MaryAndKitchen',
    url: 'https://www.instagram.com/maryandkitchen/',
  },
  whatsapp: {
    display: '+971 54 248 5842',
    e164: '+971542485842',
    number: '971542485842',
  },
  orderAheadHours: 12,
  boxSize: 10,
  country: 'AE',
} as const;

/** wa.me link with a prefilled, friendly message. */
export function whatsappLink(message: string = copy.whatsapp.message): string {
  return `https://wa.me/${site.whatsapp.number}?text=${encodeURIComponent(message)}`;
}
