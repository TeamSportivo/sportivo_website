"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { scaleIn, viewportConfig } from "@/lib/animations";
import styles from "./MemberCard.module.css";

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

function driveFileIdFromUrl(url) {
  if (!url) return null;
  const match =
    url.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

function photoFallbacks(photoUrl) {
  const id = driveFileIdFromUrl(photoUrl);
  if (!id) return photoUrl ? [photoUrl] : [];
  return [
    `https://lh3.googleusercontent.com/d/${id}=s400`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
    `https://drive.google.com/uc?export=view&id=${id}`,
  ];
}

export default function MemberCard({ member, index }) {
  const candidates = photoFallbacks(member.photo);
  const [photoIdx, setPhotoIdx] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [notice, setNotice] = useState("");
  const noticeTimer = useRef(null);

  useEffect(() => {
    setPhotoIdx(0);
    setImgError(false);
  }, [member.photo]);

  useEffect(() => {
    return () => {
      if (noticeTimer.current) clearTimeout(noticeTimer.current);
    };
  }, []);

  const handleImgError = () => {
    if (photoIdx + 1 < candidates.length) {
      setPhotoIdx((i) => i + 1);
    } else {
      setImgError(true);
    }
  };

  const showMissing = (platform) => {
    setNotice(`${member.name} doesn't have ${platform}`);
    if (noticeTimer.current) clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 2500);
  };

  const socials = [
    {
      key: "email",
      label: "Email",
      href: member.email ? `mailto:${member.email}` : null,
      icon: <EmailIcon />,
      external: false,
    },
    {
      key: "instagram",
      label: "Instagram",
      href: member.instagram || null,
      icon: <InstagramIcon />,
      external: true,
    },
    {
      key: "facebook",
      label: "Facebook",
      href: member.facebook || null,
      icon: <FacebookIcon />,
      external: true,
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: member.linkedin || null,
      icon: <LinkedInIcon />,
      external: true,
    },
  ];

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
        {candidates.length > 0 && !imgError ? (
          <img
            src={candidates[photoIdx]}
            alt={member.name}
            className={styles.photo}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={handleImgError}
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
        {socials.map((s) =>
          s.href ? (
            <a
              key={s.key}
              href={s.href}
              className={styles.socialLink}
              title={s.label}
              {...(s.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {s.icon}
            </a>
          ) : (
            <button
              key={s.key}
              type="button"
              className={`${styles.socialLink} ${styles.socialMissing}`}
              title={`${s.label} not available`}
              aria-label={`${member.name} does not have ${s.label}`}
              onClick={() => showMissing(s.label)}
            >
              {s.icon}
            </button>
          ),
        )}
      </div>
      {notice && <div className={styles.socialNotice}>{notice}</div>}
    </motion.div>
  );
}
