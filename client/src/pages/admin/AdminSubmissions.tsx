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
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function AdminSubmissions() {
  const subs = trpc.admin.submissions.useQuery();
  const practices = trpc.admin.practices.useQuery();
  const utils = trpc.useUtils();
  const generate = trpc.admin.generateBriefingForPractice.useMutation({
    onSuccess: () => {
      toast.success("Briefing generated for that period");
      utils.admin.briefings.invalidate();
    },
    onError: e => toast.error(e.message),
  });

  const practiceMap = new Map((practices.data ?? []).map(p => [p.id, p]));

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </div>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Submissions
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            All KPI submissions across practices. Generate a briefing for any submitted period.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {subs.isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (subs.data ?? []).length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">
              No submissions yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Practice</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(subs.data ?? []).map(s => {
                  const p = practiceMap.get(s.practiceId);
                  return (
                    <TableRow key={s.id}>
                      <TableCell className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {new Date(s.year, s.month - 1).toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium text-primary">{p?.name ?? `#${s.practiceId}`}</div>
                        <div className="text-xs text-muted-foreground">{p?.specialty ?? "—"}</div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="max-w-[280px] truncate text-xs text-muted-foreground">
                        {s.notes ?? "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={generate.isPending}
                          onClick={() =>
                            generate.mutate({
                              practiceId: s.practiceId,
                              month: s.month,
                              year: s.year,
                            })
                          }
                        >
                          <Sparkles className="mr-1.5 h-3.5 w-3.5 text-accent" />
                          Generate briefing
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
