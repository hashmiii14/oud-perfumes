'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Heart, Menu, X, Globe } from 'lucide-react';
import {
  useCartCount,
  useCurrency,
  useSetCurrency,
  useSetCartOpen,
  useSetSearchOpen,
  useWishlist,
} from '@/lib/store/store';
import { CURRENCIES } from '@/lib/currency';
import { COLLECTIONS } from '@/lib/data';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/collections' },
  { label: 'Oud', href: '/shop?category=Oud+Perfumes' },
  { label: 'Attars', href: '/shop?category=Attars' },
  { label: 'Journal', href: '/journal' },
  { label: 'About', href: '/about' },
];

export function Header() {
  const pathname = usePathNameSafe();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const setCartOpen = useSetCartOpen();
  const setSearchOpen = useSetSearchOpen();
  const currency = useCurrency();
  const setCurrency = useSetCurrency();
  const wishlist = useWishlist();
  const count = useCartCount();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(null);
  }, [pathname]);

  const handleCurrencyChange = useCallback(
    (code: string) => {
      const c = CURRENCIES.find((c) => c.code === code);
      if (c) setCurrency(c);
      setCurrencyOpen(false);
    },
    [setCurrency],
  );

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-[11px] tracking-luxury uppercase">
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-flex animate-marquee gap-16 py-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="inline-flex items-center gap-16">
                <span>Complimentary shipping over {currency.symbol}150</span>
                <span className="text-gold">✦</span>
                <span>Handcrafted in India · Shipped worldwide</span>
                <span className="text-gold">✦</span>
                <span>Numbered limited reserves</span>
                <span className="text-gold">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <header
        className={cn(
          'sticky top-0 z-50 transition-colors duration-300',
          scrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]'
            : 'bg-background'
        )}
      >
        <div className="mx-auto max-w-[1440px] px-5 md:px-10">
          <div className="flex h-16 md:h-20 items-center justify-between gap-6">
            {/* Left nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              {NAV.slice(0, 3).map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setMegaOpen(item.label)}
                  onMouseLeave={() => setMegaOpen(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      'text-[12px] tracking-luxury uppercase font-medium transition-colors hover:text-gold',
                      pathname === item.href && 'text-gold'
                    )}
                  >
                    {item.label}
                  </Link>
                  <AnimatePresence>
                    {megaOpen === item.label && item.label === 'Collections' && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-[640px]"
                      >
                        <div className="bg-card border border-border rounded-lg shadow-2xl p-8 grid grid-cols-2 gap-6">
                          {COLLECTIONS.map((c) => (
                            <Link key={c.id} href={`/collections/${c.slug}`} className="group flex gap-4 items-center">
                              <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 relative">
                                <Image src={c.image} alt={c.name} fill sizes="64px" className="object-cover group-hover:scale-110 transition-transform duration-700" />
                              </div>
                              <div>
                                <div className="font-serif text-lg group-hover:text-gold transition-colors">{c.name}</div>
                                <div className="text-xs text-muted-foreground">{c.tagline}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center group flex-shrink-0">
              <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] font-light leading-none">
                OUD <span className="gold-text font-medium">ARÁBIA</span>
              </span>
              <span className="text-[8px] md:text-[9px] tracking-ultra uppercase text-muted-foreground mt-1">
                Maison de Parfum
              </span>
            </Link>

            {/* Right nav + actions */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {NAV.slice(3).map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    'text-[12px] tracking-luxury uppercase font-medium transition-colors hover:text-gold',
                    pathname === item.href && 'text-gold'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="p-2.5 hover:text-gold transition-colors"
              >
                <Search className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </button>

              {/* Currency */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setCurrencyOpen((v) => !v)}
                  className="p-2.5 hover:text-gold transition-colors flex items-center gap-1"
                  aria-label="Currency"
                >
                  <Globe className="w-[18px] h-[18px]" strokeWidth={1.5} />
                  <span className="text-[11px] font-medium">{currency.code}</span>
                </button>
                <AnimatePresence>
                  {currencyOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setCurrencyOpen(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-2xl p-2 z-50"
                      >
                        <div className="text-[10px] tracking-luxury uppercase text-muted-foreground px-3 py-2">
                          Select Currency
                        </div>
                        {CURRENCIES.map((c) => (
                          <button
                            key={c.code}
                            onClick={() => handleCurrencyChange(c.code)}
                            className={cn(
                              'w-full flex items-center justify-between px-3 py-2.5 rounded text-sm hover:bg-muted transition-colors',
                              currency.code === c.code && 'text-gold'
                            )}
                          >
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.code}</span>
                            </span>
                            <span className="text-xs text-muted-foreground">{c.symbol}</span>
                          </button>
                        ))}
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/wishlist" aria-label="Wishlist" className="p-2.5 hover:text-gold transition-colors relative hidden sm:block">
                <Heart className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-gold-foreground text-[9px] rounded-full flex items-center justify-center font-medium">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                aria-label="Cart"
                className="p-2.5 hover:text-gold transition-colors relative"
              >
                <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gold text-gold-foreground text-[9px] rounded-full flex items-center justify-center font-medium">
                    {count}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
                className="lg:hidden p-2.5 hover:text-gold transition-colors"
              >
                <Menu className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[60] lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-background z-[70] lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-serif text-xl tracking-[0.15em]">OUD <span className="gold-text">ARÁBIA</span></span>
                <button onClick={() => setMobileOpen(false)} className="p-2"><X className="w-5 h-5" /></button>
              </div>
              <nav className="flex flex-col p-6 gap-1">
                {NAV.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="py-3 text-sm tracking-luxury uppercase font-medium border-b border-border/50 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="p-6 mt-auto">
                <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-3">Currency</div>
                <div className="grid grid-cols-4 gap-2">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => handleCurrencyChange(c.code)}
                      className={cn(
                        'py-2 text-xs rounded border transition-colors',
                        currency.code === c.code ? 'border-gold text-gold' : 'border-border'
                      )}
                    >
                      {c.code}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function usePathNameSafe() {
  try {
    return usePathname();
  } catch {
    return '';
  }
}
