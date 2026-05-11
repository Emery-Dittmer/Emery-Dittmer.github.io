# Project Images

Drop images for each project into the matching folder:

```
public/
  projects/
    transit-catchment/
      cover.png          ← filename must contain "cover" → used as the project icon
      screenshot-1.png   ← all other images appear in the gallery
      screenshot-2.jpg
    fx-rates/
      cover.jpg
      demo.png
    stadium-visualization-product/
      cover.png
      ...
```

Rules:
- Any image whose filename contains the word **cover** (case-insensitive) becomes the project's cover/icon image.
- Every image in the folder (including the cover) appears in the gallery on the project detail page.
- Supported formats: .jpg, .jpeg, .png, .gif, .webp, .avif, .svg
- Folder name must exactly match the project `id` from `lib/projectsConfig.ts`.
