import { Hero } from '@/components/home/hero';
import { Collections } from '@/components/home/collections';
import { BestSellers } from '@/components/home/best-sellers';
import { FeaturedBanner } from '@/components/home/featured-banner';
import { NewArrivals } from '@/components/home/new-arrivals';
import { BrandStory } from '@/components/home/brand-story';
import { ShopByMood } from '@/components/home/shop-by-mood';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { Testimonials } from '@/components/home/testimonials';
import { InstagramGallery } from '@/components/home/instagram-gallery';
import { FAQ } from '@/components/home/faq';

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <BestSellers />
      <FeaturedBanner />
      <NewArrivals />
      <BrandStory />
      <ShopByMood />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <FAQ />
    </>
  );
}
