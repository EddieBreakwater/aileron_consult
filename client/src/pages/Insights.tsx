import { PublicLayout } from "@/components/PublicLayout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { trpc } from "@/lib/trpc";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function Insights() {
  useDocumentTitle(
    "Insights \u2014 Practice Operations Library",
    "Plain-English answers to real practice management problems: revenue cycle, scheduling, payer contracts, staffing, overhead, and resilience.",
  );
  const { data, isLoading } = trpc.blog.list.useQuery();

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Insights
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              Real practice problems. Plain-English answers.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Fifteen field notes from working with independent practices. No advertorials, no
              listicles, no “seven tips for better leadership.” The actual problems we hear in
              consults, and what the working answer looks like.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(data ?? []).map((post, idx) => (
                <Link key={post.slug} href={`/insights/${post.slug}`}>
                  <article className="lift flex h-full flex-col rounded-xl border border-border/70 bg-card p-7">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                        {post.category}
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground">
                        № {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>
                    <h3 className="mt-4 font-serif text-lg leading-snug text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                      <span>{post.readingTimeMin} min read</span>
                      <ArrowUpRight className="h-4 w-4 text-primary" />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PublicLayout>
  );
}
