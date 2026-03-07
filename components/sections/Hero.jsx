"use client";
import { useState, useEffect } from "react";
import styles from "./Hero.module.css";

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const target = new Date("2026-04-01T00:00:00");

    const tick = () => {
      const now = new Date();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          started: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        started: false,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!timeLeft) return null;

  if (timeLeft.started) {
    return (
      <div className={styles.countdownWrap}>
        <span className={styles.countdownLabel}>VIBGYOR IS LIVE</span>
        <span className={styles.countdownLive}>
          ⚡ Events are happening now!
        </span>
      </div>
    );
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className={styles.countdownWrap}>
      <span className={styles.countdownLabel}>⚡ VIBGYOR kicks off in</span>
      <div className={styles.countdownGrid}>
        {units.map((u) => (
          <div key={u.label} className={styles.countdownUnit}>
            <span className={styles.countdownNumber}>
              {String(u.value).padStart(2, "0")}
            </span>
            <span className={styles.countdownUnitLabel}>{u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

  const arrowPath = "M8 3v10M8 13l-4-4M8 13l4-4";

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg}>
        <div className={styles.grid} />
        <div className={styles.orb + " " + styles.orb1} />
        <div className={styles.orb + " " + styles.orb2} />
        <div className={styles.orb + " " + styles.orb3} />
      </div>
      <div className={styles.content}>
        <div className={styles.eyebrow}>Sportivo · FIEM · Kolkata</div>
        <div className={styles.heroMain}>
          <div className={styles.heroText}>
            <h1 className={styles.headline}>
              <span className={styles.word}>
                <span className={styles.wordInner + " " + styles.w1}>
                  Where
                </span>
              </span>
              <span className={styles.word}>
                <span className={styles.wordInner + " " + styles.w2}>
                  Champions
                </span>
              </span>
              <br />
              <span className={styles.word}>
                <span
                  className={
                    styles.wordInner + " " + styles.w3 + " " + styles.accent
                  }
                >
                  Are
                </span>
              </span>
              <span className={styles.word}>
                <span className={styles.wordInner + " " + styles.w4}>Made</span>
              </span>
            </h1>
            <p className={styles.sub}>
              FIEM&apos;s most competitive, most electric sports collective. We
              don&apos;t just host events — we build champions, forge rivalries,
              and create legends.
            </p>
            <p className={styles.institute}>
              Future Institute of Engineering and Management
            </p>
          </div>
          <div className={styles.heroSide}>
            <Countdown />
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d={arrowPath}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
