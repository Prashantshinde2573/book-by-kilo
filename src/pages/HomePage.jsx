import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiChevronLeft, FiChevronRight, FiCheck, FiGift,
  FiInfo, FiPlus, FiShoppingCart, FiStar,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import {
  genreItems, surpriseCard, bookQuotes, collections, authors, languages,
  googleReviewSlide, getNormalizedBook, formatPrice,
} from "../data/books";
import { useAppContext } from "../context/AppContext";
import Shelf from "../components/Shelf";

function BookQuotesSection({ quotes }) {
  const railRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const handleScroll = () => {
    if (!railRef.current) return;
    const cardWidth = 350;
    const current = Math.round(railRef.current.scrollLeft / cardWidth);
    setActiveIdx(current % quotes.length);
  };
  return (
    <section className="quotes-section" id="quotes">
      <div className="shelf-heading"><div><h2>Quotes</h2></div></div>
      <div className="quotes-carousel-wrapper">
        <div className="quotes-track" ref={railRef} onScroll={handleScroll}>
          {quotes.map((item, index) => (
            <article key={`${item.book}-${index}`} className="quote-card">
              <img src={item.image} alt={item.book} className="quote-card-bg" />
              <div className="quote-card-vignette" />
              <div className="quote-card-body">
                <h3 className="quote-headline">"{item.quote}"</h3>
                <div className="quote-byline">
                  <div className="quote-accent-line" />
                  <span className="quote-author-name">{item.author}</span>
                  <strong className="quote-book-title">{item.book}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="quotes-dots">
        {quotes.map((q, idx) => (
          <span key={q.book} className={`quote-dot ${activeIdx === idx ? "active" : ""}`} />
        ))}
      </div>
    </section>
  );
}

export default function HomePage({ allBooks }) {
  const navigate = useNavigate();
  const { addCart, list, toggleList } = useAppContext();
  const [heroIndex, setHeroIndex] = useState(0);

  useEffect(() => { document.title = "Books By Kilo — Pre-Loved Books Online"; }, []);

  const preferredHeroTitles = ["Bright Eyes, Brown Skin", "Alice in Wonderland", "King Lear", "Much Ado about Nothing", "When It Snows"];
  const heroBooks = preferredHeroTitles.map((t) => allBooks.find((b) => b.title.toLowerCase() === t.toLowerCase())).filter(Boolean);
  const featuredBooks = heroBooks.length === 5 ? heroBooks : allBooks.slice(0, 5);

  const heroSlides = useMemo(() => [featuredBooks[0], featuredBooks[1], googleReviewSlide, ...featuredBooks.slice(2)].filter(Boolean), [featuredBooks]);
  const featured = heroSlides[heroIndex] || heroSlides[0];
  const normFeatured = useMemo(() => getNormalizedBook(featured), [featured]);

  const heroTitle = featured && featured.title === "When It Snows" ? <><>When It</><br /><>Snows</></> : featured?.title;

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const timer = window.setInterval(() => setHeroIndex((i) => (i + 1) % heroSlides.length), 6500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const handleViewAll = (shelf) => {
    if (shelf.title.includes("Brand New")) navigate("/catalogue?collection=new-books");
    else if (shelf.title.includes("Children")) navigate("/catalogue?category=children-books");
    else if (shelf.title.includes("Teen")) navigate("/catalogue?category=teen-fiction");
    else if (shelf.title.includes("Fiction")) navigate("/catalogue?category=fiction");
    else if (shelf.title.includes("Premium")) navigate("/catalogue?price=500-above");
    else if (shelf.title.includes("Classic")) navigate("/catalogue?category=classic-books");
    else if (shelf.title.includes("Standard")) navigate("/catalogue?price=200-349");
    else if (shelf.title.includes("Coffee Table")) navigate("/catalogue?category=coffee-table-books");
    else if (shelf.title.includes("Top 10")) navigate("/catalogue?collection=bestsellers");
    else if (shelf.title.includes("Discount")) navigate("/catalogue?sort=price-low");
    else navigate("/catalogue");
  };

  return (
    <>
      <section
        className="hero"
        data-hero-title={typeof featured?.title === "string" ? featured.title : "featured"}
        data-hero-id={featured?.id}
      >
        <div className="hero-art">
          <img key={`backdrop-${featured?.id}`} className="hero-backdrop" src={featured?.image} alt="" aria-hidden="true" />
          {featured?.isGoogleReview ? (
            <div className="google-rating-card-v2 desktop-only-gcard">
              <div className="g-card-v2-left">
                <div className="g-card-v2-logo-wrapper"><FcGoogle size={48} /></div>
              </div>
              <div className="g-card-v2-divider" />
              <div className="g-card-v2-right">
                <div className="g-card-v2-header">
                  <span className="g-card-v2-title">Google Rating</span>
                  <span className="g-card-v2-verified-badge" aria-label="Verified">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
                      <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 4 .495 0 .965.084 1.4-.238 1.4 1.273 2.77 2.148 4.35 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z" fill="#2563eb"/>
                      <path d="M9.8 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.3-6.3 1.4 1.4-7.7 7.7z" fill="#ffffff"/>
                    </svg>
                  </span>
                </div>
                <div className="g-card-v2-score-row">
                  <span className="g-card-v2-score">4.8</span>
                  <span className="g-card-v2-scale">/ 5</span>
                </div>
                <div className="g-card-v2-stars">
                  <span className="g-star">★</span><span className="g-star">★</span><span className="g-star">★</span><span className="g-star">★</span><span className="g-star g-star-half">★</span>
                </div>
                <div className="g-card-v2-count">Based on <strong className="g-count-num">1,248</strong> Google Reviews</div>
                <div className="g-card-v2-hr" />
                <a
                  href="https://www.google.com/search?q=booksbykilo+reviews"
                  target="_blank" rel="noopener noreferrer"
                  className="g-card-v2-cta-btn"
                  onClick={(e) => { e.preventDefault(); window.open("https://www.google.com/search?q=booksbykilo+reviews", "_blank"); }}
                >
                  <span className="g-cta-left"><FcGoogle size={16} /><span>Read our reviews on <strong>Google</strong></span></span>
                  <FiChevronRight size={16} className="g-cta-arrow" />
                </a>
              </div>
            </div>
          ) : (
            <img className="hero-book" src={featured?.image} alt={`${featured?.title} cover`} />
          )}
        </div>

        <div className="hero-copy">
          {featured?.isGoogleReview ? (
            <>
              <span className="eyebrow">CUSTOMER TRUST &amp; REVIEWS</span>
              <h1>Google Rating <em>4.8 ★</em></h1>
              <p className="byline">by 50,000+ Verified Readers Across India</p>
              <div className="mobile-only-gcard mobile-g-rating-card">
                <div className="g-card-v2-score-row" style={{ justifyContent: "center", margin: "4px 0" }}>
                  <span className="g-card-v2-score" style={{ fontSize: "28px" }}>4.8</span>
                  <span className="g-card-v2-scale">/ 5</span>
                  <div className="g-card-v2-stars" style={{ marginLeft: "8px" }}>
                    <span className="g-star">★</span><span className="g-star">★</span><span className="g-star">★</span><span className="g-star">★</span><span className="g-star g-star-half">★</span>
                  </div>
                </div>
                <div className="g-card-v2-count" style={{ textAlign: "center" }}>Based on <strong>1,248</strong> verified reader reviews</div>
              </div>
              <div className="hero-meta">
                <span><FiCheck /> 100% Authentic Books</span>
                <span>Fast Shipping</span>
              </div>
              <p className="description">{googleReviewSlide.description}</p>
              <div className="hero-actions">
                <Link to="/catalogue" className="cta"><FiShoppingCart /> Shop Bestsellers</Link>
                <button className="secondary" onClick={() => window.open("https://www.google.com/search?q=booksbykilo+reviews", "_blank")}>
                  <FiStar /> 1,248 Reviews
                </button>
              </div>
            </>
          ) : normFeatured ? (
            <>
              <span className="eyebrow">BOOKS BY KILO FEATURED</span>
              <h1>{heroTitle}</h1>
              <p className="byline">by {normFeatured.author}</p>
              <div className="hero-meta">
                <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "16px" }}>{formatPrice(normFeatured.salePrice)}</span>
                {normFeatured.mrp > normFeatured.salePrice && (
                  <span style={{ textDecoration: "line-through", opacity: 0.75, fontSize: "14px" }}>MRP {formatPrice(normFeatured.mrp)}</span>
                )}
              </div>
              <p className="description">{normFeatured.description || `A quality-checked Books by Kilo edition of ${normFeatured.title}.`}</p>
              <div className="hero-actions">
                <button className="cta" onClick={() => addCart(normFeatured)}><FiShoppingCart /> Add to Cart • <b>{formatPrice(normFeatured.salePrice)}</b></button>
                <Link to={`/product/${normFeatured.id}`} className="secondary"><FiInfo /> More Info</Link>
                <button className="text-button" onClick={() => toggleList(normFeatured)}>{list.includes(normFeatured.id) ? <FiCheck /> : <FiPlus />} My List</button>
              </div>
            </>
          ) : null}
        </div>

        <div className="hero-slider" aria-label="Featured books">
          <div className="hero-thumbnails">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                className={`hero-thumb-btn ${index === heroIndex ? "active" : ""}`}
                onClick={() => setHeroIndex(index)}
                aria-label={`Slide ${index + 1}: ${slide.title || "Google Reviews"}`}
              >
                {slide.isGoogleReview ? (
                  <div className="thumb-google-badge">
                    <span className="g-mark"><FcGoogle size={14} /></span>
                    <small>4.8★</small>
                  </div>
                ) : (
                  <img src={slide.image} alt={slide.title} />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="content-overlap">
        {/* 1. Top 10 Books */}
        <div className="top-ten-shelf">
          <Shelf
            shelf={{ title: "Top 10 Books This Week" }}
            items={[...allBooks].sort((a, b) => b.match - a.match).slice(0, 10)}
            onViewAll={handleViewAll}
            rank
          />
        </div>

        {/* 2. Explore by Genre */}
        <section className="discovery-section genre-section" id="genres">
          <div className="shelf-heading"><div><h2>Explore by Genre</h2></div></div>
          <div className="genre-grid">
            {genreItems.map(([title, subtitle, image, catKey], index) => (
              <Link
                key={title}
                to={`/catalogue?category=${catKey}`}
                className={`genre-card genre-${index + 1}`}
              >
                <img src={image} alt={title} />
                <b className="genre-number">{String(index + 1).padStart(2, "0")}</b>
                <span className="genre-meta">
                  <strong>{title}</strong>
                  <small>{subtitle}</small>
                </span>
              </Link>
            ))}
            {/* Desktop Surprise Stack */}
            <Link to="/category/surprise-stack" className="genre-card genre-surprise desktop-surprise-card">
              <img className="surprise-bg-img" src={surpriseCard[2]} alt={surpriseCard[0]} />
              <div className="surprise-overlay" />
              <div className="surprise-content">
                <div className="surprise-badge"><FiGift size={12} /> MYSTERY BOX</div>
                <div className="surprise-body">
                  <strong>{surpriseCard[0]}</strong>
                  <small>{surpriseCard[1]}</small>
                  <span className="surprise-cta">Unlock Stack <FiChevronRight size={13} /></span>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Mobile Surprise Stack */}
        <section className="surprise-standalone-section mobile-surprise-section" id="surprisestack">
          <Link to="/category/surprise-stack" className="genre-card genre-surprise-standalone">
            <img className="surprise-bg-img" src={surpriseCard[2]} alt={surpriseCard[0]} />
            <div className="surprise-overlay" />
            <div className="surprise-content">
              <div className="surprise-badge"><FiGift size={12} /> MYSTERY BOX</div>
              <div className="surprise-body">
                <strong>{surpriseCard[0]}</strong>
                <small>{surpriseCard[1]}</small>
                <span className="surprise-cta">Unlock Stack <FiChevronRight size={13} /></span>
              </div>
            </div>
          </Link>
        </section>

        {/* 3. Recently Added */}
        <Shelf shelf={{ title: "Recently Added Books", subtitle: "Freshly stocked arrivals." }} items={allBooks.slice(0, 24)} onViewAll={handleViewAll} />

        {/* 4. Brand New Books */}
        <Shelf shelf={{ title: "Brand New Books", subtitle: "Straight from the press." }} items={allBooks.filter((b) => b.categories?.includes("new-books") || b.tier === "New").slice(0, 24)} onViewAll={handleViewAll} />

        {/* 5. Banner Mid */}
        <section className="gradient-highlight">
          <div className="editor-copy">
            <span className="eyebrow">CURATED FOR CURIOUS READERS</span>
            <h2>Bestseller Collections</h2>
            <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "4px" }}>Unbeatable deals on bestselling pre-loved titles.</p>
            <Link to="/catalogue?sort=match" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px" }}>Explore Bestsellers <FiChevronRight /></Link>
          </div>
          <div className="editor-stack">
            {[...allBooks].sort((a, b) => b.match - a.match).slice(0, 5).map((book, index) => (
              <Link key={book.id} to={`/product/${book.id}`} style={{ "--editor-index": index }}>
                <img src={book.image} alt={`${book.title} cover`} />
              </Link>
            ))}
          </div>
        </section>

        {/* 6. Children Books */}
        <Shelf shelf={{ title: "Children Books", subtitle: "Magic for little readers." }} items={allBooks.filter((b) => b.categories?.includes("children") || b.genre?.toLowerCase().includes("children")).slice(0, 24)} onViewAll={handleViewAll} />

        {/* 7. Teen Fiction */}
        <Shelf shelf={{ title: "Teen Fiction", subtitle: "Captivating young adult reads." }} items={allBooks.filter((b) => b.categories?.includes("teen-fiction") || b.genre?.toLowerCase().includes("teen")).slice(0, 24)} onViewAll={handleViewAll} />

        {/* 8. Fiction / Non-Fiction */}
        <Shelf shelf={{ title: "Fiction / Non-Fiction", subtitle: "From wild imaginations to real facts." }} items={allBooks.filter((b) => b.categories?.includes("fiction") || b.categories?.includes("non-fiction") || b.genre?.toLowerCase().includes("fiction")).slice(0, 24)} onViewAll={handleViewAll} />

        {/* 9. Explore by Authors */}
        <section className="discovery-section author-section" id="authors">
          <div className="shelf-heading"><div><h2>Explore by Authors</h2></div></div>
          <div className="author-grid">
            {authors.map((author) => (
              <Link key={author.name} to={`/search?q=${encodeURIComponent(author.name)}`} className="author-card" aria-label={`Browse books by ${author.name}`}>
                <div className="author-info">
                  <strong>{author.name}</strong>
                  <small>{author.genre}</small>
                </div>
                <FiChevronRight className="author-arrow" />
              </Link>
            ))}
          </div>
        </section>

        {/* 10. Extra Discount Sale */}
        <Shelf shelf={{ title: "Extra Discount Sale", subtitle: "Massive markdowns on top titles." }} items={[...allBooks].sort((a, b) => a.salePrice - b.salePrice).slice(0, 24)} onViewAll={handleViewAll} />

        {/* 11. Regional Languages */}
        <section className="discovery-section language-section" id="languages">
          <div className="shelf-heading"><div><h2>Explore by Regional Languages</h2></div></div>
          <div className="language-grid">
            {languages.map(([language, native, image]) => (
              <Link key={language} to={`/search?q=${encodeURIComponent(language)}`}>
                <span><strong>{native}</strong><small>{language}</small></span><img src={image} alt="" />
              </Link>
            ))}
          </div>
        </section>

        {/* 12. Coffee Table Books */}
        <Shelf shelf={{ title: "Coffee Table Books", subtitle: "Stunning visual statements." }} items={allBooks.filter((b) => b.categories?.includes("collector") || b.tier === "Premium" || b.tier === "Classic").slice(0, 24)} onViewAll={handleViewAll} />

        {/* Quotes Section */}
        <BookQuotesSection quotes={bookQuotes} />

        {/* 13. Choose by Pricing */}
        <section className="collection-section" id="categories">
          <div className="shelf-heading"><div><h2>Choose by Pricing</h2></div></div>
          <div className="collection-grid">
            {collections.map((collection) => {
              const to = collection.route.startsWith("category-")
                ? `/category/${collection.route.replace("category-", "")}-books`.replace("--books", "-books")
                : `/${collection.route}`;
              return (
                <Link className="collection-card gradient-reader-card" key={collection.title} to={`/catalogue?tier=${collection.route === "standard-books" ? "standard" : collection.route === "premium-books" ? "premium" : "all"}`}>
                  <img src={collection.image} alt="" />
                  <span><strong>{collection.title}</strong><small>{collection.subtitle}</small></span>
                  <FiChevronRight />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
