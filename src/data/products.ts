/**
 * Everything on the menu. Facts only from Ali/Mary and the brand identity;
 * every price is [PRICE] until Mary sends them.
 */
import type { ImageMetadata } from 'astro';
import brownieArt from '../assets/brand/products/fudgy-brownie.svg';
import revelArt from '../assets/brand/products/oat-revel-bar.svg';
import redVelvetCookieArt from '../assets/brand/products/red-velvet-cookie.svg';
import chocChipArt from '../assets/brand/products/brown-butter-choc-chip.svg';
import bentoArt from '../assets/brand/products/square-bento-cake.svg';
import lotusArt from '../assets/brand/products/lotus-cheesecake.svg';
import blueberryArt from '../assets/brand/products/blueberry-cheesecake.svg';
import chocolateArt from '../assets/brand/products/chocolate-cake.svg';
import brownieTray from '../assets/brand/photos/brownies-closeup.jpg';
import revelTray from '../assets/brand/photos/revel-bars-top.jpg';

export type SubBrand = 'squares' | 'bakes';

export interface Product {
  id: string;
  name: string;
  subBrand: SubBrand;
  line: string;
  drawing: ImageMetadata;
  photo?: ImageMetadata;
  photoAlt?: string;
  bestseller?: boolean;
  unit: string;
  price: string;
}

const BOX = 'Box of 10';
const SQUARE = '4-inch square';
const PRICE = '[PRICE]';

export const products: Product[] = [
  {
    id: 'fudgy-brownie',
    name: 'Fudgy brownies',
    subBrand: 'bakes',
    line: 'Crackly top, gooey middle. No walnuts, ever.',
    drawing: brownieArt,
    photo: brownieTray,
    photoAlt: 'Fudgy brownies with crackly tops, cut into squares in an open box',
    bestseller: true,
    unit: BOX,
    price: PRICE,
  },
  {
    id: 'oat-revel-bar',
    name: 'Oat revel bars',
    subBrand: 'bakes',
    line: 'Oat crumble, chocolate fudge, rolled-oat base.',
    drawing: revelArt,
    photo: revelTray,
    photoAlt: 'Oat revel bars from above in an open pink box',
    bestseller: true,
    unit: BOX,
    price: PRICE,
  },
  {
    id: 'red-velvet-cookie',
    name: 'Red velvet cream cheese cookies',
    subBrand: 'bakes',
    line: 'Red velvet with a cream cheese heart.',
    drawing: redVelvetCookieArt,
    unit: BOX,
    price: PRICE,
  },
  {
    id: 'brown-butter-choc-chip',
    name: 'Brown butter choc chip cookies',
    subBrand: 'bakes',
    line: 'The classic, made with brown butter.',
    drawing: chocChipArt,
    unit: BOX,
    price: PRICE,
  },
  {
    id: 'red-velvet-square',
    name: 'Red velvet',
    subBrand: 'squares',
    line: 'A little red velvet square, made to order.',
    drawing: bentoArt,
    unit: SQUARE,
    price: PRICE,
  },
  {
    id: 'lotus-cheesecake',
    name: 'Lotus cheesecake',
    subBrand: 'squares',
    line: 'Lotus cheesecake in a little square, made to order.',
    drawing: lotusArt,
    unit: SQUARE,
    price: PRICE,
  },
  {
    id: 'blueberry-cheesecake',
    name: 'Blueberry cheesecake',
    subBrand: 'squares',
    line: 'Blueberry cheesecake in a little square, made to order.',
    drawing: blueberryArt,
    unit: SQUARE,
    price: PRICE,
  },
  {
    id: 'chocolate-cake',
    name: 'Chocolate cake',
    subBrand: 'squares',
    line: 'Dark chocolate frosting and salted caramel.',
    drawing: chocolateArt,
    unit: SQUARE,
    price: PRICE,
  },
  {
    id: 'carrot-cake',
    name: 'Carrot cake',
    subBrand: 'squares',
    line: 'A cosy carrot cake square, made to order.',
    // [PLACEHOLDER] no carrot cake drawing or photo yet: uses the plain bento drawing.
    drawing: bentoArt,
    unit: SQUARE,
    price: PRICE,
  },
];

export const bySubBrand = (subBrand: SubBrand) => products.filter((p) => p.subBrand === subBrand);
