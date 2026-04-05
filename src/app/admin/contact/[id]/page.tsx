import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building2, 
  Globe, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Hash,
  Send,
  Trash2,
  MoreVertical,
  Terminal,
  MessageSquare,
  History,
  Archive,
  BarChart3
} from "lucide-react";
import Link from "next/link";
import { getSubmissionById } from "@/app/actions/contact";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/Button";
import { StatusActions } from "./StatusActions";
import { NotesEngine } from "./NotesEngine";

export const metadata = {
  title: "Inquiry Detail | Admin Terminal",
};

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  const { id } = await params;
  const { data: submission } = await getSubmissionById(id);

  if (!submission) {
    notFound();
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new": return <Badge variant="dim" className="text-accent-neon border-accent-neon/30 bg-accent-neon/5 animate-pulse uppercase tracking-[0.2em] font-bold text-[9px]">SIGNAL_NEW</Badge>;
      case "in_progress": return <Badge variant="dim" className="text-blue-400 border-blue-400/30 bg-blue-400/5 uppercase tracking-[0.2em] font-bold text-[9px]">ACTIVE_SYNC</Badge>;
      case "contacted": return <Badge variant="dim" className="text-purple-400 border-purple-400/30 bg-purple-400/5 uppercase tracking-[0.2em] font-bold text-[9px]">COMM_OPEN</Badge>;
      case "proposal_sent": return <Badge variant="dim" className="text-accent-orange border-accent-orange/30 bg-accent-orange/5 uppercase tracking-[0.2em] font-bold text-[9px]">PROPOSAL_DEPLOYED</Badge>;
      case "closed_won": return <Badge variant="dim" className="text-emerald-400 border-emerald-400/30 bg-emerald-400/5 uppercase tracking-[0.2em] font-bold text-[9px]">MISSION_SUCCESS</Badge>;
      case "closed_lost": return <Badge variant="dim" className="text-red-400 border-red-400/30 bg-red-400/5 uppercase tracking-[0.2em] font-bold text-[9px]">MISSION_ABORT</Badge>;
      case "spam": return <Badge variant="dim" className="text-slate-500 border-slate-500/30 bg-slate-500/5 uppercase tracking-[0.2em] font-bold text-[9px]">NOISE_FILTER</Badge>;
      default: return <Badge variant="dim" className="text-text-low uppercase tracking-[0.2em] font-bold text-[9px]">UNKNOWN_STATE</Badge>;
    }
  };

  return (
    <main className="min-h-screen bg-obsidian relative overflow-hidden pt-12 pb-24 font-mono">
      <div className="absolute inset-0 bg-grid-white/[0.01] bg-[size:50px_50px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-neon/5 blur-[120px] rounded-full pointer-events-none" />
      
      <Container className="relative z-10">
        <div className="mb-12">
          <Link 
            href="/admin/contact" 
            className="inline-flex items-center gap-2 text-text-low hover:text-accent-neon transition-colors text-[10px] uppercase tracking-widest mb-8 group"
          >
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
            Return to Feed
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                 {getStatusBadge(submission.status)}
                 <span className="text-[10px] text-text-low/40 tracking-[0.3em]">ID: {submission._id.toString().toUpperCase()}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-medium text-text-high tracking-tight mb-2">
                {submission.name}
              </h1>
              <p className="text-sm text-accent-neon/80 font-mono tracking-widest uppercase">
                {submission.service.split('-').join(' ')}
              </p>
            </div>

            <div className="flex items-center gap-3">
               <StatusActions id={submission._id} currentStatus={submission.status} />
               <Button variant="outline" size="sm" className="border-red-900/30 hover:border-red-500 text-text-low hover:text-red-400 bg-red-500/5 transition-all">
                  <Archive size={14} className="mr-2" /> Archive
               </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Detailed Info HUD */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Project Vision / Message */}
            <div className="bg-surface-100 border border-border-dim/20 p-8 rounded-sm relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-[2px] h-0 bg-accent-neon group-hover:h-full transition-all duration-700" />
               <div className="flex items-center gap-3 mb-8 text-[10px] text-text-low/40 uppercase tracking-[0.2rem]">
                  <MessageSquare size={12} /> Technical Objectives
               </div>
               <div className="text-lg leading-relaxed text-text-high font-display max-w-2xl">
                  {submission.message}
               </div>
            </div>

            {/* Core Attribution Grid */}
            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
                  <div className="text-[9px] text-text-low/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Terminal size={10} /> Identity Schema
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Transmission ID</span>
                        <span className="text-xs text-text-high font-mono tracking-widest">{submission.email}</span>
                     </div>
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Organization</span>
                        <span className="text-xs text-text-high font-mono tracking-widest">{submission.company || "NON_CORP_ENTITY"}</span>
                     </div>
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Direct Logic</span>
                        <span className="text-xs text-text-high font-mono tracking-widest">{submission.phone || "STDOUT_LOST"}</span>
                     </div>
                  </div>
               </div>

               <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
                  <div className="text-[9px] text-text-low/40 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <BarChart3 size={10} /> Resource Allocation
                  </div>
                  <div className="space-y-4">
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Capital Bracket</span>
                        <span className="text-xs text-accent-orange font-bold font-mono tracking-widest">{submission.budget || "TBD"}</span>
                     </div>
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Region Flux</span>
                        <span className="text-xs text-text-high font-mono tracking-widest">{submission.country || "GLOBAL_NODE"}</span>
                     </div>
                     <div className="flex items-center justify-between group">
                        <span className="text-[10px] text-text-low/60 uppercase">Source Proto</span>
                        <span className="text-xs text-text-low/60 font-mono text-[9px] tracking-widest">{submission.sourcePage}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Mission Log / History */}
            <NotesEngine id={submission._id} initialNotes={submission.notes} />
          </div>

          {/* Sidebar Telemetry */}
          <div className="lg:col-span-4 space-y-6">
             <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
                <h4 className="text-[10px] font-mono text-text-low/40 uppercase tracking-[0.2em] mb-4">Lead Score</h4>
                <div className="flex items-end gap-3 mb-6">
                   <span className="text-5xl font-display font-medium text-text-high tracking-tighter">8.4</span>
                   <span className="text-text-low/40 text-xs mb-2">/ 10.0</span>
                </div>
                <div className="space-y-2">
                   <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-accent-neon w-[84%] shadow-glow-neon" />
                   </div>
                   <div className="flex justify-between text-[10px] uppercase tracking-widest text-text-low/40">
                      <span>Low Intent</span>
                      <span>High Alpha</span>
                   </div>
                </div>
             </div>

             <div className="bg-surface-100 border border-border-dim/10 p-6 rounded-sm">
                <h4 className="text-[10px] font-mono text-text-low/40 uppercase tracking-[0.2em] mb-4">Metadata</h4>
                <ul className="space-y-4">
                   <li className="flex items-center justify-between">
                      <span className="text-[9px] text-text-low/60 uppercase">First Contact</span>
                      <span className="text-[10px] text-text-high">{format(new Date(submission.createdAt), "dd.MM.yy HH:mm")}</span>
                   </li>
                   <li className="flex items-center justify-between">
                      <span className="text-[9px] text-text-low/60 uppercase">Latent Time</span>
                      <span className="text-[10px] text-text-high">2h 44m SYNCED</span>
                   </li>
                   <li className="flex items-center justify-between">
                      <span className="text-[9px] text-text-low/60 uppercase">Device OS</span>
                      <span className="text-[10px] text-text-high">DARWIN_X64</span>
                   </li>
                </ul>
             </div>

             <div className="p-6 border border-accent-orange/20 bg-accent-orange/5 rounded-sm">
                <p className="text-[10px] leading-relaxed text-accent-orange/80 uppercase tracking-widest mb-4">
                   Actionable Protocol: This lead matches the pattern of existing enterprise architectures. Recommendation: Deploy high-velocity proposal.
                </p>
                <Link href={`mailto:${submission.email}?subject=Re: Architectural Consultation - Invinsible Tech`} className="block">
                   <Button className="w-full bg-accent-orange hover:bg-white text-obsidian uppercase tracking-widest text-[10px] h-12">
                      <Send size={12} className="mr-2" /> Initiate Uplink
                   </Button>
                </Link>
             </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
