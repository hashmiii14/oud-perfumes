'use server';

import { createOrderService, type CreateOrderInput } from '@/lib/services/orders';
import { createOrderSchema } from '@/lib/validations/checkout';

export async function createOrderAction(input: CreateOrderInput) {
  try {
    const validated = createOrderSchema.parse(input);
    const order = await createOrderService(validated as any);
    return { success: true, order };
  } catch (err: any) {
    return { success: false, error: err.message || 'Failed to place order' };
  }
}
