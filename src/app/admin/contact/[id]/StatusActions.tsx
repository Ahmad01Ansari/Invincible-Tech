"use client";

import { useState } from "react";
import { 
  Check, 
  ChevronDown, 
  Loader2, 
  Zap, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  XCircle,
  ShieldAlert
} from "lucide-react";
import { updateSubmissionStatus } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

const statuses = [
  { value: "new", label: "SIGNAL_NEW", icon: Zap, color: "text-accent-neon" },
  { value: "contacted", label: "COMM_OPEN", icon: Clock, color: "text-purple-400" },
  { value: "in_progress", label: "ACTIVE_SYNC", icon: Loader2, color: "text-blue-400" },
  { value: "proposal_sent", label: "PROPOSAL_DEPLOYED", icon: Send, color: "text-accent-orange" },
  { value: "closed_won", label: "MISSION_SUCCESS", icon: CheckCircle2, color: "text-emerald-400" },
  { value: "closed_lost", label: "MISSION_ABORT", icon: XCircle, color: "text-red-400" },
  { value: "spam", label: "NOISE_FILTER", icon: ShieldAlert, color: "text-slate-500" },
];

export function StatusActions({ id, currentStatus }: { id: string; currentStatus: string }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const current = statuses.find(s => s.value === currentStatus) || statuses[0];

  const handleStatusUpdate = async (newStatus: string) => {
    if (newStatus === currentStatus) return;
    
    setIsUpdating(true);
    try {
      const result = await updateSubmissionStatus(id, newStatus);
      if (!result.success) throw new Error(result.error);
    } catch (error: any) {
      alert("STATUS_SYNC_FAILURE: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          disabled={isUpdating}
          className="min-w-[180px] border-border-dim/50 bg-surface-100 hover:bg-white/5 transition-all flex items-center justify-between group"
        >
          {isUpdating ? (
            <Loader2 className="w-4 h-4 animate-spin text-accent-neon" />
          ) : (
            <>
              <div className="flex items-center gap-3">
                 <current.icon className={`w-3.5 h-3.5 ${current.color}`} />
                 <span className="text-[10px] uppercase tracking-widest font-bold">{current.label}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-obsidian border-border-dim/30 w-[200px] p-2">
        {statuses.map((status) => (
          <DropdownMenuItem
            key={status.value}
            onClick={() => handleStatusUpdate(status.value)}
            className="flex items-center justify-between p-3 rounded-sm cursor-pointer hover:bg-white/5 text-text-low hover:text-white transition-colors"
          >
            <div className="flex items-center gap-3">
               <status.icon className={`w-3.5 h-3.5 ${status.color}`} />
               <span className="text-[9px] uppercase tracking-widest font-bold italic">{status.label}</span>
            </div>
            {currentStatus === status.value && <Check className="w-3.5 h-3.5 text-accent-neon" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
