'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function UserOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from('orders')
          .select('*, order_items(*)')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        setOrders(data || []);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="mb-10">
          <Link href="/account" className="text-xs text-gold uppercase tracking-luxury hover:underline">
            ← Back to Client Suite
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl font-light mt-4">
            Your Order <em className="gold-text font-medium not-italic">History</em>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-gold uppercase tracking-luxury animate-pulse">
            Fetching order records…
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-card/30 border border-border rounded-sm">
            <Package className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
            <h3 className="font-serif text-xl mb-2">No orders placed yet</h3>
            <p className="text-xs text-muted-foreground mb-6">Explore our curated collections of rare oud extraits.</p>
            <Link href="/shop" className="btn-gold inline-block bg-primary text-primary-foreground px-6 py-3 text-xs uppercase tracking-luxury font-medium">
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card/40 border border-border/60 p-6 rounded-sm">
                <div className="flex flex-wrap justify-between items-center gap-4 pb-4 mb-4 border-b border-border/40">
                  <div>
                    <span className="text-[10px] tracking-luxury uppercase text-muted-foreground block">Order Reference</span>
                    <span className="font-mono text-sm font-semibold text-gold">{order.order_number}</span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-luxury uppercase text-muted-foreground block">Date</span>
                    <span className="text-xs">{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-luxury uppercase text-muted-foreground block">Status</span>
                    <span className="inline-block bg-gold/20 text-gold px-3 py-1 text-[10px] uppercase tracking-luxury font-semibold rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] tracking-luxury uppercase text-muted-foreground block">Total</span>
                    <span className="text-sm font-medium">{order.currency} {Number(order.total_amount).toFixed(2)}</span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {order.order_items?.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <span>{item.product_name} x {item.quantity}</span>
                      <span className="text-muted-foreground">{order.currency} {Number(item.total_price).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
