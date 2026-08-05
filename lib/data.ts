export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  collection: string;
  category: string;
  price: number; // USD
  compareAt?: number;
  image: string;
  image2?: string;
  gallery?: string[];
  description: string;
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevity: string;
  projection: string;
  occasion: string[];
  season: string[];
  gender: 'Unisex' | 'Men' | 'Women';
  volume: string;
  rating: number;
  reviewCount: number;
  stock: number;
  bestseller?: boolean;
  newArrival?: boolean;
  badge?: string;
};

const img = (u: string) => u;

export const PRODUCTS: Product[] = [
  {
    id: '1', slug: 'royal-oud-noir', name: 'Royal Oud Noir', subtitle: 'Smoky oud & black amber',
    collection: 'Signature Oud', category: 'Oud Perfumes', price: 285, compareAt: 340,
    image: img('https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/11216321/pexels-photo-11216321.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A commanding oud woven with black amber and smoky leather. Royal Oud Noir opens with a veil of saffron before descending into a deep, resinous heart of Cambodian oud and dark musk — an unmistakable signature of power and restraint.',
    topNotes: ['Saffron', 'Pink Pepper', 'Bergamot'],
    middleNotes: ['Cambodian Oud', 'Black Amber', 'Rose'],
    baseNotes: ['Leather', 'Musk', 'Patchouli'],
    longevity: '10–12 hours', projection: 'Heavy',
    occasion: ['Evening', 'Formal', 'Winter Nights'],
    season: ['Winter', 'Autumn'],
    gender: 'Unisex', volume: '50ml / 1.7 fl oz',
    rating: 4.9, reviewCount: 142, stock: 24, bestseller: true, badge: 'Bestseller',
  },
  {
    id: '2', slug: 'oud-mokhallat', name: 'Oud Mokhallat', subtitle: 'Spiced floral bouquet',
    collection: 'Arabic Heritage', category: 'Attars', price: 210,
    image: img('https://images.pexels.com/photos/38721545/pexels-photo-38721545.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/38721543/pexels-photo-38721543.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A traditional mokhallat blending rose, saffron and oud over a warm base of amber and sandalwood. Worn for centuries across the Arabian peninsula, this is a fragrance of celebration.',
    topNotes: ['Saffron', 'Cardamom'],
    middleNotes: ['Taif Rose', 'Jasmine', 'Oud'],
    baseNotes: ['Amber', 'Sandalwood', 'Honey'],
    longevity: '8–10 hours', projection: 'Moderate',
    occasion: ['Daytime', 'Celebration', 'Festive'],
    season: ['Spring', 'Autumn'],
    gender: 'Unisex', volume: '30ml / 1.0 fl oz',
    rating: 4.8, reviewCount: 89, stock: 31, bestseller: true,
  },
  {
    id: '3', slug: 'midnight-attar', name: 'Midnight Attar', subtitle: 'Velvet rose & dark musk',
    collection: 'Signature Oud', category: 'Attars', price: 245, compareAt: 290,
    image: img('https://images.pexels.com/photos/21926655/pexels-photo-21926655.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/21926650/pexels-photo-21926650.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A pure oil attar of midnight rose, dark musk and a whisper of oud. Concentrated, intimate and long-lasting — designed to be worn close to the skin.',
    topNotes: ['Black Pepper', 'Bergamot'],
    middleNotes: ['Bulgarian Rose', 'Geranium'],
    baseNotes: ['White Musk', 'Oud', 'Vanilla'],
    longevity: '12+ hours', projection: 'Intimate',
    occasion: ['Evening', 'Romantic', 'Intimate'],
    season: ['Winter', 'Autumn'],
    gender: 'Unisex', volume: '12ml / 0.4 fl oz',
    rating: 4.9, reviewCount: 67, stock: 18, newArrival: true, badge: 'New',
  },
  {
    id: '4', slug: 'golden-amber', name: 'Golden Amber', subtitle: 'Warm amber & vanilla orchid',
    collection: 'Gold Reserve', category: 'Eau de Parfum', price: 195,
    image: img('https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/18833913/pexels-photo-18833913.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'Liquid gold. A radiant amber composition sweetened with vanilla orchid and smoothed by sandalwood. Golden Amber is warmth made wearable.',
    topNotes: ['Mandarin', 'Neroli'],
    middleNotes: ['Amber', 'Vanilla Orchid', 'Ylang Ylang'],
    baseNotes: ['Sandalwood', 'Tonka Bean', 'Benzoin'],
    longevity: '8–10 hours', projection: 'Moderate',
    occasion: ['Daytime', 'Office', 'Evening'],
    season: ['Autumn', 'Winter'],
    gender: 'Women', volume: '50ml / 1.7 fl oz',
    rating: 4.7, reviewCount: 112, stock: 40, bestseller: true,
  },
  {
    id: '5', slug: 'saffron-dunes', name: 'Saffron Dunes', subtitle: 'Desert saffron & oud',
    collection: 'Arabic Heritage', category: 'Oud Perfumes', price: 265,
    image: img('https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/30981935/pexels-photo-30981935.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'Inspired by the golden dunes at dusk. Saffron Dunes marries the spice of pure saffron with smoky oud and a dry, warm cedar — the desert bottled.',
    topNotes: ['Saffron', 'Cinnamon'],
    middleNotes: ['Oud', 'Dry Rose'],
    baseNotes: ['Cedarwood', 'Vetiver', 'Ambergris'],
    longevity: '10–12 hours', projection: 'Heavy',
    occasion: ['Evening', 'Formal', 'Winter'],
    season: ['Winter', 'Autumn'],
    gender: 'Unisex', volume: '50ml / 1.7 fl oz',
    rating: 4.8, reviewCount: 54, stock: 22, newArrival: true,
  },
  {
    id: '6', slug: 'rose-of-taif', name: 'Rose of Taif', subtitle: 'Pure Taif rose absolute',
    collection: 'Floral Reserve', category: 'Eau de Parfum', price: 320,
    image: img('https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/26859235/pexels-photo-26859235.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'The legendary Taif rose, harvested at dawn and blended with a touch of oud and white musk. One of the world\u2019s most prized floral absolutes, presented pure and unadorned.',
    topNotes: ['Green Leaves', 'Citrus'],
    middleNotes: ['Taif Rose', 'Honey'],
    baseNotes: ['White Musk', 'Oud', 'Sandalwood'],
    longevity: '8–10 hours', projection: 'Moderate',
    occasion: ['Daytime', 'Celebration', 'Wedding'],
    season: ['Spring', 'Summer'],
    gender: 'Women', volume: '50ml / 1.7 fl oz',
    rating: 5.0, reviewCount: 38, stock: 12, badge: 'Limited',
  },
  {
    id: '7', slug: 'black-musk-intense', name: 'Black Musk Intense', subtitle: 'Animalic musk & oud',
    collection: 'Signature Oud', category: 'Eau de Parfum', price: 230,
    image: img('https://images.pexels.com/photos/29805437/pexels-photo-29805437.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/29986521/pexels-photo-29986521.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A deep, animalic musk layered over oud and dark amber. Black Musk Intense is unapologetically bold — a second skin for those who command the room.',
    topNotes: ['Pink Pepper', 'Bergamot'],
    middleNotes: ['Black Musk', 'Oud', 'Patchouli'],
    baseNotes: ['Amber', 'Leather', 'Castoreum'],
    longevity: '12+ hours', projection: 'Heavy',
    occasion: ['Evening', 'Night', 'Winter'],
    season: ['Winter', 'Autumn'],
    gender: 'Men', volume: '50ml / 1.7 fl oz',
    rating: 4.7, reviewCount: 76, stock: 28,
  },
  {
    id: '8', slug: 'oud-imperial', name: 'Oud Imperial', subtitle: 'Imperial oud & gold',
    collection: 'Gold Reserve', category: 'Oud Perfumes', price: 420, compareAt: 480,
    image: img('https://images.pexels.com/photos/11711808/pexels-photo-11711808.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/8625543/pexels-photo-8625543.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'Our crowning creation. Oud Imperial pairs aged Cambodian oud with 24-karat gold leaf and a bouquet of rose, saffron and amber. Presented in a hand-finished gold flacon.',
    topNotes: ['Saffron', 'Rose Petals'],
    middleNotes: ['Aged Oud', 'Jasmine'],
    baseNotes: ['Amber', 'Sandalwood', 'Gold Accord'],
    longevity: '12+ hours', projection: 'Heavy',
    occasion: ['Formal', 'Celebration', 'Royal'],
    season: ['Winter', 'Autumn'],
    gender: 'Unisex', volume: '75ml / 2.5 fl oz',
    rating: 5.0, reviewCount: 29, stock: 8, badge: 'Limited',
  },
  {
    id: '9', slug: 'white-jasmine-attar', name: 'White Jasmine Attar', subtitle: 'Night-blooming jasmine',
    collection: 'Floral Reserve', category: 'Attars', price: 175,
    image: img('https://images.pexels.com/photos/18031835/pexels-photo-18031835.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/12402366/pexels-photo-12402366.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A delicate attar of night-blooming jasmine over a base of pure sandalwood oil. Soft, luminous and endlessly feminine.',
    topNotes: ['Green Tea', 'Citrus'],
    middleNotes: ['Night Jasmine', 'Tuberose'],
    baseNotes: ['Sandalwood Oil', 'White Musk'],
    longevity: '8–10 hours', projection: 'Intimate',
    occasion: ['Daytime', 'Office', 'Summer'],
    season: ['Spring', 'Summer'],
    gender: 'Women', volume: '12ml / 0.4 fl oz',
    rating: 4.6, reviewCount: 64, stock: 35, newArrival: true,
  },
  {
    id: '10', slug: 'leather-oud', name: 'Leather Oud', subtitle: 'Smoked leather & oud',
    collection: 'Signature Oud', category: 'Eau de Parfum', price: 295,
    image: img('https://images.pexels.com/photos/14402561/pexels-photo-14402561.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/14402559/pexels-photo-14402559.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'Birch leather and oud smoke, softened with a heart of rose and tobacco. Leather Oud is a fireside fragrance for the well-travelled.',
    topNotes: ['Birch Tar', 'Cardamom'],
    middleNotes: ['Rose', 'Tobacco Leaf'],
    baseNotes: ['Oud', 'Leather', 'Vetiver'],
    longevity: '10–12 hours', projection: 'Heavy',
    occasion: ['Evening', 'Formal', 'Winter'],
    season: ['Winter', 'Autumn'],
    gender: 'Men', volume: '50ml / 1.7 fl oz',
    rating: 4.8, reviewCount: 47, stock: 19,
  },
  {
    id: '11', slug: 'amber-vanille', name: 'Amber Vanille', subtitle: 'Bourbon vanilla & amber',
    collection: 'Gold Reserve', category: 'Eau de Parfum', price: 165,
    image: img('https://images.pexels.com/photos/13875783/pexels-photo-13875783.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/13875780/pexels-photo-13875780.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A gourmand-adjacent amber. Bourbon vanilla is wrapped in warm amber, tonka and a hint of pink pepper for a fragrance that is both comforting and refined.',
    topNotes: ['Pink Pepper', 'Mandarin'],
    middleNotes: ['Bourbon Vanilla', 'Amber'],
    baseNotes: ['Tonka Bean', 'Sandalwood', 'Benzoin'],
    longevity: '8–10 hours', projection: 'Moderate',
    occasion: ['Daytime', 'Cozy Evenings', 'Office'],
    season: ['Autumn', 'Winter'],
    gender: 'Unisex', volume: '50ml / 1.7 fl oz',
    rating: 4.7, reviewCount: 93, stock: 44, bestseller: true,
  },
  {
    id: '12', slug: 'oud-reserve-1996', name: 'Oud Reserve 1996', subtitle: 'Vintage aged oud',
    collection: 'Gold Reserve', category: 'Oud Perfumes', price: 510,
    image: img('https://images.pexels.com/photos/31007014/pexels-photo-31007014.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    image2: img('https://images.pexels.com/photos/11122042/pexels-photo-11122042.jpeg?auto=compress&cs=tinysrgb&w=1200'),
    description: 'A vintage reserve of oud aged since 1996. Decades of maturation have softened the wildness of the wood into something profound, honeyed and almost spiritual. Numbered edition of 100.',
    topNotes: ['Aged Oud', 'Honey'],
    middleNotes: ['Sandalwood', 'Rose'],
    baseNotes: ['Ambergris', 'Musk', 'Cedar'],
    longevity: '12+ hours', projection: 'Heavy',
    occasion: ['Formal', 'Collectible', 'Special Occasion'],
    season: ['Winter', 'Autumn'],
    gender: 'Unisex', volume: '30ml / 1.0 fl oz',
    rating: 5.0, reviewCount: 14, stock: 5, badge: 'Numbered',
  },
];

export type Collection = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
};

export const COLLECTIONS: Collection[] = [
  {
    id: 'c1', slug: 'signature-oud', name: 'Signature Oud', tagline: 'Our defining oud compositions',
    description: 'The heart of Oud Arábia — original oud fragrances that define our house.',
    image: img('https://images.pexels.com/photos/7850600/pexels-photo-7850600.jpeg?auto=compress&cs=tinysrgb&w=1400'),
    productCount: 4,
  },
  {
    id: 'c2', slug: 'arabic-heritage', name: 'Arabic Heritage', tagline: 'Traditional attars & mokhallats',
    description: 'Time-honoured Arabian formulas, blended exactly as they have been for generations.',
    image: img('https://images.pexels.com/photos/38721545/pexels-photo-38721545.jpeg?auto=compress&cs=tinysrgb&w=1400'),
    productCount: 2,
  },
  {
    id: 'c3', slug: 'gold-reserve', name: 'Gold Reserve', tagline: 'Our most precious reserves',
    description: 'Limited, numbered and aged reserves for the serious collector.',
    image: img('https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&w=1400'),
    productCount: 4,
  },
  {
    id: 'c4', slug: 'floral-reserve', name: 'Floral Reserve', tagline: 'Rare floral absolutes',
    description: 'The world\u2019s most prized florals — Taif rose, night jasmine — presented pure.',
    image: img('https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&w=1400'),
    productCount: 2,
  },
];

export const CATEGORIES = [
  'Oud Perfumes', 'Eau de Parfum', 'Attars', 'Gift Sets',
];

export type Testimonial = {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  product: string;
};

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Aarav Mehta', location: 'Mumbai, India', rating: 5, product: 'Royal Oud Noir',
    text: 'I have worn oud for twenty years and Royal Oud Noir is the finest I have owned. The projection is extraordinary and it lasts on my skin well into the next day.' },
  { id: 't2', name: 'Fatima Al Suwaidi', location: 'Dubai, UAE', rating: 5, product: 'Rose of Taif',
    text: 'As someone from the Gulf, I am particular about rose. This Taif rose is pure, true and beautifully presented. The packaging felt like a gift.' },
  { id: 't3', name: 'Abdullah Al Thani', location: 'Doha, Qatar', rating: 5, product: 'Oud Imperial',
    text: 'Oud Imperial is in a class of its own. The gold flacon, the quality of the oud — this is a fragrance for special occasions and it never fails to draw compliments.' },
  { id: 't4', name: 'Layla Rahman', location: 'Manama, Bahrain', rating: 5, product: 'Midnight Attar',
    text: 'The attar is so concentrated a tiny drop lasts all evening. Intimate, warm and deeply luxurious. I have already ordered three more as gifts.' },
  { id: 't5', name: 'Rohan Kapoor', location: 'Delhi, India', rating: 4, product: 'Leather Oud',
    text: 'Smoky, masculine and refined. The leather note is real birch tar, not the synthetic stuff. Took me back to old libraries and good whisky.' },
  { id: 't6', name: 'Sara Al Otaibi', location: 'Riyadh, Saudi Arabia', rating: 5, product: 'Golden Amber',
    text: 'Golden Amber has become my everyday signature. Warm, soft and never overpowering. Delivery to Riyadh was faster than I expected.' },
];

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
};

export const JOURNAL: JournalPost[] = [
  { id: 'j1', slug: 'what-is-oud', title: 'What Is Oud? A Beginner\u2019s Guide to the Wood of the Gods',
    excerpt: 'Oud is one of the most precious raw materials in perfumery. Here is everything you need to know about how it is harvested, aged and blended.',
    category: 'Education', date: 'Aug 2026', readTime: '6 min read',
    image: img('https://images.pexels.com/photos/28343754/pexels-photo-28343754.jpeg?auto=compress&cs=tinysrgb&w=1200') },
  { id: 'j2', slug: 'how-to-apply-attar', title: 'How to Apply Attar the Traditional Way',
    excerpt: 'Attar is worn differently from spray perfume. Learn the traditional Arabian method using a glass wand and pulse points.',
    category: 'Guide', date: 'Jul 2026', readTime: '4 min read',
    image: img('https://images.pexels.com/photos/38721543/pexels-photo-38721543.jpeg?auto=compress&cs=tinysrgb&w=1200') },
  { id: 'j3', slug: 'taif-rose-story', title: 'The Story of Taif Rose, Harvested at Dawn',
    excerpt: 'Every spring in the mountains above Mecca, the Taif rose blooms for a few short weeks. We trace its journey from petal to bottle.',
    category: 'Ingredients', date: 'Jun 2026', readTime: '7 min read',
    image: img('https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&w=1200') },
];

export const FAQS = [
  { q: 'Are your fragrances authentic oud?', a: 'Yes. We source our oud from sustainable plantations in Assam and Cambodia, and every batch is aged and blended in our Indian atelier. Each bottle comes with a certificate of authenticity.' },
  { q: 'Which countries do you ship to?', a: 'We ship across India, the UAE, Qatar, Saudi Arabia, Kuwait, Bahrain, Oman and worldwide. Free shipping is included on orders above the threshold for your region.' },
  { q: 'How long does delivery take?', a: 'India: 3–5 business days. Gulf: 5–8 business days. Rest of world: 8–14 business days. Every order is fully tracked and insured.' },
  { q: 'What is your return policy?', a: 'Unopened bottles can be returned within 14 days for a full refund. Due to the nature of fragrance, opened bottles cannot be returned, but if a fragrance arrives damaged we will replace it immediately.' },
  { q: 'Are your products cruelty-free?', a: 'All of our perfumes are cruelty-free and never tested on animals. Our musks are plant-derived or safe synthetics, never animal-derived.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes. Every order arrives in our signature black and gold gift box. A handwritten note can be added at checkout at no extra cost.' },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
export function getRelated(product: Product, n = 4) {
  return PRODUCTS.filter((p) => p.id !== product.id && (p.collection === product.collection || p.category === product.category)).slice(0, n);
}
