# J24:15 Casa de Software

Marketing site for **JOSUE 24:15 SAS** — a software studio building web and mobile
applications for businesses in Colombia. Static, Spanish-first, three pages.

Live at [josue2415.com](https://josue2415.com).

## Stack

Astro 7 · Tailwind CSS 3 · TypeScript · deployed to GitHub Pages.

## Getting started

```sh
npm install
npm run dev      # http://localhost:4321
```

> **Astro 7 runs the dev server as a background daemon.** Ctrl-C will not free the
> port — use `npx astro dev stop`. A leftover daemon is why `npm run dev` sometimes
> reports `Port 4321 is in use` and silently moves to 4322.
> `npx astro dev status` and `npx astro dev logs` are also available.

## Commands

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `npm run dev`     | Dev server on `localhost:4321`                     |
| `npm run build`   | Type-check (`astro check`) then build to `./dist/`  |
| `npm run preview` | Serve the built output locally                      |

`build` fails on type errors — that is intentional, it gates the deploy.

## Structure

```text
src/
├── pages/                    # one file per route: / · /info · /contacto
├── layouts/Layout.astro      # <head>, SEO meta, JSON-LD, ClientRouter
├── components/
│   ├── sections-index/       # sections of the home page
│   ├── sections-about-us/    # sections of /info
│   └── *.astro               # shared: Nav, Header, Footer, Contact, FinalCTA
└── assets/
    ├── icons/                # inline .astro SVG components
    └── img/                  # imported images (optimized at build)
public/                       # served as-is: og/twitter images, screenshots, videos
```

Images in `src/assets/img/` go through Astro's image pipeline (converted to WebP and
resized at build). Only put files in `public/` when they must keep a stable URL —
anything referenced there ships unoptimized.

## Design tokens

Defined in `tailwind.config.mjs`, not ad hoc in component classes:

| Token       | Value     | Use                |
| :---------- | :-------- | :----------------- |
| `white`     | `#FAFAFA` | body text on dark  |
| `black`     | `#060A06` | page background    |
| `surface`   | `#111811` | raised panels      |
| `primary`   | `#4E6050` | muted accent       |
| `secondary` | `#00A854` | brand green        |
| `tertiary`  | `#C5FF3C` | highlight lime     |

Type is Space Grotesk. There is also a `can-hover:` variant for hover styles that
should not fire on touch devices — prefer it over bare `hover:`.

## Deploying

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages. There is no staging environment: **`master` is
production.** The custom domain comes from `CNAME`.

Because the site is fully static, anything derived from the current date — such as
the years of experience in `WhoWeAre.astro` — is fixed at build time and only
updates when the site is rebuilt.

All absolute URLs (canonical tags, OG images, sitemap) derive from `site` in
`astro.config.mjs`. Change it there and nowhere else — `public/robots.txt` is the
one file that cannot read it and must be updated by hand.

## Internationalization

`astro.config.mjs` declares `es` (default, unprefixed) and `en` locales, but no
translated routes exist yet — the site is Spanish-only in practice. `Layout.astro`
accepts a `lang` prop that sets `<html lang>`.
