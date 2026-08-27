import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiSearch } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

const PAGE_SIZE = 48;

export default function CataloguePage({ allBooks }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sortParam = searchParams.get("sort") || "match";
  const tierParam = searchParams.get("tier") || "all";
  const catParam = searchParams.get("category") || "all";
  const qParam = searchParams.get("q") || "";
  const [localQ, setLocalQ] = useState(qParam);

  const setSortBy = (v) => { setSearchParams((p) => { p.set("sort", v); return p; }); setPage(1); };
  const setTierFilter = (v) => { setSearchParams((p) => { p.set("tier", v); return p; }); setPage(1); };
  const setCategoryFilter = (v) => { setSearchParams((p) => { p.set("category", v); return p; }); setPage(1); };

  useEffect(() => { document.title = "All Books | Books By Kilo"; }, []);

  const filtered = useMemo(() => {
    const val = qParam.trim().toLowerCase();
    const result = allBooks.filter((b) => {
      const searchMatch = !val || [b.title, b.author, b.genre, b.tier, b.publisher, b.language, ...(b.categories || [])].some((f) => String(f || "").toLowerCase().includes(val));
      const catMatch = catParam === "all" || b.categories?.includes(catParam) || b.genre?.toLowerCase().includes(catParam);
      const tierMatch = tierParam === "all" || b.tier?.toLowerCase() === tierParam;
      return searchMatch && catMatch && tierMatch;
    });
    return [...result].sort((a, b) =>
      sortParam === "price-low" ? a.salePrice - b.salePrice :
      sortParam === "price-high" ? b.salePrice - a.salePrice :
      sortParam === "weight" ? b.weight - a.weight :
      b.match - a.match
    );
  }, [allBooks, qParam, catParam, tierParam, sortParam]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams((p) => { if (localQ.trim()) p.set("q", localQ.trim()); else p.delete("q"); return p; });
    setPage(1);
  };

  return (
    <div className="catalogue-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">COMPLETE CATALOGUE</span>
        <h1 className="catalog-title">All Books</h1>
        <p className="catalog-description">Browse our complete catalog of quality-checked pre-loved books.</p>
      </div>

      <div className="catalogue-layout">
        <FilterSidebar
          categoryFilter={catParam} setCategoryFilter={setCategoryFilter}
          tierFilter={tierParam} setTierFilter={setTierFilter}
          sortBy={sortParam} setSortBy={setSortBy}
          resultCount={filtered.length}
          mobileOpen={mobileFilterOpen} onMobileClose={() => setMobileFilterOpen(false)}
        />

        <div className="catalogue-main">
          <div className="catalogue-toolbar">
            <button className="mobile-filter-btn" onClick={() => setMobileFilterOpen(true)}>
              <FiFilter /> Filters
            </button>
            <form className="catalogue-search-form" onSubmit={handleSearch}>
              <span className="search-icon-inside"><FiSearch /></span>
              <input
                type="search"
                value={localQ}
                onChange={(e) => setLocalQ(e.target.value)}
                placeholder="Search title, author..."
                aria-label="Search catalogue"
              />
            </form>
            <span className="result-count-label">{filtered.length} {filtered.length === 1 ? "book" : "books"}</span>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="results-grid">
                {paginated.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
              {hasMore && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>Load More Books</button>
                </div>
              )}
            </>
          ) : (
            <div className="category-not-found">
              <h3>No Books Found</h3>
              <p>We couldn't find any books matching your filters. Try adjusting the filters or search term.</p>
              <button className="cta" onClick={() => { setSearchParams({}); setLocalQ(""); setPage(1); }}>Clear All Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
