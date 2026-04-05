"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { TextReveal } from "../animations/TextReveal";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceHeroProps {
  data: {
    badge?: string;
    headline: string;
    subheadline: string;
    intro: string;
    primaryCTA: { label: string; href: string };
    secondaryCTA: { label: string; href: string };
    stats?: { label: string; value: string }[];
  };
}

export function ServiceHero({ data }: ServiceHeroProps) {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-20 overflow-hidden bg-obsidian">
      {/* Dynamic Factory Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:40px_40px]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-orange/5 to-transparent blur-3xl" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="dim" className="mb-6">
              {data.badge || "Service Strategy"}
            </Badge>
          </motion.div>

          <h1 className="text-display font-display font-bold text-text-high leading-[1.1] mb-6">
            <TextReveal text={data.headline} delay={0.1} />
            <div className="text-gradient-orange mt-2">
              <TextReveal text={data.subheadline} delay={0.3} />
            </div>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-body-lg text-text-low mb-12 max-w-2xl font-mono text-sm leading-relaxed border-l border-border-dim pl-6"
          >
            {data.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-wrap items-center gap-6"
          >
            <Button size="lg" href={data.primaryCTA.href} className="group min-w-[200px]">
              {data.primaryCTA.label}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link 
              href={data.secondaryCTA.href} 
              className="text-text-high font-mono text-xs uppercase tracking-widest hover:text-accent-orange transition-colors"
            >
              {data.secondaryCTA.label} ❯
            </Link>
          </motion.div>

          {data.stats && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-12 mt-20 pt-12 border-t border-border-dim/30"
            >
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-mono font-bold text-text-high mb-1">{stat.value}</div>
                  <div className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
