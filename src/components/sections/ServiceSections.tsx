"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { ServiceSolution, ServiceCapability, ServiceProcess } from "@/types";
import { motion } from "framer-motion";
import * as IconMap from "lucide-react";
import React from "react";

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
      staggerChildren: 0.05,
    }
  },
  viewport: { once: true }
};

const staggerItem: any = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

// --- About Service ---
export function ServiceAbout({ data }: { data: { description: string, whyNeeded: string, problemsSolved: string[] } }) {
  return (
    <section className="section-padding bg-surface-100 border-t border-border-dim">
      <Container>
        <div className="grid lg:grid-cols-2 gap-16 md:gap-24 text-reveal-container">
          <motion.div {...fadeInUp}>
            <Badge className="mb-6">Perspective</Badge>
            <h2 className="text-h2 font-display font-medium text-text-high mb-8 tracking-tight">
              The Blueprint for <span className="text-accent-orange">Intelligent Scale.</span>
            </h2>
            <p className="text-body-lg text-text-low leading-relaxed mb-8">
              {data.description}
            </p>
          </motion.div>
          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-xl font-mono text-text-high mb-6 flex items-center">
               <span className="text-accent-orange mr-4">❯</span>
               Why Now?
            </h3>
            <p className="text-body text-text-low mb-12 font-mono text-sm leading-relaxed border-l border-border-dim pl-6 py-2">
              {data.whyNeeded}
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {data.problemsSolved.map((problem) => (
                <div key={problem} className="flex gap-3 group">
                  <span className="text-accent-orange font-mono text-sm group-hover:translate-x-1 transition-transform">❯</span>
                  <span className="text-sm font-mono text-text-high opacity-70 group-hover:opacity-100 transition-all">{problem}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// --- Solutions Grid ---
export function SolutionsGrid({ solutions }: { solutions: ServiceSolution[] }) {
  return (
    <section className="section-padding bg-obsidian relative overflow-hidden" id="solutions">
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-accent-orange/30 to-transparent" />
      <Container>
        <motion.div {...fadeInUp} className="mb-16">
          <Badge variant="dim" className="mb-6">Core Solutions</Badge>
          <h2 className="text-h2 font-display font-semibold text-text-high tracking-tight">
             Built to <span className="text-gradient-orange">Dominate Complexity.</span>
          </h2>
        </motion.div>
        <motion.div 
          variants={staggerContainer}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-border-dim"
        >
          {solutions.map((solution) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconRender = (IconMap as any)[solution.icon] || IconMap.Code2;
            return (
              <motion.div 
                key={solution.title} 
                variants={staggerItem}
                className="group p-10 border-r border-b border-border-dim relative overflow-hidden transition-colors hover:bg-surface-100/50"
              >
                {/* Full Circle Border meeting at Bottom-Right */}
                <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 ease-in-out z-20" />
                <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover:h-full transition-all duration-500 delay-500 ease-in-out z-20" />
                <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover:h-full transition-all duration-500 ease-in-out z-20" />
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 delay-500 ease-in-out z-20" />

                <div className="relative z-10">
                  <div className="w-10 h-10 mb-8 text-text-high opacity-30 group-hover:opacity-100 group-hover:text-accent-orange transition-all duration-500">
                    <IconRender size={32} strokeWidth={1} />
                  </div>
                  <h3 className="text-xl font-display font-medium text-text-high mb-4">
                    {solution.title}
                  </h3>
                  <p className="text-sm font-mono text-text-low leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                    {solution.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}

// --- Tech Stack ---
export function TechStackCards({ techStack }: { techStack: { category: string, items: string[] }[] }) {
  if (!techStack || techStack.length === 0) return null;
  return (
    <section className="section-padding bg-surface-100">
      <Container>
        <motion.div {...fadeInUp} className="mb-16 text-center">
          <Badge variant="dim" className="mb-6">Elite Tech Stack</Badge>
          <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
            The <span className="text-accent-orange">Machinery</span> Behind the Code.
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techStack.map((category, idx) => (
            <motion.div 
              key={category.category} 
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: idx * 0.1 }}
              className="p-8 border border-border-dim bg-obsidian/50 rounded-sm"
            >
              <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-6">
                {category.category}
              </div>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span key={item} className="px-3 py-1.5 bg-surface-100 border border-border-dim text-xs font-mono text-text-high rounded-sm">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// --- Process Timeline ---
export function ProcessTimeline({ process }: { process: ServiceProcess[] }) {
  return (
    <section className="section-padding bg-obsidian relative overflow-hidden" id="process">
      <Container>
        <motion.div {...fadeInUp} className="mb-16">
          <Badge className="mb-6">Engineering Process</Badge>
          <h2 className="text-h2 font-display font-semibold text-text-high tracking-tight">
            The <span className="text-gradient-orange">Factory Protocol.</span>
          </h2>
        </motion.div>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-px bg-border-dim hidden lg:block" />
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
          >
            {process.map((step, index) => (
              <motion.div 
                key={step.title} 
                variants={staggerItem}
                className="relative z-10 pt-12 group"
              >
                <div className="absolute top-0 left-0 text-3xl font-mono font-bold text-border-dim group-hover:text-accent-orange transition-colors duration-500 opacity-20">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-lg font-display font-medium text-text-high mb-4">{step.title}</div>
                <p className="text-xs font-mono text-text-low leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
