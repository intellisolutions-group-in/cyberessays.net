"use client";
import React from "react";
import styles from "./SuccessStories.module.css";
import { ArrowRight, ShieldCheck, CreditCard, Sparkles } from "lucide-react";
import Link from "next/link";

interface Story {
  id: string;
  client: string;
  title: string;
  description: string;
  metrics: { val: string; label: string }[];
  isAlt: boolean;
  link: string;
  visual: React.ReactNode;
}

export default function SuccessStories() {
  const stories: Story[] = [
    {
      id: "apex-health",
      client: "Apex Health Ledger",
      title: "Unified Clinical Data Platform",
      description: "We consolidated fragmented electronic health records across 12 distinct regional hospitals into a secure zero-trust cloud data pipeline, optimizing query speeds and ensuring patient data safety.",
      metrics: [
        { val: "Enterprise", label: "System Uptime SLA" },
        { val: "110ms", label: "Query Latency" },
        { val: "21k", label: "Patient Records Secured" }
      ],
      isAlt: false,
      link: "/services/ai-solutions",
      visual: (
        <div className={styles.visual}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "var(--border-light)", paddingBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <ShieldCheck size={14} color="var(--accent-success)" /> SECURE LEDGER ACTIVE
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>12/12 Nodes Synced</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--border-radius-sm)", padding: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Patient Query Latency</div>
                <div style={{ fontSize: "1rem", fontWeight: 700 }}>110ms <span style={{ color: "var(--accent-success)", fontSize: "0.75rem" }}>-32%</span></div>
              </div>
              <div style={{ width: "32px", height: "6px", backgroundColor: "var(--accent-success)", borderRadius: "3px" }}></div>
            </div>
            <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--border-radius-sm)", padding: "0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Active Health Pipelines</div>
                <div style={{ fontSize: "1rem", fontWeight: 700 }}>24 Active</div>
              </div>
              <div style={{ width: "32px", height: "6px", backgroundColor: "var(--accent-success)", borderRadius: "3px" }}></div>
            </div>
          </div>
          <div style={{ flex: 1, border: "1px dashed rgba(17, 24, 39, 0.08)", borderRadius: "var(--border-radius-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 500 }}>
            Real-time Diagnostic Activity Log
          </div>
        </div>
      )
    },
    {
      id: "nexus-fintech",
      client: "Nexus SaaS Engine",
      title: "Sub-Second Global Payment Routing Engine",
      description: "We engineered a low-latency transactions routing engine leveraging multi-region edge nodes, automating localized tax rules calculations and minimizing cart checkouts drop-off rates.",
      metrics: [
        { val: "+38%", label: "Conversion Rate" },
        { val: "18ms", label: "Transaction Speed" },
        { val: "42k", label: "Annual Volume Routing" }
      ],
      isAlt: true,
      link: "/services/saas-development",
      visual: (
        <div className={styles.visual}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "var(--border-light)", paddingBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <CreditCard size={14} color="var(--accent-primary)" /> TRANSACTION METRICS
            </span>
            <span style={{ fontSize: "0.7rem", color: "var(--accent-success)", fontWeight: 700 }}>+12.4% TODAY</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            <div style={{ background: "rgba(124, 58, 237, 0.03)", border: "var(--border-accent)", borderRadius: "var(--border-radius-sm)", padding: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Payment Success Rate</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>Nominal</div>
            </div>
            <div style={{ background: "rgba(124, 58, 237, 0.03)", border: "var(--border-accent)", borderRadius: "var(--border-radius-sm)", padding: "0.5rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>Failure Rate</div>
              <div style={{ fontSize: "0.95rem", fontWeight: 800, color: "var(--accent-highlight)" }}>0.02%</div>
            </div>
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "0.35rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
              <span>London Node</span>
              <span style={{ color: "var(--accent-success)" }}>12ms</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
              <span>Tokyo Node</span>
              <span style={{ color: "var(--accent-success)" }}>22ms</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem" }}>
              <span>New York Node</span>
              <span style={{ color: "var(--accent-success)" }}>15ms</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className={`${styles.section} section-padding`} id="work">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Proven Business Impact</h2>
          <p className={styles.desc}>
            We build platforms that deliver substantial metrics results. Explore our premium digital case studies.
          </p>
        </div>

        <div className={styles.storiesList}>
          {stories.map((story) => (
            <div
              key={story.id}
              className={`${styles.storyCard} ${story.isAlt ? styles.storyCardAlt : ""}`}
            >
              
              {/* Visual Demo Column */}
              <div className={styles.visualWrapper}>
                {story.visual}
              </div>

              {/* Story Description Column */}
              <div className={styles.storyContent}>
                <div className={styles.clientTag}>
                  <Sparkles size={12} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />
                  {story.client}
                </div>
                
                <h3 className={styles.storyTitle}>{story.title}</h3>
                
                <p className={styles.storyDesc}>{story.description}</p>
                
                <div className={styles.metricsGrid}>
                  {story.metrics.map((metric, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <div className={styles.metricVal}>{metric.val}</div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href={story.link}
                  className="magnetic-btn btn-primary"
                  style={{ alignSelf: "flex-start", marginTop: "1rem", fontSize: "0.85rem", padding: "0.625rem 1.25rem" }}
                >
                  Inspect Case Study
                  <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
