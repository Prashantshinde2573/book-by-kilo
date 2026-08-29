import { useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  FiChevronRight,
  FiArrowRight,
  FiCompass,
  FiStar,
  FiBookOpen,
} from "react-icons/fi";
import BookCard from "../components/BookCard";
import { getLandingData, categoryConfigs, collectionConfigs } from "../data/landingData";

export default function CategoryLandingPage({ allBooks = [], type = "category" }) {
  const { slug } = useParams();
  const location = useLocation();

  const isCollectionRoute = type === "collection" || location.pathname.startsWith("/collection");
  const landingData = getLandingData(slug, isCollectionRoute ? "collection" : "category", allBooks);

  const {
    title,
    kicker,
    description,
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

  return (
    <div className="category-landing-page">
      {/* 1. Immersive Centered Hero Showcase */}
      <section className="centered-editorial-hero" style={{ "--accent-color": accentColor }}>
        <div className="hero-ambient-backdrop" />

        <div className="hero-header-centered">
          <h1 className="hero-centered-headline">
            Explore {title}
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

        {/* Supporting Description & Primary CTA Button */}
        <div className="hero-footer-centered">
          <p className="hero-supporting-desc">
            {description}
          </p>

          <div className="hero-cta-button-row">
            <Link to={cataloguePath} className="hero-main-cta-btn">
              <span>Explore All {title}</span>
              <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Books Section (12-Book Clean Grid) */}
      <section className="landing-featured-section">
        <div className="landing-shelf-header">
          <div className="shelf-header-text">
            <h2>Featured {title}</h2>
            <p className="shelf-header-subtitle">
              Hand-picked recommendations from our quality-checked inventory
            </p>
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

        {/* 4. Standalone View All CTA Button */}
        <div className="landing-standalone-cta-wrap">
          <Link to={cataloguePath} className="landing-standalone-cta-btn">
            <span>View All {title} ({totalCount})</span>
            <FiArrowRight size={17} />
          </Link>
        </div>

        {/* 5. Explore Other Categories / Collections Section */}
        <div className="landing-discovery-section">
          <div className="discovery-header">
            <h3>Explore Other {isCollectionRoute ? "Collections" : "Categories"}</h3>
          </div>

          <div className="discovery-cards-grid">
            {(isCollectionRoute ? otherCollections : otherCategories).map(([key, item], index) => (
              <Link
                key={key}
                to={isCollectionRoute ? `/collection/${key}` : `/category/${key}`}
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
