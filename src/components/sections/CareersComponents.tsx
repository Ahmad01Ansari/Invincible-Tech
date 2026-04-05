"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Clock, 
  Zap, 
  Target, 
  ShieldAlert, 
  Code2, 
  Cpu, 
  Cloud,
  ChevronRight,
  Brain
} from "lucide-react";
import { OPEN_POSITIONS, CULTURE_POINTS, BENEFITS } from "@/constants/careers";
import Link from "next/link";

export function CareersHero() {
  return (
    <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-obsidian">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
       <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian to-transparent" />
       
       <Container className="relative z-10">
         <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="dim" className="mb-6 font-mono tracking-tighter uppercase">PROTOCOL_ELITE_RECRUITMENT</Badge>
            </motion.div>
            
            <h1 className="text-display font-display font-bold text-text-high leading-none mb-8 tracking-tighter">
              Engineering the <br />
              <span className="text-accent-orange italic">Future of Scale.</span>
            </h1>
            
            <p className="text-body-lg text-text-low mb-12 leading-relaxed max-w-2xl font-mono text-sm uppercase tracking-wide opacity-80">
              We don&apos;t just hire employees; we recruit elite engineers with extreme ownership. Join the factory building the world&apos;s most robust digital assets.
            </p>

            <div className="flex flex-wrap gap-4">
               <a href="#roles" className="px-8 h-14 bg-accent-orange text-obsidian font-mono font-bold text-xs uppercase tracking-widest flex items-center hover:bg-white transition-colors">
                 View Open Roles
                 <ArrowRight size={14} className="ml-2" />
               </a>
               <Link href="/about" className="px-8 h-14 border border-border-dim text-text-high font-mono text-xs uppercase tracking-widest flex items-center hover:border-accent-orange transition-colors">
                 Our Engineering Ethos
               </Link>
            </div>
         </div>
       </Container>
    </section>
  );
}

const iconMap = {
  ShieldAlert: ShieldAlert,
  Clock: Clock,
  Zap: Zap,
  Target: Target,
};

export function FactoryCulture() {
  return (
    <section className="py-24 bg-surface-200 border-y border-border-dim/20">
      <Container>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {CULTURE_POINTS.map((point) => {
            const Icon = (iconMap as any)[point.icon] || Zap;
            return (
              <div key={point.title} className="group border-l border-border-dim/30 pl-8 hover:border-accent-orange transition-colors">
                <div className="text-accent-orange mb-6 bg-obsidian w-10 h-10 rounded-sm flex items-center justify-center group-hover:scale-110 transition-transform origin-left">
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-display font-medium text-text-high mb-4">{point.title}</h3>
                <p className="text-sm text-text-low leading-relaxed font-mono opacity-70">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function OpenRolesList() {
  return (
    <section id="roles" className="py-32 bg-obsidian relative overflow-hidden">
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-accent-orange/5 blur-3xl rounded-full pointer-events-none" />
      
      <Container>
        <div className="mb-20">
          <Badge className="mb-6 font-mono tracking-widest">DEPLOYMENT_OPPORTUNITIES</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-text-high tracking-tight">
            Current Open <span className="text-accent-neon italic">Protocol Slots.</span>
          </h2>
        </div>

        <div className="space-y-6">
          {OPEN_POSITIONS.map((job) => (
            <div 
              key={job.id} 
              className="group bg-surface-100 border border-border-dim/20 p-8 hover:border-accent-orange/40 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-y-0 left-0 w-1 bg-accent-orange opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-[10px] font-mono text-accent-orange uppercase bg-accent-orange/5 px-2 py-1 rounded-sm border border-accent-orange/20">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-mono text-text-low uppercase tracking-widest">
                      {job.location} • {job.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-display font-medium text-text-high mb-4">
                    {job.title}
                  </h3>
                  <p className="text-sm text-text-low font-mono leading-relaxed opacity-70 mb-6">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {job.stack.map(tech => (
                      <span key={tech} className="text-[10px] font-mono text-text-low bg-obsidian px-2 py-1 border border-border-dim/30">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="h-14 px-8 border border-border-dim text-[10px] text-text-high font-mono uppercase tracking-[0.2em] flex items-center justify-center group-hover:bg-accent-orange group-hover:text-obsidian group-hover:border-accent-orange transition-all shrink-0"
                >
                  Initiate Application
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-8 border border-dashed border-border-dim/50 text-center">
            <p className="text-text-low font-mono text-xs uppercase tracking-widest mb-6">Don&apos;t see your stack?</p>
            <h4 className="text-xl font-display font-medium text-text-high mb-6">We always hire world-class architects for high-performance roles.</h4>
            <Link href="/contact" className="text-accent-orange font-mono text-xs uppercase tracking-widest hover:underline">
              Send a Blind Transmission →
            </Link>
        </div>
      </Container>
    </section>
  );
}

export function HiringProtocol() {
  const steps = [
    { title: "Protocol 01: The Discovery Call", description: "A 30-minute technical sync to evaluate mission alignment and core architectural vision." },
    { title: "Protocol 02: Deep Dive Challenge", description: "Real-world engineering problems. No whiteboard brain-teasers. Just build-ing robust assets." },
    { title: "Protocol 03: Executive Sync", description: "Direct dialogue with our engineering leads to discuss growth, equity, and ownership." },
    { title: "Protocol 04: Deployment", description: "Welcome to the factory. Zero friction onboarding and immediate asset ownership." },
  ];

  return (
    <section className="py-32 bg-surface-200 border-t border-border-dim/20 pb-48">
      <Container>
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <Badge className="mb-6 font-mono tracking-widest">EVALUATION_LIFECYCLE</Badge>
          <h2 className="text-4xl font-display font-medium text-text-high mb-6">The Hiring <span className="text-accent-orange">Protocol.</span></h2>
          <p className="text-sm text-text-low font-mono uppercase tracking-widest">Transparent. Fast. Absolute Clarity.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-border-dim/30 z-0" />
          
          {steps.map((step, index) => (
            <div key={step.title} className="relative z-10 group">
              <div className="w-12 h-12 bg-obsidian rounded-full border border-border-dim flex items-center justify-center text-accent-orange font-mono text-sm mb-8 group-hover:border-accent-orange group-hover:scale-110 transition-transform">
                0{index + 1}
              </div>
              <h3 className="text-lg font-display font-medium text-text-high mb-4 group-hover:text-accent-orange transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-text-low font-mono leading-relaxed opacity-60">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
