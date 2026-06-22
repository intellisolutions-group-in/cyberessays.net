"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./fintech.module.css";
import { RefreshCw, Send, Activity, Database, ShieldCheck } from "lucide-react";

interface StepDetail {
  num: string;
  name: string;
  desc: string;
  statusIdle: string;
  statusActive: string;
}

const stepsList: StepDetail[] = [
  { num: "01", name: "Transaction Ingress", desc: "Ingests client transaction request token.", statusIdle: "Pending", statusActive: "Verifying signature..." },
  { num: "02", name: "AI Fraud Scanning", desc: "Inspects parameters against local models.", statusIdle: "Waiting", statusActive: "Scanned in 4ms" },
  { num: "03", name: "Multi-Rail Routing", desc: "Routes request through active banking rails.", statusIdle: "Waiting", statusActive: "Optimal rail active" },
  { num: "04", name: "Ledger Settlement", desc: "Updates double-entry ledger database.", statusIdle: "Waiting", statusActive: "Committed to shard" }
];

export default function FintechPage() {
  const [activeStep, setActiveStep] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPrinted, setIsPrinted] = useState(false);
  const [txId, setTxId] = useState("");
  const [txHash, setTxHash] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "[system] Ingress gateway active. Standby for payment trigger."
  ]);

  const txIdRef = useRef("");

  const triggerPayment = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    setIsPrinted(false);
    setActiveStep(0);
    const randomId = "tx_" + Math.floor(100000 + Math.random() * 900000);
    const mockHash = "sha256_" + Math.random().toString(36).substring(2, 10);
    setTxId(randomId);
    txIdRef.current = randomId;
    setTxHash(mockHash);

    setLogs([
      "[router] Incoming transactional request token. Path: /v1/records/settle",
      "[auth] Validating signature key payload metadata..."
    ]);
  };

  useEffect(() => {
    if (activeStep === -1 || activeStep >= stepsList.length) return;

    const timer = setTimeout(() => {
      const nextStep = activeStep + 1;
      setActiveStep(nextStep);
      
      const stepName = stepsList[activeStep].name;
      const stepActiveText = stepsList[activeStep].statusActive;
      setLogs((prev) => [
        `[stage-${activeStep + 1}] ${stepName}: ${stepActiveText}`,
        ...prev
      ]);

      if (nextStep === stepsList.length) {
        setIsProcessing(false);
        setIsPrinted(true);
        setLogs((prev) => [
          `[success] Double-entry settlement transaction committed. ID: ${txIdRef.current}`,
          ...prev
        ]);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [activeStep]);

  return (
    <div className={styles.fintechPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Future Finance Architectures</span>
          <h1 className={styles.title}>Zero-Latency FinTech Payment Pipelines</h1>
          <p className={styles.desc}>
            Build transaction tunnels leveraging real-time fraud checkers, automated multi-currency tax calculations, and advanced security standards.
          </p>
        </div>

        {/* Multi-Column Layout Workspace */}
        <div className={styles.mainSplitGrid}>
          
          {/* Column 1: Payment Rail Router */}
          <main className={styles.pipelineCard} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span className={styles.cardTitle} style={{ fontSize: "1rem" }}>
                <Activity size={18} color="var(--accent-highlight)" /> Dynamic Transaction Rail Router
              </span>
              <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>UDP Channel Active</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {stepsList.map((step, idx) => {
                const isActive = activeStep === idx;
                const isDone = activeStep > idx;
                return (
                  <div
                    key={idx}
                    style={{
                      background: isActive ? "rgba(6, 182, 212, 0.06)" : "rgba(255,255,255,0.02)",
                      border: isActive ? "1px solid var(--accent-secondary)" : "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "8px",
                      padding: "0.75rem 1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, color: isDone ? "var(--accent-success)" : "var(--text-secondary)", marginRight: "0.5rem" }}>{step.num}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{step.name}</span>
                      <div style={{ fontSize: "0.6rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>{step.desc}</div>
                    </div>
                    <span style={{ fontSize: "0.65rem", fontWeight: 700, color: isDone ? "var(--accent-success)" : "var(--accent-primary)" }}>
                      {isDone ? "Settled" : isActive ? "Processing..." : "Standby"}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={triggerPayment}
              disabled={isProcessing}
              style={{
                width: "100%",
                background: "var(--accent-primary)",
                border: "none",
                borderRadius: "var(--border-radius-full)",
                padding: "0.8rem",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem"
              }}
            >
              {isProcessing ? (
                <>
                  <RefreshCw size={14} className="spin" /> Settlement in progress...
                </>
              ) : (
                <>
                  <Send size={14} /> Trigger Transaction settlement
                </>
              )}
            </button>
          </main>

          {/* Column 2: Audit Logs Terminal & Receipt */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Transaction Receipt */}
            <div className={`${styles.receiptBox} ${isPrinted ? styles.receiptBoxPrinted : ""}`} style={{ margin: 0, flex: 1 }}>
              <div className={styles.receiptTitle} style={{ letterSpacing: "0.1em" }}>
                DOUBLE-ENTRY LEDGER TICKET
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.7rem", color: "#888" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>TICKET ID:</span>
                  <span style={{ color: "#fff", fontWeight: 700 }}>{txId || "Standby"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>TIMESTAMP:</span>
                  <span>{isPrinted ? new Date().toISOString().replace("T", " ").substring(0, 19) : "Waiting"}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>AMOUNT SYNCED:</span>
                  <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>150 units</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.06)", paddingBottom: "0.25rem" }}>
                  <span>ROUTING DELAY:</span>
                  <span>{isPrinted ? "4.12 ms" : "Waiting"}</span>
                </div>
                <div style={{ wordBreak: "break-all", fontSize: "0.6rem", color: "#555" }}>
                  HASH: {txHash || "Waiting"}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.25rem", borderTop: "1px dashed rgba(255,255,255,0.06)", paddingTop: "0.25rem" }}>
                  <span>INTEGRITY STATUS:</span>
                  <span style={{ color: isPrinted ? "var(--accent-success)" : "var(--accent-primary)", fontWeight: 700 }}>
                    {isPrinted ? "VERIFIED SUCCESS" : "STANDBY"}
                  </span>
                </div>
              </div>
            </div>

            {/* Double-Entry Vault Ledger Audit Log (No timeline) */}
            <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>Audit Ledger Stream</span>
              <div style={{ background: "#040814", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "0.75rem", fontFamily: "monospace", fontSize: "0.7rem", color: "var(--accent-secondary)", height: "130px", overflowY: "auto" }}>
                {logs.map((log, index) => (
                  <div key={index} style={{ marginBottom: "0.25rem" }}>{log}</div>
                ))}
              </div>
            </div>

          </aside>

        </div>

        {/* Partners Testimonials Showcase (Replacing generic specs/methodology/case) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-secondary)", letterSpacing: "0.1em" }}>Client Review</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>CTO Architectural Endorsements</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              How leading platforms leverage our type-safe double-entry ledger configurations.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-secondary)", marginBottom: "1rem" }}>
                <ShieldCheck size={20} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>Payments Platform Lead</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;Migrating our transaction pipelines to the multi-rail router decoupled our legacy clearing bottleneck completely, lowering end-to-end ledger latency under 5ms.&quot;
              </p>
              <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Ananya Sharma</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Director of Platform Engineering</span>
              </div>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-secondary)", marginBottom: "1rem" }}>
                <Database size={20} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>Core Infrastructure Lead</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;The double-entry lock scheduler maintains state consistency across regional database clusters even during sudden transaction spikes.&quot;
              </p>
              <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Vikram Patel</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Vice President of Core Infrastructure</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
