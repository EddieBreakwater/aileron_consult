import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { trpc } from "@/lib/trpc";
import { SPECIALTY_LABELS } from "@shared/aileron";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function AdminPractices() {
  const [q, setQ] = useState("");
  const practices = trpc.admin.practices.useQuery();

  const filtered = (practices.data ?? []).filter(p =>
    [p.name, p.specialty, p.region ?? "", p.contactEmail ?? ""]
      .join(" ")
      .toLowerCase()
      .includes(q.toLowerCase()),
  );

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </div>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Practices
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            All registered practices across the platform.
          </p>
        </div>

        <Input
          placeholder="Search by name, specialty, region…"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="max-w-md"
        />

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {practices.isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Practice</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Providers</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                      No practices yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map(p => (
                    <TableRow key={p.id}>
                      <TableCell>
                        <div className="font-medium text-primary">{p.name}</div>
                        <div className="text-xs text-muted-foreground">{p.contactEmail ?? "—"}</div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {SPECIALTY_LABELS[p.specialty] ?? p.specialty}
                      </TableCell>
                      <TableCell className="num text-sm">{p.providerCount}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {p.groupTier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize ${
                            p.subscriptionStatus === "active"
                              ? "border-accent/40 bg-accent/10 text-accent"
                              : p.subscriptionStatus === "trial"
                                ? "border-amber-300 bg-amber-50 text-amber-700"
                                : "border-destructive/40 bg-destructive/10 text-destructive"
                          }`}
                        >
                          {p.subscriptionStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{p.region ?? "—"}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
