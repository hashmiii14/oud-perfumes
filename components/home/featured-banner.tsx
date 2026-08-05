'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function FeaturedBanner() {
  return (
    <section className="relative">
      <Link href="/collections/gold-reserve" className="group block relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src="https://images.pexels.com/photos/11711808/pexels-photo-11711808.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Gold Reserve"
          fill
          priority
          sizes="100vw"
          className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex items-center">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 w-full">
            <div className="max-w-xl text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-[10px] tracking-ultra uppercase text-gold mb-4"
              >
                ✦ Numbered Edition ✦
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 text-balance"
              >
                The <em className="gold-text font-medium not-italic">Gold Reserve</em>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-base md:text-lg mb-8 font-light max-w-md text-pretty"
              >
                Our most precious reserves — aged oud, 24-karat gold leaf, and numbered
                flacons. Limited to 100 pieces worldwide.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="btn-gold inline-flex items-center gap-2 bg-gold text-gold-foreground px-10 py-4 text-xs tracking-luxury uppercase font-medium hover:bg-white transition-colors rounded-sm group-hover:gap-3">
                  Explore the Reserve <ArrowRight className="w-4 h-4" />
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
