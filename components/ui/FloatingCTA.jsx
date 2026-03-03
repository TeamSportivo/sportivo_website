"use client"
import { useState, useEffect } from "react"
import styles from "./FloatingCTA.module.css"

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      className={visible ? styles.btn : styles.btn + " " + styles.hidden}
      onClick={scrollToEvents}
      aria-label="Register for events"
    >
      ⚡ Register Now
    </button>
  )
}
