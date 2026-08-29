"use client"
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
            <a href="https://www.instagram.com/sportivoteamfuture/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href="https://www.facebook.com/sportivoteamfuture" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Facebook">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="https://youtube.com/@sportivoteamfuture" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="YouTube">
              <i className="fab fa-youtube" />
            </a>
            <a href="mailto:sportivo@teamfuture.in" className={styles.socialIcon} aria-label="Email">
              <i className="fas fa-envelope" />
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
            <li><a href="mailto:sportivo@teamfuture.in">sportivo@teamfuture.in</a></li>
            <li><span className={styles.address}>Sonarpur Station Rd, Mission Pally, Narendrapur, Kolkata 700150</span></li>
          </ul>
          <h4 className={styles.subheading}>Reach Out Directly</h4>
          <ul>
            <li className={styles.contactPerson}>
              <span className={styles.contactName}>Suhit Ghosh</span>
              <a href="tel:+917044969644" className={styles.contactPhone}>+91 70449 69644</a>
            </li>
            <li className={styles.contactPerson}>
              <span className={styles.contactName}>Rupankar Dey</span>
              <a href="tel:+919433760753" className={styles.contactPhone}>+91 94337 60753</a>
            </li>
            <li className={styles.contactPerson}>
              <span className={styles.contactName}>Ankush Samanta</span>
              <a href="tel:+919091808088" className={styles.contactPhone}>+91 90918 08088</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>© 2025 <span>Sportivo</span> · Future Institute of Engineering and Management, Kolkata. All rights reserved.</p>
      </div>
    </footer>
  )
}
