'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';

const products = PRODUCTS.filter((p) => p.bestseller).slice(0, 4);

export function BestSellers() {
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-ultra uppercase text-gold mb-4"
            >
              ✦ Most Coveted ✦
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-6xl font-light text-balance"
            >
              Best <em className="gold-text font-medium not-italic">Sellers</em>
            </motion.h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium hover:text-gold transition-colors"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
