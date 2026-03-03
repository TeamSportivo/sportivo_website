"use client"
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
