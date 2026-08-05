'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Trash2, Plus, RefreshCw } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { deleteProductAction } from '@/app/actions/admin';
import { PRODUCTS as MOCK_PRODUCTS } from '@/lib/data';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.from('products').select('*').is('deleted_at', null).order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      setProducts(MOCK_PRODUCTS);
    } else {
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to soft-delete this product?')) return;
    const res = await deleteProductAction(id);
    if (res.success) {
      toast.success('Product removed from catalog.');
      fetchProducts();
    } else {
      toast.error(res.error || 'Failed to delete product.');
    }
  };

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="flex justify-between items-center mb-10 pb-6 border-b border-border">
          <div>
            <Link href="/admin" className="text-xs text-gold uppercase tracking-luxury hover:underline">
              ← Back to Admin Control Center
            </Link>
            <h1 className="font-serif text-3xl md:text-5xl font-light mt-2">
              Catalog <em className="gold-text font-medium not-italic">Management</em>
            </h1>
          </div>
          <button onClick={fetchProducts} className="border border-border p-3 rounded-sm hover:border-gold text-gold transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-gold uppercase tracking-luxury animate-pulse">
            Loading Catalog Items…
          </div>
        ) : (
          <div className="bg-card/40 border border-border/60 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] tracking-luxury uppercase text-muted-foreground bg-secondary/30">
                    <th className="py-4 px-6">Product</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Stock</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-border/30 hover:bg-secondary/10">
                      <td className="py-4 px-6 font-medium flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-sm border border-gold/30" />
                        <div>
                          <div className="font-serif text-sm">{p.name}</div>
                          <div className="text-[10px] text-muted-foreground">{p.volume || '100ml'}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 capitalize">{p.category || 'Oud Extrait'}</td>
                      <td className="py-4 px-6 font-mono text-gold">AED {Number(p.price).toFixed(2)}</td>
                      <td className="py-4 px-6">{p.stock || 15} units</td>
                      <td className="py-4 px-6">
                        <span className="bg-green-500/20 text-green-400 px-2 py-1 text-[9px] uppercase tracking-luxury rounded-sm">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="text-red-400 hover:text-red-300 transition-colors p-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
