"use client";
import React from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   BackgroundEffects
   Option 2 — Infinite Source Code ghosting (2% opacity code snippets)
   Option 3 — Nebula blobs (giant glowing blurred orbs)
   Both sit in a fixed layer behind all content.
   ═══════════════════════════════════════════════════════════════════════════ */

const CODE_SNIPPETS = [
  `async function deployPipeline(config) {\n  const { env, region, replicas } = config;\n  await k8s.apply({ namespace: env, region });\n  return scale({ replicas });\n}`,
  `interface AIModel {\n  endpoint: string;\n  temperature: number;\n  stream: boolean;\n  invoke(prompt: string): Promise<Response>;\n}`,
  `SELECT u.id, u.email,\n  COUNT(s.id) AS sessions,\n  SUM(r.revenue) AS mrr\nFROM users u\nJOIN sessions s ON s.user_id = u.id\nJOIN revenue r ON r.user_id = u.id\nGROUP BY u.id\nORDER BY mrr DESC;`,
  `const pipeline = [\n  vectorize(embedding_model),\n  retrieve(top_k=8),\n  rerank(cross_encoder),\n  generate(llm, temperature=0.3),\n];`,
  `@app.route("/api/v2/infer")\nasync def infer(req: InferRequest):\n    model = await load_model(req.id)\n    return await model.predict(req.input)`,
  `export const config = {\n  regions: ["us-east-1","eu-west-1"],\n  autoscale: { min: 2, max: 50 },\n  healthCheck: "/api/health",\n  timeout: 30_000,\n};`,
  `class NeuralEngine:\n  def __init__(self, layers, lr=1e-4):\n    self.model = build(layers)\n    self.optim = AdamW(lr=lr)\n\n  def fit(self, X, y, epochs=100):\n    for e in range(epochs):\n      loss = self.step(X, y)`,
  `mutation CreateDeployment($input: DeployInput!) {\n  createDeployment(input: $input) {\n    id\n    status\n    endpoint\n    createdAt\n  }\n}`,
];

/* Nebula blob positions — top, left, size, color */
const BLOBS = [
  { top: "3%",  left: "68%", w: 700, h: 600, color: "rgba(6,182,212,0.13)"   }, // cyan — top right
  { top: "28%", left: "-8%", w: 650, h: 550, color: "rgba(124,58,237,0.14)"  }, // purple — mid left
  { top: "55%", left: "55%", w: 750, h: 650, color: "rgba(99,102,241,0.10)"  }, // indigo — mid right
  { top: "78%", left: "15%", w: 600, h: 500, color: "rgba(124,58,237,0.11)"  }, // purple — footer left
];

/* Ghost code snippet positions */
const GHOST_POSITIONS = [
  { top: "5%",  left: "2%",  rotate: "-2deg"  },
  { top: "12%", left: "72%", rotate: "1.5deg" },
  { top: "35%", left: "5%",  rotate: "2deg"   },
  { top: "42%", left: "68%", rotate: "-1deg"  },
  { top: "62%", left: "1%",  rotate: "1deg"   },
  { top: "68%", left: "65%", rotate: "-2deg"  },
  { top: "85%", left: "8%",  rotate: "1.5deg" },
  { top: "88%", left: "60%", rotate: "-1.5deg"},
];

export default function BackgroundEffects() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* ── Option 3: Nebula blobs ────────────────────────────────────────── */}
      {BLOBS.map((b, i) => (
        <div
          key={`blob-${i}`}
          style={{
            position: "absolute",
            top: b.top,
            left: b.left,
            width:  b.w,
            height: b.h,
            borderRadius: "50%",
            background: b.color,
            filter: "blur(140px)",
            transform: "translate(-50%, -50%)",
            willChange: "transform",
          }}
        />
      ))}

      {/* ── Option 2: Source Code ghosting ───────────────────────────────── */}
      {GHOST_POSITIONS.map((pos, i) => (
        <pre
          key={`code-${i}`}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            transform: `rotate(${pos.rotate})`,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
            fontSize: "0.7rem",
            lineHeight: 1.65,
            color: "rgba(180, 200, 255, 0.028)",
            whiteSpace: "pre",
            userSelect: "none",
            maxWidth: 340,
            letterSpacing: "0.02em",
          }}
        >
          {CODE_SNIPPETS[i % CODE_SNIPPETS.length]}
        </pre>
      ))}
    </div>
  );
}
