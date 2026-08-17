import { Link, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Insights from './pages/Insights';
import InsightDetail from './pages/InsightDetail';

function PlaceholderPage({ title }) {
  return (
    <section className="section">
      <div className="container">
        <h1>{title}</h1>
        <p>This page is being prepared.</p>
        <Link className="text-link" to="/">Back to home</Link>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<PlaceholderPage title="About ENASH" />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<PlaceholderPage title="Developed systems" />} />
        <Route path="/projects/:slug" element={<PlaceholderPage title="Project details" />} />
        <Route path="/industries" element={<PlaceholderPage title="Industries" />} />
        <Route path="/procurement" element={<PlaceholderPage title="Procurement" />} />
        <Route path="/compliance" element={<PlaceholderPage title="Compliance documents" />} />
        <Route path="/request-service" element={<PlaceholderPage title="Start a project" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact" />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/insights/:slug" element={<InsightDetail />} />
        <Route path="/faq" element={<PlaceholderPage title="Frequently asked questions" />} />
        <Route path="/privacy" element={<PlaceholderPage title="Privacy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms" />} />
        <Route path="*" element={<PlaceholderPage title="Page not found" />} />
      </Route>
    </Routes>
  );
}
