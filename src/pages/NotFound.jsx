import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="not-found">
      <div>
        <span>Error 404</span>
        <h1>Page not found.</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <Link className="btn btn-primary" to="/">Go to homepage</Link>
      </div>
    </section>
  );
}
