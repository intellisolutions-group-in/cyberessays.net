"use client";

import React, { useState } from "react";
import styles from "./api-design.module.css";
import { Send, Link as LinkIcon, Database, CheckCircle, Cpu, Activity } from "lucide-react";
import Link from "next/link";

interface Endpoint {
  path: string;
  method: "GET" | "POST" | "gRPC";
  description: string;
}

export default function ApiDesignPage() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<number>(0);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState<"proto" | "graphql" | "json">("proto");
  const [response, setResponse] = useState<string>(
    `// Sandbox Output Console\n// Select an endpoint on the left and click 'Send Payload' to parse response.`
  );

  const endpoints: Endpoint[] = [
    { path: "/api/v1/records/query", method: "GET", description: "Fetch telemetry records list" },
    { path: "/api/v1/records/create", method: "POST", description: "Submit transaction telemetry payload" },
    { path: "transfers.v1.TransferService/Send", method: "gRPC", description: "Stream binary transactions to shard" }
  ];

  const protoCode = `syntax = "proto3";
package transfers.v1;

message TransferRequest {
  string sender_id = 1;
  string target_shard = 2;
  int32 payload_units = 3;
}

message TransferResponse {
  string transaction_id = 1;
  string status = 2;
  int64 timestamp = 3;
}`;

  const gqlCode = `type TelemetryRecord {
  id: ID!
  timestamp: String!
  payloadUnits: Int!
  status: String!
}

type Query {
  getTelemetry(limit: Int!): [TelemetryRecord!]!
}

type Mutation {
  createTelemetry(units: Int!): TelemetryRecord!
}`;

  const jsonSchema = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "TelemetryPayload",
  "type": "object",
  "properties": {
    "units": { "type": "integer", "minimum": 1 },
    "shard": { "type": "string" }
  },
  "required": ["units", "shard"]
}`;

  const currentEndpoint = endpoints[selectedEndpoint];

  const handleSend = () => {
    if (isSending) return;
    setIsSending(true);
    setResponse("// Resolving DNS gateway endpoint...\n// Establishing type-safe network socket...");

    setTimeout(() => {
      if (currentEndpoint.method === "GET") {
        setResponse(
          JSON.stringify(
            {
              status: 200,
              statusText: "OK",
              latency: "12ms",
              headers: { "content-type": "application/json", "x-cache": "HIT" },
              data: [
                { id: 4091, username: "dev_user", status: "active", units: 140 },
                { id: 4092, username: "ops_admin", status: "standby", units: 280 }
              ]
            },
            null,
            2
          )
        );
      } else if (currentEndpoint.method === "POST") {
        setResponse(
          JSON.stringify(
            {
              status: 201,
              statusText: "Created",
              latency: "28ms",
              headers: { "content-type": "application/json", "x-database-transaction": "COMMITTED" },
              data: {
                id: 4093,
                username: "new_profile",
                units: 450,
                created_at: new Date().toISOString()
              }
            },
            null,
            2
          )
        );
      } else {
        setResponse(
          `// gRPC Stream Response (Binary Protocol)\n{\n  "transaction_id": "tx_${Math.random().toString(36).substring(7)}",\n  "status": "SUCCESS",\n  "timestamp": ${Date.now()},\n  "latency": "1.8ms"\n}`
        );
      }
      setIsSending(false);
    }, 1100);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>API Design & Integrations</span>
          <h1 className={styles.title}>Type-Safe Connective Architectures</h1>
          <p className={styles.desc}>
            We engineer high-performance, type-safe API gateways and structured microservice tunnels using gRPC and GraphQL, decoupling complex legacy backends cleanly.
          </p>
        </div>

        {/* 3-Column Workspace Layout */}
        <div className={styles.sandboxWorkspaceGrid}>
          
          {/* Column 1: API Endpoint Tree */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>Endpoint Directory</span>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {endpoints.map((ep, idx) => (
                <button
                  key={ep.path}
                  type="button"
                  onClick={() => setSelectedEndpoint(idx)}
                  style={{
                    background: selectedEndpoint === idx ? "rgba(6, 182, 212, 0.08)" : "rgba(255, 255, 255, 0.02)",
                    border: selectedEndpoint === idx ? "1px solid var(--accent-secondary)" : "1px solid rgba(255, 255, 255, 0.05)",
                    borderRadius: "8px",
                    padding: "0.75rem",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      background: ep.method === "GET" ? "rgba(16, 185, 129, 0.12)" : ep.method === "POST" ? "rgba(59, 130, 246, 0.12)" : "rgba(124, 58, 237, 0.12)",
                      color: ep.method === "GET" ? "var(--accent-success)" : ep.method === "POST" ? "var(--accent-primary)" : "var(--accent-secondary)",
                      padding: "0.15rem 0.4rem",
                      borderRadius: "4px"
                    }}>{ep.method}</span>
                    <span style={{ fontSize: "0.7rem", color: "#fff", fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}>{ep.path}</span>
                  </div>
                  <div style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>{ep.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Sandbox Gateway Client */}
          <div className={styles.clientCard} style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={styles.cardTitle} style={{ fontSize: "0.95rem" }}>
                <LinkIcon size={14} color="var(--accent-secondary)" /> Sandbox API Gateway Client
              </span>
              <span style={{ fontSize: "0.65rem", color: "var(--accent-success)", fontFamily: "monospace" }}>[ONLINE]</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input 
                  type="text" 
                  value={currentEndpoint.path} 
                  readOnly 
                  className={styles.urlInput}
                  style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.06)", cursor: "not-allowed" }}
                />
                <button 
                  type="button"
                  className={styles.sendBtn}
                  onClick={handleSend}
                  disabled={isSending}
                  style={{ padding: "0.5rem 1rem", fontSize: "0.75rem" }}
                >
                  <Send size={10} style={{ marginRight: "0.25rem" }} /> Send Payload
                </button>
              </div>

              <div className={styles.terminal} style={{ height: "180px", fontSize: "0.75rem" }}>
                {response}
              </div>
            </div>
          </div>

          {/* Column 3: Schema Definitions Panel */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-lg)", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", gap: "0.25rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", paddingBottom: "0.5rem" }}>
              {(["proto", "graphql", "json"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  style={{
                    background: activeTab === tab ? "rgba(255,255,255,0.05)" : "transparent",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.25rem 0.5rem",
                    fontSize: "0.65rem",
                    fontWeight: activeTab === tab ? 700 : 400,
                    color: activeTab === tab ? "#fff" : "var(--text-secondary)",
                    cursor: "pointer",
                    textTransform: "uppercase"
                  }}
                >
                  {tab === "proto" ? "Proto Schema" : tab === "graphql" ? "GraphQL" : "JSON Spec"}
                </button>
              ))}
            </div>

            <pre style={{
              background: "#040814",
              border: "1px solid rgba(255,255,255,0.04)",
              borderRadius: "6px",
              padding: "0.75rem",
              fontFamily: "monospace",
              fontSize: "0.65rem",
              color: "var(--accent-secondary)",
              height: "200px",
              overflow: "auto",
              margin: 0,
              whiteSpace: "pre"
            }}>
              {activeTab === "proto" ? protoCode : activeTab === "graphql" ? gqlCode : jsonSchema}
            </pre>
          </div>

        </div>

        {/* Bespoke Interactive Component: Dynamic gRPC Microservices Route Diagram */}
        <section style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2.5rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-secondary)", letterSpacing: "0.1em" }}>Network Ingress Topology</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>gRPC Gateway Request Routing</h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              Watch client packets get dynamically parsed and shunted across secondary microservices database clusters.
            </p>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", maxWidth: "600px", margin: "0 auto", height: "140px" }}>
            {/* SVG Connector Lines */}
            <svg style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 1, pointerEvents: "none" }}>
              <path d="M 60,70 L 250,70" stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
              <path d="M 270,60 L 480,25" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 270,70 L 480,70" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M 270,80 L 480,115" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Client Device Node */}
            <div style={{ zIndex: 2, background: "#050a1a", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "0.75rem", textAlign: "center", width: "100px" }}>
              <Cpu size={20} color="var(--text-secondary)" style={{ margin: "0 auto 0.25rem" }} />
              <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#fff" }}>Client Device</div>
              <span style={{ fontSize: "0.55rem", color: "var(--text-secondary)" }}>Packet Out</span>
            </div>

            {/* API Ingress Node */}
            <div style={{ zIndex: 2, background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.3)", borderRadius: "50%", width: "80px", height: "80px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <Activity size={20} color="var(--accent-primary)" className="pulse" />
              <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "#fff", marginTop: "0.15rem" }}>Ingress WAF</div>
            </div>

            {/* Backend Replica Cluster Nodes */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", zIndex: 2 }}>
              {["Replica Node A", "Replica Node B", "Replica Node C"].map((nodeName, idx) => (
                <div key={idx} style={{ background: "rgba(16, 185, 129, 0.08)", border: "1px solid rgba(16, 185, 129, 0.25)", borderRadius: "6px", padding: "0.4rem 0.8rem", display: "flex", alignItems: "center", gap: "0.5rem", width: "140px" }}>
                  <Database size={12} color="var(--accent-success)" />
                  <span style={{ fontSize: "0.65rem", color: "#fff", fontFamily: "monospace" }}>{nodeName}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security & Audit Checkpoints Grid (Replacing Specs Table) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className={styles.sectionTag}>Type Integrity</span>
            <h2 className={styles.sectionTitle}>API Safety Checkpoints</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
              We enforce strict type boundaries across compilation runs to insulate application logic.
            </p>
          </div>

          <div className={styles.checkpointsGrid}>
            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-light)", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-success)", marginBottom: "0.75rem" }}>
                <CheckCircle size={18} />
                <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700 }}>Strict Swagger Schema Validation</h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Every public endpoint undergoes validation sweeps against active JSON definitions to isolate database operations from malformed attributes.
              </p>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-light)", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-success)", marginBottom: "0.75rem" }}>
                <CheckCircle size={18} />
                <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700 }}>Protobuf Compilation Lock</h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Our backend microservices automatically compile RPC interface changes into strict binary serialization layers, preventing parameter mismatches.
              </p>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-light)", borderRadius: "10px", padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-success)", marginBottom: "0.75rem" }}>
                <CheckCircle size={18} />
                <h4 style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 700 }}>Token Expiry Enforcement</h4>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                Edge gateway nodes audit header signatures continuously, immediately blocking requests with invalid or outdated identity credentials.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline} style={{ color: "var(--accent-secondary)" }}>Success Spotlight</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              Enterprise API Gateway
            </h2>
            <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
              Engineered high-performance REST and gRPC gateway routers managing massive transaction inflows with sub-15ms sync rates across regional zones.
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
