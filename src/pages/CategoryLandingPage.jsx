import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import BookCard from "../components/BookCard";
import { getLandingData, categoryConfigs, collectionConfigs, languageConfigs } from "../data/landingData";

export default function CategoryLandingPage({ allBooks = [], type = "category" }) {
  const { slug } = useParams();
  const location = useLocation();

  const isLanguageRoute = type === "language" || location.pathname.startsWith("/language");
  const isCollectionRoute = type === "collection" || location.pathname.startsWith("/collection");
  const resolvedType = isLanguageRoute ? "language" : isCollectionRoute ? "collection" : "category";

  const landingData = getLandingData(slug, resolvedType, allBooks);

  const {
    title,
    nativeTitle,
    cataloguePath,
    accentColor,
    featuredBooks,
    heroBooks = [],
    totalCount,
  } = landingData;

  useEffect(() => {
    document.title = `${title} | Books By Kilo`;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [title, slug]);

  const otherCategories = Object.entries(categoryConfigs)
    .filter(([key]) => key !== landingData.slug);

  const otherCollections = Object.entries(collectionConfigs)
    .filter(([key]) => key !== landingData.slug);

  const otherLanguages = Object.entries(languageConfigs)
    .filter(([key]) => key !== landingData.slug);

  const discoveryItems = isLanguageRoute
    ? otherLanguages
    : isCollectionRoute
    ? otherCollections
    : otherCategories;

  const getDiscoveryLink = (key) => {
    if (isLanguageRoute) return `/language/${key}`;
    if (isCollectionRoute) return `/collection/${key}`;
    return `/category/${key}`;
  };

  const discoveryHeading = isLanguageRoute
    ? "Explore Other Languages"
    : isCollectionRoute
    ? "Explore Other Collections"
    : "Explore Other Categories";

  return (
    <div className="category-landing-page">
      {/* 1. Immersive Centered Hero Showcase (No Unwanted Description Text) */}
      <section className="centered-editorial-hero" style={{ "--accent-color": accentColor }}>
        <div className="hero-ambient-backdrop" />

        <div className="hero-header-centered">
          {nativeTitle && (
            <span className="hero-native-tag">{nativeTitle}</span>
          )}
          <h1 className="hero-centered-headline">
            {isLanguageRoute ? title : title}
          </h1>
        </div>

        {/* Dynamic Fanned Panoramic Book Covers Collage (5–7 Covers) */}
        <div className="hero-fanned-showcase-wrap">
          <div className="hero-fanned-covers-track">
            {heroBooks.slice(0, 7).map((book, index) => {
              const total = Math.min(heroBooks.length, 7);
              const centerIdx = Math.floor(total / 2);
              const posOffset = index - centerIdx;

              return (
                <div
                  key={book.id || index}
                  className={`fanned-book-card fanned-pos-${index + 1}`}
                  style={{
                    "--pos-offset": posOffset,
                    "--item-index": index,
                  }}
                >
                  <div className="fanned-book-inner">
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="eager"
                      className="fanned-cover-img"
                    />
                    <div className="fanned-spine-glare" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Featured Books Section (Clean Grid) */}
      <section className="landing-featured-section">
        <div className="landing-shelf-header">
          <div className="shelf-header-text">
            <h2>Featured {title}</h2>
          </div>
          <div className="shelf-header-count">
            Showing {featuredBooks.length} of {totalCount} books
          </div>
        </div>

        {/* 4-Column Desktop Product Grid */}
        <div className="landing-books-grid-4col">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        {/* 3. Standalone View All CTA Button */}
        <div className="landing-standalone-cta-wrap">
          <Link to={cataloguePath} className="landing-standalone-cta-btn">
            <span>View All {title} ({totalCount})</span>
            <FiArrowRight size={17} />
          </Link>
        </div>

        {/* 4. Explore Other Categories / Collections / Languages Section */}
        <div className="landing-discovery-section">
          <div className="discovery-header">
            <h3>{discoveryHeading}</h3>
          </div>

          <div className="discovery-cards-grid">
            {discoveryItems.map(([key, item], index) => (
              <Link
                key={key}
                to={getDiscoveryLink(key)}
                className={`collection-card discovery-collection-card discovery-theme-${(index % 8) + 1}`}
              >
                <span>
                  <strong className="discovery-title-text">{item.title}</strong>
                </span>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                />
                <span className="discovery-card-arrow">
                  <FiChevronRight size={15} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
