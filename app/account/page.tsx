'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { User, Package, MapPin, Heart, LogOut, Shield } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { logoutAction } from '@/app/actions/auth';

export default function AccountDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAccount() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push('/auth/login');
        return;
      }

      setProfile(user);

      // Check admin status
      const { data: adminCheck } = await supabase.rpc('is_admin');
      if (adminCheck) setIsAdmin(true);

      setLoading(false);
    }
    loadAccount();
  }, [router]);

  const handleLogout = async () => {
    await logoutAction();
    toast.success('Signed out successfully.');
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="pt-20 pb-20 text-center min-h-[60vh] flex items-center justify-center">
        <div className="text-gold tracking-luxury uppercase text-xs animate-pulse">Loading Client Suite…</div>
      </div>
    );
  }

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 pb-6 border-b border-border">
          <div>
            <div className="text-[10px] tracking-ultra uppercase text-gold mb-2">✦ Private Client Suite ✦</div>
            <h1 className="font-serif text-3xl md:text-5xl font-light">
              Welcome, <em className="gold-text font-medium not-italic">{profile?.user_metadata?.full_name || profile?.email}</em>
            </h1>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            {isAdmin && (
              <Link href="/admin" className="btn-gold bg-gold text-gold-foreground px-4 py-2 text-xs tracking-luxury uppercase flex items-center gap-2 rounded-sm font-medium">
                <Shield className="w-4 h-4" /> Admin Portal
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="border border-border text-muted-foreground hover:border-gold hover:text-gold px-4 py-2 text-xs tracking-luxury uppercase flex items-center gap-2 rounded-sm transition-colors"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/account/orders">
            <motion.div whileHover={{ y: -4 }} className="bg-card/40 border border-border/60 p-6 rounded-sm hover:border-gold transition-colors">
              <Package className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-1">Order History</h3>
              <p className="text-xs text-muted-foreground">View and track your previous luxury fragrance orders.</p>
            </motion.div>
          </Link>

          <Link href="/account/addresses">
            <motion.div whileHover={{ y: -4 }} className="bg-card/40 border border-border/60 p-6 rounded-sm hover:border-gold transition-colors">
              <MapPin className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-1">Saved Addresses</h3>
              <p className="text-xs text-muted-foreground">Manage your shipping destinations across GCC & Global.</p>
            </motion.div>
          </Link>

          <Link href="/wishlist">
            <motion.div whileHover={{ y: -4 }} className="bg-card/40 border border-border/60 p-6 rounded-sm hover:border-gold transition-colors">
              <Heart className="w-8 h-8 text-gold mb-4" />
              <h3 className="font-serif text-xl mb-1">Curated Wishlist</h3>
              <p className="text-xs text-muted-foreground">Access your saved olfactory masterpieces.</p>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}
