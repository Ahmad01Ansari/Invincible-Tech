"use client";

import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import React from "react";

interface PortfolioCardProps {
  project: Project;
}

export function PortfolioCard({ project }: PortfolioCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <Link 
      href={`/portfolio/${project.slug}`} 
      className="block group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden bg-obsidian border border-border-dim transition-colors duration-300 hover:border-text-high">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border-dim bg-surface-100/50">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-border-dim/50" />
            <div className="w-2 h-2 bg-border-dim/50" />
          </div>
          <div className="font-mono text-[10px] text-text-low tracking-widest uppercase">
            {project.slug}.tsx
          </div>
        </div>

        {/* High Contrast Mockup Area */}
        <div className="relative w-full aspect-video overflow-hidden">
          {/* Black & White filter on image until hover */}
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
          />
          
          <div className="absolute inset-0 bg-obsidian/40 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-500" />
        </div>

        {/* Console Output Style Data Panel */}
        <div className="p-6 md:p-8 relative z-10 border-t border-border-dim">
          <h3 className="text-xl font-mono text-text-high mb-2 flex items-center">
             <span className="text-accent-orange mr-2">❯</span>
             {project.title}
             {isHovered && (
               <motion.span
                 animate={{ opacity: [1, 0] }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-4 bg-accent-orange ml-2"
               />
             )}
          </h3>
          
          <p className="text-sm font-mono text-text-low mb-6">
            Client: {project.client} | Industry: {project.industry}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.services.map((service) => (
              <span
                key={service}
                className="text-[10px] uppercase tracking-wider px-2 py-1 border border-border-dim text-text-low"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
