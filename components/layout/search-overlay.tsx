'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchOpen, useSetSearchOpen, useCurrency } from '@/lib/store/store';
import { PRODUCTS } from '@/lib/data';
import { formatPrice } from '@/lib/currency';

export function SearchOverlay() {
  const searchOpen = useSearchOpen();
  const setSearchOpen = useSetSearchOpen();
  const currency = useCurrency();
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 180);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      setQuery('');
      setDebounced('');
    }
  }, [searchOpen]);

  const results = useMemo(() => {
    if (!debounced) return PRODUCTS.slice(0, 4);
    const q = debounced.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.collection.toLowerCase().includes(q),
    ).slice(0, 6);
  }, [debounced]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-background/95 backdrop-blur-xl flex flex-col"
        >
          <div className="border-b border-border">
            <div className="mx-auto max-w-3xl px-5 py-8">
              <div className="flex items-center gap-4 border-b-2 border-gold pb-4">
                <Search className="w-6 h-6 text-gold" strokeWidth={1.5} />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for oud, attar, rose, amber…"
                  className="flex-1 bg-transparent font-serif text-2xl md:text-3xl font-light placeholder:text-muted-foreground focus:outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="p-2 hover:text-gold transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mt-3">
                {query ? `${results.length} results` : 'Popular right now'}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-3xl px-5 py-8">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((p) => (
                  <Link
                    key={p.id}
                    href={`/product/${p.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className="group flex flex-col"
                  >
                    <div className="aspect-[3/4] rounded-sm overflow-hidden bg-muted mb-3 relative">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="font-serif text-base group-hover:text-gold transition-colors">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{formatPrice(p.price, currency)}</div>
                  </Link>
                ))}
              </div>
              {results.length === 0 && (
                <div className="text-center py-20">
                  <p className="font-serif text-2xl text-muted-foreground mb-2">No fragrances found</p>
                  <p className="text-sm text-muted-foreground">Try searching for "oud", "rose" or "amber".</p>
                </div>
              )}
              <Link
                href="/shop"
                onClick={() => setSearchOpen(false)}
                className="mt-8 inline-flex items-center gap-2 text-xs tracking-luxury uppercase text-gold hover:gap-3 transition-all"
              >
                View All Fragrances <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
