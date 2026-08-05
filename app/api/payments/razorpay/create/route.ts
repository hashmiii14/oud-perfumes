import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { orderId, amount, currency } = await req.json();

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_mockkey';
    const keySecret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret';

    // Simulated / real Razorpay Order creation ID
    const razorpayOrderId = `order_${crypto.randomBytes(10).toString('hex')}`;

    const supabase = createAdminClient();
    await supabase.from('payments').insert({
      order_id: orderId,
      gateway: 'razorpay',
      transaction_id: razorpayOrderId,
      amount: amount,
      currency: currency || 'INR',
      status: 'pending',
    });

    return NextResponse.json({
      success: true,
      razorpayOrderId,
      keyId,
      amount: Math.round(amount * 100), // convert to smallest currency sub-unit
      currency: currency || 'INR',
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
