import Papa from 'papaparse'

const SHEET_CSV_URL =
  //'https://docs.google.com/spreadsheets/d/e/2PACX-1vQOE8wMOwzU3o-o-WGVe6j0FlC9n_rNwb8c7JNFNWL_3sdpAZxdCsB-zLxQBQLx_Tctbdg8py90Ss8s/pub?output=csv'
   'https://docs.google.com/spreadsheets/d/1j3lq2G8jSkrGzOpdWMtqC77uPS7_7r1ZYRnfk1woZ00/edit?usp=drivesdk'


function extractDriveFileId(url) {
  if (!url) return null
  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/open\?id=([a-zA-Z0-9_-]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function toDirectImageUrl(url) {
  if (!url || url.trim() === '') return null
  const fileId = extractDriveFileId(url)
  if (fileId) {
    // Use the thumbnail API — this serves images directly without
    // CORS issues or redirect loops that plague uc?export=view
    // sz=s400 sets max dimension to 400px (enough for member cards)
    return 'https://lh3.googleusercontent.com/d/' + fileId + '=s400'
  }
  if (url.startsWith('http')) return url
  return null
}

// Maps the actual values seen in your Google Form responses
function categorise(position) {
  if (!position || position.trim() === '') return 'core'
  const p = position.toLowerCase().trim()

  // Exact shorthand codes from your Google Sheet
  if (p === 'cc') return 'core'         // "CC"        -> Core Committee
  if (p === 'wc') return 'working'      // "Wc" / "WC" -> Working Committee
  if (p === 'mentor') return 'mentor'
  if (p === 'volunteer') return 'volunteer'

  // Longer form / partial matches (future-proof)
  if (p.includes('mentor')) return 'mentor'
  if (p.includes('core') || p === 'cc') return 'core'
  if (p.includes('working') || p === 'wc') return 'working'
  if (p.includes('volunteer')) return 'volunteer'

  return 'core' // fallback
}

function getInitials(name) {
  if (!name) return '?'
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

export async function fetchMembers() {
  try {
    const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error('Failed to fetch Google Sheet CSV')
    const csvText = await res.text()

    const { data } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    })

    const members = data
      .map((row, idx) => {
        const keys = Object.keys(row)

        // Case-insensitive column lookup
        const get = (keyword) => {
          const key = keys.find((k) =>
            k.toLowerCase().includes(keyword.toLowerCase())
          )
          return key ? (row[key] || '').trim() : ''
        }

        const name = get('name')
        if (!name) return null

        const department = get('department')
        // NOTE: The Google Form column is misspelled as "poistion in club"
        // We search for both spellings to be safe
        const position = get('poistion') || get('position')
        const email       = get('email')
        const photoUrl    = get('photo')

        // Debug: uncomment to verify position values in server console
        // console.log('Member:', name, '| raw position:', JSON.stringify(position))

        return {
          id: idx,
          name,
          department: department
            ? department.charAt(0).toUpperCase() + department.slice(1)
            : '',
          position,
          email,
          photo: toDirectImageUrl(photoUrl),
          initials: getInitials(name),
          category: categorise(position),
        }
      })
      .filter(Boolean)

    // Deduplicate: keep first occurrence per email
    // (handles cases where the same person submitted the form twice)
    const seen = new Set()
    const unique = members.filter((m) => {
      const key = (m.email || m.name).toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })

    const grouped = {
      mentor:    unique.filter((m) => m.category === 'mentor'),
      core:      unique.filter((m) => m.category === 'core'),
      working:   unique.filter((m) => m.category === 'working'),
      volunteer: unique.filter((m) => m.category === 'volunteer'),
    }
    // Visible in your npm run dev terminal — remove once confirmed working
    console.log('[Sportivo] Member categories:', {
      mentor: grouped.mentor.length,
      core: grouped.core.length,
      working: grouped.working.length,
      volunteer: grouped.volunteer.length,
    })
    return grouped
  } catch (err) {
    console.error('fetchMembers error:', err)
    return { mentor: [], core: [], working: [], volunteer: [] }
  }
}
