"use client";

import { Container } from "../ui/Container";
import { TextReveal } from "../animations/TextReveal";
import { TerminalHero } from "../animations/TerminalHero";
import { NetworkGraph } from "../animations/NetworkGraph";
import { Magnetic } from "../animations/Magnetic";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-obsidian pt-24 pb-16">

      {/* Factory-Style Minimalist Network Graph */}
      <NetworkGraph />

      <Container className="relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-12 items-center">

          {/* Left Column - Content */}
          <div className="flex flex-col items-start max-w-2xl">
            <h1 className="text-display font-display font-bold text-text-high leading-[1.1] mb-6">
              <TextReveal text="We are Engineers" delay={0.1} />
              <div className="text-gradient-orange">
                <TextReveal text="with Hyper Efficiency." delay={0.3} />
              </div>
            </h1>

            <p className="text-body-lg text-text-low mb-10 max-w-xl font-mono text-sm leading-relaxed border-l border-border-dim pl-4">
              We are engineers without limits. From high-scale SaaS platforms and AI-driven systems to enterprise ERPs—we build the digital backbone of modern organizations.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-2">
              <Magnetic intensity={0.2}>
                <div>
                  <Link href="/contact">
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </Magnetic>

              <Magnetic intensity={0.1}>
                <div>
                  <Link href="/services">
                    <Button variant="outline" size="lg">
                      Our Solutions
                    </Button>
                  </Link>
                </div>
              </Magnetic>
            </div>
          </div>

          {/* Right Column - Terminal Mockup */}
          <div className="w-full flex justify-end">
            <TerminalHero />
          </div>

        </div>
      </Container>
    </section>
  );
}
