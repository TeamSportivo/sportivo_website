import os

def w(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, 'w') as f:
        f.write(content)
    print("OK:", path)

BASE = '/home/claude/sportivo'

w(BASE + '/hooks/useInView.js', '''"use client"
import { useEffect, useRef, useState } from 'react'

export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (options.once !== false) observer.unobserve(el)
        }
      },
      { threshold: options.threshold || 0.1, rootMargin: options.rootMargin || "-50px" }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}
''')

w(BASE + '/components/ui/SectionHeading.module.css', '''.wrapper { margin-bottom: 56px; }
.centered { text-align: center; }
.label {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  display: block;
  margin-bottom: 12px;
}
.title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  text-transform: uppercase;
  line-height: 1.05;
  letter-spacing: 0.02em;
}
.title::after { content: "."; color: var(--color-accent); }
.subtitle {
  margin-top: 16px;
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  max-width: 560px;
  line-height: 1.7;
}
.centered .subtitle { margin-left: auto; margin-right: auto; }
''')

w(BASE + '/components/ui/SectionHeading.jsx', '''"use client"
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
''')

w(BASE + '/components/ui/StatCounter.module.css', '''.stat {
  text-align: center;
  padding: 32px 24px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  position: relative;
  overflow: hidden;
  transition: var(--transition);
}
.stat::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: var(--gradient-accent);
}
.stat:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-glow);
}
.number {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 8px;
}
.label {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
}
''')

w(BASE + '/components/ui/StatCounter.jsx', '''"use client"
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
''')

print("hooks + ui done")

# ── LAYOUT COMPONENTS ──────────────────────────────────────────────────────

w(BASE + '/components/layout/Ticker.module.css', '''.ticker {
  background: var(--gradient-accent);
  padding: 10px 0;
  overflow: hidden;
  position: relative;
  z-index: 100;
}
.track {
  display: flex;
  white-space: nowrap;
  animation: ticker 30s linear infinite;
  width: max-content;
}
.ticker:hover .track { animation-play-state: paused; }
.item {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
  padding: 0 24px;
}
.dot {
  color: rgba(255,255,255,0.5);
  padding: 0 8px;
}
''')

w(BASE + '/components/layout/Ticker.jsx', '''"use client"
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
''')

w(BASE + '/components/layout/Navbar.module.css', '''.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  padding: 20px 0;
  transition: var(--transition);
}
.nav.scrolled {
  background: rgba(8, 12, 26, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  padding: 14px 0;
}
.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  cursor: pointer;
}
.logoText {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: white;
}
.logoText span { color: var(--color-accent); }
.links {
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
}
.link {
  font-family: var(--font-accent);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-secondary);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
  padding-bottom: 4px;
}
.link::after {
  content: "";
  position: absolute;
  bottom: 0; left: 0;
  width: 0; height: 2px;
  background: var(--gradient-accent);
  transition: width 0.3s ease;
}
.link:hover { color: white; }
.link:hover::after { width: 100%; }
.cta {
  background: var(--gradient-accent);
  color: white;
  padding: 10px 24px;
  border-radius: 4px;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  transition: var(--transition);
  animation: pulse-glow 2.5s ease-in-out infinite;
}
.cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(255,69,0,0.5);
}
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  padding: 4px;
  background: none;
}
.bar {
  width: 24px; height: 2px;
  background: white;
  border-radius: 2px;
  transition: var(--transition);
}
.hamburger.open .bar:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open .bar:nth-child(2) { opacity: 0; }
.hamburger.open .bar:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.drawer {
  display: none;
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: var(--color-surface);
  z-index: 998;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.drawer.open { display: flex; }
.drawerLink {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 800;
  text-transform: uppercase;
  color: white;
  cursor: pointer;
  transition: color 0.2s;
}
.drawerLink:hover { color: var(--color-accent); }
@media (max-width: 768px) {
  .links { display: none; }
  .hamburger { display: flex; }
}
''')

w(BASE + '/components/layout/Navbar.jsx', '''"use client"
import { useState, useEffect } from "react"
import styles from "./Navbar.module.css"

const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav className={scrolled ? styles.nav + " " + styles.scrolled : styles.nav}>
        <div className={styles.inner}>
          <div className={styles.logo} onClick={() => scrollTo("#hero")}>
            <span className={styles.logoText}>Sporti<span>vo</span></span>
          </div>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <span className={styles.link} onClick={() => scrollTo(link.href)}>
                  {link.label}
                </span>
              </li>
            ))}
            <li>
              <span className={styles.cta} onClick={() => scrollTo("#events")}>
                Register
              </span>
            </li>
          </ul>
          <button
            className={menuOpen ? styles.hamburger + " " + styles.open : styles.hamburger}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>
      <div className={menuOpen ? styles.drawer + " " + styles.open : styles.drawer}>
        {navLinks.map((link) => (
          <span
            key={link.href}
            className={styles.drawerLink}
            onClick={() => scrollTo(link.href)}
          >
            {link.label}
          </span>
        ))}
      </div>
    </>
  )
}
''')

print("Navbar + Ticker done")

w(BASE + '/components/layout/Footer.module.css', '''.footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 80px 0 0;
}
.grid {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 60px;
}
.brand .logo {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.brand .logo span { color: var(--color-accent); }
.brand p {
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
  max-width: 300px;
  margin-bottom: 24px;
}
.socials { display: flex; gap: 16px; }
.socialIcon {
  width: 40px; height: 40px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  transition: var(--transition);
  text-decoration: none;
}
.socialIcon:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-3px);
  box-shadow: 0 4px 16px var(--color-accent-glow);
}
.col h4 {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 24px;
}
.col ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.col ul li a, .col ul li span {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.2s;
  text-decoration: none;
}
.col ul li a:hover, .col ul li span:hover { color: white; }
.bottom {
  margin-top: 60px;
  border-top: 1px solid var(--color-border);
  padding: 24px;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  max-width: var(--max-width);
  margin-left: auto;
  margin-right: auto;
}
.bottom span { color: var(--color-accent); }
@media (max-width: 768px) {
  .grid { grid-template-columns: 1fr; gap: 40px; }
}
''')

w(BASE + '/components/layout/Footer.jsx', '''"use client"
import styles from "./Footer.module.css"

export default function Footer() {
  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className={styles.footer} id="contact">
      <div className={styles.grid}>
        <div className={styles.brand}>
          <div className={styles.logo}>Sporti<span>vo</span></div>
          <p>
            The official sports club of Future Institute of Engineering and Management, Kolkata.
            Compete. Conquer. Champion.
          </p>
          <div className={styles.socials}>
            <a href="https://instagram.com/sportivo_fiem" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="mailto:sportivo@fiem.edu.in" className={styles.socialIcon} aria-label="Email">
              <i className="fas fa-envelope" />
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
          </div>
        </div>
        <div className={styles.col}>
          <h4>Navigate</h4>
          <ul>
            {["events","team","gallery","faq","contact"].map((id) => (
              <li key={id}><span onClick={() => scrollTo(id)}>{id.charAt(0).toUpperCase() + id.slice(1)}</span></li>
            ))}
          </ul>
        </div>
        <div className={styles.col}>
          <h4>Contact</h4>
          <ul>
            <li><a href="mailto:sportivo@fiem.edu.in">sportivo@fiem.edu.in</a></li>
            <li><a href="https://instagram.com/sportivo_fiem" target="_blank" rel="noopener noreferrer">@sportivo_fiem</a></li>
            <li><span>FIEM, Kolkata, West Bengal</span></li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 <span>Sportivo</span> · Future Institute of Engineering and Management. All rights reserved.</p>
      </div>
    </footer>
  )
}
''')

print("Footer done")

# ── SECTION: HERO ─────────────────────────────────────────────────────────

w(BASE + '/components/sections/Hero.module.css', '''.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--color-bg);
}
.bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
  animation: float 8s ease-in-out infinite;
}
.orb1 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, #FF4500 0%, transparent 70%);
  top: -100px; left: -100px;
  animation-delay: 0s;
}
.orb2 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, #FF8C00 0%, transparent 70%);
  bottom: -80px; right: 10%;
  animation-delay: 3s;
}
.orb3 {
  width: 250px; height: 250px;
  background: radial-gradient(circle, #FF4500 0%, transparent 70%);
  top: 40%; right: 20%;
  animation-delay: 5s;
}
.grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}
.content {
  position: relative;
  z-index: 1;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  padding-top: 60px;
}
.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 24px;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 0.2s;
}
.eyebrow::before {
  content: "";
  width: 32px; height: 2px;
  background: var(--gradient-accent);
}
.headline {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: 900;
  text-transform: uppercase;
  line-height: 0.95;
  letter-spacing: 0.02em;
  margin-bottom: 32px;
}
.word {
  display: inline-block;
  overflow: hidden;
  margin-right: 0.2em;
}
.wordInner {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.wordInner.accent { color: var(--color-accent); }
.wordInner.w1 { animation-delay: 0.3s; }
.wordInner.w2 { animation-delay: 0.45s; }
.wordInner.w3 { animation-delay: 0.6s; }
.wordInner.w4 { animation-delay: 0.75s; }
@keyframes slideUp {
  to { opacity: 1; transform: translateY(0); }
}
.sub {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  max-width: 520px;
  line-height: 1.7;
  margin-bottom: 16px;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 1s;
}
.institute {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 48px;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 1.1s;
}
.actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 1.2s;
}
.btnPrimary {
  background: var(--gradient-accent);
  color: white;
  padding: 16px 40px;
  border-radius: 4px;
  font-family: var(--font-accent);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  transition: var(--transition);
  cursor: pointer;
  border: none;
}
.btnPrimary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(255,69,0,0.5);
}
.btnSecondary {
  background: transparent;
  color: white;
  padding: 16px 40px;
  border-radius: 4px;
  font-family: var(--font-accent);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--color-border);
  transition: var(--transition);
  cursor: pointer;
}
.btnSecondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-3px);
}
.scrollIndicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  font-family: var(--font-accent);
  font-size: 0.65rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards 1.6s;
}
.scrollIndicator svg {
  animation: bounce-chevron 2s ease-in-out infinite;
  position: relative;
}
''')

w(BASE + '/components/sections/Hero.jsx', '''"use client"
import styles from "./Hero.module.css"

export default function Hero() {
  const scrollToEvents = () => {
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.bg}>
        <div className={styles.grid} />
        <div className={styles.orb + " " + styles.orb1} />
        <div className={styles.orb + " " + styles.orb2} />
        <div className={styles.orb + " " + styles.orb3} />
      </div>
      <div className={styles.content}>
        <div className={styles.eyebrow}>Sportivo · FIEM · Kolkata</div>
        <h1 className={styles.headline}>
          <span className={styles.word}><span className={styles.wordInner + " " + styles.w1}>Where</span></span>
          <span className={styles.word}><span className={styles.wordInner + " " + styles.w2}>Champions</span></span>
          <br />
          <span className={styles.word}><span className={styles.wordInner + " " + styles.w3 + " " + styles.accent}>Are</span></span>
          <span className={styles.word}><span className={styles.wordInner + " " + styles.w4}>Made</span></span>
        </h1>
        <p className={styles.sub}>
          FIEM's most competitive, most electric sports collective. We don't just host events — we build champions, forge rivalries, and create legends.
        </p>
        <p className={styles.institute}>Future Institute of Engineering and Management</p>
        <div className={styles.actions}>
          <button className={styles.btnPrimary} onClick={scrollToEvents}>
            Explore Events
          </button>
          <a
            href="https://forms.gle/placeholder"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.btnSecondary}
          >
            Join the Club
          </a>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 3v10M8 13l-4-4M8 13l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </section>
  )
}
''')

print("Hero done")

w(BASE + '/components/sections/About.module.css', '''.about {
  padding: 120px 0;
  background: var(--color-surface);
  position: relative;
  overflow: hidden;
}
.about::before {
  content: "SPORTIVO";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--font-display);
  font-size: 18vw;
  font-weight: 900;
  color: rgba(255,255,255,0.015);
  white-space: nowrap;
  pointer-events: none;
  letter-spacing: 0.1em;
}
.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}
.text p {
  font-size: 1.1rem;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
@media (max-width: 768px) {
  .inner { grid-template-columns: 1fr; gap: 48px; }
  .stats { grid-template-columns: 1fr 1fr; }
}
''')

w(BASE + '/components/sections/About.jsx', '''"use client"
import { motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import StatCounter from "@/components/ui/StatCounter"
import { slideInLeft, slideInRight, staggerContainer, viewportConfig } from "@/lib/animations"
import styles from "./About.module.css"

const stats = [
  { value: 10, suffix: "", label: "Events This Season" },
  { value: 500, suffix: "+", label: "Registered Participants" },
  { value: 9, suffix: "", label: "Sports Disciplines" },
  { value: 80, suffix: "+", label: "Club Members" },
]

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
            Sportivo isn't just a club — it's a culture. Born from the belief that every student-athlete deserves a stage, we orchestrate FIEM's most electrifying sporting events.
          </p>
          <p>
            We train champions, cultivate leadership, and build a community where competition meets camaraderie. From the cricket crease to the chess board, every discipline finds its arena here.
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
  )
}
''')

print("About done")

w(BASE + '/components/ui/EventCard.module.css', '''.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 0;
  overflow: hidden;
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
}
.card:hover {
  transform: translateY(-8px);
  border-color: var(--color-border-hover);
}
.cardTop {
  height: 4px;
  flex-shrink: 0;
}
.cardBody {
  padding: 28px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.cardHeader {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
}
.emoji {
  font-size: 2.5rem;
  line-height: 1;
}
.category {
  font-family: var(--font-accent);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid;
  opacity: 0.85;
}
.name {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  line-height: 1;
  margin-bottom: 8px;
}
.date {
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 16px;
}
.desc {
  font-size: 0.92rem;
  color: var(--color-text-secondary);
  line-height: 1.65;
  flex: 1;
  margin-bottom: 20px;
}
.note {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-accent);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  background: rgba(255,255,255,0.04);
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 16px;
  border: 1px solid var(--color-border);
}
.registerBtn {
  display: block;
  width: 100%;
  padding: 14px;
  border-radius: 6px;
  font-family: var(--font-accent);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  color: white;
  text-align: center;
  text-decoration: none;
  transition: var(--transition);
  border: none;
  cursor: pointer;
}
.registerBtn:hover {
  transform: translateY(-2px);
  filter: brightness(1.15);
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
}
.featured {
  position: absolute;
  top: 16px;
  right: 16px;
  background: var(--gradient-accent);
  color: white;
  font-family: var(--font-accent);
  font-size: 0.6rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 4px 8px;
  border-radius: 3px;
  z-index: 1;
}
''')

w(BASE + '/components/ui/EventCard.jsx', '''"use client"
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
''')

w(BASE + '/components/sections/Events.module.css', '''.events {
  padding: 120px 0;
  background: var(--color-bg);
}
.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
}
''')

w(BASE + '/components/sections/Events.jsx', '''"use client"
import { events } from "@/data/events"
import EventCard from "@/components/ui/EventCard"
import SectionHeading from "@/components/ui/SectionHeading"
import styles from "./Events.module.css"

export default function Events() {
  return (
    <section className={styles.events} id="events">
      <div className={styles.inner}>
        <SectionHeading
          label="Upcoming Events"
          title="The Arena Awaits"
          subtitle="Step up. Sign up. Show up. Register for any event and compete for Sportivo glory."
        />
        <div className={styles.grid}>
          {events.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
''')

print("Events done")

w(BASE + '/components/ui/MemberCard.module.css', '''.card {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  text-align: center;
  transition: var(--transition);
}
.card:hover {
  border-color: var(--color-border-hover);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(255,69,0,0.12);
}
.photoWrap {
  width: 80px; height: 80px;
  border-radius: 50%;
  margin: 0 auto 16px;
  overflow: hidden;
  border: 2px solid var(--color-border);
  background: var(--color-surface);
  position: relative;
}
.photo {
  width: 100%; height: 100%;
  object-fit: cover;
}
.initials {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--color-accent);
  background: var(--color-surface);
}
.name {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.dept {
  font-size: 0.8rem;
  color: var(--color-text-secondary);
  margin-bottom: 8px;
}
.role {
  display: inline-block;
  font-family: var(--font-accent);
  font-size: 0.65rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-accent);
  border: 1px solid rgba(255,69,0,0.3);
  padding: 3px 10px;
  border-radius: 20px;
}
''')

w(BASE + '/components/ui/MemberCard.jsx', '''"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { scaleIn, viewportConfig } from "@/lib/animations"
import styles from "./MemberCard.module.css"

export default function MemberCard({ member, index }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      whileInView="visible"
      viewport={viewportConfig}
      variants={scaleIn}
      transition={{ delay: (index % 4) * 0.08 }}
    >
      <div className={styles.photoWrap}>
        {member.photo && !imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            className={styles.photo}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.initials}>{member.initials}</div>
        )}
      </div>
      <div className={styles.name}>{member.name}</div>
      {member.department && <div className={styles.dept}>{member.department}</div>}
      <div className={styles.role}>{member.position}</div>
    </motion.div>
  )
}
''')

w(BASE + '/components/sections/Team.module.css', '''.team {
  padding: 120px 0;
  background: var(--color-surface);
}
.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}
.tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 48px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0;
  flex-wrap: wrap;
}
.tab {
  font-family: var(--font-accent);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 12px 20px;
  cursor: pointer;
  color: var(--color-text-muted);
  border: none;
  background: none;
  transition: color 0.2s;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
}
.tab.active { color: white; }
.tab::after {
  content: "";
  position: absolute;
  bottom: -1px; left: 0; right: 0;
  height: 2px;
  background: var(--gradient-accent);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}
.tab.active::after { transform: scaleX(1); }
.count {
  background: rgba(255,69,0,0.15);
  color: var(--color-accent);
  padding: 2px 7px;
  border-radius: 10px;
  font-size: 0.65rem;
}
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
.empty {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px;
  color: var(--color-text-muted);
  font-size: 0.95rem;
}
@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
''')

w(BASE + '/components/sections/Team.jsx', '''"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import SectionHeading from "@/components/ui/SectionHeading"
import MemberCard from "@/components/ui/MemberCard"
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
            {current.length === 0 ? (
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
''')

print("Team done")

w(BASE + '/components/sections/Gallery.module.css', '''.gallery {
  padding: 120px 0;
  background: var(--color-bg);
}
.inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}
.masonry {
  columns: 3;
  column-gap: 16px;
}
.item {
  break-inside: avoid;
  margin-bottom: 16px;
  overflow: hidden;
  border-radius: var(--radius-md);
  cursor: pointer;
  position: relative;
}
.item img {
  width: 100%;
  display: block;
  transition: transform 0.4s ease;
}
.item:hover img { transform: scale(1.05); }
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: var(--radius-md);
}
.item:hover .overlay { opacity: 1; }
.overlayText {
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: white;
}
.comingSoon {
  position: absolute;
  inset: 0;
  background: rgba(8,12,26,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-family: var(--font-accent);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
}
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.lightbox img {
  max-width: 90vw;
  max-height: 85vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}
.closeBtn {
  position: absolute;
  top: 24px; right: 24px;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  color: white;
  width: 40px; height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
}
@media (max-width: 768px) {
  .masonry { columns: 2; }
}
@media (max-width: 480px) {
  .masonry { columns: 1; }
}
''')

w(BASE + '/components/sections/Gallery.jsx', '''"use client"
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
''')

w(BASE + '/components/sections/Sponsors.module.css', '''.sponsors {
  padding: 80px 0;
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  overflow: hidden;
}
.heading {
  text-align: center;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: 48px;
}
.track {
  display: flex;
  gap: 40px;
  white-space: nowrap;
  animation: ticker 20s linear infinite;
  width: max-content;
}
.logo {
  width: 160px; height: 60px;
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-accent);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: border-color 0.3s;
}
.logo:hover { border-color: var(--color-accent); }
''')

w(BASE + '/components/sections/Sponsors.jsx', '''import styles from "./Sponsors.module.css"

const sponsors = ["SPONSOR", "PARTNER", "BRAND", "SPONSOR", "SUPPORTER", "PARTNER"]

export default function Sponsors() {
  const doubled = [...sponsors, ...sponsors]
  return (
    <section className={styles.sponsors}>
      <p className={styles.heading}>Our Supporters</p>
      <div style={{ overflow: "hidden" }}>
        <div className={styles.track}>
          {doubled.map((s, i) => (
            <div key={i} className={styles.logo}>{s}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
''')

print("Gallery + Sponsors done")

w(BASE + '/components/sections/FAQ.module.css', '''.faq {
  padding: 120px 0;
  background: var(--color-bg);
}
.inner {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
}
.list { display: flex; flex-direction: column; gap: 12px; }
.item {
  background: var(--color-card);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color 0.3s;
}
.item.open { border-color: rgba(255,69,0,0.3); }
.question {
  width: 100%;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: none;
  border: none;
  color: white;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: color 0.2s;
}
.item.open .question { color: var(--color-accent); }
.icon {
  flex-shrink: 0;
  width: 24px; height: 24px;
  border: 1px solid var(--color-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: transform 0.3s, background 0.3s, border-color 0.3s;
}
.item.open .icon {
  transform: rotate(45deg);
  background: var(--color-accent);
  border-color: var(--color-accent);
}
.answer {
  overflow: hidden;
  padding: 0 24px;
}
.answerText {
  padding-bottom: 20px;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
  line-height: 1.7;
}
''')

w(BASE + '/components/sections/FAQ.jsx', '''"use client"
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
''')

w(BASE + '/components/ui/FloatingCTA.module.css', '''.btn {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 900;
  background: var(--gradient-accent);
  color: white;
  padding: 14px 24px;
  border-radius: 50px;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-weight: 600;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: pulse-glow 2.5s ease-in-out infinite;
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 0 8px 32px rgba(255,69,0,0.4);
}
.btn:hover { transform: translateY(-3px) scale(1.05); }
.btn.hidden { opacity: 0; pointer-events: none; transform: translateY(20px); }
''')

w(BASE + '/components/ui/FloatingCTA.jsx', '''"use client"
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
''')

print("FAQ + FloatingCTA done")

# main page.js
w(BASE + '/app/page.js', '''import { fetchMembers } from "@/lib/fetchMembers"
import Ticker from "@/components/layout/Ticker"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Events from "@/components/sections/Events"
import Team from "@/components/sections/Team"
import Gallery from "@/components/sections/Gallery"
import Sponsors from "@/components/sections/Sponsors"
import FAQ from "@/components/sections/FAQ"
import FloatingCTA from "@/components/ui/FloatingCTA"

export default async function Home() {
  let members = { mentor: [], core: [], working: [], volunteer: [] }
  try {
    members = await fetchMembers()
  } catch (e) {
    console.error("Failed to load members:", e)
  }

  return (
    <>
      <Ticker />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Events />
        <Team members={members} />
        <Gallery />
        <Sponsors />
        <FAQ />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  )
}
''')

# jsconfig for path aliases
w(BASE + '/jsconfig.json', '''{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
''')

# next.config.js
w(BASE + '/next.config.js', '''/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "picsum.photos",
      "i.pravatar.cc"
    ],
  },
}
module.exports = nextConfig
''')

# .eslintrc.json
w(BASE + '/.eslintrc.json', '''{
  "extends": ["next/core-web-vitals"]
}
''')

# README
w(BASE + '/README.md', '''# Sportivo — FIEM Sports Club Website

## Setup

```bash
npm install
npm run dev
```

## Team Members Auto-Import

Members are automatically loaded from your Google Sheet CSV (published to web).
The sheet URL is configured in `lib/fetchMembers.js`.

Column mapping:
- **Name** → member name
- **Department** → department shown on card
- **Position in Club** → determines category tab (Mentor / Core Committee / Working Committee / Volunteer)
- **Email ID** → stored but not displayed publicly
- **Photo** → Google Drive share link, auto-converted to direct image URL

## Updating Events

Edit `data/events.js` to update event info, dates, or Google Form links.

## Replacing Sponsors

In `components/sections/Sponsors.jsx`, replace the placeholder `<div>` elements with `<Image>` components pointing to real logo files in `/public/sponsors/`.
''')

print("ALL FILES WRITTEN SUCCESSFULLY")
