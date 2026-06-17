"use client";
import React, { useEffect, useRef } from "react";

export default function ThreeDCanvasBuilder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    // Handle mouse movement to shift camera tilt smoothly
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Map mouse coordinates to range [-1, 1]
      mouseRef.current.targetX = (e.clientX / innerWidth) * 2 - 1;
      mouseRef.current.targetY = (e.clientY / innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize canvas to parent bounds
    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      canvas.width = rect?.width || window.innerWidth;
      canvas.height = rect?.height || 500;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Grid sizing
    const cols = 20;
    const rows = 20;
    const spacingX = 55;
    const spacingZ = 55;
    const gridWidth = (cols - 1) * spacingX;
    const gridDepth = (rows - 1) * spacingZ;

    const render = () => {
      time += 0.012;

      // Linear interpolation for smooth mouse reactivity
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 30; // lower center point for perspective view

      // 3D Projection parameters
      const cameraDist = 800;
      const yaw = mouseRef.current.x * 0.4; // left-right angle
      const pitch = 0.6 + mouseRef.current.y * 0.3; // down-looking angle

      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosPitch = Math.cos(pitch);
      const sinPitch = Math.sin(pitch);

      // Pre-project nodes
      const nodes: { sx: number; sy: number; alpha: number; yVal: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        nodes[r] = [];
        for (let c = 0; c < cols; c++) {
          // Initial point coords on flat ground grid relative to grid center
          const gridX = c * spacingX - gridWidth / 2;
          const gridZ = r * spacingZ - gridDepth / 2;

          // Double sine wave function mapping coordinates and distance to a height
          const dist = Math.sqrt(gridX * gridX + gridZ * gridZ);
          const yVal =
            Math.sin(dist * 0.008 - time * 1.5) * 40 +
            Math.sin((gridX + gridZ) * 0.005 + time) * 20;

          // Yaw rotation (Y-axis)
          const rx1 = gridX * cosYaw - gridZ * sinYaw;
          const rz1 = gridX * sinYaw + gridZ * cosYaw;

          // Pitch rotation (X-axis)
          const ry2 = yVal * cosPitch - rz1 * sinPitch;
          const rz2 = yVal * sinPitch + rz1 * cosPitch;

          // 2D screen projections
          const depth = cameraDist + rz2;
          const scale = cameraDist / depth;

          const sx = centerX + rx1 * scale;
          const sy = centerY + ry2 * scale;

          // Alpha fade-out based on Z depth
          let alpha = (1 - (rz2 + gridDepth / 2) / gridDepth) * 0.6;
          if (alpha < 0) alpha = 0;
          if (alpha > 1) alpha = 1;

          nodes[r][c] = { sx, sy, alpha, yVal };
        }
      }

      // Draw connection wires
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = nodes[r][c];

          // Draw wire horizontally to right node
          if (c < cols - 1) {
            const rightPt = nodes[r][c + 1];
            ctx.beginPath();
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(rightPt.sx, rightPt.sy);

            const avgAlpha = (pt.alpha + rightPt.alpha) / 2;
            const avgY = (pt.yVal + rightPt.yVal) / 2;

            // Electric Cyan gradient for peaks, Aurora Purple for valleys
            const color = avgY > 5
              ? `rgba(6, 182, 212, ${avgAlpha * 0.2})`
              : `rgba(124, 58, 237, ${avgAlpha * 0.2})`;

            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Draw wire vertically to bottom node
          if (r < rows - 1) {
            const bottomPt = nodes[r + 1][c];
            ctx.beginPath();
            ctx.moveTo(pt.sx, pt.sy);
            ctx.lineTo(bottomPt.sx, bottomPt.sy);

            const avgAlpha = (pt.alpha + bottomPt.alpha) / 2;
            const avgY = (pt.yVal + bottomPt.yVal) / 2;

            const color = avgY > 5
              ? `rgba(6, 182, 212, ${avgAlpha * 0.2})`
              : `rgba(124, 58, 237, ${avgAlpha * 0.2})`;

            ctx.strokeStyle = color;
            ctx.lineWidth = 1;
            ctx.stroke();
          }

          // Small subtle glowing dots on high points
          if (pt.yVal > 25 && pt.alpha > 0.2) {
            ctx.beginPath();
            ctx.arc(pt.sx, pt.sy, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(6, 182, 212, ${pt.alpha * 0.6})`;
            ctx.fill();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
