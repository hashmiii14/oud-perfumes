'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/lib/data';

export function Collections() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-ultra uppercase text-gold mb-4"
          >
            ✦ Curated Collections ✦
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-light text-balance"
          >
            Four Houses of <em className="gold-text font-medium not-italic">Fragrance</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {COLLECTIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={`/collections/${c.slug}`} className="group relative block aspect-[4/5] md:aspect-[5/4] overflow-hidden rounded-sm bg-primary">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-80 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                  <div className="text-[10px] tracking-ultra uppercase text-gold mb-2">
                    {c.productCount} Fragrances
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl font-light mb-2">{c.name}</h3>
                  <p className="text-sm text-white/70 mb-4 max-w-sm">{c.tagline}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium text-white group-hover:text-gold group-hover:gap-3 transition-all">
                    Explore <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
