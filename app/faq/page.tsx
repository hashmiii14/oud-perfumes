'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { FAQS } from '@/lib/data';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-3xl px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
            ✦ Client Care ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light text-balance">
            Frequently <em className="gold-text font-medium not-italic">Asked</em>
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-4">
            Can't find what you're looking for? <Link href="/contact" className="text-gold hover:underline">Contact us</Link>
          </p>
        </div>

        <div className="divide-y divide-border">
          {FAQS.map((faq, i) => (
            <div key={i} className="py-2">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group">
                <span className="font-serif text-lg md:text-xl group-hover:text-gold transition-colors">{faq.q}</span>
                <ChevronDown className={cn('w-5 h-5 flex-shrink-0 ml-4 transition-transform duration-300', open === i && 'rotate-180 text-gold')} />
              </button>
              <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="pb-5 text-sm md:text-base text-muted-foreground leading-relaxed text-pretty">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
