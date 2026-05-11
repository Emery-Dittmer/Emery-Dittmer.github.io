import fs from 'fs'
import path from 'path'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'])

export type ProjectImages = {
  cover: string | null  // public URL, e.g. /projects/transit-catchment/cover.png
  gallery: string[]     // public URLs for every image in the folder
}

// Finds the actual directory on disk for a given project ID.
// Tries the exact ID first, then falls back to a case-insensitive /
// hyphen-space-normalised match so folder names like "Stadium Visualization Product"
// resolve to the project ID "stadium-visualization-product".
function resolveProjectDir(projectId: string): { dir: string; folderName: string } | null {
  const projectsRoot = path.join(process.cwd(), 'public', 'projects')

  // 1. Exact match
  const exactDir = path.join(projectsRoot, projectId)
  if (fs.existsSync(exactDir)) return { dir: exactDir, folderName: projectId }

  // 2. Case-insensitive / hyphen↔space fallback
  let entries: string[]
  try {
    entries = fs.readdirSync(projectsRoot)
  } catch {
    return null
  }

  const normalize = (s: string) => s.toLowerCase().replace(/-/g, ' ')
  const target = normalize(projectId)
  const match = entries.find((e) => normalize(e) === target)

  if (match) return { dir: path.join(projectsRoot, match), folderName: match }
  return null
}

// Reads public/projects/<projectId>/ at build time (Server Components only).
// Returns empty gracefully when the folder doesn't exist yet.
export function getProjectImages(projectId: string): ProjectImages {
  const resolved = resolveProjectDir(projectId)
  if (!resolved) return { cover: null, gallery: [] }

  const { dir, folderName } = resolved

  let files: string[]
  try {
    files = fs.readdirSync(dir)
  } catch {
    return { cover: null, gallery: [] }
  }

  const images = files
    .filter((f) => IMAGE_EXTS.has(path.extname(f).toLowerCase()))
    .sort()

  const coverFile = images.find((f) => f.toLowerCase().includes('cover'))

  // Encode each URL segment so spaces and special chars are safe in <img src>
  const base = `/projects/${encodeURIComponent(folderName)}`

  return {
    cover:   coverFile ? `${base}/${encodeURIComponent(coverFile)}` : null,
    gallery: images.map((f) => `${base}/${encodeURIComponent(f)}`),
  }
}
