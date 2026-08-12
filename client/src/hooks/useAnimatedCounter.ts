import { useEffect, useState } from "react";

interface AnimatedCounterOptions {
  end: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  start?: number;
  enabled?: boolean;
}

export function useAnimatedCounter({
  end,
  duration = 2000,
  decimals = 0,
  suffix = "",
  prefix = "",
  start = 0,
  enabled = true,
}: AnimatedCounterOptions) {
  const [value, setValue] = useState(start);
  const [display, setDisplay] = useState(`${prefix}${start.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!enabled) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;

      setValue(current);
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, decimals, suffix, prefix, start, enabled]);

  return { value, display };
}
