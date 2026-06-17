"use client";
import React from "react";
import styles from "./LogoWall.module.css";
import { CreditCard, Smartphone, Cloud, GitBranch, FileText, Palette, Terminal } from "lucide-react";

interface Brand {
  name: string;
  story: string;
  stat: string;
  icon: React.ReactNode;
}

export default function LogoWall() {
  const brands: Brand[] = [
    {
      name: "FinTech Gateway",
      story: "Optimized microservices architecture to process transactions securely under high load spikes.",
      stat: "High Scalability",
      icon: <CreditCard size={18} />
    },
    {
      name: "Consumer Tech",
      story: "Created an immersive retail platform for large-scale consumer device updates.",
      stat: "High Concurrency",
      icon: <Smartphone size={18} />
    },
    {
      name: "Cloud Platforms",
      story: "Accelerated visual regressions testing workflows for Edge networks.",
      stat: "Low Latency CDN",
      icon: <Cloud size={18} />
    },
    {
      name: "Task Workspaces",
      story: "Built interactive collaborative boards using WebSocket communication engines.",
      stat: "Real-time Sync",
      icon: <GitBranch size={18} />
    },
    {
      name: "Content Systems",
      story: "Optimized hierarchical content indexing for multi-tenant database systems.",
      stat: "Sub-second Queries",
      icon: <FileText size={18} />
    },
    {
      name: "Design Systems",
      story: "Created a compiler translating modern interface mocks directly to clean React code.",
      stat: "Efficient Handoff",
      icon: <Palette size={18} />
    },
    {
      name: "Developer Tools",
      story: "Engineered high-performance desktop tools leveraging multi-process system APIs.",
      stat: "Low Memory Footprint",
      icon: <Terminal size={18} />
    }
  ];

  // Duplicate the list of brands to ensure seamless loop
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className={styles.logoWall}>
      <h2 className={styles.title}>Collaborating Across Core Engineering Domains</h2>
      
      <div className="marquee-container">
        <div className="marquee-content">
          {duplicatedBrands.map((brand, index) => (
            <div key={index} className={styles.logoItem}>
              {brand.icon}
              <span>{brand.name}</span>
              
              {/* Story Tooltip on Hover */}
              <div className={styles.tooltip}>
                <div className={styles.tooltipHeader}>{brand.name} Integration</div>
                <div style={{ color: "var(--text-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  {brand.stat}
                </div>
                <div>{brand.story}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
