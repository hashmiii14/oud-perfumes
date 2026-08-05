'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star, Minus, Plus, ChevronRight, Truck, RotateCcw, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getProduct, getRelated, PRODUCTS } from '@/lib/data';
import {
  useCurrency,
  useAddToCart,
  useToggleWishlist,
  useSetCartOpen,
  useAddRecentlyViewed,
  useWishlist,
  useRecentlyViewed,
} from '@/lib/store/store';
import { formatPrice } from '@/lib/currency';
import { ProductCard } from '@/components/product/product-card';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function ProductDetailClient({ slug }: { slug: string }) {
  const product = getProduct(slug);
  if (!product) notFound();

  const currency = useCurrency();
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();
  const setCartOpen = useSetCartOpen();
  const addRecentlyViewed = useAddRecentlyViewed();
  const wishlist = useWishlist();
  const recentlyViewed = useRecentlyViewed();

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<'notes' | 'description' | 'shipping'>('notes');

  useEffect(() => {
    if (product) addRecentlyViewed(product.id);
  }, [product, addRecentlyViewed]);

  const images = useMemo(() => [product.image, product.image2].filter(Boolean) as string[], [product]);
  const related = useMemo(() => getRelated(product, 4), [product]);
  const wished = wishlist.includes(product.id);
  const recentProducts = useMemo(
    () =>
      recentlyViewed
        .filter((id) => id !== product.id)
        .map((id) => PRODUCTS.find((p) => p.id === id))
        .filter(Boolean)
        .slice(0, 4) as typeof PRODUCTS,
    [recentlyViewed, product.id],
  );

  const handleAdd = useCallback(() => {
    addToCart(product, qty);
    toast.success(`${product.name} added to your bag`);
    setCartOpen(true);
  }, [product, qty, addToCart, setCartOpen]);

  const handleWish = useCallback(() => {
    toggleWishlist(product.id);
    toast.success(wished ? 'Removed from wishlist' : 'Saved to wishlist');
  }, [product.id, wished, toggleWishlist]);

  return (
    <div className="pt-8 md:pt-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: product.name,
            description: product.description,
            image: images,
            sku: product.id,
            brand: { '@type': 'Brand', name: 'Oud Arábia' },
            offers: {
              '@type': 'Offer',
              price: product.price,
              priceCurrency: 'USD',
              availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: product.rating,
              reviewCount: product.reviewCount,
            },
          }),
        }}
      />
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <div>
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.3, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted"
            >
              <Image
                src={images[activeImage]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1.5 text-[9px] tracking-luxury uppercase font-medium bg-gold text-gold-foreground rounded-sm">
                    {product.badge}
                  </span>
                </div>
              )}
            </motion.div>
            {images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      'w-20 h-24 rounded-sm overflow-hidden border-2 transition-colors relative',
                      activeImage === i ? 'border-gold' : 'border-transparent'
                    )}
                  >
                    <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:py-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="text-[10px] tracking-luxury uppercase text-gold mb-3">
                {product.collection}
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-light mb-3">{product.name}</h1>
              <p className="text-base text-muted-foreground mb-4">{product.subtitle}</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-0.5" aria-label={`Rated ${product.rating} out of 5`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn('w-4 h-4', i < Math.round(product.rating) ? 'fill-gold text-gold' : 'text-muted-foreground/30')} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">{product.rating} · {product.reviewCount} reviews</span>
              </div>

              <div className="flex items-center gap-3 mb-8">
                <span className="font-serif text-3xl font-medium">{formatPrice(product.price, currency)}</span>
                {product.compareAt && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">{formatPrice(product.compareAt, currency)}</span>
                    <span className="px-2.5 py-1 text-[10px] tracking-luxury uppercase bg-destructive text-destructive-foreground rounded-sm">
                      Save {Math.round((1 - product.price / product.compareAt) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-8 text-pretty">
                {product.description}
              </p>

              {/* Meta */}
              <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                <div><span className="text-muted-foreground">Volume:</span> <span className="font-medium">{product.volume}</span></div>
                <div><span className="text-muted-foreground">Gender:</span> <span className="font-medium">{product.gender}</span></div>
                <div><span className="text-muted-foreground">Longevity:</span> <span className="font-medium">{product.longevity}</span></div>
                <div><span className="text-muted-foreground">Projection:</span> <span className="font-medium">{product.projection}</span></div>
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 mb-6 text-sm">
                {product.stock > 5 ? (
                  <><span className="w-2 h-2 rounded-full bg-green-500" /><span className="text-muted-foreground">In stock — ready to ship</span></>
                ) : product.stock > 0 ? (
                  <><span className="w-2 h-2 rounded-full bg-amber-500" /><span className="text-amber-600">Only {product.stock} left</span></>
                ) : (
                  <><span className="w-2 h-2 rounded-full bg-destructive" /><span className="text-destructive">Out of stock</span></>
                )}
              </div>

              {/* Qty + Add */}
              <div className="flex gap-3 mb-4">
                <div className="flex items-center border border-border rounded-sm">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3.5 hover:text-gold transition-colors" aria-label="Decrease quantity">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium">{qty}</span>
                  <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-3.5 hover:text-gold transition-colors" aria-label="Increase quantity">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className="btn-gold flex-1 bg-primary text-primary-foreground py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Bag
                </button>
                <button
                  onClick={handleWish}
                  aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
                  className={cn('p-3.5 border border-border rounded-sm hover:border-gold transition-colors', wished && 'border-gold text-gold')}
                >
                  <Heart className={cn('w-5 h-5', wished && 'fill-gold')} strokeWidth={1.5} />
                </button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-8 border-t border-border">
                {[
                  { icon: Truck, label: 'Free insured shipping' },
                  { icon: RotateCcw, label: '14-day returns' },
                  { icon: ShieldCheck, label: 'Authenticity certified' },
                ].map((b, i) => (
                  <div key={i} className="text-center">
                    <b.icon className="w-5 h-5 mx-auto mb-2 text-gold" strokeWidth={1.5} />
                    <div className="int-[11px] text-muted-foreground leading-tight">{b.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="flex gap-8 border-b border-border mb-8 justify-center" role="tablist">
            {[
              { id: 'notes', label: 'Fragrance Notes' },
              { id: 'description', label: 'Full Description' },
              { id: 'shipping', label: 'Shipping & Returns' },
            ].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => setActiveTab(t.id as typeof activeTab)}
                className={cn(
                  'pb-4 text-xs tracking-luxury uppercase font-medium transition-colors relative',
                  activeTab === t.id ? 'text-gold' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {t.label}
                {activeTab === t.id && (
                  <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {activeTab === 'notes' && (
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { title: 'Top Notes', notes: product.topNotes },
                  { title: 'Heart Notes', notes: product.middleNotes },
                  { title: 'Base Notes', notes: product.baseNotes },
                ].map((n) => (
                  <div key={n.title}>
                    <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">{n.title}</div>
                    <ul className="space-y-2">
                      {n.notes.map((note) => (
                        <li key={note} className="flex items-center gap-2 justify-center font-serif text-lg">
                          <Check className="w-3.5 h-3.5 text-gold" /> {note}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'description' && (
              <div className="max-w-2xl mx-auto">
                <p className="text-base text-muted-foreground leading-relaxed mb-6 text-pretty">{product.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm max-w-md mx-auto">
                  <div><span className="text-muted-foreground">Occasion:</span> {product.occasion.join(', ')}</div>
                  <div><span className="text-muted-foreground">Season:</span> {product.season.join(', ')}</div>
                </div>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="max-w-2xl mx-auto space-y-4 text-sm text-muted-foreground leading-relaxed text-left">
                <p>Free insured shipping on orders over {formatPrice(150, currency)}. India: 3–5 business days. Gulf: 5–8 business days. Worldwide: 8–14 business days.</p>
                <p>Unopened bottles can be returned within 14 days for a full refund. Damaged items replaced immediately.</p>
                <p>Every order arrives in our signature black and gold gift box with a certificate of authenticity.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Recently Viewed */}
        {recentProducts.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="text-center mb-12">
              <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ Recently Viewed ✦</div>
              <h2 className="font-serif text-3xl md:text-5xl font-light">Your <em className="gold-text font-medium not-italic">Browsing</em></h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {recentProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-24 md:mt-32">
            <div className="text-center mb-12">
              <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ You May Also Love ✦</div>
              <h2 className="font-serif text-3xl md:text-5xl font-light">Related <em className="gold-text font-medium not-italic">Fragrances</em></h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
