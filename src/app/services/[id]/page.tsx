"use client";
import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import styles from "@/components/services.module.css";
import { 
  ChevronDown, ChevronUp, CheckCircle, Brain, Layers, Cloud, Smartphone, 
  ShieldAlert, Terminal, Palette, Cpu, Link as LinkIcon, Settings, Lock, 
  Database, Wifi, WifiOff
} from "lucide-react";

interface Benefit {
  title: string;
  desc: string;
}

interface Faq {
  q: string;
  a: string;
}

interface ServiceData {
  id: string;
  tag: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  benefits: Benefit[];
  technologies: string[];
  faqs: Faq[];
}

interface PipelineStep {
  title: string;
  desc: string;
  techs: string[];
}

const servicesData: Record<string, ServiceData> = {
  "ai-solutions": {
    id: "ai-solutions",
    tag: "COGNITIVE ARCHITECTURE",
    title: "AI Solutions & Neural Agent Systems",
    description: "Integrate custom fine-tuned Large Language Models, semantic search pipelines, and automated learning agents directly into your operational systems.",
    icon: <Brain size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Automated Workflows", desc: "Integrate LLM reasoning steps into data pipelines, speeding up analytical tasks." },
      { title: "Semantic Retrieval", desc: "Build advanced vector databases that search structural files semantically under 20ms." },
      { title: "Cognitive Security", desc: "Train local classifiers to detect operational anomalies or threat signals instantly." }
    ],
    technologies: ["PyTorch", "Hugging Face", "Pinecone", "LangChain", "OpenAI API", "LlamaIndex"],
    faqs: [
      { q: "How do you protect client training data?", a: "We run models locally or within secure VPC boundaries. Your proprietary data is never used for external public API updates." },
      { q: "What LLMs do you work with?", a: "We support both open-source models (Llama, Mistral) and commercial models (GPT-4o, Claude 3.5 Sonnet) depending on payload costs." }
    ]
  },
  "saas-development": {
    id: "saas-development",
    tag: "PLATFORM ENGINEERING",
    title: "High-Scale Multi-Tenant SaaS Development",
    description: "Construct lightning-fast SaaS products featuring user account managers, real-time metrics trackers, and secure database partitioning.",
    icon: <Layers size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Multi-Tenant Security", desc: "Isolate client databases via schema partitions or dedicated cluster routing structures." },
      { title: "Metered Usage Monitoring", desc: "Integrate telemetry logging rails supporting real-time usage metrics collection." },
      { title: "Sub-Second Latency", desc: "Optimize bundle sizes and database query routes to maintain instant page paint times." }
    ],
    technologies: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Redis", "API Gateway"],
    faqs: [
      { q: "Do you build headless SaaS setups?", a: "Yes, we typically decouple frontend render loops (Next.js Edge) from backend data processors (Go/Node) for maximum robustness." },
      { q: "How do you handle high concurrent webhook scaling?", a: "We integrate custom webhook queues that handle high concurrent payload events safely without dropping events." }
    ]
  },
  "cloud-engineering": {
    id: "cloud-engineering",
    tag: "CLOUD NATIVE",
    title: "Cloud-Native Infrastructure & Serverless",
    description: "Deploy highly available, auto-scaling microservices leveraging serverless orchestration, multi-region database replicates, and automated failover.",
    icon: <Cloud size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Infrastructure as Code", desc: "Orchestrate all servers, networks, and databases using declarative Terraform scripts." },
      { title: "Global CDN Edge", desc: "Route static payloads and serverless triggers through distributed CDN networks." },
      { title: "Dynamic Load Scaling", desc: "Scale cluster nodes up or down automatically in response to request triggers." }
    ],
    technologies: ["AWS", "Google Cloud", "Kubernetes", "Terraform", "Serverless Framework", "Docker"],
    faqs: [
      { q: "What is your default cloud provider?", a: "We primarily work with AWS and Google Cloud, building infrastructure via Terraform to make it provider-agnostic." },
      { q: "Do you support multi-cloud failovers?", a: "Yes, we can coordinate multi-region replicates and cross-provider routes using Cloudflare DNS setups." }
    ]
  },
  "mobile-apps": {
    id: "mobile-apps",
    tag: "MOBILE COMPILATION",
    title: "Premium Native & Cross-Platform Mobile",
    description: "Deliver responsive, animation-rich native applications for iOS and Android built on streamlined offline sync engines.",
    icon: <Smartphone size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Offline-First Sync", desc: "Sync operational actions locally first, pushing data to servers once connectivity is active." },
      { title: "Bespoke Mobile UX", desc: "Integrate high-frequency rendering interactions that feel smooth and premium." },
      { title: "Cross-Platform Reusability", desc: "Maximize code sharing across devices while keeping core native integrations fast." }
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "GraphQL", "Realm DB"],
    faqs: [
      { q: "Do you support publishing to stores?", a: "Yes, we handle the entire App Store and Google Play console setup, review, and publication steps." },
      { q: "How do you manage offline data sync?", a: "We integrate lightweight databases (SQLite/Realm) that merge local updates with server timestamps seamlessly." }
    ]
  },
  "cybersecurity": {
    id: "cybersecurity",
    tag: "ZERO TRUST SECURITY",
    title: "Zero-Trust Architecture & Auditing",
    description: "Protect client assets with automated penetration tests, vulnerability audits, zero-trust edge tunnels, and advanced access controls.",
    icon: <ShieldAlert size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Zero-Trust Tunnels", desc: "Secure operational endpoints behind active zero-trust tunnels, bypassing public IPs." },
      { title: "Auditing Readiness", desc: "Audit user logins, audit logs, and encryption states to align with internal security policies." },
      { title: "Active Pentesting", desc: "Run scheduled automated exploits on staging targets to discover potential holes." }
    ],
    technologies: ["IAM Systems", "OAuth 2.1", "HashiCorp Vault", "Cloudflare WAF", "Twingate", "Snyk"],
    faqs: [
      { q: "How do you prepare startups for security audits?", a: "We setup automated security tracing engines and build secure log storage pools." },
      { q: "Do you perform manual code audits?", a: "Yes, we audit critical logic pools (payment routes, user auth) line-by-line before staging deployment." }
    ]
  },
  "enterprise-software": {
    id: "enterprise-software",
    tag: "ENTERPRISE SYSTEMS",
    title: "Legacy Modernization & Microservices",
    description: "Transition legacy core monolithic databases into robust, resilient microservice frameworks that support large concurrent request pipelines.",
    icon: <Terminal size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Monolith Migration", desc: "Refactor legacy platforms systematically using the strangler fig pattern." },
      { title: "Event-Driven Queues", desc: "Integrate Apache Kafka or RabbitMQ logs to decouple process targets." },
      { title: "Robust Error Retries", desc: "Build automated backoff request routers to avoid cascading cluster crashes." }
    ],
    technologies: ["Go", "Java Spring", "Apache Kafka", "gRPC", "Docker", "RabbitMQ"],
    faqs: [
      { q: "What is your legacy refactoring process?", a: "We isolate legacy modules into small microservices step-by-step, validating traffic routes via shadow pipelines." },
      { q: "Do you integrate with legacy mainframe databases?", a: "Yes, we build secure connector APIs to query traditional DBs (DB2, Oracle) without lockouts." }
    ]
  },
  "product-design": {
    id: "product-design",
    tag: "UX/UI ARCHITECTURE",
    title: "Luxury UX/UI & Comprehensive Design Systems",
    description: "Design state-of-the-art software systems that feel responsive, look premium, and maintain pixel-perfect design-to-development pipelines.",
    icon: <Palette size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Bespoke Visual Systems", desc: "Design luxurious layouts featuring smooth animations, soft shadows, and clean margins." },
      { title: "Component Libraries", desc: "Build comprehensive Figma libraries mapped directly to code token structures." },
      { title: "Usability Testing", desc: "Trace user clicking heatmaps on mock portals to refine menu positioning." }
    ],
    technologies: ["Figma", "Stripe Style Guides", "Tailored Animations", "User Testing Tools"],
    faqs: [
      { q: "How do design tokens map to development?", a: "We configure JSON token bases that compile colors, fonts, and borders directly into CSS modules variables." },
      { q: "Do you design custom infographics?", a: "Yes, we build clean, premium vector diagrams representing operational loops for each service." }
    ]
  },
  "devops": {
    id: "devops",
    tag: "AUTOMATED DEPLOYMENT",
    title: "Continuous Automated Orchestration (CI/CD)",
    description: "Establish robust CI/CD pipelines enabling developer teams to deploy features in minutes under strict health metrics monitoring.",
    icon: <Cpu size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Fast Deploy Cycles", desc: "Reduce staging pipelines from hours to minutes using pre-cached runner layers." },
      { title: "Performance Telemetry", desc: "Monitor system memory allocation and request peaks via Prometheus logs." },
      { title: "GitOps Declarations", desc: "Maintain cluster states inside Git, deploying edits automatically via ArgoCD." }
    ],
    technologies: ["GitHub Actions", "Prometheus", "Grafana", "ArgoCD", "Kubernetes", "Sentry"],
    faqs: [
      { q: "How do you monitor production errors?", a: "We run Sentry and Grafana alerts that ping Slack if latency spikes exceed 500ms or failure rates hit 1%." },
      { q: "Do you build custom actions?", a: "Yes, we construct custom build runners tailored to skip static file compilations if changes are code-only." }
    ]
  },
  "cloud-migrations": {
    id: "cloud-migrations",
    tag: "CLOUD INFRASTRUCTURE",
    title: "Cloud Migrations & SRE Systems",
    description: "Deploy serverless pipelines and high-availability database replication layers on AWS and Google Cloud with high SLA targets.",
    icon: <Cloud size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Serverless Deployment", desc: "Scale cluster nodes up or down automatically in response to request triggers." },
      { title: "Decoupled Pipelines", desc: "Maintain microservice reliability using distributed message queues." },
      { title: "Load Balancing", desc: "Route static payloads and serverless triggers through distributed CDN networks." }
    ],
    technologies: ["AWS", "Google Cloud", "Kubernetes", "Terraform", "Docker", "SRE Tools"],
    faqs: [
      { q: "What is your default cloud provider?", a: "We primarily work with AWS and Google Cloud, building infrastructure via Terraform to make it provider-agnostic." },
      { q: "Do you support multi-cloud failovers?", a: "Yes, we can coordinate multi-region replicates and cross-provider routes using Cloudflare DNS setups." }
    ]
  },
  "api-design": {
    id: "api-design",
    tag: "API CONNECTIVITY",
    title: "API Design & Enterprise Systems Integrations",
    description: "Create modern, type-safe API gateways and message broker pipelines decoupling legacy monolith systems.",
    icon: <LinkIcon size={56} color="var(--accent-primary)" />,
    benefits: [
      { title: "Type-Safe Routing", desc: "Configure JSON token bases that compile colors, fonts, and borders directly into API variables." },
      { title: "Low Latency Data", desc: "Optimize bundle sizes and database query routes to maintain instant page paint times." },
      { title: "Microservices Sync", desc: "Transition legacy core monolithic databases into robust, resilient microservice frameworks." }
    ],
    technologies: ["Go", "Node.js", "GraphQL", "gRPC", "RabbitMQ", "FastAPI"],
    faqs: [
      { q: "How do you handle high concurrent webhook scaling?", a: "We integrate custom webhook queues that handle high concurrent payload events safely without dropping events." },
      { q: "Do you design custom infographics?", a: "Yes, we build clean, premium vector diagrams representing operational loops for each service." }
    ]
  }
};

const servicePipelines: Record<string, PipelineStep[]> = {
  "ai-solutions": [
    { title: "User Prompt Ingest", desc: "Prompt requests analyzed by gateway filter edge middleware.", techs: ["OpenAI API", "LangChain"] },
    { title: "Semantic Retrieval", desc: "Queries vector DB for contextual coordinate logs.", techs: ["Pinecone", "LlamaIndex"] },
    { title: "Context Assembly", desc: "Builds prompt structures dynamically within local memory buffers.", techs: ["LangChain", "Hugging Face"] },
    { title: "Model Inference", desc: "Runs model response evaluations via local neural loaders.", techs: ["PyTorch", "Hugging Face"] }
  ],
  "saas-development": [
    { title: "Edge View Render", desc: "Paints user dashboard frames with sub-50ms viewport speeds.", techs: ["Next.js", "TypeScript"] },
    { title: "API Gateway Auth", desc: "Verifies user access tokens inside isolated node environments.", techs: ["Node.js", "TypeScript"] },
    { title: "Transactional Log", desc: "Commits data mutation and update events to main PostgreSQL shard.", techs: ["PostgreSQL", "API Gateway"] },
    { title: "Sync Edge Caches", desc: "Invalidates Redis cache tag distributions across CDNs globally.", techs: ["Redis"] }
  ],
  "cloud-engineering": [
    { title: "Terraform Build", desc: "Declares serverless resource structures and security paths.", techs: ["Terraform"] },
    { title: "Ingress Router", desc: "Distributes incoming queries across redundant regions.", techs: ["AWS", "Google Cloud"] },
    { title: "Kubernetes Pods", desc: "Spawns Docker worker containers in isolated microservice rings.", techs: ["Kubernetes", "Docker"] },
    { title: "Scale Sharding", desc: "Triggers automated load scaling to prevent lockouts during traffic spikes.", techs: ["AWS", "Google Cloud", "Serverless Framework"] }
  ],
  "mobile-apps": [
    { title: "Native UI Thread", desc: "Paints luxury component trees and animations on devices.", techs: ["React Native", "Flutter"] },
    { title: "Offline Storage Lock", desc: "Stores pending action indexes to secure local database records.", techs: ["Realm DB"] },
    { title: "Gateway API Sync", desc: "Transfers local entries to central PostgreSQL server.", techs: ["GraphQL"] },
    { title: "CDN Media Shunt", desc: "Caches layout visual assets adjacent to client coordinates.", techs: ["GraphQL"] }
  ],
  "enterprise-software": [
    { title: "API Edge Gateway", desc: "Routes query payloads to appropriate service channels.", techs: ["Go"] },
    { title: "Ingress Queue Log", desc: "Stores transaction writes inside secure RabbitMQ logs.", techs: ["RabbitMQ"] },
    { title: "Consensus Commit", desc: "Synchronizes microservice queries via unified API sockets.", techs: ["gRPC"] },
    { title: "Replica Node Write", desc: "Replicates data streams to PostgreSQL backend shards.", techs: ["gRPC", "Docker"] }
  ],
  "product-design": [
    { title: "Figma Typography Grid", desc: "Specifies layout templates and typography styles.", techs: ["Figma"] },
    { title: "UX Wireframing Trials", desc: "Tests click coordinates to optimize page layout paths.", techs: ["User Testing Tools"] },
    { title: "Animated Transitions", desc: "Applies luxury neon glow highlights and micro-interactions.", techs: ["Tailored Animations"] },
    { title: "Style Sheet Tokens", desc: "Compiles layout colors into CSS modules parameters.", techs: ["Stripe Style Guides"] }
  ],
  "devops": [
    { title: "GitHub Trigger", desc: "Scans code updates and sets environment paths.", techs: ["GitHub Actions"] },
    { title: "Build Verification", desc: "Validates code quality limits prior to deployment.", techs: ["GitHub Actions", "Sentry"] },
    { title: "ArgoCD Cluster Push", desc: "Deploys fresh containers across Kubernetes namespaces.", techs: ["ArgoCD", "Kubernetes"] },
    { title: "Sentry Alert Push", desc: "Identifies exception traces and routes logs to developer Slack.", techs: ["Sentry", "Grafana"] }
  ]
};

function ServiceVisual({ id, ticks }: { id: string; ticks: number }) {
  const [pods, setPods] = useState<number[]>([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  const [cpu, setCpu] = useState(42);
  const [qps, setQps] = useState(2450);

  useEffect(() => {
    const interval = setInterval(() => {
      // Pod topology updates
      setPods((prev) => prev.map(() => (Math.random() > 0.82 ? 0 : 1)));
      setCpu(Math.round(35 + Math.random() * 20));
      setQps(Math.round(2100 + Math.random() * 800));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  if (id === "saas-development" || id === "api-design" || id === "enterprise-software") {
    const logs = [
      "ROUTE -> /v1/records (Shard A read)",
      "ROUTE -> /v1/telemetry/history (Shard B read)",
      "ROUTE -> /v1/auth/token [JWT verified]",
      "EVENT -> User sign-in emitted to consensus ring",
      "ROUTE -> /v1/deployments/:id [Pending validation]"
    ];

    return (
      <div className={styles.visualWrapper}>
        <div className={styles.visualHeader}>
          <span className={styles.visualTitle}>
            <Layers size={14} style={{ color: "var(--accent-primary)" }} /> Multi-Tenant Router Engine
          </span>
          <span className={styles.badgeOnline}>
            <Lock size={12} style={{ color: "var(--accent-success)" }} /> Online
          </span>
        </div>
        <div className={styles.visualBody}>
          <div className={styles.logStream} style={{ height: "130px" }}>
            <div className={styles.logLine} style={{ color: "var(--accent-success)", borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span>[router] STATUS: active (0 load queues pending)</span>
            </div>
            <div className={styles.logLine}>
              <span className={styles.logTime}>[sys]</span>
              <span>{logs[ticks % logs.length]}</span>
            </div>
          </div>

          <div className={styles.liveMetric}>
            <span>Global Traffic Load</span>
            <span style={{ color: "var(--accent-secondary)", fontWeight: 700 }}>{qps.toLocaleString()} QPS</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "cloud-engineering" || id === "devops" || id === "cloud-migrations" || id === "managed-support") {
    return (
      <div className={styles.visualWrapper}>
        <div className={styles.visualHeader}>
          <span className={styles.visualTitle}>
            <Cloud size={14} style={{ color: "var(--accent-primary)" }} /> Cluster Pod Topology
          </span>
          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>High SLA Uptime</span>
        </div>
        <div className={styles.visualBody}>
          <div className={styles.podCluster}>
            {pods.map((pState, idx) => (
              <div 
                key={idx} 
                className={`${styles.pod} ${pState === 1 ? styles.podHealthy : styles.podPulse}`}
                title={pState === 1 ? "Healthy pod" : "Pod re-scaling"}
              >
                <div style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: pState === 1 ? "var(--accent-success)" : "var(--accent-secondary)"
                }} />
              </div>
            ))}
          </div>

          <div className={styles.liveMetric} style={{ marginTop: "0.5rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", textAlign: "left" }}>
              <span style={{ fontSize: "0.6rem", textTransform: "uppercase", color: "var(--text-secondary)" }}>Active Pod Replicas</span>
              <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>12 / 12 Healthy</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem", textAlign: "right" }}>
              <span style={{ fontSize: "0.6rem", textTransform: "uppercase", color: "var(--text-secondary)" }}>Cluster Load</span>
              <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{cpu}% CPU</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "cybersecurity" || id === "qa-automation") {
    const secLogs = [
      "[INFO] HTTPS handshake requested from edge gateway node.",
      "[ALLOW] JWT token verified successfully. Scope: read.",
      "[WARN] Traffic burst threshold approaching on endpoint.",
      "[ALLOW] Payload integrity check passed. Processing request.",
      "[SECURE] Cryptographic key negotiation completed (Curve25519)."
    ];

    return (
      <div className={styles.visualWrapper}>
        <div className={styles.visualHeader}>
          <span className={styles.visualTitle}>
            <ShieldAlert size={14} style={{ color: "var(--accent-primary)" }} /> Hardened WAF Firewall
          </span>
          <span className={styles.badgeOnline}>
            <Lock size={12} style={{ color: "var(--accent-success)" }} /> Secured
          </span>
        </div>
        <div className={styles.visualBody}>
          <div className={styles.logStream} style={{ height: "130px" }}>
            <div className={styles.logLine} style={{ color: "var(--accent-success)", borderBottom: "1px dashed rgba(255,255,255,0.05)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
              <span>[firewall] STATUS: nominal (0 threat alerts triggered)</span>
            </div>
            <div className={styles.logLine}>
              <span className={styles.logTime}>[sys]</span>
              <span>{secLogs[ticks % secLogs.length]}</span>
            </div>
            <div className={styles.logLine} style={{ opacity: 0.6 }}>
              <span className={styles.logTime}>[mesh]</span>
              <span>cryptography=AES_256 hash=SHA256</span>
            </div>
          </div>

          <div className={styles.liveMetric}>
            <span>Encryption Strength</span>
            <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>256-bit AES</span>
          </div>
        </div>
      </div>
    );
  }

  const barHeights = [
    [40, 60, 80, 50, 70, 90],
    [50, 75, 45, 80, 60, 85],
    [65, 40, 70, 95, 55, 75]
  ];
  const activeHeights = barHeights[ticks % barHeights.length];

  return (
    <div className={styles.visualWrapper}>
      <div className={styles.phoneFrame}>
        <div className={styles.phoneNotch} />
        <div className={styles.phoneScreen}>
          <div className={styles.phoneHeader}>
            <span>11:05 AM</span>
            <span>5G Active</span>
          </div>
          <div className={styles.phoneBody}>
            <div style={{ fontSize: "0.6rem", fontWeight: 700, color: "#fff", textAlign: "left", marginBottom: "0.2rem" }}>
              UX Metrics Radar
            </div>
            
            <div className={styles.phoneChart}>
              {activeHeights.map((h, i) => (
                <div 
                  key={i} 
                  className={styles.phoneBar} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.45rem", color: "var(--text-secondary)", marginTop: "0.2rem" }}>
              <span>Speed</span>
              <span style={{ color: "var(--accent-success)" }}>18ms (Nominal)</span>
            </div>
          </div>
          <button className={`${styles.phoneButton} ${ticks % 2 === 0 ? styles.phoneButtonPulse : ""}`}>
            Interactive Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const service = servicesData[id];
  const pipeline = servicePipelines[id] || [];
  
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ticks, setTicks] = useState(0);

  // AI states
  const [aiText, setAiText] = useState("neural parsing model");
  const [aiTokens, setAiTokens] = useState<string[]>(["neural", "parsing", "model"]);
  const [aiVector, setAiVector] = useState<number[]>([0.18, -0.92, 0.45, 0.72]);
  const [isTokenizing, setIsTokenizing] = useState(false);

  // SaaS states
  const [saasTenants, setSaasTenants] = useState<string[]>(["Tenant_Alpha", "Tenant_Beta"]);
  const [newTenantName, setNewTenantName] = useState("");
  const [activeShard, setActiveShard] = useState(0);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [saasLogs, setSaasLogs] = useState<string[]>(["[init] Multi-tenant router online.", "[system] DB shards partition active."]);

  // Cloud states
  const [trafficSlider, setTrafficSlider] = useState(30);

  // Mobile states
  const [isPhoneOnline, setIsPhoneOnline] = useState(false);
  const [queuedSyncActions, setQueuedSyncActions] = useState<string[]>([]);
  const [syncLogList, setSyncLogList] = useState<string[]>(["[local] SQLite Queue initialized.", "[local] Device connection: offline."]);

  // Enterprise states
  const [legacyModules, setLegacyModules] = useState([
    { name: "Auth Monolith", status: "legacy", latency: 240 },
    { name: "Product Catalog", status: "legacy", latency: 180 },
    { name: "Image Assets", status: "legacy", latency: 320 },
    { name: "SMS Sender", status: "legacy", latency: 150 }
  ]);
  const [migrationLogs, setMigrationLogs] = useState<string[]>(["[migration] Proxies configured. Monolith shadow metrics active."]);

  // Design states
  const [primaryColor, setPrimaryColor] = useState("#8b5cf6");
  const [cardRadius, setCardRadius] = useState(12);
  const [layoutSpacing, setLayoutSpacing] = useState(16);

  // DevOps states
  const [buildState, setBuildState] = useState<"idle" | "linting" | "testing" | "building" | "deploying" | "success">("idle");
  const [buildProgress, setBuildProgress] = useState(0);
  const [ciLogs, setCiLogs] = useState<string[]>(["[ci] Webhook listening on branch: main."]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTicks((t) => t + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Automatic looping of pipeline simulation steps
  useEffect(() => {
    if (isHovered || pipeline.length === 0) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % pipeline.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isHovered, pipeline.length]);

  if (!service) {
    notFound();
  }

  const toggleFaq = (idx: number) => {
    setOpenFaqIdx(openFaqIdx === idx ? null : idx);
  };

  const activeStepTechs = pipeline[activeStep]?.techs || [];

  // 1. AI solutions tokenization simulation
  const handleTokenize = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiText.trim() || isTokenizing) return;
    setIsTokenizing(true);
    setTimeout(() => {
      const splitArr = aiText.trim().toLowerCase().split(/\s+/).filter(Boolean);
      setAiTokens(splitArr);
      setAiVector(splitArr.map(() => Number((Math.random() * 2 - 1).toFixed(2))));
      setIsTokenizing(false);
    }, 900);
  };

  // 2. SaaS Tenant sharding simulator
  const handleProvisionTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (isProvisioning) return;
    const name = newTenantName.trim() || `Tenant_${Math.random().toString(36).substring(7)}`;
    const chosenShard = Math.floor(Math.random() * 3);
    const chosenShardName = String.fromCharCode(65 + chosenShard); // A, B, or C
    setIsProvisioning(true);
    setSaasLogs((prev) => [
      `[router] Incoming provisioning payload for ${name}...`,
      `[shard-balance] Calculating optimal resource distribution across Consensus Rings...`,
      ...prev.slice(0, 5)
    ]);
    
    setTimeout(() => {
      setSaasTenants((prev) => [...prev, name]);
      setActiveShard(chosenShard);
      setSaasLogs((prev) => [
        `[shard-balance] Isolated schema databases allocated in Shard ${chosenShardName}.`,
        `[db-connector] Webhook replication active on secondary nodes.`,
        `[router] Tenant "${name}" successfully provisioned to cluster.`,
        ...prev.slice(0, 5)
      ]);
      setNewTenantName("");
      setIsProvisioning(false);
    }, 1500);
  };

  // 4. Mobile Offline sync simulator
  const handleAddOfflineAction = () => {
    const actionNames = ["Update Profile", "Trigger Diagnostics", "Reload Asset Stack", "Sync System Flags"];
    const action = actionNames[Math.floor(Math.random() * actionNames.length)] + ` #${queuedSyncActions.length + 1}`;
    setQueuedSyncActions((prev) => [...prev, action]);
    setSyncLogList((prev) => [
      `[local-db] Enqueued action: "${action}" (Status: PENDING_SYNC)`,
      ...prev.slice(0, 5)
    ]);
  };

  const handleToggleMobileConnection = () => {
    const nextState = !isPhoneOnline;
    setIsPhoneOnline(nextState);
    if (nextState) {
      setSyncLogList((prev) => [
        `[network] Connection established (LTE/5G). Initiating handshake...`,
        ...prev
      ]);
      if (queuedSyncActions.length > 0) {
        setSyncLogList((prev) => [`[sync] Transferring ${queuedSyncActions.length} actions to remote database...`, ...prev]);
        setTimeout(() => {
          setSyncLogList((prev) => [
            `[sync] SUCCESS: ${queuedSyncActions.length} transactions processed on main PostgreSQL shards.`,
            `[local-db] Queue cleared.`,
            ...prev
          ]);
          setQueuedSyncActions([]);
        }, 1500);
      }
    } else {
      setSyncLogList((prev) => [
        `[network] Connection lost. Redirecting transaction queries to local Realm DB queue.`,
        ...prev
      ]);
    }
  };

  // 5. Enterprise Monolith Modernization
  const handleModernizeNextModule = () => {
    const legacyIndex = legacyModules.findIndex((m) => m.status === "legacy");
    if (legacyIndex === -1) {
      setMigrationLogs((prev) => [" [success] Entire monolithic infrastructure modernized to Go/gRPC microservices!", ...prev]);
      return;
    }
    const targetName = legacyModules[legacyIndex].name;
    setLegacyModules((prev) =>
      prev.map((m, idx) => (idx === legacyIndex ? { ...m, status: "microservice", latency: Math.round(5 + Math.random() * 8) } : m))
    );
    setMigrationLogs((prev) => [
      `[strangler-proxy] Shunting traffic away from ${targetName} monolith routes.`,
      `[docker-k8s] Provisioning isolated container pods on replica node cluster.`,
      `[gRPC-service] Spawning active RPC communication sockets...`,
      `[migration] ${targetName.replace(" Monolith", "")} microservice successfully deployed! Latency down to <15ms.`,
      ...prev.slice(0, 5)
    ]);
  };

  // 7. DevOps build pipeline simulator
  const handleExecuteCiPipeline = () => {
    if (buildState !== "idle") return;
    setBuildState("linting");
    setBuildProgress(15);
    setCiLogs(["[ci] Commencing automatic container orchestration build pipeline..."]);

    setTimeout(() => {
      setBuildState("testing");
      setBuildProgress(45);
      setCiLogs((l) => [
        "[lint] npx next lint: Passed (0 violations).",
        "[test] Running parallel Jest & E2E Playwright workers...",
        ...l
      ]);
    }, 1200);

    setTimeout(() => {
      setBuildState("building");
      setBuildProgress(70);
      setCiLogs((l) => [
        "[test] Playwright (Chromium/Webkit): 140 assertions passed.",
        "[build] Compiling Next.js code bundle & optimizing route shards...",
        ...l
      ]);
    }, 2600);

    setTimeout(() => {
      setBuildState("deploying");
      setBuildProgress(90);
      setCiLogs((l) => [
        "[build] Bundle minimized (gzip). Build size: 84.1 kB.",
        "[deploy] Deploying container routes globally to Kubernetes cluster...",
        ...l
      ]);
    }, 4000);

    setTimeout(() => {
      setBuildState("success");
      setBuildProgress(100);
      setCiLogs((l) => [
        "[deploy] Ingress routes active. ArgoCD synchronization complete.",
        "[success] Pipeline deploy: SUCCESS. Platform status is nominal.",
        ...l
      ]);
    }, 5200);
  };

  const handleResetCiPipeline = () => {
    setBuildState("idle");
    setBuildProgress(0);
    setCiLogs(["[ci] Webhook listening on branch: main. Standby."]);
  };

  return (
    <div className={styles.serviceSection}>
      <div className="container">
        
        {/* Bespoke Header */}
        <div className={styles.heroGrid} style={{ marginBottom: "4rem" }}>
          <div>
            <span className={styles.tagline}>{service.tag}</span>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.desc}>{service.description}</p>
          </div>
          <div className={styles.heroVisual} style={{ padding: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ServiceVisual id={id} ticks={ticks} />
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* Bespoke Page Structures & Interactive Sections Depending on ID */}
        {/* ------------------------------------------------------------- */}

        {/* AI Solutions bespoke layout */}
        {id === "ai-solutions" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Prompt Analyzer</span>
                <h3 className={styles.blueprintTitle}>Interactive Prompt Tokenizer & Embedding Scanner</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Write a prompt to visualize how neural networks split sentences into tokens and project them into high-dimensional vector spaces.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <form onSubmit={handleTokenize} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Input Custom Prompt</label>
                    <input 
                      type="text" 
                      value={aiText} 
                      onChange={(e) => setAiText(e.target.value)} 
                      style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.8rem", color: "#fff", fontSize: "0.9rem", fontFamily: "var(--font-secondary)" }}
                    />
                  </div>
                  <button type="submit" className="magnetic-btn btn-accent" style={{ alignSelf: "flex-start", padding: "0.75rem 1.75rem" }} disabled={isTokenizing}>
                    {isTokenizing ? "Embedding Vectors..." : "Tokenize Prompt"}
                  </button>

                  <div style={{ background: "#040814", borderRadius: "8px", padding: "1.25rem", border: "var(--border-light)" }}>
                    <span style={{ fontSize: "0.65rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>Vector Representation (Float32 Array)</span>
                    <div style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--accent-secondary)", wordBreak: "break-all", lineHeight: 1.5 }}>
                      [{aiVector.join(", ")}]
                    </div>
                  </div>
                </form>

                <div style={{ background: "rgba(4,8,20,0.5)", border: "var(--border-light)", borderRadius: "8px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Token Parsing Map</span>
                  
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {aiTokens.map((tok, index) => (
                      <span key={index} style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: "4px", padding: "0.4rem 0.8rem", fontSize: "0.8rem", fontFamily: "monospace", color: "#fff" }}>
                        {tok} <span style={{ color: "var(--accent-secondary)", fontSize: "0.65rem", marginLeft: "0.25rem" }}>idx:{index}</span>
                      </span>
                    ))}
                  </div>

                  <div style={{ flex: 1, border: "1px dashed rgba(255,255,255,0.08)", borderRadius: "8px", padding: "1rem", position: "relative", minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Brain size={32} style={{ opacity: 0.1, position: "absolute" }} />
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", textAlign: "center" }}>
                      Tokens projected securely inside high-dimensional indexing models.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Unique circular network flowchart replacement */}
            <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem" }}>
              <h3 className={styles.subtitle} style={{ textAlign: "center" }}>Circular Cognitive Ingest Architecture</h3>
              
              {/* Circular view for larger screens */}
              <div className={styles.flowchartCircleView}>
                <div className={styles.flowchartWrapper}>
                  <div className={`${styles.flowchartNode} ${styles.flowchartNodeTop}`}>
                    1. Ingestion Pipeline
                  </div>
                  <div className={`${styles.flowchartNode} ${styles.flowchartNodeRight}`}>
                    2. Vector Indexing
                  </div>
                  <div className={`${styles.flowchartNode} ${styles.flowchartNodeBottom}`}>
                    3. Context Formatting
                  </div>
                  <div className={`${styles.flowchartNode} ${styles.flowchartNodeLeft}`}>
                    4. LLM Generation
                  </div>
                  <div className={styles.flowchartCenter}>
                    <Brain size={48} color="var(--accent-primary)" />
                    <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>Cognitive Core</span>
                  </div>
                </div>
              </div>

              {/* Premium timeline view for mobile viewports */}
              <div className={styles.flowchartMobileView}>
                <div className={styles.mobileCoreHeader}>
                  <div className={styles.mobileBrainIcon}>
                    <Brain size={32} color="var(--accent-primary)" />
                  </div>
                  <div>
                    <h4 className={styles.mobileCoreTitle}>Cognitive Core</h4>
                    <p className={styles.mobileCoreDesc}>Central orchestration & reasoning engine</p>
                  </div>
                </div>

                <div className={styles.mobileTimeline}>
                  <div className={styles.mobileTimelineLine} />
                  
                  <div className={styles.mobileTimelineStep}>
                    <div className={styles.mobileStepBadge}>1</div>
                    <div className={styles.mobileStepContent}>
                      <h5 className={styles.mobileStepTitle}>Ingestion Pipeline</h5>
                      <p className={styles.mobileStepDesc}>Real-time stream tokenization and preprocessing of raw contextual data.</p>
                    </div>
                  </div>

                  <div className={styles.mobileTimelineStep}>
                    <div className={styles.mobileStepBadge}>2</div>
                    <div className={styles.mobileStepContent}>
                      <h5 className={styles.mobileStepTitle}>Vector Indexing</h5>
                      <p className={styles.mobileStepDesc}>High-dimensional projection & embedding storage within semantic databases.</p>
                    </div>
                  </div>

                  <div className={styles.mobileTimelineStep}>
                    <div className={styles.mobileStepBadge}>3</div>
                    <div className={styles.mobileStepContent}>
                      <h5 className={styles.mobileStepTitle}>Context Formatting</h5>
                      <p className={styles.mobileStepDesc}>Assembles custom system instructions and dynamically parsed semantic context.</p>
                    </div>
                  </div>

                  <div className={styles.mobileTimelineStep}>
                    <div className={styles.mobileStepBadge}>4</div>
                    <div className={styles.mobileStepContent}>
                      <h5 className={styles.mobileStepTitle}>LLM Generation</h5>
                      <p className={styles.mobileStepDesc}>Executes agent reasoning logic and streams final formatted responses.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SaaS Development bespoke layout */}
        {id === "saas-development" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Infrastructure Partitioning</span>
                <h3 className={styles.blueprintTitle}>Multi-Tenant Shard Router & Database Provisioner</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Simulate database tenant partitioning. Add a tenant to watch the system balance resource allocations dynamically across shards.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div>
                  <form onSubmit={handleProvisionTenant} style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
                    <input 
                      type="text" 
                      value={newTenantName} 
                      onChange={(e) => setNewTenantName(e.target.value)} 
                      placeholder="Enter new tenant ID..."
                      style={{ flex: 1, background: "#050a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.75rem", color: "#fff", fontSize: "0.85rem" }}
                      disabled={isProvisioning}
                    />
                    <button type="submit" className="magnetic-btn btn-accent" style={{ padding: "0.75rem 1.25rem" }} disabled={isProvisioning}>
                      {isProvisioning ? "Provisioning..." : "Provision Tenant"}
                    </button>
                  </form>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Active Shard Allocations</span>
                    <div className={styles.shardsGrid}>
                      {["Shard A", "Shard B", "Shard C"].map((shardName, idx) => {
                        const isHit = activeShard === idx;
                        return (
                          <div 
                            key={idx} 
                            style={{ 
                              background: "rgba(4,8,20,0.6)", 
                              border: isHit ? "1px solid var(--accent-primary)" : "1px solid rgba(255,255,255,0.05)", 
                              borderRadius: "8px", 
                              padding: "1rem", 
                              textAlign: "center",
                              transition: "all 0.3s ease",
                              boxShadow: isHit ? "0 0 12px rgba(124,58,237,0.15)" : "none"
                            }}
                          >
                            <Database size={20} style={{ margin: "0 auto 0.5rem", color: isHit ? "var(--accent-primary)" : "var(--text-secondary)" }} />
                            <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{shardName}</div>
                            <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                              {isHit ? "ACTIVE ROUTE" : "STANDBY"}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ marginTop: "1rem" }}>
                      <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>Active Tenants ({saasTenants.length})</span>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {saasTenants.map((tenant, index) => (
                          <span key={index} style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: "4px", padding: "0.25rem 0.5rem", fontSize: "0.7rem", color: "#fff" }}>
                            {tenant}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Provisioning log traces</span>
                  <div className={styles.logStream} style={{ height: "180px", overflowY: "auto" }}>
                    {saasLogs.map((log, index) => (
                      <div key={index} style={{ fontSize: "0.7rem", color: log.startsWith("[shard") ? "var(--accent-primary)" : "var(--text-secondary)" }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Cloud Engineering bespoke layout */}
        {id === "cloud-engineering" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Kubernetes Cluster Auto-scaler</span>
                <h3 className={styles.blueprintTitle}>Interactive Cluster Pod Replication Scaler</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Drag the traffic simulator slider (representing requests concurrency load) to watch pod nodes scale up or down automatically.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 700 }}>
                      <span style={{ color: "var(--text-secondary)" }}>Simulated Concurrency Load</span>
                      <span style={{ color: "var(--accent-primary)" }}>{trafficSlider * 5}0 requests / sec</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="100" 
                      value={trafficSlider} 
                      onChange={(e) => setTrafficSlider(Number(e.target.value))}
                      style={{ width: "100%", accentColor: "var(--accent-primary)", background: "rgba(255,255,255,0.05)" }}
                    />
                  </div>

                  <div style={{ background: "rgba(4,8,20,0.5)", border: "var(--border-light)", borderRadius: "8px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                      <span>Replicas Count:</span>
                      <span style={{ fontWeight: 700, color: "#fff" }}>{Math.max(2, Math.ceil(trafficSlider / 10))} / 10 Active Nodes</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                      <span>Calculated CPU load:</span>
                      <span style={{ fontWeight: 700, color: "var(--accent-secondary)" }}>{Math.round(15 + trafficSlider * 0.75)}% CPU Usage</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Pod Node Topology Grid</span>
                  <div className={styles.podsGrid}>
                    {Array.from({ length: 10 }).map((_, idx) => {
                      const limit = Math.max(2, Math.ceil(trafficSlider / 10));
                      const isActive = idx < limit;
                      const isScaling = idx === limit - 1;
                      return (
                        <div 
                          key={idx} 
                          style={{ 
                            aspectRatio: "1.2", 
                            borderRadius: "6px", 
                            background: isActive ? (isScaling ? "rgba(6,182,212,0.15)" : "rgba(16,185,129,0.08)") : "rgba(255,255,255,0.02)", 
                            border: isActive ? (isScaling ? "1px solid rgba(6,182,212,0.4)" : "1px solid rgba(16,185,129,0.25)") : "1px solid rgba(255,255,255,0.04)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "0.65rem",
                            fontFamily: "monospace",
                            color: isActive ? "#fff" : "#444",
                            boxShadow: isScaling ? "0 0 10px rgba(6,182,212,0.2)" : "none"
                          }}
                        >
                          pod-{idx + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Mobile Apps bespoke layout */}
        {id === "mobile-apps" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Offline-First Sync Sandbox</span>
                <h3 className={styles.blueprintTitle}>Realm Database Offline Transaction Ledger</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Toggle the connection status to OFFLINE, click &quot;Add Offline Action&quot; to queue up tasks locally, and then switch connection ONLINE to watch queued tasks sync immediately.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      type="button" 
                      onClick={handleToggleMobileConnection} 
                      className={`magnetic-btn ${isPhoneOnline ? "btn-accent" : "btn-secondary"}`}
                      style={{ padding: "0.75rem 1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
                    >
                      {isPhoneOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
                      Set Connection: {isPhoneOnline ? "ONLINE" : "OFFLINE"}
                    </button>

                    <button 
                      type="button" 
                      onClick={handleAddOfflineAction} 
                      className="magnetic-btn btn-primary"
                      style={{ padding: "0.75rem 1.5rem" }}
                    >
                      Add Offline Action
                    </button>
                  </div>

                  <div style={{ background: "rgba(4,8,20,0.5)", border: "var(--border-light)", borderRadius: "8px", padding: "1.25rem" }}>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>Queued Local Actions ({queuedSyncActions.length})</span>
                    {queuedSyncActions.length === 0 ? (
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", fontStyle: "italic" }}>No action queues pending.</span>
                    ) : (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {queuedSyncActions.map((act, index) => (
                          <span key={index} style={{ background: "rgba(255,107,107,0.1)", border: "1px solid rgba(255,107,107,0.25)", color: "#fff", fontSize: "0.7rem", borderRadius: "4px", padding: "0.3rem 0.6rem" }}>
                            {act}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Synchronization Traces</span>
                  <div className={styles.logStream} style={{ height: "180px", overflowY: "auto" }}>
                    {syncLogList.map((log, index) => (
                      <div key={index} style={{ fontSize: "0.7rem", color: log.startsWith("[sync]") ? "var(--accent-success)" : "var(--text-secondary)" }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Enterprise Software bespoke layout */}
        {id === "enterprise-software" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Monolith Migration</span>
                <h3 className={styles.blueprintTitle}>Strangler Fig Legacy Modernization Console</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Systematically refactor monolithic system layers. Click &quot;Refactor Module&quot; to decouple legacy modules into lightweight Go microservices.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div className={styles.modulesGrid}>
                    {legacyModules.map((mod, index) => (
                      <div 
                        key={index}
                        style={{ 
                          background: "rgba(4,8,20,0.6)", 
                          border: mod.status === "microservice" ? "1px solid var(--accent-success)" : "1px solid rgba(255,107,107,0.25)",
                          borderRadius: "8px",
                          padding: "1rem"
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>{mod.name}</span>
                          <span style={{ 
                            fontSize: "0.6rem", 
                            fontWeight: 700, 
                            textTransform: "uppercase",
                            color: mod.status === "microservice" ? "var(--accent-success)" : "var(--accent-highlight)"
                          }}>
                            {mod.status}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "var(--text-secondary)" }}>
                          <span>Latency:</span>
                          <span style={{ fontWeight: 700, color: mod.status === "microservice" ? "var(--accent-success)" : "#fff" }}>
                            {mod.latency}ms
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={handleModernizeNextModule} 
                    className="magnetic-btn btn-accent" 
                    style={{ alignSelf: "flex-start", padding: "0.75rem 1.75rem" }}
                    disabled={legacyModules.every((m) => m.status === "microservice")}
                  >
                    Refactor Next Module
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Migration Console Logs</span>
                  <div className={styles.logStream} style={{ height: "200px", overflowY: "auto" }}>
                    {migrationLogs.map((log, index) => (
                      <div key={index} style={{ fontSize: "0.7rem", color: log.startsWith("[migration]") ? "var(--accent-primary)" : "var(--text-secondary)" }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Product Design bespoke layout */}
        {id === "product-design" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>Design Token Studio</span>
                <h3 className={styles.blueprintTitle}>Interactive Component Layout Token Playground</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Modify color tokens, spacing margins, and component corner shapes to preview real-time CSS layout restyling.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <label style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Select Theme Token</label>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      {["#8b5cf6", "#06b6d4", "#f43f5e"].map((color) => (
                        <button 
                          key={color}
                          type="button"
                          onClick={() => setPrimaryColor(color)}
                          style={{ 
                            width: "36px", 
                            height: "36px", 
                            borderRadius: "50%", 
                            backgroundColor: color, 
                            border: primaryColor === color ? "2px solid #fff" : "2px solid transparent",
                            cursor: "pointer",
                            transition: "all 0.2s"
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                      <span>Border Radius</span>
                      <span>{cardRadius}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="2" 
                      max="24" 
                      value={cardRadius} 
                      onChange={(e) => setCardRadius(Number(e.target.value))}
                      style={{ width: "100%", accentColor: primaryColor }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                      <span>Padding Margin</span>
                      <span>{layoutSpacing}px</span>
                    </div>
                    <input 
                      type="range" 
                      min="8" 
                      max="32" 
                      value={layoutSpacing} 
                      onChange={(e) => setLayoutSpacing(Number(e.target.value))}
                      style={{ width: "100%", accentColor: primaryColor }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Restyled Component Preview</span>
                  
                  {/* Dynamic Mock Card */}
                  <div style={{ 
                    background: "rgba(13,18,37,0.8)", 
                    border: `1px solid ${primaryColor}`, 
                    borderRadius: `${cardRadius}px`, 
                    padding: `${layoutSpacing}px`,
                    transition: "all 0.25s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem"
                  }}>
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", backgroundColor: primaryColor }} />
                      <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Preview Dashboard Card</span>
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                      This card dynamically adapts its boundaries, borders, and margins based on tokens configured in the designer panel.
                    </p>
                  </div>

                  {/* Compiled CSS display */}
                  <div style={{ background: "#040814", border: "var(--border-light)", borderRadius: "8px", padding: "1rem", fontFamily: "monospace", fontSize: "0.7rem", color: "var(--accent-secondary)", textAlign: "left" }}>
                    <div>.luxuryCard &#123;</div>
                    <div style={{ paddingLeft: "1rem" }}>border: 1px solid <span style={{ color: "#fff" }}>{primaryColor}</span>;</div>
                    <div style={{ paddingLeft: "1rem" }}>border-radius: <span style={{ color: "#fff" }}>{cardRadius}px</span>;</div>
                    <div style={{ paddingLeft: "1rem" }}>padding: <span style={{ color: "#fff" }}>{layoutSpacing}px</span>;</div>
                    <div>&#125;</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* DevOps bespoke layout */}
        {id === "devops" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "4rem", marginBottom: "5rem" }}>
            
            {/* Interactive Section */}
            <section className={styles.blueprintCard} style={{ background: "rgba(13, 18, 37, 0.4)" }}>
              <div style={{ marginBottom: "2rem" }}>
                <span className={styles.tagline}>CI/CD Orchestrator</span>
                <h3 className={styles.blueprintTitle}>Interactive Deployment Pipeline Simulator</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                  Trigger a mock CI/CD deployment pipeline sequence to inspect container compilation, testing jobs, and ArgoCD synchronization steps.
                </p>
              </div>

              <div className={styles.blueprintTwoCol}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <button 
                      type="button" 
                      onClick={handleExecuteCiPipeline} 
                      className="magnetic-btn btn-accent" 
                      style={{ padding: "0.75rem 1.75rem" }}
                      disabled={buildState !== "idle"}
                    >
                      Execute Git Push Deploy
                    </button>
                    {buildState !== "idle" && (
                      <button 
                        type="button" 
                        onClick={handleResetCiPipeline} 
                        className="magnetic-btn btn-secondary" 
                        style={{ padding: "0.75rem 1.5rem" }}
                      >
                        Reset Pipeline
                      </button>
                    )}
                  </div>

                  {buildState !== "idle" && (
                    <div style={{ background: "rgba(4,8,20,0.5)", border: "var(--border-light)", borderRadius: "8px", padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                        <span style={{ textTransform: "uppercase", color: "var(--text-secondary)" }}>Active Stage:</span>
                        <span style={{ fontWeight: 700, color: "var(--accent-primary)" }}>{buildState.toUpperCase()}</span>
                      </div>
                      <div style={{ width: "100%", height: "6px", background: "rgba(255,255,255,0.05)", borderRadius: "3px", overflow: "hidden" }}>
                        <div style={{ width: `${buildProgress}%`, height: "100%", background: "var(--accent-primary)", transition: "width 0.4s ease" }} />
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--text-secondary)" }}>Build Terminal Logs</span>
                  <div className={styles.logStream} style={{ height: "200px", overflowY: "auto" }}>
                    {ciLogs.map((log, index) => (
                      <div key={index} style={{ fontSize: "0.7rem", color: log.startsWith("[success]") ? "var(--accent-success)" : log.startsWith("[lint]") ? "#fff" : "var(--text-secondary)" }}>
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* Fallback to standard generic templates if no match (e.g. cloud-migrations, api-design) */}
        {/* ------------------------------------------------------------- */}
        {id !== "ai-solutions" && id !== "saas-development" && id !== "cloud-engineering" && id !== "mobile-apps" && id !== "enterprise-software" && id !== "product-design" && id !== "devops" && pipeline.length > 0 && (
          <section className={styles.blueprintSection} style={{ borderTop: "none" }}>
            <div className="container" style={{ padding: 0 }}>
              <div className={styles.blueprintCard}>
                <div className={styles.blueprintHeader}>
                  <span className={styles.tagline}>System Simulator</span>
                  <h2 className={styles.blueprintTitle}>
                    <Settings size={20} className="spin" style={{ animation: "spin 4s linear infinite", color: "var(--accent-secondary)" }} />
                    Interactive Solution Stack Pipeline
                  </h2>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                    Hover over or select any architectural step below to analyze how query payloads flow through our components, and inspect which backend technologies handle that step.
                  </p>
                </div>

                {/* Dynamic 4-Node Connected Pipeline */}
                <div className={styles.pipelineGrid}>
                  {pipeline.map((step, idx) => {
                    const isActive = activeStep === idx;
                    return (
                      <div
                        key={idx}
                        className={`${styles.pipelineNode} ${isActive ? styles.nodeActive : ""}`}
                        onMouseEnter={() => {
                          setIsHovered(true);
                          setActiveStep(idx);
                        }}
                        onMouseLeave={() => {
                          setIsHovered(false);
                        }}
                        onClick={() => {
                          setActiveStep(idx);
                        }}
                      >
                        <div className={styles.nodeNum}>{idx + 1}</div>
                        <h3 className={styles.nodeTitle}>{step.title}</h3>
                        <p className={styles.nodeDesc}>{step.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* Benefits section */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.subtitle}>Core Benefits</h2>
          <div className={styles.benefitsGrid}>
            {service.benefits.map((b, idx) => (
              <div key={idx} className={styles.benefitCard}>
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", color: "var(--accent-secondary)", marginBottom: "0.5rem" }}>
                  <CheckCircle size={18} />
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                </div>
                <p className={styles.benefitDesc}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className={styles.techSection}>
        <div className="container">
          <h2 className={styles.subtitle}>Our Technology Stack</h2>
          <div className={styles.techGrid}>
            {service.technologies.map((tech) => {
              const isHighlighted = activeStepTechs.includes(tech);
              return (
                <span
                  key={tech}
                  className={`${styles.techTag} ${isHighlighted ? styles.techTagActive : ""}`}
                  style={{
                    boxShadow: isHighlighted ? "0 0 15px rgba(124, 58, 237, 0.15)" : "none",
                    transition: "all 0.3s ease"
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className="container">
          <h2 className={styles.subtitle} style={{ textAlign: "center" }}>Frequently Asked Questions</h2>
          <div className={styles.faqGrid}>
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div key={idx} className={styles.faqItem} onClick={() => toggleFaq(idx)}>
                  <div className={styles.faqQuestion}>
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={16} color="var(--accent-primary)" /> : <ChevronDown size={16} color="var(--text-secondary)" />}
                  </div>
                  {isOpen && (
                    <p className={styles.faqAnswer}>{faq.a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
