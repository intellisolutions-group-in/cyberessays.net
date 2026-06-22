"use client";

import React, { useState, useEffect } from "react";
import styles from "./education.module.css";
import { Users, Sparkles, MousePointer2, Layers, Cpu, Compass } from "lucide-react";

interface UserCursor {
  name: string;
  x: number;
  y: number;
  colorClass: string;
}

export default function EducationPage() {
  const [cursors, setCursors] = useState<UserCursor[]>([
    { name: "Sarah (Math Node)", x: 350, y: 400, colorClass: "" },
    { name: "David (Graph Node)", x: 500, y: 300, colorClass: styles.cursorLabelCyan },
    { name: "Prof. Carter (Moderator)", x: 650, y: 600, colorClass: styles.cursorLabelCoral }
  ]);
  const [drawings, setDrawings] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState("Connected");

  // Animate user cursors randomly to simulate real-time collaboration
  useEffect(() => {
    const timer = setInterval(() => {
      setCursors((prev) => {
        const next = prev.map((cursor) => {
          const targetX = Math.max(150, Math.min(850, Math.round(cursor.x + (Math.random() - 0.5) * 300)));
          const targetY = Math.max(150, Math.min(850, Math.round(cursor.y + (Math.random() - 0.5) * 200)));
          return { ...cursor, x: targetX, y: targetY };
        });
        
        setDrawings((d) => {
          const path = `M ${prev[0].x} ${prev[0].y} L ${next[0].x} ${next[0].y}`;
          const path2 = `M ${prev[1].x} ${prev[1].y} L ${next[1].x} ${next[1].y}`;
          return [...d.slice(-15), path, path2]; 
        });

        setSyncStatus("Merging...");
        setTimeout(() => setSyncStatus("Synced"), 300);

        return next;
      });
    }, 1600);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.eduPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>EdTech Platforms</span>
          <h1 className={styles.title}>Synchronous University Workspaces</h1>
          <p className={styles.desc}>
            Launch low-latency classroom interfaces allowing students to coordinate files, video streams, and workspace canvases concurrently without state conflicts.
          </p>
        </div>

        {/* Split Layout Workspace */}
        <div className={styles.mainSplitGrid}>
          
          {/* Left Column: Interactive Whiteboard */}
          <main className={styles.canvasCard} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2rem", position: "relative" }}>
            <div className={styles.cardHeader} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <span className={styles.cardTitle} style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Sparkles size={18} color="var(--accent-primary)" /> Collaborative Whiteboard (Live Session)
              </span>
              <span style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                textTransform: "uppercase",
                padding: "0.2rem 0.6rem",
                borderRadius: "4px",
                border: "1px solid var(--accent-primary)",
                background: "rgba(124, 58, 237, 0.05)",
                color: "var(--accent-primary)"
              }}>
                WS STATE: {syncStatus}
              </span>
            </div>

            {/* Interactive Drawing Area */}
            <div className={styles.boardArea} style={{ position: "relative", height: "300px", background: "#040814", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)", overflow: "hidden" }}>
              <div className={styles.boardGridBackground}></div>

              {/* Render dynamic vector drawing trails */}
              <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}>
                {drawings.map((d, idx) => (
                  <path
                    key={idx}
                    d={d}
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.25)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ))}
              </svg>

              {/* Cursors */}
              {cursors.map((cursor, idx) => (
                <div
                  key={idx}
                  className={styles.cursor}
                  style={{
                    position: "absolute",
                    left: `${cursor.x / 10}%`,
                    top: `${cursor.y / 10}%`,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    pointerEvents: "none",
                    transition: "all 1.6s cubic-bezier(0.25, 0.8, 0.25, 1)"
                  }}
                >
                  <MousePointer2 size={16} fill="currentColor" color="currentColor" style={{ transform: "rotate(-90deg)" }} />
                  <span className={`${styles.cursorLabel} ${cursor.colorClass}`} style={{
                    fontSize: "0.65rem",
                    padding: "0.15rem 0.4rem",
                    borderRadius: "4px",
                    background: "#7c3aed",
                    color: "#fff",
                    whiteSpace: "nowrap"
                  }}>
                    {cursor.name}
                  </span>
                </div>
              ))}
            </div>
          </main>

          {/* Right Column: Active Session Metadata */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className={styles.sideCard} style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2.5rem" }}>
              <h2 className={styles.cardTitle} style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Users size={18} color="var(--accent-primary)" /> Collaborative Users
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {cursors.map((c, index) => (
                  <div key={index} style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "6px", padding: "0.6rem 0.8rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff" }}>{c.name.split(" ")[0]}</span>
                    <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", fontFamily: "monospace" }}>X: {c.x}px, Y: {c.y}px</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>

        {/* Collaborative Whiteboard Workspace Tool Palette (Replacing specs & methodology) */}
        <section style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2.5rem", marginBottom: "4rem" }}>
          <div className={styles.paletteSplitGrid}>
            <div>
              <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-primary)", letterSpacing: "0.1em" }}>Component Controls</span>
              <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "1.75rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>Collaborative Workspace Palette</h2>
              <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.5rem", lineHeight: 1.5 }}>
                Our EdTech setup decouples cursor positions from heavy layout calculations, rendering smooth vector drawing lines in under 15ms.
              </p>
            </div>

            {/* Custom Tool Palette Grid */}
            <div className={styles.toolPaletteGrid}>
              <div style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                  <Layers size={16} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Drawing Layers</span>
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", display: "block" }}>Canvas delta merges (CRDT LWW-Element-Set) are processed on edge servers.</span>
              </div>

              <div style={{ background: "#050a1a", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px", padding: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                  <Cpu size={16} />
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#fff" }}>Web Workers</span>
                </div>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)", display: "block" }}>Offloads math serialization routines, maintaining a stable 60 FPS viewport.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Collaborative Testimonials (Replacing Case Study Spotlight) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ fontSize: "0.7rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-secondary)", letterSpacing: "0.1em" }}>Case Studies</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginTop: "0.25rem" }}>Synchronous Integration Testimonials</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              How major e-learning platforms scale digital classroom tools without collision risks.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", marginBottom: "1rem" }}>
                <Compass size={20} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>Digital Learning Lead</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;We scaled our synchronous university classrooms to support large active student groups concurrently, merging drawing delta strokes smoothly over web sockets.&quot;
              </p>
              <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Deepa Nair</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Dean of Digital Systems</span>
              </div>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-primary)", marginBottom: "1rem" }}>
                <Users size={20} />
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>EdTech Platform Lead</span>
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", lineHeight: 1.6 }}>
                &quot;Using isolated background worker threads removed layout lag on low-bandwidth mobile devices, allowing students to access canvases instantly.&quot;
              </p>
              <div style={{ marginTop: "1.25rem", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "0.75rem" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#fff", display: "block" }}>Arjun Iyer</span>
                <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>Chief Technology Officer</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
