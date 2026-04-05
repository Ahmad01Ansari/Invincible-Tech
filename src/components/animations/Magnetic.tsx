"use client";

import { useMotionValue, motion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export function Magnetic({ children, intensity = 0.5 }: { children: React.ReactElement, intensity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics for smooth snap-back
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    
    // Calculate the bounding box of the element
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    
    // Find the center of the element
    const center = { x: left + width / 2, y: top + height / 2 };
    
    // Calculate the distance bound by intensity
    x.set((clientX - center.x) * intensity);
    y.set((clientY - center.y) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
