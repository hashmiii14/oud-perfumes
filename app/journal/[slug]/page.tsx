import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { JOURNAL } from '@/lib/data';
import { JournalDetailClient } from './journal-detail-client';

export function generateStaticParams() {
  return JOURNAL.map((j) => ({ slug: j.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = JOURNAL.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: `${post.title} | Oud Arábia Journal`, description: post.excerpt, images: [post.image], type: 'article' },
    alternates: { canonical: `https://oudarabia.com/journal/${post.slug}` },
  };
}

export default function JournalDetailPage({ params }: { params: { slug: string } }) {
  const post = JOURNAL.find((p) => p.slug === params.slug);
  if (!post) notFound();
  return <JournalDetailClient slug={params.slug} />;
}
