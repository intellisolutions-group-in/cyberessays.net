"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./SolutionsMap.module.css";
import { Brain, Cpu, Cloud, Smartphone, ShieldAlert, Layers, Palette, Terminal, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useInView, animate, MotionValue } from "framer-motion";
import Link from "next/link";

interface NodeData {
  id: string;
  name: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  metricLabel: string;
  stack: string[];
  link: string;
}

interface RadialNodeProps {
  node: NodeData;
  idx: number;
  totalNodes: number;
  activeNodeIdx: number;
  radiusVal: MotionValue<number>;
  angleOffsetVal: MotionValue<number>;
  centerX: number;
  centerY: number;
  setActiveNodeIdx: (idx: number) => void;
  setHoveredNodeIdx: (idx: number | null) => void;
}

function RadialNode({
  node,
  idx,
  totalNodes,
  activeNodeIdx,
  radiusVal,
  angleOffsetVal,
  centerX,
  centerY,
  setActiveNodeIdx,
  setHoveredNodeIdx,
}: RadialNodeProps) {
  const baseAngle = (idx * 2 * Math.PI) / totalNodes - Math.PI / 2;

  // Track position using custom MotionValues
  const x = useTransform([radiusVal, angleOffsetVal], ([r, a]) => {
    return centerX + (r as number) * Math.cos(baseAngle + (a as number));
  });
  
  const y = useTransform([radiusVal, angleOffsetVal], ([r, a]) => {
    return centerY + (r as number) * Math.sin(baseAngle + (a as number));
  });

  const isActive = activeNodeIdx === idx;

  return (
    <motion.div
      className={`${styles.node} ${isActive ? styles.nodeActive : ""}`}
      style={{
        x: useTransform(x, val => `${val - centerX - 36}px`),
        y: useTransform(y, val => `${val - centerY - 36}px`),
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
      animate={{
        scale: isActive ? 1.15 : 1,
      }}
      whileHover={{
        scale: 1.15,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => {
        setActiveNodeIdx(idx);
        setHoveredNodeIdx(idx);
      }}
      onMouseLeave={() => {
        setHoveredNodeIdx(null);
      }}
    >
      {node.icon}
      <span className={styles.nodeLabel}>{node.name}</span>
    </motion.div>
  );
}

interface ConnectorLineProps {
  idx: number;
  totalNodes: number;
  activeNodeIdx: number;
  radiusVal: MotionValue<number>;
  angleOffsetVal: MotionValue<number>;
  hoveredNodeIdx: number | null;
}

function ConnectorLine({
  idx,
  totalNodes,
  activeNodeIdx,
  radiusVal,
  angleOffsetVal,
  hoveredNodeIdx,
}: ConnectorLineProps) {
  const baseAngle = (idx * 2 * Math.PI) / totalNodes - Math.PI / 2;

  // Convert baseAngle + angleOffsetVal (radians) to degrees
  const rotateDeg = useTransform(angleOffsetVal, (a) => {
    return (baseAngle + a) * (180 / Math.PI);
  });

  const isActive = activeNodeIdx === idx;
  const isHovered = hoveredNodeIdx === idx;

  return (
    <motion.div
      className={`${styles.connectorLine} ${isActive ? styles.connectorLineActive : ""}`}
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: radiusVal,
        height: "2px",
        transformOrigin: "left center",
        rotate: rotateDeg,
        y: "-50%",
        x: "0px",
        pointerEvents: "none",
        zIndex: 2,
      }}
      animate={{
        opacity: isHovered ? 1 : 0,
      }}
      transition={{ duration: 0.25 }}
    />
  );
}

export default function SolutionsMap() {
  const nodes: NodeData[] = [
    {
      id: "ai-solutions",
      name: "AI Solutions",
      icon: <Brain size={24} />,
      title: "Enterprise AI & Cognitive Systems",
      description: "Integrate LLMs, neural searches, custom fine-tuned agents, and automated data pipelines directly into your operational workflows.",
      metric: "High Efficiency",
      metricLabel: "Automation productivity focus",
      stack: ["PyTorch", "OpenAI API", "Hugging Face", "LangChain", "Vector DBs"],
      link: "/services/ai-solutions"
    },
    {
      id: "saas-development",
      name: "SaaS Dev",
      icon: <Layers size={24} />,
      title: "High-Scale Multi-Tenant SaaS",
      description: "Build robust, secure, and lightning-fast SaaS products featuring user hierarchies, real-time analytics, and high concurrent scaling.",
      metric: "Low Latency",
      metricLabel: "Transaction response focus",
      stack: ["Next.js", "Node.js", "PostgreSQL", "API Gateway", "Redis"],
      link: "/services/saas-development"
    },
    {
      id: "cloud-engineering",
      name: "Cloud Eng",
      icon: <Cloud size={24} />,
      title: "Cloud-Native Infrastructure & Serverless",
      description: "Deploy scalable, zero-downtime microservices leveraging serverless orchestration, multi-region database replicates, and automated failover.",
      metric: "Enterprise SLA",
      metricLabel: "Architectural high availability uptime",
      stack: ["AWS", "Google Cloud", "Kubernetes", "Terraform", "Serverless"],
      link: "/services/cloud-engineering"
    },
    {
      id: "mobile-apps",
      name: "Mobile Apps",
      icon: <Smartphone size={24} />,
      title: "Premium Native & Cross-Platform Mobile",
      description: "Deliver highly responsive, animation-rich native applications for iOS and Android built on streamlined offline sync engines.",
      metric: "Quality Focus",
      metricLabel: "App release quality standards",
      stack: ["React Native", "Flutter", "Swift", "Kotlin", "GraphQL"],
      link: "/services/mobile-apps"
    },
    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: <ShieldAlert size={24} />,
      title: "Zero-Trust Security Architecture",
      description: "Protect client assets with automated penetration tests, vulnerability audits, zero-trust edge tunnels, and advanced access controls.",
      metric: "Hardened Security",
      metricLabel: "Audit preparation and data integrity focus",
      stack: ["IAM Systems", "OAuth 2.1", "Twingate", "Vault", "Cloudflare WAF"],
      link: "/services/cybersecurity"
    },
    {
      id: "enterprise-software",
      name: "Enterprise",
      icon: <Terminal size={24} />,
      title: "Enterprise Systems Modernization",
      description: "Transition legacy core monolithic databases into robust, resilient microservice frameworks that support large concurrent request pipelines.",
      metric: "Reduced Overhead",
      metricLabel: "Maintenance operations efficiency",
      stack: ["Go", "Java Spring", "Apache Kafka", "Docker", "gRPC"],
      link: "/services/enterprise-software"
    },
    {
      id: "product-design",
      name: "Product Design",
      icon: <Palette size={24} />,
      title: "Luxury UX/UI & Comprehensive Design Systems",
      description: "Design state-of-the-art software systems that feel responsive, look premium, and maintain pixel-perfect design-to-development pipelines.",
      metric: "Improved Satisfaction",
      metricLabel: "End-user satisfaction focus",
      stack: ["Figma", "Stripe Style Guides", "Tailored Animations", "Prototyping"],
      link: "/services/product-design"
    },
    {
      id: "devops",
      name: "DevOps",
      icon: <Cpu size={24} />,
      title: "Continuous Automated Orchestration",
      description: "Establish robust CI/CD pipelines enabling developer teams to deploy features in minutes under strict health metrics monitoring.",
      metric: "Rapid Deploy",
      metricLabel: "Build-to-deployment pipeline focus",
      stack: ["GitHub Actions", "Docker", "Prometheus", "Grafana", "ArgoCD"],
      link: "/services/devops"
    }
  ];

  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(0);
  const activeNode = nodes[activeNodeIdx];
  const [hoveredNodeIdx, setHoveredNodeIdx] = useState<number | null>(null);

  // Animation Refs & Motion values
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.35 });

  const radiusVal = useMotionValue(180);
  const angleOffsetVal = useMotionValue(0);

  const centerX = 250;
  const centerY = 250;

  useEffect(() => {
    if (isInView) {
      // Reset values to initial expanded state
      radiusVal.set(180);
      angleOffsetVal.set(0);

      // Trigger sequence:
      // 1. Spiral in close to center (180px -> 110px) (duration: 0.6s)
      // 2. Take a full rotation around center (0 -> 2*PI) (duration: 1.2s)
      // 3. Step back out to original positions (110px -> 180px) (duration: 0.6s)
      animate(radiusVal, [180, 110, 110, 180], {
        duration: 2.4,
        times: [0, 0.25, 0.75, 1],
        ease: "easeInOut",
      });
      
      animate(angleOffsetVal, [0, 0, Math.PI * 2, Math.PI * 2], {
        duration: 2.4,
        times: [0, 0.25, 0.75, 1],
        ease: "easeInOut",
      });
    }
  }, [isInView, radiusVal, angleOffsetVal]);

  return (
    <section ref={sectionRef} className={`${styles.section} section-padding`} id="solutions">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Solutions Ecosystem</h2>
          <p className={styles.desc}>
            Replace static service grids with our connected solutions architecture. Explore our core pillars of innovation.
          </p>
        </div>

        <div className={styles.mapContainer}>
          
          {/* Radial Graph Visual */}
          <div className={styles.graphWrapper}>
            {nodes.map((node, idx) => (
              <ConnectorLine
                key={idx}
                idx={idx}
                totalNodes={nodes.length}
                activeNodeIdx={activeNodeIdx}
                radiusVal={radiusVal}
                angleOffsetVal={angleOffsetVal}
                hoveredNodeIdx={hoveredNodeIdx}
              />
            ))}

            {/* Central Node */}
            <div className={styles.centerNode}>
              <span className={styles.centerNodeTitle}>Digital</span>
              <span className={styles.centerNodeTitle}>Transformation</span>
              <span className={styles.centerNodeSub}>Platform</span>
            </div>

            {/* Radial Nodes */}
            {nodes.map((node, idx) => (
              <RadialNode
                key={node.id}
                node={node}
                idx={idx}
                totalNodes={nodes.length}
                activeNodeIdx={activeNodeIdx}
                radiusVal={radiusVal}
                angleOffsetVal={angleOffsetVal}
                centerX={centerX}
                centerY={centerY}
                setActiveNodeIdx={setActiveNodeIdx}
                setHoveredNodeIdx={setHoveredNodeIdx}
              />
            ))}
          </div>

          {/* Details Inspection Card */}
          <div className={styles.detailsCard}>
            <div className={styles.detailsHeader}>
              <div className={styles.detailsIcon}>
                {activeNode.icon}
              </div>
              <h3 className={styles.detailsTitle}>{activeNode.title}</h3>
            </div>

            <p className={styles.detailsDesc}>{activeNode.description}</p>

            <div style={{ borderTop: "var(--border-light)", borderBottom: "var(--border-light)", padding: "1.25rem 0", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--accent-primary)" }}>{activeNode.metric}</div>
              <div style={{ fontSize: "0.825rem", color: "var(--text-secondary)", fontWeight: 500 }}>{activeNode.metricLabel}</div>
            </div>

            <div>
              <div style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
                Core Technologies
              </div>
              <div className={styles.stackList}>
                {activeNode.stack.map((tech) => (
                  <span key={tech} className={styles.stackTag}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <Link href={activeNode.link} className="magnetic-btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "auto", fontSize: "0.85rem", padding: "0.625rem 1.25rem" }}>
              Explore Solution Stack
              <ArrowRight size={14} style={{ marginLeft: "0.5rem" }} />
            </Link>
          </div>

        </div>

        {/* Mobile Fallback Grid list (only shown on mobile via CSS) */}
        <div style={{ display: "none" }} className="mobile-only-grid">
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem", marginTop: "2rem" }}>
            {nodes.map((node) => (
              <div key={node.id} className="glass-panel" style={{ padding: "1.5rem", borderRadius: "var(--border-radius-lg)", border: "var(--border-light)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                  <div style={{ color: "var(--accent-primary)" }}>{node.icon}</div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>{node.name}</h3>
                </div>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>{node.description}</p>
                <Link href={node.link} style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--accent-primary)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  Learn more <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Global style override for responsive mobile fallback */}
        <style jsx global>{`
          @media (max-width: 576px) {
            .mobile-only-grid {
              display: block !important;
            }
          }
        `}</style>

      </div>
    </section>
  );
}
