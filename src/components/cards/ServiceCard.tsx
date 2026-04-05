"use client";

import { Service } from "@/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import * as IconMap from "lucide-react";
import React, { useState } from "react";

interface ServiceCardProps {
  service: Service;
  index?: number;
}

export function ServiceCard({ service, index = 0 }: ServiceCardProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconRender = (IconMap as any)[service.icon] || IconMap.Box;

  // Track hover for terminal cursor effect
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/services/${service.slug}`} 
      className="block h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="h-full relative bg-obsidian p-8 border border-border-dim overflow-hidden flex flex-col transition-colors duration-300"
      >
        {/* Stark lines mimicking IDE grids */}
        <div className="absolute top-0 left-8 w-[1px] h-4 bg-border-dim" />
        <div className="absolute top-8 left-0 w-4 h-[1px] bg-border-dim" />

        <div className="relative z-10 flex-grow">
          <div className="w-10 h-10 mb-6 text-text-high opacity-50 group-hover:opacity-100 group-hover:text-accent-orange transition-colors">
            <IconRender size={24} strokeWidth={1} />
          </div>
          
          <h3 className="text-xl font-mono text-text-high mb-4 flex items-center">
             <span className="text-accent-orange opacity-50 mr-2">{"//"}</span>
             {service.title}
             {isHovered && (
               <motion.span
                 animate={{ opacity: [1, 0] }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-4 bg-text-high ml-2"
               />
             )}
          </h3>
          
          <p className="text-text-low leading-relaxed font-mono text-sm max-w-[90%]">
            {service.shortDescription}
          </p>
        </div>

        <div className="relative z-10 flex items-center text-xs font-mono tracking-widest uppercase text-text-low mt-10 group-hover:text-accent-orange transition-colors duration-300">
          Execute Protocol
          <ArrowRight size={14} className="ml-2 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>

        {/* Full Circle Border Animation - Two lines meeting at Bottom-Right */}
        {/* Line 1: Top-Left -> Top-Right -> Bottom-Right */}
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 ease-in-out z-20" />
        <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover:h-full transition-all duration-500 delay-500 ease-in-out z-20" />

        {/* Line 2: Top-Left -> Bottom-Left -> Bottom-Right */}
        <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover:h-full transition-all duration-500 ease-in-out z-20" />
        <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 delay-500 ease-in-out z-20" />
      </motion.div>
    </Link>
  );
}
