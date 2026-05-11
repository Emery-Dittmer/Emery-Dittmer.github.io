import fs from 'fs'
import path from 'path'

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.svg'])

export type ProjectImages = {
  cover: string | null  // public URL e.g. /projects/transit-catchment/cover.png
  gallery: string[]     // public URLs for every image in the folder
}

// Reads public/projects/<projectId>/ at build time (Server Components only).
// Returns empty gracefully when the folder doesn't exist yet.
export function getProjectImages(projectId: string): ProjectImages {
  const dir = path.join(process.cwd(), 'public', 'projects', projectId)

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

  return {
    cover:   coverFile ? `/projects/${projectId}/${coverFile}` : null,
    gallery: images.map((f) => `/projects/${projectId}/${f}`),
  }
}
