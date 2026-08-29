import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiChevronDown, FiChevronRight, FiMenu, FiSearch,
  FiShoppingCart, FiUser, FiX, FiHeart, FiBook,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";

const megaCategories = [
  { title: "Top 10 Books", image: "/books/pokemon.jpg", path: "/collection/bestsellers" },
  { title: "Explore by Genre", image: "/books/alice.jpg", path: "/catalogue" },
  { title: "Recently Added Books", image: "/books/when-it-snows.jpg", path: "/collection/new-arrivals" },
  { title: "Brand New Books", image: "/books/timetime.jpg", path: "/collection/new-books" },
  { title: "Bestsellers", image: "/books/king-lear.jpg", path: "/collection/bestsellers" },
  { title: "Children Books", image: "/brand/children.webp", path: "/category/children-books" },
  { title: "Teen Fiction", image: "/books/keira.jpg", path: "/category/teen-fiction" },
  { title: "Fiction Books", image: "/brand/non-fiction.webp", path: "/category/fiction" },
  { title: "Non-Fiction", image: "/brand/non-fiction.webp", path: "/category/non-fiction" },
  { title: "Extra Discount Sale", image: "/books/umbrella-tree.jpg", path: "/collection/under-199" },
  { title: "Coffee Table Books", image: "/books/dinosaurs.jpg", path: "/category/coffee-table-books" },
  { title: "Surprise Stack", image: "/brand/surprise_banner.jpg", path: "/surprise-stack" },
];

export default function Header() {
  const { cartCount, setCartOpen, list, notify } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileCatOpen, setMobileCatOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const megaTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setMegaOpen(false);
    setMobileCatOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  const handleMegaEnter = () => {
    if (window.innerWidth <= 850) return;
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    if (window.innerWidth <= 850) return;
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    megaTimerRef.current = window.setTimeout(() => setMegaOpen(false), 200);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchVal.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchVal.trim())}`);
      setMenuOpen(false);
      setSearchVal("");
    }
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <header className="topbar">
      <Link to="/" className="brand text-brand" aria-label="Books by Kilo home">
        <img src="/brand/logo.png" alt="Books by Kilo" className="site-logo-img" />
      </Link>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <nav className={menuOpen ? "open" : ""}>
        {/* Mobile-only Search Bar at top of drawer */}
        <div className="mobile-nav-search">
          <FiSearch className="mobile-search-icon" />
          <input
            type="search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
            placeholder="Search title, author, genre..."
            aria-label="Search mobile"
          />
          <button type="button" className="mobile-search-submit" onClick={handleSearch}>
            Go
          </button>
        </div>

        <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/catalogue" className={isActive("/catalogue") ? "active" : ""} onClick={() => setMenuOpen(false)}>
          All Books
        </Link>

        {/* Desktop Mega Dropdown item */}
        <div className="mega-nav-item" onMouseEnter={handleMegaEnter} onMouseLeave={handleMegaLeave}>
          {!menuOpen && (
            <Link
              to="/catalogue"
              className={`mega-trigger desktop-only-trigger ${isActive("/category") || megaOpen ? "active" : ""}`}
              onClick={(e) => { e.preventDefault(); navigate("/catalogue"); setMenuOpen(false); }}
            >
              Categories <FiChevronDown className="mega-caret" />
            </Link>
          )}

          {/* Mobile Accordion Toggle Button */}
          <button
            type="button"
            className="mobile-cat-toggle"
            onClick={() => setMobileCatOpen(!mobileCatOpen)}
          >
            <span>Categories</span>
            <FiChevronDown className={`mega-caret ${mobileCatOpen ? "rotate" : ""}`} />
          </button>

          {/* Desktop Mega Dropdown Menu */}
          {megaOpen && (
            <div className="mega-dropdown">
              <div className="mega-container">
                <div className="mega-left-banner">
                  <span className="mega-badge"><FaFire /> PRE-LOVED BARGAINS</span>
                  <h3>Featured Collections</h3>
                  <p>Quality-checked pre-loved books at unbelievable prices. Shop by collection, genre or author!</p>
                  <button className="mega-featured-btn" onClick={() => { navigate("/catalogue"); setMegaOpen(false); }}>
                    Browse All Books <FiChevronRight />
                  </button>
                </div>

                <div className="mega-right-grid">
                  <span className="mega-grid-title">EXPLORE CATEGORIES &amp; SECTIONS</span>
                  <div className="mega-category-grid">
                    {megaCategories.map((cat) => (
                      <Link
                        key={cat.title}
                        to={cat.path}
                        className="mega-category-card"
                        onClick={() => setMegaOpen(false)}
                      >
                        <img className="mega-cat-img" src={cat.image} alt={cat.title} />
                        <span className="mega-cat-title">{cat.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Accordion Expanded List */}
          {mobileCatOpen && (
            <div className="mobile-categories-drawer-list">
              {megaCategories.map((cat) => (
                <Link
                  key={cat.title}
                  to={cat.path}
                  className="mobile-cat-link"
                  onClick={() => { setMenuOpen(false); setMobileCatOpen(false); }}
                >
                  <span>{cat.title}</span>
                  <FiChevronRight size={14} />
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link to="/collection/new-arrivals" onClick={() => setMenuOpen(false)}>
          New Arrivals
        </Link>
        <Link to="/collection/bestsellers" onClick={() => setMenuOpen(false)}>
          Bestsellers
        </Link>
        <Link to="/bulk-purchase" className={isActive("/bulk-purchase") ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Bulk Books
        </Link>
        <Link to="/surprise-stack" className={isActive("/surprise-stack") ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Surprise Stack
        </Link>

        {/* Mobile Drawer Footer Actions */}
        <div className="mobile-nav-footer">
          <Link to="/wishlist" className="mobile-footer-link" onClick={() => setMenuOpen(false)}>
            <FiHeart style={{ marginRight: "8px" }} /> My Wishlist ({list.length})
          </Link>
          <Link to="/cart" className="mobile-footer-link" onClick={() => setMenuOpen(false)}>
            <FiShoppingCart style={{ marginRight: "8px" }} /> View Cart ({cartCount})
          </Link>
        </div>
      </nav>

      <div className="header-actions">
        <form className="search-field-pill desktop-search" onSubmit={handleSearch}>
          <span className="search-icon-inside"><FiSearch /></span>
          <input
            type="search"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Search title, author..."
            aria-label="Search title, author"
          />
        </form>

        <button className="cart-btn-trigger" onClick={() => setCartOpen(true)} aria-label="Open shopping cart">
          <FiShoppingCart />
          <span className="cart-label-text">Cart</span>
          {cartCount > 0 && <b className="cart-count-pill">{cartCount}</b>}
        </button>

        <div style={{ position: "relative" }}>
          <button className="account-button" onClick={() => setProfileOpen(!profileOpen)} aria-label="User account">
            <FiUser />
          </button>
          {profileOpen && (
            <div className="profile-dropdown">
              <div className="profile-user-info">
                <strong>Guest Reader</strong>
                <small>reader@booksbykilo.in</small>
              </div>
              <hr />
              <button onClick={() => { navigate("/wishlist"); setProfileOpen(false); }}>My Wishlist ({list.length})</button>
              <button onClick={() => { navigate("/cart"); setProfileOpen(false); }}>My Cart</button>
              <button onClick={() => { navigate("/login"); setProfileOpen(false); }}>Sign In</button>
              <button className="signout-btn" onClick={() => { notify("Signed out"); setProfileOpen(false); }}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
