"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { 
  ArrowRight, ShieldCheck, CreditCard, Activity, 
  Sparkles, CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

interface StudyItem {
  id: string;
  client: string;
  category: "healthcare" | "saas" | "fintech" | "education" | "retail" | "manufacturing";
  title: string;
  description: string;
  metrics: { val: string; label: string }[];
  stack: string[];
  visual: React.ReactNode;
}

export default function CaseStudiesIndexPage() {
  const [activeFilter, setActiveFilter] = useState<"all" | "healthcare" | "saas" | "fintech" | "education" | "retail" | "manufacturing">("all");

  const studies: StudyItem[] = [
    {
      id: "apex-health",
      client: "Healthcare Sector",
      category: "healthcare",
      title: "Unified Clinical Data Platform",
      description: "We consolidated fragmented electronic health records across regional hospitals into a secure zero-trust cloud data pipeline, optimizing query speeds and ensuring patient data safety.",
      metrics: [
        { val: "Enterprise", label: "System Uptime" },
        { val: "Encrypted", label: "Data State" },
        { val: "Secure", label: "Patient Records Protected" }
      ],
      stack: ["AWS VPC Tunnels", "Zero-Trust Shield", "Clinical Ledger DB", "IAM Systems"],
      visual: (
        <div className={styles.visual}>
          <div className={styles.visualHeader}>
            <span className={styles.visualTitle}>
              <ShieldCheck size={14} className={styles.successIcon} /> SECURE LEDGER ACTIVE
            </span>
            <span className={styles.visualSub}>12/12 Nodes Synced</span>
          </div>
          <div className={styles.visualBody}>
            <div className={styles.visualCard}>
              <div className={styles.visualCardLabel}>Patient Query Latency</div>
              <div className={styles.visualCardVal}>110ms <span className={styles.successText}>-32%</span></div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualCardLabel}>Active Health Pipelines</div>
              <div className={styles.visualCardVal}>24 Active</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "nexus-saas",
      client: "FinTech Sector",
      category: "saas",
      title: "Sub-Second Global Payment Routing Engine",
      description: "We engineered a low-latency transactions routing engine leveraging multi-region edge nodes, automating localized tax rules calculations and minimizing cart checkouts drop-off rates.",
      metrics: [
        { val: "Improved", label: "Conversion Rate" },
        { val: "Low", label: "Transaction Speed" },
        { val: "High Volume", label: "Annual Volume Routing" }
      ],
      stack: ["Next.js Edge", "Go Microservices", "PostgreSQL Sharding", "API Gateway"],
      visual: (
        <div className={styles.visual}>
          <div className={styles.visualHeader}>
            <span className={styles.visualTitle}>
              <CreditCard size={14} className={styles.primaryIcon} /> TRANSACTION METRICS
            </span>
            <span className={styles.successText}>+12.4% TODAY</span>
          </div>
          <div className={styles.visualBodySplit}>
            <div className={styles.visualMini}>
              <div className={styles.visualCardLabel}>Success Rate</div>
              <div className={styles.visualCardVal}>Nominal</div>
            </div>
            <div className={styles.visualMini}>
              <div className={styles.visualCardLabel}>Failure Rate</div>
              <div className={styles.visualCardVal} style={{ color: "var(--accent-highlight)" }}>0.02%</div>
            </div>
          </div>
          <div className={styles.nodeLogs}>
            <div className={styles.nodeLogRow}><span>London Node</span><span className={styles.successText}>12ms</span></div>
            <div className={styles.nodeLogRow}><span>Tokyo Node</span><span className={styles.successText}>22ms</span></div>
          </div>
        </div>
      )
    },
    {
      id: "smart-factory",
      client: "Industrial IoT Grid",
      category: "manufacturing",
      title: "Smart Factory Diagnostics Telemetry Grid",
      description: "Built a high-throughput IoT diagnostics log portal for a manufacturing plant, reading telemetry from factory line nodes and dropping conveyor breakdowns via predictive telemetry.",
      metrics: [
        { val: "Enterprise", label: "Sensor Signal SLA" },
        { val: "High Volume", label: "Telemetry Points" },
        { val: "Reduced", label: "Maintenance Cost Overhead" }
      ],
      stack: ["Apache Kafka", "Kubernetes", "Prometheus", "Grafana", "Go Ingest"],
      visual: (
        <div className={styles.visual}>
          <div className={styles.visualHeader}>
            <span className={styles.visualTitle}>
              <Activity size={14} className={styles.highlightIcon} /> SENSOR INGEST STREAM
            </span>
            <span className={styles.visualSub}>Active Monitoring</span>
          </div>
          <div className={styles.visualBody}>
            <div className={styles.visualCard}>
              <div className={styles.visualCardLabel}>Signal Inflow Volume</div>
              <div className={styles.visualCardVal}>25k pts/sec</div>
            </div>
            <div className={styles.progressBarWrapper}>
              <div className={styles.progressBarLabel}>Conveyor Grid Load</div>
              <div className={styles.progressBar}>
                <div className={styles.progressBarFill} style={{ width: "38%" }}></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "class-hub",
      client: "Education Sector",
      category: "education",
      title: "Synchronous University Learning Workspaces",
      description: "Optimized real-time drawing board sync scripts and WebSocket event delivery pipelines for a school network, delivering lag-free learning for active students.",
      metrics: [
        { val: "Scalable", label: "Monthly Synchronous Learners" },
        { val: "Low", label: "Interactive Canvas Latency" },
        { val: "Improved", label: "User Satisfaction" }
      ],
      stack: ["WebSockets", "CRDT Algorithms", "Redis Cache", "Node.js cluster"],
      visual: (
        <div className={styles.visual}>
          <div className={styles.visualHeader}>
            <span className={styles.visualTitle}>
              <CheckCircle2 size={14} className={styles.successIcon} /> COLLABORATION ENGINE
            </span>
            <span className={styles.visualSub}>Lag-Free Sync</span>
          </div>
          <div className={styles.visualBody}>
            <div className={styles.visualCard}>
              <div className={styles.visualCardLabel}>Active Socket Channels</div>
              <div className={styles.visualCardVal}>4,120</div>
            </div>
            <div className={styles.visualCard}>
              <div className={styles.visualCardLabel}>Canvas Delay Offset</div>
              <div className={styles.visualCardVal}>88ms</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const filteredStudies = studies.filter(
    (s) => activeFilter === "all" || s.category === activeFilter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 90, damping: 16 }
    }
  } as const;

  const filterOptions = [
    { id: "all", label: "All Cases" },
    { id: "healthcare", label: "Healthcare" },
    { id: "saas", label: "SaaS Platforms" },
    { id: "fintech", label: "FinTech" },
    { id: "education", label: "EdTech" },
    { id: "manufacturing", label: "Industrial IoT" }
  ] as const;

  return (
    <div className={styles.casePage}>
      <div className="container">
        
        {/* Page Header */}
        <div className={styles.headerBlock}>
          <span className={styles.tagline}>
            <Sparkles size={14} className={styles.sparkleIcon} />
            Case Studies
          </span>
          <h1 className={styles.title}>
            Realized Business <br />
            <span className="gradient-text-coral-purple">Outcomes & Outcomes</span>
          </h1>
          <p className={styles.desc}>
            We engineer high-durability digital platforms that deliver substantial metrics results. Explore our portfolio of enterprise case studies.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className={styles.filterBar}>
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              className={`${styles.filterBtn} ${activeFilter === opt.id ? styles.activeFilterBtn : ""}`}
              onClick={() => setActiveFilter(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid list */}
        <motion.div 
          className={styles.studiesList}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeFilter}
        >
          {filteredStudies.map((study) => (
            <motion.div
              key={study.id}
              className={styles.storyCard}
              variants={itemVariants}
            >
              {/* Visual Data Column */}
              <div className={styles.visualWrapper}>
                {study.visual}
              </div>

              {/* Story Description Column */}
              <div className={styles.storyContent}>
                <div className={styles.clientTag}>
                  <Sparkles size={12} style={{ marginRight: "0.25rem", verticalAlign: "middle" }} />
                  {study.client}
                </div>
                
                <h3 className={styles.storyTitle}>{study.title}</h3>
                <p className={styles.storyDesc}>{study.description}</p>
                
                <div className={styles.metricsGrid}>
                  {study.metrics.map((metric, idx) => (
                    <div key={idx} className={styles.metricItem}>
                      <div className={styles.metricVal}>{metric.val}</div>
                      <div className={styles.metricLabel}>{metric.label}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.techStackWrap}>
                  <span className={styles.stackLabel}>Architecture Stack:</span>
                  <div className={styles.stackList}>
                    {study.stack.map((tech) => (
                      <span key={tech} className={styles.stackTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href={study.category === "saas" ? `/services/saas-development` : `/services/ai-solutions`}
                  className="magnetic-btn btn-primary"
                  style={{ alignSelf: "flex-start", marginTop: "1.5rem", fontSize: "0.85rem", padding: "0.625rem 1.25rem" }}
                >
                  Explore Solution Stack
                  <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
