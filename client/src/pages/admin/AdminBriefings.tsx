import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { Link } from "wouter";

export default function AdminBriefings() {
  const briefings = trpc.admin.briefings.useQuery();
  const practices = trpc.admin.practices.useQuery();
  const practiceMap = new Map((practices.data ?? []).map(p => [p.id, p]));

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </div>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Briefings
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">All published briefings across the platform.</p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {briefings.isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (briefings.data ?? []).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No briefings yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Practice</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Generated</TableHead>
                  <TableHead className="text-right">Open</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(briefings.data ?? []).map(b => {
                  const p = practiceMap.get(b.practiceId);
                  return (
                    <TableRow key={b.id}>
                      <TableCell className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {new Date(b.year, b.month - 1).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium text-primary">{p?.name ?? `#${b.practiceId}`}</div>
                        <div className="text-xs text-muted-foreground">{p?.specialty ?? "—"}</div>
                      </TableCell>
                      <TableCell className="max-w-[320px] truncate text-sm">{b.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-accent/30 bg-accent/5 capitalize text-accent"
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(b.generatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/dashboard/briefing/${b.id}`}>Open</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
