"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";
import { ChevronDown, Menu, X } from "lucide-react";
import CustomScheduler from "./CustomScheduler";

export default function Navbar() {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <div className={styles.navWrapper}>
        <nav className={styles.navbar}>
          <Link href="/" className={styles.logo}>
            <img src="/logo.ico" alt="CyberEssays Logo" style={{ height: "34px", width: "auto" }} />
            <span>CyberEssays Digital Services</span>
          </Link>

          <ul className={styles.navLinks}>
            {/* 1. Services */}
            <li className={styles.navItem}>
              <Link href="/services" className={styles.navLink}>
                Services <ChevronDown size={14} />
              </Link>
              <div className={styles.dropdown}>
                <Link href="/services" className={styles.dropdownItem} style={{ fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem", marginBottom: "0.25rem" }}>All Services</Link>
                <Link href="/services/cloud-migrations" className={styles.dropdownItem}>Cloud Migrations & SRE</Link>
                <Link href="/services/api-design" className={styles.dropdownItem}>API Design & Integrations</Link>
                <Link href="/services/qa-automation" className={styles.dropdownItem}>QA Automation & Performance</Link>
                <Link href="/services/managed-support" className={styles.dropdownItem}>Managed Support</Link>
                <Link href="/services/cybersecurity" className={styles.dropdownItem}>Cybersecurity</Link>
                <Link href="/services/data-ai" className={styles.dropdownItem}>Data & AI</Link>
                <Link href="/services/ux-ui-design" className={styles.dropdownItem}>UX/UI & Product Design</Link>
              </div>
            </li>

            {/* 2. Products */}
            <li className={styles.navItem}>
              <span className={styles.navLink}>
                Products <ChevronDown size={14} />
              </span>
              <div className={styles.dropdown}>
                <Link href="/products" className={styles.dropdownItem}>All Products</Link>
                <Link href="/products/icedeploy" className={styles.dropdownItem}>IceDeploy</Link>
                <Link href="/products/iceinsight" className={styles.dropdownItem}>IceInsight</Link>
              </div>
            </li>

            {/* 3. Solutions */}
            <li className={styles.navItem}>
              <span className={styles.navLink}>
                Solutions <ChevronDown size={14} />
              </span>
              <div className={styles.dropdown}>
                <Link href="/case-studies" className={styles.dropdownItem} style={{ fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "0.5rem", marginBottom: "0.25rem" }}>Case Studies</Link>
                <Link href="/industries/saas" className={styles.dropdownItem}>SaaS & Tech</Link>
                <Link href="/industries/healthcare" className={styles.dropdownItem}>Healthcare</Link>
                <Link href="/industries/fintech" className={styles.dropdownItem}>FinTech</Link>
                <Link href="/industries/education" className={styles.dropdownItem}>Education</Link>
                <Link href="/industries/retail" className={styles.dropdownItem}>Retail & Commerce</Link>
                <Link href="/industries/manufacturing" className={styles.dropdownItem}>Manufacturing</Link>
              </div>
            </li>

            {/* 4. Resources */}
            <li className={styles.navItem}>
              <span className={styles.navLink}>
                Resources <ChevronDown size={14} />
              </span>
              <div className={styles.dropdown}>
                <Link href="/resources/platform-status" className={styles.dropdownItem}>Platform Status</Link>
              </div>
            </li>

            {/* 5. About Us */}
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>About Us</Link>
            </li>

            {/* 6. Contact */}
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>

          <button className={styles.ctaBtn} onClick={() => setIsSchedulerOpen(true)}>
            Book Strategy Call
          </button>

          <button className={styles.mobileMenuBtn} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div className="glass-panel" style={{
          position: "fixed",
          top: "5.5rem",
          left: "5%",
          width: "90%",
          maxHeight: "calc(100vh - 7rem)",
          overflowY: "auto",
          borderRadius: "var(--border-radius-lg)",
          padding: "1.5rem",
          zIndex: 999,
          display: "flex",
          flexDirection: "column",
          gap: "1.25rem",
          boxShadow: "var(--shadow-xl)"
        }}>
          {/* Services */}
          <div>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Services</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0", fontWeight: 600, color: "var(--accent-secondary)" }}>All Services</Link>
              <Link href="/services/cloud-migrations" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Cloud Migrations</Link>
              <Link href="/services/api-design" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>API Design</Link>
              <Link href="/services/qa-automation" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>QA Automation</Link>
              <Link href="/services/managed-support" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Managed Support</Link>
              <Link href="/services/cybersecurity" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>Cybersecurity</span>
                <span className={styles.popularBadge} style={{ color: "var(--text-secondary)", borderColor: "rgba(17, 24, 39, 0.25)", marginLeft: 0 }}>Popular</span>
              </Link>
              <Link href="/services/data-ai" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Data & AI</Link>
              <Link href="/services/ux-ui-design" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>UX/UI Design</Link>
            </div>
          </div>
          <hr style={{ borderColor: "rgba(17, 24, 39, 0.05)" }} />

          {/* Products */}
          <div>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Products</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>All Products</Link>
              <Link href="/products/icedeploy" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>IceDeploy</span>
                <span className={styles.popularBadge} style={{ color: "var(--text-secondary)", borderColor: "rgba(17, 24, 39, 0.25)", marginLeft: 0 }}>Popular</span>
              </Link>
              <Link href="/products/iceinsight" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>IceInsight</Link>
            </div>
          </div>
          <hr style={{ borderColor: "rgba(17, 24, 39, 0.05)" }} />

          {/* Solutions */}
          <div>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Solutions</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
              <Link href="/case-studies" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0", fontWeight: 600, color: "var(--accent-primary)", gridColumn: "span 2" }}>Case Studies</Link>
              <Link href="/industries/saas" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>SaaS & Tech</Link>
              <Link href="/industries/healthcare" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Healthcare</Link>
              <Link href="/industries/fintech" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>FinTech</Link>
              <Link href="/industries/education" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Education</Link>
              <Link href="/industries/retail" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Retail</Link>
              <Link href="/industries/manufacturing" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Manufacturing</Link>
            </div>
          </div>
          {/* Resources */}
          <div>
            <h4 style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "0.5rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>Resources</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <Link href="/resources/platform-status" onClick={() => setIsMobileMenuOpen(false)} style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}>Platform Status</Link>
            </div>
          </div>
          <hr style={{ borderColor: "rgba(17, 24, 39, 0.05)" }} />

          <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>About Us</Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} style={{ fontWeight: 600 }}>Contact</Link>
          <button className={styles.ctaBtn} style={{ display: "block", width: "100%" }} onClick={() => { setIsMobileMenuOpen(false); setIsSchedulerOpen(true); }}>
            Book Strategy Call
          </button>
        </div>
      )}

      {isSchedulerOpen && (
        <CustomScheduler onClose={() => setIsSchedulerOpen(false)} />
      )}
    </>
  );
}
