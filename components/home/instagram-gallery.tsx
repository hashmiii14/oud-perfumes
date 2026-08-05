'use client';

import { motion } from 'framer-motion';
import { Instagram, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const IMAGES = [
  'https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/21008941/pexels-photo-21008941.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/13875783/pexels-photo-13875783.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/30618765/pexels-photo-30618765.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/29986521/pexels-photo-29986521.jpeg?auto=compress&cs=tinysrgb&w=600',
  'https://images.pexels.com/photos/26859235/pexels-photo-26859235.jpeg?auto=compress&cs=tinysrgb&w=600',
];

export function InstagramGallery() {
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
            ✦ @oudarabia ✦
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif text-4xl md:text-6xl font-light text-balance"
          >
            Follow the <em className="gold-text font-medium not-italic">Maison</em>
          </motion.h2>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
            Tag #OudArabia to be featured. A world of fragrance, craft and quiet luxury.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
          {IMAGES.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-sm bg-muted"
            >
              <Image
                src={src}
                alt="Instagram"
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="https://instagram.com"
            className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium hover:text-gold transition-colors"
          >
            <Heart className="w-4 h-4" /> Follow @oudarabia
          </Link>
        </div>
      </div>
    </section>
  );
}
