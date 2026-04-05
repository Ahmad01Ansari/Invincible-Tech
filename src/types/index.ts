// ── Service ──
export interface Service {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  technologies: string[];
  features: string[];
}

export interface ServiceSolution {
  title: string;
  description: string;
  icon: string;
  visual?: string; // e.g., illustration or placeholder name
}

export interface ServiceCapability {
  title: string;
  description: string;
  useCase?: string;
  outcome?: string;
}

export interface ServiceProcess {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceDetail extends Service {
  hero: {
    badge?: string;
    headline: string;
    subheadline: string;
    intro: string;
    primaryCTA: { label: string; href: string };
    secondaryCTA: { label: string; href: string };
    stats?: { label: string; value: string }[];
  };
  about: {
    description: string;
    whyNeeded: string;
    problemsSolved: string[];
  };
  solutions: ServiceSolution[];
  capabilities: ServiceCapability[];
  industries: (string | { name: string; useCase: string })[];
  process: ServiceProcess[];
  techStack: {
    category: string;
    items: string[];
  }[];
  benefits: {
    title: string;
    description: string;
    icon: string;
  }[];
  faq: FAQItem[];
  toolLogos?: { name: string; logo: string }[];
  caseStudy?: {
    projectSlug: string; // Links to a project in PORTFOLIO_PROJECTS
    overview?: string;
  };
  finalCTA: {
    headline: string;
    description: string;
    buttonLabel: string;
  };
}

// ── Portfolio Project ──
export interface Project {
  title: string;
  slug: string;
  client: string;
  industry: string;
  description: string;
  longDescription: string;
  category: string;
  status?: "Active" | "Archived" | "Featured";
  services: string[];
  techStack: string[];
  thumbnail: string;
  video?: string;
  challenge: string;
  solution: string;
  goals: string[];
  process: { step: string; description: string }[];
  results: string;
  metrics: { label: string; value: string }[];
  detailedResults?: { title: string; count: string; description: string }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    companyLogo?: string;
  };
  screenshots: string[];
  timeline: string;
  featured: boolean;
  relatedProjects?: string[]; // slugs
}

// ── Blog Post ──
export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  category: string;
  author: {
    name: string;
    role: string;
    photo: string;
  };
  publishedAt: string;
}

// ── Testimonial ──
export interface Testimonial {
  clientName: string;
  clientTitle: string;
  company: string;
  companyLogo?: string;
  avatar?: string;
  quote: string;
  hookLine: string;
  industry: string;
  rating: number;
}

// ── Career ──
export interface Career {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  applyUrl: string;
  postedAt: string;
}

// ── Team Member ──
export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  linkedIn?: string;
  bio: string;
}

// ── FAQ ──
export interface FAQItem {
  question: string;
  answer: string;
}

// ── Navigation ──
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}
