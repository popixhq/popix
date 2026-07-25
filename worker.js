// Edge routing for the popix Worker.
// SEO consolidation: the apps/tools subdomains 301-redirect to their canonical
// subdirectories on the main domain. Everything else serves the static site
// (with SPA deep-link fallback via the ASSETS binding).
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const sub =
      url.hostname === "apps.popixhq.com"
        ? "/apps"
        : url.hostname === "tools.popixhq.com"
          ? "/tools"
          : null;

    if (sub) {
      const path = url.pathname === "/" ? "" : url.pathname;
      return Response.redirect("https://popixhq.com" + sub + path + url.search, 301);
    }

    return env.ASSETS.fetch(request);
  },
};
