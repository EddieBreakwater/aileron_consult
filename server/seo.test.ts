import { describe, expect, it } from "vitest";
import { buildRobots, buildSitemap } from "./_aileron/seoRoutes";
import { SPECIALTIES } from "../shared/aileron";
import { BLOG_POSTS } from "../shared/blog";

const ORIGIN = "https://www.aileronmd.com";

describe("robots.txt", () => {
  const robots = buildRobots(ORIGIN);

  it("allows crawling and points at the sitemap", () => {
    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain(`Sitemap: ${ORIGIN}/sitemap.xml`);
  });

  it("keeps private areas out of the index", () => {
    expect(robots).toContain("Disallow: /dashboard");
    expect(robots).toContain("Disallow: /admin");
    expect(robots).toContain("Disallow: /api/");
  });
});

describe("sitemap.xml", () => {
  const sitemap = buildSitemap(ORIGIN);

  it("is well-formed and lists the homepage", () => {
    expect(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
    expect(sitemap).toContain("<urlset");
    expect(sitemap).toContain(`<loc>${ORIGIN}/</loc>`);
  });

  it("includes every specialty deep-link", () => {
    for (const s of SPECIALTIES) {
      expect(sitemap).toContain(`${ORIGIN}/specialties#${s.slug}`);
    }
  });

  it("includes every blog post", () => {
    for (const post of BLOG_POSTS) {
      expect(sitemap).toContain(`<loc>${ORIGIN}/insights/${post.slug}</loc>`);
    }
  });

  it("has one <url> entry per known URL (7 static + specialties + posts)", () => {
    const count = (sitemap.match(/<url>/g) ?? []).length;
    expect(count).toBe(7 + SPECIALTIES.length + BLOG_POSTS.length);
  });
});
