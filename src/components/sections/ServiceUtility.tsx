"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { ServiceCapability, FAQItem } from "@/types";
import { motion } from "framer-motion";
import { Plus, Minus, ArrowRight } from "lucide-react";
import * as IconMap from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

// Animation Variants
const fadeInUp: any = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" }
};

const staggerContainer: any = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    }
  },
  viewport: { once: true }
};

const staggerItem: any = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// --- Capabilities List ---
export function CapabilitiesList({ capabilities }: { capabilities: ServiceCapability[] }) {
  return (
    <section className="section-padding bg-surface-100" id="capabilities">
      <Container>
        <motion.div {...fadeInUp} className="mb-16">
          <Badge className="mb-6">Core Capabilities</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
            High-Performance <span className="text-accent-orange">Modules.</span>
          </h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {capabilities.map((cap, index) => (
            <motion.div 
              key={cap.title} 
              variants={staggerItem}
              className="group p-8 border border-border-dim bg-obsidian transition-all hover:border-accent-orange/30"
            >
              <div className="grid lg:grid-cols-4 gap-8 items-center">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-xs text-text-low opacity-40">0{index + 1}</span>
                  <h3 className="text-xl font-display font-medium text-text-high">{cap.title}</h3>
                </div>
                <div className="lg:col-span-2 text-sm font-mono text-text-low leading-relaxed">
                  {cap.description}
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-mono text-accent-orange uppercase tracking-widest mb-1">Business Outcome</div>
                  <div className="text-sm font-mono text-text-high">{cap.outcome}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// --- Benefits Grid ---
export function BenefitsGrid({ benefits }: { benefits: { title: string, description: string, icon: string }[] }) {
  return (
    <section className="section-padding bg-obsidian">
      <Container>
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <Badge variant="dim" className="mb-6">Business Value</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
             Measurable <span className="text-gradient-orange">Impact.</span>
          </h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          whileInView="whileInView"
          initial="initial"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefits.map((benefit) => (
            <motion.div 
              key={benefit.title} 
              variants={staggerItem}
              className="p-8 border-l border-border-dim transition-all hover:border-accent-orange"
            >
              <h3 className="text-lg font-display font-medium text-text-high mb-4">{benefit.title}</h3>
              <p className="text-sm font-mono text-text-low leading-relaxed opacity-60">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// --- Detailed FAQ ---
export function DetailedFAQ({ faq }: { faq: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-surface-100 border-t border-border-dim" id="faq">
      <Container size="narrow">
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <Badge variant="dim" className="mb-6">F.A.Q.</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high">Common Questions.</h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faq.map((item, index) => (
            <motion.div 
              key={item.question} 
              variants={staggerItem}
              className="border border-border-dim bg-obsidian rounded-sm overflow-hidden"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between group"
              >
                <span className="font-mono text-sm text-text-high group-hover:text-accent-orange transition-colors">
                  {item.question}
                </span>
                {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openIndex === index && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="px-6 pb-6 text-sm font-mono text-text-low leading-relaxed"
                >
                  {item.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

// --- Final CTA ---
export function FinalCTASection({ data }: { data: { headline: string, description: string, buttonLabel: string } }) {
  return (
    <section className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-neon/10 blur-[100px] rounded-full" />
      
      <Container size="narrow">
        <motion.div {...fadeInUp} className="relative z-10 glass-card p-16 text-center border border-border-dim/50">
          <h2 className="text-h1 font-display font-medium text-text-high mb-8 tracking-tight">
            {data.headline}
          </h2>
          <p className="text-body text-text-low mb-12 max-w-lg mx-auto font-mono text-sm uppercase tracking-widest leading-relaxed">
            {data.description}
          </p>
          <Button size="lg" href="/contact" className="group">
            {data.buttonLabel}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}

// --- Industry Verticals ---
export function IndustryVerticals({ industries }: { industries: (string | { name: string; useCase: string })[] }) {
  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim">
      <Container>
        <motion.div {...fadeInUp} className="mb-16">
          <Badge className="mb-6">Domain Expertise</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
             Sectors We <span className="text-accent-orange">Empower.</span>
          </h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {industries.map((industry) => {
            const isObject = typeof industry === 'object';
            const name = isObject ? industry.name : industry;
            const useCase = isObject ? industry.useCase : null;

            return (
              <motion.div 
                key={name} 
                variants={staggerItem}
                className="p-8 border border-border-dim bg-obsidian flex flex-col justify-center gap-4 group hover:border-accent-orange transition-all duration-500"
              >
                <span className="text-xs font-mono text-text-high opacity-40 group-hover:opacity-100 group-hover:text-accent-orange uppercase tracking-[0.2em] transition-all">
                  {name}
                </span>
                {useCase && (
                  <p className="text-xs font-mono text-text-low leading-relaxed opacity-0 group-hover:opacity-60 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                    {useCase}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// --- Demo Showcase ---
export function DemoShowcase({ slug }: { slug: string }) {
  return (
    <section className="section-padding bg-obsidian relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border-dim to-transparent" />
      <Container>
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <Badge variant="dim" className="mb-6">The Lab</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
             Experience the <span className="text-gradient-orange">Prototype.</span>
          </h2>
        </motion.div>
        <motion.div {...fadeInUp} className="aspect-video w-full border border-border-dim bg-surface-100 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2600&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card p-10 backdrop-blur-md border border-border-dim text-center">
                <div className="text-xs font-mono text-accent-orange uppercase tracking-widest mb-4">Autonomous Bot Analysis</div>
                <h3 className="text-xl font-display text-text-high mb-6">Real-time Process Stream & Decision Logic</h3>
                <div className="flex justify-center gap-4 mb-6">
                  <div className="px-3 py-1 bg-accent-orange/10 border border-accent-orange/30 rounded-full text-[10px] font-mono text-accent-orange uppercase tracking-widest">
                    Live Logs
                  </div>
                  <div className="px-3 py-1 bg-surface-100 border border-border-dim rounded-full text-[10px] font-mono text-text-low uppercase tracking-widest">
                    Execution Node 07
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-accent-orange flex items-center justify-center mx-auto text-accent-orange hover:bg-accent-orange hover:text-obsidian transition-all cursor-pointer">
                   <IconMap.Play size={20} fill="currentColor" />
                </div>
              </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

// --- Case Study Highlight ---
export function CaseStudyHighlight({ caseStudy }: { caseStudy: { projectSlug: string, overview?: string } }) {
  return (
    <section className="section-padding bg-surface-100 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-accent-orange/5 blur-3xl pointer-events-none" />
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeInUp}>
            <Badge className="mb-6">Case Study</Badge>
            <h2 className="text-h2 font-display font-medium text-text-high mb-8 tracking-tight">
               Proven results in <span className="text-accent-orange">Production.</span>
            </h2>
            <p className="text-body-lg text-text-low leading-relaxed mb-12 font-mono text-sm border-l border-accent-orange pl-8">
              {caseStudy.overview}
            </p>
            <Button size="lg" href={`/portfolio/${caseStudy.projectSlug}`} className="group drop-shadow-lg shadow-accent-orange/50">
              Read Detailed Case Study
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            className="aspect-square bg-obsidian border border-border-dim relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-orange/20 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center p-12">
               <div className="p-8 border border-border-dim bg-surface-100 rounded-sm">
                  <div className="font-mono text-[10px] text-text-low uppercase mb-4 tracking-widest">Performance Metric</div>
                  <div className="text-6xl font-display font-bold text-accent-orange mb-2 group-hover:scale-110 transition-transform">+300%</div>
                  <div className="text-sm font-mono text-text-high opacity-70">Efficiency Increase</div>
               </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
// --- Tool Brand Logos ---
export function ToolBrandLogos({ logos }: { logos: { name: string, logo: string }[] }) {
  // Duplicate logos multiple times for absolute seamlessness
  const scrollLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-24 bg-obsidian border-y border-border-dim overflow-hidden relative">
      {/* Premium Fade Gradients */}
      <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-obsidian via-obsidian/80 to-transparent z-10" />
      
      <Container className="mb-14">
        <div className="text-center">
          <Badge variant="dim" className="mb-6">The Machinery</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
             Ecosystem <span className="text-accent-orange">Platforms.</span>
          </h2>
        </div>
      </Container>

      <div className="relative flex overflow-hidden">
        <motion.div 
          className="flex whitespace-nowrap gap-20 items-center py-4"
          initial={{ x: 0 }}
          animate={{
            x: "-50%", 
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ width: "fit-content" }}
        >
          {scrollLogos.map((tool, index) => (
            <div key={`${tool.name}-${index}`} className="flex-shrink-0 flex items-center justify-center group px-10">
              <img 
                src={tool.logo} 
                alt={tool.name} 
                className="h-8 md:h-10 w-auto object-contain brightness-0 invert opacity-30 group-hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  // Fallback to text if logo fails
                  (e.target as any).style.display = 'none';
                  (e.target as any).nextSibling.style.display = 'block';
                }}
              />
              <span className="hidden font-mono text-xs text-text-low uppercase tracking-widest group-hover:text-accent-orange transition-colors">
                {tool.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
