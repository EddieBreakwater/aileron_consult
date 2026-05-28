/**
 * Curated, reputable resources and current-trends briefings for each specialty.
 *
 * Sources are drawn from established trade associations, peer-reviewed health
 * policy outlets, and well-regarded industry publications. URLs link to the
 * homepage or a long-lived hub rather than a single article so they remain
 * useful as the specialty evolves.
 */

import type { SpecialtySlug } from "./aileron";

export interface SpecialtyResource {
  /** Display name of the source. */
  name: string;
  /** One-line description of what you'll find there. */
  blurb: string;
  /** Stable URL — prefer hubs over individual articles. */
  url: string;
  /** Coarse classification used for a small label on the card. */
  kind: "association" | "publication" | "policy" | "data" | "society";
}

export interface SpecialtyBriefing {
  /** Short summary of where the specialty stands today (2–3 sentences). */
  state: string;
  /** Three to five bullets describing what's changing right now. */
  trends: string[];
}

export interface SpecialtyDossier {
  briefing: SpecialtyBriefing;
  resources: SpecialtyResource[];
}

/* -------- Cross-specialty resources used everywhere -------- */
const COMMON_RESOURCES: SpecialtyResource[] = [
  {
    name: "MGMA",
    blurb: "Practice management benchmarks, surveys, and operations research",
    url: "https://www.mgma.com",
    kind: "association",
  },
  {
    name: "Becker's Hospital Review",
    blurb: "Daily reporting on healthcare strategy, finance, and operations",
    url: "https://www.beckershospitalreview.com",
    kind: "publication",
  },
  {
    name: "Health Affairs",
    blurb: "Peer-reviewed health policy research and analysis",
    url: "https://www.healthaffairs.org",
    kind: "policy",
  },
  {
    name: "KFF (Kaiser Family Foundation)",
    blurb: "Independent data and analysis on coverage, access, and cost",
    url: "https://www.kff.org",
    kind: "data",
  },
  {
    name: "CMS Newsroom",
    blurb: "Official rule-making, fee schedules, and program updates",
    url: "https://www.cms.gov/newsroom",
    kind: "policy",
  },
];

/* -------- Specialty-specific dossiers -------- */
export const SPECIALTY_DOSSIERS: Record<SpecialtySlug, SpecialtyDossier> = {
  primary_care: {
    briefing: {
      state:
        "Primary care is the gateway to the rest of the system, but reimbursement still favors procedures over time. Independent practices are weighing risk-bearing arrangements, telehealth retention, and team-based models against rising overhead and persistent staffing shortages.",
      trends: [
        "Value-based and capitated arrangements (ACO REACH, MA-aligned shared savings) continue to expand the share of primary care revenue tied to outcomes rather than volume.",
        "Behavioral health integration is moving from pilot to standard, partly driven by the CoCM (collaborative care) CPT codes and rising demand.",
        "Direct primary care and concierge models keep growing among small practices seeking insulation from payer churn.",
        "MA risk-adjustment scrutiny and payer downcoding are pushing practices to invest in coding accuracy and clinical documentation.",
        "Workforce: medical assistant turnover and panel-size pressure are the operational story of the year.",
      ],
    },
    resources: [
      {
        name: "American Academy of Family Physicians (AAFP)",
        blurb: "Practice resources, policy advocacy, and the FPM journal",
        url: "https://www.aafp.org",
        kind: "association",
      },
      {
        name: "AAFP — Family Practice Management",
        blurb: "Practical articles on coding, workflow, and finance",
        url: "https://www.aafp.org/pubs/fpm.html",
        kind: "publication",
      },
      {
        name: "American College of Physicians (ACP)",
        blurb: "Internal medicine practice resources and clinical guidance",
        url: "https://www.acponline.org",
        kind: "association",
      },
      {
        name: "Patient-Centered Primary Care Collaborative",
        blurb: "Evidence and policy work on advanced primary care",
        url: "https://www.pcpcc.org",
        kind: "policy",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },

  gastroenterology: {
    briefing: {
      state:
        "GI is a procedure-driven specialty under steady fee-schedule pressure, with screening colonoscopy guidelines now reaching age 45 and a growing pipeline of biologics for IBD. Independent groups are consolidating into platforms while ASC ownership and ancillary lines (anesthesia, pathology, infusion) remain the durable margin story.",
      trends: [
        "USPSTF screening start age at 45 is still expanding the eligible pool, especially in commercially insured panels.",
        "Private equity-backed GI platforms continue to roll up regional groups; independence requires deliberate scale and governance choices.",
        "Anesthesia and pathology in-house captures, plus infusion suites for biologics, are where margin is being built or lost.",
        "Prior authorization burden for biologics keeps climbing — staffing the PA workflow is now an operational KPI in itself.",
        "AI-assisted polyp detection (CADe) is being adopted unevenly; ROI is real but requires endoscopist buy-in and case-mix.",
      ],
    },
    resources: [
      {
        name: "American Gastroenterological Association (AGA)",
        blurb: "Clinical guidelines, practice management, and advocacy",
        url: "https://gastro.org",
        kind: "association",
      },
      {
        name: "American Society for Gastrointestinal Endoscopy (ASGE)",
        blurb: "Endoscopy standards, training, and quality programs",
        url: "https://www.asge.org",
        kind: "society",
      },
      {
        name: "American College of Gastroenterology (ACG)",
        blurb: "Education, journal, and practice resources for GIs",
        url: "https://gi.org",
        kind: "society",
      },
      {
        name: "GI & Endoscopy News",
        blurb: "Trade reporting on practice trends and reimbursement",
        url: "https://www.gastroendonews.com",
        kind: "publication",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },

  orthopedics: {
    briefing: {
      state:
        "Orthopedics has migrated meaningfully outpatient: total joints in ASCs are now standard, spine is following, and bundled payments continue to reshape episode economics. Implant cost capture, robotics utilization, and physical-therapy referral leakage are the levers that separate well-run groups from the rest.",
      trends: [
        "CMS site-neutral and ASC migration policies keep shifting more cases out of HOPDs; ASC ownership is the strategic question.",
        "Robotics adoption (Mako, ROSA, Velys) is broad but utilization quality is uneven; revenue-per-case and turnover time are the right metrics.",
        "Bundled payment and direct-to-employer arrangements reward groups that own the full episode from imaging through PT.",
        "Implant pricing, distributor consolidation, and supply chain tactics are an underrated margin lever.",
        "Workforce: OR techs and surgical RN supply remain the binding constraint on case volume in many markets.",
      ],
    },
    resources: [
      {
        name: "American Academy of Orthopaedic Surgeons (AAOS)",
        blurb: "Clinical, practice management, and advocacy resources",
        url: "https://www.aaos.org",
        kind: "association",
      },
      {
        name: "American Alliance of Orthopaedic Executives (AAOE)",
        blurb: "Operations, benchmarking, and education for ortho practices",
        url: "https://www.aaoe.net",
        kind: "association",
      },
      {
        name: "Becker's ASC Review",
        blurb: "Daily reporting on ambulatory surgery and orthopedic practice",
        url: "https://www.beckersasc.com",
        kind: "publication",
      },
      {
        name: "Orthopedics This Week",
        blurb: "Industry news on devices, M&A, and practice trends",
        url: "https://ryortho.com",
        kind: "publication",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },

  hematology_oncology: {
    briefing: {
      state:
        "Heme/Onc economics live and die on drug margin, the 340B program, and access to clinical trials. Community oncology faces ongoing site-of-service pressure from health systems, while biosimilar adoption and the Inflation Reduction Act's drug pricing provisions are reshaping the buy-and-bill model in real time.",
      trends: [
        "IRA-driven Medicare price negotiation and Part B inflation rebates are starting to show up in real margin compression on selected drugs.",
        "Biosimilars (oncology supportive care and increasingly therapeutics) keep eroding ASP-based revenue but improve access.",
        "Community oncology consolidation (OneOncology, USON, AON) continues; staying independent requires real ancillary depth.",
        "Oral oncolytics shift revenue from medical to pharmacy benefits — in-house specialty pharmacy is a strategic question, not a tactical one.",
        "Clinical trial participation is a recruitment, branding, and revenue engine that smaller groups can punch above their weight on.",
      ],
    },
    resources: [
      {
        name: "American Society of Clinical Oncology (ASCO)",
        blurb: "Clinical guidelines, practice resources, and policy",
        url: "https://www.asco.org",
        kind: "society",
      },
      {
        name: "Association of Cancer Care Centers (ACCC)",
        blurb: "Operations, reimbursement, and oncology business education",
        url: "https://www.accc-cancer.org",
        kind: "association",
      },
      {
        name: "Community Oncology Alliance (COA)",
        blurb: "Advocacy and policy for independent community oncology",
        url: "https://communityoncology.org",
        kind: "association",
      },
      {
        name: "ASH (Hematology)",
        blurb: "Clinical and practice resources for hematologists",
        url: "https://www.hematology.org",
        kind: "society",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },

  optometry: {
    briefing: {
      state:
        "Optometry is part medical practice, part retail business, with optical capture rate and managed-vision plan participation defining most P&Ls. Myopia management and dry-eye programs are growing as ancillary medical lines while private equity continues to roll up larger MD/OD groups.",
      trends: [
        "Myopia management (atropine, ortho-K, soft myopia control lenses) is shifting pediatric optometry from refraction-only to an ongoing clinical service.",
        "Dry-eye dedicated clinics and IPL/RF devices have become a meaningful ancillary revenue line for many practices.",
        "Vision-plan economics (VSP, EyeMed) keep tightening — capture rate and lab strategy matter more than chair time.",
        "MD/OD integrated groups are scaling through PE platforms; pure-OD independents are sharpening differentiation through medical optometry.",
        "Telehealth refraction and online retailers are competitive pressure on the optical side, not the medical side.",
      ],
    },
    resources: [
      {
        name: "American Optometric Association (AOA)",
        blurb: "Practice resources, advocacy, and clinical guidelines",
        url: "https://www.aoa.org",
        kind: "association",
      },
      {
        name: "Review of Optometric Business",
        blurb: "Practical management content for OD practice owners",
        url: "https://reviewob.com",
        kind: "publication",
      },
      {
        name: "Optometric Management",
        blurb: "Trade publication on clinical and business practice",
        url: "https://www.optometricmanagement.com",
        kind: "publication",
      },
      {
        name: "Vision Monday",
        blurb: "Industry news on optical retail and managed vision",
        url: "https://www.visionmonday.com",
        kind: "publication",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },

  ophthalmology: {
    briefing: {
      state:
        "Ophthalmology continues its long migration to ASCs and office-based procedure suites, with cataract still the volume engine and retina still the drug-spend engine. Premium IOLs, refractive cash channels, and disciplined ASC utilization are where well-run groups create real margin separation.",
      trends: [
        "ASC ownership and office-based surgery suites (intravitreal injections, YAG, MIGS in some states) keep moving cases out of HOPDs.",
        "Premium IOL conversion and refractive cash-pay channels remain the highest-leverage revenue lines for cataract-heavy groups.",
        "Retina drug economics (Eylea biosimilars, Vabysmo, faricimab dynamics) are reshaping the buy-and-bill side of the practice.",
        "PE consolidation continues; choices about platform partnership, MD/OD integration, and governance get more consequential each year.",
        "MIGS, gene therapy for retinal disease, and AI screening for diabetic retinopathy are the long-arc clinical/operational stories.",
      ],
    },
    resources: [
      {
        name: "American Academy of Ophthalmology (AAO)",
        blurb: "Clinical and practice resources for ophthalmologists",
        url: "https://www.aao.org",
        kind: "association",
      },
      {
        name: "ASCRS",
        blurb: "Cataract and refractive surgery education and advocacy",
        url: "https://ascrs.org",
        kind: "society",
      },
      {
        name: "American Society of Retina Specialists (ASRS)",
        blurb: "Retina clinical resources and practice updates",
        url: "https://www.asrs.org",
        kind: "society",
      },
      {
        name: "Ophthalmology Management",
        blurb: "Trade reporting on practice operations and finance",
        url: "https://www.ophthalmologymanagement.com",
        kind: "publication",
      },
      ...COMMON_RESOURCES.slice(0, 3),
    ],
  },
};
