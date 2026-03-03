"use client"
import { motion } from "framer-motion"
import { fadeInUp, viewportConfig } from "@/lib/animations"
import styles from "./SectionHeading.module.css"

export default function SectionHeading({ label, title, subtitle, centered = false }) {
  return (
    <motion.div
      className={styles.wrapper + (centered ? " " + styles.centered : "")}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={fadeInUp}
    >
      {label && <span className={styles.label}>{label}</span>}
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  )
}
