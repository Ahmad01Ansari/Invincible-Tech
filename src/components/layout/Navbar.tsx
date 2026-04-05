"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { Menu, X } from "lucide-react";
import { SITE_CONFIG } from "@/constants/site";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

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
  }, [isOpen]);

  return (
    <motion.header
      initial={{ backgroundColor: "rgba(10, 10, 10, 0)", borderBottomColor: "rgba(38, 38, 38, 0)" }}
      animate={{ 
        backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 0)",
        borderBottomColor: scrolled ? "rgba(38, 38, 38, 1)" : "rgba(38, 38, 38, 0)",
        backdropFilter: scrolled ? "blur(12px)" : "blur(0px)" 
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300"
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-2 group">
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
                    {/* Animated Underline (Moves Left to Right) */}
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
            className="md:hidden relative z-50 p-2 text-text-high"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-obsidian z-40 transition-transform duration-500 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {NAV_LINKS.map((link) => (
            <Link 
              key={link.href}
              href={link.href}
              className="text-3xl font-display font-bold text-text-high hover:text-accent-orange transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setIsOpen(false)} className="mt-4">
            <Button size="lg">Start a Project</Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
