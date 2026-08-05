import { createServerClient } from '@/lib/supabase/server';
import { PRODUCTS as MOCK_PRODUCTS, type Product } from '@/lib/data';

export async function getProductsService(params: {
  category?: string;
  collection?: string;
  search?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}) {
  try {
    const supabase = createServerClient();
    let query = supabase.from('products').select('*', { count: 'exact' }).eq('is_active', true).is('deleted_at', null);

    if (params.category && params.category !== 'all') {
      query = query.ilike('category', `%${params.category}%`);
    }

    if (params.collection) {
      query = query.ilike('collection', `%${params.collection}%`);
    }

    if (params.search) {
      query = query.or(`name.ilike.%${params.search}%,description.ilike.%${params.search}%`);
    }

    if (params.minPrice) {
      query = query.gte('price', params.minPrice);
    }

    if (params.maxPrice) {
      query = query.lte('price', params.maxPrice);
    }

    // Sorting logic
    if (params.sort === 'price-low') {
      query = query.order('price', { ascending: true });
    } else if (params.sort === 'price-high') {
      query = query.order('price', { ascending: false });
    } else if (params.sort === 'rating') {
      query = query.order('rating', { ascending: false });
    } else if (params.sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else {
      query = query.order('is_featured', { ascending: false });
    }

    const { data, count, error } = await query;

    if (error || !data || data.length === 0) {
      // Fallback to local catalog filter if database is not yet populated
      let filtered = [...MOCK_PRODUCTS];
      if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (params.sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
      if (params.sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
      if (params.sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

      return { products: filtered, total: filtered.length };
    }

    return { products: data as Product[], total: count || data.length };
  } catch (err) {
    return { products: MOCK_PRODUCTS, total: MOCK_PRODUCTS.length };
  }
}

export async function getProductBySlugService(slug: string): Promise<Product | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).is('deleted_at', null).single();

    if (error || !data) {
      return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
    }

    return data as Product;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}
