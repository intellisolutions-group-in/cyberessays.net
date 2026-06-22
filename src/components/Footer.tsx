"use client";
import React, { useState } from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { Check } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isSubmitting) {
      setIsSubmitting(true);
      // Simulate fake API subscription request
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logo}>
              <img src="/images/logo/logo-1.png" alt="CyberEssays Logo" style={{ height: "55px", width: "auto" }} />
            </Link>
            <p className={styles.brandDesc}>
              Enterprise-grade software engineering, AI solutions, and digital transformation for ambitious companies.
            </p>
            <div className={styles.newsletter}>
              <span className={styles.newsletterTitle}>Subscribe to Insights</span>
              <form className={styles.newsletterForm} onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
                  {isSubmitting ? "..." : (subscribed ? <Check size={16} /> : "Join")}
                </button>
              </form>
            </div>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Solutions</span>
            <ul className={styles.linksList}>
              <li><Link href="/services/ai-solutions" className={styles.link}>AI Solutions</Link></li>
              <li><Link href="/services/saas-development" className={styles.link}>SaaS Development</Link></li>
              <li><Link href="/services/cloud-engineering" className={styles.link}>Cloud Engineering</Link></li>
              <li><Link href="/services/mobile-apps" className={styles.link}>Mobile Apps</Link></li>
              <li><Link href="/services/cybersecurity" className={styles.link}>Cybersecurity</Link></li>
              <li><Link href="/services/enterprise-software" className={styles.link}>Enterprise Software</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Industries</span>
            <ul className={styles.linksList}>
              <li><Link href="/industries/saas" className={styles.link}>SaaS & Tech</Link></li>
              <li><Link href="/industries/healthcare" className={styles.link}>Healthcare</Link></li>
              <li><Link href="/industries/fintech" className={styles.link}>FinTech</Link></li>
              <li><Link href="/industries/education" className={styles.link}>Education</Link></li>
              <li><Link href="/industries/retail" className={styles.link}>Retail & Commerce</Link></li>
              <li><Link href="/industries/manufacturing" className={styles.link}>Manufacturing</Link></li>
            </ul>
          </div>

          <div className={styles.col}>
            <span className={styles.colTitle}>Company</span>
            <ul className={styles.linksList}>
              <li><Link href="/about" className={styles.link}>About Us</Link></li>
              <li><Link href="/case-studies" className={styles.link}>Case Studies</Link></li>
              <li><Link href="/contact" className={styles.link}>Careers</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>&copy; 2020-{new Date().getFullYear()} CyberEssays Digital Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
