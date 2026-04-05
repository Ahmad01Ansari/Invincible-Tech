export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Remote";
  description: string;
  requirements: string[];
  stack: string[];
  salaryRange?: string;
}

export const OPEN_POSITIONS: JobPosition[] = [
  {
    id: "snr-fullstack-arch",
    title: "Senior Full Stack Architect",
    department: "Engineering",
    location: "Remote / New Delhi",
    type: "Full-time",
    description: "Lead the development of scalable B2B SaaS platforms and high-performance internal ERP systems. You will be responsible for end-to-end architecture and technical mentor-ship.",
    requirements: [
      "7+ years of experience with React/Next.js and Node.js",
      "Proven track record of building multi-tenant SaaS architectures",
      "Deep understanding of PostgreSQL and Redis optimization",
      "Experience with AWS/GCP and CI/CD automation",
    ],
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"],
    salaryRange: "Competitive Enterprise Grade",
  },
  {
    id: "ai-eng-lead",
    title: "AI Engineering Lead",
    department: "Intelligence",
    location: "Remote",
    type: "Full-time",
    description: "Engineer autonomous agent systems and custom RAG architectures for enterprise clients. Focus on productionizing LLMs and computer vision models.",
    requirements: [
      "5+ years in Python/ML Engineering",
      "Experience with OpenAI SDKs, LangChain, and Vector Databases (Pinecone/Weaviate)",
      "Strong background in MLOps and production model monitoring",
      "Math-heavy approach to prompt engineering and fine-tuning",
    ],
    stack: ["Python", "PyTorch", "OpenAI", "LangChain", "Docker"],
    salaryRange: "Elite Tier",
  },
  {
    id: "cloud-infra-specialist",
    title: "Cloud & DevOps Specialist",
    department: "Infrastructure",
    location: "Hybrid (New Delhi)",
    type: "Full-time",
    description: "Design and maintain unbreakable cloud foundations. You will orchestrate global Kubernetes clusters and secure enterprise networks.",
    requirements: [
      "Expert-level knowledge of Terraform and Kubernetes",
      "Deep experience with AWS (EKS, RDS, S3, IAM)",
      "Strong background in Infrastructure as Code (IaC) and Zero-Trust networks",
      "Ability to manage 24/7 high-availability systems",
    ],
    stack: ["Terraform", "Kubernetes", "AWS", "Ansible", "GitHub Actions"],
    salaryRange: "Highly Scalable",
  },
];

export const CULTURE_POINTS = [
  {
    title: "Extreme Ownership",
    description: "We don't 'assign' tasks. We own outcomes. Every engineer is a product owner of their stack.",
    icon: "ShieldAlert",
  },
  {
    title: "Asynchronous Execution",
    description: "We hate useless meetings. We optimize for long blocks of deep work and technical clarity.",
    icon: "Clock",
  },
  {
    title: "Research First",
    description: "We don't use tech because it's 'hot'. We use it because it's robust and solves the bottleneck.",
    icon: "Zap",
  },
  {
    title: "No-Bullshit Mentality",
    description: "Direct feedback, flat hierarchy, and absolute transparency in technical decision making.",
    icon: "Target",
  },
];

export const BENEFITS = [
  { title: "Remote-First", description: "Work from anywhere, with full support for home-office engineering gear." },
  { title: "Tech Budget", description: "Personal budget for GPUs, hardware, and premium technical courses." },
  { title: "Profit Sharing", description: "Every elite engineer gets a slice of the factory's annual success." },
  { title: "Annual Retreats", description: "Global meetups to sync strategy and celebrate engineering breakthroughs." },
];
