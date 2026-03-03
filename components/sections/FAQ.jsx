"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { faqs } from "@/data/faq"
import SectionHeading from "@/components/ui/SectionHeading"
import styles from "./FAQ.module.css"

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const toggle = (id) => setOpen(open === id ? null : id)

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.inner}>
        <SectionHeading
          label="FAQ"
          title="Got Questions"
          subtitle="Everything you need to know about Sportivo events and membership."
          centered
        />
        <div className={styles.list}>
          {faqs.map((faq) => (
            <div key={faq.id} className={open === faq.id ? styles.item + " " + styles.open : styles.item}>
              <button className={styles.question} onClick={() => toggle(faq.id)}>
                {faq.question}
                <span className={styles.icon}>+</span>
              </button>
              <AnimatePresence>
                {open === faq.id && (
                  <motion.div
                    className={styles.answer}
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className={styles.answerText}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
