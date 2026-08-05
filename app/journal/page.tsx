'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { JOURNAL } from '@/lib/data';

export default function JournalPage() {
  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
            ✦ The Journal ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light text-balance">
            Stories from the <em className="gold-text font-medium not-italic">Maison</em>
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            Guides, ingredients and the craft behind our fragrances.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {JOURNAL.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link href={`/journal/${post.slug}`} className="group block">
                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-5 bg-muted">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="text-[10px] tracking-luxury uppercase text-gold mb-2">
                  {post.category} · {post.readTime}
                </div>
                <h2 className="font-serif text-2xl font-light mb-2 group-hover:text-gold transition-colors text-balance">{post.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3 text-pretty">{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 text-xs tracking-luxury uppercase font-medium group-hover:text-gold group-hover:gap-2.5 transition-all">
                  Read <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
