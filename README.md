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

> **TypeScript is pinned to 6.x on purpose.** `astro check` needs TypeScript's
> programmatic API, which the 7.x native compiler does not yet expose; on 7.x the
> check step aborts. Below 5.5, the `${configDir}` template in Astro's base
> tsconfig doesn't resolve, so `astro check` silently checks **0 files** and passes
> everything. If it ever reports `Result (0 files)`, the type gate is off — that is
> a bug, not a clean build.

## Structure

```text
src/
├── pages/                    # one file per route (see Internationalization)
│   └── en/                   # English routes, same components
├── layouts/Layout.astro      # <head>, SEO meta, hreflang, JSON-LD, ClientRouter
├── i18n/                     # es.json · en.json · index.ts (t() + route map)
├── components/
│   ├── sections-index/       # sections of the home page
│   ├── sections-about-us/    # sections of the about page
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

The site ships in Spanish (default) and English. Spanish keeps the original
unprefixed URLs; English lives under `/en/` with English slugs:

| Route     | Spanish      | English         |
| :-------- | :----------- | :-------------- |
| `home`    | `/`          | `/en/`          |
| `about`   | `/info/`     | `/en/about/`    |
| `contact` | `/contacto/` | `/en/contact/`  |

**All copy lives in `src/i18n/es.json` and `en.json`** — never hardcode a string in
a component. Read it with `useTranslations(Astro.currentLocale)`; the locale comes
from the URL, so components need no `lang` prop.

`es.json` defines the shape and `en.json` must match it. `src/i18n/index.ts` types
the pair as `Record<Locale, Dictionary>`, so **a key missing from `en.json` fails
`astro check` and therefore the build**, naming the missing key. Don't loosen that
type — it is the only thing keeping the two files in sync.

Link between pages with `routes[locale][key]` rather than literal paths, so links
stay inside the reader's language. Adding a page means: a key in `RouteKey`, an
entry in `routes` for both locales, a `pages` block in both JSON files, and the two
page files. Layout derives the title, description, canonical and hreflang from that.

Locale-dependent values needed by client scripts (number formatting, the mockup
URLs) are passed through `data-*` attributes rather than `define:vars`, which would
force the script inline and break its TypeScript.
