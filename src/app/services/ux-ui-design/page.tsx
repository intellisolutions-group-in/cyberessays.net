"use client";

import React, { useState } from "react";
import styles from "./ux-ui-design.module.css";
import { Palette, Layers, Settings, Copy, Check, Grid, Code, Monitor, Wind } from "lucide-react";
import Link from "next/link";

interface ThemePreset {
  id: string;
  name: string;
  hue: number;
  saturation: number;
  lightness: number;
  radius: number;
  padding: number;
  blur: number;
  borderWidth: number;
}

export default function UxUiDesignPage() {
  const [hue, setHue] = useState<number>(262);
  const [saturation, setSaturation] = useState<number>(83);
  const [lightness, setLightness] = useState<number>(58);
  const [radius, setRadius] = useState<number>(16);
  const [padding, setPadding] = useState<number>(24);
  const [blur, setBlur] = useState<number>(12);
  const [borderWidth, setBorderWidth] = useState<number>(1);
  const [activePreset, setActivePreset] = useState<string>("aurora");

  // Code exporter states
  const [activeTab, setActiveTab] = useState<"css" | "tailwind" | "json">("css");
  const [copied, setCopied] = useState(false);

  const presets: ThemePreset[] = [
    {
      id: "aurora",
      name: "Aurora Purple",
      hue: 262,
      saturation: 83,
      lightness: 58,
      radius: 16,
      padding: 24,
      blur: 12,
      borderWidth: 1
    },
    {
      id: "emerald",
      name: "Emerald Cyber",
      hue: 160,
      saturation: 84,
      lightness: 39,
      radius: 8,
      padding: 20,
      blur: 8,
      borderWidth: 2
    },
    {
      id: "sunset",
      name: "Neon Sunset",
      hue: 354,
      saturation: 100,
      lightness: 65,
      radius: 24,
      padding: 28,
      blur: 20,
      borderWidth: 1
    },
    {
      id: "titanium",
      name: "Titanium Frost",
      hue: 210,
      saturation: 16,
      lightness: 72,
      radius: 4,
      padding: 16,
      blur: 4,
      borderWidth: 1
    }
  ];

  const applyPreset = (preset: ThemePreset) => {
    setHue(preset.hue);
    setSaturation(preset.saturation);
    setLightness(preset.lightness);
    setRadius(preset.radius);
    setPadding(preset.padding);
    setBlur(preset.blur);
    setBorderWidth(preset.borderWidth);
    setActivePreset(preset.id);
  };

  // Convert HSL values to CSS strings
  const primaryColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  const primaryColorAlpha = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.15)`;
  const primaryColorGlow = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.25)`;

  // Generate exporting token strings
  const getExportedCode = () => {
    switch (activeTab) {
      case "css":
        return `:root {
  --color-primary: hsl(${hue}, ${saturation}%, ${lightness}%);
  --color-glow: hsla(${hue}, ${saturation}%, ${lightness}%, 0.25);
  --border-radius-card: ${radius}px;
  --padding-card: ${padding}px;
  --backdrop-blur: ${blur}px;
  --border-width: ${borderWidth}px;
}`;
      case "tailwind":
        return `module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "hsl(${hue}, ${saturation}%, ${lightness}%)",
        glow: "hsla(${hue}, ${saturation}%, ${lightness}%, 0.25)",
      },
      borderRadius: {
        card: "${radius}px",
      },
      backdropBlur: {
        custom: "${blur}px",
      }
    }
  }
}`;
      case "json":
        return `{
  "theme": "${activePreset || "custom"}",
  "tokens": {
    "primaryHue": ${hue},
    "saturation": ${saturation},
    "lightness": ${lightness},
    "borderRadius": ${radius},
    "padding": ${padding},
    "blur": ${blur},
    "borderWidth": ${borderWidth}
  }
}`;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getExportedCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>UX/UI Architecture</span>
          <h1 className={styles.title}>Dynamic Tokens & Luxury Interfaces</h1>
          <p className={styles.desc}>
            We engineer responsive digital systems using customized design systems, semantic typography scales, and interactive micro-animations optimized for performance.
          </p>
        </div>

        {/* Two-Column Grid */}
        <div className={styles.layoutGrid}>
          
          {/* Left Column: Playground Controls */}
          <div className={styles.playgroundCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardTitle}>
                <Palette size={18} style={{ color: primaryColor }} /> Design Tokens Playground
              </span>
              <span className={styles.cardTitle} style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: 500 }}>
                <Settings size={14} style={{ marginRight: "0.25rem" }} /> Live Editor
              </span>
            </div>

            {/* Presets Row */}
            <div className={styles.presetContainer}>
              <span className={styles.presetLabel}>System Presets</span>
              <div className={styles.themePresetRow}>
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    className={`${styles.presetBtn} ${activePreset === preset.id ? styles.presetBtnActive : ""}`}
                    onClick={() => applyPreset(preset)}
                    style={activePreset === preset.id ? { borderColor: primaryColor, boxShadow: `0 0 8px ${primaryColorGlow}` } : {}}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive sliders grid */}
            <div className={styles.controlsGrid}>
              
              {/* Hue Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>PRIMARY HUE</span>
                  <span className={styles.controlValue}>{hue}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={hue}
                  onChange={(e) => {
                    setHue(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                  style={{ backgroundImage: `linear-gradient(to right, red, yellow, green, cyan, blue, magenta, red)` }}
                />
              </div>

              {/* Saturation Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>SATURATION</span>
                  <span className={styles.controlValue}>{saturation}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={saturation}
                  onChange={(e) => {
                    setSaturation(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

              {/* Lightness Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>LIGHTNESS</span>
                  <span className={styles.controlValue}>{lightness}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  value={lightness}
                  onChange={(e) => {
                    setLightness(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

              {/* Border Radius */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>BORDER RADIUS</span>
                  <span className={styles.controlValue}>{radius}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="32"
                  value={radius}
                  onChange={(e) => {
                    setRadius(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

              {/* Padding Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>INNER PADDING</span>
                  <span className={styles.controlValue}>{padding}px</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="40"
                  value={padding}
                  onChange={(e) => {
                    setPadding(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

              {/* Glass Blur Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>BACKDROP BLUR</span>
                  <span className={styles.controlValue}>{blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="24"
                  value={blur}
                  onChange={(e) => {
                    setBlur(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

              {/* Border Thickness Slider */}
              <div className={styles.controlRow}>
                <div className={styles.controlHeader}>
                  <span className={styles.controlName}>BORDER WIDTH</span>
                  <span className={styles.controlValue}>{borderWidth}px</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  value={borderWidth}
                  onChange={(e) => {
                    setBorderWidth(parseInt(e.target.value));
                    setActivePreset("");
                  }}
                  className={styles.sliderInput}
                />
              </div>

            </div>

            {/* Target Preview Canvas */}
            <div className={styles.previewBox}>
              <div 
                className={styles.previewBgBlob}
                style={{
                  background: primaryColor,
                  left: "20%",
                  top: "20%"
                }}
              ></div>

              {/* Live Preview Glassmorphic Card */}
              <div 
                className={styles.previewCard}
                style={{
                  background: `rgba(13, 18, 37, ${blur > 0 ? 0.35 : 0.9})`,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)`,
                  border: `${borderWidth}px solid ${primaryColorAlpha}`,
                  borderRadius: `${radius}px`,
                  padding: `${padding}px`,
                  boxShadow: `0 8px 32px rgba(4, 8, 20, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 16px ${primaryColorGlow}`
                }}
              >
                <div className={styles.previewCardHeader}>
                  <div className={`${styles.previewBadge} ${styles.previewBadgeLive}`}>
                    <span className={styles.previewDot}></span> Live System
                  </div>
                  <span style={{ fontSize: "0.65rem", fontFamily: "monospace", color: primaryColor, fontWeight: 700 }}>
                    SYS-NOMINAL
                  </span>
                </div>

                <div className={styles.previewCardTitle}>Network Node Alpha</div>
                <div className={styles.previewCardDesc}>
                  Configured dynamic styling engines mapped to HSL color scales. Changes in coordinates will propagate down to client micro-frontends instantly.
                </div>

                {/* Simulated Metrics inside card */}
                <div className={styles.previewMetricsGrid}>
                  <div className={styles.previewMetricItem}>
                    <div className={styles.previewMetricVal}>Optimal</div>
                    <div className={styles.previewMetricLabel}>Link Health</div>
                  </div>
                  <div className={styles.previewMetricItem}>
                    <div className={styles.previewMetricVal}>1.4ms</div>
                    <div className={styles.previewMetricLabel}>Ping RTT</div>
                  </div>
                </div>

                {/* Primary Action Button using primary token color */}
                <button 
                  className={styles.previewActionBtn}
                  style={{
                    background: primaryColor,
                    color: lightness > 65 ? "#040814" : "#FFFFFF",
                    borderRadius: `${Math.min(radius, 12)}px`,
                    boxShadow: `0 4px 12px ${primaryColorGlow}`
                  }}
                >
                  Synchronize Cluster
                </button>
              </div>

            </div>

          </div>

          {/* Right Column: Key Capabilities Intro */}
          <div className={styles.rightIntro}>
            <div className={styles.capabilitiesIntroCard}>
              <Layers className={styles.capIcon} style={{ color: primaryColor }} />
              <h4>Component Design Token Engines</h4>
              <p>
                Dynamic rendering demands programmatic configuration interfaces. We isolate margins, grids, and easing timings into design variables, ensuring that modifications scale seamlessly.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* NEW: Live Code Exporter Panel (Technical Specs replacement) */}
      <section className={styles.exporterSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Technical Specs</span>
            <h2 className={styles.sectionTitle}>Interactive Design Token Exporter</h2>
            <p className={styles.sectionDesc}>Adjust the sliders in the playground above and export code structures instantly.</p>
          </div>

          <div className={styles.exporterCard}>
            {/* Tab header buttons */}
            <div className={styles.exporterTabs}>
              <button 
                className={`${styles.tabBtn} ${activeTab === "css" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("css")}
              >
                <Code size={14} /> CSS Variables
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "tailwind" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("tailwind")}
              >
                <Wind size={14} /> Tailwind CSS Config
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === "json" ? styles.tabBtnActive : ""}`}
                onClick={() => setActiveTab("json")}
              >
                <Settings size={14} /> Design Tokens JSON
              </button>

              <button className={styles.copyBtn} onClick={copyToClipboard}>
                {copied ? (
                  <>
                    <Check size={14} /> Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} /> Copy Token Code
                  </>
                )}
              </button>
            </div>

            {/* Code output display box */}
            <div className={styles.codeOutputBox}>
              <pre className={styles.codeBlock}>
                <code>{getExportedCode()}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Staggered Bento Mockup canvas (Methodology replacement) */}
      <section className={styles.bentoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Methodology</span>
            <h2 className={styles.sectionTitle}>Interface Development Bento Grid</h2>
            <p className={styles.sectionDesc}>Our four-stage process representing design, motion modeling, and component compilation.</p>
          </div>

          <div className={styles.bentoContainer}>
            {/* Bento Card 1: Wireframe Blueprint */}
            <div className={`${styles.bentoCard} ${styles.cardSmall}`}>
              <div className={styles.cardHeaderSmall}>
                <span>01 / Blueprint</span>
                <Grid size={16} className={styles.bentoIcon} />
              </div>
              <h4>Wireframe Layouts</h4>
              <p>We trace interface pathways using outline block wireframes, aligning information hierarchy prior to adding high-fidelity gradients.</p>
              
              <div className={styles.simulatedWireframe}>
                <div className={styles.wireRow} />
                <div className={styles.wireRow} style={{ width: "70%" }} />
                <div className={styles.wireGrid}>
                  <div className={styles.wireBox} />
                  <div className={styles.wireBox} />
                </div>
              </div>
            </div>

            {/* Bento Card 2: Figma Library Auto-Layout */}
            <div className={`${styles.bentoCard} ${styles.cardWide}`}>
              <div className={styles.cardHeaderSmall}>
                <span>02 / Library</span>
                <Palette size={16} className={styles.bentoIcon} />
              </div>
              <h4>Figma Library Auto-Layout</h4>
              <p>Components are mapped to centralized asset sets, utilizing flexible sizing grids and variant tokens matching responsive layout scopes.</p>
              
              <div className={styles.simulatedLibrary}>
                <div className={styles.libraryBadge} style={{ background: "rgba(168, 85, 247, 0.15)", color: "var(--accent-primary)" }}>Primary Button</div>
                <div className={styles.libraryBadge} style={{ background: "rgba(6, 182, 212, 0.15)", color: "var(--accent-secondary)" }}>Status Pill</div>
                <div className={styles.libraryBadge} style={{ background: "rgba(16, 185, 129, 0.15)", color: "var(--accent-success)" }}>Active Check</div>
                <div className={styles.libraryBadge}>Input Token</div>
              </div>
            </div>

            {/* Bento Card 3: Cubic-Bezier Micro-Transitions */}
            <div className={`${styles.bentoCard} ${styles.cardWide}`}>
              <div className={styles.cardHeaderSmall}>
                <span>03 / Easing</span>
                <Settings size={16} className={styles.bentoIcon} />
              </div>
              <h4>Cubic-Bezier Easing</h4>
              <p>We configure custom motion paths for cursor interactions and navigation transitions, avoiding linear jumps to present a premium feel.</p>
              
              <div className={styles.simulatedEasing}>
                <svg className={styles.easingSvg} viewBox="0 0 100 40">
                  <path d="M 0 40 C 25 40, 30 0, 100 0" fill="none" stroke="var(--accent-secondary)" strokeWidth="3" />
                  <circle cx="28" cy="30" r="4" fill="var(--accent-secondary)" />
                  <circle cx="100" cy="0" r="4" fill="var(--accent-primary)" />
                </svg>
              </div>
            </div>

            {/* Bento Card 4: Next.js Compile */}
            <div className={`${styles.bentoCard} ${styles.cardSmall}`}>
              <div className={styles.cardHeaderSmall}>
                <span>04 / Build</span>
                <Monitor size={16} className={styles.bentoIcon} />
              </div>
              <h4>Next.js Responsive compile</h4>
              <p>Gradients, layout rules, and variables are built into clean TSX structures compiled for static HTML payload delivery.</p>
              
              <div className={styles.simulatedCodeLines}>
                <div className={styles.codeLine} style={{ color: "#a855f7" }}>{"export default function Button() {"}</div>
                <div className={styles.codeLine} style={{ paddingLeft: "1rem", color: "#06b6d4" }}>{"return <button className={styles.btn} />"}</div>
                <div className={styles.codeLine}>{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Study spotlight */}
      <section className={styles.caseStudySection}>
        <div className="container">
          <div className={styles.caseCard}>
            <span className={styles.tagline}>Success Spotlight</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              Apex Creative Platform Refactor
            </h2>
            <p style={{ margin: "1.5rem auto", fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "650px" }}>
              Engineered a unified design system and client interface for a global media distribution company, reducing front-end development cycle timelines by 38%.
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

