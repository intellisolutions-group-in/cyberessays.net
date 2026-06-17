"use client";

import React, { useState, useEffect } from "react";
import styles from "./qa-automation.module.css";
import { Play, Sparkles, Cpu, Check } from "lucide-react";
import Link from "next/link";

interface TestSuite {
  id: number;
  title: string;
  desc: string;
  duration: number; // ms
}

const suites: TestSuite[] = [
  { id: 0, title: "Jest Unit Assertions", desc: "Validates 1,200 code algorithms math correctness.", duration: 1200 },
  { id: 1, title: "Playwright E2E UI checkout Flow", desc: "Simulates multiple checkout loops across virtual browsers.", duration: 1800 },
  { id: 2, title: "k6 Telemetry Peak Load Spikes", desc: "Pushes 10,000 concurrent queries to verify failovers.", duration: 2200 }
];

export default function QaAutomationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);
  const [progress, setProgress] = useState([0, 0, 0]);
  const [status, setStatus] = useState<("pending" | "running" | "passed")[]>([
    "pending",
    "pending",
    "pending"
  ]);
  const [activePhase, setActivePhase] = useState(0);

  const executeTests = () => {
    if (isRunning) return;
    setIsRunning(true);
    setProgress([0, 0, 0]);
    setStatus(["pending", "pending", "pending"]);
    setActiveStep(0);
  };

  useEffect(() => {
    if (!isRunning || activeStep === -1 || activeStep >= suites.length) {
      if (activeStep >= suites.length) {
        setIsRunning(false);
      }
      return;
    }

    const currentSuite = suites[activeStep];
    setStatus((prev) => {
      const next = [...prev];
      next[activeStep] = "running";
      return next;
    });

    let currentProgress = 0;
    const intervalTime = 100;
    const stepsCount = currentSuite.duration / intervalTime;
    const progressIncrement = 100 / stepsCount;

    const timer = setInterval(() => {
      currentProgress += progressIncrement;
      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress((prev) => {
          const next = [...prev];
          next[activeStep] = 100;
          return next;
        });
        setStatus((prev) => {
          const next = [...prev];
          next[activeStep] = "passed";
          return next;
        });
        setActiveStep((prev) => prev + 1);
      } else {
        setProgress((prev) => {
          const next = [...prev];
          next[activeStep] = Math.round(currentProgress);
          return next;
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isRunning, activeStep]);

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>QA Automation & Performance</span>
          <h1 className={styles.title}>Continuous Quality & Load Audits</h1>
          <p className={styles.desc}>
            We deploy automated regression suites executing unit, integration, and E2E checks on every Git pull, coupled with k6 performance loaders validating cluster auto-scaling bounds.
          </p>
        </div>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left: Interactive Test Runner */}
          <div className={styles.testCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Cpu size={18} color="var(--accent-success)" /> Playwright & Jest test runner
              </span>
              <button 
                className={styles.runBtn}
                onClick={executeTests}
                disabled={isRunning}
              >
                <Play size={14} fill="currentColor" /> Execute Test Suites
              </button>
            </div>

            <div className={styles.testGrid}>
              {suites.map((suite) => {
                const stepStatus = status[suite.id];
                const isActive = activeStep === suite.id && isRunning;
                const isPassed = stepStatus === "passed";
                
                return (
                  <div 
                    key={suite.id}
                    className={`${styles.testItem} ${isActive ? styles.testItemActive : ""} ${isPassed ? styles.testItemSuccess : ""}`}
                  >
                    <div className={styles.rowHeader}>
                      <span className={styles.testTitle}>{suite.title}</span>
                      <span className={`${styles.testStatus} ${isActive ? styles.statusActive : ""} ${isPassed ? styles.statusPassed : ""}`}>
                        {isPassed ? "PASSED" : isActive ? `RUNNING (${progress[suite.id]}%)` : "PENDING"}
                      </span>
                    </div>
                    
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{suite.desc}</p>
                    
                    <div className={styles.progressBar}>
                      <div 
                        className={`${styles.progressFill} ${isPassed ? styles.progressFillSuccess : ""}`}
                        style={{ width: `${progress[suite.id]}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Benefits Cards */}
          <div className={styles.sidePanel}>
            <div className={styles.benefitsCard}>
              <div className={styles.cardHeader} style={{ marginBottom: "1.5rem" }}>
                <span className={styles.cardTitle}>
                  <Sparkles size={18} color="var(--accent-success)" /> Key Capabilities
                </span>
              </div>

              <div className={styles.benefitsList}>
                <div className={styles.benefitItem}>
                  <h3 className={styles.benefitTitle}>Zero Regression Releases</h3>
                  <p className={styles.benefitDesc}>
                    Deploy features securely. Our scheduled automated scripts scan front-end button targets and APIs responses prior to launching releases.
                  </p>
                </div>
                <div className={styles.benefitItem}>
                  <h3 className={styles.benefitTitle}>k6 Traffic Flooding Checks</h3>
                  <p className={styles.benefitDesc}>
                    Ensure platform stability under pressure. We flood load balancers with simulated user workloads to identify latency bottlenecks.
                  </p>
                </div>
                <div className={styles.benefitItem}>
                  <h3 className={styles.benefitTitle}>CI/CD Pipeline Audits</h3>
                  <p className={styles.benefitDesc}>
                    Receive immediate feedback. We run code check pipelines on GitHub Actions, logging test diagnostics and coverage targets automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Technical Specs Section */}
      <section className={styles.specsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Specifications</span>
            <h2 className={styles.sectionTitle}>QA Metric Benchmarks</h2>
          </div>
          <div className={styles.gaugesGrid}>
            
            {/* Gauge 1: E2E Coverage */}
            <div className={styles.gaugeCard}>
              <div className={styles.gaugeSvgContainer}>
                <svg className={styles.gaugeSvg}>
                  <circle className={styles.gaugeBgCircle} cx="50" cy="50" r="40" />
                  <circle 
                    className={styles.gaugeValCircle} 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 35) / 100}
                  />
                </svg>
                <div className={styles.gaugeTextVal}>35%</div>
              </div>
              <h4 className={styles.gaugeLabel}>E2E Coverage</h4>
              <p className={styles.gaugeDesc}>Target code coverage across micro-frontends and checkout API handlers.</p>
            </div>

            {/* Gauge 2: Parallel Workers */}
            <div className={styles.gaugeCard}>
              <div className={styles.gaugeSvgContainer}>
                <svg className={styles.gaugeSvg}>
                  <circle className={styles.gaugeBgCircle} cx="50" cy="50" r="40" />
                  <circle 
                    className={styles.gaugeValCircle} 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 80) / 100}
                  />
                </svg>
                <div className={styles.gaugeTextVal}>32</div>
              </div>
              <h4 className={styles.gaugeLabel}>Parallel Streams</h4>
              <p className={styles.gaugeDesc}>Concurrent virtual browser execution limit inside Docker clusters.</p>
            </div>

            {/* Gauge 3: Flakiness Threshold */}
            <div className={styles.gaugeCard}>
              <div className={styles.gaugeSvgContainer}>
                <svg className={styles.gaugeSvg}>
                  <circle className={styles.gaugeBgCircle} cx="50" cy="50" r="40" />
                  <circle 
                    className={styles.gaugeValCircle} 
                    cx="50" 
                    cy="50" 
                    r="40" 
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * 99) / 100}
                  />
                </svg>
                <div className={styles.gaugeTextVal}>0.1%</div>
              </div>
              <h4 className={styles.gaugeLabel}>Flakiness Threshold</h4>
              <p className={styles.gaugeDesc}>Maximum allowable test re-run rate before automatic build block.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className={styles.methodologySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Methodology</span>
            <h2 className={styles.sectionTitle}>Quality Engineering Workflow</h2>
          </div>
          
          <div className={styles.accordionLayout}>
            {/* Left: Tab Selectors */}
            <div className={styles.accordionTabsColumn}>
              {[
                { num: "01", label: "Test Plan & Scenarios" },
                { num: "02", label: "Mock & Sandbox Setup" },
                { num: "03", label: "Parallel Execution" },
                { num: "04", label: "Gatekeeping Checks" }
              ].map((tab, idx) => (
                <button
                  key={idx}
                  className={`${styles.accordionTab} ${activePhase === idx ? styles.accordionTabActive : ""}`}
                  onClick={() => setActivePhase(idx)}
                >
                  <span className={styles.tabNum}>{tab.num}</span>
                  <span className={styles.tabLabel}>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Right: Active Detail Card */}
            <div className={styles.accordionDetailsCard}>
              {activePhase === 0 && (
                <div>
                  <div className={styles.detailsHeader}>
                    <span className={styles.detailsNum}>Phase 01 / Design</span>
                    <h3 className={styles.detailsTitle}>Test Scenarios definition</h3>
                  </div>
                  <div className={styles.checklistGrid}>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Define core user checkout and login pathways across virtual targets.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Document target responsive boundary viewport assertions metrics.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Map database state change validation checks on network boundaries.</span>
                    </div>
                  </div>
                </div>
              )}

              {activePhase === 1 && (
                <div>
                  <div className={styles.detailsHeader}>
                    <span className={styles.detailsNum}>Phase 02 / Sandbox</span>
                    <h3 className={styles.detailsTitle}>Mock data & sandbox seeding</h3>
                  </div>
                  <div className={styles.checklistGrid}>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Seed isolated Postgres containers with test client profiles.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Install mock network routing nodes locally.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Stand up mock caching layers to bypass live CDN API requests.</span>
                    </div>
                  </div>
                </div>
              )}

              {activePhase === 2 && (
                <div>
                  <div className={styles.detailsHeader}>
                    <span className={styles.detailsNum}>Phase 03 / Pipelines</span>
                    <h3 className={styles.detailsTitle}>Parallel execution pipeline</h3>
                  </div>
                  <div className={styles.checklistGrid}>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Distribute execution targets over 32 concurrent headless Chrome streams.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Collect screenshot and trace files records on assert failures.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Log transaction latencies metrics to active Prometheus servers.</span>
                    </div>
                  </div>
                </div>
              )}

              {activePhase === 3 && (
                <div>
                  <div className={styles.detailsHeader}>
                    <span className={styles.detailsNum}>Phase 04 / Quality Gates</span>
                    <h3 className={styles.detailsTitle}>PR Gatekeeper validation</h3>
                  </div>
                  <div className={styles.checklistGrid}>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Block git merge triggers if overall coverage falls below 35%.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Isolate and flag flaky tests with automated quarantine filters.</span>
                    </div>
                    <div className={styles.checklistItem}>
                      <Check className={styles.checkIcon} size={16} />
                      <span>Publish unit coverage summaries to Slack alert channels.</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline} style={{ color: "var(--accent-success)" }}>Success Spotlight</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              Nexus Performance Optimization
            </h2>
            <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
              Refactored system query patterns and integrated Playwright testing layers, optimizing platform load indexes and maintaining optimal routing success rates.
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
