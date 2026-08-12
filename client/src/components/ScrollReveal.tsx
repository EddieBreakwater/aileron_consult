import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  distance?: number;
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 700,
  distance = 30,
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  const transforms: Record<string, string> = {
    up: `translateY(${distance}px)`,
    down: `translateY(-${distance}px)`,
    left: `translateX(${distance}px)`,
    right: `translateX(-${distance}px)`,
    none: "none",
  };

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : transforms[direction],
        transition: `opacity ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.23, 1, 0.32, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
