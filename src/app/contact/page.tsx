"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { 
  Check, Send, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [industry, setIndustry] = useState<string>("saas");
  const [scale, setScale] = useState<number>(50); // 10k to 100k requests
  const [requirements, setRequirements] = useState<string[]>(["cloud"]);
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Toggle requirement selections
  const toggleReq = (req: string) => {
    if (requirements.includes(req)) {
      setRequirements(requirements.filter((r) => r !== req));
    } else {
      setRequirements([...requirements, req]);
    }
  };

  // Dynamic calculations for preview metric values based on settings
  const calculateLatency = () => {
    let base = 12; // base ms
    if (requirements.includes("ai")) base += 15;
    if (requirements.includes("security")) base += 4;
    // scale multiplier
    base += Math.round((scale / 100) * 12);
    return `${base}ms`;
  };

  const calculateUptime = () => {
    if (requirements.includes("cloud") && requirements.includes("security")) {
      return "Enterprise SLA";
    }
    if (requirements.includes("cloud")) {
      return "Advanced SLA";
    }
    return "Standard SLA";
  };

  const calculateEfficiency = () => {
    let base = 10;
    if (requirements.includes("ai")) base += 15;
    if (requirements.includes("cloud")) base += 10;
    return `+${base}%`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name && !isSubmitting) {
      setIsSubmitting(true);
      // Simulate API submit latency
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setName("");
        setEmail("");
        setRequirements(["cloud"]);
        setScale(50);
        setIndustry("saas");
      }, 5000);
    }
  };

  return (
    <div className={styles.contactPage}>
      <div className="container">
        
        {/* Page Hero Header */}
        <div className={styles.headerBlock}>
          <span className={styles.tagline}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            Diagnostic Configurator
          </span>
          <h1 className={styles.title}>
            Design Your <br />
            <span className="gradient-text-purple-cyan">System Specifications</span>
          </h1>
          <p className={styles.desc}>
            Configure your technical requirements to generate an interactive platform schema draft and estimated SLA metrics.
          </p>
        </div>

        {/* Asymmetrical Layout Split: Configurator left, Real-time Output right */}
        <div className={styles.splitGrid}>
          
          {/* Configurator Card */}
          <div className={`${styles.glassPanel} ${styles.configPanel}`}>
            <h2 className={styles.panelTitle}>1. System Parameters</h2>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Industry Select */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Select Industry Focus</label>
                <div className={styles.radioGrid}>
                  {["saas", "healthcare", "fintech", "manufacturing", "education"].map((ind) => (
                    <button
                      key={ind}
                      type="button"
                      className={`${styles.radioBtn} ${industry === ind ? styles.activeRadioBtn : ""}`}
                      onClick={() => setIndustry(ind)}
                      disabled={isSubmitting}
                    >
                      {ind.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Requirements Checkboxes */}
              <div className={styles.formGroup}>
                <label className={styles.label}>Select System Modules</label>
                <div className={styles.checkGrid}>
                  <button
                    type="button"
                    className={`${styles.checkCard} ${requirements.includes("ai") ? styles.activeCheckCard : ""}`}
                    onClick={() => toggleReq("ai")}
                    disabled={isSubmitting}
                  >
                    <div className={styles.checkCircle}>
                      {requirements.includes("ai") && <Check size={12} />}
                    </div>
                    <div>
                      <div className={styles.checkTitle}>AI & Neural Agent Network</div>
                      <div className={styles.checkDesc}>Integrate model loaders and vector databases.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`${styles.checkCard} ${requirements.includes("cloud") ? styles.activeCheckCard : ""}`}
                    onClick={() => toggleReq("cloud")}
                    disabled={isSubmitting}
                  >
                    <div className={styles.checkCircle}>
                      {requirements.includes("cloud") && <Check size={12} />}
                    </div>
                    <div>
                      <div className={styles.checkTitle}>Zero-Downtime Serverless Cloud</div>
                      <div className={styles.checkDesc}>Orchestrate auto-scaling serverless nodes.</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    className={`${styles.checkCard} ${requirements.includes("security") ? styles.activeCheckCard : ""}`}
                    onClick={() => toggleReq("security")}
                    disabled={isSubmitting}
                  >
                    <div className={styles.checkCircle}>
                      {requirements.includes("security") && <Check size={12} />}
                    </div>
                    <div>
                      <div className={styles.checkTitle}>Zero-Trust Edge Tunneling</div>
                      <div className={styles.checkDesc}>Encrypt microservice links under high-security layers.</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Slider Input */}
              <div className={styles.formGroup}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <label className={styles.label}>Estimated Scaling Footprint</label>
                  <span className={styles.sliderVal}>{scale}k Requests / Day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className={styles.slider}
                  disabled={isSubmitting}
                />
              </div>

              {/* User details inputs */}
              <div className={styles.inputRow}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    className={styles.textInput}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Work Email</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    className={styles.textInput}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <button type="submit" className={`magnetic-btn btn-accent ${styles.submitBtn}`} disabled={isSubmitting}>
                {isSubmitting ? "Submitting Request..." : "Submit Spec Schema Request"}
                <Send size={16} style={{ marginLeft: "0.5rem" }} />
              </button>
            </form>
          </div>

          {/* Real-time Diagnostics Output */}
          <div className={styles.diagnosticsPanel}>
            <h2 className={styles.panelTitle}>2. Schema Real-Time Estimator</h2>

            {/* Simulated Live telemetry board */}
            <div className={styles.telemetryBoard}>
              
              {/* Output metric widgets */}
              <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Target API Response</div>
                  <div className={styles.metricVal}>{calculateLatency()}</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Expected Uptime SLA</div>
                  <div className={styles.metricVal}>{calculateUptime()}</div>
                </div>
                <div className={styles.metricCard}>
                  <div className={styles.metricLabel}>Operational Leverage</div>
                  <div className={styles.metricVal} style={{ color: "var(--accent-highlight)" }}>
                    {calculateEfficiency()}
                  </div>
                </div>
              </div>

              {/* Diagnostic Visualizer Console */}
              <div className={styles.consoleFrame}>
                <div className={styles.consoleHeader}>
                  <div className={styles.consoleLights}>
                    <span className={styles.lightRed}></span>
                    <span className={styles.lightYellow}></span>
                    <span className={styles.lightGreen}></span>
                  </div>
                  <span className={styles.consoleTitle}>spec-generator-v2.0.sh</span>
                </div>
                
                <div className={styles.consoleLines}>
                  <div><span style={{ color: "var(--accent-secondary)" }}>$</span> initialize --mode={industry}</div>
                  <div><span style={{ color: "var(--accent-success)" }}>SUCCESS:</span> Node routing maps prepared for {industry.toUpperCase()}</div>
                  {requirements.map((req) => (
                    <div key={req}>
                      <span style={{ color: "var(--accent-primary)" }}>[LOAD]</span> {req.toUpperCase()} module pipeline compiling...
                    </div>
                  ))}
                  <div><span style={{ color: "var(--accent-secondary)" }}>$</span> generate_schema --scale={scale}k --latency={calculateLatency()}</div>
                  <div><span style={{ color: "var(--text-primary)", fontWeight: "bold" }}>TARGET SLA ACTIVE:</span> Uptime set at {calculateUptime()}</div>
                </div>
              </div>

              {/* Status footer with submission response banner */}
              <AnimatePresence>
                {submitted && (
                  <motion.div 
                    className={styles.statusBanner}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                  >
                    <Check size={18} className={styles.successIcon} />
                    <div>
                      <div style={{ fontWeight: 700 }}>Spec Blueprint Submitted!</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        Your specification blueprint has been successfully submitted.
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
