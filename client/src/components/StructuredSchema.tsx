import { useEffect } from "react";

interface StructuredSchemaProps {
  type: "Organization" | "MedicalBusiness" | "WebSite" | "BreadcrumbList" | "Article";
  data?: Record<string, unknown>;
}

export function StructuredSchema({ type, data }: StructuredSchemaProps) {
  useEffect(() => {
    let schemaObj: Record<string, unknown> = {};

    if (type === "Organization" || type === "MedicalBusiness") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": type === "MedicalBusiness" ? "MedicalBusiness" : "Organization",
        "name": "AileronMD Consult",
        "url": "https://www.aileronmd.com",
        "logo": "https://www.aileronmd.com/favicon.ico",
        "description": "Operational guidance and specialty benchmarking for independent physician practice leadership.",
        "founder": {
          "@type": "Person",
          "name": "Stephen"
        },
        "sameAs": [
          "https://twitter.com/aileronmd",
          "https://linkedin.com/company/aileronmd"
        ],
        "contactPoint": {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "consult@aileronmd.com",
          "url": "https://www.aileronmd.com/contact"
        }
      };
    } else if (type === "WebSite") {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "AileronMD Consult",
        "url": "https://www.aileronmd.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.aileronmd.com/insights?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
    } else if (type === "BreadcrumbList" && data?.items) {
      const items = data.items as Array<{ name: string; url: string }>;
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
    } else if (type === "Article" && data) {
      schemaObj = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": data.title,
        "description": data.excerpt,
        "author": {
          "@type": "Person",
          "name": data.author || "Stephen, MD"
        },
        "publisher": {
          "@type": "Organization",
          "name": "AileronMD Consult",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.aileronmd.com/favicon.ico"
          }
        },
        "datePublished": data.date || "2026-01-01",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": data.url || window.location.href
        }
      };
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaObj);
    script.id = `schema-${type.toLowerCase()}`;
    
    // Remove existing if any
    const existing = document.getElementById(script.id);
    if (existing) {
      existing.remove();
    }

    document.head.appendChild(script);

    return () => {
      const el = document.getElementById(script.id);
      if (el) el.remove();
    };
  }, [type, data]);

  return null;
}
