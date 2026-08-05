import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    const supabase = createAdminClient();
    const { error } = await supabase.from('newsletter_subscribers').upsert(
      { email: parsed.email, is_active: true },
      { onConflict: 'email' }
    );

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Thank you for subscribing to Oud Arabia VIP list!' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Validation error' }, { status: 400 });
  }
}
