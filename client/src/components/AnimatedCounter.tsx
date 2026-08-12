import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  className,
}: AnimatedCounterProps) {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>({ once: true });
  const { display } = useAnimatedCounter({
    end,
    duration,
    decimals,
    suffix,
    prefix,
    enabled: isVisible,
  });

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display}
    </span>
  );
}
