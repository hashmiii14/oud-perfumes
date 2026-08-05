import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { paypalOrderId, orderId } = await req.json();

    const supabase = createAdminClient();

    await supabase.from('payments').update({
      status: 'completed',
      signature_or_token: paypalOrderId,
      updated_at: new Date().toISOString(),
    }).eq('order_id', orderId);

    await supabase.from('orders').update({
      status: 'processing',
      updated_at: new Date().toISOString(),
    }).eq('id', orderId);

    return NextResponse.json({ success: true, message: 'PayPal payment captured successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
