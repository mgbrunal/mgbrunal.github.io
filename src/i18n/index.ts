import en from "./en.json";
import es from "./es.json";

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Must match `i18n.defaultLocale` in astro.config.mjs. */
export const defaultLocale: Locale = "es";

/**
 * `es.json` is the source of truth for the dictionary shape. Typing the record
 * below as `Record<Locale, Dictionary>` is what makes `astro check` fail when
 * `en.json` is missing a key — don't loosen it.
 */
export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/** Narrows `Astro.currentLocale`, which is `string | undefined`. */
export function getLocale(current: string | undefined): Locale {
  return isLocale(current) ? current : defaultLocale;
}

export function useTranslations(current: string | undefined): Dictionary {
  return dictionaries[getLocale(current)];
}

export type RouteKey = "home" | "about" | "contact";

/**
 * Localized slugs. Spanish keeps the original unprefixed URLs so existing
 * inbound links and search rankings survive; English gets English slugs rather
 * than a `/en/contacto` hybrid.
 *
 * Trailing slashes are deliberate: they match the directory-style paths the
 * static build and @astrojs/sitemap emit, so canonical tags, hreflang and nav
 * links all agree and no internal link costs a redirect hop.
 */
export const routes: Record<Locale, Record<RouteKey, string>> = {
  es: { home: "/", about: "/info/", contact: "/contacto/" },
  en: { home: "/en/", about: "/en/about/", contact: "/en/contact/" },
};

export function localizePath(route: RouteKey, locale: Locale): string {
  return routes[locale][route];
}

/** BCP 47 tags for `hreflang`. */
export const hreflang: Record<Locale, string> = { es: "es", en: "en" };

/** The other locale — used by the language switcher. */
export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
