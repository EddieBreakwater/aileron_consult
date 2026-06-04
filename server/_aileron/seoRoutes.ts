import type { Express, Request } from "express";
import { SPECIALTIES } from "../../shared/aileron";
import { BLOG_POSTS } from "../../shared/blog";

/**
 * Canonical public host for the marketing site. Used to build absolute URLs in
 * the sitemap and robots files. Falls back to the request host in dev.
 */
const CANONICAL_HOST = "https://www.aileronmd.com";

function resolveOrigin(req: Request): string {
  // In production we always advertise the canonical host so the sitemap is
  // stable regardless of which domain alias served the request. In dev we use
  // the live request origin so the file is testable on the preview URL.
  if (process.env.NODE_ENV === "production") return CANONICAL_HOST;
  const proto = (req.headers["x-forwarded-proto"] as string) || req.protocol || "https";
  const host = req.headers.host;
  return host ? `${proto}://${host}` : CANONICAL_HOST;
}

/** Static, publicly indexable marketing routes with crawl priorities. */
const STATIC_ROUTES: Array<{ path: string; priority: string; changefreq: string }> = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/specialties", priority: "0.9", changefreq: "monthly" },
  { path: "/how-it-works", priority: "0.8", changefreq: "monthly" },
  { path: "/pricing", priority: "0.8", changefreq: "monthly" },
  { path: "/insights", priority: "0.8", changefreq: "weekly" },
  { path: "/resources", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.5", changefreq: "yearly" },
];

export function buildSitemap(origin: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls: string[] = [];

  for (const route of STATIC_ROUTES) {
    urls.push(
      `  <url>\n    <loc>${origin}${route.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`,
    );
  }

  // Specialty deep-links (the Specialties page reads the hash on load).
  for (const s of SPECIALTIES) {
    urls.push(
      `  <url>\n    <loc>${origin}/specialties#${s.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>`,
    );
  }

  // Blog posts.
  for (const post of BLOG_POSTS) {
    urls.push(
      `  <url>\n    <loc>${origin}/insights/${post.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`,
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

export function buildRobots(origin: string): string {
  return [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard",
    "Disallow: /admin",
    "Disallow: /api/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");
}

/**
 * Registers robots.txt and sitemap.xml. MUST be called before the Vite/static
 * SPA catch-all so these paths are not swallowed by index.html.
 */
export function registerSeoRoutes(app: Express): void {
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain").send(buildRobots(resolveOrigin(req)));
  });

  app.get("/sitemap.xml", (req, res) => {
    res
      .type("application/xml")
      .send(buildSitemap(process.env.NODE_ENV === "production" ? CANONICAL_HOST : resolveOrigin(req)));
  });
}
