import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import Company from './pages/Company';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Navigate to="/" replace />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/company" element={<Company />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/projects" element={<Navigate to="/" replace />} />
        <Route path="/projects/:slug" element={<ProductDetail />} />
        <Route path="/services" element={<Navigate to="/about" replace />} />
        <Route path="/services/:slug" element={<Navigate to="/about" replace />} />
        <Route path="/industries" element={<Navigate to="/about" replace />} />
        <Route path="/request-service" element={<Navigate to="/contact" replace />} />
        <Route path="/procurement" element={<Navigate to="/company" replace />} />
        <Route path="/compliance" element={<Navigate to="/company" replace />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
