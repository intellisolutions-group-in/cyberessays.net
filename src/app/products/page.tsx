"use client";

import React, { useState } from "react";
import styles from "./products.module.css";
import { Server, Layers, Activity, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AllProductsPage() {
  const [activeProduct, setActiveProduct] = useState<"icedeploy" | "iceinsight">("icedeploy");
  const [nodes, setNodes] = useState(6);
  const [traffic, setTraffic] = useState(12000); // Requests/sec

  // Derived metrics based on selected product and configuration
  const syncDelay = parseFloat((0.8 + (traffic / 25000) + (nodes / 12)).toFixed(2));
  
  // IceDeploy specific metrics
  const deployTime = Math.round(12 + (nodes * 0.7));
  const deploymentSla = parseFloat((99.999 - (nodes * 0.0001)).toFixed(4));

  // IceInsight specific metrics
  const ingestRate = Math.round(traffic * 3.2);
  const telemetryQueryDelay = parseFloat((1.2 + (traffic / 18000)).toFixed(1));

  return (
    <div className={styles.productsPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>CyberEssays Software Suite</span>
          <h1 className={styles.title}>Cloud Orchestration & Telemetry Systems</h1>
          <p className={styles.desc}>
            We build state-of-the-art developer tooling to coordinate multi-region microservice lifecycles, automate GitOps deployments, and capture high-frequency system traces.
          </p>
        </div>

        {/* Layout Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Column: Product Selection */}
          <div className={styles.productsList}>
            {/* Card 1: IceDeploy */}
            <div 
              className={`${styles.productCard} ${activeProduct === "icedeploy" ? styles.productCardActive : ""}`}
              onClick={() => setActiveProduct("icedeploy")}
            >
              <div className={styles.iconBox}>
                <Layers size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>IceDeploy</h3>
                <p className={styles.productDetails}>
                  Automated GitOps release pipeline and multi-tenant Docker cluster scheduler. Deploy secure application builds globally in seconds under declarative replica variables.
                </p>
                <Link href="/products/icedeploy" className={styles.linkGroup}>
                  Explore IceDeploy Features <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Card 2: IceInsight */}
            <div 
              className={`${styles.productCard} ${activeProduct === "iceinsight" ? styles.productCardActive : ""}`}
              onClick={() => setActiveProduct("iceinsight")}
            >
              <div className={styles.iconBox}>
                <Activity size={24} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.productName}>IceInsight</h3>
                <p className={styles.productDetails}>
                  High-frequency metrics tracer, distributed query flame graphs, and automated database locking alert monitors. Gain deep diagnostics in milliseconds.
                </p>
                <Link href="/products/iceinsight" className={styles.linkGroup}>
                  Explore IceInsight Observability <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Estimator */}
          <div className={styles.estimatorCard}>
            <div className={styles.cardHeader}>
              <Server size={20} color="var(--accent-secondary)" />
              Infrastructure Estimator
            </div>
            
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Customize your target server cluster parameters to estimate system performance indicators under active {activeProduct === "icedeploy" ? "IceDeploy" : "IceInsight"} nodes.
            </p>

            {/* Slider 1: Nodes */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Target Node Clusters</span>
                <span className={styles.sliderVal}>{nodes} Servers</span>
              </div>
              <input 
                type="range" 
                min="2" 
                max="64" 
                value={nodes} 
                onChange={(e) => setNodes(parseInt(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Slider 2: Requests */}
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span>Workload Peak Traffic</span>
                <span className={styles.sliderVal}>{(traffic / 1000).toFixed(0)}k Req/s</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000" 
                value={traffic} 
                onChange={(e) => setTraffic(parseInt(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Dynamic Calculated Metrics */}
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "1rem", letterSpacing: "0.05em" }}>
                Estimated Performance Indicators
              </div>
              
              <div className={styles.metricsGrid}>
                {activeProduct === "icedeploy" ? (
                  <>
                    <div className={styles.metricTile}>
                      <div className={styles.metricVal}>{deployTime}s</div>
                      <div className={styles.metricLabel}>Deployment Pipeline Velocity</div>
                    </div>
                    <div className={styles.metricTile}>
                      <div className={styles.metricVal}>{deploymentSla}%</div>
                      <div className={styles.metricLabel}>Deploy Success Rate SLA</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.metricTile}>
                      <div className={styles.metricVal}>{ingestRate.toLocaleString()} pts/s</div>
                      <div className={styles.metricLabel}>Trace Data Ingest Rate</div>
                    </div>
                    <div className={styles.metricTile}>
                      <div className={styles.metricVal}>{telemetryQueryDelay}ms</div>
                      <div className={styles.metricLabel}>Observability Query Indexing</div>
                    </div>
                  </>
                )}
                
                <div className={styles.metricTile}>
                  <div className={styles.metricVal}>{syncDelay}ms</div>
                  <div className={styles.metricLabel}>Gateway Sync Latency</div>
                </div>
                
                <div className={styles.metricTile}>
                  <div className={styles.metricVal} style={{ fontSize: "0.95rem" }}>Custom Quote</div>
                  <div className={styles.metricLabel}>Enterprise Infrastructure</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
