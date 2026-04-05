"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Globe } from "lucide-react";
import Link from "next/link";

interface CaseStudyHeroProps {
  data: {
    title: string;
    client: string;
    industry: string;
    timeline: string;
    thumbnail: string;
  };
}

export function CaseStudyHero({ data }: CaseStudyHeroProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-obsidian">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-orange/5 to-transparent blur-3xl pointer-events-none" />
      
      <Container>
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-text-low hover:text-accent-orange font-mono text-xs mb-12 transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 items-end">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="dim" className="mb-6">{data.industry}</Badge>
            </motion.div>
            
            <h1 className="text-display font-display font-bold text-text-high leading-tight mb-8">
              {data.title}
            </h1>

            <div className="grid grid-cols-2 gap-12 pt-12 border-t border-border-dim/30">
              <div>
                <div className="flex items-center gap-2 text-text-low font-mono text-[10px] uppercase tracking-widest mb-2">
                  <User size={12} className="text-accent-orange" />
                  Client
                </div>
                <div className="text-sm font-mono text-text-high">{data.client}</div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-text-low font-mono text-[10px] uppercase tracking-widest mb-2">
                  <Clock size={12} className="text-accent-orange" />
                  Timeline
                </div>
                <div className="text-sm font-mono text-text-high">{data.timeline}</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] rounded-sm border border-border-dim overflow-hidden relative group shadow-2xl"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${data.thumbnail})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export function MetricsStrip({ metrics }: { metrics: { label: string, value: string }[] }) {
  return (
    <div className="bg-surface-200 border-y border-border-dim py-12">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="group">
              <div className="text-3xl font-display font-bold text-accent-orange mb-2 group-hover:scale-110 transition-transform origin-left">
                {metric.value}
              </div>
              <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export function CaseStudyDetails({ challenge, solution }: { challenge: string, solution: string }) {
  return (
    <section className="section-padding bg-obsidian">
      <Container>
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-2xl font-display font-medium text-text-high mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-accent-orange" />
              The Challenge
            </h2>
            <p className="text-body text-text-low leading-relaxed font-mono text-sm border-l border-border-dim pl-8">
              {challenge}
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-display font-medium text-text-high mb-8 flex items-center gap-4">
              <span className="w-8 h-px bg-accent-neon" />
              The Engineering Solution
            </h2>
            <p className="text-body text-text-low leading-relaxed font-mono text-sm border-l border-accent-neon pl-8">
              {solution}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export function ProjectNav({ prevSlug, nextSlug }: { prevSlug?: string, nextSlug?: string }) {
  return (
    <section className="bg-obsidian border-t border-border-dim">
      <div className="flex h-[200px] divide-x divide-border-dim">
        {prevSlug ? (
          <Link 
            href={`/portfolio/${prevSlug}`}
            className="group relative flex-1 flex flex-col justify-center items-start px-8 lg:px-16 overflow-hidden transition-all duration-700"
          >
            {/* Animated Background Block */}
            <div className="absolute inset-0 bg-accent-orange/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            
            <div className="relative z-10">
              <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                <ArrowLeft size={12} className="group-hover:-translate-x-2 transition-transform" />
                Previous Project
              </div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-text-high uppercase tracking-tighter group-hover:text-accent-orange transition-colors">
                {prevSlug.replace(/-/g, ' ')}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 bg-surface-100/30" />
        )}

        {nextSlug ? (
          <Link 
            href={`/portfolio/${nextSlug}`}
            className="group relative flex-1 flex flex-col justify-center items-end text-right px-8 lg:px-16 overflow-hidden transition-all duration-700"
          >
            <div className="absolute inset-0 bg-accent-neon/10 translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
            
            <div className="relative z-10">
              <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.3em] mb-4 flex items-center justify-end gap-3">
                Next Case Study
                <Globe size={12} className="group-hover:translate-x-2 transition-transform text-accent-neon" />
              </div>
              <div className="text-2xl lg:text-3xl font-display font-bold text-text-high uppercase tracking-tighter group-hover:text-accent-neon transition-colors">
                {nextSlug.replace(/-/g, ' ')}
              </div>
            </div>
          </Link>
        ) : (
          <div className="flex-1 bg-surface-100/30" />
        )}
      </div>
    </section>
  );
}
