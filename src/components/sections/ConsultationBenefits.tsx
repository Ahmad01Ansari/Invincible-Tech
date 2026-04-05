import { Container } from "../ui/Container";
import { Badge } from "../ui/Badge";
import { Search, TrendingUp, Layout, ShieldCheck } from "lucide-react";

const benefits = [
  {
    title: "Technical Discovery Audit",
    description: "Our engineering leads deep-dive into your existing architecture, identifying performance bottlenecks and technical debt.",
    icon: Search,
  },
  {
    title: "ROI-Focused Roadmap",
    description: "We don't just build features; we engineer business outcomes. Every proposal includes projected efficiency gains and cost reductions.",
    icon: TrendingUp,
  },
  {
    title: "Architectural Draft",
    description: "Receive a high-level technical blueprint of the proposed solution—containerized, secure, and ready for deployment.",
    icon: Layout,
  },
  {
    title: "Security Assessment",
    description: "Every consultation includes a preliminary security audit of data flow and encryption protocols.",
    icon: ShieldCheck,
  }
];

export function ConsultationBenefits() {
  return (
    <section className="py-32 bg-surface-200 border-y border-border-dim/20 relative">
      <Container>
        <div className="max-w-2xl mb-20 whitespace-normal">
          <Badge variant="dim" className="mb-6 font-mono text-[10px] tracking-widest uppercase">Consultation Objectives</Badge>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-text-high mb-8 tracking-tight leading-none">
            What happens during <br />
            <span className="text-accent-orange">Discovery.</span>
          </h2>
          <p className="text-body-lg text-text-low leading-relaxed">
            Our consultations are pure engineering sessions. No sales pitches—just technical clarity and strategic architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {benefits.map((benefit, index) => (
            <div key={benefit.title} className="group relative">
              <div className="text-accent-orange mb-6 bg-obsidian w-12 h-12 rounded-sm border border-border-dim/50 flex items-center justify-center group-hover:scale-110 transition-transform origin-left group-hover:border-accent-orange">
                <benefit.icon size={22} />
              </div>
              <div className="font-mono text-[10px] text-text-low opacity-40 mb-2 uppercase tracking-widest">Protocol 0{index + 1}</div>
              <h3 className="text-xl font-display font-medium text-text-high mb-4 group-hover:text-accent-orange transition-colors">{benefit.title}</h3>
              <p className="text-sm text-text-low leading-relaxed font-mono opacity-80">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
