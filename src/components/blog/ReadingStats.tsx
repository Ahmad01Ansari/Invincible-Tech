"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const STATS = [
  { label: "TOTAL_PROBES", value: 128, suffix: "+" },
  { label: "ENGAGED_MINDS", value: 45, suffix: "K+" },
  { label: "CORE_TECH_SYSTEMS", value: 12, suffix: "" },
  { label: "CASE_STUDIES", value: 85, suffix: "+" },
  { label: "AVG_READ_TIME", value: 8, suffix: "M" },
];

function Counter({ value, suffix }: { value: number, suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter">
      {count}{suffix}
    </span>
  );
}

export function ReadingStats() {
  return (
    <section className="py-32 border-y border-white/5 bg-surface-100/30 overflow-hidden relative">
      {/* Decorative text background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-display font-medium text-white/5 select-none pointer-events-none uppercase tracking-tighter mix-blend-overlay">
        PROTOCOLS
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 text-center">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <div className="mt-4 px-4 py-1.5 bg-accent-orange/10 border border-accent-orange/20 rounded-full">
                 <span className="text-[10px] font-mono text-accent-orange uppercase tracking-widest font-bold">
                    {stat.label}
                 </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
