'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS, PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';

export function CollectionDetailClient({ slug }: { slug: string }) {
  const collection = COLLECTIONS.find((c) => c.slug === slug);
  if (!collection) notFound();
  const products = PRODUCTS.filter((p) => p.collection === collection.name);

  return (
    <div className="pt-10 md:pt-16 pb-20">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] overflow-hidden mb-16">
        <Image src={collection.image} alt={collection.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-12 text-white">
            <Link href="/collections" className="text-xs text-white/60 hover:text-gold transition-colors mb-4 inline-block">
              ← All Collections
            </Link>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-3">
              ✦ {collection.productCount} Fragrances ✦
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light mb-3">
              {collection.name}
            </motion.h1>
            <p className="text-white/70 max-w-lg">{collection.description}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/shop" className="group inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium hover:text-gold transition-colors">
            View All Fragrances <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
