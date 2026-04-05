import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedByMarquee } from "@/components/sections/TrustedByMarquee";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { IndustryBento } from "@/components/sections/IndustryBento";
import { TestimonialSpotlight } from "@/components/sections/TestimonialSpotlight";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CTABanner } from "@/components/sections/CTABanner";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_CONFIG } from "@/constants/site";

export default function Home() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.url,
    "logo": `${SITE_CONFIG.url}/images/og/default.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": SITE_CONFIG.phone,
      "contactType": "customer service"
    },
    "sameAs": [
      SITE_CONFIG.social.linkedIn,
      SITE_CONFIG.social.twitter,
      SITE_CONFIG.social.github
    ]
  };

  return (
    <>
      <JsonLd data={organizationSchema} />
      <HeroSection />
      <TrustedByMarquee />
      <ServiceGrid />
      <IndustryBento />
      <TestimonialSpotlight />
      <FAQSection />
      <BlogSection />
      <CTABanner />
    </>
  );
}
