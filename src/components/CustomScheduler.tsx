"use client";
import React, { useState } from "react";
import styles from "./CustomScheduler.module.css";
import { X, Clock, Video, Globe, Calendar, Check, ArrowRight } from "lucide-react";

interface CustomSchedulerProps {
  onClose: () => void;
}

export default function CustomScheduler({ onClose }: CustomSchedulerProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
    details: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate the next 7 calendar dates (excluding weekends)
  const getNextDays = () => {
    const days: Date[] = [];
    const current = new Date();
    while (days.length < 7) {
      current.setDate(current.getDate() + 1);
      const dayOfWeek = current.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Skip Sunday (0) and Saturday (6)
        days.push(new Date(current));
      }
    }
    return days;
  };

  const daysList = getNextDays();
  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time if changing date
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep(2); // Auto proceed to form details
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && !isSubmitting) {
      setIsSubmitting(true);
      // Simulate fake API booking registration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      setStep(3); // Go to success step
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close scheduler">
          <X size={18} />
        </button>

        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.hostBadge}>
            <div className={styles.avatar}>CE</div>
            <div>
              <div className={styles.hostName}>CyberEssays Digital Services</div>
              <div className={styles.hostTitle}>Digital Advisory Team</div>
            </div>
          </div>

          <h3 className={styles.sidebarTitle}>Strategy & Transformation Consultation</h3>

          <div className={styles.metaList}>
            <div className={styles.metaItem}>
              <Clock size={16} color="var(--text-secondary)" />
              <span className={styles.metaText}>30 Minutes</span>
            </div>
            <div className={styles.metaItem}>
              <Video size={16} color="var(--text-secondary)" />
              <span className={styles.metaText}>Google Meet Video</span>
            </div>
            <div className={styles.metaItem}>
              <Globe size={16} color="var(--text-secondary)" />
              <span className={styles.metaText}>UTC+05:30 (Your Time)</span>
            </div>
            {selectedDate && (
              <div className={styles.metaItem}>
                <Calendar size={16} color="var(--accent-primary)" />
                <span className={styles.metaText} style={{ color: "var(--accent-primary)" }}>
                  {selectedDate.toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
                  {selectedTime ? ` at ${selectedTime}` : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {step === 1 && (
            <>
              <div>
                <h3 className={styles.sectionTitle}>Select Date</h3>
                <div className={styles.calendarGrid}>
                  {daysList.map((day, idx) => {
                    const isActive = selectedDate?.toDateString() === day.toDateString();
                    return (
                      <button
                        key={idx}
                        className={`${styles.dayBtn} ${isActive ? styles.activeDay : ""}`}
                        onClick={() => handleDateSelect(day)}
                      >
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span style={{ fontSize: "0.7rem", textTransform: "uppercase", opacity: 0.8 }}>
                            {day.toLocaleDateString("en-US", { weekday: 'short' })}
                          </span>
                          <span style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                            {day.getDate()}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedDate && (
                <div>
                  <h3 className={styles.sectionTitle}>Select Available Time</h3>
                  <div className={styles.slotsList}>
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={styles.slotBtn}
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className={styles.formGrid}>
              <h3 className={styles.sectionTitle}>Enter Your Details</h3>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. Alexander Wright"
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Work Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. alex@company.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className={styles.input}
                  placeholder="e.g. https://company.com"
                  disabled={isSubmitting}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>How can we help you create advantage?</label>
                <textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  className={styles.textarea}
                  placeholder="Tell us a little bit about your engineering or digital transformation needs..."
                  disabled={isSubmitting}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", alignItems: "center" }}>
                <button type="button" className="magnetic-btn btn-secondary" onClick={() => setStep(1)} style={{ padding: "0.625rem 1.25rem" }} disabled={isSubmitting}>
                  Back
                </button>
                <button type="submit" className="magnetic-btn btn-accent" style={{ padding: "0.625rem 1.5rem" }} disabled={isSubmitting}>
                  {isSubmitting ? "Confirming..." : "Confirm Booking"} <ArrowRight size={16} style={{ marginLeft: "0.5rem" }} />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className={styles.successScreen}>
              <div className={styles.successIcon}>
                <Check size={36} />
              </div>
              <h3 className={styles.sidebarTitle} style={{ fontSize: "1.75rem", margin: 0 }}>You are Scheduled!</h3>
              <p style={{ color: "var(--text-secondary)", maxWidth: "400px" }}>
                Your strategy session request has been registered. We look forward to exploring your digital transformation strategy.
              </p>
              
              <div style={{ background: "var(--bg-secondary)", borderRadius: "var(--border-radius-md)", padding: "1.25rem 2rem", width: "100%", maxWidth: "440px", border: "var(--border-light)", textAlign: "left" }}>
                <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>Strategy Session (30 min)</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  {selectedDate?.toLocaleDateString("en-US", { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} at {selectedTime}
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "0.5rem" }}>
                  Google Meet details available upon validation
                </div>
              </div>

              <button className="magnetic-btn btn-primary" onClick={onClose} style={{ marginTop: "1rem", padding: "0.75rem 2rem" }}>
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
