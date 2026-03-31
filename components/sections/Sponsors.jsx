"use client";
import { useRef, useEffect } from "react";
import styles from "./Sponsors.module.css";

const sponsors = [
  { name: "Manipal Hospitals", file: "manipal.png" },
  { name: "Decathlon", file: "decathlon.png" },
  { name: "Red FM 93.5", file: "redfm.png" },
  { name: "Edugraph", file: "edugraph.png" },
];

export default function Sponsors() {
  const containerRef = useRef(null);
  const setRef = useRef(null);
  const rafRef = useRef(null);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const set = setRef.current;
    if (!container || !set) return;

    const init = () => {
      const setWidth = set.offsetWidth;
      if (setWidth === 0) {
        setTimeout(init, 50);
        return;
      }

      const tick = () => {
        if (!pausedRef.current) {
          posRef.current -= 1.2;
          if (posRef.current <= -setWidth) {
            posRef.current = posRef.current + setWidth;
          }
          container.style.transform = `translateX(${posRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    init();

    const wrap = container.parentElement;
    const pause = () => {
      pausedRef.current = true;
    };
    const play = () => {
      pausedRef.current = false;
    };
    wrap.addEventListener("mouseenter", pause);
    wrap.addEventListener("mouseleave", play);

    return () => {
      cancelAnimationFrame(rafRef.current);
      wrap.removeEventListener("mouseenter", pause);
      wrap.removeEventListener("mouseleave", play);
    };
  }, []);

  return (
    <section className={styles.sponsors}>
      <p className={styles.heading}>Our Supporters</p>
      <div className={styles.marqueeWrap}>
        <div ref={containerRef} className={styles.track}>
          <div ref={setRef} className={styles.set}>
            {sponsors.map((s, i) => (
              <div key={i} className={styles.logo}>
                <img
                  src={`/sponsors/${s.file}`}
                  alt={s.name}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
          <div className={styles.set}>
            {sponsors.map((s, i) => (
              <div key={i} className={styles.logo}>
                <img
                  src={`/sponsors/${s.file}`}
                  alt={s.name}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
          <div className={styles.set}>
            {sponsors.map((s, i) => (
              <div key={i} className={styles.logo}>
                <img
                  src={`/sponsors/${s.file}`}
                  alt={s.name}
                  className={styles.logoImg}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
