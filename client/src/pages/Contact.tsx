import { PublicLayout } from "@/components/PublicLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  useDocumentTitle(
    "Contact \u2014 Talk to AileronMD Consult",
    "Request a specialty, ask about enterprise plans, or send a question. We reply to every message within one business day.",
  );
  const [form, setForm] = useState({ name: "", email: "", practice: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const notify = trpc.system.notifyOwner.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    try {
      await notify.mutateAsync({
        title: `New AileronMD inquiry — ${form.name}`,
        content: `From: ${form.name} <${form.email}>\nPractice: ${form.practice || "—"}\n\n${form.message}`,
      });
      setSubmitted(true);
    } catch {
      toast.error("Could not send. Try emailing us at hello@aileronmd.com.");
    }
  };

  return (
    <PublicLayout>
      <section className="border-b border-border/60 bg-secondary/30">
        <div className="container py-20">
          <div className="max-w-3xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Contact
            </div>
            <h1 className="mt-3 font-serif text-4xl tracking-tight text-primary md:text-5xl">
              Tell us about your practice.
            </h1>
            <p className="mt-5 text-base leading-7 text-muted-foreground">
              Whether you want a discovery consult, a custom enterprise plan, or to request a new
              specialty — drop a note. A senior advisor reads every message.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="container py-16">
          <div className="mx-auto max-w-2xl">
            {submitted ? (
              <div className="rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center">
                <div className="font-serif text-2xl text-primary">Got it. Thank you.</div>
                <p className="mt-3 text-sm text-muted-foreground">
                  A senior advisor will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 rounded-2xl border border-border/70 bg-card p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Your name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="mt-1.5"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="mt-1.5"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="practice">Practice name (optional)</Label>
                  <Input
                    id="practice"
                    value={form.practice}
                    onChange={e => setForm(f => ({ ...f, practice: e.target.value }))}
                    className="mt-1.5"
                  />
                </div>

                <div>
                  <Label htmlFor="message">What can we help with?</Label>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="mt-1.5 min-h-[140px]"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/92"
                  disabled={notify.isPending}
                >
                  {notify.isPending ? "Sending..." : "Send message"}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  Or email us directly at{" "}
                  <a className="font-medium text-primary hover:text-accent" href="mailto:hello@aileronmd.com">
                    hello@aileronmd.com
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
