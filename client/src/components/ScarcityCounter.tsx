import { useEffect, useState } from "react";
import { Users } from "lucide-react";

interface ScarcityCounterProps {
  totalSpots?: number;
  className?: string;
  variant?: "inline" | "badge";
}

/**
 * Shows a "X of Y spots remaining this month" scarcity indicator.
 * Uses a deterministic pseudo-random based on the current month so the number
 * stays consistent within a month but changes month-to-month.
 */
export function ScarcityCounter({
  totalSpots = 5,
  className = "",
  variant = "badge",
}: ScarcityCounterProps) {
  const [remaining, setRemaining] = useState(totalSpots);

  useEffect(() => {
    // Deterministic "remaining" based on current month + year
    const now = new Date();
    const seed = now.getFullYear() * 12 + now.getMonth();
    // Always show 2-3 remaining to create urgency without feeling fake
    const r = 2 + (seed % 2); // 2 or 3
    setRemaining(r);
  }, []);

  if (variant === "inline") {
    return (
      <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-accent ${className}`}>
        <Users className="h-3.5 w-3.5" />
        <span className="tabular-nums">{remaining}</span> of {totalSpots} spots remaining this month
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span className="text-sm font-medium text-foreground/85">
        <span className="tabular-nums font-semibold text-accent">{remaining}</span> of {totalSpots} spots remaining this month
      </span>
    </div>
  );
}
