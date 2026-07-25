import { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import ServicesIndex from "./pages/ServicesIndex";
import ServiceDetail from "./pages/ServiceDetail";
import IndustriesIndex from "./pages/IndustriesIndex";
import IndustryDetail from "./pages/IndustryDetail";
import LocationDetail from "./pages/LocationDetail";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AppsLayout from "./apps/AppsLayout";
import AppsIndex from "./apps/AppsIndex";
import AppLanding from "./apps/AppLanding";
import AppPrivacy from "./apps/AppPrivacy";
import AppTerms from "./apps/AppTerms";
import { IS_APPS_HOST } from "./apps/appBase";

import ToolsLayout from "./tools/ToolsLayout";
import ToolsIndex from "./tools/ToolsIndex";
import PdfUnlock from "./tools/PdfUnlock";
import { IS_TOOLS_HOST } from "./tools/toolsBase";

// Dark agency layout (default site)
function SiteLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

// The apps/tools content now lives in subdirectories on the main domain. The
// old subdomains redirect to them (a Cloudflare edge 301 does this in prod;
// this is a client-side fallback).
function HostRedirect({ base }) {
  useEffect(() => {
    const rest = window.location.pathname === "/" ? "" : window.location.pathname;
    window.location.replace("https://popixhq.com" + base + rest + window.location.search);
  }, [base]);
  return null;
}

function MainSite() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Apps — popixhq.com/apps */}
        <Route path="/apps" element={<AppsLayout />}>
          <Route index element={<AppsIndex />} />
          <Route path=":slug" element={<AppLanding />} />
          <Route path=":slug/privacy" element={<AppPrivacy />} />
          <Route path=":slug/terms" element={<AppTerms />} />
        </Route>

        {/* Tools — popixhq.com/tools */}
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsIndex />} />
          <Route path="pdf-password-remover" element={<PdfUnlock />} />
        </Route>

        {/* Agency site */}
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/industries" element={<IndustriesIndex />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/locations/:slug" element={<LocationDetail />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  if (IS_APPS_HOST) return <HostRedirect base="/apps" />;
  if (IS_TOOLS_HOST) return <HostRedirect base="/tools" />;
  return <MainSite />;
}
