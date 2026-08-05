import { createServerClient } from '@/lib/supabase/server';
import type { CartItem } from '@/lib/store/store';

export async function syncCartWithDatabaseService(userId: string, items: CartItem[]) {
  const supabase = createServerClient();

  // Find or create cart
  let { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).single();

  if (!cart) {
    const { data: newCart } = await supabase.from('carts').insert({ user_id: userId }).select('id').single();
    cart = newCart;
  }

  if (!cart) return;

  // Insert/upsert cart items
  for (const item of items) {
    await supabase.from('cart_items').upsert({
      cart_id: cart.id,
      product_id: item.id,
      quantity: item.quantity,
    }, { onConflict: 'cart_id,product_id' });
  }
}

export async function getCartFromDatabaseService(userId: string) {
  const supabase = createServerClient();
  const { data: cart } = await supabase.from('carts').select('id').eq('user_id', userId).single();

  if (!cart) return [];

  const { data: items } = await supabase
    .from('cart_items')
    .select('quantity, products(*)')
    .eq('cart_id', cart.id);

  if (!items) return [];

  return items.map((i: any) => ({
    id: i.products.id,
    slug: i.products.slug,
    name: i.products.name,
    price: Number(i.products.price),
    image: i.products.image,
    volume: i.products.volume || '100ml',
    quantity: i.quantity,
    stock: i.products.stock || 10,
  }));
}
