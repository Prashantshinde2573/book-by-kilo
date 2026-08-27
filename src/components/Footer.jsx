import { Link } from "react-router-dom";
import { FiInstagram, FiYoutube, FiLinkedin, FiMessageCircle, FiMapPin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-row">
        <div className="footer-left-col">
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram size={19} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube size={19} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={19} /></a>
            <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FiMessageCircle size={19} /></a>
          </div>

          <a href="mailto:support@booksbykilo.in" className="footer-contact-email">support@booksbykilo.in</a>

          <div className="footer-address">
            <div className="footer-address-item">
              <span className="footer-addr-icon" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4M5 21V10.85M19 21V10.85M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
                </svg>
              </span>
              <div className="footer-addr-text">
                <span className="footer-addr-title">Books by Kilo HQ</span>
                <span className="footer-addr-sub">Authentic pre-loved books</span>
              </div>
            </div>

            <div className="footer-address-item">
              <span className="footer-addr-icon" aria-hidden="true">
                <FiMapPin size={18} />
              </span>
              <div className="footer-addr-text">
                <span className="footer-addr-sub footer-addr-location">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-right-col">
          <div className="footer-nav-columns">
            <div className="footer-nav-group">
              <div className="footer-nav-header">
                <span className="footer-nav-title">Quick Links</span>
                <span className="footer-title-bar" aria-hidden="true"></span>
              </div>
              <nav className="footer-vertical-nav">
                <Link to="/">Home</Link>
                <Link to="/catalogue">All Books</Link>
                <Link to="/catalogue?sort=match">Bestsellers</Link>
                <Link to="/catalogue?tier=new">New Arrivals</Link>
              </nav>
            </div>

            <div className="footer-nav-group">
              <div className="footer-nav-header">
                <span className="footer-nav-title">Collections</span>
                <span className="footer-title-bar" aria-hidden="true"></span>
              </div>
              <nav className="footer-vertical-nav">
                <Link to="/catalogue">Categories</Link>
                <Link to="/category/surprise-stack">Surprise Stack</Link>
                <Link to="/bulk-purchase">Bulk Purchase</Link>
                <Link to="/catalogue?q=set">Box Sets</Link>
              </nav>
            </div>

            <div className="footer-nav-group">
              <div className="footer-nav-header">
                <span className="footer-nav-title">Account</span>
                <span className="footer-title-bar" aria-hidden="true"></span>
              </div>
              <nav className="footer-vertical-nav">
                <Link to="/wishlist">My Wishlist</Link>
                <Link to="/cart">Shopping Cart</Link>
                <Link to="/login">Sign In</Link>
                <Link to="/faq">Help &amp; FAQs</Link>
              </nav>
            </div>

            <div className="footer-nav-group">
              <div className="footer-nav-header">
                <span className="footer-nav-title">Company</span>
                <span className="footer-title-bar" aria-hidden="true"></span>
              </div>
              <nav className="footer-vertical-nav">
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact Us</Link>
                <Link to="/terms">Terms of Service</Link>
                <Link to="/privacy">Privacy Policy</Link>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-row">
        <div className="footer-bottom-col left">
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
        <div className="footer-bottom-divider" aria-hidden="true"></div>
        <div className="footer-bottom-col center">
          <span className="footer-copyright">© 2026 Books by Kilo. All Rights Reserved.</span>
        </div>
        <div className="footer-bottom-divider" aria-hidden="true"></div>
        <div className="footer-bottom-col right">
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </div>

      <div className="footer-bg-typography" aria-hidden="true">booksbykilo</div>
    </footer>
  );
}
