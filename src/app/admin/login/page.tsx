"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Lock, User, Terminal, Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("AUTHENTICATION_FAILURE: INVALID_CREDENTIALS");
      } else {
        router.push("/admin");
      }
    } catch (err) {
      setError("SYSTEM_FAILURE: UNABLE_TO_REACH_AUTH_SERVER");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-obsidian flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blueprint Background */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-orange/5 blur-[120px] rounded-full pointer-events-none" />

      <Container className="relative z-10 max-w-lg">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="bg-surface-100 border border-border-dim/20 p-8 md:p-12 shadow-2xl relative"
        >
          {/* Top-Right Technical ID */}
          <div className="absolute top-4 right-4 text-[8px] font-mono text-text-low/20 vertical-writing uppercase tracking-widest hidden md:block">
             ADMIN_GATEWAY_v4.2
          </div>

          <div className="text-center mb-10">
            <Badge variant="dim" className="mb-6 font-mono tracking-[0.2em] uppercase text-[10px]">
              Access_Protocol_01
            </Badge>
            <h1 className="text-3xl font-display font-medium text-text-high tracking-tight mb-2">
              Engineering <span className="text-accent-orange">Portal.</span>
            </h1>
            <p className="text-xs font-mono text-text-low uppercase tracking-widest opacity-60">
              Restricted Admin Entry
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] ml-1">Identity (Email)</label>
              <div className="relative group">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low group-focus-within:text-accent-orange transition-colors" size={18} />
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   required
                   placeholder="ADMIN_ID@INVINSABLE.TECH"
                   className="w-full bg-obsidian border border-border-dim/30 rounded-sm pl-12 pr-4 py-4 text-sm font-mono text-text-high focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20"
                 />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-mono text-text-low uppercase tracking-[0.2em] ml-1">Security Key</label>
              <div className="relative group">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-low group-focus-within:text-accent-orange transition-colors" size={18} />
                 <input 
                   type="password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                   placeholder="••••••••••••"
                   className="w-full bg-obsidian border border-border-dim/30 rounded-sm pl-12 pr-4 py-4 text-sm font-mono text-text-high focus:outline-none focus:border-accent-orange transition-all placeholder:text-text-low/20"
                 />
              </div>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-sm"
              >
                <AlertCircle size={16} />
                <span className="text-[10px] font-mono uppercase tracking-widest leading-none">{error}</span>
              </motion.div>
            )}

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-16 bg-accent-orange text-obsidian font-mono font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  AUTHENTICATING...
                </>
              ) : (
                <>
                  Initiate Sync
                  <Terminal size={14} />
                </>
              )}
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-border-dim/10 text-center">
             <p className="text-[8px] font-mono text-text-low/30 uppercase tracking-[0.3em]">
                Secure SHA-256 Cloud Transmission • Global Network Active
             </p>
          </div>
        </motion.div>
      </Container>
    </main>
  );
}
