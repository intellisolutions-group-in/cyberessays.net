"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CodingScene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    let cleanup: (() => void) | null = null;

    const initScene = () => {
      const W = container.clientWidth  || window.innerWidth;
      const H = container.clientHeight || window.innerHeight;

      // ── SCENE ─────────────────────────────────────────────────────────────
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x040510);
      scene.fog = new THREE.FogExp2(0x040510, 0.09);

      // ── CAMERA ────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(46, W / H, 0.1, 100);
      camera.position.set(0.0, 1.7, 3.0);
      camera.lookAt(0.0, 1.1, -0.55);

      // ── RENDERER ──────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;

      const canvas = renderer.domElement;
      canvas.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;";
      container.appendChild(canvas);

      // ── LIGHTS ────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0x8878cc, 1.2));

      const topSpot = new THREE.SpotLight(0xffffff, 6, 20, Math.PI / 4.5, 0.55, 1.4);
      topSpot.position.set(0, 8, 0);
      topSpot.castShadow = true;
      topSpot.shadow.mapSize.set(1024, 1024);
      scene.add(topSpot);

      const screenGlow = new THREE.PointLight(0x08d8ff, 10, 4);
      screenGlow.position.set(0.32, 1.20, -0.55);
      scene.add(screenGlow);

      const laptopGlow = new THREE.PointLight(0x7c3aed, 6, 3);
      laptopGlow.position.set(-0.50, 1.10, -0.15);
      scene.add(laptopGlow);

      const fillLeft = new THREE.DirectionalLight(0x9060e0, 2.0);
      fillLeft.position.set(-4, 5, 2);
      scene.add(fillLeft);

      const rimRight = new THREE.DirectionalLight(0x06d4f0, 1.4);
      rimRight.position.set(4, 3, -2);
      scene.add(rimRight);

      const charKey = new THREE.PointLight(0xfff0d8, 2.8, 6);
      charKey.position.set(0.4, 2.5, 2.2);
      scene.add(charKey);

      // ── GEOMETRY / MATERIAL HELPERS ───────────────────────────────────────
      const mkBox = (w: number, h: number, d: number, mat: THREE.Material) => {
        const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
        m.castShadow = true; m.receiveShadow = true; return m;
      };
      const mkCyl = (rT: number, rB: number, h: number, segs: number, mat: THREE.Material) => {
        const m = new THREE.Mesh(new THREE.CylinderGeometry(rT, rB, h, segs), mat);
        m.castShadow = true; return m;
      };
      const mkSphere = (r: number, mat: THREE.Material, wS = 16, hS = 12) => {
        const m = new THREE.Mesh(new THREE.SphereGeometry(r, wS, hS), mat);
        m.castShadow = true; return m;
      };
      // ── ENVIRONMENT MATERIALS ─────────────────────────────────────────────
      const deskMat  = new THREE.MeshStandardMaterial({ color: 0x1c1a2e, roughness: 0.3, metalness: 0.5 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x353852, roughness: 0.25, metalness: 0.9 });
      const darkMat  = new THREE.MeshStandardMaterial({ color: 0x0e1020, roughness: 0.6,  metalness: 0.2 });
      const seamMat  = new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 2.5, roughness: 0.2 });
      const lapMat   = new THREE.MeshStandardMaterial({ color: 0x252835, roughness: 0.25, metalness: 0.85 });
      const scrMat   = new THREE.MeshStandardMaterial({ color: 0x06c8f0, emissive: 0x06b6d4, emissiveIntensity: 2.0, transparent: true, opacity: 0.82 });
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x09cef0, roughness: 0.05, metalness: 0.95, transparent: true, opacity: 0.4 });
      const chairMat = new THREE.MeshStandardMaterial({ color: 0x0d0e1e, roughness: 0.75 });
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x080910, roughness: 0.12, metalness: 0.65 });
      const gpuMat   = new THREE.MeshStandardMaterial({ color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 2.0 });
      const fanMat   = new THREE.MeshStandardMaterial({ color: 0x06c8f0, emissive: 0x06c8f0, emissiveIntensity: 2.5 });
      const mugMat   = new THREE.MeshStandardMaterial({ color: 0x1e1e2e, roughness: 0.55, metalness: 0.15 });
      const mugSteam = new THREE.MeshStandardMaterial({ color: 0xffffff, transparent: true, opacity: 0.12, roughness: 1.0 });
      const bookMats = [
        new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0x0e7490, roughness: 0.7 }),
        new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 }),
      ];
      const lampMat  = new THREE.MeshStandardMaterial({ color: 0x252838, roughness: 0.3, metalness: 0.85 });
      const lampGlow = new THREE.MeshStandardMaterial({ color: 0xfff5d0, emissive: 0xfff5d0, emissiveIntensity: 3.0 });

      // ══════════════════════════════════════════════════════════════════════
      // ── FLOOR ─────────────────────────────────────────────────────────────
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.receiveShadow = true;
      scene.add(floor);
      const grid = new THREE.GridHelper(30, 32, 0x3c1a8a, 0x0f0820);
      grid.position.y = 0.003;
      scene.add(grid);

      // Subtle reflective floor quad under desk area
      const glossFloor = new THREE.Mesh(
        new THREE.PlaneGeometry(4, 4),
        new THREE.MeshStandardMaterial({ color: 0x1a1040, roughness: 0.08, metalness: 0.8, transparent: true, opacity: 0.4 })
      );
      glossFloor.rotation.x = -Math.PI / 2;
      glossFloor.position.set(0.35, 0.002, -0.45);
      scene.add(glossFloor);

      // ── DESK ──────────────────────────────────────────────────────────────
      const deskG = new THREE.Group();
      deskG.position.set(0, 0, -0.55);
      scene.add(deskG);

      const deskTop = mkBox(2.0, 0.065, 0.90, deskMat);
      deskTop.position.y = 0.92;
      deskG.add(deskTop);

      const edgeTrim = mkBox(2.0, 0.009, 0.012, seamMat);
      edgeTrim.position.set(0, 0.885, 0.455);
      deskG.add(edgeTrim);

      // Cable management rail underneath
      const cableRail = mkBox(1.5, 0.025, 0.035, metalMat);
      cableRail.position.set(0, 0.86, -0.32);
      deskG.add(cableRail);

      [[-0.88, -0.40], [0.88, -0.40], [-0.88, 0.40], [0.88, 0.40]].forEach(([x, z]) => {
        const leg = mkCyl(0.025, 0.035, 0.92, 8, metalMat);
        leg.position.set(x, 0.46, z);
        deskG.add(leg);
        const foot = mkCyl(0.055, 0.055, 0.015, 8, metalMat);
        foot.position.set(x, 0.008, z);
        deskG.add(foot);
      });

      // ── LAPTOP (left side) ─────────────────────────────────────────────────
      const lapG = new THREE.Group();
      lapG.position.set(-0.52, 0.922, 0.10);
      lapG.rotation.y = 0.32;
      deskG.add(lapG);

      const lapBase = mkBox(0.58, 0.022, 0.40, lapMat);
      lapBase.position.y = 0.011;
      lapG.add(lapBase);

      const lidG = new THREE.Group();
      lidG.position.set(0, 0.022, 0.20);
      lidG.rotation.x = 1.85;
      lapG.add(lidG);

      const lid = mkBox(0.58, 0.018, 0.38, lapMat);
      lid.position.set(0, 0, -0.19);
      lidG.add(lid);

      // Apple logo-style glow
      const lapGlowMesh = mkBox(0.08, 0.10, 0.005, new THREE.MeshStandardMaterial({
        color: 0x7c3aed, emissive: 0x7c3aed, emissiveIntensity: 1.0, transparent: true, opacity: 0.6
      }));
      lapGlowMesh.position.set(0, 0.005, -0.01);
      lidG.add(lapGlowMesh);

      const lapScr = mkBox(0.54, 0.012, 0.34, scrMat);
      lapScr.position.set(0, -0.015, -0.185);
      lidG.add(lapScr);

      // ── PC MONITOR (center) ────────────────────────────────────────────────
      const monG = new THREE.Group();
      monG.position.set(0.38, 0.922, 0.22);
      deskG.add(monG);

      const monBase = mkBox(0.26, 0.014, 0.20, metalMat);
      monBase.position.y = 0.007;
      monG.add(monBase);

      const monNeck = mkCyl(0.018, 0.018, 0.24, 8, metalMat);
      monNeck.position.set(0, 0.12, -0.05);
      monNeck.rotation.x = 0.08;
      monG.add(monNeck);

      // Monitor bezel
      const monBezel = mkBox(0.70, 0.44, 0.016, lapMat);
      monBezel.position.set(0, 0.305, -0.06);
      monG.add(monBezel);

      const monScreen = mkBox(0.67, 0.40, 0.010, scrMat);
      monScreen.position.set(0, 0.305, -0.06);
      monG.add(monScreen);

      // RGB strip on monitor base
      const monStrip = mkBox(0.68, 0.007, 0.006, seamMat);
      monStrip.position.set(0, 0.104, -0.055);
      monG.add(monStrip);

      // ── KEYBOARD ──────────────────────────────────────────────────────────
      const kbG = new THREE.Group();
      kbG.position.set(0.38, 0.922, -0.10);
      deskG.add(kbG);

      const kbBase = mkBox(0.50, 0.015, 0.18, darkMat);
      kbG.add(kbBase);

      const kbStrip = mkBox(0.50, 0.006, 0.006, seamMat);
      kbStrip.position.set(0, 0.01, 0.09);
      kbG.add(kbStrip);

      for (let row = 0; row < 4; row++) {
        const cols = [13, 12, 12, 5];
        for (let c = 0; c < cols[row]; c++) {
          const k = mkBox(0.028, 0.010, 0.024, metalMat);
          k.position.set(-0.175 + c * 0.031, 0.013, -0.058 + row * 0.036);
          kbG.add(k);
        }
      }

      // ── MOUSE ─────────────────────────────────────────────────────────────
      const mouseG = new THREE.Group();
      mouseG.position.set(0.64, 0.922, -0.10);
      deskG.add(mouseG);

      const mouseBody = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.026, 0.080), darkMat);
      mouseG.add(mouseBody);

      const mouseLine = mkBox(0.047, 0.007, 0.081, seamMat);
      mouseLine.position.y = -0.016;
      mouseG.add(mouseLine);

      // ── PC TOWER (right side) ──────────────────────────────────────────────
      const towerG = new THREE.Group();
      towerG.position.set(0.82, 0.922, 0.06);
      deskG.add(towerG);

      const towerBody = mkBox(0.22, 0.44, 0.44, darkMat);
      towerBody.position.y = 0.22;
      towerG.add(towerBody);

      const glassPanel = new THREE.Mesh(new THREE.BoxGeometry(0.009, 0.42, 0.42), glassMat);
      glassPanel.position.set(-0.106, 0.22, 0);
      towerG.add(glassPanel);

      const gpuBoard = mkBox(0.065, 0.09, 0.26, gpuMat);
      gpuBoard.position.set(-0.02, 0.16, 0.05);
      towerG.add(gpuBoard);

      [0.10, 0.28].forEach((y) => {
        const fanMesh = mkCyl(0.062, 0.062, 0.022, 10, fanMat);
        fanMesh.rotation.z = Math.PI / 2;
        fanMesh.position.set(0.085, y, 0.14);
        towerG.add(fanMesh);
      });

      const towerStrip = mkBox(0.009, 0.40, 0.008, seamMat);
      towerStrip.position.set(0.11, 0.22, 0.22);
      towerG.add(towerStrip);

      // ── COFFEE MUG ─────────────────────────────────────────────────────────
      const mugG = new THREE.Group();
      mugG.position.set(-0.88, 0.922, -0.08);
      deskG.add(mugG);

      const mugBody = mkCyl(0.038, 0.033, 0.09, 10, mugMat);
      mugBody.position.y = 0.045;
      mugG.add(mugBody);

      const mugBase = mkCyl(0.038, 0.040, 0.010, 10, mugMat);
      mugBase.position.y = 0.005;
      mugG.add(mugBase);

      // Mug handle
      const handleMesh = new THREE.Mesh(new THREE.TorusGeometry(0.022, 0.006, 6, 10, Math.PI), mugMat);
      handleMesh.position.set(0.044, 0.042, 0);
      handleMesh.rotation.y = Math.PI / 2;
      mugG.add(handleMesh);

      // Steam particles
      for (let i = 0; i < 3; i++) {
        const steamBall = mkSphere(0.008 + i * 0.003, mugSteam, 6, 4);
        steamBall.position.set((i - 1) * 0.012, 0.10 + i * 0.028, 0);
        mugG.add(steamBall);
      }

      // ── BOOK STACK ────────────────────────────────────────────────────────
      const bookG = new THREE.Group();
      bookG.position.set(-0.82, 0.922, 0.30);
      deskG.add(bookG);

      [0, 1, 2].forEach((i) => {
        const book = mkBox(0.085, 0.030 - i * 0.003, 0.12, bookMats[i]);
        book.position.y = i * 0.031;
        book.rotation.y = (i - 1) * 0.06;
        bookG.add(book);
      });

      // ── DESK LAMP ─────────────────────────────────────────────────────────
      const lampG = new THREE.Group();
      lampG.position.set(-0.88, 0.922, -0.30);
      deskG.add(lampG);

      const lampBase = mkCyl(0.042, 0.042, 0.012, 8, lampMat);
      lampBase.position.y = 0.006;
      lampG.add(lampBase);

      const lampArm1 = mkCyl(0.008, 0.008, 0.22, 6, lampMat);
      lampArm1.position.set(0, 0.11, 0);
      lampArm1.rotation.z = 0.28;
      lampG.add(lampArm1);

      const lampArm2 = mkCyl(0.007, 0.007, 0.18, 6, lampMat);
      lampArm2.position.set(0.068, 0.242, 0);
      lampArm2.rotation.z = -0.45;
      lampG.add(lampArm2);

      const lampHead = mkCyl(0.038, 0.022, 0.045, 8, lampMat);
      lampHead.position.set(0.090, 0.33, 0);
      lampHead.rotation.z = -Math.PI / 2;
      lampG.add(lampHead);

      const lampBulb = mkSphere(0.018, lampGlow, 8, 6);
      lampBulb.position.set(0.105, 0.33, 0);
      lampG.add(lampBulb);

      // Lamp point light
      const deskLampLight = new THREE.PointLight(0xfff5d0, 3, 2.5);
      deskLampLight.position.set(-0.78, 1.26, -0.85);
      scene.add(deskLampLight);

      // ── CHAIR ─────────────────────────────────────────────────────────────
      const chairG = new THREE.Group();
      chairG.position.set(0.35, 0, -1.08);
      scene.add(chairG);

      for (let i = 0; i < 5; i++) {
        const spoke = mkBox(0.34, 0.016, 0.026, metalMat);
        spoke.rotation.y = (i * Math.PI * 2) / 5;
        spoke.position.y = 0.008;
        chairG.add(spoke);
      }

      const wheelRing = mkCyl(0.14, 0.14, 0.010, 10, metalMat);
      wheelRing.position.y = 0.005;
      chairG.add(wheelRing);

      const chairStem = mkCyl(0.032, 0.038, 0.58, 10, metalMat);
      chairStem.position.y = 0.29;
      chairG.add(chairStem);

      const cushion = mkBox(0.56, 0.072, 0.54, chairMat);
      cushion.position.y = 0.62;
      chairG.add(cushion);

      const cushionTrim = mkBox(0.56, 0.010, 0.010, seamMat);
      cushionTrim.position.set(0, 0.655, 0.27);
      chairG.add(cushionTrim);

      const backSupport = mkBox(0.06, 0.60, 0.04, metalMat);
      backSupport.position.set(0, 0.95, -0.265);
      chairG.add(backSupport);

      const backCushion = mkBox(0.50, 0.56, 0.075, chairMat);
      backCushion.position.set(0, 0.985, -0.25);
      backCushion.rotation.x = -0.08;
      chairG.add(backCushion);

      const lumbarTrim = mkBox(0.40, 0.055, 0.014, seamMat);
      lumbarTrim.position.set(0, 0.88, -0.24);
      chairG.add(lumbarTrim);

      [-0.30, 0.30].forEach((x) => {
        const armrest = mkBox(0.065, 0.022, 0.30, metalMat);
        armrest.position.set(x, 0.76, 0.04);
        chairG.add(armrest);
      });

      // ── CODE PARTICLES ────────────────────────────────────────────────────
      const PT = 90;
      const ptGeo = new THREE.BufferGeometry();
      const ptPos = new Float32Array(PT * 3);
      const ptSpd = new Float32Array(PT);
      for (let i = 0; i < PT; i++) {
        ptPos[i*3]   = 0.38 + (Math.random() - 0.5) * 0.45;
        ptPos[i*3+1] = 1.00 + (Math.random() - 0.5) * 0.30;
        ptPos[i*3+2] = -0.38;
        ptSpd[i] = 0.005 + Math.random() * 0.018;
      }
      ptGeo.setAttribute("position", new THREE.BufferAttribute(ptPos, 3));
      const ptMat = new THREE.PointsMaterial({ color: 0x06c8f0, size: 0.024, transparent: true, opacity: 0.85 });
      scene.add(new THREE.Points(ptGeo, ptMat));

      const mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth  - 0.5) * 0.30;
        mouse.y = (e.clientY / window.innerHeight - 0.5) * -0.30;
      };
      window.addEventListener("mousemove", onMouse);

      // ── ANIMATION LOOP ────────────────────────────────────────────────────
      let rafId = 0;

      const animate = (time: number) => {
        rafId = requestAnimationFrame(animate);
        const t = time * 0.001;

        // ── CODE PARTICLES ──
        const pa = ptGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < PT; i++) {
          pa[i*3+2] += ptSpd[i];
          pa[i*3]   += Math.sin(t + i * 0.8) * 0.0012;
          pa[i*3+1] += Math.cos(t * 0.6 + i) * 0.0009;
          if (pa[i*3+2] > 0.18) {
            pa[i*3]   = 0.38 + (Math.random() - 0.5) * 0.45;
            pa[i*3+1] = 1.00 + Math.random() * 0.30;
            pa[i*3+2] = -0.38;
          }
        }
        ptGeo.attributes.position.needsUpdate = true;

        // ── ENVIRONMENT ANIMATION ──
        screenGlow.intensity = 9 + Math.sin(t * 1.6) * 1.8;
        laptopGlow.intensity = 5.5 + Math.cos(t * 2.0) * 1.2;
        // Steam bob
        mugG.children.slice(-3).forEach((s, i) => {
          s.position.y = 0.10 + i * 0.028 + Math.sin(t * 1.2 + i) * 0.008;
          const mesh = s as THREE.Mesh;
          if (mesh.material && (mesh.material as THREE.MeshStandardMaterial).opacity !== undefined) {
            (mesh.material as THREE.MeshStandardMaterial).setValues({
              opacity: 0.08 + Math.sin(t * 0.8 + i) * 0.05
            });
          }
        });

        // ── CAMERA ──
        const tPos  = new THREE.Vector3(0.0, 1.7, 3.0);
        const tLook = new THREE.Vector3(0.0, 1.1, -0.55);

        // Add mouse parallax
        tPos.x += mouse.x;
        tPos.y += mouse.y;

        camera.position.lerp(tPos, 0.09);
        camera.lookAt(tLook);

        renderer.render(scene, camera);
      };

      rafId = requestAnimationFrame(animate);

      // ── RESIZE ────────────────────────────────────────────────────────────
      const onResize = () => {
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener("resize", onResize);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("mousemove", onMouse);
        renderer.dispose();
        if (container.contains(canvas)) container.removeChild(canvas);
      };
    };

    const observer = new ResizeObserver((entries) => {
      const e = entries[0];
      if (e.contentRect.width > 0 && e.contentRect.height > 0) {
        observer.disconnect();
        initScene();
      }
    });

    if (container.clientWidth > 0 && container.clientHeight > 0) {
      initScene();
    } else {
      observer.observe(container);
    }

    return () => { observer.disconnect(); if (cleanup) cleanup(); };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
