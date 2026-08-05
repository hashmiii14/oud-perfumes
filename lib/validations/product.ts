import { z } from 'zod';

export const productFilterSchema = z.object({
  category: z.string().optional(),
  collection: z.string().optional(),
  brand: z.string().optional(),
  search: z.string().optional(),
  sort: z.enum(['featured', 'price-low', 'price-high', 'rating', 'newest']).optional().default('featured'),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().positive().optional().default(12),
});

export const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be greater than 0'),
  originalPrice: z.number().optional(),
  volume: z.string().default('100ml'),
  stock: z.number().int().nonnegative('Stock cannot be negative'),
  image: z.string().url('Main image URL required'),
  topNotes: z.array(z.string()).optional(),
  heartNotes: z.array(z.string()).optional(),
  baseNotes: z.array(z.string()).optional(),
  intensity: z.string().optional(),
  isBestseller: z.boolean().default(false),
  isNewArrival: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  isActive: z.boolean().default(true),
});
