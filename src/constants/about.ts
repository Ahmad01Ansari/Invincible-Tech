import { 
  Rocket, 
  Target, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Workflow, 
  LineChart,
  Globe,
  Plus,
  Users,
  Search,
  Layout,
  Layers,
  CheckCircle2,
  Ship,
  HeartPulse,
  Banknote,
  GraduationCap,
  ShoppingBag,
  Truck,
  Factory,
  Building2
} from "lucide-react";

export const ABOUT_METRICS = [
  { label: "Engineering Hours", value: "24,000+" },
  { label: "Projects Shipped", value: "150+" },
  { label: "Industries Served", value: "12+" },
  { label: "Lines of Code", value: "4.2M" },
  { label: "ROI Increase", value: "45%" },
  { label: "Operational Savings", value: "$4.8M" }
];

export const CORE_VALUES = [
  {
    icon: Zap,
    title: "Engineering Velocity",
    desc: "We don't just build faster; we engineer smarter. Our protocol is designed to eliminate latency in both development and business operations."
  },
  {
    icon: Code2,
    title: "Brutal Automation",
    desc: "Every manual task is a failure of architecture. We are obsessed with creating autonomous workflows that free human potential."
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Rigor",
    desc: "We build with the assumption of scale. Every line of code is hardened, secured, and audit-ready for global deployment."
  },
  {
    icon: Target,
    title: "ROI-First Architecture",
    desc: "Technology is a tool for capital growth. We measure success through quantifiable business impact and operational salvage."
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    desc: "Our engineers operate as a distributed elite studio, syncing across time zones to maintain a 24/7 pulse on innovation."
  },
  {
    icon: LineChart,
    title: "Precision Analytics",
    desc: "Data-driven decision making is at our core. We build systems that don't just collect data; they orchestrate it into insights."
  },
  {
    icon: Layers,
    title: "Infinite Scalability",
    desc: "We architect for the future. Our cloud-native systems are built to expand without friction as your enterprise grows."
  },
  {
    icon: Users,
    title: "Transparency Protocol",
    desc: "Absolute honesty in engineering. No vanity metrics, no hidden costs. Just high-performance software engineering."
  }
];

export const ENGINEERING_PROTOCOL = [
  { 
    step: "Discovery", 
    title: "System Audit", 
    desc: "Rigorous analysis of legacy bottlenecks and workflow friction points." 
  },
  { 
    step: "Strategy", 
    title: "Architecture Blueprint", 
    desc: "Designing the high-performance road map for automation and AI integration." 
  },
  { 
    step: "Design", 
    title: "Experience Prototyping", 
    desc: "Cinematic UI design coupled with intuitive user-centric data flows." 
  },
  { 
    step: "Development", 
    title: "Vanguard Engineering", 
    desc: "High-stakes coding, microservices orchestration, and AI model training." 
  },
  { 
    step: "Testing", 
    title: "Stress & Security Hardening", 
    desc: "Penetration testing and simulated traffic loads at 10x capacity." 
  },
  { 
    step: "Launch", 
    title: "Deployment Sync", 
    desc: "Smooth migration and integration with live enterprise ecosystems." 
  },
  { 
    step: "Support", 
    title: "Hyper-Care Phase", 
    desc: "Proactive monitoring, maintenance, and system performance tuning." 
  }
];

export const INDUSTRIES = [
  { id: "healthcare", name: "Healthcare", icon: HeartPulse, desc: "HIPAA-compliant EHR systems, predictive diagnostics, and clinic management OS." },
  { id: "finance", name: "Finance & Banks", icon: Banknote, desc: "Fintech core migration, real-time fraud detection, and multi-cloud cores." },
  { id: "education", name: "Education", icon: GraduationCap, desc: "Multi-tenant school ERPs, parent-student portals, and adaptive learning paths." },
  { id: "retail", name: "E-commerce", icon: ShoppingBag, desc: "Headless commerce, 3D product engines, and predictive retail analytics." },
  { id: "logistics", name: "Logistics", icon: Truck, desc: "AI-driven route optimization, real-time fleet visibility, and warehouse automation." },
  { id: "manufacturing", name: "Manufacturing", icon: Factory, desc: "Industrial IoT dashboards, predictive maintenance, and floor-level automation." },
  { id: "startups", name: "Startup MVPs", icon: Rocket, desc: "High-velocity product launches, seed-ready demos, and scalable tech foundations." },
  { id: "realestate", name: "Real Estate", icon: Building2, desc: "PropTech automation, virtual tour engines, and CRM management layers." }
];

export const TEAM_MEMBERS = [
  {
    name: "Ahmad Raza",
    role: "Founder & Chief Architect",
    specialty: "High-concurrency Systems & AI Strategy",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1000",
    bio: "Lead engineer with 10+ years experience in orchestrating mission-critical enterprise software and intelligent automation.",
    links: { linkedin: "#", github: "#" }
  },
  {
    name: "Sarah Chen",
    role: "Head of AI Engineering",
    specialty: "Neural Networks & RAG Architectures",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
    bio: "Pioneering the integration of LLMs with enterprise data to create autonomous business intelligence agents.",
    links: { linkedin: "#", github: "#" }
  },
  {
    name: "Marcus Aurelius",
    role: "Director of UX Strategy",
    specialty: "Cinematic UI & Interaction Design",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000",
    bio: "Ensuring that the invisible power of engineering is reflected through stunning, premium-grade user experiences.",
    links: { linkedin: "#", twitter: "#" }
  },
  {
    name: "Elena Rossi",
    role: "Enterprise SaaS Lead",
    specialty: "Multi-tenancy & Scalability",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1000",
    bio: "Architecting zero-single-point-of-failure cloud systems for global healthcare and logistics giants.",
    links: { linkedin: "#", github: "#" }
  }
];

export const MILESTONES = [
  { year: "2019", title: "The Genesis", desc: "Invinsible Tech founded as a stealth development shop for silicon valley startups." },
  { year: "2020", title: "Enterprise Shift", desc: "Secured first Fortune 500 partner for global logistics modernization." },
  { year: "2021", title: "Automation Lab", desc: "Launch of our proprietary RPA protocol, saving clients over 100k+ man-hours yearly." },
  { year: "2022", title: "AI Integration", desc: "Embedding neural route optimization into core European logistics fleets." },
  { year: "2023", title: "Global Scale", desc: "Opening studios across 3 continents to maintain 24/7 engineering velocity." },
  { year: "2024", title: "The Vanguard", desc: "Redefining the Product Studio model for the generative AI era." }
];
