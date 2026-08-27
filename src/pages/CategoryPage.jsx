import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar from "../components/FilterSidebar";
import { categorySlugMap, getPageMetadata } from "../data/books";

const PAGE_SIZE = 48;

export default function CategoryPage({ allBooks }) {
  const { slug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sortParam = searchParams.get("sort") || "match";
  const tierParam = searchParams.get("tier") || "all";

  const setSortBy = (v) => { setSearchParams((p) => { p.set("sort", v); return p; }); setPage(1); };
  const setTierFilter = (v) => { setSearchParams((p) => { p.set("tier", v); return p; }); setPage(1); };

  const catInfo = categorySlugMap[slug];
  const meta = getPageMetadata(`category-${slug}`);

  useEffect(() => { document.title = `${meta.title} | Books By Kilo`; }, [slug, meta.title]);

  const filtered = useMemo(() => {
    if (!catInfo) return [];
    const result = allBooks.filter((b) => {
      const catMatch = catInfo.filter(b);
      const tierMatch = tierParam === "all" || b.tier?.toLowerCase() === tierParam;
      return catMatch && tierMatch;
    });
    return [...result].sort((a, b) =>
      sortParam === "price-low" ? a.salePrice - b.salePrice :
      sortParam === "price-high" ? b.salePrice - a.salePrice :
      sortParam === "weight" ? b.weight - a.weight :
      b.match - a.match
    );
  }, [allBooks, slug, tierParam, sortParam, catInfo]);

  if (!catInfo) {
    return (
      <div className="catalogue-page">
        <div className="page-header-banner">
          <h1 className="catalog-title">Category Not Found</h1>
          <p className="catalog-description">The category "{slug}" doesn't exist.</p>
          <Link to="/catalogue" className="cta" style={{ display: "inline-flex", marginTop: "16px" }}>Browse All Books</Link>
        </div>
      </div>
    );
  }

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  return (
    <div className="catalogue-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">{meta.kicker}</span>
        <h1 className="catalog-title">{meta.title}</h1>
        <p className="catalog-description">{meta.description}</p>
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
            <button className="mobile-filter-btn" onClick={() => setMobileFilterOpen(true)}>
              <FiFilter /> Filters
            </button>
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
              <h3>No Books in This Category</h3>
              <p>We couldn't find books matching the current filters.</p>
              <button className="cta" onClick={() => setSearchParams({})}>Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
