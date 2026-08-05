export type Currency = {
  code: string;
  symbol: string;
  name: string;
  rate: number; // relative to USD base
  flag: string;
  country: string;
  locale: string;
  decimals: number;
};

export const CURRENCIES: Currency[] = [
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', rate: 3.67, flag: '🇦🇪', country: 'United Arab Emirates', locale: 'en-AE', decimals: 2 },
  { code: 'QAR', symbol: '﷼', name: 'Qatari Riyal', rate: 3.64, flag: '🇶🇦', country: 'Qatar', locale: 'en-QA', decimals: 2 },
  { code: 'SAR', symbol: '﷼', name: 'Saudi Riyal', rate: 3.75, flag: '🇸🇦', country: 'Saudi Arabia', locale: 'en-SA', decimals: 2 },
  { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', rate: 0.31, flag: '🇰🇼', country: 'Kuwait', locale: 'en-KW', decimals: 3 },
  { code: 'BHD', symbol: '.د.ب', name: 'Bahraini Dinar', rate: 0.38, flag: '🇧🇭', country: 'Bahrain', locale: 'en-BH', decimals: 3 },
  { code: 'OMR', symbol: '﷼', name: 'Omani Rial', rate: 0.39, flag: '🇴🇲', country: 'Oman', locale: 'en-OM', decimals: 3 },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 83.2, flag: '🇮🇳', country: 'India', locale: 'en-IN', decimals: 0 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 1, flag: '🇺🇸', country: 'United States', locale: 'en-US', decimals: 2 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.92, flag: '🇪🇺', country: 'Europe', locale: 'en-IE', decimals: 2 },
];

export const DEFAULT_CURRENCY = CURRENCIES.find((c) => c.code === 'AED')!;

export function getCurrencyByCode(code: string): Currency | undefined {
  return CURRENCIES.find((c) => c.code === code);
}

const COUNTRY_TO_CURRENCY: Record<string, string> = {
  AE: 'AED', QA: 'QAR', SA: 'SAR', KW: 'KWD', BH: 'BHD', OM: 'OMR', IN: 'INR', US: 'USD',
};

export function detectCurrencyFromCountry(countryCode: string): Currency {
  const code = COUNTRY_TO_CURRENCY[countryCode.toUpperCase()];
  return getCurrencyByCode(code || 'USD') || DEFAULT_CURRENCY;
}

export function formatPrice(usdPrice: number, currency: Currency): string {
  const converted = usdPrice * currency.rate;
  const formatted = converted.toLocaleString('en-US', {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });
  return `${currency.symbol}${formatted}`;
}

export function formatPriceWithCode(usdPrice: number, currency: Currency): string {
  const converted = usdPrice * currency.rate;
  const formatted = converted.toLocaleString('en-US', {
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  });
  return `${currency.code} ${currency.symbol}${formatted}`;
}
