"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./icedeploy.module.css";
import { Terminal as TerminalIcon, Play, Layers, Check } from "lucide-react";
import Link from "next/link";

interface Step {
  num: string;
  title: string;
  desc: string;
}

interface LogLine {
  id: string;
  time: string;
  type: "info" | "success";
  text: string;
}

export default function IceDeployPage() {
  const [replicas, setReplicas] = useState(4);
  const [region, setRegion] = useState("us-east-1");
  const [isDeploying, setIsDeploying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [logs, setLogs] = useState<LogLine[]>([
    { id: "1", time: "16:40:01", type: "info", text: "agent-init: Awaiting release command triggers..." }
  ]);

  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const steps: Step[] = [
    { num: "01", title: "Git Trigger Ingest", desc: "Verifies repository signature and commit hash metadata." },
    { num: "02", title: "Security Lint Audit", desc: "Runs Snyk static security scans and dependency checks." },
    { num: "03", title: "Container Packaging", desc: "Builds Docker image bundles and pushes to Amazon ECR." },
    { num: "04", title: "Cluster Deployment", desc: "Schedules container instances across active worker rings." },
    { num: "05", title: "Edge Cache Sync", desc: "Purges Cloudflare cache paths globally in 12ms." }
  ];

  const triggerDeploy = () => {
    if (isDeploying) return;
    setIsDeploying(true);
    setProgress(0);
    setActiveStep(0);
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });

    setLogs([
      { id: "init", time: timeStr, type: "info", text: "pipeline: Triggered release sequence for CyberEssays repository." }
    ]);

    // Step 1: Git Trigger
    setTimeout(() => {
      setActiveStep(1);
      setProgress(20);
      setLogs((l) => [
        ...l,
        { id: `step-1-${Date.now()}`, time: timeStr, type: "info", text: "git-verify: Commit hash [sha-9f8d1c2] authorized." },
        { id: `step-1b-${Date.now()}`, time: timeStr, type: "success", text: "git-verify: Signature match successful." }
      ]);
    }, 1000);

    // Step 2: Lint Audit
    setTimeout(() => {
      setActiveStep(2);
      setProgress(40);
      setLogs((l) => [
        ...l,
        { id: `step-2-${Date.now()}`, time: timeStr, type: "info", text: "snyk-audit: Scanning package.json for deprecated paths..." },
        { id: `step-2b-${Date.now()}`, time: timeStr, type: "success", text: "snyk-audit: 0 vulnerabilities flagged. Audits passed." }
      ]);
    }, 2200);

    // Step 3: Container packaging
    setTimeout(() => {
      setActiveStep(3);
      setProgress(60);
      setLogs((l) => [
        ...l,
        { id: `step-3-${Date.now()}`, time: timeStr, type: "info", text: "docker-build: Running compilation: npx next build." },
        { id: `step-3b-${Date.now()}`, time: timeStr, type: "success", text: "docker-build: Pushed image tag [cyberessays-prod:latest] to ECR." }
      ]);
    }, 3800);

    // Step 4: Cluster scheduling
    setTimeout(() => {
      setActiveStep(4);
      setProgress(80);
      setLogs((l) => [
        ...l,
        { id: `step-4-${Date.now()}`, time: timeStr, type: "info", text: `k8s-schedule: Pulling images to region ${region} clusters.` },
        { id: `step-4b-${Date.now()}`, time: timeStr, type: "info", text: `k8s-schedule: Scaling target replica counts from previous to ${replicas} pods.` },
        { id: `step-4c-${Date.now()}`, time: timeStr, type: "success", text: `k8s-schedule: Pod configurations healthy. Internal routes synced.` }
      ]);
    }, 5500);

    // Step 5: CDN Sync & Success
    setTimeout(() => {
      setActiveStep(5);
      setProgress(100);
      setLogs((l) => [
        ...l,
        { id: `step-5-${Date.now()}`, time: timeStr, type: "info", text: "cloudflare-api: Clearing dynamic route edge caches..." },
        { id: `step-5b-${Date.now()}`, time: timeStr, type: "success", text: "pipeline: Build completed successfully in 7.4 seconds. RELEASE ACTIVE." }
      ]);
      setIsDeploying(false);
    }, 7200);
  };

  return (
    <div className={styles.icedeployPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>GitOps Orchestrator</span>
          <h1 className={styles.title}>Automated Multi-Tenant Cluster Scheduling</h1>
          <p className={styles.desc}>
            IceDeploy wraps your code in highly optimized Docker containers, verifies package health, schedules redundant pods in secure private networks, and invalidates caches at global edge nodes.
          </p>
        </div>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left: Pipeline stepper */}
          <div className={styles.controlPanel}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Layers size={18} color="var(--accent-secondary)" /> Release Pipeline Dashboard
              </span>
              <button 
                className={styles.actionBtn}
                onClick={triggerDeploy}
                disabled={isDeploying}
              >
                <Play size={14} fill="currentColor" /> Trigger Release
              </button>
            </div>

            {/* Stepper Timeline */}
            <div className={styles.pipelineTimeline}>
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isSuccess = activeStep > idx;
                return (
                  <div 
                    key={idx}
                    className={`${styles.timelineStep} ${isActive ? styles.stepActive : ""} ${isSuccess ? styles.stepSuccess : ""}`}
                  >
                    <div className={styles.stepNum}>
                      {isSuccess ? <Check size={16} /> : step.num}
                    </div>
                    <div className={styles.stepInfo}>
                      <span className={styles.stepTitle}>{step.title}</span>
                      <span className={styles.stepDesc}>{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressContainer}>
              <div className={styles.progressHeader}>
                <span>DEPLOYMENT VELOCITY</span>
                <span>{progress}%</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${progress}%` }}></div>
              </div>
            </div>

            {/* Scrolling Logs Terminal */}
            <div className={styles.consoleLogs} ref={terminalRef}>
              {logs.map((log) => (
                <div key={log.id} className={styles.logLine}>
                  <span className={styles.logTime}>[{log.time}]</span>{" "}
                  <span className={log.type === "success" ? styles.logSuccess : ""}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: YAML code editor */}
          <div className={styles.editorPanel}>
            <div className={styles.editorCard}>
              <div className={styles.cardHeader}>
                <span className={styles.cardTitle}>
                  <TerminalIcon size={18} color="var(--accent-secondary)" /> Active Deployment Config
                </span>
              </div>

              {/* IDE Editor View */}
              <div className={styles.editorWindow}>
                <div className={styles.editorHeader}>
                  <div className={styles.dots}>
                    <div className={styles.dot} style={{ backgroundColor: "#ff5f56" }}></div>
                    <div className={styles.dot} style={{ backgroundColor: "#ffbd2e" }}></div>
                    <div className={styles.dot} style={{ backgroundColor: "#27c93f" }}></div>
                  </div>
                  <span className={styles.tab}>cyberessays-deployment.yaml</span>
                  <div className={styles.editorHeaderSpacer}></div>
                </div>

                <div className={styles.editorContent}>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>1</span>
                    <span className={styles.codeText}>
                      <span className={styles.keyword}>apiVersion</span>: <span className={styles.value}>apps/v1</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>2</span>
                    <span className={styles.codeText}>
                      <span className={styles.keyword}>kind</span>: <span className={styles.value}>Deployment</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>3</span>
                    <span className={styles.codeText}>
                      <span className={styles.keyword}>metadata</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>4</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.property}>name</span>: <span className={styles.value}>cyberessays-gateway-nodes</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>5</span>
                    <span className={styles.codeText}>
                      <span className={styles.keyword}>spec</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>6</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.property}>replicas</span>: <span className={styles.dynamicReplicas}>{replicas}</span> <span className={styles.comment}># Dynamic slider value</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>7</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.property}>selector</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>8</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>matchLabels</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>9</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>app</span>: <span className={styles.value}>gateway-replica</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>10</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.property}>template</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>11</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>metadata</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>12</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>labels</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>13</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>app</span>: <span className={styles.value}>gateway-replica</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>14</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>spec</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>15</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.property}>containers</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>16</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>- <span className={styles.property}>name</span>: <span className={styles.value}>production-container</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>17</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>  <span className={styles.property}>image</span>: <span className={styles.value}>cyberessays-prod:latest</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>18</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>  <span className={styles.property}>env</span>:
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>19</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>    - <span className={styles.property}>name</span>: <span className={styles.value}>AWS_REGION</span>
                    </span>
                  </div>
                  <div className={styles.editorLine}>
                    <span className={styles.lineNumber}>20</span>
                    <span className={styles.codeText}>
                      <span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span><span className={styles.indent}></span>      <span className={styles.property}>value</span>: <span className={styles.dynamicRegion}>{region}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Replica Controller Slider */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span>Target Replica Pods</span>
                  <span className={styles.controlVal}>{replicas} Pods</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="24" 
                  value={replicas} 
                  onChange={(e) => setReplicas(parseInt(e.target.value))}
                  className={styles.rangeInput}
                  disabled={isDeploying}
                />
              </div>

              {/* Region Selector */}
              <div className={styles.controlGroup}>
                <div className={styles.controlHeader}>
                  <span>Target AWS region</span>
                  <span className={styles.controlVal} style={{ textTransform: "none" }}>{region}</span>
                </div>
                <div className={styles.regionsGrid}>
                  {["us-east-1", "eu-central-1", "ap-northeast-1"].map((reg) => (
                    <button
                      key={reg}
                      onClick={() => setRegion(reg)}
                      disabled={isDeploying}
                      className={`${styles.regionBtn} ${region === reg ? styles.regionBtnActive : ""}`}
                    >
                      {reg}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Embedded spotlight case study */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 className={styles.caseTitle}>
              Global GitOps Release Overhaul
            </h2>
            <p className={styles.caseDesc}>
              Integrated IceDeploy dynamic pod orchestrations across CyberEssays tier-1 application clusters, providing instant rollback speeds and scaling workloads under concurrent query flooding without service drops.
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
