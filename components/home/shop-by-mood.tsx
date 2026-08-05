'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const MOODS = [
  { label: 'Oud', desc: 'Deep, smoky, resinous', href: '/shop?category=Oud+Perfumes', image: 'https://images.pexels.com/photos/11122042/pexels-photo-11122042.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Floral', desc: 'Rose, jasmine, ylang', href: '/shop?category=Eau+de+Parfum', image: 'https://images.pexels.com/photos/4110341/pexels-photo-4110341.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Amber', desc: 'Warm, sweet, golden', href: '/shop?category=Eau+de+Parfum', image: 'https://images.pexels.com/photos/7702669/pexels-photo-7702669.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Attars', desc: 'Concentrated oils', href: '/shop?category=Attars', image: 'https://images.pexels.com/photos/38721545/pexels-photo-38721545.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export function ShopByMood() {
  return (
    <section className="py-24 md:py-32 bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] tracking-ultra uppercase text-gold mb-4"
          >
            ✦ Find Your Signature ✦
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-light text-balance"
          >
            Shop by <em className="gold-text font-medium not-italic">Mood</em>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {MOODS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={m.href} className="group block relative aspect-[3/4] overflow-hidden rounded-sm">
                <Image
                  src={m.image}
                  alt={m.label}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-serif text-2xl md:text-3xl font-light mb-1">{m.label}</h3>
                  <p className="text-xs text-white/60 mb-3">{m.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] tracking-luxury uppercase text-gold group-hover:gap-2.5 transition-all">
                    Discover <ArrowRight className="w-3.5 h-3.5" />
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
