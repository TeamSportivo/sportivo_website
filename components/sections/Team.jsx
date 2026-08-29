"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import MemberCard from "@/components/ui/MemberCard"
import DinoGame from "@/components/ui/DinoGame"
import styles from "./Team.module.css"

const tabs = [
  { key: "mentor", label: "Mentors" },
  { key: "core", label: "Core Committee" },
  { key: "working", label: "Working Committee" },
  { key: "volunteer", label: "Volunteers" },
]

export default function Team({ members }) {
  const [active, setActive] = useState("mentor")
  const current = members[active] || []

  return (
    <section className={styles.team} id="team">
      <div className={styles.inner}>
        <SectionHeading
          label="The Team"
          title="People Behind Sportivo"
          subtitle="The passionate minds who make every event possible."
        />
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={active === tab.key ? styles.tab + " " + styles.active : styles.tab}
              onClick={() => setActive(tab.key)}
            >
              {tab.label}
              <span className={styles.count}>{(members[tab.key] || []).length}</span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className={styles.grid}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            {active === "volunteer" ? (
              <DinoGame />
            ) : current.length === 0 ? (
              <div className={styles.empty}>No members found in this category yet.</div>
            ) : (
              current.map((member, i) => (
                <MemberCard key={member.id} member={member} index={i} />
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
