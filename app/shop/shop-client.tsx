'use client';

import { useMemo, useState, Suspense, memo } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES, COLLECTIONS } from '@/lib/data';
import { ProductCard } from '@/components/product/product-card';
import { useCurrency } from '@/lib/store/store';
import { formatPrice } from '@/lib/currency';
import { cn } from '@/lib/utils';

const SORTS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'Newest', value: 'new' },
];

type FilterContentProps = {
  category: string;
  collection: string;
  gender: string;
  maxPrice: number;
  setCategory: (v: string) => void;
  setCollection: (v: string) => void;
  setGender: (v: string) => void;
  setMaxPrice: (v: number) => void;
  resetFilters: () => void;
  activeFilters: number;
  currency: ReturnType<typeof useCurrency>;
};

const FilterContent = memo(function FilterContent({
  category, collection, gender, maxPrice,
  setCategory, setCollection, setGender, setMaxPrice,
  resetFilters, activeFilters, currency,
}: FilterContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">Category</div>
        <div className="space-y-2.5">
          <button onClick={() => setCategory('')} className={cn('block text-sm hover:text-gold transition-colors', !category && 'text-gold font-medium')}>All Categories</button>
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={cn('block text-sm hover:text-gold transition-colors text-left', category === c ? 'text-gold font-medium' : 'text-foreground/70')}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">Collection</div>
        <div className="space-y-2.5">
          <button onClick={() => setCollection('')} className={cn('block text-sm hover:text-gold transition-colors', !collection && 'text-gold font-medium')}>All Collections</button>
          {COLLECTIONS.map((c) => (
            <button key={c.slug} onClick={() => setCollection(c.name)} className={cn('block text-sm hover:text-gold transition-colors text-left', collection === c.name ? 'text-gold font-medium' : 'text-foreground/70')}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">Gender</div>
        <div className="space-y-2.5">
          {['', 'Unisex', 'Men', 'Women'].map((g) => (
            <button key={g || 'all'} onClick={() => setGender(g)} className={cn('block text-sm hover:text-gold transition-colors text-left', gender === g ? 'text-gold font-medium' : 'text-foreground/70')}>
              {g || 'All'}
            </button>
          ))}
        </div>
      </div>

      <div>
        <div className="text-[10px] tracking-luxury uppercase text-gold mb-4">Max Price</div>
        <input
          type="range"
          min={100}
          max={600}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-gold"
          aria-label="Maximum price"
        />
        <div className="text-sm mt-2">{formatPrice(maxPrice, currency)}</div>
      </div>

      {activeFilters > 0 && (
        <button onClick={resetFilters} className="text-xs tracking-luxury uppercase text-muted-foreground hover:text-gold transition-colors flex items-center gap-1.5">
          <X className="w-3.5 h-3.5" /> Clear All Filters
        </button>
      )}
    </div>
  );
});

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialCollection = searchParams.get('collection') || '';

  const [category, setCategory] = useState(initialCategory);
  const [collection, setCollection] = useState(initialCollection);
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(600);
  const [filterOpen, setFilterOpen] = useState(false);
  const currency = useCurrency();

  const filtered = useMemo(() => {
    let result = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (category) result = result.filter((p) => p.category === category);
    if (collection) result = result.filter((p) => p.collection === collection);
    if (gender) result = result.filter((p) => p.gender === gender);
    switch (sort) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'rating': result = [...result].sort((a, b) => b.rating - a.rating); break;
      case 'new': result = [...result].sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival)); break;
    }
    return result;
  }, [category, collection, gender, sort, maxPrice]);

  const resetFilters = () => {
    setCategory(''); setCollection(''); setGender(''); setMaxPrice(600); setSort('featured');
  };

  const activeFilters = [category, collection, gender].filter(Boolean).length;

  const filterProps = {
    category, collection, gender, maxPrice,
    setCategory, setCollection, setGender, setMaxPrice,
    resetFilters, activeFilters, currency,
  };

  return (
    <div className="pt-10 md:pt-16">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 mb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ The Collection ✦</div>
          <h1 className="font-serif text-4xl md:text-6xl font-light text-balance">
            All <em className="gold-text font-medium not-italic">Fragrances</em>
          </h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            {filtered.length} rare compositions — from traditional attars to our numbered Gold Reserve.
          </p>
        </motion.div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10 pb-20">
        <div className="flex gap-10">
          <aside className="hidden lg:block w-60 flex-shrink-0">
            <FilterContent {...filterProps} />
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <button
                onClick={() => setFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 text-sm"
              >
                <SlidersHorizontal className="w-4 h-4" /> Filters
                {activeFilters > 0 && <span className="text-gold">({activeFilters})</span>}
              </button>
              <div className="hidden lg:block text-sm text-muted-foreground">
                Showing {filtered.length} fragrances
              </div>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort products"
                  className="appearance-none bg-transparent border border-border rounded-sm pl-4 pr-10 py-2.5 text-sm focus:border-gold focus:outline-none cursor-pointer"
                >
                  {SORTS.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-32">
                <p className="font-serif text-2xl text-muted-foreground mb-2">No fragrances match your filters</p>
                <button onClick={resetFilters} className="text-xs tracking-luxury uppercase text-gold hover:underline">
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {filterOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFilterOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-[85%] max-w-sm bg-background p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-serif text-xl">Filters</h2>
              <button onClick={() => setFilterOpen(false)} aria-label="Close filters"><X className="w-5 h-5" /></button>
            </div>
            <FilterContent {...filterProps} />
            <button
              onClick={() => setFilterOpen(false)}
              className="btn-gold w-full mt-8 bg-primary text-primary-foreground py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm"
            >
              Show {filtered.length} Results
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export function ShopClient() {
  return (
    <Suspense fallback={<div className="pt-32 pb-32 text-center text-muted-foreground">Loading…</div>}>
      <ShopContent />
    </Suspense>
  );
}
