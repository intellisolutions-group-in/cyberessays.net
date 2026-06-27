"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import {
  Brain, Layers, Cloud, Smartphone, ShieldCheck,
  Terminal, Palette, Cpu, ArrowRight, Activity, Zap
} from "lucide-react";
import { motion } from "framer-motion";

interface ServiceItem {
  id: string;
  category: "ai" | "dev" | "cloud" | "security" | "design";
  tag: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  metric: string;
  metricLabel: string;
}

export default function ServicesIndexPage() {
  const [activeTab, setActiveTab] = useState<"all" | "ai" | "dev" | "cloud" | "security" | "design">("all");

  const services: ServiceItem[] = [
    {
      id: "ai-solutions",
      category: "ai",
      tag: "Cognitive Architecture",
      title: "AI Solutions & Neural Agent Systems",
      desc: "Integrate custom fine-tuned LLMs, neural semantic search pipelines, and autonomous learning agents directly into your operational systems.",
      icon: <Brain size={24} />,
      metric: "+35% ROI",
      metricLabel: "Automation productivity gains"
    },
    {
      id: "saas-development",
      category: "dev",
      tag: "Platform Engineering",
      title: "High-Scale Multi-Tenant SaaS Development",
      desc: "Construct lightning-fast SaaS products featuring user account managers, real-time metrics trackers, and secure database partitioning.",
      icon: <Layers size={24} />,
      metric: "<18ms",
      metricLabel: "Transaction response latency"
    },
    {
      id: "cloud-engineering",
      category: "cloud",
      tag: "Cloud Native",
      title: "Cloud-Native Infrastructure & Serverless",
      desc: "Deploy highly available, auto-scaling microservices leveraging serverless orchestration, multi-region database replicates, and automated failover.",
      icon: <Cloud size={24} />,
      metric: "Enterprise",
      metricLabel: "Guaranteed high SLA uptime"
    },
    {
      id: "mobile-apps",
      category: "dev",
      tag: "Mobile Compilation",
      title: "Premium Native & Cross-Platform Mobile",
      desc: "Deliver responsive, animation-rich native applications for iOS and Android built on streamlined offline sync engines.",
      icon: <Smartphone size={24} />,
      metric: "4.9/5",
      metricLabel: "App Store average client rating"
    },
    {
      id: "cybersecurity",
      category: "security",
      tag: "Zero Trust Security",
      title: "Zero-Trust Architecture & Auditing",
      desc: "Protect client assets with automated penetration tests, vulnerability audits, zero-trust edge tunnels, and advanced access controls.",
      icon: <ShieldCheck size={24} />,
      metric: "Hardened",
      metricLabel: "Cryptographic data verification"
    },
    {
      id: "enterprise-software",
      category: "dev",
      tag: "Enterprise Systems",
      title: "Legacy Modernization & Microservices",
      desc: "Transition legacy core monolithic databases into robust, resilient microservice frameworks that support large concurrent request pipelines.",
      icon: <Terminal size={24} />,
      metric: "-35% Overhead",
      metricLabel: "Maintenance cost reduction"
    },
    {
      id: "product-design",
      category: "design",
      tag: "UX/UI Architecture",
      title: "Luxury UX/UI & Comprehensive Design Systems",
      desc: "Design state-of-the-art software systems that feel responsive, look premium, and maintain pixel-perfect design-to-development pipelines.",
      icon: <Palette size={24} />,
      metric: "+38% NPS",
      metricLabel: "User satisfaction increase"
    },
    {
      id: "devops",
      category: "cloud",
      tag: "Automated Deployment",
      title: "Continuous Automated Orchestration (CI/CD)",
      desc: "Establish robust CI/CD pipelines enabling developer teams to deploy features in minutes under strict health metrics monitoring.",
      icon: <Cpu size={24} />,
      metric: "4 Min",
      metricLabel: "Build-to-deployment speed"
    },
    {
      id: "cloud-migrations",
      category: "cloud",
      tag: "Cloud Infrastructure",
      title: "Cloud Migrations & SRE Systems",
      desc: "Deploy serverless pipelines and high-availability database replication layers on AWS and Google Cloud with high SLA targets.",
      icon: <Cloud size={24} />,
      metric: "Zero Downtime",
      metricLabel: "Migrated database pipelines"
    },
    {
      id: "api-design",
      category: "dev",
      tag: "API Connectivity",
      title: "API Design & Enterprise Systems Integrations",
      desc: "Create modern, type-safe API gateways and message broker pipelines decoupling legacy monolith systems.",
      icon: <Layers size={24} />,
      metric: "<10ms",
      metricLabel: "Payload routing delivery"
    },
    {
      id: "qa-automation",
      category: "security",
      tag: "Testing Orchestration",
      title: "QA Automation & Performance Engineering",
      desc: "Deploy automated testing suites executing unit, integration, and E2E checks on every git push.",
      icon: <ShieldCheck size={24} />,
      metric: "0 Regression",
      metricLabel: "Post-deploy production bugs"
    },
    {
      id: "managed-support",
      category: "cloud",
      tag: "Operational Integrity",
      title: "Managed Support & 24/7 Systems Assistance",
      desc: "Provide continuous system audits, dependency updates, and memory profiling checks to guarantee cluster health.",
      icon: <Activity size={24} />,
      metric: "Active",
      metricLabel: "Response SLA for critical incidents"
    },
    {
      id: "data-ai",
      category: "ai",
      tag: "Cognitive Engineering",
      title: "Data & AI Orchestration Networks",
      desc: "Incorporate neural model loaders, vector searches, and autonomous pipeline triggers into client datasets.",
      icon: <Brain size={24} />,
      metric: "+35%",
      metricLabel: "Data processing capacity gains"
    },
    {
      id: "ux-ui-design",
      category: "design",
      tag: "UX/UI Architecture",
      title: "UX/UI & Product Design Systems",
      desc: "Build premium digital layouts leveraging micro-animations, glassmorphic cards, and tailormade visual tokens.",
      icon: <Palette size={24} />,
      metric: "Pixel-Perfect",
      metricLabel: "Figma to code translation"
    }
  ];

  const filteredServices = services.filter(
    (s) => activeTab === "all" || s.category === activeTab
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  } as const;



  return (
    <div className={styles.servicesPage}>
      <div className="container">

        {/* Page Hero Header */}
        <div className={styles.headerBlock}>
          <span className={styles.tagline}>
            <Zap size={14} className={styles.sparkleIcon} />
            Services Portfolio
          </span>
          <h1 className={styles.title}>
            Architecting Strategic <br />
            <span className="gradient-text-purple-cyan">Technical Solutions</span>
          </h1>
          <p className={styles.desc}>
            We design, develop, and orchestrate enterprise software systems, zero-trust cloud pipelines, and AI agent nodes that deliver strategic operational advantage.
          </p>
        </div>



        {/* Bento Grid */}
        <motion.div
          className={styles.bentoGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={activeTab}
        >
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              className={styles.bentoCard}
              variants={itemVariants}
              whileHover={{ y: -6 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                  {service.icon}
                </div>
                <span className={styles.cardTag}>{service.tag}</span>
              </div>

              <h2 className={styles.cardTitle}>{service.title}</h2>
              <p className={styles.cardDesc}>{service.desc}</p>

              <div className={styles.metricBlock}>
                <div className={styles.metricVal}>{service.metric}</div>
                <div className={styles.metricLabel}>{service.metricLabel}</div>
              </div>

              <Link href={`/services/${service.id}`} className={styles.cardLink}>
                Explore Technical Stack
                <ArrowRight size={14} className={styles.arrow} />
              </Link>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
