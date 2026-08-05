'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/client';
import { updateOrderStatusAction } from '@/app/actions/admin';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    const res = await updateOrderStatusAction(orderId, status);
    if (res.success) {
      toast.success(`Order status updated to ${status}`);
      fetchOrders();
    } else {
      toast.error(res.error || 'Failed to update status');
    }
  };

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 pb-6 border-b border-border">
          <Link href="/admin" className="text-xs text-gold uppercase tracking-luxury hover:underline">
            ← Back to Admin Control Center
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl font-light mt-2">
            Order <em className="gold-text font-medium not-italic">Fulfillment</em>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-gold uppercase tracking-luxury animate-pulse">
            Loading Customer Orders…
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-card/30 border border-border rounded-sm">
            <p className="text-xs text-muted-foreground">No orders in database currently.</p>
          </div>
        ) : (
          <div className="bg-card/40 border border-border/60 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] tracking-luxury uppercase text-muted-foreground bg-secondary/30">
                    <th className="py-4 px-6">Order Ref</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6">Customer / Guest</th>
                    <th className="py-4 px-6">Total</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-b border-border/30 hover:bg-secondary/10">
                      <td className="py-4 px-6 font-mono font-medium text-gold">{o.order_number}</td>
                      <td className="py-4 px-6">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="py-4 px-6">{o.guest_email || o.shipping_address?.fullName || 'Client'}</td>
                      <td className="py-4 px-6 font-mono">{o.currency} {Number(o.total_amount).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className="bg-gold/20 text-gold px-2 py-1 text-[9px] uppercase tracking-luxury rounded-sm">
                          {o.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleStatusChange(o.id, e.target.value)}
                          className="bg-transparent border border-border px-3 py-1 text-xs focus:border-gold focus:outline-none rounded-sm"
                        >
                          <option value="pending" className="bg-background text-foreground">Pending</option>
                          <option value="processing" className="bg-background text-foreground">Processing</option>
                          <option value="shipped" className="bg-background text-foreground">Shipped</option>
                          <option value="delivered" className="bg-background text-foreground">Delivered</option>
                          <option value="cancelled" className="bg-background text-foreground">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
