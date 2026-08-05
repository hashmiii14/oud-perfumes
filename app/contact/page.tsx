'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success('Thank you. Our client care team will be in touch within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-[10px] tracking-ultra uppercase text-gold mb-4">
            ✦ Client Care ✦
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-serif text-4xl md:text-6xl font-light text-balance">
            Get in <em className="gold-text font-medium not-italic">Touch</em>
          </motion.h1>
          <p className="text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            Our client care team is available around the clock. We typically respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Email</label>
              <input
                required type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Subject</label>
              <input
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm"
              />
            </div>
            <div>
              <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Message</label>
              <textarea
                required rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:border-gold focus:outline-none rounded-sm resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm disabled:opacity-50"
            >
              {loading ? 'Sending…' : 'Send Message'}
            </button>
          </form>

          {/* Info */}
          <div className="space-y-8">
            {[
              { icon: MapPin, t: 'Visit Us', d: 'Oud Arábia Atelier, Bandra West, Mumbai 400050, India' },
              { icon: Mail, t: 'Email', d: 'care@oudarabia.com' },
              { icon: Phone, t: 'Phone', d: '+91 22 0000 0000' },
              { icon: Clock, t: 'Hours', d: 'Mon–Sat, 10am–7pm IST' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold flex-shrink-0">
                  <item.icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-[10px] tracking-luxury uppercase text-gold mb-1">{item.t}</div>
                  <div className="text-sm text-muted-foreground">{item.d}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
