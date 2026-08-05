'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { signUpAction, loginAction } from '@/app/actions/auth';

export default function LoginPage() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (isSignUp) {
        const res = await signUpAction(formData);
        if (res.success) {
          toast.success('Account created! Please check your email to confirm or sign in.');
          setIsSignUp(false);
        } else {
          toast.error(res.error || 'Signup failed');
        }
      } else {
        const res = await loginAction(formData);
        if (res.success) {
          toast.success('Welcome back to Oud Arabia!');
          router.push('/account');
          router.refresh();
        } else {
          toast.error(res.error || 'Login failed. Please check your credentials.');
        }
      }
    } catch {
      toast.error('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 md:pt-16 pb-20 min-h-[80vh] flex items-center justify-center">
      <div className="mx-auto w-full max-w-md px-5">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-3">
            ✦ Private Client Access ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-3xl md:text-4xl font-light">
            {isSignUp ? 'Create an' : 'Welcome'} <em className="gold-text font-medium not-italic">{isSignUp ? 'Account' : 'Back'}</em>
          </motion.h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card/40 border border-border/60 p-6 md:p-8 rounded-sm shadow-xl backdrop-blur-md">
          {isSignUp && (
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Full Name</label>
              <input
                name="fullName"
                required
                type="text"
                className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
              />
            </div>
          )}
          <div>
            <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Email Address</label>
            <input
              name="email"
              required
              type="email"
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
            />
          </div>
          <div>
            <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Password</label>
            <input
              name="password"
              required
              type="password"
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
            />
          </div>

          {!isSignUp && (
            <div className="text-right">
              <Link href="/auth/forgot-password" className="text-xs text-muted-foreground hover:text-gold transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm disabled:opacity-50 mt-4"
          >
            {loading ? 'Processing…' : isSignUp ? 'Create Account' : 'Sign In'}
          </button>

          <div className="pt-4 text-center border-t border-border/40">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-muted-foreground hover:text-gold transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'New client? Create an account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
