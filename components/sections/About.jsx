"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import StatCounter from "@/components/ui/StatCounter";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  viewportConfig,
} from "@/lib/animations";
import styles from "./About.module.css";

const stats = [
  { value: 10, suffix: "", label: "Events This Season" },
  { value: 1000, suffix: "+", label: "Registered Participants" },
  { value: 9, suffix: "", label: "Sports Disciplines" },
  { value: 80, suffix: "+", label: "Club Members" },
];

export default function About() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.inner}>
        <motion.div
          className={styles.text}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={slideInLeft}
        >
          <SectionHeading
            label="Who We Are"
            title="Fueling the Competitive Spirit"
          />
          <p>
            Sportivo isn&apos;t just a club — it&apos;s a culture. Born from the
            belief that every student-athlete deserves a stage, we orchestrate
            FIEM&apos;s most electrifying sporting events.
          </p>
          <p>
            We train champions, cultivate leadership, and build a community
            where competition meets camaraderie. From the cricket crease to the
            chess board, every discipline finds its arena here.
          </p>
        </motion.div>
        <motion.div
          className={styles.stats}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          variants={staggerContainer(0.1, 0.2)}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={slideInRight}>
              <StatCounter value={s.value} suffix={s.suffix} label={s.label} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
