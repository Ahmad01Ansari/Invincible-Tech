"use client";

import { motion } from "framer-motion";
import { Mail, Download, MessageSquare, Share2, Globe, ExternalLink } from "lucide-react";

const SOCIAL_ICONS = [MessageSquare, Globe, Share2];

const POPULAR_TAGS = [
  "Next.js_14", "AWS_LAMBDA", "GEN_AI", "SaaS_ENGINEERING", 
  "DOCKER_CONTAINERS", "API_DESIGN", "SCALABILITY", "UX_PROTOCOLS"
];

export function InsightsSidebar() {
  return (
    <aside className="space-y-12 sticky top-40">
      
      {/* Newsletter Signup */}
      <div className="p-8 bg-surface-100 border border-white/10 rounded-2xl relative overflow-hidden group shadow-xl">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-orange opacity-5 blur-3xl group-hover:opacity-10 transition-opacity" />
        
        <h4 className="text-xl font-display font-medium text-white mb-4">
           Transmission <br/> 
           <span className="text-accent-orange">Protocols.</span>
        </h4>
        <p className="text-xs text-text-low font-mono leading-relaxed mb-8 opacity-70">
           Receive weekly architectural blueprints and elite engineering insights directly in your cortex.
        </p>
        
        <form className="space-y-4">
           <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low opacity-40" size={16} />
              <input 
                type="email" 
                placeholder="USER_EMAIL_INDEX..."
                className="w-full bg-obsidian border border-white/5 px-12 py-4 text-[10px] font-mono text-white focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20 outline-none rounded-lg"
              />
           </div>
           <button 
             type="submit"
             className="w-full bg-accent-orange text-obsidian py-4 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1"
           >
             SYNC_NOW
           </button>
        </form>
      </div>

      {/* Popular Tags */}
      <div className="p-6">
        <h5 className="text-[10px] font-mono text-accent-orange uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
           <div className="w-1 h-1 bg-accent-orange rounded-full" />
           POPULAR_TAGS_INDEX
        </h5>
        <div className="flex flex-wrap gap-2">
           {POPULAR_TAGS.map((tag) => (
             <button key={tag} className="px-3 py-1.5 border border-white/5 bg-white/5 text-[9px] font-mono text-text-low hover:text-white hover:border-accent-orange/40 transition-all rounded uppercase">
                #{tag}
             </button>
           ))}
        </div>
      </div>

      {/* Free Resource CTA */}
      <div className="p-8 bg-accent-orange rounded-2xl relative overflow-hidden group">
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
         
         <div className="relative z-10">
            <Download className="text-obsidian mb-6" size={32} />
            <h4 className="text-xl font-display font-bold text-obsidian tracking-tighter mb-4">
               FREE_Modern_Arch_Blueprint_2024
            </h4>
            <p className="text-xs text-obsidian/80 font-mono font-medium leading-relaxed mb-8">
               A 60-page PDF on architecting high-performance SaaS applications with Next.js & AWS.
            </p>
            <button className="flex items-center gap-3 bg-obsidian text-white px-6 py-3 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-transform">
               DOWNLOAD <ExternalLink size={14} />
            </button>
         </div>
         
         {/* Decorative circle */}
         <div className="absolute -right-12 -bottom-12 w-40 h-40 border-[20px] border-obsidian/5 rounded-full" />
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-between px-6 pt-8 border-t border-white/5">
         {SOCIAL_ICONS.map((Icon, i) => (
           <a key={i} href="#" className="p-3 bg-white/5 border border-white/5 rounded-xl text-text-low hover:text-accent-orange hover:border-accent-orange/40 transition-all">
              <Icon size={20} />
           </a>
         ))}
      </div>

    </aside>
  );
}
