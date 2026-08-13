import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const homePage = readFileSync(
  resolve(process.cwd(), "client/src/pages/Home.tsx"),
  "utf8",
);

describe("homepage walkthrough video", () => {
  it("embeds the branded AileronMD video with accessible native controls", () => {
    expect(homePage).toContain("<video");
    expect(homePage).toContain("controls");
    expect(homePage).toContain('aria-label="AileronMD Consult value walkthrough"');
    expect(homePage).toContain(
      "/manus-storage/aileron-value-video-branded-final_29121ff8.mp4",
    );
  });
});
