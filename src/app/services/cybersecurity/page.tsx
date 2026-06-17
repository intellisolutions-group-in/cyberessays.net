"use client";

import React, { useState } from "react";
import styles from "./cybersecurity.module.css";
import { Lock, Unlock } from "lucide-react";
import Link from "next/link";

interface SecurityNode {
  id: string;
  name: string;
  desc: string;
  cipher: string;
  policy: string;
  status: "secure" | "scanning" | "alert";
}

interface ShieldAlertLog {
  time: string;
  source: string;
  text: string;
  severity: "info" | "warn" | "critical";
}

export default function CybersecurityPage() {
  const [selectedNodeIdx, setSelectedNodeIdx] = useState<number>(0);
  const [isLockdown, setIsLockdown] = useState(false);
  const [scanProgress, setScanProgress] = useState<number>(-1);
  const [nodes, setNodes] = useState<SecurityNode[]>([
    { id: "node-waf", name: "WAF Perimeter", desc: "Filters ingress queries and blocks threat requests.", cipher: "IP Access Filtering", policy: "Ingress rules: ENABLED", status: "secure" },
    { id: "node-auth", name: "SSO Gateway", desc: "Verifies user access scopes and checks JWT signatures.", cipher: "OAuth 2.1 Handshake", policy: "Session lifetime: 3600s", status: "secure" },
    { id: "node-vault", name: "Credentials Crypt", desc: "Rotates environment variables and database keys.", cipher: "Entropy Key Rotate", policy: "Rotation window: 30 days", status: "secure" },
    { id: "node-db", name: "Database Vault", desc: "Double-encrypts user data blocks at rest.", cipher: "AES-256 Block Crypt", policy: "Resident shards: Isolated", status: "secure" }
  ]);

  const [alerts, setAlerts] = useState<ShieldAlertLog[]>([
    { time: "12:04:18", source: "waf-guard", text: "Ingress filter bypass attempt blocked from subnet 192.168.4.15", severity: "warn" },
    { time: "12:04:32", source: "sso-gateway", text: "JWT verification passed for user administrative scope", severity: "info" }
  ]);

  const currentNode = nodes[selectedNodeIdx];

  const handleToggleLockdown = () => {
    const nextState = !isLockdown;
    setIsLockdown(nextState);
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });
    
    if (nextState) {
      setAlerts((prev) => [
        { time: timeStr, source: "firewall", text: "SYSTEM LOCKDOWN TRIGGERED. Shunting ingress routes to full-block mode.", severity: "critical" },
        { time: timeStr, source: "sso-gateway", text: "Revoking active session credentials on standby databases.", severity: "warn" },
        ...prev
      ]);
      setNodes((prev) => prev.map((n) => ({ ...n, status: n.id === "node-waf" ? "alert" : n.status })));
    } else {
      setAlerts((prev) => [
        { time: timeStr, source: "firewall", text: "System lockdown deactivated. Re-enabling edge routing patterns.", severity: "info" },
        ...prev
      ]);
      setNodes((prev) => prev.map((n) => ({ ...n, status: "secure" })));
    }
  };

  const runVulnerabilityScan = () => {
    if (scanProgress !== -1) return;
    setScanProgress(0);
    const targetNode = nodes[selectedNodeIdx];
    
    setNodes((prev) => prev.map((n, idx) => (idx === selectedNodeIdx ? { ...n, status: "scanning" } : n)));

    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setNodes((prev) => prev.map((n, idx) => (idx === selectedNodeIdx ? { ...n, status: "secure" } : n)));
            setScanProgress(-1);
            
            const timeStr = new Date().toLocaleTimeString([], { hour12: false });
            setAlerts((prev) => [
              { time: timeStr, source: "security-auditor", text: `Penetration audit completed on ${targetNode.name}. Status: NOMINAL (0 vulnerabilities found).`, severity: "info" },
              ...prev
            ]);
          }, 400);
          return 100;
        }
        return p + 20;
      });
    }, 200);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Zero-Trust Cybersecurity</span>
          <h1 className={styles.title}>Defensive Zero-Trust Network Architecture</h1>
          <p className={styles.desc}>
            We insulate vital database structures and container pipelines behind cryptographic access guards, ensuring bulletproof compliance and continuous vulnerability hardening.
          </p>
        </div>

        {/* Security Control Room Layout */}
        <div className={styles.controlRoomGrid}>
          
          {/* Left: Interactive Zero-Trust Node Map */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>Hardened Perimeter</span>
              <span style={{ fontSize: "0.65rem", color: isLockdown ? "var(--accent-highlight)" : "var(--accent-success)", fontWeight: 700 }}>
                {isLockdown ? "LOCKDOWN ACTIVE" : "SHIELDS NOMINAL"}
              </span>
            </div>

            <div className={styles.nodesMapGrid}>
              {nodes.map((node, idx) => {
                const isSelected = selectedNodeIdx === idx;
                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeIdx(idx)}
                    style={{
                      background: isSelected ? "rgba(124, 58, 237, 0.08)" : "rgba(4, 8, 20, 0.5)",
                      border: isSelected ? "1px solid var(--accent-primary)" : "1px solid rgba(255, 255, 255, 0.05)",
                      borderRadius: "10px",
                      padding: "1.25rem",
                      cursor: "pointer",
                      textAlign: "left",
                      position: "relative",
                      transition: "all 0.25s"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{node.name}</span>
                      <span style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        backgroundColor: node.status === "secure" ? "var(--accent-success)" : node.status === "scanning" ? "var(--accent-secondary)" : "var(--accent-highlight)",
                        boxShadow: `0 0 8px ${node.status === "secure" ? "var(--accent-success)" : node.status === "scanning" ? "var(--accent-secondary)" : "var(--accent-highlight)"}`
                      }} />
                    </div>
                    <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)", display: "block" }}>{node.cipher}</span>
                  </button>
                );
              })}
            </div>

            {/* Node detail inspector panel */}
            <div style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "1.25rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <h4 style={{ fontSize: "0.9rem", fontWeight: 700, color: "#fff" }}>{currentNode.name} Config</h4>
                <button
                  type="button"
                  onClick={runVulnerabilityScan}
                  disabled={scanProgress !== -1 || isLockdown}
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    padding: "0.25rem 0.6rem",
                    fontSize: "0.65rem",
                    color: scanProgress !== -1 ? "var(--text-secondary)" : "#fff",
                    cursor: "pointer"
                  }}
                >
                  {scanProgress !== -1 ? `Audit Scan: ${scanProgress}%` : "Run Audit Scan"}
                </button>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginBottom: "0.75rem", lineHeight: 1.4 }}>{currentNode.desc}</p>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.5rem", color: "var(--text-secondary)" }}>
                <span>Authentication Cipher: <span style={{ color: "#fff", fontFamily: "monospace" }}>{currentNode.cipher}</span></span>
                <span>{currentNode.policy}</span>
              </div>
            </div>
          </div>

          {/* Right: SIEM Alert logs & Global Lockdown Switch */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Global Lockdown switch card */}
            <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.5rem 2.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-primary)", fontSize: "1.25rem", fontWeight: 800, color: "#fff" }}>Emergency Firewall Lockdown</h3>
                <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.15rem" }}>
                  Shunts all incoming client requests immediately, logging a warning flag.
                </p>
              </div>
              <button
                type="button"
                onClick={handleToggleLockdown}
                style={{
                  background: isLockdown ? "var(--accent-highlight)" : "rgba(255,255,255,0.03)",
                  border: isLockdown ? "none" : "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "var(--border-radius-full)",
                  padding: "0.6rem 1.25rem",
                  color: isLockdown ? "#fff" : "var(--accent-highlight)",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  transition: "all 0.25s"
                }}
              >
                {isLockdown ? <Lock size={12} /> : <Unlock size={12} />}
                {isLockdown ? "LOCKDOWN" : "DEACTIVATED"}
              </button>
            </div>

            {/* SIEM Incident log terminal */}
            <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>SIEM Incident Auditor Logs</span>
              <div style={{ background: "#040814", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "6px", padding: "1rem", fontFamily: "monospace", fontSize: "0.7rem", flex: 1, overflowY: "auto", minHeight: "150px" }}>
                {alerts.map((alert, index) => (
                  <div key={index} style={{ marginBottom: "0.5rem", display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>[{alert.time}]</span>
                    <span style={{
                      color: alert.severity === "critical" ? "var(--accent-highlight)" : alert.severity === "warn" ? "var(--accent-secondary)" : "var(--accent-success)",
                      fontWeight: alert.severity !== "info" ? 700 : 400
                    }}>[{alert.source}] {alert.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline} style={{ color: "var(--accent-secondary)" }}>Success Spotlight</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              Apex Zero-Trust Security Portal
            </h2>
            <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
              Constructed a secure, robust transaction pipeline, validating microservice token handshakes and protecting vital clinical records.
            </p>
            <Link href="/case-studies" className="magnetic-btn btn-primary" style={{ padding: "0.85rem 2.25rem" }}>
              Read Case Study
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
