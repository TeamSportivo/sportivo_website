import Papa from "papaparse";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1BzglKYXSYI9MKihxosLp-cEOHxYRgaMwu6xuGPIYQyw/export?format=csv";

// Manual photo overrides by lowercase name (when sheet photo is wrong/missing)
const PHOTO_OVERRIDES = {
  "jyoti prakash bera":
    "https://drive.google.com/file/d/1VlxywJpn2F4ZiKLMBqOJsglZ7s3ewPR9/view?usp=drivesdk",
  "sayan jana":
    "https://drive.google.com/file/d/1s6p3xveLBNwqaGX-Qv5oPIq5yqcSws0n/view",
  "tathagata das":
    "https://drive.google.com/file/d/1cXsxRMAPIcZO0yIUhHifE3YJwpV0ixR6/view?usp=sharing",
};

// Manual department overrides by lowercase name (when sheet value is wrong)
const DEPARTMENT_OVERRIDES = {
  "sajal sardar": "ECE",
};

// Manual position overrides by lowercase name (when sheet value is wrong)
const POSITION_OVERRIDES = {
  "nikhil kumar": "Working Committee",
};

// Manual mentor role overrides by lowercase name
const MENTOR_ROLE_OVERRIDES = {
  "mriganka chowdhury": "Badminton Head",
  "debadrita kundu": "Table Tennis Head",
  "swagatam sarkar": "Content & PR Head",
  "diganta nath": "Chess Head",
};

// Manual email overrides by lowercase name
const EMAIL_OVERRIDES = {
  "niladri banerjee": "niladri.banerjee@teamfuture.in",
  "ratul kayal": "ratul.kayal@teamfuture.in",
  "atreyee roy": "crook.shank.ray.05@gmail.com",
};

// Manual social overrides by lowercase name (when sheet links are wrong/missing)
const SOCIAL_OVERRIDES = {
  "jitesh prasad": {
    instagram:
      "https://www.instagram.com/rajagupta7041?igsh=MTI4ZTRlaXUwdTd3bA==",
    facebook: "",
    linkedin:
      "https://www.linkedin.com/in/jitesh-prasad-691398324?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  "kinjal sarkar": {
    instagram: "https://www.instagram.com/bykin._?igsh=MWRiM3ExM2hicmpvbA==",
    facebook: "",
    linkedin: "",
  },
  "ankush samanta": {
    instagram: "https://www.instagram.com/kush.env?igsi=NzVzZzJxNmdqOXl3",
    facebook: "https://www.facebook.com/share/18EEx5HDCe/",
    linkedin:
      "https://www.linkedin.com/in/ankush-samanta-804403295?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  "atreyee roy": {
    instagram:
      "https://www.instagram.com/croo_kshank?utm_source=qr&igsi=b2Z6YWRmZjJlZnRm",
    facebook: "https://www.facebook.com/share/1CM8EQMDUg/",
  },
  "debadrita kundu": {
    instagram: "",
    facebook: "",
  },
};
function extractDriveFileId(url) {
  if (!url) return null;
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/open\?id=([a-zA-Z0-9_-]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function toDirectImageUrl(url) {
  if (!url || url.trim() === "") return null;
  const fileId = extractDriveFileId(url);
  if (fileId) {
    // lh3 CDN embeds reliably in <img>; uc?export=view often 403s in browsers
    return "https://lh3.googleusercontent.com/d/" + fileId + "=s400";
  }
  if (url.startsWith("http")) return url;
  return null;
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function formatAndValidateSocialUrl(url, platform) {
  if (!url) return null;
  const clean = url.trim();
  if (!clean || ["na", "n/a", "none", "nil", "-", "no", "null", "undefined"].includes(clean.toLowerCase())) {
    return null;
  }

  let formatted = clean;

  // If it's already a full URL or a domain-like path
  if (clean.includes(".") || clean.includes("/")) {
    if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
      formatted = `https://${clean}`;
    }
  } else {
    // Otherwise, treat it as a handle/username
    const handle = clean.startsWith("@") ? clean.slice(1) : clean;
    if (!handle) return null;
    
    if (platform === "instagram") formatted = `https://instagram.com/${handle}`;
    else if (platform === "facebook") formatted = `https://facebook.com/${handle}`;
    else if (platform === "linkedin") formatted = `https://linkedin.com/in/${handle}`;
    else return null;
  }

  if (isValidUrl(formatted)) {
    return formatted;
  }
  return null;
}

function resolveSocial(name, platform, sheetValue) {
  const override = SOCIAL_OVERRIDES[name.toLowerCase()];
  const raw =
    override && Object.prototype.hasOwnProperty.call(override, platform)
      ? override[platform]
      : sheetValue;
  return formatAndValidateSocialUrl(raw, platform);
}

// Maps the actual values seen in your Google Form responses
function categorise(position) {
  if (!position || position.trim() === "") return "core";
  const p = position.toLowerCase().trim();

  if (p === "cc" || p.includes("core")) return "core";
  if (p === "wc" || p.includes("working")) return "working";
  if (p.includes("mentor")) return "mentor";
  if (p.includes("volunteer")) return "volunteer";

  return "core"; // fallback
}

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// Display order for mentor roles (lower = earlier)
function mentorRoleRank(role) {
  const r = (role || "").toLowerCase().trim();
  if (!r) return 900;
  if (r.includes("head mentor")) return 2;
  if (r.includes("vice president")) return 3;
  if (r.includes("president")) return 1;
  if (r.includes("sports head")) return 4;
  if (r.includes("graphics") || r.includes("social media")) return 5;
  if (r.includes("content") && r.includes("pr")) return 6;
  if (r.includes("marketing head")) return 7;
  if (r.includes("badminton head")) return 8;
  if (r.includes("cricket head")) return 9;
  if (r.includes("table tennis head") || r.includes("tabletennis head"))
    return 10;
  if (r.includes("football head")) return 11;
  if (r.includes("chess head")) return 12;
  if (r.includes("handball head")) return 13;
  if (r.includes("event head")) return 80;
  return 200;
}

function compareMentors(a, b) {
  const rankA = mentorRoleRank(a.mentorRole);
  const rankB = mentorRoleRank(b.mentorRole);
  if (rankA !== rankB) return rankA - rankB;

  // Same band: keep identical roles together, then A–Z by name
  const roleA = (a.mentorRole || "").toLowerCase().trim();
  const roleB = (b.mentorRole || "").toLowerCase().trim();
  const byRole = roleA.localeCompare(roleB);
  if (byRole !== 0) return byRole;

  return a.name.localeCompare(b.name);
}

// CC / WC display order by department
function departmentRank(dept) {
  const d = (dept || "").toLowerCase().replace(/\s+/g, "");
  if (/^cse\(ds\)|^cseds|^cse[\-_]?ds/.test(d)) return 2;
  if (d === "cse") return 1;
  if (d === "ece") return 3;
  if (d === "ee" || d === "eee") return 4;
  if (d === "bca") return 5;
  if (d === "bba") return 6;
  if (d === "bhm") return 7;
  if (d === "it") return 8;
  return 100;
}

function compareByDepartment(a, b) {
  const rankA = departmentRank(a.department);
  const rankB = departmentRank(b.department);
  if (rankA !== rankB) return rankA - rankB;
  const byDept = (a.department || "").localeCompare(b.department || "");
  if (byDept !== 0) return byDept;
  return a.name.localeCompare(b.name);
}

export async function fetchMembers() {
  try {
    const isDev = process.env.NODE_ENV === "development";
    const res = await fetch(SHEET_CSV_URL, {
      next: isDev ? { revalidate: 0 } : { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch Google Sheet CSV");
    const csvText = await res.text();

    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const members = data
      .map((row, idx) => {
        const keys = Object.keys(row);

        // Case-insensitive column lookup
        const get = (keyword) => {
          const key = keys.find((k) =>
            k.toLowerCase().includes(keyword.toLowerCase()),
          );
          return key ? (row[key] || "").trim() : "";
        };

        // Prefer any non-empty email column (sheet has both "Your Email" and "Email Address")
        const getEmail = () => {
          const override = EMAIL_OVERRIDES[get("name").toLowerCase()];
          if (override) return override;
          const emailKeys = keys.filter((k) =>
            k.toLowerCase().includes("email"),
          );
          for (const key of emailKeys) {
            const value = (row[key] || "").trim();
            if (value.includes("@")) return value;
          }
          return "";
        };

        const name = get("name");
        if (!name) return null;

        const department = (
          DEPARTMENT_OVERRIDES[name.toLowerCase()] || get("department")
        )
          .toUpperCase()
          .trim();
        // NOTE: The Google Form column is misspelled as "poistion in club"
        // We search for both spellings to be safe
        const rawPosition = (
          POSITION_OVERRIDES[name.toLowerCase()] ||
          get("poistion in club") ||
          get("position in club") ||
          ""
        ).trim();
        const email =
          EMAIL_OVERRIDES[name.toLowerCase()] || getEmail() || get("email");
        const photoUrl = get("photo");

        const mentorOrder = parseInt(get("mentor_order") || "9999");
        const mentorRole =
          MENTOR_ROLE_OVERRIDES[name.toLowerCase()] || get("mentor_role") || "";

        const category = categorise(rawPosition);

        // Normalize position label for display on cards
        let normalizedPosition = rawPosition;
        const lowPos = rawPosition.toLowerCase();
        if (lowPos === "cc" || lowPos.includes("core")) {
          normalizedPosition = "Core Committee";
        } else if (lowPos === "wc" || lowPos.includes("working")) {
          normalizedPosition = "Working Committee";
        } else if (lowPos.includes("mentor")) {
          normalizedPosition = "Mentor";
        } else if (lowPos.includes("volunteer")) {
          normalizedPosition = "Volunteer";
        }

        // Debug: uncomment to verify position values in server console
        // console.log('Member:', name, '| raw position:', JSON.stringify(rawPosition))

        return {
          id: idx,
          name,
          department: department
            ? department.charAt(0).toUpperCase() + department.slice(1)
            : "",
          position: normalizedPosition,
          email,
          mentorOrder,
          mentorRole,
          photo: toDirectImageUrl(
            PHOTO_OVERRIDES[name.toLowerCase()] || photoUrl,
          ),
          initials: getInitials(name),
          category,
          instagram: resolveSocial(name, "instagram", get("instagram")),
          facebook: resolveSocial(name, "facebook", get("facebook")),
          linkedin: resolveSocial(name, "linkedin", get("linkedin")),
        };
      })
      .filter(Boolean);

    // Deduplicate by email/name — keep the richer submission when duplicates exist
    const scoreMember = (m) =>
      (m.instagram ? 1 : 0) +
      (m.facebook ? 1 : 0) +
      (m.linkedin ? 1 : 0) +
      (m.photo ? 1 : 0) +
      (m.email ? 1 : 0);
    const byKey = new Map();
    for (const m of members) {
      const key = (m.email || m.name).toLowerCase();
      const prev = byKey.get(key);
      if (!prev || scoreMember(m) > scoreMember(prev)) {
        byKey.set(key, m);
      }
    }
    const unique = Array.from(byKey.values());

    const grouped = {
      mentor: unique
        .filter((m) => m.category === "mentor")
        .sort(compareMentors),
      core: unique
        .filter((m) => m.category === "core")
        .sort(compareByDepartment),
      working: unique
        .filter((m) => m.category === "working")
        .sort(compareByDepartment),
      volunteer: unique.filter((m) => m.category === "volunteer"),
    };
    // Visible in your npm run dev terminal — remove once confirmed working
    console.log("[Sportivo] Member categories:", {
      mentor: grouped.mentor.length,
      core: grouped.core.length,
      working: grouped.working.length,
      volunteer: grouped.volunteer.length,
    });
    return grouped;
  } catch (err) {
    console.error("fetchMembers error:", err);
    return { mentor: [], core: [], working: [], volunteer: [] };
  }
}
