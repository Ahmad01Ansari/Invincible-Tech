"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const TRENDING_TOPICS = [
  "Artificial Intelligence",
  "Cloud Native",
  "Cybersecurity",
  "Enterprise ERP",
  "Mobile Architecture",
];

export function InsightsHero() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get("q") || "");

  const handleSearch = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (val) params.set("q", val);
    else params.delete("q");
    router.push(`/blog?${params.toString()}`);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden bg-obsidian">
      {/* Animated Background Element */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,107,0,0.15)_0%,transparent_50%)]" />
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }} 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[10px] font-mono text-accent-orange uppercase tracking-[0.4em] mb-6 block">
              Knowledge_Base_V2.0
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-medium text-white tracking-tighter leading-[0.9] mb-8">
              Engineering <br /> 
              <span className="text-accent-orange italic">Insights.</span>
            </h1>
            <p className="text-text-low text-lg md:text-xl max-w-2xl leading-relaxed mb-12 font-mono">
              Deep dives into architectural patterns, AI deployment strategies, and modernization protocols for the elite 1%.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-8"
          >
            {/* Search Bar */}
            <form onSubmit={onSubmit} className="relative group max-w-xl">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-low group-focus-within:text-accent-orange transition-colors" size={20} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="PROBE_THE_INDEX..."
                className="w-full bg-surface-100/50 backdrop-blur-xl border border-white/10 px-16 py-6 text-sm font-mono text-white focus:outline-none focus:border-accent-orange/50 transition-all placeholder:text-white/20 rounded-full"
              />
              <button 
                type="submit"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent-orange text-obsidian px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-colors"
              >
                EXECUTE
              </button>
            </form>

            {/* Trending Chips */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-mono text-text-low uppercase tracking-widest mr-2">Trending:</span>
              {TRENDING_TOPICS.map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSearchValue(topic);
                    handleSearch(topic);
                  }}
                  className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-[10px] font-mono text-text-low hover:text-accent-orange hover:border-accent-orange/30 hover:bg-accent-orange/5 transition-all"
                >
                  #{topic.toUpperCase().replace(/\s+/g, "_")}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
