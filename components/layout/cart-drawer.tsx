'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  useCart,
  useCartOpen,
  useSetCartOpen,
  useUpdateQty,
  useRemoveFromCart,
  useCartTotal,
  useCurrency,
} from '@/lib/store/store';
import { formatPrice } from '@/lib/currency';

export function CartDrawer() {
  const cart = useCart();
  const cartOpen = useCartOpen();
  const setCartOpen = useSetCartOpen();
  const updateQty = useUpdateQty();
  const removeFromCart = useRemoveFromCart();
  const total = useCartTotal();
  const currency = useCurrency();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[80] backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-[90] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                <span className="font-serif text-xl">Your Bag</span>
                <span className="text-sm text-muted-foreground">({cart.length})</span>
              </div>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:text-gold transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <ShoppingBag className="w-8 h-8 text-muted-foreground" strokeWidth={1} />
                </div>
                <h3 className="font-serif text-2xl mb-2">Your bag is empty</h3>
                <p className="text-sm text-muted-foreground mb-8">
                  Discover our rare oud compositions and signature attars.
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="btn-gold bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 py-5 border-b border-border/50">
                      <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="w-20 h-24 rounded-sm overflow-hidden flex-shrink-0 bg-muted relative">
                        <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="font-serif text-base hover:text-gold transition-colors block">
                          {item.name}
                        </Link>
                        <div className="text-xs text-muted-foreground mt-0.5">{item.volume}</div>
                        <div className="text-sm font-medium mt-1">{formatPrice(item.price * item.quantity, currency)}</div>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-border rounded-sm">
                            <button onClick={() => updateQty(item.id, item.quantity - 1)} className="p-1.5 hover:text-gold transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-sm font-medium">{item.quantity}</span>
                            <button onClick={() => updateQty(item.id, item.quantity + 1)} className="p-1.5 hover:text-gold transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 border-t border-border bg-muted/30">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-serif text-2xl font-medium">{formatPrice(total, currency)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-4">Shipping & taxes calculated at checkout</p>
                  <Link
                    href="/checkout"
                    onClick={() => setCartOpen(false)}
                    className="btn-gold w-full bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="w-full mt-2 py-3 text-xs tracking-luxury uppercase text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
