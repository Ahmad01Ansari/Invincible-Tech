import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  size = "default",
  className,
  as: Component = "div",
}: ContainerProps) {
  const maxWidths = {
    default: "max-w-[1200px]",
    narrow: "max-w-[800px]",
    wide: "max-w-[1400px]",
  };

  return (
    <Component
      className={cn("mx-auto w-full px-6 lg:px-8", maxWidths[size], className)}
    >
      {children}
    </Component>
  );
}
