# eidetic-labs.com

The static landing page for [Eidetic Labs](https://eidetic-labs.com) — the studio behind [Craik](https://craik.eidetic-labs.com).

## Local preview

```sh
python3 -m http.server 4000
# then open http://localhost:4000
```

No build step. Plain HTML, CSS, and a tiny JS file for the theme toggle and copy-to-clipboard.

## Structure

```
index.html         Landing page
styles.css         All styling — mirrors craik.eidetic-labs.com aesthetic
theme.js           Theme toggle + install-snippet copy
assets/
  fonts/           Poppins (Light, Regular, Medium, Bold), self-hosted
  logo/            Primary + icon lockups (SVG)
  favicons/        SVG + PNG favicons, apple-touch-icon
```

## Brand

Tokens, colors, typography, and lockups come from the Eidetic Labs brand
package. Lavender on paper / lavender on ink, Poppins display, system-mono
metadata. See the brand guidelines PDF for full usage rules.

## Deploy

The site is fully static. Any static host works (GitHub Pages, Cloudflare
Pages, Netlify, Vercel, S3+CloudFront).
