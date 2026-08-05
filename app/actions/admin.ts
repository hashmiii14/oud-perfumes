'use server';

import { createAdminClient } from '@/lib/supabase/admin';

export async function updateOrderStatusAction(orderId: string, status: string) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('orders').update({
      status,
      updated_at: new Date().toISOString(),
    }).eq('id', orderId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createProductAction(productData: any) {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from('products').insert(productData).select('*').single();
    if (error) throw error;
    return { success: true, product: data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteProductAction(productId: string) {
  try {
    const supabase = createAdminClient();
    // Soft delete
    const { error } = await supabase.from('products').update({
      deleted_at: new Date().toISOString(),
      is_active: false,
    }).eq('id', productId);

    if (error) throw error;
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
