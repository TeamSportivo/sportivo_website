# Sportivo — Official Website

**The official sports club website of Future Institute of Engineering and Management (FIEM), Kolkata.**

Built with Next.js 14, featuring dynamic member loading from Google Sheets, animated UI components, and event registration links for all club events.

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Animations:** Framer Motion
- **Styling:** CSS Modules + CSS Variables
- **Member Data:** Google Sheets CSV (auto-fetched at build/request time)
- **Fonts:** Barlow Condensed, DM Sans, Oswald (Google Fonts)
- **Icons:** Font Awesome 6

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/TeamSportivo/sportivo_website
cd sportivo_website

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
sportivo/
├── app/
│   ├── layout.js           # Root layout, metadata, font imports
│   ├── page.js             # Main page — fetches members server-side
│   └── globals.css         # Global styles + font imports
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx      # Sticky navbar with mobile drawer
│   │   └── Footer.jsx      # Footer with socials and contact persons
│   ├── sections/
│   │   ├── Hero.jsx        # Full-screen hero with animated orbs
│   │   ├── About.jsx       # Club info + animated stat counters
│   │   ├── Events.jsx      # Event grid with registration links
│   │   ├── Team.jsx        # Tabbed team section (dynamic from Sheets)
│   │   ├── Gallery.jsx     # Masonry photo gallery with lightbox
│   │   ├── Sponsors.jsx    # Scrolling sponsor strip (placeholder)
│   │   └── FAQ.jsx         # Accordion FAQ
│   └── ui/
│       ├── EventCard.jsx   # Individual event card component
│       ├── MemberCard.jsx  # Individual member card with photo fallback
│       ├── StatCounter.jsx # Animated count-up number
│       ├── SectionHeading.jsx
│       └── FloatingCTA.jsx # Fixed "Register Now" button
├── data/
│   ├── events.js           # All event data + Google Form links
│   └── faq.js              # FAQ questions and answers
├── hooks/
│   └── useInView.js        # Intersection Observer hook
├── lib/
│   ├── fetchMembers.js     # Fetches + parses Google Sheets CSV
│   └── animations.js       # Reusable Framer Motion variants
└── styles/
    ├── variables.css       # Design tokens (colours, fonts, spacing)
    └── animations.css      # Global keyframe animations
```

---

## Updating Content

### Adding or Editing Events

Edit `data/events.js`. Each event object looks like:

```js
{
  id: 1,
  name: "Cricket",
  category: "Team Sport",
  emoji: "🏏",
  dates: "2nd – 3rd April 2025",
  description: "Your description here.",
  formLink: "https://forms.gle/your-form-link",
  color: "#27AE60",        // accent colour for the card
  note: "Optional note",   // shows as a small chip on the card (optional)
  featured: true,          // adds a "Featured" badge (optional)
}
```

### Updating the Team

The team section is **automatically populated** from the club's Google Form responses via Google Sheets. No manual updates needed — new form submissions appear on the site within 1 hour (revalidation interval).

**How it works:**

1. Members fill out the Google Form
2. Responses go to the linked Google Sheet
3. The sheet is published as CSV (`File → Share → Publish to web`)
4. `lib/fetchMembers.js` fetches and parses the CSV on each request

**Position values recognised in the form:**
| Form value | Tab shown on site |
|---|---|
| `CC` | Core Committee |
| `Wc` | Working Committee |
| `Mentor` | Mentors |
| `Volunteer` | Volunteers |

**Photo requirements:** Member photos must be stored on Google Drive with sharing set to **"Anyone with the link can view"**.

### Updating Google Sheets URL

If the sheet changes, update the `SHEET_CSV_URL` constant at the top of `lib/fetchMembers.js`.

### Replacing Sponsor Logos

In `components/sections/Sponsors.jsx`, replace the placeholder `<div>` elements with `<img>` or Next.js `<Image>` components pointing to logo files in `/public/sponsors/`.

---

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect the GitHub repo directly at [vercel.com](https://vercel.com) — it auto-detects Next.js and deploys on every push to `main`.

### Other Platforms

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## Contact

| Name            | Phone           |
| --------------- | --------------- |
| Rohit Yadav     | +91 98301 16661 |
| Aman Agastya    | +91 96935 53439 |
| Chhavinav Verma | +91 74797 03520 |

- **Email:** sportivo@teamfuture.in
- **Instagram:** [@sportivoteamfuture](https://www.instagram.com/sportivoteamfuture/)
- **Facebook:** [sportivoteamfuture](https://www.facebook.com/sportivoteamfuture)
- **YouTube:** [@sportivoteamfuture](https://youtube.com/@sportivoteamfuture)
- **Address:** Sonarpur Station Rd, Mission Pally, Narendrapur, Kolkata 700150

---

_© 2026 Sportivo · Future Institute of Engineering and Management_
