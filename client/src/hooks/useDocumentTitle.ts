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
export function useDocumentTitle(pageTitle: string, description?: string) {
  useEffect(() => {
    const previousTitle = document.title;
    let next = pageTitle.trim();
    if (!next) {
      next = DEFAULT_TITLE;
    } else if (!/AileronMD/i.test(next)) {
      next = `${next}${SUFFIX}`;
    }
    document.title = next;

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
    };
  }, [pageTitle, description]);
}
