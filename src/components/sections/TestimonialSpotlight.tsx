"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";

const TESTIMONIALS = [
  {
    quote: "Invinsible Tech completely transformed our student management portal. What used to take our admin staff three days every semester is now fully automated and instantaneous.",
    author: "Sarah Jenkins",
    role: "Director of Operations",
    company: "Global EduGroup",
    image: "/images/og/default.png" // Placeholder avatar
  },
  {
    quote: "Their RPA implementation paid for itself within the first quarter. We reduced our data entry errors to absolute zero and drastically improved our SLA times.",
    author: "David Chen",
    role: "CTO",
    company: "FinSecure Partners",
    image: "/images/og/default.png"
  }
];

export function TestimonialSpotlight() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  return (
    <section className="section-padding bg-surface-100 border-y border-border-dim overflow-hidden relative">
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Header & Controls */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Badge variant="orange" className="mb-4">Testimonials</Badge>
            <h2 className="text-h2 font-display font-semibold text-text-high mb-6 md:mb-10">
              The impact<br />we deliver.
            </h2>
            
            <div className="flex gap-4">
              <button 
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-border-dim flex items-center justify-center text-text-high hover:border-accent-orange hover:text-accent-orange transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-border-dim flex items-center justify-center text-text-high hover:border-accent-orange hover:text-accent-orange transition-colors"
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Testimonial Display Slider */}
          <div className="lg:col-span-8 relative min-h-[300px]">
            <Quote size={120} className="absolute -top-10 -left-10 text-border-dim opacity-50 z-0" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative z-10 glass-card p-8 md:p-12 border-border-glow shadow-2xl"
              >
                <p className="text-xl md:text-2xl font-display text-text-high leading-relaxed mb-10">
                  &quot;{TESTIMONIALS[currentIndex].quote}&quot;
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border border-border-dim">
                    <Image
                      src={TESTIMONIALS[currentIndex].image}
                      alt={TESTIMONIALS[currentIndex].author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-text-high">
                      {TESTIMONIALS[currentIndex].author}
                    </div>
                    <div className="text-sm text-text-low">
                      {TESTIMONIALS[currentIndex].role}, <span className="text-accent-orange">{TESTIMONIALS[currentIndex].company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </Container>
    </section>
  );
}
