import { createAdminClient } from '@/lib/supabase/admin';

export type CreateOrderInput = {
  userId?: string;
  guestEmail?: string;
  items: Array<{ id: string; quantity: number; price: number; name: string }>;
  shippingAddress: Record<string, any>;
  currency: string;
  paymentGateway: 'razorpay' | 'paypal' | 'cod';
  couponCode?: string;
};

export async function createOrderService(input: CreateOrderInput) {
  const supabase = createAdminClient();

  const subtotal = input.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  let discountAmount = 0;

  // Validate coupon if provided
  if (input.couponCode) {
    const { data: coupon } = await supabase.from('coupons').select('*').eq('code', input.couponCode.toUpperCase()).eq('is_active', true).single();
    if (coupon) {
      if (coupon.type === 'percentage') {
        discountAmount = (subtotal * Number(coupon.value)) / 100;
      } else {
        discountAmount = Number(coupon.value);
      }
    }
  }

  const shippingCost = subtotal > 300 ? 0 : 25;
  const taxAmount = (subtotal - discountAmount) * 0.05; // 5% VAT
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingCost + taxAmount);

  const orderNumber = `OUD-${Date.now().toString().slice(-6)}-${Math.floor(1000 + Math.random() * 9000)}`;

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: input.userId || null,
      guest_email: input.guestEmail || null,
      status: input.paymentGateway === 'cod' ? 'processing' : 'pending',
      shipping_address: input.shippingAddress,
      subtotal,
      discount_amount: discountAmount,
      shipping_cost: shippingCost,
      tax_amount: taxAmount,
      total_amount: totalAmount,
      currency: input.currency || 'AED',
    })
    .select('*')
    .single();

  if (orderError || !order) {
    throw new Error(orderError?.message || 'Failed to create order in database');
  }

  // Insert order items
  const orderItemsData = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.id.length === 36 ? item.id : null,
    product_name: item.name,
    quantity: item.quantity,
    unit_price: item.price,
    total_price: item.price * item.quantity,
  }));

  await supabase.from('order_items').insert(orderItemsData);

  return order;
}
