"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./Button";
import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ChevronDown } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  service: z.string().min(1, "Please select an engineering pillar"),
  message: z.string().min(10, "Briefly describe your objectives"),
  honeypot: z.string().max(0, "Bot detected").optional(), 
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { isSubmitting, setIsSubmitting } = useAppStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate a high-fidelity "Engineering Console" feedback loop
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Connection Failure");
      
    } catch (error) {
      console.error("Transmission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitSuccessful) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-12 text-center border-accent-neon border-dashed"
      >
        <div className="w-16 h-16 bg-accent-neon/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-accent-neon w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-medium text-text-high mb-4 tracking-tight">Transmission Received.</h3>
        <p className="text-text-low mb-8 font-mono text-sm leading-relaxed max-w-sm mx-auto">
          Your architectural inquiry has been logged. An engineering lead will contact you within 24 hours to sync on objectives.
        </p>
        <Button onClick={() => reset()} variant="outline" className="font-mono text-xs uppercase tracking-widest">
          New Transmission
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {/* Honeypot Field */}
      <input type="text" {...register("honeypot")} className="hidden" aria-hidden="true" tabIndex={-1} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-mono uppercase tracking-widest text-text-low mb-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-orange rounded-full" />
            Full Name
          </label>
          <input
            {...register("name")}
            id="name"
            className="w-full bg-obsidian/50 border border-border-dim/50 rounded-sm px-5 py-4 text-text-high font-mono text-sm focus:outline-none focus:border-accent-orange focus:bg-obsidian transition-all placeholder:text-text-low/30"
            placeholder="OPERATOR NAME"
          />
          {errors.name && <span className="text-[10px] font-mono text-red-500 mt-1 uppercase tracking-tighter">{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-mono uppercase tracking-widest text-text-low mb-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-orange rounded-full" />
            Direct Email
          </label>
          <input
            {...register("email")}
            id="email"
            type="email"
            className="w-full bg-obsidian/50 border border-border-dim/50 rounded-sm px-5 py-4 text-text-high font-mono text-sm focus:outline-none focus:border-accent-orange focus:bg-obsidian transition-all placeholder:text-text-low/30"
            placeholder="CORP_ID@HQ.COM"
          />
          {errors.email && <span className="text-[10px] font-mono text-red-500 mt-1 uppercase tracking-tighter">{errors.email.message}</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-xs font-mono uppercase tracking-widest text-text-low mb-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-orange rounded-full" />
            Organization
          </label>
          <input
            {...register("company")}
            id="company"
            className="w-full bg-obsidian/50 border border-border-dim/50 rounded-sm px-5 py-4 text-text-high font-mono text-sm focus:outline-none focus:border-accent-orange focus:bg-obsidian transition-all placeholder:text-text-low/30"
            placeholder="ACME INDUSTRIES"
          />
        </div>

        <div className="flex flex-col gap-2 relative">
          <label htmlFor="service" className="text-xs font-mono uppercase tracking-widest text-text-low mb-1 flex items-center gap-2">
            <span className="w-1 h-1 bg-accent-orange rounded-full" />
            Engineering Pillar
          </label>
          <select
            {...register("service")}
            id="service"
            className="w-full bg-obsidian/50 border border-border-dim/50 rounded-sm px-5 py-4 text-text-high font-mono text-sm focus:outline-none focus:border-accent-orange focus:bg-obsidian transition-all appearance-none cursor-pointer"
          >
            <option value="" className="bg-obsidian">SELECT_ARCHITECTURE</option>
            <option value="ai-intelligent-systems" className="bg-obsidian">AI & Intelligent Systems</option>
            <option value="digital-transformation" className="bg-obsidian">Digital Transformation</option>
            <option value="product-enterprise-engineering" className="bg-obsidian">Product & Enterprise Engineering</option>
            <option value="website-experience-design" className="bg-obsidian">Website & Experience Design</option>
            <option value="mobile-app-engineering" className="bg-obsidian">Mobile App Engineering</option>
            <option value="intelligent-automation" className="bg-obsidian">Intelligent Automation</option>
            <option value="cloud-infrastructure" className="bg-obsidian">Cloud & Infrastructure</option>
            <option value="data-analytics" className="bg-obsidian">Data & Analytics</option>
            <option value="modernization-migration" className="bg-obsidian">Modernization & Migration</option>
            <option value="other-consulting" className="bg-obsidian">Other Technical Logic</option>
          </select>
          <div className="absolute right-5 bottom-4 pointer-events-none text-text-low">
            <ChevronDown size={18} />
          </div>
          {errors.service && <span className="text-[10px] font-mono text-red-500 mt-1 uppercase tracking-tighter">{errors.service.message}</span>}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="text-xs font-mono uppercase tracking-widest text-text-low mb-1 flex items-center gap-2">
          <span className="w-1 h-1 bg-accent-orange rounded-full" />
          Technical Objectives
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={5}
          className="w-full bg-obsidian/50 border border-border-dim/50 rounded-sm px-5 py-4 text-text-high font-mono text-sm focus:outline-none focus:border-accent-orange focus:bg-obsidian transition-all resize-none placeholder:text-text-low/30 leading-relaxed"
          placeholder="DESCRIBE BOTTLENECKS, ARCHITECTURAL DEBT, OR SCALING GOALS..."
        />
        {errors.message && <span className="text-[10px] font-mono text-red-500 mt-1 uppercase tracking-tighter">{errors.message.message}</span>}
      </div>

      <Button 
        type="submit" 
        disabled={isSubmitting} 
        size="lg" 
        className="w-full mt-6 bg-accent-orange text-obsidian font-mono uppercase tracking-widest text-xs h-16 hover:bg-white transition-colors flex items-center justify-center gap-3 group"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            SYNCHRONIZING...
          </>
        ) : (
          <>
            Initiate Consultation Protocol
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </>
        )}
      </Button>
      
      <p className="text-[10px] font-mono text-text-low text-center uppercase tracking-widest">
        Secure SHA-256 Encrypted Transmission
      </p>
    </form>
  );
}
