"use client";
import React from "react";
import styles from "./InsightsGrid.module.css";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface Article {
  id: string;
  category: string;
  title: string;
  summary: string;
  readTime: string;
  date: string;
  isFeatured?: boolean;
}

export default function InsightsGrid() {
  const articles: Article[] = [
    {
      id: "llm-tenant",
      category: "AI TRENDS",
      title: "Fine-Tuning Local LLMs in Multi-Tenant Enterprise Environments",
      summary: "An architectural review of low-resource fine-tuning techniques (LoRA, QLoRA), analyzing latency spikes, tokenizer isolation, and vector cache strategies.",
      readTime: "6 Min Read",
      date: "June 2026",
      isFeatured: true
    },
    {
      id: "vanilla-css",
      category: "TECH REPORT",
      title: "High-Precision CSS Modules vs Tailwind",
      summary: "Analyzing payload bundles sizes, style isolation mechanics, and layout rendering paint times for complex dashboard interfaces.",
      readTime: "4 Min Read",
      date: "May 2026"
    },
    {
      id: "zero-trust",
      category: "SECURITY REPORT",
      title: "Orchestrating Zero-Trust Serverless Infrastructure",
      summary: "A blueprint to secure multi-region edge serverless setups utilizing IAM keys, Cloudflare WAF rules, and HashiCorp Vault secrets.",
      readTime: "8 Min Read",
      date: "April 2026"
    }
  ];

  return (
    <section className={`${styles.section} section-padding`} id="insights">
      <div className="container">
        
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Insights & Innovation</h2>
          <Link href="/contact" className={styles.viewAll}>
            <span>Browse Library</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className={styles.grid}>
          {articles.map((art) => (
            <div
              key={art.id}
              className={`${styles.card} ${art.isFeatured ? styles.featuredCard : ""}`}
            >
              <div className={styles.cardHeader}>
                <span className={`${styles.category} ${art.isFeatured ? styles.featuredCategory : ""}`}>
                  {art.category}
                </span>
                
                <h3 className={`${styles.cardTitle} ${art.isFeatured ? styles.featuredCardTitle : ""}`}>
                  {art.title}
                </h3>
                
                <p className={styles.summary}>{art.summary}</p>
              </div>

              <div className={styles.cardFooter}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <BookOpen size={14} /> {art.readTime}
                </span>
                <span>{art.date}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
