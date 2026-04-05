import { SERVICE_DETAILS } from "@/constants/service-details";
import { notFound } from "next/navigation";
import { ServiceHero } from "@/components/sections/ServiceHero";
import { 
  ServiceAbout, 
  SolutionsGrid, 
  TechStackCards, 
  ProcessTimeline 
} from "@/components/sections/ServiceSections";
import { 
  CapabilitiesList, 
  BenefitsGrid, 
  DetailedFAQ, 
  FinalCTASection,
  IndustryVerticals,
  DemoShowcase,
  CaseStudyHighlight,
  ToolBrandLogos
} from "@/components/sections/ServiceUtility";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Invinsible Tech`,
    description: service.shortDescription,
  };
}

export default async function IndividualServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICE_DETAILS[slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-obsidian">
      {/* 1. Hero Section */}
      <ServiceHero data={service.hero} />

      {/* 2. Overview Section */}
      <ServiceAbout data={service.about} />

      {/* 3. Core Solutions Section */}
      <SolutionsGrid solutions={service.solutions} />

      {/* 4. Tools & Platforms (Tech Stack) */}
      <TechStackCards techStack={service.techStack} />

      {/* 5. Industry Vertical Expertise */}
      <IndustryVerticals industries={service.industries} />

      {/* 6. Business Use Cases (Capabilities) */}
      <CapabilitiesList capabilities={service.capabilities} />

      {/* 7. Factory Protocol (Process) */}
      <ProcessTimeline process={service.process} />

      {/* 8. Demo Command Center (Dashboard) */}
      <DemoShowcase slug={service.slug} />

      {/* 9. Business Benefits */}
      <BenefitsGrid benefits={service.benefits} />

      {/* 10. Ecosystem Platforms (Brand Logos) */}
      {service.toolLogos && (
        <ToolBrandLogos logos={service.toolLogos} />
      )}

      {/* 11. Technical FAQ */}
      <DetailedFAQ faq={service.faq} />

      {/* 11. Case Study Highlight (Optional) */}
      {service.caseStudy && (
        <CaseStudyHighlight caseStudy={service.caseStudy} />
      )}

      {/* 12. Final CTA Section */}
      <FinalCTASection data={service.finalCTA} />
    </main>
  );
}
