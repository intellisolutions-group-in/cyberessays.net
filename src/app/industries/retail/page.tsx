"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./retail.module.css";
import { ShoppingBag, Terminal, Lock, Server, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sku: string;
  details: string;
  stock: number;
  maxStock: number;
}

interface LogEntry {
  id: string;
  timestamp: string;
  type: "check" | "info" | "success";
  text: string;
}

export default function RetailIndustryPage() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "prod-1",
      name: "Hyperion Smart Kiosk",
      sku: "HY-903",
      details: "Self-checkout UI edge nodes with offline caching",
      stock: 14,
      maxStock: 25,
    },
    {
      id: "prod-2",
      name: "Aero Warehouse Tag",
      sku: "AW-112",
      details: "UHF RFID tags for millisecond inventory routing",
      stock: 32,
      maxStock: 50,
    },
    {
      id: "prod-3",
      name: "Optima Scale Scanner",
      sku: "OS-407",
      details: "Visual AI object recognition cash-register modules",
      stock: 5,
      maxStock: 10,
    },
  ]);

  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "log-init-1",
      timestamp: "16:30:00",
      type: "info",
      text: "SYSTEM_INIT: Connected to PostgreSQL main database replica cluster.",
    },
    {
      id: "log-init-2",
      timestamp: "16:30:01",
      type: "check",
      text: "CACHE_VERIFY: Redis cloud cluster health - OK (14 endpoints active).",
    },
    {
      id: "log-init-3",
      timestamp: "16:30:02",
      type: "info",
      text: "EDGE_SYNC: Multi-region synchronization initialized for CyberEssays storefront routing.",
    },
  ]);

  const [totalOrders, setTotalOrders] = useState(1284);
  const [syncLatency, setSyncLatency] = useState(10.2);
  const [cacheHitIndex, setCacheHitIndex] = useState(0.998);
  const [activeStep, setActiveStep] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal to bottom when logs update
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Periodic background check log simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour12: false });
      const randomType = Math.random();

      if (randomType < 0.4) {
        setLogs((prev) => [
          ...prev,
          {
            id: `log-bg-${Date.now()}`,
            timestamp: timeStr,
            type: "check",
            text: "QUERY_HEALTH: Cloudflare edge nodes reporting normal traffic. TTL cache holds.",
          },
        ]);
        setCacheHitIndex((prev) => parseFloat(Math.min(0.999, Math.max(0.995, prev + (Math.random() - 0.5) * 0.001)).toFixed(3)));
      } else if (randomType < 0.7) {
        const lat = parseFloat((8 + Math.random() * 4).toFixed(1));
        setSyncLatency(lat);
        setLogs((prev) => [
          ...prev,
          {
            id: `log-bg-${Date.now()}`,
            timestamp: timeStr,
            type: "info",
            text: `TELEMETRY_SYNC: Dynamic CDN route latency checked: ${lat}ms. Nodes: 14/14 healthy.`,
          },
        ]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.id === productId && p.stock > 0) {
          const updatedStock = p.stock - 1;
          const timeStr = new Date().toLocaleTimeString([], { hour12: false });

          // Visual Step Animation sequence
          setActiveStep(0);
          setCacheHitIndex(0.12); // Temporarily drops on invalidation simulation
          setSyncLatency(18.5);

          // Step 1: Ingress order
          setTimeout(() => {
            setActiveStep(1);
            setLogs((prev) => [
              ...prev,
              {
                id: `log-buy-1-${Date.now()}`,
                timestamp: timeStr,
                type: "info",
                text: `ORDER_RECEIVED: Storefront checkout triggered for ${p.name} (SKU: ${p.sku}). Decrementing local stock.`,
              },
            ]);
            setTotalOrders((o) => o + 1);
          }, 400);

          // Step 2: Cache invalidation
          setTimeout(() => {
            setActiveStep(2);
            setLogs((prev) => [
              ...prev,
              {
                id: `log-buy-2-${Date.now()}`,
                timestamp: timeStr,
                type: "info",
                text: `CACHE_INVALIDATE: Purging edge cache key 'product:${p.sku}:availability'.`,
              },
            ]);
            setCacheHitIndex(0.998); // Recovers
          }, 800);

          // Step 3: DB transactional update
          setTimeout(() => {
            setActiveStep(3);
            setLogs((prev) => [
              ...prev,
              {
                id: `log-buy-3-${Date.now()}`,
                timestamp: timeStr,
                type: "check",
                text: `DB_COMMIT: Written inventory debit block to main PostgreSQL catalog. Stock now at ${updatedStock}.`,
              },
            ]);
          }, 1200);

          // Step 4: Edge CDN sync complete
          setTimeout(() => {
            setActiveStep(4);
            const finalLatency = parseFloat((6 + Math.random() * 4).toFixed(1));
            setSyncLatency(finalLatency);
            setLogs((prev) => [
              ...prev,
              {
                id: `log-buy-4-${Date.now()}`,
                timestamp: timeStr,
                type: "success",
                text: `EDGE_SYNC_COMPLETE: Broadcasted inventory level update (${updatedStock}/${p.maxStock}) globally in ${finalLatency}ms.`,
              },
            ]);
          }, 1600);

          // Reset active step highlights
          setTimeout(() => {
            setActiveStep(-1);
          }, 2400);

          return { ...p, stock: updatedStock };
        }
        return p;
      })
    );
  };

  const handleRestock = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });

    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        if (p.stock < p.maxStock) {
          return { ...p, stock: p.maxStock };
        }
        return p;
      })
    );

    setLogs((prev) => [
      ...prev,
      {
        id: `log-restock-${Date.now()}`,
        timestamp: timeStr,
        type: "success",
        text: "RESTOCK_EVENT: Dispatched manual restock triggers. Reset all inventory levels to max targets.",
      },
    ]);
  };

  // Speedometer Needle Rotations (Calculated based on index values)
  const cacheHitAngle = (cacheHitIndex * 180) - 90; // sweep from -90deg (0.0) to 90deg (1.0)
  const latencyAngle = Math.min(90, Math.max(-90, ((syncLatency / 20) * 180) - 90));

  return (
    <div className={styles.retailPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Headless Commerce & Logistics</span>
          <h1 className={styles.title}>Unified Storefront & Inventory Sync</h1>
          <p className={styles.desc}>
            We engineer low-latency serverless APIs for distributed digital storefronts, powering instantaneous inventory tracking, transactional ledgers, and edge CDN cache updates.
          </p>
        </div>

        {/* Bespoke Three-Column Layout Grid */}
        <div className={styles.mainThreeColGrid}>
          
          {/* Column 1: Storefront Sandbox */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <ShoppingBag size={18} color="var(--accent-secondary)" /> Storefront Sandbox
              </span>
              <button
                className={styles.buyBtn}
                style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", padding: "0.3rem 0.8rem", fontSize: "0.75rem" }}
                onClick={handleRestock}
              >
                Restock All
              </button>
            </div>
            
            <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
              Clicking buy triggers atomic inventory decrement, purges cache key across CDN edge proxy servers, and writes state commits.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginTop: "0.5rem" }}>
              {products.map((product) => (
                <div key={product.id} style={{ background: "rgba(4, 8, 20, 0.4)", border: "var(--border-light)", borderRadius: "8px", padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{product.name}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>SKU: {product.sku}</span>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--accent-secondary)" }}>
                      {product.stock === 0 ? "OUT OF STOCK" : `${product.stock} items available`}
                    </span>
                  </div>
                  <button
                    className={styles.buyBtn}
                    onClick={() => handleBuy(product.id)}
                    disabled={product.stock === 0}
                    style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}
                  >
                    {product.stock === 0 ? "Sold Out" : "Buy Item"}
                  </button>
                </div>
              ))}
            </div>

            {/* Sync Pipeline Progress Visualizer */}
            <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase", display: "block", marginBottom: "0.5rem" }}>
                Active Synchronization Pipeline
              </span>
              <div className={styles.pipelineStepsGrid}>
                {[
                  { id: 1, label: "Ingress" },
                  { id: 2, label: "Invalidate" },
                  { id: 3, label: "DB Commit" },
                  { id: 4, label: "CDN Sync" }
                ].map((step) => (
                  <div
                    key={step.id}
                    style={{
                      background: activeStep >= step.id ? "rgba(6, 182, 212, 0.15)" : "rgba(255,255,255,0.02)",
                      border: activeStep >= step.id ? "1px solid var(--accent-secondary)" : "1px solid rgba(255,255,255,0.04)",
                      borderRadius: "4px",
                      padding: "0.3rem 0.1rem",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: activeStep >= step.id ? "var(--accent-secondary)" : "var(--text-secondary)",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {step.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Edge Cache Speedometers & Latency Dial */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1.5rem", justifyContent: "center" }}>
            <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Zap size={18} color="var(--accent-secondary)" /> Edge Speedometers
            </span>

            {/* Gauge Dials Container */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: "center" }}>
              
              {/* Speedometer 1: Cache Hit Index */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", width: "100%", background: "rgba(4, 8, 20, 0.3)", borderRadius: "10px", padding: "1rem", border: "var(--border-light)" }}>
                <div style={{ position: "relative", width: "70px", height: "70px" }}>
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%", transform: "rotate(0deg)" }}>
                    {/* Dial Arc */}
                    <path
                      d="M 20 80 A 40 40 0 1 1 80 80"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 80 A 40 40 0 1 1 80 80"
                      fill="none"
                      stroke="var(--accent-secondary)"
                      strokeWidth="8"
                      strokeDasharray="188"
                      strokeDashoffset={188 - (cacheHitIndex * 188)}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 0.4s ease" }}
                    />
                    {/* Needle */}
                    <line
                      x1="50" y1="50" x2="50" y2="22"
                      stroke="var(--accent-highlight)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{
                        transform: `rotate(${cacheHitAngle}deg)`,
                        transformOrigin: "50px 50px",
                        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      }}
                    />
                    <circle cx="50" cy="50" r="5" fill="#fff" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Cache Hit Index</span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", fontFamily: "monospace", marginTop: "0.1rem" }}>
                    {cacheHitIndex}
                  </div>
                </div>
              </div>

              {/* Speedometer 2: Synchronization Latency */}
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", width: "100%", background: "rgba(4, 8, 20, 0.3)", borderRadius: "10px", padding: "1rem", border: "var(--border-light)" }}>
                <div style={{ position: "relative", width: "70px", height: "70px" }}>
                  <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
                    <path
                      d="M 20 80 A 40 40 0 1 1 80 80"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 20 80 A 40 40 0 1 1 80 80"
                      fill="none"
                      stroke="var(--accent-secondary)"
                      strokeWidth="8"
                      strokeDasharray="188"
                      strokeDashoffset={188 - (Math.min(20, syncLatency) / 20 * 188)}
                      strokeLinecap="round"
                      style={{ transition: "stroke-dashoffset 0.4s ease" }}
                    />
                    {/* Needle */}
                    <line
                      x1="50" y1="50" x2="50" y2="22"
                      stroke="var(--accent-highlight)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      style={{
                        transform: `rotate(${latencyAngle}deg)`,
                        transformOrigin: "50px 50px",
                        transition: "transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
                      }}
                    />
                    <circle cx="50" cy="50" r="5" fill="#fff" />
                  </svg>
                </div>
                <div>
                  <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Sync Latency</span>
                  <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "#fff", fontFamily: "monospace", marginTop: "0.1rem" }}>
                    {syncLatency} ms
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Column 3: Terminal Logs */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Terminal size={18} color="var(--accent-secondary)" /> Inventory sync
              </span>
              <span style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                padding: "0.1rem 0.4rem",
                borderRadius: "4px",
                border: "1px solid var(--accent-success)",
                background: "rgba(16,185,129,0.05)",
                color: "var(--accent-success)",
              }}>
                STANDBY
              </span>
            </div>

            <div className={styles.terminal} ref={terminalRef} style={{ height: "300px" }}>
              {logs.map((log) => (
                <div key={log.id} style={{ fontSize: "0.7rem", lineHeight: 1.4, marginBottom: "0.25rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>[{log.timestamp}]</span>{" "}
                  <span className={log.type === "success" || log.type === "check" ? styles.logCheck : ""}>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ background: "rgba(4, 8, 20, 0.4)", border: "var(--border-light)", borderRadius: "8px", padding: "0.75rem", textAlign: "center" }}>
              <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", textTransform: "uppercase", display: "block" }}>Simulated Transactions</span>
              <span style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", fontFamily: "monospace" }}>{totalOrders.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Omnichannel Client Success Showcase (No Specs table/timeline/case study) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-secondary)", letterSpacing: "0.15em" }}>Success Showcase</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginTop: "0.5rem" }}>Logistics Sync Endorsements</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              See how modern retail networks leverage our edge synchronization design templates.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-secondary)", marginBottom: "1rem" }}>
                <Server size={18} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>Storefront Operations Lead</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;Deploying these low-latency edge catalog synchronization structures cut our catalog sync delays from seconds to milliseconds, removing storefront stock desynchronization errors.&quot;
              </p>
              <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Priya Mehta</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>VP of Storefront Infrastructure</span>
              </div>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-secondary)", marginBottom: "1rem" }}>
                <Lock size={18} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>Warehouse Operations Director</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;The row lock database triggers keep inventory tracking solid. We avoid double checkout errors even during heavy flash traffic surges.&quot;
              </p>
              <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Rajesh Kumar</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Director of Platform Engineering</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
