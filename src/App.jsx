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
import ImageCompress from "./tools/ImageCompress";
import PdfCompress from "./tools/PdfCompress";
import MergePdf from "./tools/MergePdf";
import SplitPdf from "./tools/SplitPdf";
import InvoiceGenerator from "./tools/InvoiceGenerator";
import ExcelToPdf from "./tools/ExcelToPdf";
import PdfToExcel from "./tools/PdfToExcel";
import JpgToPdf from "./tools/JpgToPdf";
import PdfToJpg from "./tools/PdfToJpg";
import TxtToPdf from "./tools/TxtToPdf";
import HtmlToPdf from "./tools/HtmlToPdf";
import ZipToPdf from "./tools/ZipToPdf";
import ProtectPdf from "./tools/ProtectPdf";
import WatermarkPdf from "./tools/WatermarkPdf";
import FlattenPdf from "./tools/FlattenPdf";
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
        {/* Apps, popixhq.com/apps */}
        <Route path="/apps" element={<AppsLayout />}>
          <Route index element={<AppsIndex />} />
          <Route path=":slug" element={<AppLanding />} />
          <Route path=":slug/privacy" element={<AppPrivacy />} />
          <Route path=":slug/terms" element={<AppTerms />} />
        </Route>

        {/* Tools, popixhq.com/tools */}
        <Route path="/tools" element={<ToolsLayout />}>
          <Route index element={<ToolsIndex />} />
          <Route path="pdf-password-remover" element={<PdfUnlock />} />
          <Route path="compress-image" element={<ImageCompress />} />
          <Route path="compress-pdf" element={<PdfCompress />} />
          <Route path="merge-pdf" element={<MergePdf />} />
          <Route path="split-pdf" element={<SplitPdf />} />
          <Route path="invoice-generator" element={<InvoiceGenerator />} />
          <Route path="excel-to-pdf" element={<ExcelToPdf />} />
          <Route path="ods-to-pdf" element={<ExcelToPdf slug="ods-to-pdf" accept=".ods" />} />
          <Route path="pdf-to-excel" element={<PdfToExcel />} />
          <Route path="jpg-to-pdf" element={<JpgToPdf />} />
          <Route path="pdf-to-jpg" element={<PdfToJpg />} />
          <Route path="txt-to-pdf" element={<TxtToPdf />} />
          <Route path="html-to-pdf" element={<HtmlToPdf />} />
          <Route path="zip-to-pdf" element={<ZipToPdf />} />
          <Route path="protect-pdf" element={<ProtectPdf />} />
          <Route path="watermark-pdf" element={<WatermarkPdf />} />
          <Route path="flatten-pdf" element={<FlattenPdf />} />
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
