"use client"
import CountUp from "react-countup"
import { useInView } from "@/hooks/useInView"
import styles from "./StatCounter.module.css"

export default function StatCounter({ value, suffix = "+", label }) {
  const [ref, inView] = useInView({ once: true })
  return (
    <div ref={ref} className={styles.stat}>
      <div className={styles.number}>
        {inView ? (
          <CountUp end={value} duration={2.5} separator="," suffix={suffix} />
        ) : (
          <span>0{suffix}</span>
        )}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}
