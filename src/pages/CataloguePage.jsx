import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter } from "react-icons/fi";
import BookCard from "../components/BookCard";
import FilterSidebar, {
  normalizeCategory,
  normalizeCollection,
  categoryOptions,
  languageOptions,
  collectionOptions,
  authorOptions,
  priceLimitOptions,
  sortOptions,
} from "../components/FilterSidebar";

const PAGE_SIZE = 48;

export default function CataloguePage({ allBooks = [], defaultCategory, defaultLanguage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  const sortParam = searchParams.get("sort") || "match";

  // Category normalization
  const rawCatParam = searchParams.get("category") || searchParams.get("genre") || defaultCategory || "all";
  const catParam = normalizeCategory(rawCatParam);

  // Language normalization
  const rawLangParam = searchParams.get("language") || defaultLanguage || "all";
  const languageParam = rawLangParam.toLowerCase();

  // Collection / special state normalization
  const rawCollectionParam =
    searchParams.get("collection") ||
    searchParams.get("filter") ||
    (searchParams.get("tier") === "new" ? "new-books" : (searchParams.get("tier") === "classic" ? "classics" : null)) ||
    "all";
  const collectionParam = normalizeCollection(rawCollectionParam);

  // Author normalization
  const authorParam = searchParams.get("author") || "all";

  // Price limit normalization
  const rawPrice = searchParams.get("price");
  const priceParam = rawPrice || "all";

  const setSortBy = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "match") next.delete("sort");
      else next.set("sort", v);
      return next;
    });
    setPage(1);
  };

  const setLanguageFilter = (v) => {
    setSearchParams((p) => {
      const next = new URLSearchParams(p);
      if (v === "all") next.delete("language");
      else next.set("language", v);
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
      if (v === "all") {
        next.delete("collection");
        next.delete("filter");
        next.delete("tier");
      } else {
        next.set("collection", v);
        next.delete("filter");
        next.delete("tier");
      }
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
      } else {
        next.set("price", v);
      }
      return next;
    });
    setPage(1);
  };

  const handleClearAllFilters = () => {
    setSearchParams({});
    setPage(1);
  };

  const currentCategoryLabel = categoryOptions.find((g) => g.value === catParam)?.label;
  const currentLanguageLabel = languageOptions.find((l) => l.value.toLowerCase() === languageParam)?.label;
  const currentCollectionLabel = collectionOptions.find((c) => c.value === collectionParam)?.label;
  const currentPriceLabel = priceLimitOptions.find((p) => p.value === priceParam)?.label;

  const activeTitle =
    languageParam !== "all" && currentLanguageLabel ? `${currentLanguageLabel} Books` :
    catParam !== "all" && currentCategoryLabel ? currentCategoryLabel :
    collectionParam !== "all" && currentCollectionLabel ? currentCollectionLabel :
    authorParam !== "all" ? `Books by ${authorParam}` :
    priceParam !== "all" && currentPriceLabel ? `Books ${currentPriceLabel}` :
    "All Books Catalogue";

  const activeKicker =
    languageParam !== "all" ? "LANGUAGE COLLECTION" :
    catParam !== "all" ? "GENRE COLLECTION" :
    collectionParam !== "all" ? "CURATED COLLECTION" :
    authorParam !== "all" ? "AUTHOR SPOTLIGHT" :
    priceParam !== "all" ? "PRICE FILTER" :
    "COMPLETE CATALOGUE";

  const activeDescription =
    languageParam !== "all" && currentLanguageLabel
      ? `Browse our authentic selection of quality-checked ${currentLanguageLabel} books.`
      : catParam !== "all" && currentCategoryLabel
      ? `Explore our curated selection of quality-checked ${currentCategoryLabel}.`
      : collectionParam !== "all" && currentCollectionLabel
      ? `Explore hand-picked titles in our ${currentCollectionLabel} collection.`
      : authorParam !== "all"
      ? `Browse quality-checked pre-loved books written by ${authorParam}.`
      : priceParam !== "all" && currentPriceLabel
      ? `Discover fantastic pre-loved book deals within ${currentPriceLabel}.`
      : "Browse our complete catalog of quality-checked pre-loved books by weight.";

  useEffect(() => {
    document.title = `${activeTitle} | Books By Kilo`;
  }, [activeTitle]);

  const filtered = useMemo(() => {
    const result = allBooks.filter((b) => {
      // 1. Language filter
      let langMatch = true;
      if (languageParam !== "all") {
        langMatch =
          (b.languages || [b.language || "English"]).some(
            (l) => String(l).toLowerCase() === languageParam
          ) || String(b.language || "").toLowerCase() === languageParam;
      }

      // 2. Category filter
      let catMatch = true;
      if (catParam !== "all") {
        const bookGenre = String(b.genre || "").toLowerCase();
        const bookCats = (b.categories || []).map((c) => String(c).toLowerCase());

        if (catParam === "fiction") {
          catMatch =
            bookCats.includes("fiction") ||
            bookGenre.includes("fiction") ||
            bookGenre.includes("novel") ||
            bookGenre.includes("story") ||
            bookGenre.includes("fantasy") ||
            bookGenre.includes("mystery") ||
            bookGenre.includes("thriller");
        } else if (catParam === "non-fiction") {
          catMatch =
            bookCats.includes("non-fiction") ||
            bookGenre.includes("non-fiction") ||
            bookGenre.includes("history") ||
            bookGenre.includes("business") ||
            bookGenre.includes("biography") ||
            bookGenre.includes("science") ||
            bookGenre.includes("guide");
        } else if (catParam === "children-books" || catParam === "children") {
          catMatch =
            bookCats.includes("children") ||
            bookCats.includes("children-books") ||
            bookGenre.includes("children") ||
            bookGenre.includes("kids") ||
            bookGenre.includes("activity") ||
            bookGenre.includes("picture");
        } else if (catParam === "teen-fiction" || catParam === "teen") {
          catMatch =
            bookCats.includes("teen-fiction") ||
            bookCats.includes("teen") ||
            bookGenre.includes("teen") ||
            bookGenre.includes("young adult") ||
            bookGenre.includes("ya");
        } else if (catParam === "classic-books" || catParam === "classic") {
          catMatch =
            b.tier?.toLowerCase() === "classic" ||
            bookCats.includes("classic") ||
            bookGenre.includes("classic") ||
            bookGenre.includes("literature");
        } else if (catParam === "coffee-table-books" || catParam === "collector") {
          catMatch =
            bookCats.includes("collector") ||
            bookCats.includes("coffee-table-books") ||
            b.tier?.toLowerCase() === "premium" ||
            bookGenre.includes("coffee") ||
            bookGenre.includes("art") ||
            bookGenre.includes("photography");
        } else if (catParam === "history") {
          catMatch =
            bookCats.includes("history") ||
            bookGenre.includes("history") ||
            bookGenre.includes("politics");
        } else if (catParam === "business") {
          catMatch =
            bookCats.includes("business") ||
            bookGenre.includes("business") ||
            bookGenre.includes("economics") ||
            bookGenre.includes("leadership") ||
            bookGenre.includes("finance");
        } else if (catParam === "biography") {
          catMatch =
            bookCats.includes("biography") ||
            bookGenre.includes("biography") ||
            bookGenre.includes("memoir") ||
            bookGenre.includes("autobiography");
        } else {
          catMatch = bookCats.includes(catParam) || bookGenre.includes(catParam);
        }
      }

      // 3. Collection filter
      let collectionMatch = true;
      if (collectionParam !== "all") {
        const bookPrice = b.salePrice ?? b.price ?? 0;
        if (collectionParam === "bestsellers") {
          collectionMatch = (b.match || 0) >= 90 || b.isBestseller === true;
        } else if (collectionParam === "new-arrivals") {
          collectionMatch =
            b.tier?.toLowerCase() === "new" ||
            (b.categories || []).includes("new-books") ||
            String(b.id).startsWith("new-") ||
            String(b.id).startsWith("catalog-");
        } else if (collectionParam === "new-books") {
          collectionMatch =
            b.tier?.toLowerCase() === "new" ||
            (b.categories || []).includes("new-books");
        } else if (collectionParam === "classics") {
          collectionMatch =
            b.tier?.toLowerCase() === "classic" ||
            String(b.genre || "").toLowerCase().includes("classic") ||
            (b.categories || []).includes("classic");
        } else if (collectionParam === "surprise-stack") {
          collectionMatch = (b.match || 0) >= 85;
        } else if (collectionParam === "bulk") {
          collectionMatch = (b.weight || 0) >= 200 || true;
        } else if (collectionParam === "under-199") {
          collectionMatch = bookPrice <= 199;
        }
      }

      // 4. Author filter
      let authorMatch = true;
      if (authorParam !== "all") {
        authorMatch = String(b.author || "").toLowerCase().includes(authorParam.toLowerCase());
      }

      // 5. Price Limit filter
      let priceMatch = true;
      if (priceParam !== "all") {
        const p = b.salePrice ?? b.price ?? 0;
        if (priceParam === "under-199") priceMatch = p <= 199;
        else if (priceParam === "200-349" || priceParam === "standard") priceMatch = p >= 200 && p <= 349;
        else if (priceParam === "350-499" || priceParam === "classic") priceMatch = p >= 350 && p <= 499;
        else if (priceParam === "500-above" || priceParam === "premium" || priceParam === "new") priceMatch = p >= 500;
      }

      return langMatch && catMatch && collectionMatch && authorMatch && priceMatch;
    });

    return [...result].sort((a, b) =>
      sortParam === "price-low" ? (a.salePrice ?? a.price) - (b.salePrice ?? b.price) :
      sortParam === "price-high" ? (b.salePrice ?? b.price) - (a.salePrice ?? a.price) :
      b.match - a.match
    );
  }, [allBooks, languageParam, catParam, collectionParam, authorParam, priceParam, sortParam]);

  const paginated = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = paginated.length < filtered.length;

  const hasAnyFilter =
    languageParam !== "all" ||
    catParam !== "all" ||
    collectionParam !== "all" ||
    authorParam !== "all" ||
    priceParam !== "all";

  return (
    <div className="catalogue-page">
      {/* Editorial Page Header */}
      <div className="page-header-banner">
        <span className="catalog-kicker">{activeKicker}</span>
        <h1 className="catalog-title">{activeTitle}</h1>
        <p className="catalog-desc">{activeDescription}</p>
      </div>

      <div className="catalogue-layout">
        {/* Filter Sidebar (Desktop + Mobile Drawer) */}
        <FilterSidebar
          categoryFilter={catParam}
          setCategoryFilter={setCategoryFilter}
          languageFilter={languageParam}
          setLanguageFilter={setLanguageFilter}
          collectionFilter={collectionParam}
          setCollectionFilter={setCollectionFilter}
          authorFilter={authorParam}
          setAuthorFilter={setAuthorFilter}
          priceFilter={priceParam}
          setPriceFilter={setPriceFilter}
          sortBy={sortParam}
          setSortBy={setSortBy}
          onClearAll={handleClearAllFilters}
          resultCount={filtered.length}
          mobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        {/* Main Content Area */}
        <div className="catalogue-main">
          {/* Toolbar: [ Filters ] | Showing X of XXXX books | Sort by: [ Recommended ▼ ] */}
          <div className="catalogue-toolbar">
            <button
              type="button"
              className="toolbar-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Open filter menu"
            >
              <FiFilter />
              <span>Filters {hasAnyFilter ? "•" : ""}</span>
            </button>

            <span className="result-count-label">
              Showing <strong>{paginated.length}</strong> of <strong>{filtered.length}</strong> books
            </span>

            <div className="sort-dropdown-wrap">
              <label htmlFor="catalogue-sort" className="sort-label">
                Sort by:
              </label>
              <select
                id="catalogue-sort"
                className="catalogue-sort-select"
                value={sortParam}
                onChange={(e) => setSortBy(e.target.value)}
                aria-label="Sort books by"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filtered.length > 0 ? (
            <>
              <div className="results-grid">
                {paginated.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-btn"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Load More Books ({filtered.length - paginated.length} remaining)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="category-not-found">
              <h3>No Books Found</h3>
              <p>No books match your selected filters. Try changing or clearing your filter criteria.</p>
              <button
                type="button"
                className="cta"
                onClick={handleClearAllFilters}
                style={{ display: "inline-flex", marginTop: "16px" }}
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
