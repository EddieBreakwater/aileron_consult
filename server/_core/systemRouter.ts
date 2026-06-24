import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { notifyOwner } from "./notification";
import { adminProcedure, publicProcedure, router } from "./trpc";

// Simple in-memory rate limiter for contact form (IP-based, 60s window)
const contactRateLimits = new Map<string, number>();
function checkContactRateLimit(ip: string): boolean {
  const now = Date.now();
  const lastCall = contactRateLimits.get(ip);
  if (lastCall && now - lastCall < 60000) {
    return false; // Rate limited
  }
  contactRateLimits.set(ip, now);
  // Cleanup old entries every 100 calls
  if (contactRateLimits.size > 1000) {
    const cutoff = now - 120000;
    const keysToDelete: string[] = [];
    contactRateLimits.forEach((v, k) => {
      if (v < cutoff) keysToDelete.push(k);
    });
    keysToDelete.forEach(k => contactRateLimits.delete(k));
  }
  return true;
}

export const systemRouter = router({
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(255),
          email: z.string().email(),
          practice: z.string().max(255).optional().nullable(),
          message: z.string().min(1).max(5000),
        }),
      )
      .mutation(async ({ input, ctx }) => {
        const ip = (ctx.req.headers["x-forwarded-for"] as string) || ctx.req.socket.remoteAddress || "unknown";
        if (!checkContactRateLimit(ip)) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message: "Please wait before sending another message.",
          });
        }
        const delivered = await notifyOwner({
          title: `New AileronMD inquiry from ${input.name}`,
          content: `From: ${input.name} <${input.email}>\nPractice: ${input.practice || "—"}\n\n${input.message}`,
        });
        return { success: delivered };
      }),
  }),

  health: publicProcedure
    .input(
      z.object({
        timestamp: z.number().min(0, "timestamp cannot be negative"),
      })
    )
    .query(() => ({
      ok: true,
    })),

  notifyOwner: adminProcedure
    .input(
      z.object({
        title: z.string().min(1, "title is required"),
        content: z.string().min(1, "content is required"),
      })
    )
    .mutation(async ({ input }) => {
      const delivered = await notifyOwner(input);
      return {
        success: delivered,
      } as const;
    }),
});
