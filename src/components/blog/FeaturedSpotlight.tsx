"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, User, Clock, Play } from "lucide-react";

export function FeaturedSpotlight({ blog }: { blog: any }) {
  if (!blog) return null;

  return (
    <section className="container mx-auto px-6 mb-32 -mt-16 relative z-20">
      <Link href={`/blog/${blog.slug}`} className="group block h-full">
        <div className="grid lg:grid-cols-12 gap-0 bg-surface-100 border border-white/10 overflow-hidden rounded-2xl shadow-2xl relative">
          {/* Visual Side (8 columns on large screens) */}
          <div className="lg:col-span-7 relative h-[400px] lg:h-[600px] overflow-hidden">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent lg:hidden" />
            
            {/* Visual Indicator (Mock Video Play Button) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <div className="w-20 h-20 rounded-full bg-accent-orange flex items-center justify-center text-obsidian shadow-xl backdrop-blur-md bg-opacity-90">
                  <Play fill="currentColor" size={24} className="ml-1" />
               </div>
            </div>

            {/* Floating Tag */}
            <div className="absolute top-8 left-8">
              <span className="px-4 py-1.5 bg-accent-orange text-obsidian text-[10px] font-bold uppercase tracking-widest rounded-full">
                FEATURED_INSIGHT
              </span>
            </div>
          </div>

          {/* Content Side (5 columns) */}
          <div className="lg:col-span-5 p-10 lg:p-16 flex flex-col justify-center bg-surface-100 relative overflow-hidden">
            {/* Decorative background number */}
            <div className="absolute -right-10 -bottom-10 text-[200px] font-display font-medium text-white/5 select-none pointer-events-none">
              01
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-[10px] font-mono text-accent-orange uppercase tracking-widest border-l-2 border-accent-orange pl-4 bg-accent-orange/5 py-1 pr-3">
                {blog.category}
              </span>
              <div className="flex items-center gap-2 text-[10px] font-mono text-text-low uppercase tracking-[0.2em]">
                <Clock size={12} className="text-accent-orange" />
                {blog.readTime || 5} MIN_READ
              </div>
            </div>

            <h2 className="text-4xl lg:text-6xl font-display font-medium text-white leading-tight tracking-tighter mb-8 group-hover:text-accent-orange transition-colors duration-500">
              {blog.title}
            </h2>

            <p className="text-text-low text-lg leading-relaxed mb-12 font-mono line-clamp-3 opacity-70">
              {blog.shortDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 mt-auto pt-10 border-t border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                  <User size={18} className="text-accent-orange" />
                </div>
                <div className="flex flex-col">
                   <span className="text-xs font-bold text-white tracking-widest font-mono uppercase">
                      {blog.author}
                   </span>
                   <span className="text-[10px] text-text-low font-mono uppercase opacity-50">
                      Engineering_Head
                   </span>
                </div>
              </div>

              <div className="flex items-center gap-2 group-hover:gap-4 transition-all duration-300 text-accent-orange font-mono text-sm uppercase tracking-widest font-bold">
                 FULL_ACCESS <ArrowRight size={18} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
