import { Play } from "lucide-react";
import { useState } from "react";

interface VideoEmbedProps {
  /** Loom or YouTube embed URL. Leave empty for placeholder state. */
  embedUrl?: string;
  title?: string;
  description?: string;
}

export function VideoEmbed({
  embedUrl,
  title = "See a real briefing, start to finish.",
  description = "Watch a two-minute walkthrough of what arrives in your inbox each month: the executive summary, the scorecard, and the three ranked actions.",
}: VideoEmbedProps) {
  const [playing, setPlaying] = useState(false);

  if (playing && embedUrl) {
    return (
      <div className="relative w-full overflow-hidden rounded-2xl border border-border/50 bg-black" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={embedUrl}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="AileronMD Briefing Walkthrough"
        />
      </div>
    );
  }

  return (
    <div
      className="group relative w-full cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-primary transition-all duration-300 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/10"
      style={{ paddingBottom: "56.25%" }}
      onClick={() => embedUrl && setPlaying(true)}
    >
      {/* Ambient background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-accent/10 blur-2xl" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/30">
          <Play className="h-8 w-8 text-white ml-1" fill="white" fillOpacity={0.9} />
        </div>
        <h3 className="mt-6 font-serif text-2xl text-white md:text-3xl">{title}</h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-white/70">{description}</p>
        {!embedUrl && (
          <div className="mt-5 rounded-full bg-white/10 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/60">
            Video coming soon
          </div>
        )}
      </div>
    </div>
  );
}
