'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function BrandStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} className="relative py-24 md:py-40 bg-primary text-primary-foreground overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
            <motion.div style={{ y }} className="absolute inset-[-10%]">
              <Image
                src="https://images.pexels.com/photos/6201645/pexels-photo-6201645.jpeg?auto=compress&cs=tinysrgb&w=1400"
                alt="Arabian incense and oud"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] tracking-ultra uppercase text-gold mb-4"
            >
              ✦ Our Story ✦
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8 text-balance"
            >
              Three generations of <em className="gold-text font-medium not-italic">oud mastery</em>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-6 font-light"
            >
              Founded in Mumbai in 1996, Oud Arábia began as a small atelier sourcing
              aged oud from the forests of Assam and Cambodia. Three generations on,
              we remain a family house — blending traditional Arabian formulas with
              a modern, international sensibility.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-white/60 text-base md:text-lg leading-relaxed mb-10 font-light"
            >
              Every fragrance is hand-blended in small batches, aged in glass, and
              presented in our signature black and gold flacons — a quiet luxury
              recognised from Mumbai to Riyadh.
            </motion.p>

            <div className="grid grid-cols-3 gap-6 mb-10">
              {[
                { n: '30+', l: 'Years of craft' },
                { n: '7', l: 'Countries served' },
                { n: '100%', l: 'Authentic oud' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="font-serif text-3xl md:text-4xl gold-text font-medium">{s.n}</div>
                  <div className="text-xs text-white/50 tracking-wide mt-1">{s.l}</div>
                </motion.div>
              ))}
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs tracking-luxury uppercase font-medium text-gold hover:gap-3 transition-all"
            >
              Read Our Full Story <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
