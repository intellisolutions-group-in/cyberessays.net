import styles from "./page.module.css";
import { Shield, Sparkles, Code2, Eye } from "lucide-react";

export default function AboutPage() {
  return (
    <div className={styles.section}>
      <div className="container">
        
        {/* About Hero Header */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>About Us</span>
          <h1 className={styles.title}>We Build Systems for the Next Era</h1>
          <p className={styles.desc}>
            CyberEssays Digital Services is an elite team of senior developers, system architects, and UX designers. We help ambitious organizations build digital infrastructure that scales.
          </p>
        </div>

      </div>

      {/* Vertical Journey Timeline */}
      <section className={styles.journeySection}>
        <div className="container">
          <h2 className={styles.subtitle}>Our Evolution</h2>
          
          <div className={styles.timeline}>
            <div className={styles.timelineLine}></div>

            {/* Item 1 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2020: Foundation</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Engineering Hub Born</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  CyberEssays Digital Services was founded with a singular purpose: to deliver high-precision engineering consulting for high-growth startups, setting strict performance targets.
                </p>
              </div>
              <div className={styles.timelineNode}></div>
              <div className={styles.timelineSpace}></div>
            </div>

            {/* Item 2 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineSpace}></div>
              <div className={styles.timelineNode}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2022: Scaling Up</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Enterprise-Grade Expansion</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  We expanded into high-frequency payment routing architectures, helping digital platforms process thousands of transaction logs under high-availability parameters.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2024: AI Architectures</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>Neural Systems & LLMs</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Integrated AI research divisions into the software engineering pipelines. We designed custom neural model loaders and vector storage caches for rapid automated scaling.
                </p>
              </div>
              <div className={styles.timelineNode}></div>
              <div className={styles.timelineSpace}></div>
            </div>

            {/* Item 4 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineSpace}></div>
              <div className={styles.timelineNode}></div>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2026: Era 3.0</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>The Digital Transformation Engine</h3>
                <p style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
                  Launching CyberEssays 3.0: A next-generation unified platform integrating serverless architecture, neural automation agents, and state-of-the-art visual languages.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Impact Grid */}
      <section className={styles.impactSection}>
        <div className="container">
          <h2 className={styles.subtitle} style={{ marginBottom: "3.5rem" }}>Platform Scalability Metrics</h2>
          
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <div className={styles.impactVal}>50+</div>
              <div className={styles.impactLabel}>Enterprise Platforms Delivered</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactVal}>140k+</div>
              <div className={styles.impactLabel}>Active Monthly Sessions Managed</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactVal}>12k+</div>
              <div className={styles.impactLabel}>Transactions Processed</div>
            </div>
            <div className={styles.impactCard}>
              <div className={styles.impactVal}>Enterprise</div>
              <div className={styles.impactLabel}>Average Cluster SLA Status</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture & Core Pillars */}
      <section className={styles.cultureSection}>
        <div className="container">
          <h2 className={styles.subtitle}>Engineering Culture</h2>
          
          <div className={styles.cultureGrid}>
            <div className={styles.cultureCard}>
              <div className={styles.cultureIcon}>
                <Code2 size={24} />
              </div>
              <h3 className={styles.cultureTitle}>Engineering Rigor</h3>
              <p className={styles.cultureDesc}>
                We treat software engineering as a science. We enforce type safety, zero redundancy, and continuous profiling checkups on all builds.
              </p>
            </div>

            <div className={styles.cultureCard}>
              <div className={styles.cultureIcon}>
                <Sparkles size={24} />
              </div>
              <h3 className={styles.cultureTitle}>Aesthetic Excellence</h3>
              <p className={styles.cultureDesc}>
                Visual design is not secondary. We craft interfaces that look and feel premium, utilizing responsive layouts, hover tilts, and clean white spaces.
              </p>
            </div>

            <div className={styles.cultureCard}>
              <div className={styles.cultureIcon}>
                <Shield size={24} />
              </div>
              <h3 className={styles.cultureTitle}>Sovereign Security</h3>
              <p className={styles.cultureDesc}>
                All data networks are built under zero-trust assumptions. Secure authentication logs and edge protection stand guard on every endpoint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section style={{ padding: "6rem 0", background: "var(--bg-primary)" }}>
        <div className={`container ${styles.visionGrid}`}>
          <div>
            <span className={styles.tagline}>Future Roadmap</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.5rem", fontWeight: 800, color: "var(--text-primary)", letterSpacing: "-0.02em", marginTop: "1rem" }}>
              Our Vision for the Digital Future
            </h2>
            <p style={{ marginTop: "1.5rem", fontSize: "1rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              We believe the next decade of technology belongs to companies that integrate intelligent agent architectures seamlessly into their core platforms. We are dedicated to providing the underlying engineering framework that makes this transition possible.
            </p>
          </div>
          <div className="glass-panel" style={{ height: "300px", borderRadius: "var(--border-radius-xl)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <Eye size={48} color="var(--accent-primary)" style={{ opacity: 0.15, transform: "scale(2.5)" }} />
            <div style={{ position: "absolute", bottom: "2rem", left: "2rem" }}>
              <div style={{ fontWeight: 700 }}>CyberEssays Labs Research</div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Designing system scaling models since 2020.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
