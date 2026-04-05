"use client";

import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const BLOG_POSTS = [
  {
    title: "The Future of AI Agents in Enterprise RPA",
    excerpt: "Exploring how LLMs are transforming repetitive business processes into intelligent workflows.",
    date: "Oct 24, 2023",
    slug: "future-of-ai-agents",
  },
  {
    title: "Scaling SaaS Infrastructure for Global Demand",
    excerpt: "Key architectural decisions for building resilient and highly available software platforms.",
    date: "Oct 12, 2023",
    slug: "scaling-saas-infrastructure",
  },
];

export function BlogSection() {
  return (
    <section className="section-padding bg-surface-100 border-t border-border-dim">
      <Container>
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <Badge variant="dim" className="mb-4">Insights</Badge>
            <h2 className="text-h2 font-display font-medium text-text-high tracking-tight">
               <span className="text-accent-orange opacity-50 mr-2">{"//"}</span>
               Engineering Blog.
            </h2>
          </div>
          <Link href="/blog" className="text-accent-orange font-mono text-sm uppercase tracking-widest hover:text-accent-neon transition-colors">
            View All Posts ❯
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group p-8 border border-border-dim bg-obsidian relative overflow-hidden transition-colors">
              <div className="relative z-10">
                <div className="text-xs font-mono text-accent-orange mb-4">{post.date}</div>
                <h3 className="text-2xl font-display font-medium text-text-high mb-4 group-hover:text-accent-orange transition-colors">
                  {post.title}
                </h3>
                <p className="text-text-low font-mono text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs font-mono tracking-widest uppercase text-text-low group-hover:text-accent-orange transition-colors">
                  Read Article <ArrowRight size={14} className="ml-2" />
                </div>
              </div>

              {/* Full Circle Border Animation - Two lines meeting at Bottom-Right */}
              {/* Line 1: Top-Left -> Top-Right -> Bottom-Right */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 ease-in-out z-20" />
              <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover:h-full transition-all duration-500 delay-500 ease-in-out z-20" />

              {/* Line 2: Top-Left -> Bottom-Left -> Bottom-Right */}
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover:h-full transition-all duration-500 ease-in-out z-20" />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover:w-full transition-all duration-500 delay-500 ease-in-out z-20" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
