"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  str: string;
  speed: number;
  opacity: number;
}

export function CodeStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize handler
    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Matrix characters
    const chars = "10<>/{}[];_+=AI*&^%$";
    const particles: Particle[] = [];
    const particleCount = 40; // Low count for performance

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        str: chars[Math.floor(Math.random() * chars.length)],
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationFrameId: number;

    const render = () => {
      // Semi-transparent black over previous frame creates trail effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)"; // Match background-obsidian closely
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "14px monospace";
      
      particles.forEach((p) => {
        // Neon Orange / Dim hue context
        ctx.fillStyle = `rgba(255, 87, 34, ${p.opacity})`;
        ctx.fillText(p.str, p.x, p.y);
        
        p.y += p.speed;
        
        // Reset if it hits bottom
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
          p.str = chars[Math.floor(Math.random() * chars.length)];
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 z-0" 
    />
  );
}
