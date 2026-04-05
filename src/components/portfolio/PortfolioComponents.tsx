"use client";

import React, { useState, useMemo } from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ChevronDown, 
  ArrowUpRight, 
  Cpu, 
  Workflow, 
  Database, 
  Globe, 
  Zap,
  Layout,
  Smartphone,
  Cloud,
  BarChart3,
  RefreshCw,
  Rocket
} from "lucide-react";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

// ── Portfolio Hero ──
export function PortfolioHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-obsidian">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent-orange/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent-neon/5 blur-[100px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="orange" className="mb-6 uppercase tracking-[0.2em]">Engineering Excellence</Badge>
            <h1 className="text-display lg:text-[100px] font-display font-bold text-text-high leading-[0.9] mb-8 tracking-tighter">
              Proven <span className="text-accent-orange italic">Impact.</span><br />
              Precision <span className="text-border-dim text-stroke">Code.</span>
            </h1>
            <p className="text-body-lg text-text-low max-w-2xl leading-relaxed mb-12">
              Explore our laboratory of high-stakes digital transformations. From neural route optimization for global logistics to high-concurrency fintech core systems.
            </p>
          </motion.div>

          {/* Quick Stats / HUD element */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-border-dim/30">
            {[
              { label: "Projects Shipped", value: "150+" },
              { label: "Lines of Code", value: "2.4M" },
              { label: "Avg. ROI Increase", value: "45%" },
              { label: "System Uptime", value: "99.99%" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              >
                <div className="text-2xl font-display font-bold text-text-high mb-1">{stat.value}</div>
                <div className="text-[10px] font-mono text-text-low uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Portfolio Filters ──
interface PortfolioFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  onSearchChange: (query: string) => void;
  onSortChange: (sort: string) => void;
}

const SORT_OPTIONS = [
  { id: "latest", label: "Latest First" },
  { id: "impact", label: "High Impact" },
  { id: "az", label: "A - Z Index" }
];

export function PortfolioFilters({ 
  categories, 
  activeCategory, 
  onCategoryChange,
  onSearchChange,
  onSortChange
}: PortfolioFiltersProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState(SORT_OPTIONS[0]);

  return (
    <div className="sticky top-20 z-40 bg-obsidian/80 backdrop-blur-xl border-b border-white/5 py-4">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Categories Tab-style */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-accent-orange text-obsidian border-transparent font-bold scale-105 shadow-lg shadow-accent-orange/20" 
                    : "bg-surface-200 text-text-low border border-border-dim hover:border-text-low"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low" size={16} />
              <input 
                type="text" 
                placeholder="Search Projects..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-surface-200 border border-border-dim rounded-sm py-2.5 pl-12 pr-4 text-sm text-text-high focus:outline-none focus:border-accent-orange transition-colors font-mono"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-4 bg-surface-200 border border-border-dim rounded-sm px-4 py-2.5 text-[10px] font-mono uppercase tracking-wider text-text-high hover:border-accent-orange transition-all min-w-[160px] justify-between group"
              >
                <div className="flex items-center gap-2">
                   <ChevronDown size={14} className={`text-accent-orange transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                   <span className="text-text-low">Sort:</span>
                   <span>{currentSort.label}</span>
                </div>
              </button>

              <AnimatePresence>
                {isSortOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-full bg-surface-200 border border-border-dim p-1 shadow-2xl z-50 rounded-sm"
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setCurrentSort(opt);
                          onSortChange(opt.id);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[10px] font-mono uppercase tracking-widest hover:bg-surface-300 transition-colors flex justify-between items-center ${currentSort.id === opt.id ? 'text-accent-orange' : 'text-text-low'}`}
                      >
                        {opt.label}
                        {currentSort.id === opt.id && <div className="w-1 h-1 rounded-full bg-accent-orange" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// ── Featured Project Card ──
export function FeaturedProjectCard({ project }: { project: Project }) {
  return (
    <section className="section-padding bg-obsidian overflow-hidden">
      <Container>
        <div className="mb-12">
          <Badge variant="dim" className="mb-4">Spotlight Project</Badge>
          <h2 className="text-4xl font-display font-medium text-text-high tracking-tight">Engineering standout <span className="text-accent-orange">Results.</span></h2>
        </div>

        <Link href={`/portfolio/${project.slug}`} className="group block">
          <div className="relative grid lg:grid-cols-12 gap-0 border border-border-dim overflow-hidden bg-surface-100">
            {/* Project Image/Video */}
            <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden border-r border-border-dim">
              <Image 
                src={project.thumbnail} 
                alt={project.title} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-obsidian/20 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-[1px] bg-accent-orange" />
                <span className="text-xs font-mono text-accent-orange uppercase tracking-[0.3em] font-bold">{project.category}</span>
              </div>

              <h3 className="text-4xl lg:text-5xl font-display font-bold text-text-high mb-6 leading-tight">
                {project.title}
              </h3>
              
              <p className="text-body text-text-low mb-10 leading-relaxed font-mono">
                {project.longDescription.substring(0, 180)}...
              </p>

              <div className="grid grid-cols-2 gap-8 mb-12 py-8 border-y border-border-dim/30">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <div className="text-2xl font-display font-bold text-text-high">{m.value}</div>
                    <div className="text-[10px] font-mono text-text-low uppercase tracking-widest">{m.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm font-bold text-text-high group-hover:text-accent-orange transition-colors">
                View Case Study <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </Container>
    </section>
  );
}

// ── Project Grid Card ──
export function ProjectItemCard({ project }: { project: Project }) {
  const getIcon = (category: string) => {
    switch (category) {
      case "AI & Machine Learning": return <Cpu size={14} />;
      case "Automation & RPA": return <Workflow size={14} />;
      case "ERP & Enterprise Software": return <Database size={14} />;
      case "Websites & SaaS Platforms": return <Globe size={14} />;
      case "Mobile Applications": return <Smartphone size={14} />;
      case "Cloud & DevOps": return <Cloud size={14} />;
      case "Data & Analytics": return <BarChart3 size={14} />;
      case "Modernization & Migration": return <RefreshCw size={14} />;
      case "Startup MVPs": return <Rocket size={14} />;
      default: return <Zap size={14} />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      <Link href={`/portfolio/${project.slug}`} className="group block">
        <div className="bg-obsidian border border-border-dim transition-all duration-500 hover:border-accent-orange p-3">
          {/* Card Media */}
          <div className="relative aspect-[4/3] overflow-hidden mb-6 border border-border-dim/50">
            <Image 
              src={project.thumbnail} 
              alt={project.title} 
              fill 
              className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-105 group-hover:scale-110"
            />
            {/* Hover HUD Overlay */}
            <div className="absolute flex flex-col justify-center items-center inset-0 bg-accent-orange/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <div className="p-4 border border-obsidian/20">
                 <ArrowUpRight size={32} className="text-obsidian" />
               </div>
               <span className="mt-4 font-mono text-[10px] uppercase font-bold text-obsidian tracking-widest leading-none">Initialize Case Study</span>
            </div>
          </div>

          {/* Card Info */}
          <div className="px-3 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-accent-orange">{getIcon(project.category)}</span>
              <span className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">{project.category}</span>
            </div>

            <h4 className="text-xl font-display font-bold text-text-high group-hover:text-accent-orange transition-colors mb-2">
              {project.title}
            </h4>
            
            <p className="text-xs font-mono text-text-low mb-6 line-clamp-2 leading-relaxed">
              {project.description}
            </p>

            <div className="pt-4 border-t border-border-dim flex justify-between items-center text-[10px] font-mono">
              <span className="text-text-low">{project.industry}</span>
              <span className="text-accent-orange font-bold uppercase tracking-tight">{project.metrics[0]?.value} {project.metrics[0]?.label}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
