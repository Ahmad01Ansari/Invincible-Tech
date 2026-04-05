"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ backgroundColor: "rgba(5, 5, 6, 0)", borderBottomColor: "rgba(35, 35, 42, 0)" }}
        animate={{ 
          backgroundColor: scrolled || isOpen ? "#050506" : "rgba(5, 5, 6, 0)",
          borderBottomColor: scrolled || isOpen ? "rgba(35, 35, 42, 1)" : "rgba(35, 35, 42, 0)",
          backdropFilter: scrolled || isOpen ? "blur(16px)" : "blur(0px)" 
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[1000] border-b transition-all duration-300"
      >
        <Container>
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="relative z-[1100] flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-orange to-accent-neon flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-obsidian font-bold text-xl leading-none">I</span>
              </div>
              <span className="text-xl font-display font-bold text-text-high tracking-tight">
                {SITE_CONFIG.name}
              </span>
            </Link>

            {/* Desktop Nav - Centered */}
            <nav className="hidden md:flex flex-1 justify-center items-center gap-8 px-8">
              <ul className="flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-sm font-mono tracking-widest uppercase text-text-low hover:text-text-high transition-colors relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-orange to-accent-neon transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Right Action Button */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact">
                <Button size="sm">Start a Project</Button>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden relative z-[1100] p-2 text-text-high outline-none"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </Container>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300, mass: 1 }}
            className="fixed inset-0 bg-black z-[990] md:hidden flex flex-col pt-32 pb-12 px-8 overflow-y-auto"
            style={{ backgroundColor: '#050506', opacity: 1 }}
          >
            {/* Added a base solid layer for absolute opacity */}
            <div className="absolute inset-0 bg-[#050506] -z-10" />
            
            <div className="flex flex-col min-h-full">
              {/* Staggered Links */}
              <div className="flex flex-col gap-6 relative z-10">
                {NAV_LINKS.map((link, i) => (
                  <motion.div 
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                  >
                    <Link 
                      href={link.href}
                      className="text-4xl lg:text-5xl font-display font-bold text-text-high hover:text-accent-orange transition-colors flex items-center justify-between group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span>{link.label}</span>
                      <span className="text-xl text-text-low group-hover:text-accent-neon group-hover:translate-x-2 transition-all">→</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Bottom Action Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-auto pt-12 border-t border-border-dim relative z-10"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)} className="block mb-8">
                  <Button size="lg" className="w-full text-lg h-16 shadow-glow-orange border-none hvr-shutter-out-horizontal">
                    Start a Project
                  </Button>
                </Link>
                <div className="flex items-center justify-between text-[10px] font-mono text-text-low uppercase tracking-[0.3em]">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-trace animate-pulse" />
                    Vanguard OS
                  </span>
                  <span>v.2026</span>
                </div>
              </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-orange/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
