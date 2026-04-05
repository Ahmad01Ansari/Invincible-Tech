"use client";

import { motion } from "framer-motion";
import { Mail, Shield, Zap, Target } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-40 bg-obsidian relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange opacity-5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-orange opacity-5 blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto bg-surface-100 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl relative">
          <div className="grid lg:grid-cols-2">
            
            {/* Left Side: Copy */}
            <div className="p-12 lg:p-24 border-r border-white/5">
              <span className="text-[10px] font-mono text-accent-orange uppercase tracking-[0.4em] mb-6 block">
                Direct_Transmission_Line
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tighter leading-none mb-8">
                Join the <br/> 
                <span className="text-accent-orange italic">Elite Protocol.</span>
              </h2>
              <p className="text-text-low text-lg font-mono leading-relaxed mb-12 opacity-70">
                Weekly architectural deep dives, AI system deployment strategies, and modernization blueprints. Pure technical substance. No noise. No fillers.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                 <div className="flex flex-col gap-2">
                    <Shield className="text-accent-orange" size={24} />
                    <span className="text-xs font-mono text-text-low uppercase tracking-widest">Zero_Spam_Protocol</span>
                 </div>
                 <div className="flex flex-col gap-2">
                    <Zap className="text-accent-orange" size={24} />
                    <span className="text-xs font-mono text-text-low uppercase tracking-widest">Early_Beta_Access</span>
                 </div>
              </div>
            </div>

            {/* Right Side: Form */}
            <div className="p-12 lg:p-24 bg-surface-100/50 backdrop-blur-xl flex flex-col justify-center">
              <form className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-mono text-accent-orange uppercase tracking-[0.2em] ml-2">User_Identification_Token (Email)</label>
                    <div className="relative">
                       <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-text-low opacity-40" size={20} />
                       <input 
                         type="email" 
                         placeholder="YOU@CORPORATION.COM"
                         className="w-full bg-obsidian border border-white/10 px-16 py-6 text-sm font-mono text-white focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20 rounded-2xl outline-none"
                       />
                    </div>
                 </div>

                 <button 
                   type="submit"
                   className="w-full bg-accent-orange text-obsidian py-6 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg shadow-accent-orange/10"
                 >
                   ESTABLISH_CONNECTION
                 </button>

                 <p className="text-center text-[10px] font-mono text-text-low opacity-40 mt-8">
                    BY_SYNCHRONIZING_YOU_AGREE_TO_OUR_PRIVACY_MODEL_V4.2
                 </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
