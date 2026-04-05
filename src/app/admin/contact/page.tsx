import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  Search, 
  Filter, 
  ArrowLeft, 
  MoreVertical, 
  Eye, 
  Trash2,
  Clock,
  CheckCircle2,
  AlertCircle,
  Mail,
  Building2,
  Globe
} from "lucide-react";
import Link from "next/link";
import { getSubmissions } from "@/app/actions/contact";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export const metadata = {
  title: "Inquiry Feed | Admin Terminal",
};

export default async function ContactListPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const { data: submissions = [] } = await getSubmissions();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "text-accent-neon border-accent-neon/30 bg-accent-neon/5";
      case "in_progress": return "text-blue-400 border-blue-400/30 bg-blue-400/5";
      case "contacted": return "text-purple-400 border-purple-400/30 bg-purple-400/5";
      case "closed_won": return "text-emerald-400 border-emerald-400/30 bg-emerald-400/5";
      case "closed_lost": return "text-red-400 border-red-400/30 bg-red-400/5";
      default: return "text-text-low border-border-dim/30 bg-white/5";
    }
  };

  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden pt-12 pb-24">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px] pointer-events-none" />
      
      <Container className="relative z-10">
        {/* Header Section */}
        <div className="mb-12">
          <Link 
            href="/admin" 
            className="inline-flex items-center gap-2 text-text-low hover:text-accent-orange transition-colors font-mono text-[10px] uppercase tracking-widest mb-8 group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Return to Core
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <Badge variant="dim" className="mb-4 font-mono tracking-[0.3em] uppercase text-[10px]">
                TELEMETRY_INQUIRY_FEED
              </Badge>
              <h1 className="text-4xl font-display font-medium text-text-high tracking-tight">
                Architectural <span className="text-accent-neon">Transmissions.</span>
              </h1>
              <p className="mt-4 text-text-low font-mono text-xs uppercase tracking-widest leading-relaxed opacity-60">
                Monitoring {submissions.length} active lead signals across the engineering network.
              </p>
            </div>

            <div className="flex items-center gap-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low group-focus-within:text-accent-neon transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search identity..." 
                    className="bg-surface-100 border border-border-dim/20 rounded-sm pl-11 pr-6 py-3 text-xs font-mono text-text-high w-[260px] focus:outline-none focus:border-accent-neon/50 focus:ring-1 focus:ring-accent-neon/20 transition-all"
                  />
               </div>
               <button className="p-3 bg-surface-100 border border-border-dim/20 rounded-sm text-text-low hover:text-white transition-colors">
                  <Filter size={18} />
               </button>
            </div>
          </div>
        </div>

        {/* Dynamic Table HUD */}
        <div className="bg-surface-100 border border-border-dim/10 rounded-sm overflow-hidden backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono border-collapse">
              <thead>
                <tr className="border-b border-border-dim/10 text-[10px] uppercase tracking-[0.2em] text-text-low/60 bg-white/[0.02]">
                  <th className="px-6 py-5 font-medium">Identity / Organization</th>
                  <th className="px-6 py-5 font-medium">Engineering Pillar</th>
                  <th className="px-6 py-5 font-medium">Allocation</th>
                  <th className="px-6 py-5 font-medium">Status Pulse</th>
                  <th className="px-6 py-5 font-medium uppercase text-right tracking-[0.3em]">Date_Logged</th>
                  <th className="px-6 py-5 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dim/5">
                {submissions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-20 text-center text-text-low font-mono text-xs uppercase tracking-widest opacity-40">
                       Zero active signals detected in current frequency.
                    </td>
                  </tr>
                ) : (
                  submissions.map((item: any) => (
                    <tr key={item._id} className="group hover:bg-white/[0.02] transition-all duration-300">
                      <td className="px-6 py-6 font-display">
                        <div className="flex flex-col">
                           <span className="text-sm font-medium text-text-high group-hover:text-white transition-colors tracking-tight">
                              {item.name}
                           </span>
                           <div className="flex items-center gap-4 mt-1 text-[10px] font-mono text-text-low/60">
                              <span className="flex items-center gap-1.5"><Mail size={10} className="text-accent-orange/60" /> {item.email}</span>
                              {item.company && <span className="flex items-center gap-1.5"><Building2 size={10} /> {item.company}</span>}
                           </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full bg-accent-orange/30 group-hover:bg-accent-orange transition-colors" />
                           <span className="text-xs text-text-low/80 transition-colors group-hover:text-text-high uppercase tracking-wide">
                              {item.service.split('-').join(' ')}
                           </span>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <Badge variant="dim" className="text-[10px] border-white/5 bg-white/[0.02]">
                           {item.budget || "TBD"}
                        </Badge>
                      </td>
                      <td className="px-6 py-6">
                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] uppercase tracking-widest font-bold ${getStatusColor(item.status)}`}>
                           <div className={`w-1 h-1 rounded-full bg-current ${item.status === 'new' ? 'animate-pulse' : ''}`} />
                           {item.status.split('_').join(' ')}
                        </div>
                      </td>
                      <td className="px-6 py-6 text-right font-mono text-[10px] text-text-low group-hover:text-text-high transition-colors">
                        {format(new Date(item.createdAt), "dd_MMM_yyyy HH:mm").toUpperCase()}
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Link href={`/admin/contact/${item._id}`}>
                              <button className="p-2 hover:bg-white/10 rounded-sm text-text-low hover:text-accent-neon transition-all" title="View Detail">
                                 <Eye size={16} />
                              </button>
                           </Link>
                           <button className="p-2 hover:bg-white/10 rounded-sm text-text-low hover:text-red-400 transition-all" title="Archive Record">
                              <Trash2 size={16} />
                           </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          
          {/* Footer Telemetry */}
          <div className="px-6 py-4 border-t border-border-dim/10 bg-white/[0.01] flex items-center justify-between">
             <div className="text-[9px] font-mono text-text-low/30 uppercase tracking-[0.2em] flex items-center gap-4">
                <span>Signal Strength: 100%</span>
                <span className="w-1 h-1 rounded-full bg-text-low/20" />
                <span>Node: AP-SOUTH-1</span>
             </div>
             <div className="flex items-center gap-1">
                {[1, 2, 3].map(i => (
                  <button key={i} className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono rounded-sm transition-all ${i === 1 ? 'bg-accent-orange text-obsidian font-bold' : 'text-text-low hover:text-white'}`}>
                    {i}
                  </button>
                ))}
             </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
