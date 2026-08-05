import type { Metadata } from 'next';
import { ShopClient } from './shop-client';

export const metadata: Metadata = {
  title: 'Shop All Fragrances',
  description: 'Discover rare oud, attars and luxury Arabian perfumes. Browse our full collection of handcrafted fragrances.',
  alternates: { canonical: 'https://oudarabia.com/shop' },
};

export default function ShopPage() {
  return <ShopClient />;
}
