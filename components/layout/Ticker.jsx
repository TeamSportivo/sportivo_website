"use client"
import styles from "./Ticker.module.css"

const items = [
  "Registrations Open", "Cricket", "Football", "Badminton",
  "Volleyball", "Handball", "Carrom", "Table Tennis",
  "Chess", "Arm Wrestling", "Flash Event",
  "Register Now at Sportivo FIEM",
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div className={styles.ticker}>
      <div className={styles.track}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item}
            <span className={styles.dot}> ⚡ </span>
          </span>
        ))}
      </div>
    </div>
  )
}
