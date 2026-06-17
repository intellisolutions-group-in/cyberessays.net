"use client";
import React from "react";
import ThreeDCanvasBuilder from "./ThreeDCanvasBuilder";
import NoiseGrain from "./NoiseGrain";

interface ThreeDSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export default function ThreeDSection({
  children,
  className = "",
  id,
  style,
}: ThreeDSectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* 3D Rotating Topographic Wire Mesh Canvas */}
      <ThreeDCanvasBuilder />

      {/* Procedural Noise Texture Overlay */}
      <NoiseGrain />

      {/* Foreground Children */}
      <div style={{ position: "relative", zIndex: 10 }}>
        {children}
      </div>
    </section>
  );
}
