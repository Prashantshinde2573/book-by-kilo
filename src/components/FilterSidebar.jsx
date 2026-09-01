import { useEffect, useRef, useState } from "react";
import { FiX } from "react-icons/fi";

export const categoryOptions = [
  { label: "All Categories", value: "all" },
  { label: "Fiction Books", value: "fiction" },
  { label: "Non-Fiction", value: "non-fiction" },
  { label: "Children's Books", value: "children-books" },
  { label: "Teen & Young Adult", value: "teen-fiction" },
  { label: "Classic Literature", value: "classic-books" },
  { label: "Coffee Table Books", value: "coffee-table-books" },
  { label: "History & Politics", value: "history" },
  { label: "Business & Leadership", value: "business" },
  { label: "Biography & Memoir", value: "biography" },
];

export const languageOptions = [
  { label: "All Languages", value: "all" },
  { label: "English", value: "english" },
  { label: "Hindi (हिन्दी)", value: "hindi" },
  { label: "Marathi (मराठी)", value: "marathi" },
  { label: "Bengali (বাংলা)", value: "bengali" },
  { label: "Gujarati (ગુજરાતી)", value: "gujarati" },
  { label: "Tamil (தமிழ்)", value: "tamil" },
];

export const collectionOptions = [
  { label: "All Collections", value: "all" },
  { label: "New Arrivals", value: "new-arrivals" },
  { label: "Bestseller Reads", value: "bestsellers" },
  { label: "Brand New Books", value: "new-books" },
  { label: "Vintage & Classics", value: "classics" },
  { label: "Mystery Surprise Stack", value: "surprise-stack" },
  { label: "Bulk & Wholesale", value: "bulk" },
  { label: "Under ₹199 Deals", value: "under-199" },
];

export const authorOptions = [
  { label: "All Authors", value: "all" },
  { label: "James Patterson", value: "James Patterson" },
  { label: "Dan Brown", value: "Dan Brown" },
  { label: "Roald Dahl", value: "Roald Dahl" },
  { label: "Stephen King", value: "Stephen King" },
  { label: "Agatha Christie", value: "Agatha Christie" },
  { label: "Enid Blyton", value: "Enid Blyton" },
  { label: "Ruskin Bond", value: "Ruskin Bond" },
  { label: "J.K. Rowling", value: "J.K. Rowling" },
  { label: "Jeffrey Archer", value: "Jeffrey Archer" },
  { label: "John Grisham", value: "John Grisham" },
];

export const priceLimitOptions = [
  { label: "All Prices", value: "all" },
  { label: "Under ₹199", value: "under-199" },
  { label: "₹200 – ₹349", value: "200-349" },
  { label: "₹350 – ₹499", value: "350-499" },
  { label: "₹500 & Above", value: "500-above" },
];

export const sortOptions = [
  { label: "Recommended", value: "match" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Customer Favorites", value: "rating" },
];

// Helper to normalize category slugs across variations
export function normalizeCategory(val) {
  if (!val || val === "all") return "all";
  const s = String(val).toLowerCase();
  if (s === "children" || s === "children-books" || s === "kids") return "children-books";
  if (s === "teen" || s === "teen-fiction" || s === "young-adult") return "teen-fiction";
  if (s === "classic" || s === "classic-books" || s === "classics") return "classic-books";
  if (s === "collector" || s === "coffee-table-books" || s === "coffee") return "coffee-table-books";
  if (s === "history" || s === "politics" || s === "history-politics") return "history";
  if (s === "business" || s === "economics" || s === "leadership") return "business";
  if (s === "biography" || s === "memoir" || s === "biography-memoir") return "biography";
  if (s === "fiction") return "fiction";
  if (s === "non-fiction" || s === "nonfiction") return "non-fiction";
  return s;
}

// Helper to normalize collection slugs across variations
export function normalizeCollection(val) {
  if (!val || val === "all") return "all";
  const s = String(val).toLowerCase();
  if (s === "new" || s === "new-arrivals" || s === "recently-added" || s === "recent") return "new-arrivals";
  if (s === "brand-new" || s === "brand-new-books" || s === "new-books") return "new-books";
  if (s === "bestseller" || s === "bestsellers" || s === "top10" || s === "top-10-books" || s === "top-10") return "bestsellers";
  if (s === "classic" || s === "classics" || s === "vintage") return "classics";
  if (s === "surprise" || s === "surprise-stack") return "surprise-stack";
  if (s === "bulk" || s === "bulk-books" || s === "books-in-bulk") return "bulk";
  if (s === "under-199" || s === "under199" || s === "budget") return "under-199";
  return s;
}

export default function FilterSidebar({
  categoryFilter = "all",
  setCategoryFilter,
  languageFilter = "all",
  setLanguageFilter,
  collectionFilter = "all",
  setCollectionFilter,
  authorFilter = "all",
  setAuthorFilter,
  priceFilter = "all",
  setPriceFilter,
  sortBy = "match",
  setSortBy,
  onClearAll,
  resultCount,
  mobileOpen,
  onMobileClose,
}) {
  const currentCategory = normalizeCategory(categoryFilter);
  const currentLanguage = String(languageFilter || "all").toLowerCase();
  const currentCollection = String(collectionFilter || "all");
  const currentAuthor = String(authorFilter || "all");
  const currentPrice = String(priceFilter || "all");

  const handleClearAll = () => {
    if (onClearAll) {
      onClearAll();
    } else {
      if (setCategoryFilter) setCategoryFilter("all");
      if (setLanguageFilter) setLanguageFilter("all");
      if (setCollectionFilter) setCollectionFilter("all");
      if (setAuthorFilter) setAuthorFilter("all");
      if (setPriceFilter) setPriceFilter("all");
      if (setSortBy) setSortBy("match");
    }
  };

  const hasActiveFilters =
    currentCategory !== "all" ||
    currentLanguage !== "all" ||
    currentCollection !== "all" ||
    currentAuthor !== "all" ||
    currentPrice !== "all" ||
    sortBy !== "match";

  const sidebarTrackRef = useRef(null);
  const sidebarContentRef = useRef(null);
  const [stickyStyle, setStickyStyle] = useState({
    position: "relative",
    top: "0px",
    bottom: "auto",
    width: "100%",
    left: "auto",
  });

  useEffect(() => {
    let animationFrameId = null;

    const calculateStickyPosition = () => {
      if (typeof window === "undefined" || window.innerWidth <= 900) {
        setStickyStyle({
          position: "relative",
          top: "0px",
          bottom: "auto",
          width: "100%",
          left: "auto",
        });
        return;
      }

      const trackEl = sidebarTrackRef.current;
      const contentEl = sidebarContentRef.current;
      if (!trackEl || !contentEl) return;

      const trackRect = trackEl.getBoundingClientRect();
      const contentHeight = contentEl.offsetHeight;
      const windowHeight = window.innerHeight;
      const bottomGap = 20; // gap from bottom of viewport

      const trackDocTop = trackRect.top + window.scrollY;
      const contentBottomDoc = trackDocTop + contentHeight;
      const viewportBottomDoc = window.scrollY + windowHeight;

      // Has the sidebar top reached/scrolled past the fixed header line (~80px)?
      const isPastHeader = trackRect.top <= 80;
      // Has user scrolled enough that sidebar bottom hits bottom of viewport?
      const hasReachedViewportBottom = viewportBottomDoc >= contentBottomDoc + bottomGap;

      if (!isPastHeader || !hasReachedViewportBottom) {
        // State 1: Normal initial document flow
        setStickyStyle({
          position: "relative",
          top: "0px",
          bottom: "auto",
          width: "100%",
          left: "auto",
        });
      } else if (trackRect.bottom > windowHeight - bottomGap) {
        // State 2: Bottom-Sticky to Viewport
        setStickyStyle({
          position: "fixed",
          top: "auto",
          bottom: `${bottomGap}px`,
          width: `${trackRect.width}px`,
          left: `${trackRect.left}px`,
        });
      } else {
        // State 3: Reached end of parent catalogue container
        setStickyStyle({
          position: "absolute",
          top: "auto",
          bottom: "0px",
          width: "100%",
          left: "0px",
        });
      }
    };

    const handleScrollOrResize = () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(calculateStickyPosition);
    };

    calculateStickyPosition();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [categoryFilter, languageFilter, collectionFilter, authorFilter, priceFilter, sortBy, resultCount]);

  const content = (
    <div className="myntra-filter-inner">
      {/* Top Header: FILTERS & CLEAR ALL */}
      <div className="myntra-filter-header">
        <span className="myntra-filter-title">FILTERS</span>
        {hasActiveFilters && (
          <button type="button" className="myntra-clear-btn" onClick={handleClearAll}>
            CLEAR ALL
          </button>
        )}
      </div>

      {/* Section 1: Languages */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">LANGUAGES</span>
        <div className="myntra-options-list">
          {languageOptions.map((opt) => {
            const isChecked = currentLanguage === opt.value.toLowerCase();
            return (
              <label
                key={opt.value}
                className={`myntra-radio-label ${isChecked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setLanguageFilter) setLanguageFilter(opt.value);
                }}
              >
                <input
                  type="radio"
                  name="filter-language"
                  value={opt.value}
                  checked={isChecked}
                  readOnly
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 2: Categories */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">CATEGORIES</span>
        <div className="myntra-options-list">
          {categoryOptions.map((opt) => {
            const isChecked = currentCategory === opt.value;
            return (
              <label
                key={opt.value}
                className={`myntra-radio-label ${isChecked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setCategoryFilter) setCategoryFilter(opt.value);
                }}
              >
                <input
                  type="radio"
                  name="filter-category"
                  value={opt.value}
                  checked={isChecked}
                  readOnly
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 3: Collections */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">COLLECTIONS</span>
        <div className="myntra-options-list">
          {collectionOptions.map((opt) => {
            const isChecked = currentCollection === opt.value;
            return (
              <label
                key={opt.value}
                className={`myntra-radio-label ${isChecked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setCollectionFilter) setCollectionFilter(opt.value);
                }}
              >
                <input
                  type="radio"
                  name="filter-collection"
                  value={opt.value}
                  checked={isChecked}
                  readOnly
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 4: Authors */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">AUTHORS</span>
        <div className="myntra-options-list">
          {authorOptions.map((opt) => {
            const isChecked = currentAuthor.toLowerCase() === opt.value.toLowerCase();
            return (
              <label
                key={opt.value}
                className={`myntra-radio-label ${isChecked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setAuthorFilter) setAuthorFilter(opt.value);
                }}
              >
                <input
                  type="radio"
                  name="filter-author"
                  value={opt.value}
                  checked={isChecked}
                  readOnly
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 5: Price Limit */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">PRICE LIMIT</span>
        <div className="myntra-options-list">
          {priceLimitOptions.map((opt) => {
            const isChecked = currentPrice === opt.value;
            return (
              <label
                key={opt.value}
                className={`myntra-radio-label ${isChecked ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  if (setPriceFilter) setPriceFilter(opt.value);
                }}
              >
                <input
                  type="radio"
                  name="filter-price"
                  value={opt.value}
                  checked={isChecked}
                  readOnly
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent) */}
      <aside
        ref={sidebarTrackRef}
        className="myntra-filter-sidebar desktop-filter filter-sidebar desktop-filter-sidebar"
        aria-label="Filters"
      >
        <div ref={sidebarContentRef} className="myntra-filter-sticky-wrapper" style={stickyStyle}>
          {content}
        </div>
      </aside>

      {/* Mobile Drawer (Slide-Over) */}
      {mobileOpen && (
        <div className="myntra-mobile-drawer" role="dialog" aria-label="Filter drawer">
          <div className="myntra-drawer-backdrop" onClick={onMobileClose} />
          <div className="myntra-drawer-content">
            <div className="myntra-drawer-top">
              <span className="myntra-drawer-heading">FILTER &amp; SORT</span>
              <button
                type="button"
                className="myntra-drawer-close"
                onClick={onMobileClose}
                aria-label="Close filters"
              >
                <FiX />
              </button>
            </div>
            <div className="myntra-drawer-body">{content}</div>
            <div className="myntra-drawer-footer">
              <button
                type="button"
                className="myntra-apply-btn"
                onClick={onMobileClose}
              >
                APPLY FILTERS {resultCount !== undefined && `(${resultCount})`}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
