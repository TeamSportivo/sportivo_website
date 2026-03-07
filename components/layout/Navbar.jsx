"use client";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Events", href: "#events" },
  { label: "Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={scrolled ? styles.nav + " " + styles.scrolled : styles.nav}
      >
        <div className={styles.inner}>
          <div className={styles.logo} onClick={() => scrollTo("#hero")}>
            <div className={styles.logoWrap}>
              <img
                src="/SPORTIVO_LOGO.png"
                alt="Sportivo"
                className={styles.logoImg}
              />
              <span className={styles.logoText}>
                SPORTI<span>VO</span>
              </span>
            </div>
          </div>
          <ul className={styles.links}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <span
                  className={styles.link}
                  onClick={() => scrollTo(link.href)}
                >
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
            className={
              menuOpen ? styles.hamburger + " " + styles.open : styles.hamburger
            }
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>
        </div>
      </nav>
      <div
        className={menuOpen ? styles.drawer + " " + styles.open : styles.drawer}
      >
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
  );
}
