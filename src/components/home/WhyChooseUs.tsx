"use client";
import React from "react";
import styles from "./WhyChooseUs.module.css";
import { Check, X, ShieldAlert, Zap } from "lucide-react";

interface CompareRow {
  param: string;
  iceText: string;
  agencyText: string;
}

export default function WhyChooseUs() {
  const comparisonData: CompareRow[] = [
    {
      param: "Architecture & Scale",
      iceText: "Serverless cloud frameworks capable of processing high-volume transactions under load spikes.",
      agencyText: "Rigid monolithic infrastructure prone to crash under sudden traffic load spikes."
    },
    {
      param: "Engineering Standards",
      iceText: "Automated regression testing, rigorous CI/CD deployments, and guaranteed high SLA metrics.",
      agencyText: "Manual testing cycles resulting in periodic production crashes and slow patches."
    },
    {
      param: "AI & ML Specialization",
      iceText: "Custom model fine-tuning, vector database pipelines, and intelligent agent orchestrators.",
      agencyText: "Basic wrapper API connections with no custom neural logic or optimization."
    },
    {
      param: "Design Language",
      iceText: "Luxury light themes, glassmorphism panels, and bespoke interactive details.",
      agencyText: "Outdated dark grids, heavy gradients, or cookie-cutter template designs."
    },
    {
      param: "Delivery Timeline",
      iceText: "10x faster shipping by utilizing pre-engineered, modular components.",
      agencyText: "Sluggish 6-month timelines leading to delayed competitive advantage."
    },
    {
      param: "Partnership Model",
      iceText: "Continuous scaling consulting and operational optimization post-deployment.",
      agencyText: "Standard hand-off contracts with slow ticket responses for changes."
    }
  ];

  return (
    <section className={`${styles.section} section-padding`} id="why-us">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Engineering Comparison</h2>
          <p className={styles.desc}>
            Understand how our development principles compare to traditional software agency structures.
          </p>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.headerRow}>
            <span>Core Focus</span>
            <span style={{ color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Zap size={14} /> CyberEssays Digital Services
            </span>
            <span style={{ color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <ShieldAlert size={14} /> Traditional Agencies
            </span>
          </div>

          {comparisonData.map((row, idx) => (
            <div key={idx} className={styles.row}>
              <div className={styles.paramName}>{row.param}</div>
              
              <div className={styles.iceCell}>
                <div className={styles.iconWrapIce}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span className={styles.mobileLabel} style={{ color: "var(--accent-primary)" }}>CyberEssays Digital Services</span>
                  <span>{row.iceText}</span>
                </div>
              </div>
              
              <div className={styles.agencyCell}>
                <div className={styles.iconWrapAgency}>
                  <X size={12} strokeWidth={3} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                  <span className={styles.mobileLabel} style={{ color: "var(--text-secondary)" }}>Traditional Agencies</span>
                  <span>{row.agencyText}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
