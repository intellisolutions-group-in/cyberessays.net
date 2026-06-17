"use client";
import React, { useState, useRef } from "react";
import styles from "./HeroSection.module.css";
import { ArrowRight, Sparkles, Cpu, Server } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import CustomScheduler from "../CustomScheduler";

export default function HeroSection() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate motion values for interactive parallax (relative to center, -0.5 to 0.5)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for fluid transitions
  const springConfig = { damping: 25, stiffness: 100, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const visualX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), springConfig);
  const visualY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-25, 25]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = (e.clientX - rect.left - width / 2) / width;
    const yVal = (e.clientY - rect.top - height / 2) / height;
    mouseX.set(xVal);
    mouseY.set(yVal);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Stagger configurations for entrance animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 18,
      },
    },
  } as const;

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 110,
        damping: 14,
      },
    },
  } as const;

  return (
    <section 
      ref={heroRef}
      className={styles.hero}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="container">
        <div className={styles.contentWrapper}>
          
          {/* Left Panel: Content Copy */}
          <motion.div 
            className={styles.content}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className={styles.tagline} variants={itemVariants}>
              <Sparkles size={14} className={styles.sparkleIcon} />
              <span>Next-Gen Digital Platform</span>
            </motion.div>

            <motion.h1 className={styles.headline} variants={itemVariants}>
              We Engineer Software <br />
              That Drives{" "}
              <span className={`gradient-text-purple-cyan ${styles.gText}`}>
                Competitive Advantage
              </span>
            </motion.h1>

            <motion.p className={styles.subheadline} variants={itemVariants}>
              Enterprise-grade software engineering, AI-native solutions, and digital
              transformation for ambitious enterprises. We build platforms designed to scale.
            </motion.p>

            <motion.div className={styles.ctas} variants={itemVariants}>
              <button
                className={`magnetic-btn btn-accent ${styles.ctaBtnAccent}`}
                onClick={() => setIsSchedulerOpen(true)}
              >
                Schedule Strategy Session
                <ArrowRight size={18} style={{ marginLeft: "0.5rem" }} />
              </button>
              <a href="#work" className={`magnetic-btn btn-secondary ${styles.ctaBtnSecondary}`}>
                Explore Our Work
              </a>
            </motion.div>

            {/* Trust Badges */}
            <motion.div className={styles.trustRow} variants={itemVariants}>
              <motion.div className={styles.trustBadge} variants={badgeVariants} whileHover={{ y: -4, scale: 1.05 }}>
                <Cpu size={15} className={styles.badgeIconPurple} />
                <span>AI-First Architectures</span>
              </motion.div>
              <motion.div className={styles.trustBadge} variants={badgeVariants} whileHover={{ y: -4, scale: 1.05 }}>
                <Server size={15} className={styles.badgeIconCyan} />
                <span>High System Uptime</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Panel: Stunning Interactive Tech Sphere Node Visual */}
          <motion.div 
            className={styles.visualContainer}
            style={{ rotateX, rotateY, x: visualX, y: visualY }}
          >
            <div className={styles.glowOverlay}></div>
            <svg viewBox="0 0 500 500" className={styles.sphereSvg}>
              <defs>
                <radialGradient id="sphereGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="var(--accent-secondary)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor="var(--accent-secondary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--accent-primary)" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--accent-primary)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="var(--accent-secondary)" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Glowing background halo */}
              <circle cx="250" cy="250" r="180" fill="url(#sphereGlow)" className={styles.pulseGlow} />

              {/* Outer Orbit Ring 1 */}
              <circle cx="250" cy="250" r="140" fill="none" stroke="url(#orbitGrad)" strokeWidth="1" strokeDasharray="6 8" className={styles.rotateOrbit1} />
              
              {/* Outer Orbit Ring 2 */}
              <ellipse cx="250" cy="250" rx="190" ry="80" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="1.5" className={styles.rotateOrbit2} />

              {/* Outer Orbit Ring 3 */}
              <ellipse cx="250" cy="250" rx="80" ry="190" fill="none" stroke="rgba(124, 58, 237, 0.25)" strokeWidth="1" strokeDasharray="12 6" className={styles.rotateOrbit3} />

              {/* Interactive connected web nodes */}
              <g className={styles.networkNodes}>
                <line x1="250" y1="250" x2="150" y2="170" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="250" y1="250" x2="350" y2="330" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="250" y1="250" x2="330" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="250" y1="250" x2="160" y2="340" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                <line x1="150" y1="170" x2="160" y2="340" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="330" y1="160" x2="350" y2="330" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

                {/* Nodes circles with neon style */}
                <circle cx="150" cy="170" r="6" fill="var(--accent-primary)" className={styles.nodePoint1} />
                <circle cx="350" cy="330" r="8" fill="var(--accent-secondary)" className={styles.nodePoint2} />
                <circle cx="330" cy="160" r="5" fill="#ffffff" className={styles.nodePoint3} />
                <circle cx="160" cy="340" r="7" fill="var(--accent-highlight)" className={styles.nodePoint4} />
              </g>

              {/* Central Hyper-core Orb */}
              <circle cx="250" cy="250" r="28" fill="url(#coreGlow)" className={styles.coreOrb} />
              <circle cx="250" cy="250" r="12" fill="#ffffff" />
            </svg>

            {/* Glowing HUD elements overlay */}
            <div className={styles.hudPanel}>
              <span className={styles.hudText}>SYS ACTIVE</span>
              <div className={styles.hudBar}></div>
            </div>
            <div className={styles.hudPanelRight}>
              <span className={styles.hudTextRight}>TPS: 400</span>
            </div>
          </motion.div>

        </div>
      </div>

      {isSchedulerOpen && (
        <CustomScheduler onClose={() => setIsSchedulerOpen(false)} />
      )}
    </section>
  );
}
