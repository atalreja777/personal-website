# Arnav Talreja — personal site

Plain HTML/CSS/JS, no build step. Open with a local server:

    python3 serve.py   →   http://localhost:8765   (never caches, so refresh always shows your edits)

## Editing content
Everything lives in **`js/content.js`**:
- Anything in `[square brackets]` shows on the site as a dashed placeholder. Replace it, brackets included.
- **Top of page**: `person.heroImage`, `person.heroCaption`, `person.intro` (wrap words in *asterisks* to darken them).
- **About**: `person.about`, `person.education`, `person.portrait`.
- **Recognition** row: `recognition`. **Kind words**: `quotes`.
- **Activities** (`activities`) each get a section with a photo gallery and their own page. Add one by copying a block.
- **Photos**: put files in `assets/<folder>/` and add `{ src: "assets/tennis/01.jpg", cap: "Caption" }` to that activity's `media`.
  Empty slots tell you the expected filename.
- **Videos**: `{ type: "video", src: "...mp4", poster: "...jpg", cap: "..." }`
- **Tennis strip** (`tennis.chapters`) runs oldest to newest; add `video: "assets/tennis/clip.mp4"` to a chapter to make it a video.
- **Timeline** (`timeline`) sorts itself newest-first by `date` ("2025" or "2025-03"). Optional: `end` ("Present"), `org`, `place`, `img`. Types: robotics, gur, tennis, research, school, award.
- **Projects** (`projects`) each open their own detail page.
- **Portrait**: drop `assets/me/portrait.jpg` and set `person.portrait`.

FTC and GUR photos came from growingupwithrobotics.org (originals in `assets/_originals`).
