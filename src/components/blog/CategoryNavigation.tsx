"use client";

import { motion } from "framer-motion";
import { Cpu, Cloud, Smartphone, Database, Shield, Layout, Settings } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export const CATEGORIES = [
  { id: "all", name: "ALL_PROBES", icon: Settings },
  { id: "ai-ml", name: "AI_&_ML", icon: Cpu },
  { id: "cloud", name: "CLOUD_SOLUTIONS", icon: Cloud },
  { id: "mobile", name: "MOBILE_SYSTEMS", icon: Smartphone },
  { id: "enterprise", name: "ENTERPRISE_ERP", icon: Database },
  { id: "cybersecurity", name: "CYBERSECURITY", icon: Shield },
  { id: "ui-ux", name: "UI_UX_DESIGN", icon: Layout },
];

export function CategoryNavigation({ activeCategory }: { 
  activeCategory: string 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id === "all") params.delete("category");
    else params.set("category", id);
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex items-center gap-4 py-8 mb-16 overflow-x-auto no-scrollbar scroll-smooth border-b border-white/5 sticky top-24 bg-obsidian z-40 backdrop-blur-md bg-opacity-80">
      <div className="container mx-auto px-6 flex items-center gap-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-3 px-6 py-2.5 rounded-full border text-[10px] font-mono whitespace-nowrap transition-all duration-300 relative group overflow-hidden ${
              activeCategory === cat.id 
                ? "border-accent-orange text-obsidian bg-accent-orange font-bold shadow-lg" 
                : "border-white/10 text-text-low hover:border-accent-orange/40 hover:bg-accent-orange/5"
            }`}
          >
            {/* Hover Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

            <cat.icon size={14} className={activeCategory === cat.id ? "text-obsidian" : "text-accent-orange"} />
            <span className="uppercase tracking-widest">{cat.name}</span>
            
            {/* Active Glow */}
            {activeCategory === cat.id && (
              <motion.div
                layoutId="category-glow"
                className="absolute inset-0 bg-accent-orange opacity-10 blur-xl pointer-events-none"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
