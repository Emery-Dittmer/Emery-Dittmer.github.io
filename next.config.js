/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'export',
    images: { unoptimized: true },

    // GitHub Pages serves each route's index.html for the bare directory
    // path but has no rewrite rule for a flat `<slug>.html`. Without this,
    // `/Projects/en/foo` (200) and `/Projects/en/foo/` (404) diverge on
    // every route — any manually-typed or externally-linked URL with a
    // trailing slash dead-ends. trailingSlash: true emits `<path>/index.html`
    // so both forms resolve.
    trailingSlash: true,
   
    // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
    // skipTrailingSlashRedirect: true,
   
    // Optional: Change the output directory `out` -> `dist`
    // distDir: 'dist',
  }
   
  module.exports = nextConfig