"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import styles from "./Gallery.module.css"

const images = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `https://picsum.photos/seed/sportsfiem${i + 1}/600/${300 + (i % 3) * 100}`,
  alt: `Sportivo event ${i + 1}`,
  comingSoon: i >= 10,
}))

export default function Gallery() {
  const [selected, setSelected] = useState(null)

  return (
    <section className={styles.gallery} id="gallery">
      <div className={styles.inner}>
        <SectionHeading
          label="Gallery"
          title="Relive the Action"
          subtitle="Moments that define the Sportivo legacy."
          centered
        />
        <div className={styles.masonry}>
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 4) * 0.1, duration: 0.5 }}
              onClick={() => !img.comingSoon && setSelected(img)}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
              {img.comingSoon ? (
                <div className={styles.comingSoon}>More Coming Soon</div>
              ) : (
                <div className={styles.overlay}>
                  <span className={styles.overlayText}>View</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <button className={styles.closeBtn} onClick={() => setSelected(null)}>✕</button>
            <img src={selected.src} alt={selected.alt} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
