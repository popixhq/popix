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
import CaseStudiesIndex from "./pages/CaseStudiesIndex";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

import AppsLayout from "./apps/AppsLayout";
import AppsIndex from "./apps/AppsIndex";
import AppLanding from "./apps/AppLanding";
import AppPrivacy from "./apps/AppPrivacy";
import { IS_APPS_HOST, IS_LOCAL } from "./apps/appBase";

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

// On the main domain, /apps/* now lives on the subdomain, send visitors there.
function AppsRedirect() {
  useEffect(() => {
    const rest = window.location.pathname.replace(/^\/apps/, "") || "/";
    window.location.replace("https://apps.popixhq.com" + rest + window.location.search);
  }, []);
  return <div className="min-h-[60vh]" />;
}

// apps.popixhq.com → the Apps section mounted at the root.
function AppsSite() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<AppsLayout />}>
          <Route index element={<AppsIndex />} />
          <Route path=":slug" element={<AppLanding />} />
          <Route path=":slug/privacy" element={<AppPrivacy />} />
          <Route path="*" element={<AppsIndex />} />
        </Route>
      </Routes>
    </>
  );
}

// popixhq.com → the agency site (with /apps redirecting to the subdomain,
// except on localhost where we mount it at /apps for local development).
function MainSite() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {IS_LOCAL ? (
          <Route path="/apps" element={<AppsLayout />}>
            <Route index element={<AppsIndex />} />
            <Route path=":slug" element={<AppLanding />} />
            <Route path=":slug/privacy" element={<AppPrivacy />} />
          </Route>
        ) : (
          <>
            <Route path="/apps" element={<AppsRedirect />} />
            <Route path="/apps/*" element={<AppsRedirect />} />
          </>
        )}

        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesIndex />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/industries" element={<IndustriesIndex />} />
          <Route path="/industries/:slug" element={<IndustryDetail />} />
          <Route path="/locations/:slug" element={<LocationDetail />} />
          <Route path="/case-studies" element={<CaseStudiesIndex />} />
          <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return IS_APPS_HOST ? <AppsSite /> : <MainSite />;
}
