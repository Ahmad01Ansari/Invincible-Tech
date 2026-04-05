import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  FileText, 
  LayoutDashboard, 
  Settings, 
  Users, 
  Terminal, 
  ArrowRight,
  TrendingUp,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { getBlogs } from "../actions/blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Portal | Dashboard",
};

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const { data: blogs = [] } = await getBlogs();
  const totalBlogs = blogs.length;
  const publishedBlogs = blogs.filter((b: any) => b.status === "published").length;

  const adminModules = [
    {
      title: "Blog Operations",
      description: "Manage technical transmissions, articles, and documentation assets.",
      icon: <FileText size={20} />,
      href: "/admin/blog",
      stats: `${totalBlogs} Assets`,
      color: "text-accent-orange",
      borderColor: "hover:border-accent-orange",
    },
    {
      title: "Portfolio Assets",
      description: "Curate and update engineering case studies and project showcase.",
      icon: <LayoutDashboard size={20} />,
      href: "#",
      stats: "Upcoming",
      color: "text-accent-neon",
      borderColor: "hover:border-accent-neon",
    },
    {
      title: "Access Control",
      description: "Manage administrative roles and identity verification protocols.",
      icon: <Users size={20} />,
      href: "#",
      stats: "Restricted",
      color: "text-blue-400",
      borderColor: "hover:border-blue-400",
    },
    {
      title: "System Config",
      description: "Configure global site parameters and engineering environment variables.",
      icon: <Settings size={20} />,
      href: "#",
      stats: "v4.2.0-STABLE",
      color: "text-white/40",
      borderColor: "hover:border-white/40",
    },
  ];

  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden pt-12 pb-24">
      {/* Decorative Technical Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-4">
          <div>
            <Badge variant="dim" className="mb-4 font-mono tracking-[0.3em] uppercase text-[10px]">
              PROTOCOL_SYSTEM_MANIFEST
            </Badge>
            <h1 className="text-5xl font-display font-medium text-text-high tracking-tighter">
              Admin <span className="text-accent-orange">Terminal.</span>
            </h1>
            <p className="mt-4 text-text-low font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60 max-w-xl">
              Welcome, <span className="text-white">{session.user?.name || "Admin"}</span>. 
              System status is nominal. All encrypted data streams are active and verified.
            </p>
          </div>
          
          <div className="hidden md:block text-right">
             <div className="text-[10px] font-mono text-text-low/30 uppercase tracking-[0.2em] mb-1">Session ID</div>
             <div className="text-xs font-mono text-text-low uppercase tracking-widest">{Math.random().toString(16).substring(2, 10).toUpperCase()}</div>
          </div>
        </div>

        {/* System Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12 px-4">
          <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
             <div className="flex items-center gap-3 text-accent-neon mb-2">
                <Shield size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Security Status</span>
             </div>
             <div className="text-lg font-display text-text-high font-bold tracking-tight">ENCRYPTED_LINK</div>
          </div>
          <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
             <div className="flex items-center gap-3 text-accent-orange mb-2">
                <TrendingUp size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Content Pulse</span>
             </div>
             <div className="text-lg font-display text-text-high font-bold tracking-tight">{publishedBlogs} ACTIVE TRANSMISSIONS</div>
          </div>
          <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
             <div className="flex items-center gap-3 text-white/40 mb-2">
                <Terminal size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Environment</span>
             </div>
             <div className="text-lg font-display text-text-high font-bold tracking-tight">PRODUCTION_CORE</div>
          </div>
          <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
             <div className="flex items-center gap-3 text-blue-400 mb-2">
                <Users size={14} />
                <span className="text-[10px] font-mono uppercase tracking-widest">Operator Role</span>
             </div>
             <div className="text-lg font-display text-text-high font-bold tracking-tight font-mono uppercase text-sm">Superuser_v4</div>
          </div>
        </div>

        {/* Module Navigator */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {adminModules.map((module, index) => (
            <Link 
              key={index} 
              href={module.href}
              className={`group bg-surface-100 border border-border-dim/20 p-8 rounded-sm transition-all duration-500 overflow-hidden relative ${module.borderColor}`}
            >
              {/* Card Corner Detail */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-10 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2 w-[1px] h-4 bg-white" />
                <div className="absolute top-2 right-2 w-4 h-[1px] bg-white" />
              </div>

              <div className="flex items-start justify-between mb-8">
                <div className={`p-4 bg-obsidian border border-border-dim/20 rounded-sm ${module.color} transition-transform group-hover:scale-110 duration-500`}>
                  {module.icon}
                </div>
                <div className="text-right">
                   <div className="text-[10px] font-mono text-text-low/40 uppercase tracking-widest mb-1">Telemetry</div>
                   <div className={`text-xs font-mono uppercase tracking-widest ${module.color}`}>{module.stats}</div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-display font-medium text-text-high mb-2 tracking-tight group-hover:text-white transition-colors">
                  {module.title}
                </h3>
                <p className="text-xs text-text-low leading-relaxed font-mono uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity">
                  {module.description}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-text-low group-hover:text-accent-orange transition-colors">
                Initialize Module <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Technical Scanline Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.01] to-transparent h-12 w-full -translate-y-full group-hover:animate-scanline pointer-events-none" />
            </Link>
          ))}
        </div>

        {/* Breadcrumb / Footer Detail */}
        <div className="mt-16 pt-8 border-t border-border-dim/10 px-4 flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-mono text-text-low/40 uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-neon animate-pulse" />
                 North Node: ACTIVE
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-text-low/40 uppercase tracking-widest">
                 <div className="w-1.5 h-1.5 rounded-full bg-accent-orange" />
                 Database Sync: SYNCING
              </div>
           </div>
           
           <p className="text-[10px] font-mono text-text-low/20 uppercase tracking-[0.3em]">
              Invinsible Tech • Engineering Portal v4.2.0 • SHA-256 Verified
           </p>
        </div>
      </Container>
    </main>
  );
}
