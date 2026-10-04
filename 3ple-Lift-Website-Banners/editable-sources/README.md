# 3ple Lift banners: editable sources

There are five landscape banners at 1600 × 900. Every banner carries the brand statement "We build, secure and manage websites." along with the same contact details:
3plelift.com · WhatsApp: +233 26 463 6393 · email@3plelift.com

| # | Hook | Reason to get in touch | CTA |
|---|------|------------------------|-----|
| 01 | **We build it. Then we stay.** | You need a new website and a team that won't vanish after launch | Start your new website |
| 02 | **One team. Built. Secured. Sorted.** | You're tired of chasing different people for design, hosting and fixes. The three words map to the three services, each highlighted in its Venn circle's colour. | Talk to our team |
| 03 | **Old website? Let's give it a lift.** | Your existing site is slow, outdated or hard to use | Send us your website link |
| 04 | **Your shop has a padlock. Does your website?** | You want your site kept safe, updated and backed up | Ask about website protection |
| 05 | **You run the business. We'll look after the website.** | You want ongoing care so you can focus on your business | Chat with us on WhatsApp |

### Alternative hooks for banner 02

These are in `../Banner-02-Hook-Options/`. The artwork, copy, CTA and contact details are identical to banner 02. Only the three highlighted words change:

- **A: One team. Launch. Lock. Look after.** An L alliteration: launch the site, lock it down, look after it.
- **B: One team. Start. Shield. Support.** An S alliteration: start your website, shield it, support it.
- **C: One team. Ready. Safe. Looked after.** Plain words that describe what the owner gets.

## Files

- `banner-0X_*.svg` are the layered sources. You can open them in Figma, Illustrator, Inkscape or a browser. Each one has five named top-level groups:
  - `layer-background`: the cream base, the blurred gradient blobs and the flowing ribbons
  - `layer-illustration`: the artwork. Labels inside it are live text.
  - `layer-logo`: the logo slot (see below)
  - `layer-text`: the headline, the brand statement, the supporting copy and the CTA. Each line is a separate live text object.
  - `layer-contact`: the three contact items, also live text
- `fonts/` holds Bricolage Grotesque Bold (headlines) and Figtree Regular/Medium/SemiBold/Bold (supporting text), all from Google Fonts. Install them before editing the SVGs in a design tool.
- `logo/` is where the authentic logo goes. Read `PUT-AUTHENTIC-LOGO-HERE.txt`.
- `build/` holds the generator (`banners.mjs`, `compositions.mjs`, `build.mjs`) and the last QA report (`qa-report.json`).

## Logo

The authentic logo files couldn't be reached from the environment where these were built. The logo slot is currently filled by a **text stand-in** ("3ple Lift" set in Bricolage Grotesque), with the id `logo-placeholder`. To use the real logo, save it as `logo/3ple-lift-logo.svg` (or `.png`) and run the build below. It is linked into all five banners and the PNGs are re-exported.

## Rebuilding the PNGs

You need Node 18+ and Playwright (`npm i -D playwright && npx playwright install chromium`). Then, from this folder:

```
node build/build.mjs
```

The build:
1. writes each layered SVG
2. sizes the pills, the CTA button and the contact row to fit their text
3. exports `../3ple-Lift-Banner-0X_*.png` at exactly 1600 × 900
4. runs QA and reports any problems:
   - every text line, button and the logo must sit at least 80 px from each edge (3 px allowed for glyph overhang)
   - copy blocks must not collide with each other or with the illustration
   - the brand statement and the three contact details must appear verbatim
   - the brand fonts must actually load

All five banners currently pass. The smallest copy on any of them is 23 px.
