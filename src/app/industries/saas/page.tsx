"use client";

import React, { useState, useEffect } from "react";
import styles from "./saas.module.css";
import { Activity, BarChart3, Radio } from "lucide-react";
import Link from "next/link";

interface ContainerShard {
  id: string;
  zone: string;
  cpuLimit: string;
  memory: string;
  status: "NOMINAL" | "REPLICATING" | "SPIKED";
}

export default function SaasIndustryPage() {
  const [requestsPerSec, setRequestsPerSec] = useState(1240);
  const [latency, setLatency] = useState(4.2);
  const [cpuUsage, setCpuUsage] = useState(24.5);
  const [activeContainers, setActiveContainers] = useState(4);
  const [isSpikeActive, setIsSpikeActive] = useState(false);
  const [systemState, setSystemState] = useState("Healthy");
  const [requestHistory, setRequestHistory] = useState<number[]>([1200, 1300, 1150, 1250, 1400, 1210, 1350, 1280, 1190, 1250, 1310, 1240]);

  const [containerShards, setContainerShards] = useState<ContainerShard[]>([
    { id: "pod-101", zone: "us-east-1a", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" },
    { id: "pod-102", zone: "us-east-1b", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" },
    { id: "pod-103", zone: "eu-central-1a", cpuLimit: "2.0 Cores", memory: "1024 MB", status: "NOMINAL" },
    { id: "pod-104", zone: "eu-central-1b", cpuLimit: "2.0 Cores", memory: "1024 MB", status: "NOMINAL" }
  ]);

  // Random walk metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpikeActive) {
        setRequestsPerSec((prev) => Math.max(900, Math.min(1800, Math.round(prev + (Math.random() - 0.5) * 150))));
        setLatency((prev) => Math.max(3.5, Math.min(6.2, parseFloat((prev + (Math.random() - 0.5) * 0.4).toFixed(2)))));
        setCpuUsage((prev) => Math.max(18, Math.min(32, parseFloat((prev + (Math.random() - 0.5) * 2).toFixed(1)))));
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [isSpikeActive]);

  // Push request history updates
  useEffect(() => {
    setRequestHistory((prev) => [...prev.slice(1), requestsPerSec]);
  }, [requestsPerSec]);

  const triggerLoadSpike = () => {
    if (isSpikeActive) return;
    setIsSpikeActive(true);
    setSystemState("Spike Detected");
    setRequestsPerSec(11850);
    setCpuUsage(92.4);
    setLatency(28.4);
    
    setContainerShards((prev) => prev.map((s) => ({ ...s, status: "SPIKED" as const })));

    // Phase 2: Autoscaling trigger after 2 seconds
    setTimeout(() => {
      setSystemState("Autoscaling Nodes...");
      setActiveContainers(12);
      setCpuUsage(48.2);
      setLatency(8.1);
      setContainerShards((prev) => [
        ...prev.map((s) => ({ ...s, status: "NOMINAL" as const })),
        { id: "pod-105-auto", zone: "us-east-1a", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" as const },
        { id: "pod-106-auto", zone: "us-east-1b", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" as const }
      ]);
    }, 2000);

    // Phase 3: System stabilizes
    setTimeout(() => {
      setSystemState("Healthy (Scaled)");
      setLatency(4.5);
      setCpuUsage(34.8);
    }, 5000);

    // Phase 4: Cool down, return to baseline
    setTimeout(() => {
      setIsSpikeActive(false);
      setSystemState("Healthy");
      setRequestsPerSec(1240);
      setActiveContainers(4);
      setCpuUsage(24.5);
      setLatency(4.2);
      setContainerShards([
        { id: "pod-101", zone: "us-east-1a", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" },
        { id: "pod-102", zone: "us-east-1b", cpuLimit: "1.0 Core", memory: "512 MB", status: "NOMINAL" },
        { id: "pod-103", zone: "eu-central-1a", cpuLimit: "2.0 Cores", memory: "1024 MB", status: "NOMINAL" },
        { id: "pod-104", zone: "eu-central-1b", cpuLimit: "2.0 Cores", memory: "1024 MB", status: "NOMINAL" }
      ]);
    }, 8000);
  };

  const getSvgPath = () => {
    const width = 500;
    const height = 150;
    const padding = 10;
    const maxVal = isSpikeActive ? 13000 : 3000;
    const step = (width - padding * 2) / (requestHistory.length - 1);
    
    let path = `M ${padding} ${height - (requestHistory[0] / maxVal) * (height - padding * 2)}`;
    for (let i = 1; i < requestHistory.length; i++) {
      const x = padding + i * step;
      const y = height - (requestHistory[i] / maxVal) * (height - padding * 2);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const getSvgFillPath = () => {
    const path = getSvgPath();
    const width = 500;
    const height = 150;
    const padding = 10;
    const step = (width - padding * 2) / (requestHistory.length - 1);
    const lastX = padding + (requestHistory.length - 1) * step;
    return `${path} L ${lastX} ${height} L ${padding} ${height} Z`;
  };

  return (
    <div className={styles.saasPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>SaaS & Software Platforms</span>
          <h1 className={styles.title}>High-Concurrence SaaS Infrastructure</h1>
          <p className={styles.desc}>
            We build multi-region serverless configurations designed to survive transaction floods, maximize viewport load indexes, and guarantee sub-20ms global API transactions.
          </p>
        </div>

        {/* Bento Grid Workspace */}
        <div className={styles.bentoGrid} style={{ marginBottom: "4rem" }}>
          
          {/* Card 1: Live Telemetry Monitor */}
          <div className={`${styles.bentoCard} ${styles.col8}`} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "12px", padding: "1.5rem" }}>
            <div className={styles.simulationBox}>
              <div className={styles.cardHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <span className={styles.cardTitle} style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Activity size={18} color="var(--accent-secondary)" /> Live Traffic Telemetry
                </span>
                <span style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0.2rem 0.6rem",
                  borderRadius: "4px",
                  border: isSpikeActive ? "1px solid var(--accent-highlight)" : "1px solid var(--accent-success)",
                  background: isSpikeActive ? "rgba(255,107,107,0.05)" : "rgba(16,185,129,0.05)",
                  color: isSpikeActive ? "var(--accent-highlight)" : "var(--accent-success)"
                }}>
                  Status: {systemState}
                </span>
              </div>

              {/* Dynamic SVG Chart */}
              <div className={styles.chartContainer} style={{ background: "#040814", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)", padding: "1rem", height: "140px" }}>
                <svg viewBox="0 0 500 150" width="100%" height="100%" style={{ overflow: "visible" }}>
                  <defs>
                    <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <line x1="10" y1="140" x2="490" y2="140" stroke="rgba(255,255,255,0.02)" />
                  <line x1="10" y1="75" x2="490" y2="75" stroke="rgba(255,255,255,0.02)" />
                  <path d={getSvgFillPath()} fill="url(#chartGlow)" style={{ transition: "d 0.3s ease" }} />
                  <path d={getSvgPath()} fill="none" stroke="var(--accent-secondary)" strokeWidth="2" style={{ transition: "d 0.3s ease" }} />
                </svg>
              </div>

              {/* Simulation Controls */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                  Trigger a mock transaction spike to verify autoscaling parameters.
                </span>
                <button 
                  type="button"
                  onClick={triggerLoadSpike} 
                  disabled={isSpikeActive}
                  style={{
                    background: "var(--accent-secondary)",
                    border: "none",
                    borderRadius: "20px",
                    padding: "0.5rem 1rem",
                    color: "#040814",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem"
                  }}
                >
                  <Radio size={12} /> Simulate Load Spike
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Numeric Real-Time Dashboard */}
          <div className={`${styles.bentoCard} ${styles.col4}`} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "12px", padding: "1.5rem" }}>
            <div className={styles.cardHeader} style={{ marginBottom: "1rem" }}>
              <span className={styles.cardTitle} style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <BarChart3 size={18} color="var(--accent-primary)" /> Live Metrics
              </span>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Requests / Sec", val: requestsPerSec.toLocaleString(), color: isSpikeActive ? "var(--accent-highlight)" : "var(--accent-secondary)" },
                { label: "API Latency", val: `${latency} ms`, color: isSpikeActive && requestsPerSec > 10000 ? "var(--accent-highlight)" : "#fff" },
                { label: "Active Nodes", val: `${activeContainers} pods`, color: activeContainers > 4 ? "var(--accent-success)" : "#fff" },
                { label: "CPU Load", val: `${cpuUsage}%`, color: cpuUsage > 80 ? "var(--accent-highlight)" : "#fff" }
              ].map((m, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "0.4rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontWeight: 600 }}>{m.label}</span>
                  <span style={{ fontSize: "0.95rem", fontWeight: 800, color: m.color }}>{m.val}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Container Cluster Shards Table (Replacing Specs & Methodology) */}
        <section style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2.5rem", marginBottom: "4rem" }}>
          <div style={{ marginBottom: "2rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-secondary)", letterSpacing: "0.1em" }}>Container topology</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>Active Cluster Shards Table</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              Review resources allocated across localized AWS/Google Cloud replica containers in real-time.
            </p>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", textAlign: "left" }}>
                  <th style={{ padding: "0.75rem 1rem", color: "#fff" }}>Pod ID</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#fff" }}>Availability Zone</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#fff" }}>CPU Threshold</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#fff" }}>Memory Block</th>
                  <th style={{ padding: "0.75rem 1rem", color: "#fff" }}>Sync Status</th>
                </tr>
              </thead>
              <tbody>
                {containerShards.map((shard) => (
                  <tr key={shard.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <td style={{ padding: "0.75rem 1rem", fontFamily: "monospace", color: "#fff" }}>{shard.id}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{shard.zone}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{shard.cpuLimit}</td>
                    <td style={{ padding: "0.75rem 1rem" }}>{shard.memory}</td>
                    <td style={{ padding: "0.75rem 1rem", fontWeight: 700, color: shard.status === "SPIKED" ? "var(--accent-highlight)" : "var(--accent-success)" }}>
                      {shard.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bespoke SaaS CTA (Replacing Generic Case Study) */}
        <section style={{ background: "radial-gradient(circle at top right, rgba(124,58,237,0.05), transparent 70%), rgba(13, 18, 37, 0.4)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: "var(--border-radius-xl)", padding: "3.5rem", textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-primary)", letterSpacing: "0.1em" }}>Infrastructure Scaling</span>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginTop: "1rem" }}>Build Elastic SaaS Backends</h2>
          <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "600px" }}>
            Decouple frontend assets from database structures. We configure container limits and Redis geo-caches to ensure your application remains responsive under load spikes.
          </p>
          <Link href="/contact" className="magnetic-btn btn-accent" style={{ padding: "0.85rem 2.25rem" }}>
            Request Specification Blueprint
          </Link>
        </section>

      </div>
    </div>
  );
}
