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
      {member.mentorRole && (
        <div className={styles.mentorRole}>{member.mentorRole}</div>
      )}
      {member.department && (
        <div className={styles.dept}>{member.department}</div>
      )}
      <div className={styles.role}>{member.position}</div>
    </motion.div>
  );
}
