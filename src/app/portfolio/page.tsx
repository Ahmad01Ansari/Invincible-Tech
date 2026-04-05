"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { 
  PortfolioHero, 
  PortfolioFilters, 
  FeaturedProjectCard, 
  ProjectItemCard 
} from "@/components/portfolio/PortfolioComponents";
import { PortfolioCTA } from "@/components/portfolio/CaseStudyDeepDive";
import { PORTFOLIO_PROJECTS } from "@/constants/portfolio";
import { motion, AnimatePresence } from "framer-motion";

const CATEGORIES = [
  "All",
  "AI & Machine Learning",
  "Automation & RPA",
  "ERP & Enterprise Software",
  "Websites & SaaS Platforms",
  "Mobile Applications",
  "Cloud & DevOps",
  "Data & Analytics",
  "Modernization & Migration",
  "Startup MVPs"
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  const featuredProject = useMemo(() => 
    PORTFOLIO_PROJECTS.find(p => p.featured) || PORTFOLIO_PROJECTS[0]
  , []);

  const filteredProjects = useMemo(() => {
    let result = PORTFOLIO_PROJECTS.filter(project => {
      const matchesCategory = activeCategory === "All" || project.category === activeCategory;
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           project.industry.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Apply Sorting
    result = [...result].sort((a, b) => {
      if (sortBy === "az") {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === "impact") {
        // Sort by first metric value (descending)
        const valA = parseFloat(a.metrics[0]?.value.replace(/[^0-9.]/g, "")) || 0;
        const valB = parseFloat(b.metrics[0]?.value.replace(/[^0-9.]/g, "")) || 0;
        return valB - valA;
      }
      // Latest is default (using the order in constants which is already sorted by date/recency)
      return 0; 
    });

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main className="bg-obsidian">
      {/* 1. Cinematic Hero */}
      <PortfolioHero />

      {/* 2. Interactive Filters */}
      <PortfolioFilters 
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearchChange={setSearchQuery}
        onSortChange={setSortBy}
      />

      {/* 3. Featured Showcase */}
      {activeCategory === "All" && searchQuery === "" && (
        <FeaturedProjectCard project={featuredProject} />
      )}

      {/* 4. Portfolio Grid */}
      <section className="section-padding bg-surface-100 min-h-[600px]">
        <Container>
          <div className="mb-12 flex justify-between items-end border-b border-border-dim pb-8">
            <div>
              <h3 className="text-2xl font-display font-medium text-text-high">
                {activeCategory} <span className="text-text-low ml-2">Projects</span>
              </h3>
              <p className="text-sm font-mono text-text-low mt-2">Showing {filteredProjects.length} technical case studies</p>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <ProjectItemCard key={project.slug} project={project} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-border-dim">
              <p className="font-mono text-text-low">No projects found matching your criteria.</p>
              <button 
                onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
                className="mt-6 text-accent-orange font-mono text-xs uppercase tracking-widest border-b border-accent-orange"
              >
                Clear all filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* 5. Final CTA */}
      <PortfolioCTA />
    </main>
  );
}
