"use client";

import React, { useState } from "react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowUpRight, 
  Globe, 
  Link as LinkIcon, 
  MessageCircle, 
  ChevronRight,
  Plus,
  Cpu,
  Layers,
  Workflow,
  ShieldCheck,
  Layout,
  Rocket,
  Zap,
  LineChart,
  Search
} from "lucide-react";
import { 
  ABOUT_METRICS, 
  CORE_VALUES, 
  ENGINEERING_PROTOCOL, 
  INDUSTRIES, 
  TEAM_MEMBERS,
  MILESTONES 
} from "@/constants/about";
import Image from "next/image";
import Link from "next/link";

// ── 1. About Hero ──
export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-40 overflow-hidden bg-obsidian">
      {/* Background Cinematic Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent-orange/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute -left-20 top-1/4 w-[400px] h-[400px] bg-accent-neon/5 blur-[120px] rounded-full" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="orange" className="mb-8 uppercase tracking-[0.3em]">Our Identity</Badge>
            <h1 className="text-display lg:text-[110px] font-display font-bold text-text-high leading-[0.85] mb-12 tracking-tighter">
              Engineering <span className="text-accent-orange italic">Velocity.</span><br />
              Architecting <span className="text-border-dim text-stroke">Legacy.</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
              <p className="text-xl text-text-low max-w-xl leading-relaxed italic font-mono border-l-2 border-accent-orange pl-8">
                Invinsible Tech is a premium software studio dedicated to orchestrating hyperscale business architectures through strategic AI and autonomous workflows.
              </p>
              
              <div className="pt-2">
                <div className="text-[10px] font-mono text-text-low uppercase tracking-widest mb-4">Mission Control</div>
                <p className="text-sm font-mono text-text-high max-w-xs leading-relaxed">
                  To eliminate human operational bottlenecks and empower the next generation of global industry giants.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

// ── 2. Company Story & Milestones ──
export function AboutStory() {
  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim">
      <Container>
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          <div className="lg:col-span-7">
            <Badge variant="dim" className="mb-6">The Origin</Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight mb-8">
              A Stealth Powerhouse <br />
              <span className="text-accent-neon">Born in the AI Era.</span>
            </h2>
            <div className="space-y-6 text-text-low font-mono text-sm leading-relaxed">
              <p>
                Founded in 2019, Invinsible Tech started as an elite development lab for high-growth startups in Silicon Valley. Our mission was simple: build the invisible plumbing that powers global innovation.
              </p>
              <p>
                As the AI era matured, we pivoted into a full-scale Product Studio, focusing on complex enterprise migrations and autonomous business processes. We don't just write code; we solve high-stakes operational puzzles.
              </p>
            </div>
          </div>
          
          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-border-dim/20 border border-border-dim">
            {ABOUT_METRICS.slice(0, 4).map((m, i) => (
              <div key={i} className="bg-obsidian p-10 text-center group transition-colors hover:bg-surface-200">
                <div className="text-3xl font-display font-bold text-text-high mb-2">{m.value}</div>
                <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">{m.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestone Rail */}
        <div className="relative pt-12 border-t border-border-dim/50 overflow-x-auto scrollbar-hide">
           <div className="flex gap-16 min-w-[1200px]">
              {MILESTONES.map((m, i) => (
                <div key={i} className="flex-1">
                   <div className="text-accent-orange font-display font-bold text-lg mb-4">{m.year}</div>
                   <h4 className="text-text-high font-mono text-xs uppercase mb-2 tracking-widest">{m.title}</h4>
                   <p className="text-text-low font-mono text-[11px] leading-relaxed line-clamp-3">{m.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </Container>
    </section>
  );
}

// ── 3. Mission & Values ──
export function AboutValues() {
  return (
    <section className="section-padding bg-obsidian relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge variant="orange" className="mb-4">Our DNA</Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight">
            The Principles of <span className="text-accent-orange italic text-stroke">Absolute Rigor.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CORE_VALUES.map((val, i) => (
            <motion.div 
              key={val.title}
              whileHover={{ y: -5 }}
              className="p-8 bg-surface-100 border border-border-dim hover:border-accent-orange transition-all group"
            >
              <div className="mb-6 text-accent-orange group-hover:scale-110 transition-transform origin-left">
                <val.icon size={28} />
              </div>
              <h3 className="text-lg font-display font-bold text-text-high mb-4 uppercase tracking-tighter">{val.title}</h3>
              <p className="text-xs font-mono text-text-low leading-relaxed line-clamp-4">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── 6. Engineering Protocol (Process) ──
export function AboutProcess() {
  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim relative overflow-hidden">
      <Container>
        <div className="mb-20">
          <Badge variant="dim" className="mb-4">The Workflow</Badge>
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight">
            The Engineering <span className="text-accent-neon">Protocol.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-7 gap-px bg-border-dim/30 border border-border-dim overflow-hidden">
          {ENGINEERING_PROTOCOL.map((p, i) => (
            <motion.div 
              key={p.step}
              whileHover={{ backgroundColor: "rgba(255, 107, 0, 0.05)" }}
              className="bg-obsidian p-8 border-b lg:border-b-0 border-border-dim/50 group"
            >
              <div className="font-mono text-8xl font-bold text-border-dim/10 group-hover:text-accent-neon/5 transition-colors absolute top-0 -right-4">
                {i+1}
              </div>
              <div className="mb-12">
                <div className="text-[10px] font-mono text-accent-neon uppercase tracking-widest mb-2">{p.step}</div>
                <h4 className="text-md font-display font-bold text-text-high leading-tight">{p.title}</h4>
              </div>
              <p className="text-[11px] font-mono text-text-low leading-relaxed group-hover:text-text-high transition-colors">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── 9. Team Collective Grid ──
export function AboutTeam() {
  return (
    <section className="section-padding bg-obsidian">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <Badge variant="dim" className="mb-4">The Collective</Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight">
              Elite Engineering <br />
              <span className="text-accent-orange">Talent.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm font-mono text-text-low leading-relaxed border-l-2 border-border-dim pl-8">
            Our studio is composed of high-performance architects and specialists who have delivered mission-critical systems for global industry leaders.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, i) => (
            <div key={member.name} className="group">
              <div className="relative aspect-[4/5] border border-border-dim overflow-hidden mb-6 filter grayscale hover:grayscale-0 transition-all duration-700 shadow-xl">
                 <Image src={member.image} alt={member.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                 <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-accent-orange">
                    <p className="text-[10px] font-mono text-obsidian italic font-bold leading-relaxed">
                      &ldquo;{member.bio.substring(0, 100)}...&rdquo;
                    </p>
                 </div>
              </div>
              <div>
                <h4 className="text-xl font-display font-bold text-text-high group-hover:text-accent-orange transition-colors mb-2 italic">
                  {member.name}
                </h4>
                <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] mb-4">{member.role}</div>
                <div className="flex items-center gap-4 text-text-low">
                   <Link href={member.links.linkedin || "#"} className="hover:text-accent-orange transition-colors"><LinkIcon size={16} /></Link>
                   <Link href={member.links.github || "#"} className="hover:text-accent-orange transition-colors"><Globe size={16} /></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── 7. Industries We Serve ──
export function AboutIndustries() {
  return (
     <section id="industries" className="section-padding bg-surface-100 border-y border-border-dim">
        <Container>
           <div className="mb-16">
              <Badge variant="dim" className="mb-4">Global Reach</Badge>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight">
                 Cross-Sector <br />
                 <span className="text-accent-orange text-stroke text-obsidian">Impact.</span>
              </h2>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-dim/20 border border-border-dim">
              {INDUSTRIES.map((ind) => (
                <div key={ind.id} className="bg-obsidian p-10 group hover:bg-surface-200 transition-all">
                   <div className="mb-8 text-text-low group-hover:text-accent-orange transition-colors">
                      <ind.icon size={32} />
                   </div>
                   <h4 className="text-lg font-display font-bold text-text-high mb-4 uppercase tracking-tighter">{ind.name}</h4>
                   <p className="text-xs font-mono text-text-low leading-relaxed group-hover:text-text-high transition-colors">{ind.desc}</p>
                </div>
              ))}
           </div>
        </Container>
     </section>
  );
}

// ── 12. Careers / Join Us ──
export function AboutJoinUs() {
  return (
    <section className="py-24 bg-obsidian">
       <Container>
          <div className="p-12 lg:p-24 border border-border-dim bg-surface-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-orange/5 -skew-x-12 translate-x-1/2" />
             
             <div className="relative z-10 max-w-2xl">
                <Badge variant="orange" className="mb-8">Join the Elite</Badge>
                <h2 className="text-4xl lg:text-7xl font-display font-bold text-text-high mb-10 tracking-tighter leading-[0.9]">
                   Ready to Build <br />
                   <span className="italic text-accent-orange">The Future?</span>
                </h2>
                <p className="text-lg font-mono text-text-low mb-12 leading-relaxed">
                   We are always seeking hyper-productive engineers and designers who obsess over technical elegance and radical automation.
                </p>
                <Link href="/careers" className="inline-flex items-center gap-4 text-sm font-bold text-text-high hover:text-accent-orange transition-all uppercase tracking-widest group/btn">
                   View Careers <ArrowUpRight size={20} className="group-hover/btn:translate-x-2 group-hover/btn:-translate-y-2 transition-transform" />
                </Link>
             </div>
          </div>
       </Container>
    </section>
  );
}

// ── 8. Technology Marquees ──
export function AboutTech() {
  const TECH_LOGOS = [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" }
  ];

  return (
    <section className="py-20 bg-surface-100 border-b border-border-dim overflow-hidden">
       <div className="text-center mb-16">
          <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.4em] mb-4">Elite Tech Stack</div>
       </div>
       <div className="flex gap-20 animate-marquee whitespace-nowrap group">
          {[...TECH_LOGOS, ...TECH_LOGOS].map((tech, i) => (
            <div key={i} className="flex items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0">
               <Image src={tech.icon} alt={tech.name} width={40} height={40} className="w-10 h-10 object-contain" />
               <span className="text-2xl font-display font-bold text-text-high tracking-tighter uppercase">{tech.name}</span>
            </div>
          ))}
       </div>
    </section>
  );
}

// ── 10. Achievements & Metrics ──
export function AboutMetricsDashboard() {
  return (
    <section className="section-padding bg-obsidian relative">
       <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-dim/20 border border-border-dim overflow-hidden">
             {ABOUT_METRICS.map((m, i) => (
                <div key={i} className="bg-surface-100 p-16 text-center group hover:bg-surface-200 transition-all duration-500">
                   <motion.div 
                     initial={{ scale: 0.8, opacity: 0 }}
                     whileInView={{ scale: 1, opacity: 1 }}
                     className="text-6xl font-display font-bold text-accent-orange mb-4 tracking-tighter"
                   >
                      {m.value}
                   </motion.div>
                   <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.3em] font-bold">{m.label}</div>
                </div>
             ))}
          </div>
       </Container>
    </section>
  );
}

// ── 11. Testimonials Slider ──
export function AboutTestimonials() {
  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim">
       <Container>
          <div className="max-w-4xl mx-auto text-center">
             <div className="mb-16">
                <Badge variant="dim">Global Trust</Badge>
             </div>
             
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="relative p-12 lg:p-20 bg-obsidian border border-border-dim shadow-2xl"
             >
                <div className="absolute -top-6 -left-6 text-accent-orange opacity-20">
                   <Plus size={120} />
                </div>
                
                <p className="text-2xl lg:text-4xl font-display font-bold text-text-high italic mb-12 leading-[1.1] tracking-tight">
                  &ldquo;Invinsible Tech didn&apos;t just build an app; they built the brain of our entire logistics operation. Absolute precision engineering.&rdquo;
                </p>
                
                <div className="flex flex-col items-center gap-4">
                   <div className="text-lg font-display font-bold text-text-high">Thomas Shelby</div>
                   <div className="text-xs font-mono text-text-low uppercase tracking-widest">CTO @ Enterprise Global</div>
                </div>
             </motion.div>
          </div>
       </Container>
    </section>
  );
}

// ── 13. Final CTA ──
export function AboutFinalCTA() {
  return (
    <section className="py-24 lg:py-40 bg-obsidian relative overflow-hidden">
       <div className="absolute inset-x-1/4 h-px bg-gradient-to-r from-transparent via-accent-orange/50 to-transparent top-0" />
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,107,0,0.05),transparent)] pointer-events-none" />
       
       <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
             <h2 className="text-5xl lg:text-[100px] font-display font-bold text-text-high mb-12 tracking-tighter leading-[0.85]">
                Initiate Your <br />
                <span className="text-accent-orange italic">Next Vision.</span>
             </h2>
             <p className="text-lg font-mono text-text-low mb-16 max-w-2xl mx-auto leading-relaxed">
                Experience the precision of an elite engineering studio. Let&apos;s build the architectures that will define your market legacy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link href="/contact" className="w-full sm:w-auto px-12 py-5 bg-accent-orange text-obsidian font-bold hover:translate-y-[-4px] transition-all duration-300 shadow-xl shadow-accent-orange/20">
                    Start Project Protocol
                 </Link>
                 <Link href="/services" className="w-full sm:w-auto px-12 py-5 bg-surface-100 text-text-high border border-border-dim font-bold hover:bg-surface-200 transition-colors">
                    Our Capabilities
                 </Link>
              </div>
          </div>
       </Container>
    </section>
  );
}

// ── 4. What We Do (Capabilities) ──
export function AboutCapabilities() {
  const CAPABILITIES = [
    { title: "AI & Intelligent Systems", desc: "Neural networks, RAG, and autonomous agents.", icon: Cpu },
    { title: "Product Engineering", desc: "Full-cycle SaaS and platform development.", icon: Layers },
    { title: "Digital Transformation", desc: "Legacy process overhaul and modernization.", icon: Workflow },
    { title: "Enterprise Software", desc: "Robust ERP and high-concurrency systems.", icon: ShieldCheck },
    { title: "Website & Experience Design", desc: "Cinematic UI and ultra-fast web performance.", icon: Layout },
    { title: "Mobile App Engineering", desc: "Native-grade iOS & Android applications.", icon: Rocket },
    { title: "Intelligent Automation", desc: "RPA and self-healing business workflows.", icon: Zap },
    { title: "Cloud & Infrastructure", desc: "Scalable multi-cloud and DevOps pipelines.", icon: Globe },
    { title: "Data & Analytics", desc: "Advanced ETL and business intelligence.", icon: LineChart },
    { title: "Modernization & Migration", desc: "Mainframe into cloud-native microservices.", icon: Search }
  ];

  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <Badge variant="orange" className="mb-4">Capabilities</Badge>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-text-high tracking-tight">
               Our Engineering <br />
               <span className="text-accent-orange">Spectrum.</span>
            </h2>
          </div>
          <p className="max-w-xl text-sm font-mono text-text-low leading-relaxed border-l-2 border-accent-orange pl-8">
            An elite studio capable of building anything in the digital realm, from low-level automation to high-scale AI infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-border-dim/20 border border-border-dim">
           {CAPABILITIES.map((cap) => (
             <div key={cap.title} className="bg-obsidian p-8 group hover:bg-surface-200 transition-all">
                <div className="mb-8 text-text-low group-hover:text-accent-orange transition-colors">
                   <cap.icon size={24} />
                </div>
                <h4 className="text-sm font-display font-bold text-text-high mb-3 uppercase tracking-tighter leading-tight">{cap.title}</h4>
                <p className="text-[10px] font-mono text-text-low leading-relaxed line-clamp-3">{cap.desc}</p>
             </div>
           ))}
        </div>
      </Container>
    </section>
  );
}

// ── 5. Why Choose Us (Bento) ──
export function AboutWhyUs() {
  const STRENGTHS = [
    { title: "End-to-End", desc: "Discovery to Launch.", val: "100%" },
    { title: "Modern Stack", desc: "React/Next/OpenAI.", val: "Cutting Edge" },
    { title: "UI/UX Quality", desc: "Premium First Impression.", val: "Cinematic" },
    { title: "Speed", desc: "3x Faster Delivery.", val: "24/7 Velocity" },
    { title: "Quality", desc: "Enterprise Standard.", val: "Military-Grade" },
    { title: "Support", desc: "Long-term partnership.", val: "Lifetime Pulse" }
  ];

  return (
    <section className="section-padding bg-obsidian">
       <Container>
          <div className="text-center mb-16">
             <Badge variant="dim">The Edge</Badge>
             <h2 className="text-4xl font-display font-bold text-text-high mt-4">Why Global Giants <br /> <span className="text-accent-neon">Trust Us.</span></h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
             {STRENGTHS.map((s, i) => (
                <div key={i} className="p-8 border border-border-dim bg-surface-100 flex flex-col justify-between group hover:border-accent-neon transition-all">
                   <div>
                      <div className="text-[10px] font-mono text-accent-neon uppercase tracking-widest mb-4">{s.title}</div>
                      <p className="text-text-low font-mono text-xs italic">{s.desc}</p>
                   </div>
                   <div className="mt-12 text-2xl font-display font-bold text-text-high group-hover:text-accent-neon transition-colors uppercase italic">{s.val}</div>
                </div>
             ))}
          </div>
       </Container>
    </section>
  );
}
