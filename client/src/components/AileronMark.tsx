interface AileronMarkProps {
  className?: string;
  /** When true, render single-color in currentColor (for monochrome contexts). */
  mono?: boolean;
}

/**
 * Official AileronMD Consult mark.
 *
 * Concept: an angular winged "A" formed by two solid panels.
 * - Upper-right panel: Medical Navy (#0B1E3A) — the body of the A.
 * - Lower-left wing: Surgical Teal (#0EA5A4) — carries a white medical cross,
 *   tying the practice management mission to medicine.
 *
 * The shape is designed to read from 18px favicon through 96px hero.
 */
export function AileronMark({ className, mono = false }: AileronMarkProps) {
  if (mono) {
    return (
      <svg
        className={className}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Combined silhouette — keeps the A-wing read at small sizes */}
        <path
          d="M40 4 L58 60 L46 60 L42 48 L22 48 L18 60 L6 60 L36 4 Z"
          fill="currentColor"
        />
        {/* Cross cut-out for monochrome contexts */}
        <path d="M30 28 H38 V32 H34 V40 H30 Z M28 32 H40 V36 H28 Z" fill="white" opacity="0.92" />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Lower-left wing in Surgical Teal — softens the navy mass */}
      <path
        d="M6 60 L22 60 L36 24 L36 4 L36 4 L6 60 Z"
        fill="#0EA5A4"
      />
      {/* Subtle deeper teal at the wing tip for dimension */}
      <path
        d="M6 60 L22 60 L26 50 L14 50 Z"
        fill="#0B8F8E"
        opacity="0.55"
      />
      {/* Body of the A — Medical Navy */}
      <path
        d="M36 4 L58 60 L46 60 L42 48 L22 48 L26 38 L36 38 L36 4 Z"
        fill="#0B1E3A"
      />
      {/* The fly-away navy fold suggesting the upstroke */}
      <path
        d="M36 4 L58 60 L52 60 L36 24 Z"
        fill="#13294B"
      />
      {/* Medical cross sitting in the wing */}
      <g transform="translate(0,0)">
        <rect x="22" y="34" width="8" height="14" rx="0.5" fill="white" />
        <rect x="18" y="38" width="16" height="6" rx="0.5" fill="white" />
      </g>
    </svg>
  );
}
