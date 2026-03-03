"use client"
import { motion } from "framer-motion"
import { scaleIn, viewportConfig } from "@/lib/animations"
import styles from "./EventCard.module.css"

export default function EventCard({ event, index }) {
  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      transition={{ delay: (index % 3) * 0.1 }}
      style={{ "--card-color": event.color }}
    >
      {event.featured && <span className={styles.featured}>⚡ Featured</span>}
      <div className={styles.cardTop} style={{ background: event.color }} />
      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <span className={styles.emoji}>{event.emoji}</span>
          <span
            className={styles.category}
            style={{ color: event.color, borderColor: event.color + "44" }}
          >
            {event.category}
          </span>
        </div>
        <h3 className={styles.name}>{event.name}</h3>
        <div className={styles.date}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <rect x="1" y="2" width="10" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M4 1v2M8 1v2M1 5h10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {event.dates}
        </div>
        <p className={styles.desc}>{event.description}</p>
        {event.note && (
          <span className={styles.note}>ℹ {event.note}</span>
        )}
        <a
          href={event.formLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.registerBtn}
          style={{ background: event.color }}
        >
          Register Now →
        </a>
      </div>
    </motion.div>
  )
}
