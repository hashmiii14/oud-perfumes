'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-10 md:pt-16">
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden mb-20">
        <Image src="https://images.pexels.com/photos/38073227/pexels-photo-38073227.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Atelier" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="relative h-full flex items-end">
          <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-14 text-white">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
              ✦ Our Maison ✦
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-7xl font-light max-w-3xl text-balance">
              The story of <em className="gold-text font-medium not-italic">Oud Arábia</em>
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-5 md:px-10 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ Est. 1996 ✦</div>
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-6 text-balance">
            From a Mumbai atelier to the world
          </h2>
        </motion.div>

        <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed font-light text-pretty">
          <p>
            Oud Arábia was founded in 1996 by a family of perfumers in Mumbai who had spent
            decades sourcing aged oud from the forests of Assam and Cambodia. What began as a
            small atelier serving private clients across India grew, over three generations,
            into a maison recognised from Mumbai to Mecca.
          </p>
          <p>
            We remain a family house. Every fragrance is hand-blended in small batches, aged
            in glass, and presented in our signature black and gold flacons. We do not chase
            trends. We make perfumes that are meant to be worn for years — and kept for
            generations.
          </p>
          <p>
            Our oud is sourced exclusively from sustainable plantations, never wild-harvested.
            Our musks are plant-derived or safe synthetics, never animal-derived. Every bottle
            arrives with a signed certificate of authenticity and a batch number.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-primary text-primary-foreground py-24 md:py-32 mt-16">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="text-center mb-16">
            <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ What We Believe ✦</div>
            <h2 className="font-serif text-3xl md:text-5xl font-light">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { t: 'Craft over scale', d: 'We blend in small batches and age each composition in glass. We would rather make less, beautifully, than more, carelessly.' },
              { t: 'Sustainability', d: 'Our oud comes only from sustainable plantations. Our packaging is recyclable. Our musks are never animal-derived.' },
              { t: 'Honest luxury', d: 'No inflated prices, no synthetic shortcuts. Just real, aged materials and the craft to present them well.' },
            ].map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <h3 className="font-serif text-2xl mb-3 gold-text font-medium">{v.t}</h3>
                <p className="text-white/60 text-sm leading-relaxed text-pretty">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-24 md:py-32">
        <h2 className="font-serif text-3xl md:text-5xl font-light mb-6 text-balance">
          Discover the <em className="gold-text font-medium not-italic">collection</em>
        </h2>
        <Link href="/shop" className="btn-gold group inline-flex items-center gap-2 bg-primary text-primary-foreground px-10 py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
          Shop Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}
