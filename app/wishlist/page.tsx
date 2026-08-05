'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/lib/store/store';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';

export default function WishlistPage() {
  const wishlist = useWishlist();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
            ✦ Saved for Later ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light text-balance">
            Your <em className="gold-text font-medium not-italic">Wishlist</em>
          </motion.h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto rounded-full bg-muted flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-muted-foreground" strokeWidth={1} />
            </div>
            <h2 className="font-serif text-2xl font-light mb-2">No saved fragrances yet</h2>
            <p className="text-sm text-muted-foreground mb-8">Tap the heart on any fragrance to save it here.</p>
            <Link href="/shop" className="btn-gold inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
              Explore Fragrances <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {items.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
