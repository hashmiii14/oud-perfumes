'use client';

import { useEffect } from 'react';
import { useStore } from './store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const setHydrated = useStore((s) => s.setHydrated);
  const detectCurrency = useStore((s) => s.detectCurrency);

  useEffect(() => {
    setHydrated(true);
    // Attempt country detection via timezone (no external API needed)
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzToCountry: Record<string, string> = {
        'Asia/Dubai': 'AE',
        'Asia/Qatar': 'QA',
        'Asia/Riyadh': 'SA',
        'Asia/Kuwait': 'KW',
        'Asia/Bahrain': 'BH',
        'Asia/Muscat': 'OM',
        'Asia/Kolkata': 'IN',
        'Asia/Calcutta': 'IN',
        'America/New_York': 'US',
        'America/Chicago': 'US',
        'America/Los_Angeles': 'US',
        'Europe/Dublin': 'EUR',
      };
      const countryCode = tzToCountry[tz] || 'US';
      detectCurrency(countryCode);
    } catch {
      // fallback stays default
    }
  }, [setHydrated, detectCurrency]);

  return <>{children}</>;
}
