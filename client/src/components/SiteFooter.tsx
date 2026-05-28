import { Link } from "wouter";
import { AileronMark } from "@/components/AileronMark";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <AileronMark className="h-7 w-7 text-primary" />
              <div className="leading-tight">
                <div className="font-serif text-base font-semibold text-primary">AileronMD</div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  Consult
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-accent">
              Operational guidance for physician leadership.
            </p>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Monthly operational briefings for medical practices. Specialty-specific benchmarks,
              clear priorities, no dashboards to babysit.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80">
              Product
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/how-it-works" className="text-muted-foreground hover:text-primary">How it works</Link></li>
              <li><Link href="/specialties" className="text-muted-foreground hover:text-primary">Specialties</Link></li>
              <li><Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link></li>
              <li><Link href="/resources" className="text-muted-foreground hover:text-primary">EHR reporting guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/insights" className="text-muted-foreground hover:text-primary">Insights</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} AileronMD Consult. Built for independent medical practices.</span>
          <span className="font-mono">Made with care, never with telemetry you didn’t ask for.</span>
        </div>
      </div>
    </footer>
  );
}
