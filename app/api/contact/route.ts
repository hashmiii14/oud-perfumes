import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.parse(body);

    const supabase = createAdminClient();
    await supabase.from('activity_logs').insert({
      action: 'CONTACT_INQUIRY',
      resource_type: 'SUPPORT',
      metadata: parsed,
    });

    return NextResponse.json({ success: true, message: 'Your inquiry has been received. Our perfumer concierge will contact you shortly.' });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message || 'Validation error' }, { status: 400 });
  }
}
