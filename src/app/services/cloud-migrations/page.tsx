"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./cloud-migrations.module.css";
import { Server, Play, Cloud, Globe, Activity } from "lucide-react";
import Link from "next/link";

interface VirtualMachine {
  id: string;
  name: string;
  type: "Database" | "Web Ingress" | "Auth service";
  status: "legacy" | "syncing" | "cloud-native";
}

interface SreNode {
  region: string;
  latency: string;
  replicas: number;
  status: "NOMINAL" | "ROUTING" | "STANDBY";
}

export default function CloudMigrationsPage() {
  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationLogs, setMigrationLogs] = useState<string[]>([
    "[init] Standby. Waiting for migration trigger command."
  ]);
  const [activeRegion, setActiveRegion] = useState<"US-East" | "EU-Central" | "AP-South">("US-East");

  // Refs for dynamic SVG line calculation
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const usEastRef = useRef<HTMLButtonElement>(null);
  const euCentralRef = useRef<HTMLButtonElement>(null);
  const apSouthRef = useRef<HTMLButtonElement>(null);
  const [lineCoords, setLineCoords] = useState({ usEast: "", euCentral: "", apSouth: "" });
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [migrationLogs]);

  useEffect(() => {
    const updateLines = () => {
      if (!mapContainerRef.current || !usEastRef.current || !euCentralRef.current || !apSouthRef.current) return;
      const containerRect = mapContainerRef.current.getBoundingClientRect();
      const globeX = containerRect.width / 2;
      const globeY = containerRect.height / 2;
      const getCenter = (el: HTMLButtonElement) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - containerRect.left + r.width / 2,
          y: r.top - containerRect.top + r.height / 2,
        };
      };
      const us = getCenter(usEastRef.current);
      const eu = getCenter(euCentralRef.current);
      const ap = getCenter(apSouthRef.current);
      setLineCoords({
        usEast: `M ${us.x} ${us.y} L ${globeX} ${globeY}`,
        euCentral: `M ${eu.x} ${eu.y} L ${globeX} ${globeY}`,
        apSouth: `M ${ap.x} ${ap.y} L ${globeX} ${globeY}`,
      });
    };
    updateLines();
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, []);
  const [vms, setVms] = useState<VirtualMachine[]>([
    { id: "vm-101", name: "User DB Ledger", type: "Database", status: "legacy" },
    { id: "vm-102", name: "Ingress Router", type: "Web Ingress", status: "legacy" },
    { id: "vm-103", name: "Session Auth Manager", type: "Auth service", status: "legacy" },
    { id: "vm-104", name: "Asset File Sync", type: "Database", status: "legacy" }
  ]);

  const sreNodes: SreNode[] = [
    { region: "us-east-1 (N. Virginia)", latency: "11ms", replicas: 12, status: "ROUTING" },
    { region: "eu-central-1 (Frankfurt)", latency: "18ms", replicas: 8, status: "NOMINAL" },
    { region: "ap-southeast-1 (Singapore)", latency: "24ms", replicas: 6, status: "STANDBY" }
  ];

  const handleStartMigration = () => {
    if (isMigrating) return;
    setIsMigrating(true);
    setMigrationLogs((prev) => ["[migration] Starting migration pipeline targets...", ...prev]);

    // Stage 1: Assessment
    setTimeout(() => {
      setVms((prev) => prev.map((vm, idx) => (idx === 1 ? { ...vm, status: "syncing" } : vm)));
      setMigrationLogs((prev) => [
        `[assess] Scanned legacy VM core capacities. Initiating zero-downtime replication.`,
        ...prev
      ]);
    }, 1000);

    // Stage 2: Syncing
    setTimeout(() => {
      setVms((prev) => prev.map((vm, idx) => (idx === 1 ? { ...vm, status: "cloud-native" } : idx === 0 || idx === 2 ? { ...vm, status: "syncing" } : vm)));
      setMigrationLogs((prev) => [
        `[sync] Copying storage sectors. 480 GB mirror buffer transfer completed successfully.`,
        ...prev
      ]);
    }, 2400);

    // Stage 3: Decoupling
    setTimeout(() => {
      setVms((prev) => prev.map((vm) => (vm.status === "syncing" ? { ...vm, status: "cloud-native" } : vm)));
      setMigrationLogs((prev) => [
        `[k8s] Provisioning Kubernetes pod replicas. Internal networking proxies active.`,
        ...prev
      ]);
    }, 3800);

    // Stage 4: Finish
    setTimeout(() => {
      setVms((prev) => prev.map((vm) => ({ ...vm, status: "cloud-native" })));
      setMigrationLogs((prev) => [
        `[success] Ingress routes active on SRE cloud platform. Legacy servers shut down safely.`,
        ...prev
      ]);
      setIsMigrating(false);
    }, 5000);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>SRE & Cloud Engineering</span>
          <h1 className={styles.title}>Cloud Migrations & Uptime Systems</h1>
          <p className={styles.desc}>
            We coordinate enterprise legacy server refactoring plans into highly resilient, multi-region serverless layouts, guaranteeing transactional safety and high SLA targets.
          </p>
        </div>

        {/* Server Migration Board (Replacing two-column generic layout) */}
        <section className={styles.sandboxCard}>
          <div className={styles.sandboxHeader}>
            <div>
              <span className={styles.sandboxTag}>Virtualization Sandbox</span>
              <h3 className={styles.sandboxTitle}>Legacy VM-to-Pod Migration Board</h3>
            </div>
            <button 
              type="button" 
              onClick={handleStartMigration}
              disabled={isMigrating || vms.every((v) => v.status === "cloud-native")}
              className={styles.startMigrationBtn}
            >
              <Play size={12} fill="currentColor" /> {isMigrating ? "Migrating Infrastructure..." : "Start Migration"}
            </button>
          </div>

          <div className={styles.migrationGrid}>
            {/* Column 1: Legacy VMs */}
            <div className={styles.migrationColumn}>
              <span className={styles.migrationColumnTitle}>Legacy VM Footprint ({vms.filter((v) => v.status === "legacy").length})</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {vms.filter((v) => v.status === "legacy").map((vm) => (
                  <div key={vm.id} className={`${styles.vmCard} ${styles.vmCardLegacy}`}>
                    <div className={styles.vmHeader}>
                      <Server size={14} color="var(--accent-highlight)" /> {vm.name}
                    </div>
                    <span className={styles.vmSub}>{vm.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Active Syncing */}
            <div className={styles.migrationColumn}>
              <span className={styles.migrationColumnTitle}>Data Synchronization ({vms.filter((v) => v.status === "syncing").length})</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {vms.filter((v) => v.status === "syncing").map((vm) => (
                  <div key={vm.id} className={`${styles.vmCard} ${styles.vmCardSyncing}`}>
                    <div className={styles.vmHeader}>
                      <Activity size={14} color="var(--accent-secondary)" className="spin" /> {vm.name}
                    </div>
                    <span className={styles.vmSub}>{vm.type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 3: Cloud Native */}
            <div className={styles.migrationColumn}>
              <span className={styles.migrationColumnTitle}>Cloud Native Target ({vms.filter((v) => v.status === "cloud-native").length})</span>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {vms.filter((v) => v.status === "cloud-native").map((vm) => (
                  <div key={vm.id} className={`${styles.vmCard} ${styles.vmCardCloud}`}>
                    <div className={styles.vmHeader}>
                      <Cloud size={14} color="var(--accent-success)" /> {vm.name}
                    </div>
                    <span className={styles.vmSub}>{vm.type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Console logs */}
          <div className={styles.logStreamContainer}>
            <span className={styles.logStreamTitle}>Ingress log stream</span>
            <div className={styles.logStreamTerminal} ref={terminalRef}>
              {migrationLogs.map((log, index) => (
                <div key={index} style={{ marginBottom: "0.25rem" }}>{log}</div>
              ))}
            </div>
          </div>
        </section>

        {/* Global SRE Failover Nodes Map (Replacing Specs Section) */}
        <section className={styles.failoverGrid}>
          {/* SRE Nodes Map Visual */}
          <div className={styles.failoverPanel}>
            <span className={styles.failoverTag}>Regional failover routing</span>
            <h3 className={styles.failoverTitle}>SRE Multi-Region Serverless Map</h3>

            <div ref={mapContainerRef} className={styles.mapVisualContainer}>
              <Globe className={styles.globeIcon} size={40} />
              
              {/* Map connection links — paths computed from measured button positions */}
              <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <path d={lineCoords.usEast} stroke={activeRegion === "US-East" ? "var(--accent-primary)" : "rgba(255,255,255,0.12)"} strokeWidth={activeRegion === "US-East" ? "2.5" : "1.5"} strokeDasharray={activeRegion === "US-East" ? "0" : "4 4"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} fill="none" />
                <path d={lineCoords.euCentral} stroke={activeRegion === "EU-Central" ? "var(--accent-primary)" : "rgba(255,255,255,0.12)"} strokeWidth={activeRegion === "EU-Central" ? "2.5" : "1.5"} strokeDasharray={activeRegion === "EU-Central" ? "0" : "4 4"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} fill="none" />
                <path d={lineCoords.apSouth} stroke={activeRegion === "AP-South" ? "var(--accent-primary)" : "rgba(255,255,255,0.12)"} strokeWidth={activeRegion === "AP-South" ? "2.5" : "1.5"} strokeDasharray={activeRegion === "AP-South" ? "0" : "4 4"} style={{ transition: "stroke 0.3s, stroke-width 0.3s" }} fill="none" />
              </svg>

              <button ref={usEastRef} type="button" onClick={() => setActiveRegion("US-East")} className={`${styles.regionNodeBtn} ${styles.usEastNode} ${activeRegion === "US-East" ? styles.regionNodeBtnActive : ""}`}>US-East Node</button>
              <button ref={euCentralRef} type="button" onClick={() => setActiveRegion("EU-Central")} className={`${styles.regionNodeBtn} ${styles.euCentralNode} ${activeRegion === "EU-Central" ? styles.regionNodeBtnActive : ""}`}>EU-Central Node</button>
              <button ref={apSouthRef} type="button" onClick={() => setActiveRegion("AP-South")} className={`${styles.regionNodeBtn} ${styles.apSouthNode} ${activeRegion === "AP-South" ? styles.regionNodeBtnActive : ""}`}>AP-South Node</button>
            </div>
          </div>

          {/* Regional Table (Replacing Methodology) */}
          <div className={styles.replicationPanel}>
            <span className={styles.replicationTag}>Continuous Replication</span>
            <h3 className={styles.replicationTitle}>Replicated Node Telemetry</h3>

            <div className={styles.telemetryList}>
              {sreNodes.map((node, index) => (
                <div key={index} className={styles.telemetryRow}>
                  <div>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", display: "block" }}>{node.region}</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Replica Pods: {node.replicas} active</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--accent-secondary)", display: "block", fontFamily: "monospace" }}>{node.latency} delay</span>
                    <span style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: node.status === "ROUTING" ? "var(--accent-primary)" : node.status === "NOMINAL" ? "var(--accent-success)" : "var(--text-secondary)"
                    }}>{node.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Spotlight Case Study */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 className={styles.caseTitle}>
              Apex Health Database Migration
            </h2>
            <p className={styles.caseDesc}>
              Successfully modernized legacy clinical patient datastores for a Tier-1 healthcare network, migrating thousands of records to AWS clusters with zero operational downtime.
            </p>
            <Link href="/case-studies" className={`${styles.caseLink} magnetic-btn btn-primary`}>
              Read Case Study
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
