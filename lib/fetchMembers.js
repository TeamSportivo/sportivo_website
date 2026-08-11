import Papa from "papaparse";

const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1Qk4_dk3iF_h41adqeZKnb78-TCKRa3XFenKfAcD0cfM/export?format=csv&utm_source=chatgpt.com";
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
    // Use the thumbnail API — this serves images directly without
    // CORS issues or redirect loops that plague uc?export=view
    // sz=s400 sets max dimension to 400px (enough for member cards)
    return "https://lh3.googleusercontent.com/d/" + fileId + "=s400";
  }
  if (url.startsWith("http")) return url;
  return null;
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

        const name = get("name");
        if (!name) return null;

        const department = get("department").toUpperCase().trim();
        // NOTE: The Google Form column is misspelled as "poistion in club"
        // We search for both spellings to be safe
        const rawPosition = (
          get("poistion in club") ||
          get("position in club") ||
          ""
        ).trim();
        const email = get("email");
        const photoUrl = get("photo");

        const mentorOrder = parseInt(get("mentor_order") || "9999");
        const mentorRole = get("mentor_role") || "";

        const category = categorise(rawPosition);

        // Normalize position label for display on cards
        let normalizedPosition = rawPosition;
        const lowPos = rawPosition.toLowerCase();
        if (lowPos === "cc" || lowPos.includes("core")) {
          normalizedPosition = "Core Committee";
        } else if (lowPos === "wc" || lowPos.includes("working")) {
          normalizedPosition = "Working Committee";
        } else if (lowPos.includes("volunteer")) {
          normalizedPosition = "Volunteer";
        } else if (lowPos.includes("mentor")) {
          normalizedPosition = "Mentor";
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
          photo: toDirectImageUrl(photoUrl),
          initials: getInitials(name),
          category,
          instagram: get("instagram"),
          facebook: get("facebook"),
          linkedin: get("linkedin"),
        };
      })
      .filter(Boolean);

    // Deduplicate: keep first occurrence per email
    // (handles cases where the same person submitted the form twice)
    const seen = new Set();
    const unique = members.filter((m) => {
      const key = (m.email || m.name).toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const grouped = {
      mentor: unique
        .filter((m) => m.category === "mentor")
        .sort((a, b) => a.mentorOrder - b.mentorOrder),
      core: unique.filter((m) => m.category === "core"),
      working: unique.filter((m) => m.category === "working"),
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
