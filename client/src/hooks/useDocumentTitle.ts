import { useEffect } from "react";

const SUFFIX = " | AileronMD Consult";
const DEFAULT_TITLE = "AileronMD Consult — Operational Briefings";

/**
 * Sets `document.title` (target 30–60 chars) and optionally the
 * `<meta name="description">` content for the current page.
 *
 * Pass a short page title; the suffix " | AileronMD Consult" is appended
 * unless the input already contains "AileronMD". If the title still ends up
 * shorter than 30 characters after the suffix, we fall back to the default.
 */
const CANONICAL_ORIGIN = "https://www.aileronmd.com";

export interface DocumentMetaOptions {
  /** Path (e.g. "/insights/foo") used to build the canonical URL. */
  canonicalPath?: string;
  /** Optional JSON-LD object injected as a managed <script> for this page. */
  jsonLd?: Record<string, unknown>;
}

export function useDocumentTitle(
  pageTitle: string,
  description?: string,
  options?: DocumentMetaOptions,
) {
  const canonicalPath = options?.canonicalPath;
  const jsonLd = options?.jsonLd ? JSON.stringify(options.jsonLd) : undefined;
  useEffect(() => {
    const previousTitle = document.title;
    let next = pageTitle.trim();
    if (!next) {
      next = DEFAULT_TITLE;
    } else if (!/AileronMD/i.test(next)) {
      next = `${next}${SUFFIX}`;
    }
    document.title = next;

    // Canonical link — update existing or create, restore on unmount.
    let canonicalTag: HTMLLinkElement | null = null;
    let previousCanonical: string | null = null;
    let createdCanonical = false;
    if (canonicalPath) {
      canonicalTag = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      const href = `${CANONICAL_ORIGIN}${canonicalPath}`;
      if (!canonicalTag) {
        canonicalTag = document.createElement("link");
        canonicalTag.rel = "canonical";
        document.head.appendChild(canonicalTag);
        createdCanonical = true;
      } else {
        previousCanonical = canonicalTag.href;
      }
      canonicalTag.href = href;
    }

    // Per-page JSON-LD (e.g. Article schema for blog posts).
    let ldTag: HTMLScriptElement | null = null;
    if (jsonLd) {
      ldTag = document.createElement("script");
      ldTag.type = "application/ld+json";
      ldTag.setAttribute("data-page-ld", "true");
      ldTag.textContent = jsonLd;
      document.head.appendChild(ldTag);
    }

    let descTag = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    let previousDesc: string | null = null;
    let createdTag = false;
    if (description) {
      if (!descTag) {
        descTag = document.createElement("meta");
        descTag.name = "description";
        document.head.appendChild(descTag);
        createdTag = true;
      } else {
        previousDesc = descTag.content;
      }
      descTag.content = description;
    }

    return () => {
      document.title = previousTitle;
      if (description && descTag) {
        if (createdTag) {
          descTag.remove();
        } else if (previousDesc !== null) {
          descTag.content = previousDesc;
        }
      }
      if (canonicalTag) {
        if (createdCanonical) {
          canonicalTag.remove();
        } else if (previousCanonical !== null) {
          canonicalTag.href = previousCanonical;
        }
      }
      if (ldTag) {
        ldTag.remove();
      }
    };
  }, [pageTitle, description, canonicalPath, jsonLd]);
}
