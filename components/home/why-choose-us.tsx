'use client';

import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Truck, Leaf } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: 'Hand-Blended', text: 'Small-batch perfumery, aged in glass for depth and complexity.' },
  { icon: Leaf, title: 'Sustainable Oud', text: 'Ethically sourced from sustainable plantations, never wild-harvested.' },
  { icon: ShieldCheck, title: 'Certificate of Authenticity', text: 'Every bottle arrives with a signed certificate and batch number.' },
  { icon: Truck, title: 'Insured Worldwide Shipping', text: 'Tracked, insured delivery across India, the Gulf and beyond.' },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full border border-gold/30 flex items-center justify-center text-gold">
                <f.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
