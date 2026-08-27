import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

const PAGE_SIZE = 48;

export default function SearchPage({ allBooks }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "match";
  const tierParam = searchParams.get("tier") || "all";
  const [localQ, setLocalQ] = useState(q);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const setSortBy = (v) => { setSearchParams((p) => { p.set("sort", v); return p; }); setPage(1); };
  const setTierFilter = (v) => { setSearchParams((p) => { p.set("tier", v); return p; }); setPage(1); };

  useEffect(() => { document.title = q ? `"${q}" — Search | Books By Kilo` : "Search | Books By Kilo"; }, [q]);

  const filtered = useMemo(() => {
    const val = q.trim().toLowerCase();
    if (!val) return allBooks;
    const result = allBooks.filter((b) => {
      const searchMatch = [b.title, b.author, b.genre, b.tier, ...(b.categories || [])].some((f) => String(f || "").toLowerCase().includes(val));
      const tierMatch = tierParam === "all" || b.tier?.toLowerCase() === tierParam;
      return searchMatch && tierMatch;
    });
    return [...result].sort((a, b) =>
      sortParam === "price-low" ? a.salePrice - b.salePrice :
      sortParam === "price-high" ? b.salePrice - a.salePrice :
      b.match - a.match
    );
  }, [allBooks, q, tierParam, sortParam]);

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
        <span className="catalog-kicker">SEARCH RESULTS</span>
        <h1 className="catalog-title">{q ? `Results for "${q}"` : "Search Books"}</h1>
        <form className="catalogue-search-form search-hero-form" onSubmit={handleSearch} style={{ marginTop: "16px", maxWidth: "520px" }}>
          <span className="search-icon-inside"><FiSearch /></span>
          <input
            type="search"
            value={localQ}
            onChange={(e) => setLocalQ(e.target.value)}
            placeholder="Search by title, author, genre..."
            aria-label="Search books"
            autoFocus
          />
          <button type="submit" className="cta" style={{ borderRadius: "0 8px 8px 0", padding: "0 20px", minHeight: "40px" }}>Search</button>
        </form>
      </div>

      <div className="catalogue-layout">
        <FilterSidebar
          categoryFilter="all" setCategoryFilter={() => {}}
          tierFilter={tierParam} setTierFilter={setTierFilter}
          sortBy={sortParam} setSortBy={setSortBy}
          resultCount={filtered.length}
          mobileOpen={mobileFilterOpen} onMobileClose={() => setMobileFilterOpen(false)}
        />

        <div className="catalogue-main">
          <div className="catalogue-toolbar">
            <span className="result-count-label">{filtered.length} {filtered.length === 1 ? "result" : "results"}</span>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="results-grid">
                {paginated.map((book) => <BookCard key={book.id} book={book} />)}
              </div>
              {hasMore && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>Load More</button>
                </div>
              )}
            </>
          ) : (
            <div className="category-not-found">
              <h3>No Results Found</h3>
              <p>We couldn't find any books matching "{q}". Try a different search term.</p>
              <Link to="/catalogue" className="cta" style={{ display: "inline-flex", marginTop: "16px" }}>Browse All Books</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
