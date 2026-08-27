import { FiX } from "react-icons/fi";

const genreOptions = [
  { label: "All Genres", value: "all" },
  { label: "Fiction", value: "fiction" },
  { label: "Non-Fiction", value: "non-fiction" },
  { label: "Children", value: "children" },
  { label: "Teen Fiction", value: "teen-fiction" },
  { label: "Classic Books", value: "classic" },
  { label: "Collector / Coffee Table", value: "collector" },
  { label: "History", value: "history" },
  { label: "Business", value: "business" },
  { label: "Biography", value: "biography" },
];

const tierOptions = [
  { label: "All Prices", value: "all" },
  { label: "Standard (₹299/kg)", value: "standard" },
  { label: "Classic (₹399/kg)", value: "classic" },
  { label: "Premium (₹499/kg)", value: "premium" },
  { label: "Brand New", value: "new" },
];

const sortOptions = [
  { label: "Most Relevant", value: "match" },
  { label: "Price: Low to High", value: "price-low" },
  { label: "Price: High to Low", value: "price-high" },
  { label: "Heaviest First", value: "weight" },
];

export default function FilterSidebar({
  categoryFilter, setCategoryFilter,
  tierFilter, setTierFilter,
  sortBy, setSortBy,
  resultCount,
  mobileOpen, onMobileClose,
}) {
  const content = (
    <div className="filter-sidebar-inner">
      <div className="filter-sidebar-section">
        <div className="filter-sidebar-heading">Sort By</div>
        {sortOptions.map((opt) => (
          <label key={opt.value} className={`filter-radio-label ${sortBy === opt.value ? "active" : ""}`}>
            <input type="radio" name="sort" value={opt.value} checked={sortBy === opt.value} onChange={() => setSortBy(opt.value)} />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="filter-sidebar-section">
        <div className="filter-sidebar-heading">Genre</div>
        {genreOptions.map((opt) => (
          <label key={opt.value} className={`filter-radio-label ${categoryFilter === opt.value ? "active" : ""}`}>
            <input type="radio" name="genre" value={opt.value} checked={categoryFilter === opt.value} onChange={() => setCategoryFilter(opt.value)} />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="filter-sidebar-section">
        <div className="filter-sidebar-heading">Pricing Tier</div>
        {tierOptions.map((opt) => (
          <label key={opt.value} className={`filter-radio-label ${tierFilter === opt.value ? "active" : ""}`}>
            <input type="radio" name="tier" value={opt.value} checked={tierFilter === opt.value} onChange={() => setTierFilter(opt.value)} />
            {opt.label}
          </label>
        ))}
      </div>

      <div className="filter-sidebar-footer">
        <span>{resultCount} books</span>
        <button onClick={() => { setCategoryFilter("all"); setTierFilter("all"); setSortBy("match"); }}>Clear Filters</button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="filter-sidebar desktop-filter-sidebar">
        {content}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="filter-mobile-overlay" onClick={onMobileClose}>
          <div className="filter-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="filter-drawer-header">
              <strong>Filters</strong>
              <button onClick={onMobileClose} aria-label="Close filters"><FiX /></button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
