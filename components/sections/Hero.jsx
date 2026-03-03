"use client";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  };

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
        <h1 className={styles.headline}>
          <span className={styles.word}>
            <span className={styles.wordInner + " " + styles.w1}>Where</span>
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
          don&apos;t just host events — we build champions, forge rivalries, and
          create legends.
        </p>
        <p className={styles.institute}>
          Future Institute of Engineering and Management
        </p>
        {/* <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={scrollToEvents}>
            Explore Events
          </button>
          <a
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Join the Club
          </a>
        </div> */}
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 3v10M8 13l-4-4M8 13l4-4"
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
