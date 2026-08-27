import { useEffect, useState } from "react";
import {
  FiCheck,
  FiPlus,
  FiX,
  FiShoppingBag,
  FiStar,
} from "react-icons/fi";
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
  { id: "Indian", label: "Indian Authors" },
  { id: "Foreign", label: "Foreign Authors" },
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

export default function SurpriseStackPage() {
  const { addCart, setCartOpen, notify } = useAppContext();

  const [selectedSize, setSelectedSize] = useState("medium");
  const [selectedAuthors, setSelectedAuthors] = useState(["Indian", "Foreign"]);
  const [selectedGenres, setSelectedGenres] = useState(["Fiction", "Mystery & Thriller", "Non-Fiction"]);
  const [avoidInput, setAvoidInput] = useState("");
  const [avoidList, setAvoidList] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.title = "Surprise Stack | Books By Kilo";
  }, []);

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

  return (
    <div className="static-page surprise-stack-page">
      {/* ── Banner ── */}
      <div className="surprise-hero">
        <div className="surprise-hero-inner">
          <div className="surprise-hero-badge">
            <FiStar /> BE AMAZED WITH BOOKS
          </div>
          <h1>Surprise Stack</h1>
          <p className="surprise-hero-text">
            Based on your preferences, we handpick books from our store. Each stack of books is unique, and books are chosen at random after taking into account your preferences. No need to stress about what to read next; simply set your preference and we'll take care of the rest.
          </p>
        </div>
      </div>

      {/* ── Main Preference Card ── */}
      <div className="surprise-container">
        <div className="surprise-configurator-card">
          <div className="surprise-card-header">
            <h2>Set Your Preference</h2>
            <p>Customize your mystery bundle in 4 simple steps.</p>
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
                    <span className="pill-label">{author.label}</span>
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
                <span>Already read something or want to skip certain books? List them here.</span>
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
                <span className="avoid-tags-label">Excluding {avoidList.length} {avoidList.length === 1 ? "title" : "titles"}:</span>
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
    </div>
  );
}
