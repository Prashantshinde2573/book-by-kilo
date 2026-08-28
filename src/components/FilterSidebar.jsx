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

export const collectionOptions = [
  { label: "All Collections", value: "all" },
  { label: "Bestseller Reads", value: "bestsellers" },
  { label: "Brand New Books", value: "new-books" },
  { label: "Vintage & Classics", value: "classics" },
  { label: "Mystery Surprise Stack", value: "surprise-stack" },
  { label: "Bulk & Wholesale", value: "bulk" },
  { label: "Under ₹199 Deals", value: "under-199" },
];

export const authorOptions = [
  { label: "All Authors", value: "all" },
  { label: "J.K. Rowling", value: "J.K. Rowling" },
  { label: "Agatha Christie", value: "Agatha Christie" },
  { label: "Stephen King", value: "Stephen King" },
  { label: "Roald Dahl", value: "Roald Dahl" },
  { label: "Enid Blyton", value: "Enid Blyton" },
  { label: "Ruskin Bond", value: "Ruskin Bond" },
  { label: "Dan Brown", value: "Dan Brown" },
  { label: "William Shakespeare", value: "William Shakespeare" },
  { label: "Julian Barnes", value: "Julian Barnes" },
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
  if (s === "children" || s === "children-books") return "children-books";
  if (s === "classic" || s === "classic-books") return "classic-books";
  if (s === "collector" || s === "coffee-table-books") return "coffee-table-books";
  return s;
}

export default function FilterSidebar({
  categoryFilter = "all",
  setCategoryFilter,
  collectionFilter = "all",
  setCollectionFilter,
  authorFilter = "all",
  setAuthorFilter,
  priceFilter = "all",
  setPriceFilter,
  sortBy = "match",
  setSortBy,
  resultCount,
  mobileOpen,
  onMobileClose,
}) {
  const currentCategory = normalizeCategory(categoryFilter);
  const currentCollection = String(collectionFilter || "all");
  const currentAuthor = String(authorFilter || "all");
  const currentPrice = String(priceFilter || "all");

  const handleClearAll = () => {
    if (setCategoryFilter) setCategoryFilter("all");
    if (setCollectionFilter) setCollectionFilter("all");
    if (setAuthorFilter) setAuthorFilter("all");
    if (setPriceFilter) setPriceFilter("all");
    if (setSortBy) setSortBy("match");
  };

  const hasActiveFilters =
    currentCategory !== "all" ||
    currentCollection !== "all" ||
    currentAuthor !== "all" ||
    currentPrice !== "all" ||
    sortBy !== "match";

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

      {/* Section 1: Categories */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">CATEGORIES</span>
        <div className="myntra-options-list">
          {categoryOptions.map((opt) => {
            const isChecked = currentCategory === opt.value;
            return (
              <label key={opt.value} className={`myntra-radio-label ${isChecked ? "active" : ""}`}>
                <input
                  type="radio"
                  name="filter-category"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => setCategoryFilter && setCategoryFilter(opt.value)}
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 2: Collections */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">COLLECTIONS</span>
        <div className="myntra-options-list">
          {collectionOptions.map((opt) => {
            const isChecked = currentCollection === opt.value;
            return (
              <label key={opt.value} className={`myntra-radio-label ${isChecked ? "active" : ""}`}>
                <input
                  type="radio"
                  name="filter-collection"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => setCollectionFilter && setCollectionFilter(opt.value)}
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 3: Authors */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">AUTHORS</span>
        <div className="myntra-options-list">
          {authorOptions.map((opt) => {
            const isChecked = currentAuthor.toLowerCase() === opt.value.toLowerCase();
            return (
              <label key={opt.value} className={`myntra-radio-label ${isChecked ? "active" : ""}`}>
                <input
                  type="radio"
                  name="filter-author"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => setAuthorFilter && setAuthorFilter(opt.value)}
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Section 4: Price Limit */}
      <div className="myntra-filter-section">
        <span className="myntra-section-heading">PRICE LIMIT</span>
        <div className="myntra-options-list">
          {priceLimitOptions.map((opt) => {
            const isChecked = currentPrice === opt.value;
            return (
              <label key={opt.value} className={`myntra-radio-label ${isChecked ? "active" : ""}`}>
                <input
                  type="radio"
                  name="filter-price"
                  value={opt.value}
                  checked={isChecked}
                  onChange={() => setPriceFilter && setPriceFilter(opt.value)}
                />
                <span className="myntra-custom-radio" />
                <span className="myntra-option-text">{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Bottom Status */}
      {typeof resultCount === "number" && (
        <div className="myntra-filter-footer">
          <span className="myntra-count-text">{resultCount} books available</span>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="filter-sidebar desktop-filter-sidebar myntra-desktop-sidebar">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="filter-mobile-overlay" onClick={onMobileClose}>
          <div className="filter-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <strong>FILTERS</strong>
              <button type="button" onClick={onMobileClose} aria-label="Close filters">
                <FiX />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
