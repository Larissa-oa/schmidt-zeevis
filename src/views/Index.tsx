"use client";

import SEO from "@/components/seo/SEO";
import PageLayout from "@/components/layout/PageLayout";
import HeroSection from "@/components/home/HeroSection";
import TrustSection from "@/components/home/TrustSection";
import PromoBlocks from "@/components/home/PromoBlocks";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import CatchOfTheMonthSlider from "@/components/home/CatchOfTheMonthSlider";
import ReviewsSection from "@/components/home/ReviewsSection";

/** Homepage — assembles all landing page sections. */
const Index = () => (
  <PageLayout>
    <SEO
      title="Verse Vis & Zeevruchten"
      description="Schmidt Zeevis — premium verse vis en zeevruchten rechtstreeks van Nederlandse vissers naar uw deur. Zalm, garnalen, oesters, kreeft en meer."
      canonical="/"
    />
    <HeroSection />
    <TrustSection />
    <PromoBlocks />
    <CollectionsGrid />
    <CatchOfTheMonthSlider />
    <ReviewsSection />
  </PageLayout>
);

export default Index;
