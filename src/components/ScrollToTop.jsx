import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Remembers scroll position per history entry. On a back/forward navigation
// (POP) it restores where you were; on a new navigation (PUSH) it goes to top.
const positions = new Map();

if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
  window.history.scrollRestoration = "manual";
}

export default function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();

  // Save the scroll position of the page we are leaving.
  useEffect(() => {
    return () => {
      positions.set(location.key, window.scrollY);
    };
  }, [location.key]);

  // On arrival: restore (back/forward) or reset to top (new navigation).
  useEffect(() => {
    if (navType === "POP") {
      const y = positions.get(location.key);
      window.scrollTo(0, y ?? 0);
    } else {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  return null;
}
