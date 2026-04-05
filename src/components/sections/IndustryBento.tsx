"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";

const INDUSTRIES = [
  { name: "Education", description: "School ERPs & Portals", colSpan: "lg:col-span-8", rowSpan: "lg:row-span-2", image: "/images/industries/education.png" },
  { name: "Healthcare", description: "Patient Management", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1", image: "/images/industries/healthcare.png" },
  { name: "Finance", description: "Secure Portals & RPA", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1", image: "/images/industries/finance.png" },
  { name: "Retail & E-commerce", description: "B2B/B2C Marketplaces", colSpan: "lg:col-span-4", rowSpan: "lg:row-span-1", image: "/images/industries/ecommerce.jpg" },
  { name: "Startups", description: "MVP Development", colSpan: "lg:col-span-8", rowSpan: "lg:row-span-1", image: "/images/industries/startups.png" },
];

export function IndustryBento() {
  return (
    <section className="section-padding bg-obsidian">
      <Container>
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Badge variant="dim" className="mb-4">Industries We Serve</Badge>
            <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
              <span className="text-accent-orange opacity-50 mr-2">{"//"}</span>
              Built for your domain.
            </h2>
          </div>
          <p className="text-text-low max-w-md font-mono text-sm leading-relaxed border-l border-border-dim pl-4">
            We understand that every industry has unique compliance, scalability, and workflow constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[240px] gap-0 border border-border-dim">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className={`p-8 flex flex-col justify-end relative overflow-hidden group border border-border-dim transition-all duration-300 ${industry.colSpan} ${industry.rowSpan}`}
            >
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${industry.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent z-10 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />


              <div className="relative z-20">
                <h3 className="text-xl font-mono text-text-high mb-2">
                  <span className="text-accent-orange mr-2">❯</span>
                  {industry.name}
                </h3>
                <p className="text-text-low font-mono text-xs uppercase tracking-widest">
                  {industry.description}
                </p>
              </div>

              {/* Full Circle Border Animation - Two lines meeting at Bottom-Right */}
              {/* Line 1: Top-Left -> Top-Right -> Bottom-Right */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 ease-in-out z-20" />
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover:h-full transition-all duration-500 delay-500 ease-in-out z-20" />

              {/* Line 2: Top-Left -> Bottom-Left -> Bottom-Right */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover:h-full transition-all duration-500 ease-in-out z-20" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 delay-500 ease-in-out z-20" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
