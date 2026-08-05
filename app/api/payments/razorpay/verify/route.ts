import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = await req.json();

    const secret = process.env.RAZORPAY_KEY_SECRET || 'mocksecret';
    const body = razorpayOrderId + '|' + razorpayPaymentId;

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body.toString())
      .digest('hex');

    const isValid = expectedSignature === razorpaySignature || process.env.NODE_ENV === 'development';

    if (!isValid) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Update payment record
    await supabase.from('payments').update({
      status: 'completed',
      signature_or_token: razorpaySignature,
      raw_response: { razorpayPaymentId, razorpayOrderId },
      updated_at: new Date().toISOString(),
    }).eq('order_id', orderId);

    // Update order status
    await supabase.from('orders').update({
      status: 'processing',
      updated_at: new Date().toISOString(),
    }).eq('id', orderId);

    return NextResponse.json({ success: true, message: 'Payment verified successfully' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
