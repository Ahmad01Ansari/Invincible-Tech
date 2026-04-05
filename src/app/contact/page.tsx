import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/ui/ContactForm";
import { SITE_CONFIG } from "@/constants/site";
import { Mail, Phone, MapPin, Globe, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";
import { ConsultationBenefits } from "@/components/sections/ConsultationBenefits";

export const metadata: Metadata = {
  title: "Engineering Consultation | Invinsible Tech",
  description: "Consult with our elite engineering leads to audit your bottlenecks and architect a high-performance roadmap for your next breakthrough.",
};

export default function ContactPage() {
  return (
    <main className="bg-obsidian min-h-screen">
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-border-dim/20">
        {/* Cinematic Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--color-accent-orange)_0%,transparent_10%)] opacity-[0.03]" />
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
        
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Left: Contact Info & Narrative */}
            <div className="lg:col-span-5">
              <Badge variant="dim" className="mb-6 font-mono tracking-tighter">CONSULTATION_PROTOCOL_01</Badge>
              <h1 className="text-display font-display font-bold text-text-high leading-none mb-8">
                Initiate your <br />
                <span className="text-accent-orange">Breakthrough.</span>
              </h1>
              
              <p className="text-body-lg text-text-low mb-16 leading-relaxed max-w-lg">
                Consult with our elite engineering leads to audit your bottlenecks, evaluate architectural debt, and blueprint a high-performance roadmap tailored for exponential growth.
              </p>

              <div className="space-y-12">
                <div className="group border-l border-border-dim/30 pl-8 hover:border-accent-orange transition-colors">
                  <div className="flex items-center gap-3 text-text-low font-mono text-[10px] uppercase tracking-widest mb-4">
                    <Mail size={14} className="text-accent-orange" />
                    Global Transmission
                  </div>
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-xl font-display font-medium text-text-high hover:text-accent-orange transition-colors">
                    {SITE_CONFIG.email}
                  </a>
                </div>

                <div className="group border-l border-border-dim/30 pl-8 hover:border-accent-orange transition-colors">
                  <div className="flex items-center gap-3 text-text-low font-mono text-[10px] uppercase tracking-widest mb-4">
                    <Phone size={14} className="text-accent-orange" />
                    Direct Comms
                  </div>
                  <a href={`tel:${SITE_CONFIG.phone}`} className="text-xl font-display font-medium text-text-high hover:text-accent-orange transition-colors">
                    +91 {SITE_CONFIG.phone.split(' ').slice(1).join(' ')}
                  </a>
                </div>

                <div className="group border-l border-border-dim/30 pl-8 hover:border-accent-orange transition-colors">
                  <div className="flex items-center gap-3 text-text-low font-mono text-[10px] uppercase tracking-widest mb-4">
                    <Globe size={14} className="text-accent-orange outline-pulse" />
                    Operational Center
                  </div>
                  <div className="text-xl font-display font-medium text-text-high">
                    Vasant Kunj, New Delhi <br />
                    <span className="text-sm font-mono font-normal text-text-low">Asia-Pacific HQ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The Form Container */}
            <div className="lg:col-span-7">
              <div className="relative">
                {/* Decorative border animation container */}
                <div className="absolute -inset-[1px] bg-gradient-to-br from-border-dim to-accent-orange/20 rounded-sm opacity-50" />
                
                <div className="relative bg-surface-100 p-8 md:p-12 border border-border-dim/50 shadow-2xl group/form">
                  <div className="flex items-center justify-between mb-12 border-b border-border-dim/20 pb-8">
                    <div>
                      <h3 className="text-2xl font-display font-medium text-text-high mb-2">Request Architecture Audit</h3>
                      <p className="text-xs font-mono text-text-low uppercase tracking-widest">Protocol: Direct Lead Inquiry</p>
                    </div>
                    <div className="hidden sm:flex flex-col items-end text-[10px] font-mono text-text-low/40">
                      <span>VERIFIED_ENGINEER_REQ</span>
                      <span>ID: IVN-04-2024</span>
                    </div>
                  </div>
                  
                  <ContactForm />

                  {/* Full Circle Border Animation */}
                  {/* Line 1: Top-Left -> Top-Right -> Bottom-Right */}
                  <div className="absolute top-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover/form:w-full transition-all duration-700 ease-in-out z-20" />
                  <div className="absolute top-0 right-0 w-[2px] h-0 bg-gradient-to-b from-accent-neon to-accent-orange group-hover/form:h-full transition-all duration-700 delay-500 ease-in-out z-20" />

                  {/* Line 2: Top-Left -> Bottom-Left -> Bottom-Right */}
                  <div className="absolute top-0 left-0 w-[2px] h-0 bg-gradient-to-b from-accent-orange to-accent-neon group-hover/form:h-full transition-all duration-700 ease-in-out z-20" />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent-orange to-accent-neon group-hover/form:w-full transition-all duration-700 delay-500 ease-in-out z-20" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Consultation Benefits Section */}
      <ConsultationBenefits />

      {/* Final Trust Markers */}
      <section className="py-24 border-t border-border-dim/10">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <Zap className="text-accent-orange w-8 h-8 mb-6" />
              <h4 className="text-sm font-mono uppercase tracking-widest text-text-high mb-2">High Efficiency</h4>
              <p className="text-xs text-text-low max-w-[200px]">Blueprints focused on radical operational speed.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="text-accent-orange w-8 h-8 mb-6" />
              <h4 className="text-sm font-mono uppercase tracking-widest text-text-high mb-2">Absolute Security</h4>
              <p className="text-xs text-text-low max-w-[200px]">Enterprise-grade encryption on every project.</p>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="text-accent-orange w-8 h-8 mb-6" />
              <h4 className="text-sm font-mono uppercase tracking-widest text-text-high mb-2">Global Scale</h4>
              <p className="text-xs text-text-low max-w-[200px]">Infrastructure designed for global redundancy.</p>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
