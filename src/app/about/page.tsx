"use client";

import { 
  AboutHero, 
  AboutStory, 
  AboutValues, 
  AboutCapabilities,
  AboutWhyUs,
  AboutProcess,
  AboutIndustries,
  AboutTech,
  AboutTeam,
  AboutMetricsDashboard,
  AboutTestimonials,
  AboutJoinUs,
  AboutFinalCTA 
} from "@/components/about/AboutSections";

export default function AboutPage() {
  return (
    <main className="bg-obsidian">
      {/* 1. Cinematic Hero */}
      <AboutHero />

      {/* 2. Company Story & Milestones */}
      <AboutStory />

      {/* 3. Mission, Vision & Values */}
      <AboutValues />

      {/* 4. Capabilities Spectrum (What We Do) */}
      <AboutCapabilities />

      {/* 5. The Competitive Edge (Why Choose Us) */}
      <AboutWhyUs />

      {/* 6. The Engineering Protocol (Process) */}
      <AboutProcess />

      {/* 7. Global Industry Sectors */}
      <AboutIndustries />

      {/* 8. Technology Marquee */}
      <AboutTech />

      {/* 9. The Collective (Team Grid) */}
      <AboutTeam />

      {/* 10. Live Metrics Dashboard */}
      <AboutMetricsDashboard />

      {/* 11. Testimonial Showcase */}
      <AboutTestimonials />

      {/* 12. Talent Acquisition (Careers) */}
      <AboutJoinUs />

      {/* 13. Final Vision CTA */}
      <AboutFinalCTA />
    </main>
  );
}
