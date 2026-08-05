import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency } = await req.json();

    const paypalOrderId = `PAYPAL-SANDBOX-${Date.now()}`;

    const supabase = createAdminClient();
    await supabase.from('payments').insert({
      order_id: orderId,
      gateway: 'paypal',
      transaction_id: paypalOrderId,
      amount,
      currency: currency || 'USD',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      paypalOrderId,
      approvalUrl: `https://www.sandbox.paypal.com/checkoutnow?token=${paypalOrderId}`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
