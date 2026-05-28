import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Streamdown } from "streamdown";
import { Link, useParams } from "wouter";

export default function BlogPost() {
  const { slug } = useParams();
  const post = trpc.blog.bySlug.useQuery({ slug: slug ?? "" }, { enabled: !!slug });
  const allPosts = trpc.blog.list.useQuery();
  useDocumentTitle(
    post.data?.title ?? "Insights \u2014 Practice Operations",
    post.data?.excerpt ?? undefined,
  );

  if (post.isLoading || allPosts.isLoading) {
    return (
      <PublicLayout>
        <div className="container flex justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </PublicLayout>
    );
  }

  if (!post.data) {
    return (
      <PublicLayout>
        <div className="container py-32 text-center">
          <h1 className="font-serif text-3xl text-primary">Post not found</h1>
          <Button asChild variant="outline" className="mt-6">
            <Link href="/insights">Back to Insights</Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  const idx = (allPosts.data ?? []).findIndex(p => p.slug === post.data.slug);
  const prev = idx > 0 ? (allPosts.data ?? [])[idx - 1] : null;
  const next = idx >= 0 && idx < (allPosts.data ?? []).length - 1 ? (allPosts.data ?? [])[idx + 1] : null;

  return (
    <PublicLayout>
      <article>
        <header className="border-b border-border/60 bg-secondary/30">
          <div className="container py-16">
            <Link
              href="/insights"
              className="inline-flex items-center text-xs font-medium text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
              All Insights
            </Link>
            <div className="mt-6 max-w-3xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {post.data.category}
              </div>
              <h1 className="mt-3 font-serif text-4xl leading-tight tracking-tight text-primary md:text-5xl">
                {post.data.title}
              </h1>
              <div className="mt-4 text-sm text-muted-foreground">
                {post.data.readingTimeMin} min read
              </div>
            </div>
          </div>
        </header>

        <section className="py-16">
          <div className="container max-w-3xl">
            <div className="prose-aileron">
              <Streamdown>{post.data.body}</Streamdown>
            </div>

            <div className="mt-16 rounded-2xl border border-accent/30 bg-accent/5 p-8">
              <h3 className="font-serif text-xl text-primary">Want this clarity for your own practice?</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A monthly briefing reads about as long as this post. The difference: it’s about
                you, your specialty, and your numbers.
              </p>
              <Button asChild className="mt-5 bg-primary text-primary-foreground hover:bg-primary/92">
                <Link href="/pricing">Start a 30-day trial</Link>
              </Button>
            </div>

            <nav className="mt-12 grid gap-4 border-t border-border/60 pt-8 sm:grid-cols-2">
              {prev ? (
                <Link href={`/insights/${prev.slug}`} className="group">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    <ArrowLeft className="mr-1 inline h-3 w-3" />
                    Previous
                  </div>
                  <div className="mt-2 font-serif text-base text-primary group-hover:text-accent">
                    {prev.title}
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/insights/${next.slug}`} className="group text-right">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Next
                    <ArrowRight className="ml-1 inline h-3 w-3" />
                  </div>
                  <div className="mt-2 font-serif text-base text-primary group-hover:text-accent">
                    {next.title}
                  </div>
                </Link>
              ) : <div />}
            </nav>
          </div>
        </section>
      </article>
    </PublicLayout>
  );
}
