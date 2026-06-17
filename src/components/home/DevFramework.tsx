"use client";
import React, { useState } from "react";
import styles from "./DevFramework.module.css";
import { CheckCircle2, ChevronRight } from "lucide-react";

interface StepData {
  num: string;
  name: string;
  tag: string;
  title: string;
  description: string;
  deliverable: string;
  mockup: React.ReactNode;
}

export default function DevFramework() {
  const steps: StepData[] = [
    {
      num: "01",
      name: "Discover",
      tag: "PHASE ONE: STAKEHOLDER RESEARCH",
      title: "Objective Mapping & Limitations Survey",
      description: "We conduct exhaustive stakeholder interviews, define technological limitations, mapping out all database requirements and outputting a comprehensive software specification sheet.",
      deliverable: "System Requirement Specification (SRS) & Architecture Map",
      mockup: (
        <div style={{ background: "var(--bg-card)", border: "var(--border-light)", width: "100%", height: "100%", borderRadius: "var(--border-radius-md)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, borderBottom: "var(--border-light)", paddingBottom: "0.5rem" }}>Objective Pipeline Mapping</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
              <ChevronRight size={12} color="var(--accent-primary)" /> Identify system bottlenecks
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
              <ChevronRight size={12} color="var(--accent-primary)" /> Target concurrent requests: 50k/sec
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--text-primary)" }}>
              <ChevronRight size={12} color="var(--accent-primary)" /> Define system boundary constraints
            </div>
          </div>
        </div>
      )
    },
    {
      num: "02",
      name: "Design",
      tag: "PHASE TWO: UI/UX ARCHITECTURE",
      title: "Bespoke Design Systems & High-Fidelity Layouts",
      description: "We craft custom, high-end design languages inspired by elite tech leaders. We build pixel-perfect UI tokens databases, layout guidelines, and components libraries in Figma.",
      deliverable: "Interactive Figma Wireframes & Design Token Library",
      mockup: (
        <div style={{ background: "var(--bg-card)", border: "var(--border-light)", width: "100%", height: "100%", borderRadius: "var(--border-radius-md)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, borderBottom: "var(--border-light)", paddingBottom: "0.35rem" }}>Layout Visual Elements</div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "var(--bg-secondary)", border: "2px dashed var(--accent-primary)" }}></div>
            <div style={{ flex: 1, height: "12px", background: "var(--bg-secondary)", borderRadius: "6px" }}></div>
          </div>
          <div style={{ height: "40px", background: "rgba(124, 58, 237, 0.05)", border: "var(--border-accent)", borderRadius: "var(--border-radius-md)" }}></div>
        </div>
      )
    },
    {
      num: "03",
      name: "Develop",
      tag: "PHASE THREE: ENGINEERING CYCLE",
      title: "Senior Clean-Typed Codebases Production",
      description: "Our senior software developers write clean, modular, and type-checked React, Next.js, and Go microservices. Every commit goes through thorough performance and lint audits.",
      deliverable: "Type-Safe Git Repository & Swagger API Documentation",
      mockup: (
        <div style={{ background: "#1F2937", width: "100%", height: "100%", borderRadius: "var(--border-radius-md)", padding: "1rem", color: "#F9FAFB", fontFamily: "monospace", fontSize: "0.7rem", lineHeight: 1.4, textAlign: "left" }}>
          <div><span style={{ color: "#F3F4F6" }}>const</span> <span style={{ color: "#60A5FA" }}>transformNode</span> = (</div>
          <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#34D399" }}>id: string</span>,</div>
          <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#34D399" }}>metrics: Array&lt;Metric&gt;</span></div>
          <div>): <span style={{ color: "#F472B6" }}>Promise&lt;OrchestrationResult&gt;</span> =&gt; &#123;</div>
          <div style={{ paddingLeft: "1rem", color: "#9CA3AF" }}>{"// Zero-latency edge sync"}</div>
          <div style={{ paddingLeft: "1rem" }}><span style={{ color: "#F3F4F6" }}>return</span> <span style={{ color: "#34D399" }}>edgeRouter</span>.<span style={{ color: "#60A5FA" }}>dispatch</span>(id);</div>
          <div>&#125;;</div>
        </div>
      )
    },
    {
      num: "04",
      name: "Deploy",
      tag: "PHASE FOUR: QA & CD ORCHESTRATION",
      title: "Automated Edge Testing & Launch",
      description: "We deploy client systems to globally distributed cloud endpoints using automated CI/CD pipelines. Every module gets evaluated by linting checkers and latency trackers.",
      deliverable: "Secure Live API Endpoints & Jest/Playwright Test Logs",
      mockup: (
        <div style={{ background: "var(--bg-card)", border: "var(--border-light)", width: "100%", height: "100%", borderRadius: "var(--border-radius-md)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, borderBottom: "var(--border-light)", paddingBottom: "0.5rem" }}>CI/CD Pipeline Checks</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", fontSize: "0.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Unit Testing Suite</span>
              <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>PASSED</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Vulnerability Scan</span>
              <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>0 ISSUES</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span>Build Compilation</span>
              <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>SUCCESS</span>
            </div>
          </div>
        </div>
      )
    },
    {
      num: "05",
      name: "Scale",
      tag: "PHASE FIVE: MONITORING & EXPANSION",
      title: "Continuous Optimization & Infrastructure Reviews",
      description: "We perform periodic infrastructure usage checkups, optimizing memory allocation, diagnosing request response averages, and helping you scale server nodes seamlessly.",
      deliverable: "Grafana Infrastructure Analytics Panels & SLA Logs",
      mockup: (
        <div style={{ background: "var(--bg-card)", border: "var(--border-light)", width: "100%", height: "100%", borderRadius: "var(--border-radius-md)", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, borderBottom: "var(--border-light)", paddingBottom: "0.5rem" }}>System Latency Index</div>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--accent-primary)" }}>0.98</div>
            <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", position: "absolute", bottom: 0 }}>Performance Index</div>
          </div>
        </div>
      )
    }
  ];

  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const activeStep = steps[activeStepIdx];

  // Calculate timeline progress bar width
  const progressPercent = (activeStepIdx / (steps.length - 1)) * 90;

  return (
    <section className={`${styles.section} section-padding`} id="process">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Development Framework</h2>
          <p className={styles.desc}>
            Our transparent, high-precision engineering timeline translates project objectives into production code.
          </p>
        </div>

        {/* Stepper Timeline */}
        <div className={styles.timeline}>
          <div className={styles.timelineBar}>
            <div className={styles.timelineBarFill} style={{ width: `${progressPercent + 5}%` }}></div>
          </div>

          {steps.map((step, idx) => {
            const isActive = activeStepIdx === idx;
            return (
              <div
                key={step.num}
                className={`${styles.stepNode} ${isActive ? styles.activeNode : ""}`}
                onClick={() => setActiveStepIdx(idx)}
              >
                <div className={styles.nodeCircle}>
                  {step.num}
                </div>
                <span className={styles.nodeLabel}>{step.name}</span>
              </div>
            );
          })}
        </div>

        {/* Stepper details */}
        <div className={styles.detailsBlock}>
          
          <div className={styles.detailsContent}>
            <span className={styles.detailsTag}>{activeStep.tag}</span>
            <h3 className={styles.detailsTitle}>{activeStep.title}</h3>
            <p className={styles.detailsDesc}>{activeStep.description}</p>
            
            <div style={{ borderTop: "var(--border-light)", paddingTop: "1.25rem", marginTop: "1rem" }}>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem" }}>
                Key Deliverable
              </div>
              <div className={styles.deliverableRow}>
                <CheckCircle2 size={16} color="var(--accent-success)" />
                <span>{activeStep.deliverable}</span>
              </div>
            </div>
          </div>

          {/* Visual pane displaying mock panels */}
          <div className={styles.visualPane}>
            {activeStep.mockup}
          </div>

        </div>

      </div>
    </section>
  );
}
