"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Eye, MessageCircle, Share2, Bookmark, Clock } from "lucide-react";

export function InsightCard({ blog, index }: { blog: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${blog.slug}`} className="group flex flex-col h-full bg-surface-100 border border-white/5 hover:border-accent-orange/40 transition-all duration-500 rounded-xl overflow-hidden relative">
        {/* Metric Badge Overlay */}
        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="flex items-center gap-2 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-white tracking-widest">
              <Bookmark size={12} className="text-accent-orange" /> {blog.bookmarksCount || 0}_SAVED
           </div>
        </div>

        {/* Image Container */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={blog.coverImage}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute bottom-4 left-6">
            <span className="px-3 py-1 bg-accent-orange text-obsidian text-[9px] font-bold uppercase tracking-[0.2em] rounded">
              {blog.category}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8 flex flex-col flex-grow relative overflow-hidden bg-surface-100">
          {/* Subtle Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-orange/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex items-center gap-4 mb-6 text-[9px] font-mono text-text-low uppercase tracking-widest">
             <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-accent-orange" /> {blog.readTime || 5}M_READ
             </span>
             <span className="w-1 h-1 rounded-full bg-white/20" />
             <span suppressHydrationWarning>{new Date(blog.createdAt).toLocaleDateString()}</span>
          </div>

          <h3 className="text-2xl font-display font-medium text-white mb-4 group-hover:text-accent-orange transition-colors leading-tight tracking-tight">
            {blog.title}
          </h3>

          <p className="text-sm text-text-low font-mono leading-relaxed opacity-60 mb-8 line-clamp-3">
            {blog.shortDescription}
          </p>

          <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/5">
             <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-low opacity-60 group-hover:opacity-100 group-hover:text-white transition-all">
                   <Eye size={14} className="text-accent-orange" />
                   {blog.views || 0}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-low opacity-60 group-hover:opacity-100 group-hover:text-white transition-all">
                   <MessageCircle size={14} className="text-accent-orange" />
                   {blog.commentsCount || 0}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-text-low opacity-60 group-hover:opacity-100 group-hover:text-white transition-all">
                   <Share2 size={14} className="text-accent-orange" />
                   {blog.sharesCount || 0}
                </div>
             </div>
             
             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-low group-hover:bg-accent-orange group-hover:text-obsidian group-hover:border-accent-orange transition-all duration-300 transform group-hover:rotate-45">
                <ArrowUpRight size={20} />
             </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
