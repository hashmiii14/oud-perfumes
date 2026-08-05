'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function ActivityLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      const supabase = createClient();
      const { data } = await supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(50);
      setLogs(data || []);
      setLoading(false);
    }
    loadLogs();
  }, []);

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="mb-10 pb-6 border-b border-border">
          <Link href="/admin" className="text-xs text-gold uppercase tracking-luxury hover:underline">
            ← Back to Admin Control Center
          </Link>
          <h1 className="font-serif text-3xl md:text-5xl font-light mt-2">
            Security & Audit <em className="gold-text font-medium not-italic">Logs</em>
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-20 text-xs text-gold uppercase tracking-luxury animate-pulse">
            Loading DevSecOps Logs…
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 bg-card/30 border border-border rounded-sm">
            <ShieldCheck className="w-12 h-12 text-gold mx-auto mb-4 opacity-50" />
            <p className="text-xs text-muted-foreground">No suspicious or audit activity records found.</p>
          </div>
        ) : (
          <div className="bg-card/40 border border-border/60 rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border/60 text-[10px] tracking-luxury uppercase text-muted-foreground bg-secondary/30">
                    <th className="py-4 px-6">Timestamp</th>
                    <th className="py-4 px-6">Action</th>
                    <th className="py-4 px-6">Resource Type</th>
                    <th className="py-4 px-6">Metadata</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b border-border/30 hover:bg-secondary/10">
                      <td className="py-4 px-6 font-mono">{new Date(log.created_at).toLocaleString()}</td>
                      <td className="py-4 px-6 text-gold font-medium">{log.action}</td>
                      <td className="py-4 px-6 uppercase text-[10px] tracking-luxury">{log.resource_type}</td>
                      <td className="py-4 px-6 font-mono text-[10px] text-muted-foreground">
                        {JSON.stringify(log.metadata)}
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
