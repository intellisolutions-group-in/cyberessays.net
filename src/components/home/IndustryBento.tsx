"use client";
import React from "react";
import styles from "./IndustryBento.module.css";
import Link from "next/link";
import ThreeDSection from "@/components/ThreeDSection";

interface IndustryData {
  id: string;
  tag: string;
  title: string;
  successHeadline: string;
  successDesc: string;
  metricVal: string;
  metricLabel: string;
  spanClass: string;
  svgIcon: React.ReactNode;
}

export default function IndustryBento() {
  const industries: IndustryData[] = [
    {
      id: "saas",
      tag: "SaaS & Platform",
      title: "Accelerating Next-Gen SaaS Growth",
      successHeadline: "Linear Scale Engine",
      successDesc: "Optimized serverless routing to handle high-volume simultaneous websocket loops.",
      metricVal: "High",
      metricLabel: "Throughput capacity",
      spanClass: styles.colSpan2,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="10" y="10" width="30" height="30" rx="4" />
          <rect x="60" y="10" width="30" height="30" rx="4" />
          <rect x="10" y="60" width="30" height="30" rx="4" />
          <rect x="60" y="60" width="30" height="30" rx="4" />
          <path d="M40 25h20M25 40v20M75 40v20M40 75h20" strokeDasharray="3 3" />
        </svg>
      )
    },
    {
      id: "healthcare",
      tag: "Healthcare",
      title: "Secure Encrypted Clinical Architecture",
      successHeadline: "Vitals Ledger Platform",
      successDesc: "Encrypted patient data sharing system across 12 major regional clinics.",
      metricVal: "Secure",
      metricLabel: "Security & Privacy Focus",
      spanClass: styles.colSpan1,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <circle cx="50" cy="50" r="40" />
          <path d="M50 25v50M25 50h50" />
        </svg>
      )
    },
    {
      id: "fintech",
      tag: "FinTech",
      title: "Zero-Latency Financial Pipelines",
      successHeadline: "Automated Fraud Shield",
      successDesc: "Real-time anomaly identification with low-latency security checks.",
      metricVal: "High Volume",
      metricLabel: "Transactions processed",
      spanClass: styles.colSpan1,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <rect x="20" y="25" width="60" height="50" rx="6" />
          <circle cx="50" cy="50" r="12" />
          <path d="M35 50h5M60 50h5" />
        </svg>
      )
    },
    {
      id: "education",
      tag: "Education",
      title: "Collaborative EdTech Workspaces",
      successHeadline: "University Class Hub",
      successDesc: "Interactive cloud portals providing sub-second document sync for synchronous lessons.",
      metricVal: "Scalable",
      metricLabel: "Monthly active learners",
      spanClass: styles.colSpan2,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M10 30l40-20 40 20-40 20z" />
          <path d="M20 45v20c0 10 15 15 30 15s30-5 30-15V45" />
          <path d="M85 30v25" />
        </svg>
      )
    },
    {
      id: "retail",
      tag: "Retail & Commerce",
      title: "Omnichannel Checkout Systems",
      successHeadline: "Unified Commerce Engine",
      successDesc: "Decreased user checkout drop-offs via custom headless API connections.",
      metricVal: "Improved",
      metricLabel: "Checkout conversion",
      spanClass: styles.colSpan2,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="35" cy="80" r="10" />
          <circle cx="75" cy="80" r="10" />
          <path d="M10 15h15l15 45h40l10-30H32" />
        </svg>
      )
    },
    {
      id: "manufacturing",
      tag: "Manufacturing",
      title: "Industrial IoT Diagnostics",
      successHeadline: "Smart Warehouse Sensor Grid",
      successDesc: "Automated operational dashboards reading conveyor failure signals instantaneously.",
      metricVal: "Enterprise",
      metricLabel: "Real-time device SLA",
      spanClass: styles.colSpan1,
      svgIcon: (
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="50" cy="50" r="25" />
          <path d="M50 10v15M50 75v15M10 50h15M75 50h15M22 22l11 11M67 67l11 11M78 22L67 33M33 67l-11 11" />
        </svg>
      )
    }
  ];

  return (
    <ThreeDSection className={`${styles.section} section-padding`} id="industries">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Industry-Specific Transformation</h2>
          <p className={styles.desc}>
            We combine standard design guidelines with industry architecture specializations to deliver custom advantages.
          </p>
        </div>

        <div className={styles.grid}>
          {industries.map((ind) => (
            <Link key={ind.id} href={`/industries/${ind.id}`} className={`${styles.card} ${ind.spanClass}`}>
              {/* Background abstract SVGs */}
              <div className={styles.bgVisual}>
                {ind.svgIcon}
              </div>

              <div className={styles.cardHeader}>
                <span className={styles.industryTag}>{ind.tag}</span>
                <h3 className={styles.cardTitle}>{ind.title}</h3>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.successInfo}>
                  <div className={styles.successHeadline}>{ind.successHeadline}</div>
                  <div className={styles.successDesc}>{ind.successDesc}</div>
                </div>

                <div className={styles.metricsBlock}>
                  <div className={styles.metricValue}>{ind.metricVal}</div>
                  <div className={styles.metricLabel}>{ind.metricLabel}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </ThreeDSection>
  );
}
