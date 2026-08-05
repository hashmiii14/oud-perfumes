import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-32 pb-32 text-center">
      <div className="mx-auto max-w-md px-5">
        <div className="text-[10px] tracking-ultra uppercase text-gold mb-4">✦ 404 ✦</div>
        <h1 className="font-serif text-5xl md:text-7xl font-light mb-6">Page not found</h1>
        <p className="text-sm text-muted-foreground mb-10">
          The page you are looking for has wandered off. Let us guide you back.
        </p>
        <Link href="/" className="btn-gold inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 text-xs tracking-luxury uppercase font-medium hover:bg-gold hover:text-gold-foreground transition-colors rounded-sm">
          Return Home <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
