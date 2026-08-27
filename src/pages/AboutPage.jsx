import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

export default function AboutPage() {
  useEffect(() => { document.title = "About Us | Books By Kilo"; }, []);
  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">OUR STORY</span>
        <h1 className="catalog-title">About Books By Kilo</h1>
        <p className="catalog-description">India's most loved pre-loved books store.</p>
      </div>
      <div className="static-page-content">
        <div className="static-section">
          <h2>Who We Are</h2>
          <p>Books By Kilo is India's premier destination for quality-checked pre-loved books sold by weight. Based in Mumbai, we've helped over 50,000 book lovers find their next great read at unbeatable prices.</p>
          <p>We believe every book deserves a second life, and every reader deserves access to great literature without breaking the bank.</p>
        </div>
        <div className="static-section">
          <h2>Our Promise</h2>
          <div className="pdp-guarantee-grid" style={{ maxWidth: "600px" }}>
            <div><FiCheck /> 100% Quality Checked</div>
            <div><FiCheck /> Authentic Editions Only</div>
            <div><FiCheck /> Fast Pan-India Delivery</div>
            <div><FiCheck /> 7-Day Easy Replacement</div>
            <div><FiCheck /> Rated 4.8/5 on Google</div>
            <div><FiCheck /> 50,000+ Happy Readers</div>
          </div>
        </div>
        <div className="static-section">
          <Link to="/catalogue" className="cta" style={{ display: "inline-flex" }}>Browse All Books</Link>
        </div>
      </div>
    </div>
  );
}
