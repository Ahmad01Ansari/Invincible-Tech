"use client";

import { useState } from "react";
import { 
  MessageSquare, 
  Plus, 
  Loader2, 
  Send, 
  Terminal, 
  Clock, 
  MoreVertical,
  Activity
} from "lucide-react";
import { addInternalNote } from "@/app/actions/contact";
import { Button } from "@/components/ui/Button";
import { formatDistanceToNow } from "date-fns";

export function NotesEngine({ id, initialNotes }: { id: string; initialNotes: any[] }) {
  const [noteText, setNoteText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setIsSubmitting(true);
    try {
      const result = await addInternalNote(id, noteText);
      if (!result.success) throw new Error(result.error);
      setNoteText("");
    } catch (error: any) {
      alert("AUDIT_LOG_FAILURE: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface-100 border border-border-dim/10 p-8 rounded-sm">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3 text-[10px] text-text-low/40 uppercase tracking-[0.2em]">
          <Activity size={12} className="text-accent-neon" /> Mission Audit Log
        </div>
        <div className="text-[9px] font-mono text-text-low/20">EVENT_COUNT: {initialNotes.length}</div>
      </div>

      <div className="space-y-6 mb-12">
        {initialNotes.length === 0 ? (
          <div className="py-12 border border-dashed border-border-dim/10 rounded-sm text-center">
             <MessageSquare size={24} className="mx-auto mb-4 text-text-low/20" />
             <p className="text-[10px] font-mono text-text-low uppercase tracking-widest opacity-40">Zero telemetry entries logged for this inquiry.</p>
          </div>
        ) : (
          initialNotes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((note, index) => (
            <div key={index} className="flex gap-6 items-start group">
               <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                     <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-accent-neon uppercase tracking-widest italic">{note.author}</span>
                        <span className="w-1 h-1 rounded-full bg-border-dim/20" />
                        <span className="text-[9px] text-text-low font-mono flex items-center gap-1.5 opacity-60">
                           <Clock size={10} /> {formatDistanceToNow(new Date(note.createdAt))} ago
                        </span>
                     </div>
                  </div>
                  <div className="text-sm text-text-low leading-relaxed group-hover:text-text-high transition-colors">
                     {note.text}
                  </div>
               </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleAddNote} className="relative group">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="ENTER_AUDIT_DATA..."
          className="w-full bg-obsidian border border-border-dim/20 rounded-sm p-6 pr-20 text-xs font-mono text-text-high focus:outline-none focus:border-accent-neon/40 transition-all resize-none min-h-[140px] placeholder:text-text-low/20"
        />
        <div className="absolute right-4 bottom-4">
           <Button 
            type="submit" 
            size="sm" 
            disabled={isSubmitting || !noteText.trim()}
            className="bg-accent-neon text-obsidian uppercase tracking-widest text-[9px] font-bold h-10 px-4 hover:bg-white transition-all shadow-glow-neon border-none"
           >
             {isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} className="mr-2" />} DEPLOY
           </Button>
        </div>
      </form>
      
      <div className="mt-6 flex items-center gap-4 text-[9px] font-mono text-text-low opacity-20 uppercase tracking-[0.2em]">
         <span className="flex items-center gap-1.5"><Plus size={10} /> ALT+ENTER TO SUBMIT</span>
         <span className="w-1 h-1 rounded-full bg-current" />
         <span>SECURITY: LEVEL_4_ENCRYPTED</span>
      </div>
    </div>
  );
}
