import { Link } from "react-router-dom";
import { FiInstagram, FiYoutube, FiLinkedin, FiMessageCircle } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top-row">
        <div className="footer-left-col">
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram size={20} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube size={20} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
            <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FiMessageCircle size={20} /></a>
          </div>
          <a href="mailto:support@booksbykilo.in" className="footer-contact-email">support@booksbykilo.in</a>
          <div className="footer-address">
            <span>Books by Kilo HQ</span>
            <span>Authentic pre-loved books</span>
            <span>Mumbai, Maharashtra, India</span>
          </div>
        </div>

        <div className="footer-right-col">
          <nav className="footer-vertical-nav">
            <Link to="/">Home</Link>
            <Link to="/catalogue">All Books</Link>
            <Link to="/catalogue">Categories</Link>
            <Link to="/category/surprise-stack">Surprise Stack</Link>
            <Link to="/bulk-purchase">Bulk Books</Link>
            <Link to="/catalogue?sort=match">Bestsellers</Link>
            <Link to="/wishlist">My Wishlist</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
          </nav>
        </div>
      </div>

      <div className="footer-bottom-row">
        <Link to="/terms">Terms &amp; Conditions</Link>
        <span className="footer-copyright">© 2026 Books by Kilo. All Rights Reserved.</span>
        <Link to="/privacy">Privacy Policy</Link>
      </div>

      <div className="footer-bg-typography" aria-hidden="true">booksbykilo</div>
    </footer>
  );
}
