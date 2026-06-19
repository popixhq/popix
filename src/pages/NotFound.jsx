import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page wandered off."
      sub="The link may be broken or the page may have moved. Let's get you back on track."
    >
      <div className="flex flex-wrap gap-3">
        <Link to="/" className="btn-primary">
          Back home
        </Link>
        <Link to="/services" className="btn-ghost">
          Browse services
        </Link>
      </div>
    </PageHero>
  );
}
