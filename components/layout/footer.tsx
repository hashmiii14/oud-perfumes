'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Instagram, Facebook, Twitter, Youtube, Mail, MapPin, Phone, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

export function Footer() {
  const [email, setEmail] = useState('');

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Welcome to the Maison. Check your inbox for a private invitation.');
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground mt-32">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-20 md:py-28 text-center">
          <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">The Inner Circle</div>
          <h2 className="font-serif text-3xl md:text-5xl font-light mb-4 text-balance">
            Join the Maison
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8 text-sm md:text-base text-pretty">
            Receive private invitations to numbered reserves, early access to new compositions,
            and a complimentary sample with your first order.
          </p>
          <form onSubmit={subscribe} className="flex max-w-md mx-auto gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-white/20 px-5 py-3.5 text-sm placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors rounded-sm"
            />
            <button
              type="submit"
              className="btn-gold bg-gold text-gold-foreground px-6 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold-400 transition-colors rounded-sm flex items-center gap-2"
            >
              Subscribe <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
          <div className="col-span-2">
            <div className="font-serif text-2xl tracking-[0.15em] mb-2">
              OUD <span className="gold-text">ARÁBIA</span>
            </div>
            <div className="text-[9px] tracking-ultra uppercase text-white/40 mb-6">
              Maison de Parfum · Est. 1996
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Rare oud, attars and luxury Arabian perfumes. Handcrafted in India,
              cherished across the Gulf and beyond.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/20 rounded-full flex items-center justify-center hover:border-gold hover:text-gold transition-colors">
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {[
            { title: 'Shop', links: [['All Fragrances', '/shop'], ['Oud Perfumes', '/shop?category=Oud+Perfumes'], ['Attars', '/shop?category=Attars'], ['Collections', '/collections'], ['Gift Sets', '/shop?category=Gift+Sets']] },
            { title: 'Maison', links: [['Our Story', '/about'], ['The Art of Oud', '/journal'], ['Sustainability', '/about'], ['Journal', '/journal'], ['Contact', '/contact']] },
            { title: 'Client Care', links: [['FAQ', '/faq'], ['Contact Us', '/contact'], ['Our Story', '/about'], ['Journal', '/journal']] },
          ].map((col) => (
            <div key={col.title}>
              <div className="text-[10px] tracking-luxury uppercase text-gold mb-5">{col.title}</div>
              <ul className="space-y-3">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <div className="text-[10px] tracking-luxury uppercase text-gold mb-5">Contact</div>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5} /> Atelier, Mumbai, India</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} /> care@oudarabia.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} /> +91 22 0000 0000</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <div>© 2026 Oud Arábia Maison de Parfum. All rights reserved.</div>
          <div className="flex gap-6">
            <Link href="/faq" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/faq" className="hover:text-white transition-colors">Returns</Link>
            <a href="https://kodeveil.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">KodeVeil</a>
          </div>
          <div className="flex gap-2 items-center text-[10px] tracking-luxury uppercase">
            <span>Visa</span><span>·</span><span>Mastercard</span><span>·</span><span>UPI</span><span>·</span><span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
