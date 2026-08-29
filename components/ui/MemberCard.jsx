"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";
import styles from "./MemberCard.module.css";

export default function MemberCard({ member, index }) {
  const [imgError, setImgError] = useState(false);

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
      {member.category === "mentor" && member.mentorRole && (
        <div className={styles.mentorRole}>{member.mentorRole}</div>
      )}
      {member.department && (
        <div className={styles.dept}>{member.department}</div>
      )}
      <div className={styles.socials}>
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className={styles.socialLink}
            title="Email"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </a>
        )}
        {member.instagram && (
          <a
            href={member.instagram}
            className={styles.socialLink}
            title="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
        )}
        {member.facebook && (
          <a
            href={member.facebook}
            className={styles.socialLink}
            title="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </a>
        )}
        {member.linkedin && (
          <a
            href={member.linkedin}
            className={styles.socialLink}
            title="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
              <rect x="2" y="9" width="4" height="12"></rect>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}
