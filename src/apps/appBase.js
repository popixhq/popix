// The Apps section lives on the apps.* subdomain in production (mounted at
// root), but we also let it run at /apps on localhost for local dev.
// appLink() builds the right path for whichever context we're in.

const host = typeof window !== "undefined" ? window.location.hostname : "";

export const IS_APPS_HOST = host.startsWith("apps.");
export const IS_LOCAL = ["localhost", "127.0.0.1", "0.0.0.0"].includes(host);

// base path the Apps routes are mounted under: "" on the subdomain, "/apps" in dev
export const APP_BASE = IS_APPS_HOST ? "" : "/apps";

// link to the apps index, or to a specific app when a slug is given
export const appLink = (slug) => (slug ? `${APP_BASE}/${slug}` : APP_BASE || "/");

// absolute URL back to the main agency site
export const MAIN_SITE_URL = IS_LOCAL ? "/" : "https://popixhq.com";
