"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./managed-support.module.css";
import { ShieldAlert, Play, Activity, Zap, Clock } from "lucide-react";
import Link from "next/link";

interface Step {
  id: number;
  num: string;
  title: string;
  desc: string;
  angle: number; // degrees for circular placement
}

interface LogLine {
  id: string;
  time: string;
  text: string;
}

export default function ManagedSupportPage() {
  const [isAlerting, setIsAlerting] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "1", time: "17:22:01", text: "sre-oncall: Monitored target cluster metrics. Health status: STABLE (0 issues)." }
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const steps: Step[] = [
    { id: 0, num: "01", title: "Anomaly Detection", desc: "Telemetry alarms identify memory leaks or high locks count.", angle: 0 },
    { id: 1, num: "02", title: "On-Call Paging", desc: "PagerDuty triggers Slack alerts and routes to standby SRE.", angle: 90 },
    { id: 2, num: "03", title: "Traffic Shunting", desc: "Edge router routes HTTP traffic to secondary active zone.", angle: 180 },
    { id: 3, num: "04", title: "SLA Post-Mortem", desc: "Replicas are normalized and patch scripts are deployed.", angle: 270 }
  ];

  const triggerIncident = () => {
    if (isAlerting) return;
    setIsAlerting(true);
    setActiveStep(0);
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });

    setLogs([
      { id: "init", time: timeStr, text: "sre-oncall: CRITICAL - Latency spikes detected on Web Gateway. Triggering failover." }
    ]);

    // Step 0: Detection
    setTimeout(() => {
      setActiveStep(1);
      setLogs((l) => [
        ...l,
        { id: `s0-a-${Date.now()}`, time: timeStr, text: "prometheus: Triggered alert container-memory-leak-alert inside cluster-3." }
      ]);
    }, 1200);

    // Step 1: Paging
    setTimeout(() => {
      setActiveStep(2);
      setLogs((l) => [
        ...l,
        { id: `s1-a-${Date.now()}`, time: timeStr, text: "pagerduty: Paging standby SRE. Slack channel #incident-591 online." },
        { id: `s1-b-${Date.now()}`, time: timeStr, text: "sre-oncall: Engineer ACK received. Commencing debug shell." }
      ]);
    }, 2600);

    // Step 2: Shunting
    setTimeout(() => {
      setActiveStep(3);
      setLogs((l) => [
        ...l,
        { id: `s2-a-${Date.now()}`, time: timeStr, text: "k8s-ingress: Commencing traffic shunt away from node-12." },
        { id: `s2-b-${Date.now()}`, time: timeStr, text: "failover: 100% traffic shunted to region backup. Primary node rebooting." }
      ]);
    }, 4000);

    // Step 3: Success
    setTimeout(() => {
      setActiveStep(-1);
      setLogs((l) => [
        ...l,
        { id: `s3-a-${Date.now()}`, time: timeStr, text: "gateway: SLA nominal (<12ms). Cluster stabilization complete." }
      ]);
      setIsAlerting(false);
    }, 5400);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Managed Support & SRE</span>
          <h1 className={styles.title}>24/7 Enterprise SRE & Incident Control</h1>
          <p className={styles.desc}>
            High-availability support engineered for continuous telemetry coverage. We build automated failover switches and incident shunts to guard your application uptime.
          </p>
        </div>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left: Incident Responder Cockpit */}
          <div className={styles.cockpitCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Activity size={18} className="text-coral" style={{ color: "var(--accent-highlight)" }} /> Uptime Control Simulator
              </span>
              <button 
                className={styles.triggerBtn}
                onClick={triggerIncident}
                disabled={isAlerting}
              >
                <Play size={14} fill="currentColor" /> Trigger Incident Simulation
              </button>
            </div>

            {/* Banner */}
            <div className={`${styles.statusBanner} ${isAlerting ? styles.statusBannerAlert : ""}`}>
              <div className={styles.bannerMeta}>
                <div className={`${styles.beacon} ${isAlerting ? styles.beaconAlert : styles.beaconStable}`} />
                <span className={styles.statusText}>
                  System State: {isAlerting ? "CRITICAL INCIDENT ACTIVE" : "STABLE NOMINAL"}
                </span>
              </div>
              <ShieldAlert size={18} style={{ color: isAlerting ? "var(--accent-highlight)" : "var(--accent-success)" }} />
            </div>

            {/* Terminal Logs */}
            <div className={styles.terminal} ref={terminalRef}>
              {logs.map((log) => (
                <div key={log.id} className={styles.logLine}>
                  <span className={styles.logTime}>[{log.time}]</span> {log.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Operations Overview */}
          <div className={styles.introDetails}>
            <div className={styles.featurePillGrid}>
              <div className={styles.detailPill}>
                <Clock className={styles.pillIcon} />
                <div>
                  <h4>Escalation Response</h4>
                  <p>Guaranteed pager alerts and emergency Slack bridge activation with prompt activation.</p>
                </div>
              </div>
              <div className={styles.detailPill}>
                <Zap className={styles.pillIcon} />
                <div>
                  <h4>Self-Healing Failovers</h4>
                  <p>Automated cloud scripts that shut down leaking container clusters and spin up clean nodes.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* NEW: SLA Tiers Matrix (Technical Specs replacement) */}
      <section className={styles.matrixSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technical Specs</span>
            <h2 className={styles.sectionTitle}>Support Service Level Matrix</h2>
            <p className={styles.sectionDesc}>Compare our multi-channel SRE coverage options and guaranteed mitigation windows.</p>
          </div>

          <div className={styles.matrixContainer}>
            <table className={styles.matrixTable}>
              <thead>
                <tr>
                  <th className={styles.metricColumn}>Service Metric</th>
                  <th className={styles.tierHeader}>
                    <div className={styles.tierTitle}>Starter</div>
                    <div className={styles.tierSub}>Standard Support</div>
                  </th>
                  <th className={`${styles.tierHeader} ${styles.tierHeaderActive}`}>
                    <div className={styles.tierTitle}>Professional SRE</div>
                    <div className={styles.tierSub}>Advanced Support</div>
                  </th>
                  <th className={styles.tierHeader}>
                    <div className={styles.tierTitle}>Mission Critical</div>
                    <div className={styles.tierSub}>Custom Agreement</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.metricName}>Critical Incident SLA</td>
                  <td>Standard Response</td>
                  <td className={styles.activeCell}>Priority Support</td>
                  <td>Enterprise Escalation</td>
                </tr>
                <tr>
                  <td className={styles.metricName}>Coverage Window</td>
                  <td>9x5 Support Desk</td>
                  <td className={styles.activeCell}>24/7/365 Rotations</td>
                  <td>24/7 Follow-the-Sun</td>
                </tr>
                <tr>
                  <td className={styles.metricName}>Communication Mode</td>
                  <td>Email & Tickets</td>
                  <td className={styles.activeCell}>Slack Connect Channel</td>
                  <td>Direct Dedicated Video Bridge</td>
                </tr>
                <tr>
                  <td className={styles.metricName}>Uptime SLA</td>
                  <td>Standard SLA</td>
                  <td className={styles.activeCell}>Advanced SLA</td>
                  <td>Mission Critical SLA</td>
                </tr>
                <tr>
                  <td className={styles.metricName}>Telemetry Linkage</td>
                  <td>Status Page Integration</td>
                  <td className={styles.activeCell}>Prometheus/Grafana Read</td>
                  <td>Active Datadog Agent Write</td>
                </tr>
                <tr>
                  <td className={styles.metricName}>Mitigation Strategy</td>
                  <td>Manual Redeployment</td>
                  <td className={styles.activeCell}>Semi-Automated Shunts</td>
                  <td>Automated Multi-Zone Failovers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* NEW: Circular Operations Hub Diagram (Methodology replacement) */}
      <section className={styles.hubSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Methodology</span>
            <h2 className={styles.sectionTitle}>Circular Operations Hub</h2>
            <p className={styles.sectionDesc}>Our follow-the-sun rotation cycles through four critical nodes during incident loops.</p>
          </div>

          <div className={styles.hubFlexContainer}>
            {/* The circular graph panel */}
            <div className={styles.circularVisualContainer}>
              <div className={`${styles.centralBeaconNode} ${isAlerting ? styles.centralBeaconAlerting : ""}`}>
                <Activity size={32} />
                <span className={styles.beaconStatusText}>
                  {isAlerting ? "INCIDENT RUNNING" : "MONITORING ACTIVE"}
                </span>
              </div>

              {/* Steps in circular layout */}
              <div className={styles.outerStepsRing}>
                {steps.map((step) => {
                  const isActive = activeStep === step.id;
                  const isCompleted = activeStep > step.id || activeStep === -1;
                  return (
                    <div 
                      key={step.id}
                      className={`${styles.ringNode} ${styles[`ringNode${step.id}`]} ${isActive ? styles.ringNodeActive : ""} ${isAlerting && isCompleted ? styles.ringNodeDone : ""}`}
                    >
                      <div className={styles.ringNodeBadge}>{step.num}</div>
                      <div className={styles.ringNodeContent}>
                        <h5>{step.title}</h5>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connecting circular svg lines */}
              <svg className={styles.ringSvgConnector} viewBox="0 0 400 400">
                <circle cx="200" cy="200" r="140" className={styles.backgroundRingLine} />
                {isAlerting && (
                  <circle 
                    cx="200" 
                    cy="200" 
                    r="140" 
                    className={styles.activePulseRingLine}
                    style={{ strokeDashoffset: 880 - (220 * (activeStep + 1)) }}
                  />
                )}
              </svg>
            </div>

            {/* Side descriptive details */}
            <div className={styles.hubDetailsPanel}>
              {steps.map((step) => {
                const isActive = activeStep === step.id;
                return (
                  <div 
                    key={step.id} 
                    className={`${styles.hubDetailCard} ${isActive ? styles.hubDetailCardActive : ""}`}
                  >
                    <span className={styles.hubDetailNum}>{step.num}</span>
                    <div>
                      <h4 className={styles.hubDetailTitle}>{step.title}</h4>
                      <p className={styles.hubDetailDesc}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 className={styles.caseTitle}>
              Nexus Infrastructure Maintenance
            </h2>
            <p className={styles.caseDesc}>
              Established multi-region disaster recovery failovers, securing stable operations and restoring normal server SLAs under request traffic floods.
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

