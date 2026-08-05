'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CURRENCIES, DEFAULT_CURRENCY, detectCurrencyFromCountry, type Currency } from '@/lib/currency';
import type { Product } from '@/lib/data';

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  volume: string;
  quantity: number;
  stock: number;
};

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  recentlyViewed: string[];
  currency: Currency;
  cartOpen: boolean;
  searchOpen: boolean;
  hydrated: boolean;
  setCurrency: (c: Currency) => void;
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  addRecentlyViewed: (id: string) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setHydrated: (v: boolean) => void;
  detectCurrency: (countryCode: string) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      recentlyViewed: [],
      currency: DEFAULT_CURRENCY,
      cartOpen: false,
      searchOpen: false,
      hydrated: false,
      setCurrency: (c) => set({ currency: c }),
      detectCurrency: (countryCode) => {
        const detected = detectCurrencyFromCountry(countryCode);
        const stored = get().currency;
        // Only override if user hasn't manually chosen a currency yet
        if (stored.code === DEFAULT_CURRENCY.code) {
          set({ currency: detected });
        }
      },
      addToCart: (p, qty = 1) =>
        set((s) => {
          const existing = s.cart.find((i) => i.id === p.id);
          if (existing) {
            const newQty = Math.min(existing.quantity + qty, p.stock);
            return {
              cart: s.cart.map((i) =>
                i.id === p.id ? { ...i, quantity: newQty } : i
              ),
            };
          }
          return {
            cart: [
              ...s.cart,
              {
                id: p.id,
                slug: p.slug,
                name: p.name,
                price: p.price,
                image: p.image,
                volume: p.volume,
                quantity: Math.min(qty, p.stock),
                stock: p.stock,
              },
            ],
          };
        }),
      removeFromCart: (id) => set((s) => ({ cart: s.cart.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          cart: s.cart.map((i) =>
            i.id === id ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock)) } : i
          ),
        })),
      clearCart: () => set({ cart: [] }),
      toggleWishlist: (id) =>
        set((s) => ({
          wishlist: s.wishlist.includes(id)
            ? s.wishlist.filter((w) => w !== id)
            : [...s.wishlist, id],
        })),
      addRecentlyViewed: (id) =>
        set((s) => ({
          recentlyViewed: [
            id,
            ...s.recentlyViewed.filter((r) => r !== id),
          ].slice(0, 8),
        })),
      setCartOpen: (open) => set({ cartOpen: open }),
      setSearchOpen: (open) => set({ searchOpen: open }),
      setHydrated: (v) => set({ hydrated: v }),
    }),
    {
      name: 'oud-arabia-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        cart: s.cart,
        wishlist: s.wishlist,
        recentlyViewed: s.recentlyViewed,
        currency: s.currency,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated(true);
      },
    }
  )
);

export function useCartCount() {
  return useStore((s) => s.cart.reduce((n, i) => n + i.quantity, 0));
}

export function useCartTotal() {
  return useStore((s) => s.cart.reduce((n, i) => n + i.price * i.quantity, 0));
}

export const useCurrency = () => useStore((s) => s.currency);
export const useCart = () => useStore((s) => s.cart);
export const useCartOpen = () => useStore((s) => s.cartOpen);
export const useSearchOpen = () => useStore((s) => s.searchOpen);
export const useWishlist = () => useStore((s) => s.wishlist);
export const useRecentlyViewed = () => useStore((s) => s.recentlyViewed);
export const useIsWished = (id: string) => useStore((s) => s.wishlist.includes(id));

export const useAddToCart = () => useStore((s) => s.addToCart);
export const useRemoveFromCart = () => useStore((s) => s.removeFromCart);
export const useUpdateQty = () => useStore((s) => s.updateQty);
export const useToggleWishlist = () => useStore((s) => s.toggleWishlist);
export const useAddRecentlyViewed = () => useStore((s) => s.addRecentlyViewed);
export const useSetCartOpen = () => useStore((s) => s.setCartOpen);
export const useSetSearchOpen = () => useStore((s) => s.setSearchOpen);
export const useSetCurrency = () => useStore((s) => s.setCurrency);
export const useClearCart = () => useStore((s) => s.clearCart);

export { CURRENCIES };
