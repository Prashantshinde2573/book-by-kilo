import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";

const PAGE_SIZE = 48;

export default function SearchPage({ allBooks = [] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const sortParam = searchParams.get("sort") || "match";
  const tierParam = searchParams.get("tier") || "all";
  const [localQ, setLocalQ] = useState(q);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Sync local input when URL query changes
  useEffect(() => {
    setLocalQ(q);
  }, [q]);

  const setSortBy = (v) => {
    setSearchParams((p) => {
      p.set("sort", v);
      return p;
    });
    setPage(1);
  };

  const setTierFilter = (v) => {
    setSearchParams((p) => {
      p.set("tier", v);
      return p;
    });
    setPage(1);
  };

  useEffect(() => {
    document.title = q ? `"${q}" — Search | Books By Kilo` : "Search Books | Books By Kilo";
  }, [q]);

  const filtered = useMemo(() => {
    const val = q.trim().toLowerCase();
    if (!val) return allBooks;
    const result = allBooks.filter((b) => {
      const fields = [
        b.title,
        b.author,
        b.genre,
        b.language,
        b.tier,
        b.isbn,
        b.binding,
        ...(b.categories || []),
        ...(b.languages || []),
      ];
      const searchMatch = fields.some((f) => String(f || "").toLowerCase().includes(val));
      const tierMatch = tierParam === "all" || b.tier?.toLowerCase() === tierParam;
      return searchMatch && tierMatch;
    });

    return [...result].sort((a, b) =>
      sortParam === "price-low"
        ? a.salePrice - b.salePrice
        : sortParam === "price-high"
        ? b.salePrice - a.salePrice
        : b.match - a.match
    );
  }, [allBooks, q, tierParam, sortParam]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams((p) => {
      if (localQ.trim()) p.set("q", localQ.trim());
      else p.delete("q");
      return p;
    });
    setPage(1);
  };

  const handleClear = () => {
    setLocalQ("");
    setSearchParams((p) => {
      p.delete("q");
      return p;
    });
    setPage(1);
  };

  return (
    <div className="catalogue-page search-page-container">
      <div className="search-header-hero">
        <span className="catalog-kicker">SEARCH RESULTS</span>
        <h1 className="search-header-title">
          {q ? (
            <>
              Results for <span className="search-query-text">"{q}"</span>
            </>
          ) : (
            "Search Books by Kilo"
          )}
        </h1>

        <form className="search-page-unified-bar" onSubmit={handleSearch}>
          <div className="search-input-inner">
            <FiSearch className="search-inner-icon" />
            <input
              type="text"
              value={localQ}
              onChange={(e) => setLocalQ(e.target.value)}
              placeholder="Search by title, author, genre, language, ISBN..."
              aria-label="Search books"
              className="search-main-input"
            />
            {localQ && (
              <button
                type="button"
                className="search-clear-action"
                onClick={handleClear}
                aria-label="Clear search input"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
          <button type="submit" className="search-submit-action">
            Search
          </button>
        </form>
      </div>

      <div className="catalogue-layout">
        <FilterSidebar
          categoryFilter="all"
          setCategoryFilter={() => {}}
          tierFilter={tierParam}
          setTierFilter={setTierFilter}
          sortBy={sortParam}
          setSortBy={setSortBy}
          resultCount={filtered.length}
          mobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        <div className="catalogue-main">
          <div className="catalogue-toolbar">
            <span className="result-count-label">
              Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? "book" : "books"}
              {q ? ` for "${q}"` : ""}
            </span>
          </div>

          {filtered.length > 0 ? (
            <>
              <div className="results-grid">
                {paginated.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              {hasMore && (
                <div className="load-more-wrap">
                  <button className="load-more-btn" onClick={() => setPage((p) => p + 1)}>
                    Load More Books
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="category-not-found search-not-found">
              <h3>No Matching Books Found</h3>
              <p>We couldn't find any books matching "{q}". Try searching by author name, book title, or genre.</p>
              <div className="not-found-actions">
                <button type="button" className="cta" onClick={handleClear}>
                  Clear Search
                </button>
                <Link to="/catalogue" className="cta outline-cta">
                  Browse All Books
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
