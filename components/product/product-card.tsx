'use client';

import { memo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  useCurrency,
  useIsWished,
  useAddToCart,
  useToggleWishlist,
  useSetCartOpen,
} from '@/lib/store/store';
import { formatPrice } from '@/lib/currency';
import type { Product } from '@/lib/data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function ProductCardBase({ product, index = 0 }: { product: Product; index?: number }) {
  const currency = useCurrency();
  const wished = useIsWished(product.id);
  const addToCart = useAddToCart();
  const toggleWishlist = useToggleWishlist();
  const setCartOpen = useSetCartOpen();

  const handleAdd = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product);
      toast.success(`${product.name} added to your bag`);
      setCartOpen(true);
    },
    [product, addToCart, setCartOpen],
  );

  const handleWish = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(product.id);
      toast.success(wished ? 'Removed from wishlist' : 'Saved to wishlist');
    },
    [product.id, wished, toggleWishlist],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted rounded-sm">
          {product.badge && (
            <div className="absolute top-4 left-4 z-10">
              <span className={cn(
                'px-3 py-1.5 text-[9px] tracking-luxury uppercase font-medium rounded-sm',
                product.badge === 'Bestseller' && 'bg-gold text-gold-foreground',
                product.badge === 'New' && 'bg-primary text-primary-foreground',
                product.badge === 'Limited' && 'bg-background text-foreground border border-gold',
                product.badge === 'Numbered' && 'bg-background text-foreground border border-gold',
              )}>
                {product.badge}
              </span>
            </div>
          )}
          {product.compareAt && (
            <div className="absolute top-4 right-4 z-10">
              <span className="px-3 py-1.5 text-[9px] tracking-luxury uppercase font-medium bg-destructive text-destructive-foreground rounded-sm">
                Save {Math.round((1 - product.price / product.compareAt) * 100)}%
              </span>
            </div>
          )}

          <button
            onClick={handleWish}
            aria-label="Toggle wishlist"
            className="absolute bottom-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
          >
            <Heart className={cn('w-4 h-4 transition-colors', wished ? 'fill-gold text-gold' : 'text-foreground')} strokeWidth={1.5} />
          </button>

          <div className="relative w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-all duration-700 group-hover:scale-105"
            />
            {product.image2 && (
              <Image
                src={product.image2}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={handleAdd}
              className="w-full bg-primary text-primary-foreground py-4 text-[11px] tracking-luxury uppercase font-medium flex items-center justify-center gap-2 hover:bg-gold hover:text-gold-foreground transition-colors"
            >
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} /> Add to Bag
            </button>
          </div>
        </div>

        <div className="pt-4 text-center">
          <div className="text-[10px] tracking-luxury uppercase text-muted-foreground mb-1">
            {product.collection}
          </div>
          <h3 className="font-serif text-lg md:text-xl font-medium group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{product.subtitle}</p>
          <div className="flex items-center justify-center gap-1.5 mt-2">
            <Star className="w-3 h-3 fill-gold text-gold" />
            <span className="text-xs text-muted-foreground">{product.rating} · {product.reviewCount} reviews</span>
          </div>
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="font-serif text-lg font-medium">{formatPrice(product.price, currency)}</span>
            {product.compareAt && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(product.compareAt, currency)}</span>
            )}
          </div>
          <div className="text-[10px] text-muted-foreground mt-1">{product.volume}</div>
        </div>
      </Link>
    </motion.div>
  );
}

export const ProductCard = memo(ProductCardBase);
