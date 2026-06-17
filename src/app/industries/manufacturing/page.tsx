"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./manufacturing.module.css";
import { Terminal, Settings, ShieldAlert, Activity, Network } from "lucide-react";

interface ModbusRegister {
  address: string;
  name: string;
  value: number;
  minVal: number;
  maxVal: number;
  unit: string;
  criticalThreshold: number;
}

interface ModbusFrame {
  id: string;
  direction: "TX" | "RX";
  hex: string;
  timestamp: string;
}

export default function ManufacturingIndustryPage() {
  const [registers, setRegisters] = useState<ModbusRegister[]>([
    {
      address: "0x40001",
      name: "Chamber Temperature",
      value: 74.2,
      minVal: 65,
      maxVal: 85,
      unit: "°C",
      criticalThreshold: 95.0,
    },
    {
      address: "0x40002",
      name: "Hydraulic Pressure",
      value: 185.4,
      minVal: 170,
      maxVal: 200,
      unit: "bar",
      criticalThreshold: 220.0,
    },
    {
      address: "0x40003",
      name: "Rotor Vibration",
      value: 2.1,
      minVal: 1.0,
      maxVal: 3.5,
      unit: "mm/s",
      criticalThreshold: 4.5,
    },
    {
      address: "0x40004",
      name: "Bus Voltage",
      value: 480.2,
      minVal: 470,
      maxVal: 490,
      unit: "V",
      criticalThreshold: 500.0,
    },
  ]);

  const [isAnomalyActive, setIsAnomalyActive] = useState(false);
  const [frames, setFrames] = useState<ModbusFrame[]>([
    { id: "f-1", direction: "TX", hex: "01 03 00 00 00 04 44 09", timestamp: "12:00:00" },
    { id: "f-2", direction: "RX", hex: "01 03 08 02 E6 07 3E 00 15 01 E0 F2 A2", timestamp: "12:00:01" },
  ]);

  const [oeeIndex, setOeeIndex] = useState(0.984);
  const [ping, setPing] = useState(1.8);
  const [activeAlerts, setActiveAlerts] = useState(0);

  const frameContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll hex stream
  useEffect(() => {
    if (frameContainerRef.current) {
      frameContainerRef.current.scrollTop = frameContainerRef.current.scrollHeight;
    }
  }, [frames]);

  // Periodic sensor fluctuations and raw Modbus hex frames simulator
  useEffect(() => {
    const interval = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString([], { hour12: false });
      
      // Hex generation helper
      const makeHexByte = () => Math.floor(Math.random() * 256).toString(16).padStart(2, "0").toUpperCase();

      if (isAnomalyActive) {
        // High readings
        setRegisters((prev) =>
          prev.map((reg) => {
            if (reg.address === "0x40001") {
              const val = parseFloat((97.4 + (Math.random() - 0.5) * 1.5).toFixed(1));
              return { ...reg, value: val };
            }
            if (reg.address === "0x40003") {
              const val = parseFloat((5.1 + (Math.random() - 0.5) * 0.4).toFixed(2));
              return { ...reg, value: val };
            }
            const val = parseFloat((reg.maxVal + (Math.random() - 0.5) * (reg.maxVal * 0.05)).toFixed(1));
            return { ...reg, value: val };
          })
        );

        setOeeIndex((prev) => Math.max(0.620, parseFloat((prev - Math.random() * 0.025).toFixed(3))));
        setPing((prev) => parseFloat(Math.min(8.5, Math.max(2.5, prev + (Math.random() - 0.5) * 0.8)).toFixed(2)));

        // Inject alert frames
        setFrames((prev) => [
          ...prev,
          { id: `f-${Date.now()}-tx`, direction: "TX", hex: `01 06 00 01 00 ${makeHexByte()} C4 B9`, timestamp: timeStr },
          { id: `f-${Date.now()}-rx`, direction: "RX", hex: `01 83 02 80 ${makeHexByte()} ${makeHexByte()} F1 23`, timestamp: timeStr },
        ]);
      } else {
        // Normal walk
        setRegisters((prev) =>
          prev.map((reg) => {
            const delta = (Math.random() - 0.5) * (reg.maxVal - reg.minVal) * 0.08;
            let newVal = parseFloat((reg.value + delta).toFixed(reg.address === "0x40003" ? 2 : 1));
            if (newVal < reg.minVal) newVal = reg.minVal;
            if (newVal > reg.maxVal) newVal = reg.maxVal;
            return { ...reg, value: newVal };
          })
        );

        setOeeIndex((prev) => parseFloat(Math.min(0.995, Math.max(0.975, prev + (Math.random() - 0.5) * 0.001)).toFixed(3)));
        setPing((prev) => parseFloat(Math.min(2.5, Math.max(1.2, prev + (Math.random() - 0.5) * 0.2)).toFixed(2)));

        if (Math.random() < 0.5) {
          setFrames((prev) => [
            ...prev,
            { id: `f-${Date.now()}-tx`, direction: "TX", hex: "01 03 00 00 00 04 44 09", timestamp: timeStr },
            { id: `f-${Date.now()}-rx`, direction: "RX", hex: `01 03 08 02 E6 07 ${makeHexByte()} 00 ${makeHexByte()} 01 E0 F2 A2`, timestamp: timeStr },
          ]);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isAnomalyActive]);

  const toggleAnomaly = () => {
    const timeStr = new Date().toLocaleTimeString([], { hour12: false });

    if (!isAnomalyActive) {
      setIsAnomalyActive(true);
      setActiveAlerts(2);
      setRegisters((prev) =>
        prev.map((reg) => {
          if (reg.address === "0x40001") return { ...reg, value: 98.6 };
          if (reg.address === "0x40003") return { ...reg, value: 5.2 };
          return reg;
        })
      );
      setFrames((prev) => [
        ...prev,
        { id: `f-event-${Date.now()}-tx`, direction: "TX", hex: "01 06 00 00 00 FA 08 3B", timestamp: timeStr },
        { id: `f-event-${Date.now()}-rx`, direction: "RX", hex: "01 86 01 A0 3C F2", timestamp: timeStr },
      ]);
    } else {
      setIsAnomalyActive(false);
      setActiveAlerts(0);
      setRegisters((prev) =>
        prev.map((reg) => {
          if (reg.address === "0x40001") return { ...reg, value: 74.2 };
          if (reg.address === "0x40003") return { ...reg, value: 2.1 };
          return reg;
        })
      );
      setOeeIndex(0.984);
      setFrames((prev) => [
        ...prev,
        { id: `f-resolve-${Date.now()}-tx`, direction: "TX", hex: "01 06 00 00 00 00 89 CA", timestamp: timeStr },
        { id: `f-resolve-${Date.now()}-rx`, direction: "RX", hex: "01 06 00 00 00 00 89 CA", timestamp: timeStr },
      ]);
    }
  };

  const handleSliderChange = (address: string, newVal: number) => {
    setRegisters((prev) =>
      prev.map((reg) => {
        if (reg.address === address) {
          const isCritical = newVal >= reg.criticalThreshold;
          if (isCritical && !isAnomalyActive) {
            setIsAnomalyActive(true);
            setActiveAlerts((a) => a + 1);
          }
          return { ...reg, value: newVal };
        }
        return reg;
      })
    );
  };

  return (
    <div className={styles.manufacturingPage}>
      <div className="container">
        
        {/* Title Block */}
        <div className={styles.titleBlock}>
          <span className={styles.tagline}>Industrial IoT & Edge Analytics</span>
          <h1 className={styles.title}>Industrial Telemetry & Edge Control</h1>
          <p className={styles.desc}>
            We deploy secure, real-time edge gateways that aggregate high-frequency sensor streams, analyze vibrational anomalies, and execute instant emergency response protocols.
          </p>
        </div>

        {/* Dynamic Two-Column Layout Grid */}
        <div className={styles.dashboardGrid}>
          
          {/* Column 1: Modbus TCP Register Configuration */}
          <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "var(--border-radius-xl)", padding: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
              <Settings size={20} color="var(--accent-highlight)" /> Modbus TCP Holding Registers
            </h2>
            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.4 }}>
              Inspect and override register telemetry values. Exceeding thresholds triggers anomalies in the PLC controller and triggers hex error codes.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
              {registers.map((reg) => {
                const isCritical = reg.value >= reg.criticalThreshold;
                return (
                  <div
                    key={reg.address}
                    style={{
                      background: isCritical ? "rgba(239, 68, 68, 0.05)" : "rgba(255, 255, 255, 0.01)",
                      border: isCritical ? "1px solid rgba(239, 68, 68, 0.25)" : "1px solid rgba(255, 255, 255, 0.04)",
                      borderRadius: "8px",
                      padding: "1rem"
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                      <div>
                        <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--accent-highlight)", fontWeight: 700, marginRight: "0.5rem" }}>
                          {reg.address}
                        </span>
                        <strong style={{ fontSize: "0.85rem", color: "#fff" }}>{reg.name}</strong>
                      </div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 800, fontFamily: "monospace", color: isCritical ? "var(--accent-highlight)" : "var(--accent-success)" }}>
                        {reg.value} {reg.unit}
                      </span>
                    </div>

                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                      <input
                        type="range"
                        min={reg.minVal}
                        max={reg.criticalThreshold + 10}
                        step="0.1"
                        value={reg.value}
                        onChange={(e) => handleSliderChange(reg.address, parseFloat(e.target.value))}
                        style={{ flex: 1, accentColor: isCritical ? "var(--accent-highlight)" : "var(--accent-success)" }}
                      />
                      <span style={{ fontSize: "0.65rem", color: "var(--text-secondary)" }}>
                        Limit: {reg.criticalThreshold} {reg.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Diagnostic Stream & Alarm Override */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Alarm Override Status Card */}
            <div
              style={{
                background: isAnomalyActive ? "rgba(239, 68, 68, 0.08)" : "rgba(13, 18, 37, 0.4)",
                border: isAnomalyActive ? "1px solid var(--accent-highlight)" : "var(--border-glass)",
                borderRadius: "12px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem"
              }}
            >
              <ShieldAlert size={36} color={isAnomalyActive ? "var(--accent-highlight)" : "var(--accent-success)"} />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff" }}>
                  {isAnomalyActive ? "Emergency Alarm Alerting" : "Siren Override Safe"}
                </h3>
                <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginTop: "0.15rem" }}>
                  {isAnomalyActive ? "PLC controller shunt sequence initialized." : "No active telemetry limit violations."}
                </span>
              </div>
              <button
                onClick={toggleAnomaly}
                style={{
                  background: isAnomalyActive ? "var(--accent-highlight)" : "transparent",
                  color: isAnomalyActive ? "#fff" : "#fff",
                  border: isAnomalyActive ? "none" : "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "20px",
                  padding: "0.4rem 1rem",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  cursor: "pointer"
                }}
              >
                {isAnomalyActive ? "Resolve" : "Trigger"}
              </button>
            </div>

            {/* Raw Modbus Byte Hex Stream */}
            <div style={{ background: "rgba(13, 18, 37, 0.4)", border: "var(--border-glass)", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "0.75rem", flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Terminal size={16} /> Modbus Hex Stream
                </span>
                <span style={{ fontSize: "0.6rem", color: "var(--text-secondary)" }}>RTU Frame Decoder</span>
              </div>

              <div
                ref={frameContainerRef}
                style={{
                  background: "#040814",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "6px",
                  padding: "0.75rem",
                  fontFamily: "monospace",
                  fontSize: "0.7rem",
                  height: "220px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem"
                }}
              >
                {frames.map((f) => (
                  <div key={f.id} style={{ display: "flex", gap: "0.5rem" }}>
                    <span style={{ color: "var(--text-secondary)" }}>[{f.timestamp}]</span>
                    <span style={{ color: f.direction === "TX" ? "#38bdf8" : "var(--accent-success)", fontWeight: 700 }}>
                      {f.direction}:
                    </span>
                    <span style={{ color: f.hex.includes("83") || f.hex.includes("86") ? "var(--accent-highlight)" : "#d1d5db" }}>
                      {f.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Industrial Automation Performance Spotlight (Replacing duplicate specs & timeline layout) */}
        <section style={{ borderTop: "var(--border-light)", paddingTop: "4rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, color: "var(--accent-highlight)", letterSpacing: "0.15em" }}>Performance Analytics</span>
            <h2 style={{ fontFamily: "var(--font-primary)", fontSize: "2.25rem", fontWeight: 800, color: "#fff", marginTop: "0.5rem" }}>Industrial Telemetry KPIs</h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", maxWidth: "500px", margin: "0.5rem auto 0" }}>
              Secure real-time diagnostic performance metrics built for high-concurrence assembly analytics.
            </p>
          </div>

          <div className={styles.kpisGrid}>
            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
              <div style={{ color: "var(--accent-highlight)", display: "inline-flex", marginBottom: "1rem" }}><Activity size={28} /></div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", fontFamily: "monospace", marginBottom: "0.25rem" }}>{oeeIndex}</h3>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Operational Effectiveness</span>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.4 }}>
                Continuous calculation index measuring machine performance, utilization availability, and calibration checks.
              </p>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
              <div style={{ color: "var(--accent-highlight)", display: "inline-flex", marginBottom: "1rem" }}><Network size={28} /></div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", fontFamily: "monospace", marginBottom: "0.25rem" }}>{ping} ms</h3>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Gateway Ingress Ping</span>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.4 }}>
                Latency of UDP packet transfers between sensor devices and edge PLC data collectors.
              </p>
            </div>

            <div style={{ background: "rgba(13, 18, 37, 0.3)", border: "var(--border-glass)", borderRadius: "12px", padding: "2rem", textAlign: "center" }}>
              <div style={{ color: "var(--accent-highlight)", display: "inline-flex", marginBottom: "1rem" }}><ShieldAlert size={28} /></div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff", fontFamily: "monospace", marginBottom: "0.25rem" }}>-{activeAlerts === 0 ? "34" : "12"}%</h3>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "var(--text-secondary)", textTransform: "uppercase" }}>Fault Response Drop</span>
              <p style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.75rem", lineHeight: 1.4 }}>
                Reduction in automated override latch delay when telemetry measurements exceed safe threshold bounds.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
