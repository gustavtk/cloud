# 3ple Lift banners: editable sources

There are five landscape banners at 1600 × 900. Every banner carries the brand statement "We build, secure and manage websites." along with the same contact details:
3plelift.com · WhatsApp: +233 26 463 6393 · email@3plelift.com

| # | Hook | Reason to get in touch | CTA |
|---|------|------------------------|-----|
| 01 | **We build it. Then we stay.** | You need a new website and a team that won't vanish after launch | Start your new website |
| 02 | **One team. Built. Secured. Sorted.** | You're tired of chasing different people for design, hosting and fixes. The three words map to the three services, each highlighted in its Venn circle's colour. | Talk to our team |
| 03 | **Old website? Let's give it a lift.** | Your existing site is slow, outdated or hard to use | Send us your website link |
| 04 | **Your shop has a padlock. Your website needs one too.** | You want your site kept safe, updated and backed up | Ask about website protection |
| 05 | **You run the business. We'll look after the website.** | You want ongoing care so you can focus on your business | Chat with us on WhatsApp |

### Alternative hooks for banner 02

These are in `../Banner-02-Hook-Options/`. The artwork, copy, CTA and contact details are identical to banner 02. Only the three highlighted words change:

- **A: One team. Launch. Lock. Look after.** An L alliteration: launch the site, lock it down, look after it.
- **B: One team. Start. Shield. Support.** An S alliteration: start your website, shield it, support it.
- **C: One team. Ready. Safe. Looked after.** Plain words that describe what the owner gets.

## Round 2: bold hooks

These are in `../Round-2-Bold-Hooks/`. Each one is built around a moment business owners recognise straight away. They use the same system as round 1: brand statement, contact row, logo, "3" watermark and the 80 px safe area.

| # | Hook | The moment it plays on | CTA |
|---|------|------------------------|-----|
| R2-01 | **Going up? Press 3.** | A lift panel where floor 1 is Build, floor 2 is Secure and floor 3 is Manage. The lift's display shows the 3 from the logo. | Take the lift: message us |
| R2-02 | **They built your website… Then stopped picking your calls?** | A call log with five days of unanswered calls to "Web designer", and then 3ple Lift replies | Call us. We pick up. |
| R2-03 | **Your business deserves more than a WhatsApp status.** | A status post ("New stock! DM to order") becomes a proper website with products and Order buttons | Get your own website |
| R2-04 | **Before customers call, they search. What will they find?** | A search bar with two results: "This site can't be reached" and a fresh site with Call and Message buttons | Make it a great first look |
| R2-05 | **A broken website is a shop with its shutters down. We'll lift them.** | A shopfront whose shutter is rolling up with three brand chevrons, and an "Open again" sign | Get your website back up |

The source files are `banner-r2-0X_*.svg`, and the generator is `build/round2.mjs`.

## Files

- `banner-0X_*.svg` are the layered sources. You can open them in Figma, Illustrator, Inkscape or a browser. Each one has five named top-level groups:
  - `layer-background`: the cream base, the blurred gradient blobs and the flowing ribbons
  - `layer-illustration`: the artwork. Labels inside it are live text.
  - `layer-logo`: the original 3ple Lift wordmark, embedded as vector paths (see below)
  - `layer-text`: the headline, the brand statement, the supporting copy and the CTA. Each line is a separate live text object.
  - `layer-contact`: the three contact items, also live text
- `fonts/` holds Bricolage Grotesque Bold (headlines) and Figtree Regular/Medium/SemiBold/Bold (supporting text), all from Google Fonts. Install them before editing the SVGs in a design tool.
- `logo/` holds the original logo files: `3ple-lift-logo.svg` (wordmark) and `3ple-lift-mark.svg` (the "3" mark).
- `build/` holds the generator (`banners.mjs`, `compositions.mjs`, `build.mjs`) and the last QA report (`qa-report.json`).

## Logo

Every banner uses the original wordmark from `logo/3ple-lift-logo.svg`. It's copied into each SVG as vector paths with its original colours, so it stays exact at any size. On the dark banner (04) it sits on a cream badge, because the "ple" lettering is near-black.

The "3" from `logo/3ple-lift-mark.svg` is also used as a large, faint watermark in each banner's background layer (`watermark-3`). It's tinted green at 6-7% opacity on the light banners and mint at 8% on the dark one, and placed in a different open area on each banner. To replace either logo, swap the file in `logo/` (keep the same file name and viewBox) and run the build.

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
