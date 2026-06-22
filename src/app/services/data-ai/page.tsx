"use client";

import React, { useState } from "react";
import styles from "./data-ai.module.css";
import { Brain, Play, Database, Network, Server, ChevronRight } from "lucide-react";
import Link from "next/link";

interface EmbeddedPoint {
  id: string;
  word: string;
  x: number;
  y: number;
  similarity: number;
}

interface PipelineNode {
  id: number;
  title: string;
  status: string;
  format: string;
  desc: string;
  icon: React.ReactNode;
  samplePayload: string;
}

export default function DataAiPage() {
  const [inputText, setInputText] = useState("neural");
  const [points, setPoints] = useState<EmbeddedPoint[]>([
    { id: "1", word: "neural", x: 250, y: 120, similarity: 1.0 },
    { id: "2", word: "vector", x: 210, y: 80, similarity: 0.88 },
    { id: "3", word: "search", x: 290, y: 150, similarity: 0.82 },
    { id: "4", word: "database", x: 140, y: 190, similarity: 0.45 },
    { id: "5", word: "checkout", x: 380, y: 50, similarity: 0.18 }
  ]);
  const [isMapping, setIsMapping] = useState(false);
  const [selectedNode, setSelectedNode] = useState(0);

  // Model parameters
  const [temp, setTemp] = useState<number>(0.2);
  const [workers, setWorkers] = useState<number>(64);

  const calculateSimilarity = (word: string) => {
    // Generate deterministic similarity mock values
    const hash = word.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const wordsList = [
      { term: "vector", sim: Number((0.85 + (hash % 15) / 100).toFixed(2)) },
      { term: "search", sim: Number((0.75 + (hash % 20) / 100).toFixed(2)) },
      { term: "sharding", sim: Number((0.35 + (hash % 30) / 100).toFixed(2)) },
      { term: "checkout", sim: Number((0.10 + (hash % 15) / 100).toFixed(2)) }
    ];
    return wordsList;
  };

  const mapToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isMapping) return;

    setIsMapping(true);

    setTimeout(() => {
      const hash = inputText.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const mainX = 100 + (hash % 300);
      const mainY = 50 + (hash % 140);
      
      const sims = calculateSimilarity(inputText);
      
      const newPoints: EmbeddedPoint[] = [
        { id: "main", word: inputText.toLowerCase(), x: mainX, y: mainY, similarity: 1.0 },
        { id: "s-1", word: sims[0].term, x: mainX - 40 + (hash % 80), y: mainY - 40 + (hash % 80), similarity: sims[0].sim },
        { id: "s-2", word: sims[1].term, x: mainX - 60 + (hash % 120), y: mainY - 60 + (hash % 120), similarity: sims[1].sim },
        { id: "s-3", word: sims[2].term, x: mainX - 100 + (hash % 200), y: mainY - 100 + (hash % 200), similarity: sims[2].sim },
        { id: "s-4", word: sims[3].term, x: mainX - 120 + (hash % 240), y: mainY - 120 + (hash % 240), similarity: sims[3].sim }
      ];

      setPoints(newPoints);
      setIsMapping(false);
    }, 800);
  };

  const pipelineNodes: PipelineNode[] = [
    {
      id: 0,
      title: "Raw Data Ingest",
      status: "ACTIVE POLLING",
      format: "JSON, CSV",
      desc: "Triggers continuously on new directory writes, parsing unstructured log data and aligning timestamp headers.",
      icon: <Server size={18} />,
      samplePayload: `{\n  "source": "s3://records-bucket",\n  "format": "JSON",\n  "file_size_kb": 240,\n  "raw_lines_parsed": 1200\n}`
    },
    {
      id: 1,
      title: "Neural Vectorizer",
      status: "STABLE",
      format: "1536-Dimension Float",
      desc: "Generates high-dimensional vector representations using local embedding models insulated within VPC boundaries.",
      icon: <Brain size={18} />,
      samplePayload: `{\n  "model": "text-embedding-3",\n  "tokens": 42,\n  "dimensions": 1536,\n  "vector_coordinates": [0.18, -0.92, 0.45, 0.72, "..."]\n}`
    },
    {
      id: 2,
      title: "HNSW DB Indexing",
      status: "ACTIVE SHARD SYNC",
      format: "Pinecone / Milvus Cluster",
      desc: "Stores vector floats in a Hierarchical Navigable Small World (HNSW) graph for rapid nearest-neighbor search retrieval.",
      icon: <Database size={18} />,
      samplePayload: `{\n  "index_namespace": "telemetry-v1",\n  "hnsw_m_factor": 16,\n  "metric": "cosine_similarity",\n  "write_status": "COMMITTED"\n}`
    },
    {
      id: 3,
      title: "Agentic Loop",
      status: "LISTENING FOR HOOKS",
      format: "Dynamic Tool Callbacks",
      desc: "Queries the vector index to resolve context payloads, feeding verified data directly into target operational databases.",
      icon: <Network size={18} />,
      samplePayload: `{\n  "agent_decision": "TOOL_CALL",\n  "resolved_entities": ["sharding", "replica"],\n  "confidence_score": 0.94,\n  "latency_ms": 14\n}`
    }
  ];

  const currentNode = pipelineNodes[selectedNode];

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Data & AI Orchestration</span>
          <h1 className={styles.title}>Neural Parsing & Vector Networks</h1>
          <p className={styles.desc}>
            We deploy scalable data pipelines integrating neural embeddings models, semantic vector caches, and autonomous agent loops directly inside client operations datasets.
          </p>
        </div>

        {/* Vector Similarity Workspace */}
        <div className={styles.proximityGrid}>
          
          {/* Left: Vector coordinates mapping graph */}
          <div className={styles.aiCard}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span className={styles.cardTitle} style={{ fontSize: "1rem" }}>
                <Brain size={18} style={{ color: "var(--accent-primary)" }} /> Interactive Cosine Proximity Graph
              </span>
              <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>Normalized 2D Projection</span>
            </div>

            <form onSubmit={mapToken} className={styles.inputForm}>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className={styles.textInput}
                placeholder="Enter search term..."
                disabled={isMapping}
              />
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isMapping}
              >
                <Play size={10} style={{ marginRight: "0.25rem" }} /> Plot Query
              </button>
            </form>

            <div className={styles.canvasContainer}>
              <svg className={styles.canvas} viewBox="0 0 500 240">
                <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.02)" />
                <line x1="250" y1="0" x2="250" y2="240" stroke="rgba(255,255,255,0.02)" />
                
                {points.map((pt) => {
                  const isCore = pt.similarity === 1.0;
                  return (
                    <g key={pt.id}>
                      <circle 
                        cx={pt.x} 
                        cy={pt.y} 
                        r={isCore ? 7 : 4} 
                        fill={isCore ? "var(--accent-secondary)" : "var(--accent-primary)"}
                        style={{ filter: isCore ? "drop-shadow(0 0 6px var(--accent-secondary))" : "none" }}
                      />
                      <text 
                        x={pt.x + 8} 
                        y={pt.y + 3} 
                        fill={isCore ? "#fff" : "rgba(255,255,255,0.5)"} 
                        fontSize="9" 
                        fontFamily="monospace"
                      >
                        {pt.word} ({pt.similarity})
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Right: Model Parameters Controller */}
          <div className={styles.paramsCard}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>Model Parameters</span>
            
            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span style={{ color: "var(--text-secondary)" }}>LLM Temperature</span>
                <span style={{ color: "var(--accent-secondary)" }}>{temp} (Low Variance)</span>
              </div>
              <input 
                type="range" 
                min="0.1" 
                max="0.9" 
                step="0.1" 
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            <div className={styles.sliderGroup}>
              <div className={styles.sliderHeader}>
                <span style={{ color: "var(--text-secondary)" }}>Parallel Ingest Cores</span>
                <span style={{ color: "var(--accent-primary)" }}>{workers} Workers</span>
              </div>
              <input 
                type="range" 
                min="16" 
                max="128" 
                step="16" 
                value={workers}
                onChange={(e) => setWorkers(Number(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            <div className={styles.statsSummaryBox}>
              <div className={styles.statsSummaryRow}>
                <span>Calculated VRAM limit:</span>
                <span style={{ color: "#fff", fontWeight: 700 }}>{Math.round(20 + workers * 0.4)} GB / 80GB</span>
              </div>
              <div className={styles.statsSummaryRow}>
                <span>Lookup Speed:</span>
                <span style={{ color: "var(--accent-success)", fontWeight: 700 }}>&lt; 14ms (Optimal)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Connected Pipeline Flowchart with JSON payload preview */}
        <section className={styles.pipelineCard}>
          <div className={styles.pipelineHeader}>
            <span className={styles.pipelineTag}>Telemetry Pipeline</span>
            <h2 className={styles.pipelineTitle}>Connected Data Pipeline Schema</h2>
            <p className={styles.pipelineDesc}>
              Select a stage below to view live JSON data formats processed through the vector pipeline.
            </p>
          </div>

          <div className={styles.pipelineGrid}>
            {/* Left Stages lists */}
            <div className={styles.pipelineStageList}>
              {pipelineNodes.map((node) => (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNode(node.id)}
                  className={`${styles.stageBtn} ${selectedNode === node.id ? styles.stageBtnActive : ""}`}
                >
                  <div style={{ color: selectedNode === node.id ? "var(--accent-primary)" : "var(--text-secondary)" }}>
                    {node.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff", display: "block" }}>{node.title}</span>
                    <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>{node.status}</span>
                  </div>
                  <ChevronRight size={14} style={{ opacity: 0.3 }} />
                </button>
              ))}
            </div>

            {/* Right JSON payload window */}
            <div className={styles.jsonPreviewCard}>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "var(--text-secondary)", letterSpacing: "0.05em" }}>JSON Schema Payload Preview</span>
              <pre style={{
                background: "#040814",
                border: "1px solid rgba(255,255,255,0.04)",
                borderRadius: "8px",
                padding: "1.25rem",
                fontFamily: "monospace",
                fontSize: "0.75rem",
                color: "var(--accent-success)",
                margin: 0,
                flex: 1,
                overflow: "auto",
                whiteSpace: "pre-wrap"
              }}>
                {currentNode.samplePayload}
              </pre>
            </div>
          </div>
        </section>

      </div>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 className={styles.caseTitle}>
              Cognitive Parsing Migration
            </h2>
            <p className={styles.caseDesc}>
              Engineered dynamic neural processing engines for a national registry database, achieving a 38% reduction in manual data entry timelines.
            </p>
            <Link href="/case-studies" className={`${styles.caseLink} magnetic-btn btn-primary`}>
              Read Case Study
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
