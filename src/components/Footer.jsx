import { Link } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer vsco-footer">
      <div className="vsco-footer-container">
        
        {/* Top Section: Tagline + 3 Navigation Columns */}
        <div className="vsco-footer-top">
          
          {/* Large Bold Tagline */}
          <div className="vsco-tagline-col">
            <h2 className="vsco-tagline">
              READ MORE<br />
              SPEND LESS
            </h2>
          </div>

          {/* 3 Navigation Columns: Categories, Collections, Company */}
          <div className="vsco-nav-grid only-three-cols">
            
            {/* Column 1: Categories */}
            <div className="vsco-nav-col">
              <h3 className="vsco-col-title">CATEGORIES</h3>
              <ul className="vsco-link-list">
                <li><Link to="/category/fiction">Fiction Books</Link></li>
                <li><Link to="/category/non-fiction">Non-Fiction</Link></li>
                <li><Link to="/category/children-books">Children's Books</Link></li>
                <li><Link to="/category/teen-fiction">Teen Fiction</Link></li>
                <li><Link to="/category/coffee-table-books">Coffee Table Books</Link></li>
                <li><Link to="/catalogue">Explore All Categories</Link></li>
              </ul>
            </div>

            {/* Column 2: Collections */}
            <div className="vsco-nav-col">
              <h3 className="vsco-col-title">COLLECTIONS</h3>
              <ul className="vsco-link-list">
                <li><Link to="/catalogue">All Books by Kilo</Link></li>
                <li><Link to="/collection/bestsellers">Bestseller Stacks</Link></li>
                <li><Link to="/collection/new-books">Brand New Books</Link></li>
                <li><Link to="/surprise-stack">Mystery Surprise Stack</Link></li>
                <li><Link to="/bulk-purchase">Bulk &amp; Wholesale</Link></li>
                <li><Link to="/collection/classics">Classic &amp; Vintage</Link></li>
              </ul>
            </div>

            {/* Column 3: Company */}
            <div className="vsco-nav-col">
              <h3 className="vsco-col-title">COMPANY</h3>
              <ul className="vsco-link-list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/faq">Help &amp; FAQs</Link></li>
                <li><Link to="/contact">Contact Support</Link></li>
                <li><Link to="/bulk-purchase">Bulk Inquiries</Link></li>
                <li><Link to="/faq">Shipping &amp; Policies</Link></li>
              </ul>
            </div>

          </div>

        </div>

        {/* Middle Section: Logo + Action Pill Buttons */}
        <div className="vsco-footer-middle">
          <Link to="/" className="vsco-brand-link" aria-label="Books by Kilo Home">
            <img src="/brand/logo.png" alt="Books by Kilo" className="vsco-logo-img" />
            <span className="vsco-brand-name">booksbykilo</span>
          </Link>

          <div className="vsco-cta-actions">
            <Link to="/surprise-stack" className="vsco-pill-btn vsco-pill-outline">
              SURPRISE STACK
            </Link>
            <Link to="/catalogue" className="vsco-pill-btn vsco-pill-solid">
              SHOP BY KILO
            </Link>
          </div>
        </div>

        {/* Subtle Divider Line */}
        <div className="vsco-footer-divider" aria-hidden="true"></div>

        {/* Bottom Section: Locale + Active Page Links + Copyright */}
        <div className="vsco-footer-bottom">
          <div className="vsco-bottom-left">
            <div className="vsco-locale-selector">
              <span>English</span>
              <FiChevronDown size={14} className="vsco-chevron" />
            </div>
            
            <div className="vsco-legal-links">
              <Link to="/about">About Us</Link>
              <Link to="/faq">FAQs &amp; Policies</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/bulk-purchase">Bulk Purchase</Link>
            </div>
          </div>

          <div className="vsco-bottom-right">
            <p className="vsco-copyright">
              Copyright © 2026 BooksByKilo. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
