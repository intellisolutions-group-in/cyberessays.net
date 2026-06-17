"use client";

import React, { useState, useEffect } from "react";
import styles from "./iceinsight.module.css";
import { Activity, Cpu } from "lucide-react";
import Link from "next/link";

interface TraceNode {
  id: string;
  name: string;
  label: string;
  isAlert: boolean;
  type: "gateway" | "auth" | "db" | "cache" | "queue" | "relay";
  traces: {
    event: string;
    status: string;
    duration: string;
    isError: boolean;
  }[];
  patchText?: string;
}

export default function IceInsightPage() {
  const [nodes, setNodes] = useState<TraceNode[]>([
    {
      id: "node-edge",
      name: "API Edge Gateway",
      label: "Node: 14 active",
      isAlert: false,
      type: "gateway",
      traces: [
        { event: "dns_resolve_lookup", status: "SUCCESS", duration: "1.2 ms", isError: false },
        { event: "cors_header_headers_check", status: "SUCCESS", duration: "0.1 ms", isError: false },
        { event: "rate_limit_throttle_eval", status: "SUCCESS", duration: "0.3 ms", isError: false }
      ]
    },
    {
      id: "node-auth",
      name: "Auth Token Issuer",
      label: "Node: 4 active",
      isAlert: false,
      type: "auth",
      traces: [
        { event: "jwks_signature_verify", status: "SUCCESS", duration: "2.1 ms", isError: false },
        { event: "iam_policy_permission_check", status: "SUCCESS", duration: "1.5 ms", isError: false },
        { event: "token_expiration_validate", status: "SUCCESS", duration: "0.2 ms", isError: false }
      ]
    },
    {
      id: "node-db",
      name: "Postgres Shard #4",
      label: "LOCKOUT DETECTED",
      isAlert: true,
      type: "db",
      traces: [
        { event: "pool_connection_acquire", status: "SUCCESS", duration: "4.5 ms", isError: false },
        { event: "transaction_row_write_lock", status: "BLOCKED", duration: "1842.1 ms", isError: true },
        { event: "write_replica_sync_log", status: "TIMED_OUT", duration: "5000.0 ms", isError: true }
      ],
      patchText: "Clear PostgreSQL transaction row lockouts and engage query routing dampeners."
    },
    {
      id: "node-cache",
      name: "Redis CDN Cache",
      label: "Hit Rate: 99.8%",
      isAlert: false,
      type: "cache",
      traces: [
        { event: "redis_cluster_ping", status: "SUCCESS", duration: "0.8 ms", isError: false },
        { event: "cache_key_ttl_verify", status: "SUCCESS", duration: "0.1 ms", isError: false },
        { event: "ingress_edge_json_serve", status: "SUCCESS", duration: "1.4 ms", isError: false }
      ]
    },
    {
      id: "node-queue",
      name: "SQS Dispatch Queue",
      label: "Queue: 0 pending",
      isAlert: false,
      type: "queue",
      traces: [
        { event: "sqs_message_poll_check", status: "SUCCESS", duration: "14.2 ms", isError: false },
        { event: "worker_ack_handshake", status: "SUCCESS", duration: "2.5 ms", isError: false }
      ]
    },
    {
      id: "node-relay",
      name: "SES Email Relay",
      label: "Relay: standby",
      isAlert: false,
      type: "relay",
      traces: [
        { event: "relay_channel_health", status: "SUCCESS", duration: "24.5 ms", isError: false },
        { event: "secure_handshake_target_node", status: "SUCCESS", duration: "42.1 ms", isError: false }
      ]
    }
  ]);

  const [selectedNodeId, setSelectedNodeId] = useState("node-db");
  const [telemetryHistory, setTelemetryHistory] = useState<number[]>([42, 45, 48, 52, 46, 50, 47, 55, 62, 54, 49, 43, 46, 50, 52]);
  
  // Random walk telemetry updates
  useEffect(() => {
    const interval = setInterval(() => {
      const dbNode = nodes.find(n => n.id === "node-db");
      const baseMin = dbNode?.isAlert ? 180 : 38;
      const baseMax = dbNode?.isAlert ? 220 : 54;
      
      setTelemetryHistory((prev) => {
        const last = prev[prev.length - 1];
        const delta = (Math.random() - 0.5) * 12;
        let nextVal = Math.round(last + delta);
        if (nextVal < baseMin) nextVal = baseMin;
        if (nextVal > baseMax) nextVal = baseMax;
        return [...prev.slice(1), nextVal];
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [nodes]);

  const getSvgPath = () => {
    const width = 500;
    const height = 150;
    const padding = 10;
    const isAlertActive = nodes.find(n => n.id === "node-db")?.isAlert;
    const maxVal = isAlertActive ? 250 : 80;
    const step = (width - padding * 2) / (telemetryHistory.length - 1);
    
    let path = `M ${padding} ${height - (telemetryHistory[0] / maxVal) * (height - padding * 2)}`;
    for (let i = 1; i < telemetryHistory.length; i++) {
      const x = padding + i * step;
      const y = height - (telemetryHistory[i] / maxVal) * (height - padding * 2);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const getSvgFillPath = () => {
    const path = getSvgPath();
    const width = 500;
    const height = 150;
    const padding = 10;
    const step = (width - padding * 2) / (telemetryHistory.length - 1);
    const lastX = padding + (telemetryHistory.length - 1) * step;
    return `${path} L ${lastX} ${height} L ${padding} ${height} Z`;
  };

  const handleResolvePatch = (nodeId: string) => {
    setNodes((prev) =>
      prev.map((n) => {
        if (n.id === nodeId) {
          return {
            ...n,
            label: "Node: 4 active",
            isAlert: false,
            traces: [
              { event: "pool_connection_acquire", status: "SUCCESS", duration: "2.1 ms", isError: false },
              { event: "transaction_row_write_lock", status: "RESOLVED", duration: "0.4 ms", isError: false },
              { event: "write_replica_sync_log", status: "SUCCESS", duration: "8.5 ms", isError: false }
            ]
          };
        }
        return n;
      })
    );

    // Reset telemetry metrics baseline instantly
    setTelemetryHistory([42, 45, 48, 52, 46, 50, 47, 44, 48, 51, 46, 42, 45, 48, 50]);
  };

  const selectedNode = nodes.find((n) => n.id === selectedNodeId);
  const isOverallAlert = nodes.some(n => n.isAlert);

  return (
    <div className={styles.iceinsightPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Observability Portal</span>
          <h1 className={styles.title}>High-Frequency Telemetry & Query Tracing</h1>
          <p className={styles.desc}>
            Gain deep operational integrity insights. Trace distributed database transactions, scan server log spikes, monitor CDN cache coverage ratios, and deploy automated diagnostics shunts.
          </p>
        </div>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left: Radar sweep chart */}
          <div className={styles.radarCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Activity size={18} color="var(--accent-highlight)" /> Global Query Latency Monitor
              </span>
              <span style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                border: isOverallAlert ? "1px solid var(--accent-highlight)" : "1px solid var(--accent-success)",
                background: isOverallAlert ? "rgba(255,107,107,0.05)" : "rgba(16,185,129,0.05)",
                color: isOverallAlert ? "var(--accent-highlight)" : "var(--accent-success)"
              }}>
                Telemetry status: {isOverallAlert ? "ANOMALY LOAD" : "STABLE"}
              </span>
            </div>

            {/* SVG graph container with radar scanning background */}
            <div className={styles.radarContainer}>
              <div className={styles.radarSweep}></div>
              
              <svg viewBox="0 0 500 150" width="100%" height="100%" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-highlight)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--accent-highlight)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Horizontal grid guide lines */}
                <line x1="10" y1="140" x2="490" y2="140" stroke="rgba(255,255,255,0.04)" />
                <line x1="10" y1="75" x2="490" y2="75" stroke="rgba(255,255,255,0.04)" />
                <line x1="10" y1="10" x2="490" y2="10" stroke="rgba(255,255,255,0.04)" />

                <path d={getSvgFillPath()} fill="url(#latencyGlow)" style={{ transition: "d 0.25s ease" }} />
                <path d={getSvgPath()} fill="none" stroke="var(--accent-highlight)" strokeWidth="2.5" style={{ transition: "d 0.25s ease" }} />
              </svg>
            </div>
            
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              The line chart reports average transaction durations across all microservice routing hops. Latency peaks occur when row lockouts are flagged in active database storage targets.
            </p>
          </div>

          {/* Right: Network Node Grid & Active Trace Details */}
          <div className={styles.traceCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Cpu size={18} color="var(--accent-highlight)" /> Distributed Infrastructure Grid
              </span>
            </div>

            {/* 6-Node Grid */}
            <div className={styles.nodeGrid}>
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`${styles.nodeCell} ${node.isAlert ? styles.nodeAlert : ""} ${selectedNodeId === node.id ? styles.nodeActive : ""}`}
                  onClick={() => setSelectedNodeId(node.id)}
                >
                  <div className={styles.cardHeader} style={{ width: "100%", justifyContent: "space-between" }}>
                    <div className={node.isAlert ? styles.nodeStatusDotAlert : styles.nodeStatusDot} />
                  </div>
                  <span className={styles.nodeName}>{node.name}</span>
                  <span className={styles.nodeLabel} style={{ color: node.isAlert ? "var(--accent-highlight)" : "var(--text-secondary)" }}>
                    {node.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Selected Node Trace Details Box */}
            {selectedNode && (
              <div className={styles.traceDetailsBox}>
                <div className={styles.traceHeader}>
                  <span className={styles.traceTitle}>Trace Log: {selectedNode.name}</span>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>
                    node_id: {selectedNode.id}
                  </span>
                </div>

                <div className={styles.traceRowsList}>
                  {selectedNode.traces.map((trace, idx) => (
                    <div key={idx} className={styles.traceRow}>
                      <span className={styles.rowLabel}>{trace.event}</span>
                      <span className={trace.isError ? styles.rowAlertVal : styles.rowVal}>
                        {trace.status} ({trace.duration})
                      </span>
                    </div>
                  ))}
                </div>

                {selectedNode.isAlert && selectedNode.patchText && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", borderTop: "1px dashed rgba(255,255,255,0.08)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                      Recommendation: {selectedNode.patchText}
                    </span>
                    <button
                      className={styles.patchBtn}
                      onClick={() => handleResolvePatch(selectedNode.id)}
                    >
                      Resolve Lockout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Embedded spotlight case study */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              High-Frequency Trace Indexing
            </h2>
            <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
              Deployed IceInsight automated lockouts mitigations across global databases routing nodes for a major financial platform, decreasing database write queue lag issues by 92% and securing stable SLA performance.
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
