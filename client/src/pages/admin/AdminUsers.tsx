import DashboardLayout from "@/components/DashboardLayout";
import { Badge } from "@/components/ui/badge";
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

export default function AdminUsers() {
  const users = trpc.admin.users.useQuery();

  return (
    <DashboardLayout>
      <div className="space-y-7">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
            Admin
          </div>
          <h1 className="mt-1 font-serif text-3xl tracking-tight text-primary md:text-4xl">
            Users
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            All registered users. Promote a user to admin by updating the role in the database.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          {users.isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Login method</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last seen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(users.data ?? []).map(u => (
                  <TableRow key={u.id}>
                    <TableCell className="font-medium text-primary">{u.name ?? "—"}</TableCell>
                    <TableCell className="text-sm">{u.email ?? "—"}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          u.role === "admin"
                            ? "border-accent/30 bg-accent/5 text-accent"
                            : ""
                        }
                      >
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {u.loginMethod ?? "—"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(u.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(u.lastSignedIn).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
