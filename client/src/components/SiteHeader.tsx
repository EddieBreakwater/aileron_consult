import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { AileronMark } from "@/components/AileronMark";

const NAV = [
  { href: "/specialties", label: "Specialties" },
  { href: "/how-it-works", label: "What you get" },
  { href: "/pricing", label: "Pricing" },
  { href: "/insights", label: "Insights" },
  { href: "/resources", label: "Resources" },
];

export function SiteHeader() {
  const { isAuthenticated, user } = useAuth();
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <AileronMark className="h-7 w-7 text-primary transition-transform duration-300 group-hover:rotate-[8deg]" />
          <div className="leading-tight">
            <div className="font-serif text-base font-semibold tracking-tight text-primary">
              AileronMD
            </div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Consult
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV.map(item => {
            const active = location.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  active
                    ? "text-primary"
                    : "text-foreground/70 hover:text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {user?.name?.split(" ")[0] ?? "Welcome"}
              </span>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/92">
                <Link href="/dashboard">Open dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <a
                href={getLoginUrl()}
                className="hidden text-sm font-medium text-foreground/75 hover:text-primary md:inline-block"
              >
                Sign in
              </a>
              <Button
                asChild
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/92"
              >
                <Link href="/pricing">Start a trial</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
