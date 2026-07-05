import { useEffect } from "react";

// Sets per-page SEO (title, meta description, Open Graph, canonical, JSON-LD) for a SPA route,
// and restores the previous title / removes injected tags on unmount. Googlebot renders JS, so
// tags set here are picked up when it crawls the page.
function upsertMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  let created = false;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
    created = true;
  }
  el.setAttribute("content", content);
  return { el, created };
}

export function useAppSeo({ title, description, url, image, jsonLd }) {
  useEffect(() => {
    const prevTitle = document.title;
    const managed = [];

    if (title) document.title = title;

    const set = (attr, key, content) => {
      if (content) managed.push(upsertMeta(attr, key, content));
    };
    set("name", "description", description);
    set("property", "og:title", title);
    set("property", "og:description", description);
    set("property", "og:type", "website");
    set("property", "og:url", url);
    set("property", "og:image", image);
    set("name", "twitter:card", image ? "summary_large_image" : "summary");
    set("name", "twitter:title", title);
    set("name", "twitter:description", description);

    let canonical = null;
    let canonicalCreated = false;
    if (url) {
      canonical = document.head.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
        canonicalCreated = true;
      }
      canonical.setAttribute("href", url);
    }

    let script = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      managed.forEach(({ el, created }) => {
        if (created) el.remove();
      });
      if (canonicalCreated && canonical) canonical.remove();
      if (script) script.remove();
    };
  }, [title, description, url, image, JSON.stringify(jsonLd)]);
}
