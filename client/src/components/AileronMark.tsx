interface AileronMarkProps {
  className?: string;
}

/**
 * Abstract aileron / delta-wing mark.
 * Designed to read at sizes from 18px (favicon) through 64px (hero).
 */
export function AileronMark({ className }: AileronMarkProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="aileron-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M3 26 L29 6 L29 14 L13 26 Z"
        fill="url(#aileron-grad)"
      />
      <path
        d="M11 26 L29 12 L29 19 L19 26 Z"
        fill="currentColor"
        opacity="0.35"
      />
      <circle cx="29" cy="6" r="1.6" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
