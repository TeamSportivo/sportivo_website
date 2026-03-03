import styles from "./Sponsors.module.css"

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
