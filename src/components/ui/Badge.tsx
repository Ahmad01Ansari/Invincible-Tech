import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "orange" | "neon" | "dim";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, variant = "dim", size = "sm", className }: BadgeProps) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full whitespace-nowrap transition-colors";
  
  const variants = {
    orange: "bg-accent-orange/10 text-accent-orange border border-accent-orange/20",
    neon: "bg-accent-neon/10 text-accent-neon border border-accent-neon/20",
    dim: "bg-surface-200 text-text-low border border-border-dim",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}
