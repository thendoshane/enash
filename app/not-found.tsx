import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
  return <><Header /><main className="subpage-hero"><div className="container narrow"><div className="eyebrow">404</div><h1>That page does not exist.</h1><p className="hero-copy">Use the main navigation or return to the ENASH homepage.</p><div className="actions"><a className="btn btn-dark" href="/">Back to ENASH</a></div></div></main><Footer /></>;
}
