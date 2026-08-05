'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { JOURNAL } from '@/lib/data';

export function JournalDetailClient({ slug }: { slug: string }) {
  const post = JOURNAL.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/journal" className="hover:text-gold transition-colors">Journal</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{post.title}</span>
        </nav>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">
            {post.category} · {post.readTime} · {post.date}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-light mb-6 text-balance">{post.title}</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="aspect-[16/9] overflow-hidden rounded-sm mb-10 bg-muted">
          <Image src={post.image} alt={post.title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
        </motion.div>

        <article className="prose max-w-none">
          <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-light text-pretty">{post.excerpt}</p>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            In the world of fine perfumery, few materials carry the weight and mystique of oud.
            For centuries it has been prized across the Arabian peninsula, the Gulf and South Asia —
            a fragrant wood, dark and resinous, born from the heart of agarwood trees when they
            become infected with a particular mould. The tree, in response, produces a protective
            resin. That resin, aged over years and sometimes decades, is oud.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            At Oud Arábia, we source our oud from sustainable plantations in Assam and Cambodia,
            where trees are cultivated and harvested without depleting wild forests. Each batch is
            aged in glass, allowing the raw, animalic edge of fresh oud to soften into something
            deeper, rounder and more complex — honeyed, smoky, almost spiritual.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            The result is a family of fragrances that wear close to the skin yet command a room.
            Whether you are new to oud or a long-time collector, we invite you to explore the
            collection and discover a signature of your own.
          </p>
        </article>

        <div className="mt-16 pt-8 border-t border-border text-center">
          <Link href="/shop" className="btn-gold group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
            Explore the Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
