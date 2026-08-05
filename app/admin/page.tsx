'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, ShoppingBag, Users, DollarSign, ShieldAlert } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    ordersCount: 0,
    productsCount: 0,
    customersCount: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const supabase = createClient();

      const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true }).is('deleted_at', null);
      const { count: customersCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { data: orders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });

      const totalSales = orders ? orders.reduce((sum, o) => sum + Number(o.total_amount || 0), 0) : 0;

      setStats({
        totalSales,
        ordersCount: orders?.length || 0,
        productsCount: productsCount || 0,
        customersCount: customersCount || 0,
      });

      setRecentOrders(orders?.slice(0, 5) || []);
      setLoading(false);
    }
    loadStats();
  }, []);

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-border">
          <div>
            <div className="text-[10px] tracking-ultra uppercase text-gold mb-2">✦ Executive Control Center ✦</div>
            <h1 className="font-serif text-3xl md:text-5xl font-light">
              Admin <em className="gold-text font-medium not-italic">Dashboard</em>
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/admin/products" className="btn-gold bg-primary text-primary-foreground px-4 py-2 text-xs uppercase tracking-luxury font-medium rounded-sm">
              Manage Products
            </Link>
            <Link href="/admin/orders" className="btn-gold border border-gold text-gold px-4 py-2 text-xs uppercase tracking-luxury font-medium rounded-sm">
              Manage Orders
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card/40 border border-border/60 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Total Revenue</span>
              <DollarSign className="w-5 h-5 text-gold" />
            </div>
            <div className="font-serif text-2xl font-semibold">AED {stats.totalSales.toFixed(2)}</div>
          </div>

          <div className="bg-card/40 border border-border/60 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Orders Processed</span>
              <ShoppingBag className="w-5 h-5 text-gold" />
            </div>
            <div className="font-serif text-2xl font-semibold">{stats.ordersCount}</div>
          </div>

          <div className="bg-card/40 border border-border/60 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Active Catalog</span>
              <Package className="w-5 h-5 text-gold" />
            </div>
            <div className="font-serif text-2xl font-semibold">{stats.productsCount}</div>
          </div>

          <div className="bg-card/40 border border-border/60 p-6 rounded-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] tracking-luxury uppercase text-muted-foreground">Registered Clients</span>
              <Users className="w-5 h-5 text-gold" />
            </div>
            <div className="font-serif text-2xl font-semibold">{stats.customersCount}</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-card/40 border border-border/60 p-6 rounded-sm">
          <h3 className="font-serif text-xl mb-6">Recent Orders</h3>
          {recentOrders.length === 0 ? (
            <p className="text-xs text-muted-foreground">No recent orders recorded.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] tracking-luxury uppercase text-muted-foreground">
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Total</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((o) => (
                    <tr key={o.id} className="border-b border-border/30">
                      <td className="py-3 px-4 font-mono font-medium text-gold">{o.order_number}</td>
                      <td className="py-3 px-4">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{o.currency} {Number(o.total_amount).toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className="bg-gold/20 text-gold px-2 py-1 text-[9px] uppercase tracking-luxury rounded-sm">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
