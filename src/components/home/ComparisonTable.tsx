"use client";
import React, { useRef, useState } from "react";
import styles from "./ComparisonTable.module.css";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useInView,
} from "framer-motion";
import { Star, CheckCircle2, Zap, Shield, Cpu, Palette, Bot } from "lucide-react";

// ─── TABLE DATA ─────────────────────────────────────────────────────────────
const COLUMNS = ["Skill Domain", "Foundation", "Proficient", "Expert"];

const ROWS = [
  {
    icon: <Cpu size={14} />,
    feature: "Frontend Dev",
    cells: ["HTML / CSS / JS", "React + Next.js", "Three.js + GSAP Animations"],
  },
  {
    icon: <Zap size={14} />,
    feature: "Backend Dev",
    cells: ["REST APIs + Node", "Express + GraphQL", "Microservices Architecture"],
  },
  {
    icon: <Shield size={14} />,
    feature: "Databases",
    cells: ["SQL Fundamentals", "PostgreSQL + ORM", "MongoDB + Redis Caching"],
  },
  {
    icon: <CheckCircle2 size={14} />,
    feature: "DevOps",
    cells: ["Git + GitHub", "Docker + CI/CD", "AWS + K8s Deploy"],
  },
  {
    icon: <Palette size={14} />,
    feature: "UI / UX Design",
    cells: ["Wireframing", "Figma Prototypes", "Motion Design Systems"],
  },
  {
    icon: <Bot size={14} />,
    feature: "AI Integration",
    cells: ["API Integration", "LLM Fine-Tuning", "Custom AI Pipelines"],
  },
];

// Scroll progress thresholds at which each row reveals
const ROW_THRESHOLDS = [0.08, 0.24, 0.40, 0.56, 0.70, 0.85];

// ─── MOBILE CARD ─────────────────────────────────────────────────────────────
function MobileCard({ row, index }: { row: (typeof ROWS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.mobileCard}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.mobileCardHeader}>
        <span className={styles.mobileCardIcon}>{row.icon}</span>
        <span className={styles.mobileCardFeature}>{row.feature}</span>
      </div>
      <div className={styles.mobileCardBody}>
        {COLUMNS.slice(1).map((col, i) => (
          <div key={i} className={`${styles.mobileCardRow} ${i === 2 ? styles.mobileExpert : ""}`}>
            <span className={styles.mobileLabel}>{col}</span>
            <span className={styles.mobileValue}>{row.cells[i]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeRow, setActiveRow] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Map scrollYProgress → which row is currently active
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let newActive = -1;
    ROW_THRESHOLDS.forEach((threshold, i) => {
      if (latest >= threshold) newActive = i;
    });
    setActiveRow(newActive);
  });

  const progressPct =
    activeRow < 0 ? 0 : ((activeRow + 1) / ROWS.length) * 100;

  return (
    <section ref={sectionRef} className={styles.section} id="skills">
      {/* ── DESKTOP: Sticky scroll experience ── */}
      <div className={styles.stickyWrapper}>
        <div className={`${styles.inner} container`}>

          {/* Left: vertical progress rail */}
          <div className={styles.progressRail} aria-hidden="true">
            <div className={styles.railTrack}>
              <div
                className={styles.railFill}
                style={{ height: `${progressPct}%` }}
              />
            </div>
            {ROWS.map((row, i) => (
              <div
                key={i}
                className={`${styles.railDotWrap} ${i <= activeRow ? styles.railDotActive : ""}`}
                style={{ top: `${(i / (ROWS.length - 1)) * 100}%` }}
                title={row.feature}
              >
                <div className={styles.railDot} />
                <span className={styles.railLabel}>{row.feature}</span>
              </div>
            ))}
          </div>

          {/* Right: table area */}
          <div className={styles.tableArea}>
            {/* Section header */}
            <div className={styles.sectionHeader}>
              <div className={styles.eyebrow}>TRANSPARENT TECH STACK</div>
              <h2 className={styles.title}>
                My Skill{" "}
                <span className="gradient-text-purple-cyan">Arsenal</span>
              </h2>
              <p className={styles.subtitle}>
                From fundamentals to expert-level mastery — a transparent look at
                my technical capabilities across every critical dimension.
              </p>
              <div className={styles.scrollHint}>
                <div className={styles.scrollHintIcon} />
                <span>SCROLL TO EXPLORE</span>
              </div>
            </div>

            {/* Glass table frame */}
            <div className={styles.tableFrame}>
              {/* Column headers */}
              <div className={styles.tableHeader}>
                {COLUMNS.map((col, ci) => (
                  <div
                    key={ci}
                    className={`${styles.headerCell} ${ci === 3 ? styles.expertHeader : ""}`}
                  >
                    {ci === 3 && (
                      <Star
                        size={11}
                        className={styles.starIcon}
                        fill="currentColor"
                      />
                    )}
                    {col}
                    {ci === 3 && <div className={styles.expertColHighlight} />}
                  </div>
                ))}
              </div>

              {/* Data rows */}
              <div className={styles.tableBody}>
                {ROWS.map((row, ri) => {
                  const revealed = ri <= activeRow;
                  const active = ri === activeRow;
                  return (
                    <motion.div
                      key={ri}
                      className={`
                        ${styles.tableRow}
                        ${revealed ? styles.rowRevealed : ""}
                        ${active   ? styles.rowActive   : ""}
                      `}
                      initial={{ opacity: 0, y: 30 }}
                      animate={
                        revealed
                          ? { opacity: 1, y: 0 }
                          : { opacity: 0, y: 30 }
                      }
                      transition={{
                        duration: 0.52,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {/* Feature name cell */}
                      <motion.div
                        className={`${styles.cell} ${styles.featureCell}`}
                        initial={{ opacity: 0 }}
                        animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.0, duration: 0.4 }}
                      >
                        <span className={styles.featureIcon}>{row.icon}</span>
                        <span className={styles.featureName}>{row.feature}</span>
                      </motion.div>

                      {/* Value cells: Foundation | Proficient | Expert */}
                      {row.cells.map((cell, ci) => (
                        <motion.div
                          key={ci}
                          className={`${styles.cell} ${ci === 2 ? styles.expertCell : ""}`}
                          initial={{ opacity: 0 }}
                          animate={revealed ? { opacity: 1 } : { opacity: 0 }}
                          transition={{
                            delay: (ci + 1) * 0.07,
                            duration: 0.4,
                          }}
                        >
                          <span
                            className={
                              ci === 2
                                ? styles.expertValue
                                : styles.cellValue
                            }
                          >
                            {cell}
                          </span>
                          {ci === 2 && (
                            <div className={styles.expertCellGlow} />
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked useInView cards ── */}
      <div className={styles.mobileSection}>
        <div className="container">
          <div className={styles.mobileSectionHeader}>
            <div className={styles.eyebrow}>TRANSPARENT TECH STACK</div>
            <h2 className={styles.title}>
              My Skill{" "}
              <span className="gradient-text-purple-cyan">Arsenal</span>
            </h2>
          </div>
          <div className={styles.mobileCards}>
            {ROWS.map((row, i) => (
              <MobileCard key={i} row={row} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
