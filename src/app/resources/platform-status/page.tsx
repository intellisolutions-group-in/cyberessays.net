"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./status.module.css";
import { Terminal as TermIcon, Activity, ChevronDown, ChevronUp, CheckCircle, ShieldAlert, Cpu } from "lucide-react";

interface ComponentStatus {
  name: string;
  uptime: string;
  uptimeHistory: boolean[]; // true = 100%, false = outage (yellow block)
}

interface Incident {
  id: string;
  title: string;
  date: string;
  status: string;
  severity: "Minor" | "Major";
  description: string;
  rootCause: string;
  resolution: string;
}

const componentList: ComponentStatus[] = [
  {
    name: "API Ingress Gateway",
    uptime: "99.99%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true
    ]
  },
  {
    name: "Cognitive Auth Server",
    uptime: "99.98%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, false, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true
    ]
  },
  {
    name: "Distributed DB Cluster",
    uptime: "99.95%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, false,
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true
    ]
  },
  {
    name: "Global Storage CDN",
    uptime: "100.00%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true
    ]
  },
  {
    name: "Real-time WebSocket Hub",
    uptime: "99.97%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, false,
      true, true, true, true, true, true, true, true, true, true
    ]
  },
  {
    name: "Task Queues & Schedulers",
    uptime: "99.99%",
    uptimeHistory: [
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true,
      true, true, true, true, true, true, true, true, true, true
    ]
  }
];

const incidentHistory: Incident[] = [
  {
    id: "inc-01",
    title: "Auth Token Handshake Outage",
    date: "June 14, 2026",
    status: "Resolved",
    severity: "Minor",
    description: "Our security mesh reported authentication handshake time limits on our cognitive token endpoints. This caused minor latency delays for users attempting to establish new SSH credentials.",
    rootCause: "An unoptimized key index lookup loop led to thread locks under concurrent API request spikes.",
    resolution: "We patched the database routing key indexes, implemented a lock-free session cache lookup structure, and offloaded encryption loops to GPU shards."
  },
  {
    id: "inc-02",
    title: "Database Cluster Latency Spike",
    date: "June 10, 2026",
    status: "Resolved",
    severity: "Minor",
    description: "Database cluster nodes in the Eastern zone experienced high CPU loads and write-ahead logging (WAL) pipeline queues.",
    rootCause: "A burst of telemetry log writes triggered maximum disk IO capacities on primary hardware segments.",
    resolution: "We deployed batch write consolidation algorithms and dynamically balanced workloads using partition consensus rings."
  }
];

const mockLogs = [
  { level: "info", text: "API ingress gateway: route matching initialized." },
  { level: "check", text: "Cognitive auth validator: token cache verified (99.8% cache hit)." },
  { level: "check", text: "Database master replication node: status synchronized." },
  { level: "info", text: "Telemetry healthcheck probe: all local worker nodes reporting normal." },
  { level: "warn", text: "Job queue check: scheduler index latency slightly elevated (8.4ms)." },
  { level: "info", text: "CDN edge synchronizer: assets caching completed successfully." },
  { level: "check", text: "WebSocket server cluster: heartbeat ping completed (2,450 connected)." },
  { level: "check", text: "Zero-trust firewall check: 0 blocked anomalies detected." }
];

export default function PlatformStatusPage() {
  const [openIncident, setOpenIncident] = useState<string | null>(null);
  const [logs, setLogs] = useState<{ time: string; level: string; text: string }[]>([]);
  const [latencyPoints, setLatencyPoints] = useState<number[]>([12, 15, 11, 14, 18, 22, 19, 15, 13, 16, 21, 14, 12, 15, 13]);
  const terminalRef = useRef<HTMLDivElement | null>(null);

  // Initialize and update logs
  useEffect(() => {
    // Seed initial logs
    const now = new Date();
    const seededLogs = mockLogs.slice(0, 5).map((log, idx) => {
      const timeStr = new Date(now.getTime() - (5 - idx) * 3000).toLocaleTimeString("en-US", { hour12: false });
      return { time: timeStr, level: log.level, text: log.text };
    });
    setLogs(seededLogs);

    // Dynamic log generator interval
    const interval = setInterval(() => {
      const randomLog = mockLogs[Math.floor(Math.random() * mockLogs.length)];
      const timeStr = new Date().toLocaleTimeString("en-US", { hour12: false });
      
      setLogs((prev) => {
        const nextLogs = [...prev, { time: timeStr, level: randomLog.level, text: randomLog.text }];
        // Keep maximum 20 logs to avoid performance bloat
        return nextLogs.slice(-20);
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll logs terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Update latency graph dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setLatencyPoints((prev) => {
        const lastVal = prev[prev.length - 1];
        // Introduce small random walk step (keeping values bounded between 8ms and 45ms)
        const change = (Math.random() - 0.5) * 8;
        const nextVal = Math.max(8, Math.min(45, Math.round(lastVal + change)));
        
        return [...prev.slice(1), nextVal];
      });
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  // Generate SVG path for Latency Line
  const getSvgPath = () => {
    const width = 450;
    const height = 200;
    const padding = 15;
    const maxVal = 50; // bound scale
    const step = (width - padding * 2) / (latencyPoints.length - 1);
    
    // M x y
    let path = `M ${padding} ${height - (latencyPoints[0] / maxVal) * (height - padding * 2)}`;
    for (let i = 1; i < latencyPoints.length; i++) {
      const x = padding + i * step;
      const y = height - (latencyPoints[i] / maxVal) * (height - padding * 2);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  // Generate SVG filled area path
  const getSvgFillPath = () => {
    const path = getSvgPath();
    const width = 450;
    const height = 200;
    const padding = 15;
    const step = (width - padding * 2) / (latencyPoints.length - 1);
    const lastX = padding + (latencyPoints.length - 1) * step;
    
    // Connect to bottom-right then bottom-left and close
    return `${path} L ${lastX} ${height} L ${padding} ${height} Z`;
  };

  return (
    <div className={styles.statusPage}>
      <div className="container">
        
        <h1 className={styles.title}>System Operations Status</h1>
        <p className={styles.subtitle}>
          Real-time metrics, node latency trackers, service uptime visualizers, and audit logs for the CyberEssays Digital Services network.
        </p>

        {/* Global Operational Status Banner */}
        <div className={styles.globalBanner}>
          <div className={styles.bannerLeft}>
            <div className={styles.pulseBeacon}></div>
            <div>
              <h2 className={styles.bannerTitle}>All Systems Operational</h2>
              <p className={styles.bannerDesc}>
                All microservice channels and database rings are responding normally.
              </p>
            </div>
          </div>
          <div className={styles.uptimePercent}>
            99.98% <span style={{ fontSize: "1rem", color: "var(--text-secondary)", fontWeight: 500 }}>30d uptime</span>
          </div>
        </div>

        {/* Component Health Grid */}
        <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "1.5rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "1.5rem" }}>
          Components System Health
        </h2>
        <div className={styles.grid}>
          {componentList.map((comp) => (
            <div key={comp.name} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.compName}>{comp.name}</span>
                <span className={styles.compStatus}>
                  <CheckCircle size={14} /> {comp.uptime} Uptime
                </span>
              </div>

              {/* 30-day visual block timeline */}
              <div className={styles.timeline}>
                {comp.uptimeHistory.map((day, idx) => {
                  const dayOffset = 30 - idx;
                  const dateLabel = new Date(Date.now() - dayOffset * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "short", day: "numeric" });
                  return (
                    <div
                      key={idx}
                      className={`${styles.block} ${day ? styles.blockGreen : styles.blockYellow}`}
                    >
                      <div className={styles.tooltip}>
                        <div>{dateLabel}</div>
                        <div style={{ fontWeight: "bold", color: day ? "var(--accent-success)" : "var(--accent-highlight)", marginTop: "2px" }}>
                          {day ? "100% Operational" : "99.2% Uptime (Minor Incident)"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={styles.timelineFooter}>
                <span>30 days ago</span>
                <span>Today</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Telemetry Panel */}
        <div className={styles.telemetryGrid}>
          
          {/* SVG Latency Graph */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              <Activity size={18} color="var(--accent-secondary)" /> Real-Time Latency (API Gateway)
            </h2>
            <div style={{ position: "relative", width: "100%", height: "200px" }}>
              <svg viewBox="0 0 450 200" width="100%" height="100%" style={{ overflow: "visible" }}>
                <defs>
                  <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent-secondary)" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="15" y1="185" x2="435" y2="185" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="15" y1="100" x2="435" y2="100" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                <line x1="15" y1="15" x2="435" y2="15" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

                <text x="5" y="190" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace">0ms</text>
                <text x="5" y="105" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace">25ms</text>
                <text x="5" y="20" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace">50ms</text>

                {/* Filled Area */}
                <path d={getSvgFillPath()} fill="url(#latencyGlow)" style={{ transition: "d 0.3s ease" }} />

                {/* Spark Wave Line */}
                <path
                  d={getSvgPath()}
                  fill="none"
                  stroke="var(--accent-secondary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{ transition: "d 0.3s ease", filter: "drop-shadow(0 0 4px rgba(6, 182, 212, 0.4))" }}
                />

                {/* Active Pulsing Dot on End Point */}
                {latencyPoints.length > 0 && (
                  <circle
                    cx={15 + (latencyPoints.length - 1) * ((450 - 30) / (latencyPoints.length - 1))}
                    cy={200 - (latencyPoints[latencyPoints.length - 1] / 50) * 170}
                    r="4"
                    fill="var(--accent-secondary)"
                    style={{ transition: "cy 0.3s ease" }}
                  />
                )}
              </svg>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <span>Current latency: <strong>{latencyPoints[latencyPoints.length - 1]}ms</strong></span>
              <span>Metric check: Every 1.8s</span>
            </div>
          </div>

          {/* Real-time Logs Console */}
          <div className={styles.panel}>
            <h2 className={styles.panelTitle}>
              <TermIcon size={18} color="var(--accent-primary)" /> Live Audit Log Stream
            </h2>
            <div className={styles.terminal} ref={terminalRef}>
              {logs.map((log, idx) => (
                <div key={idx} className={styles.logLine}>
                  <span className={styles.logTime}>[{log.time}]</span>
                  {log.level === "check" && <span className={styles.logCheck}>[OK]</span>}
                  {log.level === "info" && <span className={styles.logInfo}>[INFO]</span>}
                  {log.level === "warn" && <span className={styles.logWarn}>[WARN]</span>}
                  <span style={{ marginLeft: "0.5rem", color: "var(--text-primary)" }}>{log.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.8rem", color: "var(--text-secondary)" }}>
              <Cpu size={14} className="spin" style={{ animation: "spin 3s linear infinite" }} /> Simulated server diagnostics sync active
            </div>
          </div>

        </div>

        {/* Resolved Incident History Accordion */}
        <div className={styles.incidentsBlock}>
          <h2 className={styles.incidentsTitle}>
            <ShieldAlert size={20} color="var(--accent-primary)" /> Incident History Archive
          </h2>

          <div className={styles.incidentsList}>
            {incidentHistory.map((inc) => {
              const isOpen = openIncident === inc.id;
              return (
                <div key={inc.id} className={styles.accordion}>
                  <div
                    className={styles.accordionHeader}
                    onClick={() => setOpenIncident(isOpen ? null : inc.id)}
                  >
                    <div className={styles.accordionTitleBlock}>
                      <span className={styles.accordionTitle}>{inc.title}</span>
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>({inc.date})</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span className={styles.accordionState}>{inc.status}</span>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </div>

                  {isOpen && (
                    <div className={styles.accordionContent}>
                      <div>
                        <strong>Event Summary:</strong>
                        <p style={{ marginTop: "0.25rem" }}>{inc.description}</p>
                      </div>
                      <div>
                        <strong>Root Cause Identification:</strong>
                        <p style={{ marginTop: "0.25rem" }}>{inc.rootCause}</p>
                      </div>
                      <div>
                        <strong>Action Resolution Applied:</strong>
                        <p style={{ marginTop: "0.25rem" }}>{inc.resolution}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
