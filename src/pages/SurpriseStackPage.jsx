import { useEffect, useState, useRef } from "react";
import {
  FiCheck,
  FiPlus,
  FiX,
  FiShoppingBag,
  FiStar,
  FiArrowDown,
  FiHeart,
  FiSliders,
  FiLayers,
  FiPackage,
  FiBookOpen,
} from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { useAppContext } from "../context/AppContext";

const STACK_SIZES = [
  {
    id: "small",
    label: "Small",
    price: 300,
    booksCount: "Approx. 1–2 Books",
    badge: "",
    desc: "A quick mystery bite for your weekend reading.",
  },
  {
    id: "medium",
    label: "Medium",
    price: 400,
    booksCount: "Approx. 3–4 Books",
    badge: "MOST POPULAR",
    desc: "Our most loved stack — perfect balance of variety and value.",
  },
  {
    id: "large",
    label: "Large",
    price: 500,
    booksCount: "Approx. 5–6 Books",
    badge: "BEST VALUE",
    desc: "A hearty mystery bundle to keep your bookshelf overflowing.",
  },
];

const AUTHOR_OPTIONS = [
  { id: "Indian", label: "Indian Authors", desc: "Contemporary & classic Indian voices" },
  { id: "Foreign", label: "Foreign Authors", desc: "International & global bestsellers" },
];

const GENRE_OPTIONS = [
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Romance",
  "Self-Help & Motivation",
  "History & Biography",
  "Sci-Fi & Fantasy",
  "Children & Young Adult",
  "Business & Economics",
  "Classics & Literature",
];

import { books as realBooksData } from "../data/books";

// ── Real Geometrically Pure Circular Orbit (24 Distinct Real Books) ──
const ORBIT_BOOK_CONFIGS = [
  { tilt: -14, sizeMult: 1.02 },
  { tilt: 12, sizeMult: 0.96 },
  { tilt: -8, sizeMult: 1.04 },
  { tilt: 16, sizeMult: 0.98 },
  { tilt: -18, sizeMult: 1.00 },
  { tilt: 10, sizeMult: 1.03 },
  { tilt: -6, sizeMult: 0.97 },
  { tilt: 15, sizeMult: 1.01 },
  { tilt: -20, sizeMult: 0.98 },
  { tilt: 11, sizeMult: 1.05 },
  { tilt: -14, sizeMult: 1.00 },
  { tilt: 8, sizeMult: 0.96 },
  { tilt: -16, sizeMult: 1.02 },
  { tilt: 18, sizeMult: 0.99 },
  { tilt: -10, sizeMult: 1.04 },
  { tilt: 14, sizeMult: 0.95 },
  { tilt: -12, sizeMult: 1.01 },
  { tilt: 19, sizeMult: 0.98 },
  { tilt: -9, sizeMult: 1.04 },
  { tilt: 15, sizeMult: 0.97 },
  { tilt: -17, sizeMult: 1.02 },
  { tilt: 13, sizeMult: 0.96 },
  { tilt: -7, sizeMult: 1.03 },
  { tilt: 11, sizeMult: 1.00 },
];

const TOTAL_ORBIT_BOOKS = ORBIT_BOOK_CONFIGS.length; // 24

const CIRCULAR_ORBIT_BOOKS = ORBIT_BOOK_CONFIGS.map((cfg, idx) => {
  const b = realBooksData[idx % realBooksData.length] || realBooksData[0];
  return {
    id: `orbit-book-${b.id || idx}`,
    title: b.title || "Curated Book",
    author: b.author || "Acclaimed Author",
    genre: b.genre || "Fiction",
    image: b.image || "https://www.booksbykilo.in/media/staticimages/logo_t_5k.png",
    slotIndex: idx,
    tilt: cfg.tilt,
    sizeMult: cfg.sizeMult,
    mobile: idx % 2 === 0, // 12 evenly spaced books on mobile
    tablet: idx % 3 !== 0, // 16 evenly spaced books on tablet
  };
});

const HOW_IT_WORKS_STEPS = [
  {
    num: "01",
    title: "Tell Us What You Love",
    desc: "Choose your favourite genres, authors, themes, or books you've enjoyed.",
    icon: FiHeart,
  },
  {
    num: "02",
    title: "Set Your Preferences",
    desc: "Tell us your preferred reading style, stack size, and any books or topics you want to avoid.",
    icon: FiSliders,
  },
  {
    num: "03",
    title: "We Curate Your Stack",
    desc: "Our literary curators use your tastes to build a hand-picked, personalized mystery bundle.",
    icon: FiLayers,
  },
  {
    num: "04",
    title: "Receive Your Surprise Stack",
    desc: "Unbox unexpected literary gems delivered directly to your doorstep, ready to discover.",
    icon: FiPackage,
  },
];

export default function SurpriseStackPage() {
  const { addCart, setCartOpen, notify } = useAppContext();

  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedAuthors, setSelectedAuthors] = useState(["Indian", "Foreign"]);
  const [selectedGenres, setSelectedGenres] = useState(["Fiction", "Mystery & Thriller", "Non-Fiction"]);
  const [avoidInput, setAvoidInput] = useState("");
  const [avoidList, setAvoidList] = useState([]);
  const [errors, setErrors] = useState({});
  const [hoveredBook, setHoveredBook] = useState(null);

  // Pure Circular Orbit with Cosmos 3D Depth
  const heroRef = useRef(null);
  const cardsRefs = useRef({});
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1440,
    height: typeof window !== "undefined" ? window.innerHeight : 900,
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    document.title = "Surprise Stack | Books By Kilo";
    
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Real Circular Orbit Animation Loop (Smooth 3D Depth & Continuous Motion)
  useEffect(() => {
    let animationFrameId;
    let baseTime = 0;
    const targetParallax = { x: 0, y: 0 };
    const currentParallax = { x: 0, y: 0 };

    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      targetParallax.x = (clientX - centerX) / (centerX || 1);
      targetParallax.y = (clientY - centerY) / (centerY || 1);
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    const isMobile = windowDimensions.width < 768;
    const isTablet = windowDimensions.width >= 768 && windowDimensions.width < 1024;
    const heroW = windowDimensions.width;
    const heroH = windowDimensions.height;

    // Defined circular/elliptical orbital path surrounding the center
    let rx = Math.max(heroW * 0.40, 520);
    let ry = Math.max(heroH * 0.44, 340);

    if (isTablet) {
      rx = Math.max(heroW * 0.42, 380);
      ry = Math.max(heroH * 0.42, 280);
    } else if (isMobile) {
      rx = Math.max(heroW * 0.44, 180);
      ry = Math.max(heroH * 0.46, 240);
    }

    // Very slow continuous circular movement speed
    const baseSpeed = prefersReducedMotion ? 0 : 0.00065;

    const activeBooks = CIRCULAR_ORBIT_BOOKS.filter((b) => {
      if (isMobile) return b.mobile;
      if (isTablet) return b.tablet;
      return true;
    });

    const tick = () => {
      baseTime += baseSpeed;

      // Parallax smooth interpolation
      currentParallax.x += (targetParallax.x - currentParallax.x) * 0.045;
      currentParallax.y += (targetParallax.y - currentParallax.y) * 0.045;

      const total = activeBooks.length;

      for (let i = 0; i < total; i++) {
        const book = activeBooks[i];
        const el = cardsRefs.current[book.id];
        if (!el) continue;

        // Skip continuous position update if currently hovered
        if (hoveredBook === book.id) continue;

        // Real circular coordinate system:
        // Position each book along the continuous circle
        const angle = (i * 2 * Math.PI) / total + baseTime;

        const x0 = Math.cos(angle) * rx;
        const y0 = Math.sin(angle) * ry;

        // Depth factor z = sin(angle) [-1 = top/back, +1 = bottom/front]
        const z = Math.sin(angle);
        const depthNormalized = (z + 1) / 2; // 0 (deep back) to 1 (front)

        // Mouse Parallax
        const parallaxX = currentParallax.x * (isMobile ? 4 + z * 3 : 8 + z * 5);
        const parallaxY = currentParallax.y * (isMobile ? 4 + z * 3 : 8 + z * 5);

        const x = x0 + parallaxX;
        const y = y0 + parallaxY;

        // 1. Cosmos Depth Scale: Front is larger (~1.14), Back is smaller (~0.76)
        const baseCardScale = isMobile ? 0.84 : 1.0;
        const scale = baseCardScale * book.sizeMult * (0.74 + 0.38 * depthNormalized);

        // 2. Cosmos Depth Opacity: Front is 1.0, Back is 0.28
        let opacity = 0.26 + 0.74 * depthNormalized;

        // Edge vignette fade
        const normDistX = Math.abs(x) / (heroW * 0.52);
        const normDistY = Math.abs(y) / (heroH * 0.54);
        const edgeDist = Math.sqrt(normDistX * normDistX + normDistY * normDistY);
        if (edgeDist > 0.88) {
          const edgeFade = Math.max(0, 1 - (edgeDist - 0.88) / 0.24);
          opacity *= edgeFade;
        }

        const finalOpacity = Math.max(0.12, Math.min(1.0, opacity)).toFixed(2);

        // 3. Cosmos Atmospheric Blur: Front is 0px, Back is ~3.0px
        const blurPx = Math.max(0, (1 - z) * 1.5 - 0.2);

        // 4. Subtle Tilt Drift (stable rotation along orbit)
        const rotZ = book.tilt + Math.sin(baseTime * 2.0 + i) * 1.4;
        const rotX = -(y0 / ry) * 5.0;
        const rotY = (x0 / rx) * 5.0;

        // 5. Dynamic Z-Index: Front books always render in front of back books
        const zIndex = Math.round(50 + z * 35);

        // 6. Apply styles
        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0px) scale(${scale.toFixed(3)}) rotateZ(${rotZ.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) rotateX(${rotX.toFixed(1)}deg)`;
        el.style.opacity = finalOpacity;
        el.style.filter = blurPx > 0.2 ? `blur(${blurPx.toFixed(1)}px)` : "none";
        el.style.zIndex = zIndex;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [windowDimensions, prefersReducedMotion, hoveredBook]);

  const toggleAuthor = (authorId) => {
    setSelectedAuthors((prev) =>
      prev.includes(authorId) ? prev.filter((a) => a !== authorId) : [...prev, authorId]
    );
    if (errors.authors) {
      setErrors((prev) => ({ ...prev, authors: "" }));
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
    if (errors.genres) {
      setErrors((prev) => ({ ...prev, genres: "" }));
    }
  };

  const handleAddAvoidBook = (e) => {
    e?.preventDefault();
    const trimmed = avoidInput.trim();
    if (trimmed && !avoidList.includes(trimmed)) {
      setAvoidList([...avoidList, trimmed]);
      setAvoidInput("");
    }
  };

  const removeAvoidBook = (titleToRemove) => {
    setAvoidList(avoidList.filter((t) => t !== titleToRemove));
  };

  const scrollToConfigurator = (e) => {
    e?.preventDefault();
    const target = document.getElementById("configure-stack");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleAddToCart = () => {
    const newErrors = {};

    if (selectedAuthors.length === 0) {
      newErrors.authors = "Please select at least 1 author preference (Indian / Foreign).";
    }

    if (selectedGenres.length < 3) {
      newErrors.genres = "Please select a minimum of 3 genres you love.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const currentStack = STACK_SIZES.find((s) => s.id === selectedSize) || STACK_SIZES[1];

    const surpriseItem = {
      id: `surprise-stack-${currentStack.id}-${Date.now()}`,
      title: `Surprise Stack (${currentStack.label})`,
      author: `Curated: ${selectedAuthors.join(" & ")}`,
      genre: selectedGenres.slice(0, 2).join(", "),
      description: `Customized stack: ${currentStack.booksCount}. Genres: ${selectedGenres.join(", ")}.${
        avoidList.length > 0 ? ` Excluding: ${avoidList.join(", ")}` : ""
      }`,
      image: "/brand/surprise_banner.jpg",
      salePrice: currentStack.price,
      mrp: currentStack.price * 2,
      weight: currentStack.id === "small" ? 600 : currentStack.id === "medium" ? 1100 : 1600,
      tier: "Surprise Stack",
    };

    addCart(surpriseItem);
    setCartOpen(true);
    notify(`Surprise Stack (${currentStack.label} — ₹${currentStack.price}) added to cart!`);
  };

  const activeStack = STACK_SIZES.find((s) => s.id === selectedSize) || STACK_SIZES[1];
  const isMobile = windowDimensions.width < 768;
  const isTablet = windowDimensions.width >= 768 && windowDimensions.width < 1024;

  return (
    <div className="static-page surprise-stack-page">
      {/* ── Cosmos Organic Floating Book Universe Hero Section ── */}
      <section className="surprise-cosmos-hero" ref={heroRef} aria-label="Surprise Stack Hero">
        {/* Cosmos Seamless Soft Radial Glow behind Center */}
        <div className="cosmos-bg-glow" />

        {/* Geometrically Defined Circular Orbiting Book Stage */}
        <div className="cosmos-orbit-stage" aria-hidden="true">
          {CIRCULAR_ORBIT_BOOKS.filter((b) => {
            if (isMobile) return b.mobile;
            if (isTablet) return b.tablet;
            return true;
          }).map((book) => (
            <div
              key={book.id}
              ref={(el) => (cardsRefs.current[book.id] = el)}
              className={`cosmos-orbit-card ${hoveredBook === book.id ? "hovered" : ""}`}
              onMouseEnter={() => setHoveredBook(book.id)}
              onMouseLeave={() => setHoveredBook(null)}
              onClick={scrollToConfigurator}
              title={`${book.title} - ${book.author}`}
            >
              <div className="book-card-3d-wrapper">
                <img
                  src={book.image}
                  alt={book.title}
                  loading="lazy"
                  className="book-cover-img"
                  onError={(e) => {
                    e.target.src = "/books/alice.jpg";
                  }}
                />
                <div className="book-glare-overlay" />
                {hoveredBook === book.id && (
                  <div className="cosmos-card-tooltip">
                    <span className="tooltip-title">{book.title}</span>
                    <span className="tooltip-genre">{book.genre}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Center Content (Protected Exclusion Zone) */}
        <div className="cosmos-center-content">
          <span className="cosmos-kicker-label">SURPRISE STACK</span>

          <h1 className="cosmos-hero-heading">
            Your next great<br />read, a surprise.
          </h1>

          <p className="cosmos-hero-subtext">
            Handpicked books, curated just for you.
          </p>

          <div className="cosmos-hero-buttons">
            <button
              type="button"
              className="cosmos-btn-black"
              onClick={scrollToConfigurator}
            >
              Build Your Stack
            </button>
            <a
              href="#how-it-works"
              className="cosmos-btn-gray"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              How It Works
            </a>
          </div>
        </div>
      </section>

      {/* ── How It Works Section ── */}
      <section className="surprise-how-it-works-section" aria-label="How Surprise Stack Works">
        <div className="surprise-section-container">
          <div className="surprise-section-header">
            <span className="section-eyebrow">THE EXPERIENCE</span>
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Your personalized mystery stack in 4 effortless steps.
            </p>
          </div>

          <div className="how-it-works-grid">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.num} className="how-step-card">
                  <div className="step-card-top">
                    <span className="step-badge-num">{step.num}</span>
                    <div className="step-icon-bubble">
                      <IconComp />
                    </div>
                  </div>
                  <h3 className="step-card-title">{step.title}</h3>
                  <p className="step-card-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Main Preference Card / Configurator ── */}
      <section id="configure-stack" className="surprise-configurator-section" aria-label="Stack Configurator">
        <div className="surprise-container">
          <div className="surprise-configurator-card">
            <div className="surprise-card-header">
              <div className="header-badge-tag">STEP-BY-STEP CURATION</div>
              <h2>Set Your Preferences</h2>
              <p>Customize your mystery bundle with your favorite reading tastes.</p>
            </div>

            {/* 1. Size Of Book Stack */}
            <div className="surprise-step-section">
              <div className="surprise-step-title">
                <span className="step-num">1</span>
                <div>
                  <h3>Size Of Book Stack</h3>
                  <span>Choose how big you want your mystery bundle</span>
                </div>
              </div>

              <div className="surprise-sizes-grid">
                {STACK_SIZES.map((size) => (
                  <label
                    key={size.id}
                    className={`surprise-size-option ${selectedSize === size.id ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="stack_size"
                      value={size.id}
                      checked={selectedSize === size.id}
                      onChange={() => setSelectedSize(size.id)}
                    />
                    {size.badge && <span className="size-badge-pill">{size.badge}</span>}
                    <div className="size-label-row">
                      <strong>{size.label}</strong>
                      <span className="size-price">₹{size.price}/-</span>
                    </div>
                    <span className="size-books-count">{size.booksCount}</span>
                    <p className="size-desc">{size.desc}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* 2. Authors You Like */}
            <div className="surprise-step-section">
              <div className="surprise-step-title">
                <span className="step-num">2</span>
                <div>
                  <h3>Authors You Like</h3>
                  <span>Select author origins you prefer</span>
                </div>
              </div>

              <div className="surprise-authors-grid">
                {AUTHOR_OPTIONS.map((author) => {
                  const checked = selectedAuthors.includes(author.id);
                  return (
                    <button
                      type="button"
                      key={author.id}
                      className={`surprise-pill-toggle ${checked ? "active" : ""}`}
                      onClick={() => toggleAuthor(author.id)}
                    >
                      <span className="pill-check">{checked ? <FiCheck /> : <span className="pill-dot" />}</span>
                      <div className="pill-text-col">
                        <span className="pill-label">{author.label}</span>
                        {author.desc && <span className="pill-sub">{author.desc}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
              {errors.authors && <p className="surprise-error-text">{errors.authors}</p>}
            </div>

            {/* 3. Genre You Love */}
            <div className="surprise-step-section">
              <div className="surprise-step-title">
                <span className="step-num">3</span>
                <div>
                  <h3>Genre You Love</h3>
                  <span>
                    Select your favorite genres (<strong>Minimum 3 required</strong>) • {selectedGenres.length} selected
                  </span>
                </div>
              </div>

              <div className="surprise-genres-grid">
                {GENRE_OPTIONS.map((genre) => {
                  const checked = selectedGenres.includes(genre);
                  return (
                    <button
                      type="button"
                      key={genre}
                      className={`surprise-genre-pill ${checked ? "active" : ""}`}
                      onClick={() => toggleGenre(genre)}
                    >
                      {checked && <FiCheck className="genre-check-icon" />}
                      <span>{genre}</span>
                    </button>
                  );
                })}
              </div>
              {errors.genres && <p className="surprise-error-text">{errors.genres}</p>}
            </div>

            {/* 4. Titles To Avoid */}
            <div className="surprise-step-section">
              <div className="surprise-step-title">
                <span className="step-num">4</span>
                <div>
                  <h3>Titles To Avoid</h3>
                  <span>Already read something or want to skip specific titles or topics? List them here.</span>
                </div>
              </div>

              <form className="surprise-avoid-form" onSubmit={handleAddAvoidBook}>
                <input
                  type="text"
                  placeholder="Enter book title (e.g. The Alchemist, Sapiens...)"
                  value={avoidInput}
                  onChange={(e) => setAvoidInput(e.target.value)}
                  maxLength={200}
                />
                <button type="submit" className="surprise-add-avoid-btn">
                  <FiPlus /> Add Title
                </button>
              </form>

              {avoidList.length > 0 && (
                <div className="surprise-avoid-tags-wrap">
                  <span className="avoid-tags-label">
                    Excluding {avoidList.length} {avoidList.length === 1 ? "title" : "titles"}:
                  </span>
                  <div className="surprise-avoid-tags">
                    {avoidList.map((title) => (
                      <span key={title} className="surprise-avoid-tag">
                        {title}
                        <button
                          type="button"
                          onClick={() => removeAvoidBook(title)}
                          aria-label={`Remove ${title}`}
                        >
                          <FiX />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Summary & Add to Cart Action ── */}
            <div className="surprise-summary-footer">
              <div className="surprise-summary-info">
                <span className="summary-kicker">SELECTED BUNDLE</span>
                <strong className="summary-stack-title">
                  Surprise Stack — {activeStack.label} (₹{activeStack.price})
                </strong>
                <span className="summary-meta">
                  {activeStack.booksCount} • {selectedAuthors.length} Author types • {selectedGenres.length} Genres
                </span>
              </div>

              <button
                type="button"
                className="cta surprise-add-cart-btn"
                onClick={handleAddToCart}
              >
                <FiShoppingBag /> Add To Cart • ₹{activeStack.price}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
