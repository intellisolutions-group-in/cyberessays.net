"use client";
import React, { useEffect, useRef } from "react";

export default function CyberMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetCameraRef = useRef({ x: 0, y: 0 });
  const cameraRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    let cx = width / 2;
    let cy = height / 2;

    // Streaks configuration
    interface Streak {
      x: number;      // 3D coordinates
      y: number;
      z: number;
      char: string;
      color: string;
      speed: number;
      length: number; // Trail length
    }

    const streaks: Streak[] = [];
    const maxStreaks = 250; // Dense but highly performant particle vortex
    const maxDepth = 1000;
    const fov = 400; // FOV projection multiplier

    const symbols = ["0", "1", "<", ">", "/", "+", "-", "{", "}", "[", "]", "*", "$", "§", "#", "y", "x", "z", "■", "▲", "◆"];
    const colors = [
      "rgba(124, 58, 237, 1)", // Aurora Purple
      "rgba(6, 182, 212, 1)",  // Electric Cyan
    ];

    // Helper to initialize a streak
    const initStreak = (s: Partial<Streak> = {}): Streak => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 400 + 20; // radial distribution
      
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        z: s.z !== undefined ? s.z : Math.random() * maxDepth + 10,
        char: symbols[Math.floor(Math.random() * symbols.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 8 + 6,
        length: Math.random() * 8 + 6,
        ...s,
      };
    };

    // Initialize all streaks at random depths
    for (let i = 0; i < maxStreaks; i++) {
      streaks.push(initStreak());
    }

    // Handle mouse move to steer camera
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      // Map mouse from center: -1 to 1 range
      targetCameraRef.current = {
        x: ((mx - cx) / cx) * 120, // Max camera offset X
        y: ((my - cy) / cy) * 120, // Max camera offset Y
      };
    };

    const handleMouseLeave = () => {
      targetCameraRef.current = { x: 0, y: 0 };
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      cx = width / 2;
      cy = height / 2;
    };
    window.addEventListener("resize", handleResize);

    // Animation loop
    const draw = () => {
      // Semi-transparent fill matches primary background color (#FCFCFD) to create elegant trails
      ctx.fillStyle = "rgba(252, 252, 253, 0.09)";
      ctx.fillRect(0, 0, width, height);

      // Lerp camera coordinates for smooth steering/tilt effect
      cameraRef.current.x += (targetCameraRef.current.x - cameraRef.current.x) * 0.08;
      cameraRef.current.y += (targetCameraRef.current.y - cameraRef.current.y) * 0.08;

      const camX = cameraRef.current.x;
      const camY = cameraRef.current.y;

      // Draw streaks
      for (let i = 0; i < streaks.length; i++) {
        const s = streaks[i];

        // Store previous screen coordinate for drawing trail lines
        const prevZ = s.z + s.length * 1.5;
        const prevPX = cx + (s.x / prevZ) * fov - camX * (maxDepth / prevZ);
        const prevPY = cy + (s.y / prevZ) * fov - camY * (maxDepth / prevZ);

        // Update depth
        s.z -= s.speed;

        // Reset if it passes close to screen
        if (s.z <= 0) {
          streaks[i] = initStreak({ z: maxDepth });
          continue;
        }

        // Current projected coordinate
        const px = cx + (s.x / s.z) * fov - camX * (maxDepth / s.z);
        const py = cy + (s.y / s.z) * fov - camY * (maxDepth / s.z);

        // Reset if offscreen
        if (px < -100 || px > width + 100 || py < -100 || py > height + 100) {
          streaks[i] = initStreak({ z: maxDepth });
          continue;
        }

        // Calculate opacity based on depth
        let alpha = 1 - s.z / maxDepth;
        if (s.z < 150) {
          alpha *= (s.z / 150); // Fade out as they fly past to avoid sudden clipping
        }
        
        const lineAlpha = alpha * 0.16;
        const textAlpha = alpha * 0.25;

        // 1. Draw light trails (warp speed lines)
        ctx.beginPath();
        ctx.moveTo(prevPX, prevPY);
        ctx.lineTo(px, py);
        ctx.strokeStyle = s.color.replace("1)", `${lineAlpha})`);
        ctx.lineWidth = Math.max(0.5, (1 - s.z / maxDepth) * 2.5);
        ctx.stroke();

        // 2. Draw flying code characters & symbols
        const charFontSize = Math.max(8, Math.floor((1 - s.z / maxDepth) * 20));
        ctx.font = `bold ${charFontSize}px Courier New, monospace`;
        ctx.fillStyle = s.color.replace("1)", `${textAlpha})`);
        ctx.fillText(s.char, px, py);
      }

      // 3. Faint overlay rings to emphasize vortex shape
      ctx.strokeStyle = "rgba(124, 58, 237, 0.02)";
      for (let r = 100; r < 900; r += 200) {
        ctx.beginPath();
        ctx.arc(cx - camX * (r / 900), cy - camY * (r / 900), r, 0, Math.PI * 2);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
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
