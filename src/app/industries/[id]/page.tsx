"use client";
import React, { use, useState, useEffect } from "react";
import { notFound } from "next/navigation";
import styles from "@/components/industries.module.css";
import { ArrowRight, ShieldCheck, Cpu, Terminal, ArrowDown } from "lucide-react";
import Link from "next/link";

interface Challenge {
  title: string;
  desc: string;
}

interface Metric {
  val: string;
  label: string;
}

interface ArchitectureStep {
  name: string;
  details: string;
}

interface IndustryDetail {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: Metric[];
  challenges: Challenge[];
  steps: ArchitectureStep[];
  caseStudyTitle: string;
  caseStudyDesc: string;
}

const industriesData: Record<string, IndustryDetail> = {
  "saas": {
    id: "saas",
    tag: "SAAS & SOFTWARE PLATFORMS",
    title: "High-Concurrence SaaS Infrastructure",
    description: "Construct multi-region serverless configurations capable of delivering instant page load times and zero-downtime database scaling under high request traffic.",
    metrics: [
      { val: "+32%", label: "Capacity Scaling" },
      { val: "<18ms", label: "Global Transaction API" },
      { val: "Enterprise", label: "Platform SLA Tier" }
    ],
    challenges: [
      { title: "Database Lockouts", desc: "Large spikes of concurrent transaction events locking tabular data fields, creating performance queues." },
      { title: "Global Bundle Latency", desc: "Serving heavyweight script bundles to regions with low bandwidth results in poor user retention indicators." },
      { title: "Dynamic Account Provisioning", desc: "Automating customized client accounts and resource allocations without dropping database webhooks." }
    ],
    steps: [
      { name: "Global CDN Edge", details: "User requests routed to closest physical Edge nodes." },
      { name: "Auth Token Verify", details: "Zero-trust verification checks claims within 2ms." },
      { name: "Serverless Handler", details: "Lightweight isolated routines fetch data schemas." },
      { name: "Partitioned DB", details: "Reads isolated schemas from database shards instantly." }
    ],
    caseStudyTitle: "Linear Scale Engine Migration",
    caseStudyDesc: "Refactored payment routing nodes for a SaaS analytics company, resulting in a +32% capacity increase and dropping load failures to nominal levels."
  },
  "healthcare": {
    id: "healthcare",
    tag: "DIGITAL HEALTHCARE SYSTEMS",
    title: "Secure Clinical System Architecture",
    description: "Consolidate fragmented patient vital files databases across clinics under strict performance standards with zero-trust protection.",
    metrics: [
      { val: "High", label: "Platform Uptime Score" },
      { val: "-38%", label: "Clinical Registry Latency" },
      { val: "21k", label: "Patient Ledgers Protected" }
    ],
    challenges: [
      { title: "Data Fragmentation", desc: "Patient records stored in isolated legacy structures, preventing real-time emergency clinical lookups." },
      { title: "Security Leak Vulnerabilities", desc: "Standard REST endpoints exposing vital records parameters to network packet inspectors." },
      { title: "Strict System Audits", desc: "Aligning software logs to compile files modification indicators for annual security and performance verification audits." }
    ],
    steps: [
      { name: "EMR Gateway Core", details: "Gathers vital parameters securely from local hospital databases." },
      { name: "VPC Private Tunnel", details: "Routes payloads via encrypted private lines, bypassing public networks." },
      { name: "Zero-Trust Shield", details: "Validates digital credential access rights via multi-factor keys." },
      { name: "Clinical Ledger DB", details: "Saves encrypted record update history with immutable log stamps." }
    ],
    caseStudyTitle: "Apex Health Diagnostics Portal",
    caseStudyDesc: "Designed an integrated portal for a clinical group, reducing EMR retrieval speeds by 38% while securing records compliance."
  },
  "fintech": {
    id: "fintech",
    tag: "FUTURE FINANCE ARCHITECTURES",
    title: "Zero-Latency FinTech Payment Pipelines",
    description: "Build micro-transaction pipelines leveraging automated fraud detection, localized currencies tax calculations, and advanced security standards.",
    metrics: [
      { val: "48k", label: "Transactions Securely Guided" },
      { val: "4ms", label: "Fraud Check Indexing Speed" },
      { val: "Optimal", label: "Routing Success Rate" }
    ],
    challenges: [
      { title: "Slowing Fraud Scans", desc: "Standard pattern searches timing out transaction logs when processing massive scale volume." },
      { title: "Double-spending Risks", desc: "Network delays resulting in transaction queue retries triggering duplicate charge orders." },
      { title: "Legacy Banking Integrations", desc: "Refactoring obsolete XML SOAP endpoints into typed modern REST schemas without service drops." }
    ],
    steps: [
      { name: "Transaction Trigger", details: "User launches charge order via localized client app." },
      { name: "AI Fraud Scan", details: "Scans request parameters against database threat patterns in 4ms." },
      { name: "Payment Route Core", details: "Directs transaction to the optimal banking rail based on cost metrics." },
      { name: "Consolidated Ledger", details: "Updates client balances across multi-region databases with double-entry safety." }
    ],
    caseStudyTitle: "Nexus Global Transaction Shield",
    caseStudyDesc: "Constructed sub-second global payment interfaces for an enterprise investment group, protecting 48k transactions in annual pipelines."
  },
  "education": {
    id: "education",
    tag: "EDTECH PLATFORMS",
    title: "Synchronous University Learning Workspaces",
    description: "Launch real-time class hub interfaces enabling university students to coordinate files, video feeds, and workspace canvases simultaneously.",
    metrics: [
      { val: "15k+", label: "Monthly Synchronous Learners" },
      { val: "90ms", label: "Interactive Canvas Latency" },
      { val: "+38%", label: "User NPS Score Gain" }
    ],
    challenges: [
      { title: "Real-time State De-sync", desc: "Multiple students writing to collaborative document boards simultaneously creating data overwrite conflicts." },
      { title: "Media Feed Overloads", desc: "Live classroom sessions lagging when concurrently streaming video packets to 1,000+ endpoints." },
      { title: "Device Capability Spans", desc: "Enforcing complex layout features on low-power devices without overheating units." }
    ],
    steps: [
      { name: "WebSocket Gateway", details: "Maintains active long-lived socket connections with student browsers." },
      { name: "Conflict Resolution", details: "Merges overlapping operational edits in real-time using CRDT algorithms." },
      { name: "Edge Media Stream", details: "Distributes video packets dynamically based on local network bandwidth." },
      { name: "State Snapshot Cache", details: "Periodically saves canvas backups to Redis to restore states during disconnects." }
    ],
    caseStudyTitle: "Global Class Hub Real-time Engine",
    caseStudyDesc: "Optimized drawing board sync scripts for an international school network, delivering lag-free learning for 15k active students."
  },
  "retail": {
    id: "retail",
    tag: "HEADLESS COMMERCE PLATFORMS",
    title: "High-Converting Headless Retail Systems",
    description: "Establish fast, customizable storefront interfaces decoupled from inventory database monitors, optimizing conversion metrics.",
    metrics: [
      { val: "+38%", label: "Checkout Conversion Rate Increase" },
      { val: "1.2s", label: "First Contentful Paint Speed" },
      { val: "+35%", label: "Server Payload Cost Reduction" }
    ],
    challenges: [
      { title: "Inventory Cache Sync", desc: "Displaying items as active when stock drops to zero, leading to checkout refunds." },
      { title: "Page Performance Drop", desc: "Slow page loads on product listing grids decreasing buyer purchase ratios." },
      { title: "Disparate POS Logs", desc: "Consolidating physical retail registers data feeds with online stock databases." }
    ],
    steps: [
      { name: "Static Storefront", details: "Serves pre-rendered product landing page layouts via global Edge nodes." },
      { name: "Dynamic Stock Fetch", details: "Queries local stock variables asynchronously once user views details." },
      { name: "Cart Engine API", details: "Calculates order discounts, taxes, and shipping rates in under 50ms." },
      { name: "Fulfillment Sync", details: "Updates warehouse dispatch logs and starts client shipping track." }
    ],
    caseStudyTitle: "Omnichannel Commerce Hub Refactor",
    caseStudyDesc: "Designed high-performance headless shop routes for an enterprise retailer, boosting checkout conversion ratios by 38%."
  },
  "manufacturing": {
    id: "manufacturing",
    tag: "INDUSTRIAL IOT PLATFORMS",
    title: "Industrial IoT Sensor Monitoring Grids",
    description: "Orchestrate responsive diagnostic monitoring systems reading operational telemetry indicators from assembly line components.",
    metrics: [
      { val: "Enterprise", label: "Sensor Signal Delivery SLA" },
      { val: "25k+", label: "Telemetry Points/Sec" },
      { val: "-35%", label: "Maintenance Cost Overhead" }
    ],
    challenges: [
      { title: "Signal Flooding Logs", desc: "Thousands of hardware sensors writing diagnostic state logs concurrently, blocking servers." },
      { title: "Delayed Failure Alarms", desc: "Queue delays buffering critical failure pings, leading to assembly line shutdowns." },
      { title: "Telemetry Compression", desc: "Staging terabytes of raw telemetry logs without filling database storage grids." }
    ],
    steps: [
      { name: "Sensor Signal Pull", details: "Collects raw diagnostic telemetry feeds from factory line nodes." },
      { name: "Kafka Stream Queue", details: "Buffers thousands of raw inputs safely, preventing system overflows." },
      { name: "Real-time Parser", details: "Evaluates inputs against device anomaly metrics databases in milliseconds." },
      { name: "Emergency Slack Hub", details: "Triggers technician alarms if critical failure signals are detected." }
    ],
    caseStudyTitle: "Smart Factory Diagnostics Grid",
    caseStudyDesc: "Built an IoT diagnostics log portal for a manufacturing plant, dropping conveyor breakdowns by 35% via predictive telemetry."
  },
  "energy": {
    id: "energy",
    tag: "ENERGY & UTILITIES",
    title: "Smart Grid Operations & Telemetry",
    description: "Orchestrate real-time telemetry processing pipelines for power grid distributions and utility analytics.",
    metrics: [
      { val: "Enterprise", label: "Grid Uptime SLA" },
      { val: "40k+", label: "Smart Meters Tracked" },
      { val: "-35%", label: "Outage Duration Decreased" }
    ],
    challenges: [
      { title: "High-Frequency Pings", desc: "Thousands of smart meters sending electrical load packets concurrently, overloading traditional ingestion bases." },
      { title: "Dynamic Load Shifting", desc: "Coordinating grid power storage dispatch routines in real-time response to regional usage peaks." },
      { title: "Obsolete SCADA Software", desc: "Connecting secure web monitoring layers to archaic industrial hardware protocols without exposing control routes." }
    ],
    steps: [
      { name: "Meter Telemetry Pull", details: "Collects load telemetry from physical smart meters." },
      { name: "Kafka Ingestion Queue", details: "Buffers thousands of incoming smart meter signals." },
      { name: "Peak Load Analyser", details: "Evaluates grid demand trends dynamically using AI." },
      { name: "Dynamic Battery Route", details: "Triggers battery cells discharges during load constraints." }
    ],
    caseStudyTitle: "Apex Utility Grid Optimization",
    caseStudyDesc: "Refactored load distribution code for a national utility network, cutting peak outages by 35% via predictive grid analytics."
  },
  "logistics": {
    id: "logistics",
    tag: "LOGISTICS & SUPPLY CHAIN",
    title: "Autonomous Fleet Routing & Warehouse Sync",
    description: "Deploy sub-second route calculation engines and cargo tracking logs to optimize fleet delivery schedules.",
    metrics: [
      { val: "18%", label: "Fuel Expenses Saved" },
      { val: "12k", label: "Daily Shipments Logged" },
      { val: "Optimal", label: "On-Time Dispatch Rate" }
    ],
    challenges: [
      { title: "Real-Time Route Swaps", desc: "Dynamically adjusting travel routes in response to sudden traffic jams or port delays." },
      { title: "Shelf Robotics Jams", desc: "Synchronizing picker robots routes inside automated centers without database lockups." },
      { title: "Fragmented Tracking APIs", desc: "Aggregating telemetry logs from dozens of regional freight carriers under single layouts." }
    ],
    steps: [
      { name: "Transit Signal Push", details: "Gathers GPS and temperature telemetry from delivery trucks." },
      { name: "Route Recalculator Core", details: "Directs trucks to alternative routes during highway blockages." },
      { name: "Robot Dispatch Core", details: "Directs shelf movement speeds inside picking yards." },
      { name: "Delivery Ledger Log", details: "Notes dispatch completion to client ERP structures." }
    ],
    caseStudyTitle: "Nexus LogiRoute Integration",
    caseStudyDesc: "Built real-time transit sync engines for an international courier group, reducing delay occurrences by 40%."
  },
  "proptech": {
    id: "proptech",
    tag: "REAL ESTATE & PROPTECH",
    title: "Decentralized Property Registries & Smart Leases",
    description: "Build high-speed real estate listings search engines and automated smart lease pipelines.",
    metrics: [
      { val: "+35%", label: "Lead Capture Boost" },
      { val: "15ms", label: "Query Execution Speed" },
      { val: "24k", label: "Deals Secured via API" }
    ],
    challenges: [
      { title: "Heavy Listings Queries", desc: "Searching thousands of property records with dozens of geofence bounds timing out standard relational lookups." },
      { title: "Verification Delay Gates", desc: "Processing background validation checks and contract signatures manually." },
      { title: "Obsolete MLS Datapools", desc: "Importing listing datasets from hundreds of regional boards concurrently without data overlaps." }
    ],
    steps: [
      { name: "Listings Search", details: "User searches properties by coordinate filters." },
      { name: "Elasticsearch Index", details: "Fetches matching property files under 15ms." },
      { name: "Credit Score Pull", details: "Validates client income records asynchronously." },
      { name: "Lease Ledger Lock", details: "Stores signed leasing agreements to secure log tables." }
    ],
    caseStudyTitle: "Nexus Property Index Optimization",
    caseStudyDesc: "Optimized property listing indices, delivering search results under 15ms for 5k monthly users."
  },
  "automotive": {
    id: "automotive",
    tag: "AUTOMOTIVE & MOBILITY",
    title: "Connected Vehicle Over-The-Air (OTA) Pipelines",
    description: "Establish secure, low-latency pipelines for OTA firmware distributions and vehicle diagnostic telemetry.",
    metrics: [
      { val: "Enterprise", label: "OTA Firmware Installs" },
      { val: "5k", label: "Connected Vehicles Audited" },
      { val: "-35%", label: "Warranty Recalls Avoided" }
    ],
    challenges: [
      { title: "Interrupted Flash Loops", desc: "Mobile network drops corrupting binary packages during car update installs, disabling units." },
      { title: "Signal Ingestion Spikes", desc: "Vehicles concurrently writing massive engine performance telemetry logs during peak travel hours." },
      { title: "Spoof Hardware Attacks", desc: "Securing firmware signatures to prevent hackers injection of malicious codes into car control lines." }
    ],
    steps: [
      { name: "Vehicle Telemetry Hub", details: "Receives diagnostic error messages from cars." },
      { name: "Signature Authenticator", details: "Verifies telemetry crypt-key signatures." },
      { name: "Firmware Flash Coordinator", details: "Coordinates binary packets delivery." },
      { name: "Unit Inventory Log", details: "Registers vehicle firmware state to main inventory tables." }
    ],
    caseStudyTitle: "Aero OTA Deployment",
    caseStudyDesc: "Engineered secure firmware dispatch nodes for an electric car manufacturer, reducing updates failure events to zero."
  },
  "media": {
    id: "media",
    tag: "ENTERTAINMENT & MEDIA",
    title: "Headless Content Management & Edge Streaming",
    description: "Deploy microservices supporting high-throughput content management and video indexing pipelines.",
    metrics: [
      { val: "+35%", label: "Load Speeds Accelerated" },
      { val: "85k", label: "Content Requests Checked Daily" },
      { val: "Enterprise", label: "CDN Delivery Reliability" }
    ],
    challenges: [
      { title: "Delayed Static Outputs", desc: "Long build queues when releasing thousands of concurrent news pages to global layouts." },
      { title: "Video Transcoding Queues", desc: "Slow compression tasks delaying media availability during trending event coverage." },
      { title: "Live View Traffic Peaks", desc: "Sudden request spikes overloading core databases during live streaming shows." }
    ],
    steps: [
      { name: "Content Publisher", details: "Content creators post updates to custom headless backend." },
      { name: "Transcode Pipeline Queue", details: "Compiles video files into 4K, 1080p, and 720p profiles." },
      { name: "Edge CDN Cache", details: "Stores page contents directly on Edge cache layers globally." },
      { name: "Telemetry Viewer", details: "Tracks reader content choices asynchronously." }
    ],
    caseStudyTitle: "Apex Headless Streaming Setup",
    caseStudyDesc: "Migrated static publishing pipelines to Edge networks, accelerating load speeds by 35% for a major news provider."
  }
};

const getPatchSolution = (challengeTitle: string, industryId: string) => {
  const title = challengeTitle.toLowerCase();
  const id = industryId.toLowerCase();

  if (id === "saas") {
    if (title.includes("lockout")) return "Deploy distributed Redis locking meshes and isolate client datasets dynamically by tenant database schemas.";
    if (title.includes("latency")) return "Bundle splitting and incremental pre-hydration of viewport modules using Geo-routed CDN servers.";
    return "Enforce double-entry database transactions and unique validation headers to ensure ledger events run exactly once.";
  }
  if (id === "healthcare") {
    if (title.includes("fragmentation")) return "Configure a unified HL7/FHIR microservice translator that binds legacy diagnostic files dynamically into structured schemas.";
    if (title.includes("leak")) return "Wrap connections with cryptographic security, strict client signature validation, and field-level AES-256 database encrypts.";
    return "Direct all vital record alterations to an immutable write-once WORM audit registry for secure audit traces.";
  }
  if (id === "fintech") {
    if (title.includes("fraud")) return "Deploy sub-5ms local memory ML threat scanning nodes that intercept payload streams before payment rails.";
    if (title.includes("double-spending")) return "Use strict idempotent routing IDs and lock-free distributed transaction queues to avoid duplicates.";
    return "Build API gateway mapper bridges that convert archaic banking SOAP XML feeds into clean REST JSON schemas instantly.";
  }
  if (id === "education") {
    if (title.includes("de-sync")) return "Merge simultaneous client canvas inputs using Conflict-Free Replicated Data Types (CRDTs) at the socket level.";
    if (title.includes("media")) return "Offload video encoding routines to dynamic GPU shards and adjust packet throughput dynamically per student bandwidth.";
    return "Isolate complex web layouts from heavy calculations using Web Workers to prevent frame drops on legacy devices.";
  }
  if (id === "retail") {
    if (title.includes("inventory")) return "Implement redis-based active stock locks and bind web requests to real-time warehouse count updates.";
    if (title.includes("performance")) return "Pre-render static storefront paths and load catalog product cards using lazy-loading viewport triggers.";
    return "Deploy lightweight event queue synchronizers that bridge brick-and-mortar checkout records with digital inventory indexes.";
  }
  if (id === "manufacturing") {
    if (title.includes("flooding")) return "Buffer incoming IoT logs inside Kafka stream buffers, distributing parse workloads across cluster nodes.";
    if (title.includes("alarms")) return "Enforce high-priority bypass routing queues for failure alerts to bypass default logging queues.";
    return "Compress historical sensor telemetry logs using specialized time-series databases to decrease space overhead by 38%.";
  }
  
  // Generic Fallback
  return "Deploy lock-free memory buffers, custom vector indexing caches, and isolated microservice queues to resolve pipeline bottlenecks.";
};

export default function IndustryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const ind = industriesData[resolvedParams.id];

  const [activeStep, setActiveStep] = useState(0);
  const [expandedChallenge, setExpandedChallenge] = useState<number | null>(null);

  if (!ind) {
    notFound();
  }

  // Cycle through flow steps dynamically every 2.5 seconds to represent real-time data tracing
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % ind.steps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [ind.steps.length]);

  return (
    <div className={styles.industrySection}>
      <div className="container">
        
        {/* Industry Hero Header */}
        <div className={styles.heroBlock}>
          <span className={styles.tagline}>{ind.tag}</span>
          <h1 className={styles.title}>{ind.title}</h1>
          <p className={styles.desc}>{ind.description}</p>
        </div>

      </div>

      {/* Success Metrics Bento-style Grid */}
      <section className={styles.metricsSection}>
        <div className="container">
          <div className={styles.metricsGrid}>
            {ind.metrics.map((metric, idx) => (
              <div key={idx} className={styles.metricCard}>
                <div className={styles.metricValue}>{metric.val}</div>
                <div className={styles.metricLabel}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asymmetric Split-Screen Industry Challenges */}
      <section className={styles.challengesSection}>
        <div className="container">
          <div className={styles.splitLayout}>
            
            {/* Sticky Left Info Panel */}
            <div className={styles.stickyLeft}>
              <h2 className={styles.subtitle}>Specific Industry Hardships</h2>
              <p className={styles.leftDesc}>
                Operating under strict sector requirements demands custom mitigations. Explore the core bottlenecks and click any issue to reveal our software patch.
              </p>
              
              <div className={styles.telemetryBox}>
                <div className={styles.telemetryTitle}>
                  <Terminal size={14} /> telemetry warnings
                </div>
                <div className={styles.telemetryDesc}>
                  Detected 3 compliance constraints. Click on the cards to compile real-time software resolution strategies.
                </div>
              </div>
            </div>

            {/* Expandable Right Challenge List */}
            <div className={styles.challengesList}>
              {ind.challenges.map((c, idx) => {
                const isOpen = expandedChallenge === idx;
                return (
                  <div
                    key={idx}
                    className={styles.challengeCard}
                    onClick={() => setExpandedChallenge(isOpen ? null : idx)}
                  >
                    <div className={styles.challengeHeader}>
                      <div className={styles.challengeTitleBlock}>
                        <Cpu size={18} color="var(--accent-primary)" />
                        <h3 className={styles.challengeTitle}>{c.title}</h3>
                      </div>
                      <ArrowDown
                        size={16}
                        color="var(--text-secondary)"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform 0.3s ease"
                        }}
                      />
                    </div>
                    <p className={styles.challengeDesc}>{c.desc}</p>

                    {/* Expandable Patch Solution */}
                    <div className={`${styles.patchWrapper} ${isOpen ? styles.patchWrapperOpen : ""}`}>
                      <div className={styles.patchBox}>
                        <div className={styles.patchLabel}>
                          <ShieldCheck size={14} /> CyberEssays Shield Patch
                        </div>
                        <p className={styles.patchDesc}>
                          {getPatchSolution(c.title, ind.id)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Sequential Glowing Flow Architecture Diagram */}
      <section className={styles.architectureSection}>
        <div className="container">
          
          <div className={styles.diagramBox}>
            <div className={styles.diagramHeader}>
              <span className={styles.diagramLabel}>System Flow Architecture</span>
              <div className={styles.diagramLegend}>
                <div className={styles.legendDot}></div>
                <span>Active Routing Simulation</span>
              </div>
            </div>
            
            <div className={styles.flowRow}>
              {ind.steps.map((step, idx) => {
                const isActive = activeStep === idx;
                return (
                  <React.Fragment key={idx}>
                    <div className={`${styles.flowNode} ${isActive ? styles.flowNodeActive : ""}`}>
                      <div className={styles.stepNumber} style={{ color: isActive ? "var(--accent-secondary)" : "var(--text-secondary)" }}>
                        0{idx + 1}
                      </div>
                      <div className={styles.nodeName}>{step.name}</div>
                      <div className={styles.nodeDetails}>{step.details}</div>
                    </div>
                    {idx < ind.steps.length - 1 && (
                      <ArrowRight size={18} color="var(--text-secondary)" className={styles.flowArrow} style={{ alignSelf: "center", opacity: isActive ? 0.9 : 0.3 }} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* Embedded Spotlight Case Study */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className={`container ${styles.caseStudyCard}`}>
          <span className={styles.tagline}>Success Spotlight</span>
          <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
            {ind.caseStudyTitle}
          </h2>
          <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
            {ind.caseStudyDesc}
          </p>
          <Link href="/case-studies" className="magnetic-btn btn-primary" style={{ padding: "0.85rem 2.25rem" }}>
            Read Strategic Journey
          </Link>
        </div>
      </section>

    </div>
  );
}
