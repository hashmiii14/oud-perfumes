import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/wishlist'],
    },
    sitemap: 'https://oudarabia.com/sitemap.xml',
  };
}
