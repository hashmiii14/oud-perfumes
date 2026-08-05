import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { COLLECTIONS, PRODUCTS } from '@/lib/data';
import { CollectionDetailClient } from './collection-detail-client';

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: collection.name,
    description: collection.description,
    openGraph: { title: `${collection.name} | Oud Arábia`, description: collection.description, images: [collection.image] },
    alternates: { canonical: `https://oudarabia.com/collections/${collection.slug}` },
  };
}

export default function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!collection) notFound();
  return <CollectionDetailClient slug={params.slug} />;
}
