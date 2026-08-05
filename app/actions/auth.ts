'use server';

import { createServerClient } from '@/lib/supabase/server';
import { signUpSchema, loginSchema } from '@/lib/validations/auth';
import { cookies } from 'next/headers';

export async function signUpAction(formData: FormData) {
  const rawData = {
    fullName: formData.get('fullName') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phone: formData.get('phone') as string,
  };

  const validated = signUpSchema.parse(rawData);
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signUp({
    email: validated.email,
    password: validated.password,
    options: {
      data: {
        full_name: validated.fullName,
        phone: validated.phone,
      },
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, user: data.user };
}

export async function loginAction(formData: FormData) {
  const rawData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const validated = loginSchema.parse(rawData);
  const supabase = createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validated.email,
    password: validated.password,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.session) {
    const cookieStore = cookies();
    cookieStore.set('sb-access-token', data.session.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: data.session.expires_in,
    });
  }

  return { success: true, user: data.user };
}

export async function logoutAction() {
  const supabase = createServerClient();
  await supabase.auth.signOut();
  const cookieStore = cookies();
  cookieStore.delete('sb-access-token');
  return { success: true };
}
