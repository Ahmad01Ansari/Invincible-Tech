"use client";

import { Container } from "../ui/Container";
import { ServiceCard } from "../cards/ServiceCard";
import { SERVICES } from "@/constants/services";

export function ServiceGrid() {
  return (
    <section className="section-padding bg-surface-100 relative" id="services">
      <Container>
        <div className="mb-16 md:mb-20">
          <h2 className="text-h2 font-display font-semibold text-text-high mb-4">
            Our Expertise
          </h2>
          <p className="text-body-lg text-text-low max-w-2xl">
            We provide end-to-end software engineering and automation for ambitious organizations looking to dominate their market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
