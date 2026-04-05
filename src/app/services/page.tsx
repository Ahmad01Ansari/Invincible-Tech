import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Enterprise AI & Automation",
  description: "From intelligent RPA bots to multi-tenant enterprise SaaS systems. Discover our full stack of capabilities.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <section className="pt-40 pb-10 lg:pt-48 relative overflow-hidden bg-obsidian">
         <Container size="narrow" className="text-center">
            <Badge variant="orange" className="mb-6">Capabilities</Badge>
            <h1 className="text-display font-display font-bold text-text-high leading-tight mb-6">
              Engineering <br />
              <span className="text-gradient-neon">without limits.</span>
            </h1>
            <p className="text-body-lg text-text-low mx-auto">
              From replacing manual data entry with intelligent bots to building 
              multi-tenant enterprise SaaS systems. Discover our full stack of capabilities.
            </p>
         </Container>
      </section>

      {/* Uses the same Grid block developed in Sprint 2 */}
      <ServiceGrid />
      <CTABanner />
    </>
  );
}
