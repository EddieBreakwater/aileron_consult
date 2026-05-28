import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { SPECIALTIES } from "@shared/aileron";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  initial?: {
    name?: string | null;
    specialty?: string | null;
    providerCount?: number | null;
    groupTier?: "solo" | "group" | null;
    region?: string | null;
    contactEmail?: string | null;
  };
  onSaved?: () => void;
}

export function PracticeProfileForm({ initial, onSaved }: Props) {
  const utils = trpc.useUtils();
  const [name, setName] = useState(initial?.name ?? "");
  const [specialty, setSpecialty] = useState<string>(initial?.specialty ?? "primary_care");
  const [providerCount, setProviderCount] = useState<number>(initial?.providerCount ?? 1);
  const [groupTier, setGroupTier] = useState<"solo" | "group">(initial?.groupTier ?? "solo");
  const [region, setRegion] = useState(initial?.region ?? "");
  const [email, setEmail] = useState(initial?.contactEmail ?? "");

  const upsert = trpc.practice.upsert.useMutation({
    onSuccess: () => {
      toast.success("Practice profile saved");
      utils.practice.me.invalidate();
      onSaved?.();
    },
    onError: e => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Practice name is required");
    upsert.mutate({
      name: name.trim(),
      specialty: specialty as "primary_care",
      providerCount,
      groupTier,
      region: region || null,
      contactEmail: email || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Practice name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="mt-1.5"
          placeholder="Mason Family Medicine"
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Specialty</Label>
          <Select value={specialty} onValueChange={setSpecialty}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SPECIALTIES.map(s => (
                <SelectItem key={s.slug} value={s.slug}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="providerCount">Number of providers (FTE)</Label>
          <Input
            id="providerCount"
            type="number"
            min={1}
            max={500}
            value={providerCount}
            onChange={e => setProviderCount(Math.max(1, parseInt(e.target.value) || 1))}
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Plan tier</Label>
          <Select value={groupTier} onValueChange={v => setGroupTier(v as "solo" | "group")}>
            <SelectTrigger className="mt-1.5">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo — $199/mo</SelectItem>
              <SelectItem value="group">Group — $349/mo</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="region">Region (optional)</Label>
          <Input
            id="region"
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="mt-1.5"
            placeholder="Midwest, Pacific Northwest…"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Contact email (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1.5"
        />
      </div>

      <Button
        type="submit"
        disabled={upsert.isPending}
        size="lg"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/92"
      >
        {upsert.isPending ? "Saving..." : "Save practice profile"}
      </Button>
    </form>
  );
}
