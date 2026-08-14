import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (relativePath: string) =>
  readFileSync(resolve(process.cwd(), relativePath), "utf8");

const homePage = readProjectFile("client/src/pages/Home.tsx");
const whatYouGetPage = readProjectFile("client/src/pages/HowItWorks.tsx");
const pricingPage = readProjectFile("client/src/pages/Pricing.tsx");

describe("operations-focused public content", () => {
  it("grounds the homepage in actual operating domains and decision questions", () => {
    expect(homePage).toContain("Access & schedule");
    expect(homePage).toContain("Revenue cycle");
    expect(homePage).toContain("Schedule integrity");
    expect(homePage).toContain("Provider capacity");
    expect(homePage).toContain("The questions that show up in a real practice meeting.");
  });

  it("uses the finished video instead of a coming-soon placeholder on What you get", () => {
    expect(whatYouGetPage).toContain('videoUrl="/manus-storage/aileron-value-video-branded-final_29121ff8.mp4"');
    expect(whatYouGetPage).not.toContain("Video coming soon");
  });

  it("frames pricing around operating use cases without popularity claims", () => {
    expect(pricingPage).toContain("What the monthly read supports");
    expect(pricingPage).toContain("Access is widening");
    expect(pricingPage).toContain("Cash is slowing");
    expect(pricingPage).not.toContain("Most chosen");
  });
});
