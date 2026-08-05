'use client';

import { useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/login`,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password reset link sent to your email.');
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 md:pt-16 pb-20 min-h-[70vh] flex items-center justify-center">
      <div className="mx-auto w-full max-w-md px-5">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-3">
            ✦ Client Recovery ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-3xl font-light">
            Reset Your <em className="gold-text font-medium not-italic">Password</em>
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card/40 border border-border/60 p-6 md:p-8 rounded-sm shadow-xl backdrop-blur-md">
          <div>
            <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Email Address</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm disabled:opacity-50 mt-4"
          >
            {loading ? 'Sending…' : 'Send Recovery Link'}
          </button>

          <div className="pt-4 text-center border-t border-border/40">
            <Link href="/auth/login" className="text-xs text-muted-foreground hover:text-gold transition-colors">
              Return to Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
