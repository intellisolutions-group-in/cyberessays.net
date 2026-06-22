"use client";

import React, { useState, useEffect } from "react";
import styles from "./healthcare.module.css";
import { CheckCircle, RefreshCw, Server, Shield, Lock } from "lucide-react";

interface SecurityRing {
  id: string;
  name: string;
  cipher: string;
  status: string;
}

export default function HealthcarePage() {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [checksPassed, setChecksPassed] = useState([false, false, false, false]);
  const [isAuditComplete, setIsAuditComplete] = useState(false);
  
  // Interactive ring selection state
  const [selectedRing, setSelectedRing] = useState<string>("ingress");

  const rings: Record<string, SecurityRing> = {
    ingress: { id: "ingress", name: "FHIR Data Ingress", cipher: "JSON Schema Validate", status: "Active Polling (Kafka)" },
    sso: { id: "sso", name: "SSO Identity Gate", cipher: "OAuth 2.1 Token Signature", status: "Session Verified" },
    hsm: { id: "hsm", name: "Secrets Vault HSM", cipher: "Entropy Key Rotate", status: "Key Rotated: OK" },
    crypt: { id: "crypt", name: "Postgres Shard Crypt", cipher: "AES-256-GCM Row Encryption", status: "Data Insulated" }
  };

  const startSecurityScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setChecksPassed([false, false, false, false]);
    setIsAuditComplete(false);
  };

  useEffect(() => {
    if (!isScanning) return;

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        const nextVal = prev + 5;
        if (nextVal >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setIsAuditComplete(true);
          return 100;
        }
        return nextVal;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isScanning]);

  useEffect(() => {
    if (!isScanning) return;
    
    if (scanProgress >= 25 && !checksPassed[0]) {
      setChecksPassed((prev) => [true, prev[1], prev[2], prev[3]]);
    }
    if (scanProgress >= 50 && !checksPassed[1]) {
      setChecksPassed((prev) => [prev[0], true, prev[2], prev[3]]);
    }
    if (scanProgress >= 75 && !checksPassed[2]) {
      setChecksPassed((prev) => [prev[0], prev[1], true, prev[3]]);
    }
    if (scanProgress >= 98 && !checksPassed[3]) {
      setChecksPassed((prev) => [prev[0], prev[1], prev[2], true]);
    }
  }, [scanProgress, isScanning, checksPassed]);

  const activeRing = rings[selectedRing];

  return (
    <div className={styles.healthPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Digital Healthcare Systems</span>
          <h1 className={styles.title}>Secure Clinical System Architecture</h1>
          <p className={styles.desc}>
            Consolidate fragmented patient record networks securely across clinical grids under strict performance standards with zero-trust protection modules.
          </p>
        </div>

        {/* Split Layout Workspace */}
        <div className={styles.mainSplitGrid}>
          
          {/* Left Column: Interactive Scanner */}
          <main className={styles.scannerCard} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2rem", position: "relative" }}>
            {isScanning && <div className={styles.laserLine}></div>}
            
            <h2 className={styles.scannerTitle} style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Shield size={20} color="var(--accent-success)" /> Security Verification
            </h2>

            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Our zero-trust verification pipelines encrypt database records, wrap traffic in encrypted tunnels, validate cryptographic credentials, and maintain immutable system audit trails.
            </p>

            <div className={styles.checklist} style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Mutual Cryptographic Handshake", desc: "Encrypts microservice payloads using secure key exchanges." },
                { label: "Encrypted VPC Tunnel Routing", desc: "Routes vital payloads through secure private lines, bypassing public routers." },
                { label: "Zero-Trust Credential Keys Check", desc: "Validates credential access permissions inside dynamic gateway channels." },
                { label: "Immutable Audit Log Ledger (WORM)", desc: "Saves write-once transaction trace sequences to secure system drives." }
              ].map((item, idx) => (
                <div key={idx} style={{
                  background: checksPassed[idx] ? "rgba(16, 185, 129, 0.04)" : "rgba(255,255,255,0.01)",
                  border: checksPassed[idx] ? "1px solid rgba(16, 185, 129, 0.25)" : "1px solid rgba(255,255,255,0.04)",
                  borderRadius: "6px",
                  padding: "0.6rem 0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}>
                  <CheckCircle size={16} color={checksPassed[idx] ? "var(--accent-success)" : "var(--text-secondary)"} />
                  <div>
                    <strong style={{ fontSize: "0.75rem", color: "#fff", display: "block" }}>{item.label}</strong>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.scanControls}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--text-secondary)", fontWeight: 600, marginBottom: "0.5rem" }}>
                <span>Scanning System Files...</span>
                <span>{scanProgress}%</span>
              </div>
              <div className={styles.progressBar} style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.08)", borderRadius: "3px", overflow: "hidden", marginBottom: "1rem" }}>
                <div className={styles.progressFill} style={{ height: "100%", width: `${scanProgress}%`, background: "var(--accent-success)", borderRadius: "3px", transition: "width 0.1s ease" }}></div>
              </div>
              <button
                className={styles.scanBtn}
                onClick={startSecurityScan}
                disabled={isScanning}
                style={{
                  width: "100%",
                  background: "var(--accent-success)",
                  border: "none",
                  borderRadius: "var(--border-radius-full)",
                  padding: "0.7rem",
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {isScanning ? (
                  <>
                    <RefreshCw size={14} className="spin" /> Auditing Clinical Clusters...
                  </>
                ) : "Run Security Verification Scan"}
              </button>
            </div>

            {isAuditComplete && (
              <div className={styles.resultBox} style={{ marginTop: "1rem", background: "rgba(16, 185, 129, 0.1)", border: "1px solid var(--accent-success)", borderRadius: "6px", padding: "0.75rem", color: "var(--accent-success)", fontSize: "0.75rem", fontWeight: 700, textAlign: "center" }}>
                <span>DATA INTEGRITY & SECURITY SYSTEM UPTIME: VERIFIED</span>
              </div>
            )}
          </main>

          {/* Right Column: Telemetry Specs */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className={styles.leftCard} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.5rem" }}>
              <h2 className={styles.cardTitle} style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Server size={18} color="var(--accent-success)" /> Platform Telemetry
              </h2>
              <div className={styles.metricsList} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Audit Status</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--accent-success)", fontWeight: 700 }}>Compliant</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Registry Latency</span>
                  <span style={{ fontSize: "0.75rem", color: "#fff", fontWeight: 700 }}>-38% Drop</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>Protected Ledgers</span>
                  <span style={{ fontSize: "1.1rem", color: "var(--accent-success)", fontWeight: 800 }}>Secure Records</span>
                </div>
              </div>
            </div>
          </aside>

        </div>

        {/* Bespoke Interactive: Zero-Trust Clinical Ingestion Mesh (Replacing Specs/Methodology/Case) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className={styles.sectionTag}>Security Mesh</span>
            <h2 className={styles.sectionTitle}>Zero-Trust Clinical Ingestion Mesh</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              Select any ring layer inside our nested secure boundary diagram to inspect active cryptographic properties.
            </p>
          </div>

          <div className={styles.meshSplitGrid}>
            {/* Concentric Ring SVG Visualizer */}
            <div style={{ position: "relative", height: "240px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 240 240" style={{ width: "220px", height: "220px" }}>
                {/* Outermost Ring: Ingress */}
                <circle 
                  cx="120" cy="120" r="100" 
                  fill="none" 
                  stroke={selectedRing === "ingress" ? "var(--accent-success)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="8" 
                  style={{ cursor: "pointer", transition: "all 0.3s" }} 
                  onClick={() => setSelectedRing("ingress")}
                />
                {/* Second Ring: SSO */}
                <circle 
                  cx="120" cy="120" r="75" 
                  fill="none" 
                  stroke={selectedRing === "sso" ? "var(--accent-success)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="8" 
                  style={{ cursor: "pointer", transition: "all 0.3s" }} 
                  onClick={() => setSelectedRing("sso")}
                />
                {/* Third Ring: HSM */}
                <circle 
                  cx="120" cy="120" r="50" 
                  fill="none" 
                  stroke={selectedRing === "hsm" ? "var(--accent-success)" : "rgba(255,255,255,0.05)"} 
                  strokeWidth="8" 
                  style={{ cursor: "pointer", transition: "all 0.3s" }} 
                  onClick={() => setSelectedRing("hsm")}
                />
                {/* Innermost Center Node: Crypt */}
                <circle 
                  cx="120" cy="120" r="25" 
                  fill={selectedRing === "crypt" ? "var(--accent-success)" : "rgba(255,255,255,0.1)"} 
                  style={{ cursor: "pointer", transition: "all 0.3s" }} 
                  onClick={() => setSelectedRing("crypt")}
                />
              </svg>
              
              <div style={{ position: "absolute", bottom: "10px", fontSize: "0.6rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>
                Click concentric rings to audit layers
              </div>
            </div>

            {/* Ingestion layer details card */}
            <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.75rem" }}>
                <Lock size={16} color="var(--accent-success)" />
                <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{activeRing.name}</h4>
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.5, marginBottom: "1rem" }}>
                Insulates vital diagnostic and clinical records from external network vectors. Continuous scans check signature hashes dynamically.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.7rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem", color: "var(--text-secondary)" }}>
                <div>Encryption Standards: <span style={{ color: "#fff", fontFamily: "monospace" }}>{activeRing.cipher}</span></div>
                <div>Status Parameter: <span style={{ color: "var(--accent-success)" }}>{activeRing.status}</span></div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
