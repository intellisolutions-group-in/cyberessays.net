"use client";
import React, { useState } from "react";
import styles from "./PremiumCTA.module.css";
import { ArrowRight, Sparkles, Check } from "lucide-react";
import CustomScheduler from "../CustomScheduler";

export default function PremiumCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.section}>
      <div className="container">
        
        <div className={styles.box}>
          <div className={styles.glow}></div>

          <div className={styles.content}>
            <span className={styles.tagline}>
              <Sparkles size={14} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />
              GET STARTED TODAY
            </span>
            <h2 className={styles.headline}>Ready to Build the Future?</h2>
            <p className={styles.subheadline}>
              Explore custom AI neural architectures, SaaS engineering scaling patterns, and secure zero-trust cloud solutions. Let&apos;s design your competitive edge.
            </p>
          </div>

          <div className={styles.actionBlock}>
            <button
              className="magnetic-btn btn-accent"
              onClick={() => setIsOpen(true)}
              style={{ padding: "1rem 2.25rem", fontSize: "1rem" }}
            >
              Schedule Consultation
              <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
            </button>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 500 }}>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Check size={14} style={{ color: "var(--accent-secondary)" }} /> 30-min strategy review
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                <Check size={14} style={{ color: "var(--accent-secondary)" }} /> System schema draft
              </span>
            </div>
          </div>
        </div>

      </div>

      {isOpen && (
        <CustomScheduler onClose={() => setIsOpen(false)} />
      )}
    </section>
  );
}
