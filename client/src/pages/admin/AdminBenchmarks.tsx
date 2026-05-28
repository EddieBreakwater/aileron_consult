import DashboardLayout from "@/components/DashboardLayout";
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
import { kpiByKey, SPECIALTY_LABELS } from "@shared/aileron";
import { Database, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminBenchmarks() {
  const benchmarks = trpc.admin.benchmarks.useQuery();
  const utils = trpc.useUtils();
  const seed = trpc.admin.seedBenchmarks.useMutation({
    onSuccess: r => {
      toast.success(`Seeded benchmarks (total ${r.total})`);
      utils.admin.benchmarks.invalidate();
    },
    onError: e => toast.error(e.message),
  });

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Admin
            </div>
            <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
              Benchmarks
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Specialty-specific KPI benchmarks. Update the seed file to push new values.
            </p>
          </div>
          <Button
            onClick={() => seed.mutate()}
            disabled={seed.isPending}
            className="bg-primary text-primary-foreground hover:bg-primary/92"
          >
            <Database className="mr-1.5 h-4 w-4" />
            {seed.isPending ? "Seeding..." : "Seed / re-seed benchmarks"}
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {benchmarks.isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (benchmarks.data ?? []).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No benchmarks loaded yet. Use the seed button.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Metric</TableHead>
                  <TableHead className="text-right">P25</TableHead>
                  <TableHead className="text-right">Median</TableHead>
                  <TableHead className="text-right">P75</TableHead>
                  <TableHead className="text-right">Flag</TableHead>
                  <TableHead>Direction</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(benchmarks.data ?? []).map(b => {
                  const def = kpiByKey(b.metric);
                  return (
                    <TableRow key={b.id}>
                      <TableCell className="text-sm">
                        {SPECIALTY_LABELS[b.specialty] ?? b.specialty}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-primary">{def?.label ?? b.metric}</div>
                        <div className="font-mono text-[10px] text-muted-foreground">
                          {b.metric}
                        </div>
                      </TableCell>
                      <TableCell className="num text-right text-sm">
                        {b.percentile25 ? Number(b.percentile25).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell className="num text-right text-sm font-medium text-primary">
                        {Number(b.medianValue).toLocaleString()}
                      </TableCell>
                      <TableCell className="num text-right text-sm">
                        {b.percentile75 ? Number(b.percentile75).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell className="num text-right text-sm text-destructive">
                        {b.flagThreshold ? Number(b.flagThreshold).toLocaleString() : "—"}
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {b.higherIsBetter ? "↑ higher better" : "↓ lower better"}
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
