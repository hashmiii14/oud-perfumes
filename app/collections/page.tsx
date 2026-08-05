'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { COLLECTIONS } from '@/lib/data';

export default function CollectionsPage() {
  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
            ✦ The Houses of Oud Arábia ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light text-balance">
            Our <em className="gold-text font-medium not-italic">Collections</em>
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            Four distinct houses, each with its own character — from defining oud compositions to numbered reserves.
          </p>
        </div>

        <div className="space-y-6">
          {COLLECTIONS.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <Link href={`/collections/${c.slug}`} className="group grid md:grid-cols-2 gap-0 overflow-hidden rounded-sm bg-muted">
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[420px] overflow-hidden">
                  <Image src={c.image} alt={c.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center">
                  <div className="text-[10px] tracking-ultra uppercase text-gold mb-3">{c.productCount} Fragrances</div>
                  <h2 className="font-serif text-3xl md:text-5xl font-light mb-3">{c.name}</h2>
                  <p className="text-base text-muted-foreground mb-3">{c.tagline}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-md">{c.description}</p>
                  <span className="inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium group-hover:text-gold group-hover:gap-3 transition-all">
                    Explore Collection <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
