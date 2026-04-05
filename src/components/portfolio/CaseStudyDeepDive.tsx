"use client";

import React from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  Quote, 
  Calendar, 
  Target, 
  Layers,
  ArrowUpRight
} from "lucide-react";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";

// ── Case Study Challenge & Goals ──
export function CaseStudyChallenge({ data }: { data: Project }) {
  return (
    <section className="section-padding bg-obsidian">
      <Container>
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-7">
            <Badge variant="dim" className="mb-6">The Challenge</Badge>
            <h2 className="text-4xl font-display font-medium text-text-high mb-8 tracking-tight">Understanding the <span className="text-accent-orange">Friction.</span></h2>
            <p className="text-xl text-text-low leading-relaxed font-mono border-l-2 border-border-dim pl-8">
              {data.challenge}
            </p>
          </div>
          
          <div className="lg:col-span-5 bg-surface-100 p-10 border border-border-dim">
            <div className="flex items-center gap-3 mb-8">
              <Target className="text-accent-orange" size={20} />
              <h3 className="text-xl font-display font-medium text-text-high">Project Goals</h3>
            </div>
            <ul className="space-y-6">
              {data.goals.map((goal, i) => (
                <li key={i} className="flex gap-4 group">
                  <span className="text-accent-orange font-mono text-sm pt-1">0{i+1}.</span>
                  <span className="text-sm font-mono text-text-low group-hover:text-text-high transition-colors">{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Case Study Process Map ──
export function CaseStudyProcess({ process }: { process: { step: string; description: string }[] }) {
  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim">
      <Container>
        <div className="mb-16">
          <Badge variant="dim" className="mb-4">The Blueprint</Badge>
          <h2 className="text-4xl font-display font-medium text-text-high tracking-tight">Our strategic <span className="text-accent-neon">Protocol.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {process.map((p, i) => (
            <motion.div 
              key={p.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative p-10 bg-obsidian border border-border-dim group hover:border-accent-neon transition-colors"
            >
              <div className="absolute top-0 right-0 p-4 font-mono text-4xl font-bold text-border-dim/20 group-hover:text-accent-neon/10 transition-colors">
                0{i+1}
              </div>
              <div className="flex items-center gap-3 mb-6">
                 <div className="w-2 h-2 rounded-full bg-accent-neon" />
                 <h4 className="text-lg font-display font-bold text-text-high">{p.step}</h4>
              </div>
              <p className="text-sm font-mono text-text-low leading-relaxed">
                {p.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Results Dashboard ──
export function ResultsDashboard({ metrics, detailedResults }: { 
  metrics: { label: string, value: string }[], 
  detailedResults?: { title: string, count: string, description: string }[] 
}) {
  return (
    <section className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background Grid Decor */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <Container className="relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="orange" className="mb-6">Business Impact</Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tighter">Quantifiable <span className="text-accent-orange italic">Velocity.</span></h2>
        </div>

        {/* Primary Metrics Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 px-1 bg-border-dim/20 mb-1">
          {metrics.map((m, i) => (
            <div key={i} className="bg-obsidian p-12 text-center border border-border-dim/30">
               <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 whileInView={{ scale: 1, opacity: 1 }}
                 className="text-5xl lg:text-7xl font-display font-bold text-accent-orange mb-4"
               >
                 {m.value}
               </motion.div>
               <div className="text-xs font-mono text-text-low uppercase tracking-[0.3em]">{m.label}</div>
            </div>
          ))}
        </div>

        {/* Detailed KPI Cards */}
        {detailedResults && (
          <div className="grid md:grid-cols-2 gap-px bg-border-dim/20 mt-1">
            {detailedResults.map((res, i) => (
              <div key={i} className="bg-surface-100 p-10 flex items-start gap-8">
                <div className="text-4xl font-display font-bold text-text-high">{res.count}</div>
                <div>
                   <h5 className="text-sm font-mono font-bold text-text-high uppercase mb-2 tracking-wider">{res.title}</h5>
                   <p className="text-xs font-mono text-text-low leading-relaxed">{res.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

// ── Case Study Testimonial ──
export function CaseStudyTestimonial({ testimonial }: { 
  testimonial?: { quote: string, author: string, role: string, company: string, companyLogo?: string } 
}) {
  if (!testimonial) return null;

  return (
    <section className="section-padding bg-surface-200 border-y border-border-dim">
      <Container>
        <div className="max-w-5xl mx-auto relative group">
          {/* Decorative Quote Icon */}
          <div className="absolute -top-12 -left-12 opacity-10 group-hover:opacity-20 transition-opacity">
            <Quote size={120} className="text-accent-orange" />
          </div>

          <div className="relative z-10 p-12 md:p-20 bg-obsidian border border-border-dim shadow-2xl">
            <p className="text-2xl md:text-4xl font-display font-medium text-text-high mb-12 italic leading-tight">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            
            <div className="flex items-center justify-between border-t border-border-dim pt-10">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-surface-200 border border-border-dim flex items-center justify-center overflow-hidden font-display text-2xl font-bold text-accent-orange uppercase">
                   {testimonial.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xl font-display font-bold text-text-high">{testimonial.author}</div>
                  <div className="text-sm font-mono text-text-low">{testimonial.role} @ {testimonial.company}</div>
                </div>
              </div>
              
              {testimonial.companyLogo && (
                <div className="hidden md:block">
                  <Image src={testimonial.companyLogo} alt={testimonial.company} width={120} height={40} className="opacity-50 grayscale hover:grayscale-0 transition-all" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── High-Fidelity Case Study Hero ──
export function CaseStudyHero({ data }: { data: Project }) {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-obsidian">
       {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-orange/5 to-transparent blur-3xl pointer-events-none" />
      
      <Container>
        <Link 
          href="/portfolio" 
          className="inline-flex items-center gap-2 text-text-low hover:text-accent-orange font-mono text-[10px] uppercase tracking-widest mb-12 transition-colors group"
        >
          <ArrowRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="flex items-center gap-3 mb-8">
               <span className="w-8 h-px bg-accent-orange" />
               <Badge variant="dim">{data.category}</Badge>
            </div>
            
            <h1 className="text-display lg:text-8xl font-display font-bold text-text-high leading-[0.95] mb-10 tracking-tighter">
              {data.title}
            </h1>

            <div className="grid grid-cols-2 gap-12 py-10 border-y border-border-dim/30">
               <div>
                  <div className="text-[10px] font-mono text-text-low uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Target size={12} className="text-accent-orange" />
                    Client
                  </div>
                  <div className="text-lg font-display font-bold text-text-high">{data.client}</div>
               </div>
               <div>
                  <div className="text-[10px] font-mono text-text-low uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Calendar size={12} className="text-accent-orange" />
                    Timeline
                  </div>
                  <div className="text-lg font-display font-bold text-text-high">{data.timeline}</div>
               </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-3">
               {data.techStack.map(tech => (
                 <span key={tech} className="px-4 py-2 bg-surface-100 border border-border-dim text-[10px] font-mono text-text-low uppercase tracking-wider">
                   {tech}
                 </span>
               ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square lg:aspect-[4/5] border border-border-dim overflow-hidden shadow-2xl group"
          >
            <Image 
              src={data.thumbnail} 
              alt={data.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
               <div className="text-[10px] font-mono text-accent-orange uppercase tracking-widest mb-2">Primary Result</div>
               <div className="text-3xl font-display font-bold text-text-high">{data.results.split('|')[0]}</div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── Portfolio CTA ──
export function PortfolioCTA() {
  return (
    <section className="py-24 lg:py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute inset-0 bg-accent-orange/5 mix-blend-overlay" />
      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-7xl font-display font-bold text-text-high mb-8 tracking-tighter leading-[0.9]">
            Ready to engineer your <br />
            <span className="text-accent-orange italic text-stroke">Success Story?</span>
          </h2>
          <p className="text-xl text-text-low mb-12 font-mono max-w-2xl mx-auto leading-relaxed">
            Let&apos;s build a technical partnership that transforms your specific challenges into market-leading case studies.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              href="/contact" 
              className="w-full sm:w-auto px-10 py-5 bg-accent-orange text-obsidian font-bold rounded-sm hover:translate-y-[-2px] transition-all flex items-center justify-center gap-2 group"
            >
              Start Your Project <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link 
              href="/services" 
              className="w-full sm:w-auto px-10 py-5 bg-surface-100 text-text-high border border-border-dim font-bold rounded-sm hover:bg-surface-200 transition-colors"
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
