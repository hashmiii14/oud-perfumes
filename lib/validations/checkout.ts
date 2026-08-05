import { z } from 'zod';

export const addressSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(6, 'Valid phone number is required'),
  streetAddress: z.string().min(5, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().min(2, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  isDefault: z.boolean().optional().default(false),
});

export const couponSchema = z.object({
  code: z.string().min(1, 'Coupon code is required').toUpperCase(),
  subtotal: z.number().positive(),
});

export const createOrderSchema = z.object({
  cartItems: z.array(
    z.object({
      id: z.string(),
      quantity: z.number().int().positive(),
      price: z.number().positive(),
      name: z.string(),
    })
  ).min(1, 'Cart cannot be empty'),
  shippingAddress: addressSchema,
  shippingMethodId: z.string().optional(),
  couponCode: z.string().optional(),
  currency: z.string().default('AED'),
  paymentGateway: z.enum(['razorpay', 'paypal', 'cod']),
  guestEmail: z.string().email().optional(),
});
