'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Lock, CreditCard, Truck, Check, AlertCircle } from 'lucide-react';
import { useCart, useCartTotal, useCurrency, useClearCart } from '@/lib/store/store';
import { formatPrice } from '@/lib/currency';
import { toast } from 'sonner';

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zip: string;
};

const COUNTRIES = ['India', 'United Arab Emirates', 'Qatar', 'Saudi Arabia', 'Kuwait', 'Bahrain', 'Oman', 'Other'];

const SHIPPING_RATES: Record<string, number> = {
  India: 0,
  'United Arab Emirates': 0,
  Qatar: 0,
  'Saudi Arabia': 0,
  Kuwait: 0,
  Bahrain: 0,
  Oman: 0,
  Other: 25,
};

export default function CheckoutPage() {
  const cart = useCart();
  const currency = useCurrency();
  const clearCart = useClearCart();
  const total = useCartTotal();
  const [step, setStep] = useState<'info' | 'payment' | 'done'>('info');
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', address: '', city: '', country: '', zip: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [payment, setPayment] = useState<'razorpay' | 'paypal'>('razorpay');
  const [loading, setLoading] = useState(false);

  const shippingRate = form.country ? (SHIPPING_RATES[form.country] ?? 25) : 15;
  const freeShippingThreshold = 150;
  const shipping = total >= freeShippingThreshold ? 0 : shippingRate;
  const grand = total + shipping;

  const validateInfo = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email';
    if (!form.phone.trim()) e.phone = 'Required';
    else if (!/^[+\d\s()-]{7,}$/.test(form.phone)) e.phone = 'Invalid phone';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.country) e.country = 'Required';
    if (!form.zip.trim()) e.zip = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (cart.length === 0 && step !== 'done') {
    return (
      <div className="pt-20 pb-32 text-center">
        <div className="mx-auto max-w-md px-5">
          <h1 className="font-serif text-4xl font-light mb-4">Your bag is empty</h1>
          <p className="text-sm text-muted-foreground mb-8">Discover our rare oud compositions before you check out.</p>
          <Link href="/shop" className="btn-gold inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
            Explore Fragrances <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="pt-20 pb-32 text-center">
        <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 18 }} className="w-20 h-20 mx-auto rounded-full bg-gold flex items-center justify-center mb-8">
          <Check className="w-10 h-10 text-white" strokeWidth={2} />
        </motion.div>
        <h1 className="font-serif text-4xl md:text-5xl font-light mb-4">Order Confirmed</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
          Thank you, {form.name || 'valued client'}. A confirmation has been sent to {form.email || 'your email'}.
          Your fragrances will be hand-packed and dispatched within 24 hours.
        </p>
        <Link href="/shop" className="btn-gold inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInfo()) {
      setStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // In production: create order via server action, verify payment server-side
    setTimeout(() => {
      setLoading(false);
      setStep('done');
      clearCart();
      toast.success('Payment successful. Your order is confirmed.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full bg-transparent border px-4 py-3 text-sm focus:outline-none rounded-sm transition-colors ${errors[field] ? 'border-destructive focus:border-destructive' : 'border-border focus:border-gold'}`;

  return (
    <div className="pt-10 md:pt-16 pb-20">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-light">Checkout</h1>
          <div className="flex items-center justify-center gap-2 mt-6 text-xs tracking-luxury uppercase">
            <span className={step === 'info' ? 'text-gold' : 'text-muted-foreground'}>1. Information</span>
            <span className="text-muted-foreground">→</span>
            <span className={step === 'payment' ? 'text-gold' : 'text-muted-foreground'}>2. Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_400px] gap-12 max-w-6xl mx-auto">
          {/* Form */}
          <div>
            {step === 'info' && (
              <form onSubmit={handleInfoSubmit} className="space-y-5" noValidate>
                <h2 className="font-serif text-2xl font-light mb-6">Shipping Details</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Full Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass('name')} />
                    {errors.name && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass('email')} />
                    {errors.email && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Phone</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+971 50 000 0000" className={inputClass('phone')} />
                  {errors.phone && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.phone}</p>}
                </div>
                <div>
                  <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Address</label>
                  <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className={inputClass('address')} />
                  {errors.address && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.address}</p>}
                </div>
                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">City</label>
                    <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={inputClass('city')} />
                    {errors.city && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.city}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Postal Code</label>
                    <input required value={form.zip} onChange={(e) => setForm({ ...form, zip: e.target.value })} className={inputClass('zip')} />
                    {errors.zip && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.zip}</p>}
                  </div>
                  <div>
                    <label className="text-[10px] tracking-luxury uppercase text-muted-foreground block mb-2">Country</label>
                    <select required value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} className={inputClass('country')}>
                      <option value="">Select country</option>
                      {COUNTRIES.map((c) => (<option key={c} value={c}>{c}</option>))}
                    </select>
                    {errors.country && <p className="text-xs text-destructive mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.country}</p>}
                  </div>
                </div>
                <button type="submit" className="btn-gold w-full bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <form onSubmit={placeOrder} className="space-y-5">
                <h2 className="font-serif text-2xl font-light mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { id: 'razorpay', l: 'Razorpay', d: 'UPI, Cards, Net Banking (India)', icon: CreditCard },
                    { id: 'paypal', l: 'PayPal', d: 'International checkout', icon: Lock },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPayment(m.id as typeof payment)}
                      className={`w-full flex items-center gap-4 p-5 border rounded-sm text-left transition-colors ${payment === m.id ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50'}`}
                    >
                      <m.icon className="w-6 h-6 text-gold" strokeWidth={1.5} />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{m.l}</div>
                        <div className="text-xs text-muted-foreground">{m.d}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${payment === m.id ? 'border-gold bg-gold' : 'border-border'}`}>
                        {payment === m.id && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-2">
                  <Lock className="w-3.5 h-3.5" /> Payments are encrypted and verified securely.
                </p>
                <div className="flex gap-3 pt-4">
                  <button type="button" onClick={() => setStep('info')} className="px-6 py-4 text-xs tracking-luxury uppercase border border-border rounded-sm hover:border-gold transition-colors">
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-gold flex-1 bg-primary text-primary-foreground py-4 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                    ) : (
                      <>Place Order · {formatPrice(grand, currency)}</>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Summary */}
          <div className="bg-muted/40 rounded-sm p-6 h-fit lg:sticky lg:top-28">
            <h3 className="font-serif text-xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="w-14 h-16 rounded-sm overflow-hidden bg-background flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{item.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {item.quantity} · {item.volume}</div>
                  </div>
                  <div className="text-sm font-medium whitespace-nowrap">{formatPrice(item.price * item.quantity, currency)}</div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t border-border text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatPrice(total, currency)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shipping === 0 ? 'Free' : formatPrice(shipping, currency)}</span></div>
              <div className="flex justify-between pt-3 border-t border-border font-serif text-lg"><span>Total</span><span>{formatPrice(grand, currency)}</span></div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Truck className="w-4 h-4 text-gold" /> Free shipping over {formatPrice(freeShippingThreshold, currency)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
