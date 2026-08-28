import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiChevronDown, FiX } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar, {
  normalizeCategory,
  categoryOptions,
  collectionOptions,
  authorOptions,
  priceLimitOptions,
  sortOptions,
} from "../components/FilterSidebar";

const PAGE_SIZE = 48;

export default function CataloguePage({ allBooks, defaultCategory }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sortParam = searchParams.get("sort") || "match";
  const rawCatParam = searchParams.get("category") || searchParams.get("genre") || defaultCategory || "all";
  const catParam = normalizeCategory(rawCatParam);
  const collectionParam = searchParams.get("collection") || "all";
  const authorParam = searchParams.get("author") || "all";
  const priceParam = searchParams.get("price") || searchParams.get("tier") || "all";

  const setSortBy = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "match") next.delete("sort");
      else next.set("sort", v);
      return next;
    });
    setPage(1);
  };

  const setCategoryFilter = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "all") {
        next.delete("category");
        next.delete("genre");
      } else {
        next.set("category", v);
        next.delete("genre");
      }
      return next;
    });
    setPage(1);
  };

  const setCollectionFilter = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "all") next.delete("collection");
      else next.set("collection", v);
      return next;
    });
    setPage(1);
  };

  const setAuthorFilter = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "all") next.delete("author");
      else next.set("author", v);
      return next;
    });
    setPage(1);
  };

  const setPriceFilter = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "all") {
        next.delete("price");
        next.delete("tier");
      } else {
        next.set("price", v);
        next.delete("tier");
      }
      return next;
    });
    setPage(1);
  };

  useEffect(() => {
    const currentLabel = categoryOptions.find((g) => g.value === catParam)?.label;
    document.title = catParam !== "all" && currentLabel
      ? `${currentLabel} | Books By Kilo`
      : "All Books | Books By Kilo";
  }, [catParam]);

  const filtered = useMemo(() => {
    const result = allBooks.filter((b) => {
      // 1. Category filter
      let catMatch = true;
      if (catParam !== "all") {
        const bookGenre = String(b.genre || "").toLowerCase();
        const bookCats = (b.categories || []).map((c) => String(c).toLowerCase());

        if (catParam === "fiction") {
          catMatch = bookCats.includes("fiction") || bookGenre.includes("fiction") || bookGenre.includes("novel");
        } else if (catParam === "non-fiction") {
          catMatch = bookCats.includes("non-fiction") || bookGenre.includes("non-fiction");
        } else if (catParam === "children-books" || catParam === "children") {
          catMatch =
            bookCats.includes("children") ||
            bookCats.includes("children-books") ||
            bookGenre.includes("children") ||
            bookGenre.includes("kids");
        } else if (catParam === "teen-fiction" || catParam === "teen") {
          catMatch =
            bookCats.includes("teen-fiction") ||
            bookCats.includes("teen") ||
            bookGenre.includes("teen") ||
            bookGenre.includes("young adult");
        } else if (catParam === "classic-books" || catParam === "classic") {
          catMatch = b.tier?.toLowerCase() === "classic" || bookCats.includes("classic") || bookGenre.includes("classic");
        } else if (catParam === "coffee-table-books" || catParam === "collector") {
          catMatch =
            bookCats.includes("collector") ||
            bookCats.includes("coffee-table-books") ||
            b.tier?.toLowerCase() === "premium" ||
            bookGenre.includes("coffee");
        } else if (catParam === "history") {
          catMatch = bookCats.includes("history") || bookGenre.includes("history") || bookGenre.includes("politics");
        } else if (catParam === "business") {
          catMatch =
            bookCats.includes("business") ||
            bookGenre.includes("business") ||
            bookGenre.includes("economics") ||
            bookGenre.includes("leadership");
        } else if (catParam === "biography") {
          catMatch = bookCats.includes("biography") || bookGenre.includes("biography") || bookGenre.includes("memoir");
        } else {
          catMatch = bookCats.includes(catParam) || bookGenre.includes(catParam);
        }
      }

      // 2. Collection filter
      let collectionMatch = true;
      if (collectionParam !== "all") {
        const bookPrice = b.salePrice ?? b.price ?? 0;
        if (collectionParam === "bestsellers") {
          collectionMatch = (b.match || 0) >= 90;
        } else if (collectionParam === "new-books") {
          collectionMatch = b.tier?.toLowerCase() === "new" || (b.categories || []).includes("new-books");
        } else if (collectionParam === "classics") {
          collectionMatch = b.tier?.toLowerCase() === "classic" || String(b.genre || "").toLowerCase().includes("classic");
        } else if (collectionParam === "surprise-stack") {
          collectionMatch = (b.match || 0) >= 85;
        } else if (collectionParam === "bulk") {
          collectionMatch = true;
        } else if (collectionParam === "under-199") {
          collectionMatch = bookPrice <= 199;
        }
      }

      // 3. Author filter
      let authorMatch = true;
      if (authorParam !== "all") {
        authorMatch = String(b.author || "").toLowerCase().includes(authorParam.toLowerCase());
      }

      // 4. Price Limit filter
      let priceMatch = true;
      if (priceParam !== "all") {
        const p = b.salePrice ?? b.price ?? 0;
        if (priceParam === "under-199") priceMatch = p <= 199;
        else if (priceParam === "200-349" || priceParam === "standard") priceMatch = p >= 200 && p <= 349;
        else if (priceParam === "350-499" || priceParam === "classic") priceMatch = p >= 350 && p <= 499;
        else if (priceParam === "500-above" || priceParam === "premium" || priceParam === "new") priceMatch = p >= 500;
      }

      return catMatch && collectionMatch && authorMatch && priceMatch;
    });

    return [...result].sort((a, b) =>
      sortParam === "price-low" ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) :
      sortParam === "price-high" ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price) :
      b.match - a.match
    );
  }, [allBooks, catParam, collectionParam, authorParam, priceParam, sortParam]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const currentCategoryLabel = categoryOptions.find((g) => g.value === catParam)?.label;
  const currentCollectionLabel = collectionOptions.find((c) => c.value === collectionParam)?.label;
  const currentPriceLabel = priceLimitOptions.find((p) => p.value === priceParam)?.label;

  return (
    <div className="catalogue-page myntra-catalogue-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">
          {catParam !== "all" ? "GENRE COLLECTION" : "COMPLETE CATALOGUE"}
        </span>
        <h1 className="catalog-title">
          {catParam !== "all" ? currentCategoryLabel : "All Books Catalogue"}
        </h1>
        <p className="catalog-description">
          {catParam !== "all"
            ? `Explore our curated selection of quality-checked ${currentCategoryLabel}.`
            : "Browse our complete catalog of quality-checked pre-loved books."}
        </p>
      </div>

      <div className="catalogue-layout myntra-catalogue-layout">
        {/* Left Filter Sidebar (synced with catParam) */}
        <FilterSidebar
          categoryFilter={catParam}
          setCategoryFilter={setCategoryFilter}
          collectionFilter={collectionParam}
          setCollectionFilter={setCollectionFilter}
          authorFilter={authorParam}
          setAuthorFilter={setAuthorFilter}
          priceFilter={priceParam}
          setPriceFilter={setPriceFilter}
          sortBy={sortParam}
          setSortBy={setSortBy}
          resultCount={filtered.length}
          mobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        {/* Right Main Area */}
        <div className="catalogue-main myntra-catalogue-main">
          {/* Top Myntra Toolbar */}
          <div className="myntra-top-toolbar">
            <div className="myntra-toolbar-left">
              <button
                type="button"
                className="mobile-filter-btn"
                onClick={() => setMobileFilterOpen(true)}
              >
                <FiFilter /> Filters
              </button>

              <span className="myntra-results-count">
                <strong>{filtered.length}</strong> {filtered.length === 1 ? "Book" : "Books"} Found
              </span>

              {/* Active Filter Chips */}
              <div className="myntra-active-chips">
                {catParam !== "all" && (
                  <span className="myntra-chip">
                    {currentCategoryLabel}
                    <button type="button" onClick={() => setCategoryFilter("all")} aria-label="Remove category filter">
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                {collectionParam !== "all" && (
                  <span className="myntra-chip">
                    {currentCollectionLabel}
                    <button type="button" onClick={() => setCollectionFilter("all")} aria-label="Remove collection filter">
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                {authorParam !== "all" && (
                  <span className="myntra-chip">
                    Author: {authorParam}
                    <button type="button" onClick={() => setAuthorFilter("all")} aria-label="Remove author filter">
                      <FiX size={12} />
                    </button>
                  </span>
                )}
                {priceParam !== "all" && (
                  <span className="myntra-chip">
                    Price: {currentPriceLabel}
                    <button type="button" onClick={() => setPriceFilter("all")} aria-label="Remove price filter">
                      <FiX size={12} />
                    </button>
                  </span>
                )}
              </div>
            </div>

            {/* Top Right Sort Dropdown */}
            <div className="myntra-sort-dropdown-wrap">
              <span className="myntra-sort-label">Sort by:</span>
              <div className="myntra-select-container">
                <select
                  value={sortParam}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="myntra-sort-select"
                  aria-label="Sort books by"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="myntra-select-arrow" size={14} />
              </div>
            </div>
          </div>

          {/* Product Grid / Empty State */}
          {filtered.length > 0 ? (
            <>
              <div className="results-grid myntra-results-grid">
                {paginated.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
              {hasMore && (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-btn"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load More Books
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="category-not-found myntra-empty-state">
              <h3>No Books Found</h3>
              <p>We couldn't find any books matching your selected filters.</p>
              <button
                type="button"
                className="cta"
                onClick={() => {
                  setSearchParams({});
                  setPage(1);
                }}
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
