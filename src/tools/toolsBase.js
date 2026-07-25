// The Tools section lives on the tools.* subdomain in production (mounted at
// root), and at /tools on localhost for local dev. toolLink() builds the right
// path for whichever context we're in.

const host = typeof window !== "undefined" ? window.location.hostname : "";

export const IS_TOOLS_HOST = host.startsWith("tools.");
export const IS_LOCAL = ["localhost", "127.0.0.1", "0.0.0.0"].includes(host);

export const TOOL_BASE = IS_TOOLS_HOST ? "" : "/tools";

// link to the tools hub, or to a specific tool when a slug is given
export const toolLink = (slug) => (slug ? `${TOOL_BASE}/${slug}` : TOOL_BASE || "/");

export const MAIN_SITE_URL = IS_LOCAL ? "/" : "https://popixhq.com";
