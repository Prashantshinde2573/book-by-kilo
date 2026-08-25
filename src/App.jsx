import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiHeart,
  FiInfo,
  FiMenu,
  FiMinus,
  FiPlus,
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiX,
  FiStar,
  FiInstagram,
  FiYoutube,
  FiMessageCircle,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFire, FaPlay } from "react-icons/fa";

const books = [
  { id: 1, title: "Bright Eyes, Brown Skin", author: "Cheryl Willis Hudson", image: "/books/bright-eyes.jpg", genre: "Children Books", tier: "Standard", price: 299, weight: 450, match: 95, description: "A heartfelt story about friendship, family and learning to be proud of who you are." },
  { id: 2, title: "Alice in Wonderland", author: "Lewis Carroll", image: "/books/alice.jpg", genre: "Classic Books", tier: "Classic", price: 399, weight: 310, match: 98, description: "Follow Alice down the rabbit hole into a curious world of unforgettable characters." },
  { id: 3, title: "When It Snows", author: "Richard Collingridge", image: "/books/when-it-snows.jpg", genre: "Children Books", tier: "Premium", price: 499, weight: 380, match: 92, description: "A magical winter journey through an enchanting snowy world." },
  { id: 4, title: "TimeTime", author: "Nina Filipek", image: "/books/timetime.jpg", genre: "Children Books", tier: "Standard", price: 299, weight: 220, match: 88, description: "A bright and playful first exploration of clocks, hours and everyday time." },
  { id: 5, title: "Dinosaurs, Dinosaurs", author: "Byron Barton", image: "/books/dinosaurs.jpg", genre: "Children Books", tier: "Classic", price: 399, weight: 340, match: 96, description: "Bold illustrations and simple words bring the prehistoric world roaring to life." },
  { id: 6, title: "What Are Rivers?", author: "Mari C. Schuh", image: "/books/rivers.jpg", genre: "Non-Fiction Books", tier: "Standard", price: 299, weight: 180, match: 84, description: "A clear, lively introduction to rivers and the landscapes they shape." },
  { id: 7, title: "Keira the Film Star Fairy", author: "Daisy Meadows", image: "/books/keira.jpg", genre: "Teen Fiction", tier: "Standard", price: 299, weight: 190, match: 91, description: "A sparkling Rainbow Magic adventure packed with friendship and fantasy." },
  { id: 8, title: "Hamstermagic", author: "Holly Webb", image: "/books/hamstermagic.jpg", genre: "Fiction Books", tier: "Standard", price: 299, weight: 230, match: 86, description: "A funny animal adventure where a little magic creates a very big surprise." },
  { id: 9, title: "Kid Wonder and the Half-Hearted Hero", author: "Stephen Elboz", image: "/books/kid-wonder.jpg", genre: "Fiction Books", tier: "Classic", price: 399, weight: 290, match: 82, description: "A witty superhero story about courage, chaos and an unlikely young champion." },
  { id: 10, title: "Pokémon: The Epic Pocket Guide", author: "Pokémon", image: "/books/pokemon.jpg", genre: "Children Books", tier: "Premium", price: 499, weight: 410, match: 99, description: "Facts, stats and essential knowledge for trainers exploring the world of Pokémon." },
  { id: 11, title: "The Umbrella Tree", author: "Anne Mangan", image: "/books/umbrella-tree.jpg", genre: "Fiction Books", tier: "Classic", price: 399, weight: 260, match: 87, description: "A warm young reader adventure about imagination, kindness and discovery." },
  { id: 12, title: "Rainbow Magic", author: "Daisy Meadows", image: "/books/rainbow-magic.jpg", genre: "Teen Fiction", tier: "Premium", price: 499, weight: 520, match: 94, description: "A complete collection of fairy adventures made for dreamy young readers." },
  { id: 13, title: "The Big Kick", author: "Rob Childs", image: "/books/big-kick.jpg", genre: "Fiction Books", tier: "Standard", price: 299, weight: 210, match: 81, description: "Fast, funny football fiction about teamwork and finding your confidence." },
  { id: 14, title: "Raiders!", author: "Lynne Benton", image: "/books/raiders.jpg", genre: "Fiction Books", tier: "Standard", price: 299, weight: 180, match: 79, description: "An action-packed tale for newly independent readers." },
  { id: 15, title: "King Lear", author: "William Shakespeare", image: "/books/king-lear.jpg", genre: "Classic Books", tier: "Premium", price: 499, weight: 350, match: 93, description: "Shakespeare's towering tragedy of power, pride, loyalty and family." },
  { id: 16, title: "Much Ado About Nothing", author: "William Shakespeare", image: "/books/much-ado.jpg", genre: "Classic Books", tier: "Premium", price: 499, weight: 360, match: 90, description: "A witty classic of romance, rivalry, deception and irresistible banter." },
  { id: 17, title: "Blippi", author: "Studio Fun International", image: "/books/blippi.jpg", genre: "Children Books", tier: "Classic", price: 399, weight: 430, match: 85, description: "Curious learning and colorful fun for little readers." },
  { id: 18, title: "That's Not My Snowman", author: "Fiona Watt", image: "/books/snowman.jpg", genre: "Children Books", tier: "Classic", price: 399, weight: 300, match: 97, description: "A touch-and-feel winter favorite for tiny hands and growing imaginations." },
];

const shelves = [
  { key: "new-books", title: "New Books — Up to 80% Off" },
  { key: "children", title: "Children Books" },
  { key: "teen-fiction", title: "Teen Fiction" },
  { key: "fiction", title: "Fiction Books" },
  { key: "non-fiction", title: "Non-Fiction Books" },
  { key: "premium", title: "Premium Books", accent: "₹499/kg" },
  { key: "classic", title: "Classic Books", accent: "₹399/kg" },
  { key: "standard", title: "Standard Books", accent: "₹299/kg" },
  { key: "collector", title: "Coffee Table & Collector Books" },
];

const collections = [
  { title: "New Books", subtitle: "Up to 80% off", image: "/brand/new-books.webp" },
  { title: "Premium Books", subtitle: "₹499/kg", image: "/brand/premium.webp" },
  { title: "Non-Fiction", subtitle: "Books around us", image: "/brand/non-fiction.webp" },
  { title: "Children Books", subtitle: "The best childhood", image: "/brand/children.webp" },
  { title: "Classic Books", subtitle: "₹399/kg", image: "/brand/classic.webp" },
  { title: "Standard Books", subtitle: "₹299/kg", image: "/brand/standard.webp" },
  { title: "Collector Books", subtitle: "Coffee table editions", image: "/brand/coffee.webp" },
  { title: "Surprise Stack", subtitle: "Starting ₹300", image: "/brand/surprise.webp" },
];

const internetNewBooks = [
  { id: "new-departures", title: "Departure(s)", author: "Julian Barnes", image: "https://upload.wikimedia.org/wikipedia/en/6/62/Departure%28s%29_%28novel%29.png", categories: ["new-books", "fiction"], genre: "Fiction", tier: "New", price: 499, weight: 320, match: 97, description: "Julian Barnes blends fiction, memory and reflection in his 2026 novel." },
  { id: "new-half-his-age", title: "Half His Age", author: "Jennette McCurdy", image: "https://covers.openlibrary.org/b/isbn/9780593723739-L.jpg", categories: ["new-books", "fiction"], genre: "Fiction", tier: "New", price: 499, weight: 410, match: 95, description: "A provocative 2026 debut novel about power, desire and identity." },
  { id: "new-secret-secrets", title: "The Secret of Secrets", author: "Dan Brown", image: "https://covers.openlibrary.org/b/isbn/9780385546898-L.jpg", categories: ["new-books", "fiction"], genre: "Mystery & Thriller", tier: "New", price: 499, weight: 560, match: 98, description: "Robert Langdon returns in Dan Brown's bestselling mystery thriller." },
  { id: "new-alchemised", title: "Alchemised", author: "SenLinYu", image: "https://covers.openlibrary.org/b/isbn/9780593972700-L.jpg", categories: ["new-books", "fiction"], genre: "Fantasy", tier: "New", price: 499, weight: 720, match: 96, description: "An ambitious gothic fantasy debut filled with alchemy, memory and war." },
  { id: "new-typewriter", title: "The Typewriter and the Guillotine", author: "Mark Braude", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/The_Typewriter_and_the_Guillotine_%28Book_Cover%29.jpeg/500px-The_Typewriter_and_the_Guillotine_%28Book_Cover%29.jpeg", categories: ["new-books", "non-fiction"], genre: "History & Politics", tier: "New", price: 499, weight: 480, match: 91, description: "A gripping true story of journalism, crime and Paris on the eve of war." },
];

const publishers = [
  { name: "Penguin Random House", mark: "penguin" },
  { name: "HarperCollins", mark: "harper" },
  { name: "Scholastic", mark: "scholastic" },
  { name: "Macmillan", mark: "macmillan" },
  { name: "Hachette", mark: "hachette" },
  { name: "Usborne", mark: "usborne" },
  { name: "Oxford University Press", mark: "oxford" },
  { name: "Simon & Schuster", mark: "simon" },
];

function PublisherMark({ kind }) {
  switch (kind) {
    case "penguin":
      return (
        <span className="pub-mark pub-penguin">
          <em>PENGUIN</em>
          <b>RANDOM HOUSE</b>
        </span>
      );
    case "harper":
      return <span className="pub-mark pub-harper">HarperCollins<i>Publishers</i></span>;
    case "scholastic":
      return <span className="pub-mark pub-scholastic">SCHOLASTIC</span>;
    case "macmillan":
      return <span className="pub-mark pub-macmillan">MACMILLAN</span>;
    case "hachette":
      return <span className="pub-mark pub-hachette">hachette</span>;
    case "usborne":
      return <span className="pub-mark pub-usborne">Usborne</span>;
    case "oxford":
      return (
        <span className="pub-mark pub-oxford">
          <em>OXFORD</em>
          <b>UNIVERSITY PRESS</b>
        </span>
      );
    case "simon":
      return (
        <span className="pub-mark pub-simon">
          Simon <i>&amp;</i> Schuster
        </span>
      );
    default:
      return null;
  }
}
const genres = [
  ["Children", "Picture books, learning & wonder", "/brand/children.webp"],
  ["Fiction", "Stories to disappear into", "/books/alice.jpg"],
  ["Non-Fiction", "Ideas, lives & the real world", "/brand/non-fiction.webp"],
  ["Classics", "Timeless books worth revisiting", "/brand/classic.webp"],
  ["Teen Fiction", "Bold stories for new generations", "/books/keira.jpg"],
  ["History", "People, places & turning points", "/catalog/9781416548485-better.jpg"],
  ["Business", "Ideas that move careers forward", "/catalog/9780312541866-better.jpg"],
  ["Biography", "Remarkable lives, honestly told", "/catalog/9781443408486-better.jpg"],
];
const languages = [
  ["English", "English", "/books/alice.jpg"],
  ["Hindi", "हिन्दी", "/books/king-lear.jpg"],
  ["Marathi", "मराठी", "/brand/classic.webp"],
  ["Bengali", "বাংলা", "/books/bright-eyes.jpg"],
  ["Gujarati", "ગુજરાતી", "/brand/non-fiction.webp"],
  ["Tamil", "தமிழ்", "/books/much-ado.jpg"],
];
const navItems = [
  ["Home", "home"], ["All Books", "all"], ["Categories", "categories"], ["₹/kg Store", "store"],
  ["Surprise Stack", "surprise"], ["Bulk Books", "bulk"], ["Bestsellers", "bestsellers"], ["New Arrivals", "new"],
];

const googleReviewSlide = {
  id: "google-review-slide",
  isGoogleReview: true,
  title: "Google Rating 4.8",
  author: "Verified Google Reviews",
  rating: "4.8",
  reviewsCount: "379 Reviews",
  starImage: "https://www.booksbykilo.in/media/staticimages/star.png",
  description: "Rated 4.8 out of 5 stars by 379+ verified book lovers across India. Highest rated online store for authentic pre-loved books by weight.",
  image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=60",
};

function BookCard({ book, onOpen, onCart, saved, onSave, rank }) {
  const [preview, setPreview] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const cancelTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const schedulePreview = (event) => {
    cancelTimers();
    const rect = event.currentTarget.getBoundingClientRect();
    openTimer.current = window.setTimeout(() => {
      const width = Math.min(430, window.innerWidth - 32);
      const estimatedHeight = Math.min(590, window.innerHeight - 32);
      const halfHeight = estimatedHeight / 2;
      const left = Math.min(
        window.innerWidth - width / 2 - 16,
        Math.max(width / 2 + 16, rect.left + rect.width / 2),
      );
      const centerY = Math.min(
        window.innerHeight - halfHeight - 16,
        Math.max(halfHeight + 16, rect.top + rect.height / 2),
      );
      setPreview({ left, top: centerY, width });
    }, 500);
  };
  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setPreview(null), 120);
  };
  useEffect(() => {
    if (!preview) return undefined;
    const closePreview = () => setPreview(null);
    document.addEventListener("wheel", closePreview, { passive: true, capture: true });
    document.addEventListener("touchmove", closePreview, { passive: true, capture: true });
    document.addEventListener("scroll", closePreview, { passive: true, capture: true });
    window.addEventListener("resize", closePreview);
    return () => {
      document.removeEventListener("wheel", closePreview, true);
      document.removeEventListener("touchmove", closePreview, true);
      document.removeEventListener("scroll", closePreview, true);
      window.removeEventListener("resize", closePreview);
    };
  }, [preview]);

  return (
    <article className={`book-card ${rank ? "ranked" : ""} ${preview ? "preview-active" : ""}`}>
      {rank && <span className="rank-number">{rank}</span>}
      <button className="book-cover" onMouseEnter={schedulePreview} onMouseLeave={scheduleClose} onClick={() => onOpen(book)} aria-label={`View ${book.title}`}>
        <img className="cover-backdrop" src={book.image} alt="" aria-hidden="true" />
        <img className="cover-foreground" src={book.image} alt={`${book.title} by ${book.author}`} />
        <div className="cover-price-badge">
          <span>₹{book.price}</span><small>/kg</small>
        </div>
      </button>
      {preview && createPortal(<div
        className="card-preview portal-preview"
        style={{ left: preview.left, top: preview.top, width: preview.width }}
        onMouseEnter={cancelTimers}
        onMouseLeave={scheduleClose}
      >
        <div className="preview-art">
          <img className="preview-blur" src={book.image} alt="" aria-hidden="true" />
          <img className="preview-cover" src={book.image} alt="" aria-hidden="true" />
        </div>
        <div className="preview-body">
          <strong>{book.title}</strong>
          <span className="preview-author">by {book.author}</span>
          <div className="preview-stats">
            <span className="match">{book.match}% Match</span>
            <span>{book.weight}g</span>
            <span>{book.tier}</span>
          </div>
          <p>{book.description || `A quality-checked Books by Kilo edition of ${book.title}.`}</p>
          <b>₹{book.price}/kg</b>
        </div>
        <div className="card-actions">
          <button className="preview-action primary" onClick={() => onOpen(book)} aria-label={`View ${book.title}`}><FiInfo /> View</button>
          <button className="preview-action" onClick={() => onCart(book)} aria-label={`Add ${book.title} to cart`}><FiShoppingCart /> Add to Cart</button>
          <button className={`preview-action list-action ${saved ? "saved" : ""}`} onClick={() => onSave(book)} aria-label={`${saved ? "Remove" : "Add"} ${book.title} ${saved ? "from" : "to"} My List`}>
            {saved ? <FiCheck /> : <FiHeart />} {saved ? "In My List" : "My List"}
          </button>
        </div>
      </div>, document.body)}
    </article>
  );
}

function Shelf({ shelf, items, onOpen, onCart, list, onSave, rank }) {
  const id = `shelf-${shelf.title.replace(/\W/g, "-")}`;
  const railRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: false, right: true });
  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    setScrollState({
      left: rail.scrollLeft > 8,
      right: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 8,
    });
  };
  const scroll = (direction) => {
    railRef.current?.scrollBy({ left: direction * window.innerWidth * 0.72, behavior: "smooth" });
  };
  useEffect(() => {
    updateScrollState();
    const rail = railRef.current;
    if (!rail) return undefined;
    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [items.length]);
  return (
    <section className="shelf-section">
      <div className="shelf-heading">
        <h2>{shelf.title} {shelf.accent && <span>{shelf.accent}</span>}</h2>
        {!rank && <button>View All <FiChevronRight /></button>}
      </div>
      <div className="shelf-wrap">
        <button className={`rail-arrow left ${scrollState.left ? "available" : ""}`} disabled={!scrollState.left} onClick={() => scroll(-1)} aria-label="Scroll shelf left"><FiChevronLeft /></button>
        <div className="book-rail" id={id} ref={railRef}>
          {items.map((book, index) => (
            <BookCard key={`${shelf.title}-${book.id}`} book={book} onOpen={onOpen} onCart={onCart} saved={list.includes(book.id)} onSave={onSave} rank={rank ? index + 1 : undefined} />
          ))}
        </div>
        <button className={`rail-arrow right ${scrollState.right ? "available" : ""}`} disabled={!scrollState.right} onClick={() => scroll(1)} aria-label="Scroll shelf right"><FiChevronRight /></button>
      </div>
    </section>
  );
}

function ProductDetailPage({ book, onBack, onCart, list, onSave, allBooks, onSelectBook }) {
  const [recFilter, setRecFilter] = useState("genre");

  const recommendations = useMemo(() => {
    if (!book) return [];
    if (recFilter === "author") {
      const matchAuthor = allBooks.filter((b) => b.id !== book.id && b.author.toLowerCase() === book.author.toLowerCase());
      if (matchAuthor.length >= 2) return matchAuthor;
    }
    return allBooks.filter((b) => b.id !== book.id && (b.genre === book.genre || b.categories?.includes(book.categories?.[0])));
  }, [book, recFilter, allBooks]);

  if (!book) return null;

  return (
    <section className="pdp-page">
      <div className="pdp-top-bar">
        <button className="pdp-back-btn" onClick={onBack}>
          <FiChevronLeft /> Back to catalog
        </button>
        <div className="pdp-breadcrumbs">
          <span>Catalog</span> / <span>{book.genre || "Books"}</span> / <strong>{book.title}</strong>
        </div>
      </div>

      <div className="pdp-main-card">
        <div className="pdp-visual">
          <img className="pdp-bg-blur" src={book.image} alt="" aria-hidden="true" />
          <img className="pdp-cover" src={book.image} alt={`${book.title} by ${book.author}`} />
        </div>

        <div className="pdp-details">
          <span className="eyebrow">{book.genre || "FEATURED BOOK"}</span>
          <h1 className="pdp-title">{book.title}</h1>
          <p className="byline">by {book.author}</p>

          <div className="pdp-meta-row">
            <span className="pdp-match">{book.match}% Match</span>
            <span className="pdp-badge"><FiCheck /> Quality Checked</span>
            <span className="pdp-badge">{book.weight}g</span>
            <span className="pdp-badge">{book.tier || "Standard"} Tier</span>
          </div>

          <div className="pdp-price-box">
            <span className="pdp-price">₹{book.price}</span>
            <span className="pdp-unit">/kg</span>
          </div>

          <p className="description">{book.description || `A quality-checked Books by Kilo edition of ${book.title}.`}</p>

          <div className="hero-actions pdp-actions">
            <button className="cta" onClick={() => onCart(book)}>
              <FiShoppingCart /> Add to Cart <b>₹{book.price}/kg</b>
            </button>
            <button className={`secondary ${list.includes(book.id) ? "saved" : ""}`} onClick={() => onSave(book)}>
              {list.includes(book.id) ? <FiCheck /> : <FiHeart />} {list.includes(book.id) ? "In My List" : "Add to My List"}
            </button>
          </div>

          <div className="pdp-guarantee-grid">
            <div><FiCheck /> 100% Authentic Quality-Checked</div>
            <div><FiCheck /> 7-Day Easy Replacement Guarantee</div>
            <div><FiCheck /> Fast Pan-India Delivery</div>
          </div>
        </div>
      </div>

      <div className="pdp-rec-section">
        <div className="pdp-rec-header">
          <div>
            <span className="pdp-rec-kicker">CURATED RECOMMENDATIONS</span>
            <h2>You Might Also Like</h2>
          </div>
          <div className="pdp-rec-tabs">
            <button className={recFilter === "genre" ? "active" : ""} onClick={() => setRecFilter("genre")}>
              Same Genre
            </button>
            <button className={recFilter === "author" ? "active" : ""} onClick={() => setRecFilter("author")}>
              Same Author
            </button>
          </div>
        </div>

        <div className="shelf-wrap">
          <div className="book-rail pdp-rec-rail">
            {recommendations.slice(0, 16).map((recBook) => (
              <BookCard
                key={`rec-${recBook.id}`}
                book={recBook}
                onOpen={(b) => { onSelectBook(b); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                onCart={onCart}
                saved={list.includes(recBook.id)}
                onSave={onSave}
              />
            ))}
            {!recommendations.length && (
              <div className="empty">No other books found in this filter.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function App() {
  const [catalog, setCatalog] = useState([]);
  const [heroIndex, setHeroIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([2, 10, 15]);
  const [toast, setToast] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/catalog.json")
      .then((response) => response.json())
      .then((items) => {
        if (!active) return;
        setCatalog(items.map((book, index) => ({
          ...book,
          genre: book.categories?.[0] || "Books",
          description: `A quality-checked Books by Kilo edition of ${book.title} by ${book.author}.`,
          id: book.id || `catalog-${index}`,
        })));
      })
      .catch(() => setCatalog([]));
    return () => { active = false; };
  }, []);

  const allBooks = catalog.length ? catalog : books;
  const preferredHeroTitles = [
    "Bright Eyes, Brown Skin",
    "Alice in Wonderland",
    "King Lear",
    "Much Ado about Nothing",
    "When It Snows",
  ];
  const heroBooks = preferredHeroTitles
    .map((title) => allBooks.find((book) => book.title.toLowerCase() === title.toLowerCase()))
    .filter(Boolean);
  const featuredBooks = heroBooks.length === 5 ? heroBooks : allBooks.slice(0, 5);

  const heroSlides = useMemo(() => [
    featuredBooks[0],
    featuredBooks[1],
    googleReviewSlide,
    ...featuredBooks.slice(2)
  ].filter(Boolean), [featuredBooks]);

  const featured = heroSlides[heroIndex] || heroSlides[0];
  const heroTitle = featured.title === "When It Snows"
    ? <>When It<br />Snows</>
    : featured.title === "King Lear"
      ? <>The Adventure of<br />King Lear</>
      : featured.title;

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const timer = window.setInterval(() => {
      setHeroIndex((index) => (index + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [heroSlides.length]);

  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    const result = allBooks.filter((book) => {
      const searchMatch = !value || [book.title, book.author, book.genre, book.tier, ...(book.categories || [])].some((field) => String(field).toLowerCase().includes(value));
      const categoryMatch = categoryFilter === "all" || book.categories?.includes(categoryFilter);
      const tierMatch = tierFilter === "all" || book.tier?.toLowerCase() === tierFilter;
      const pageMatch =
        page === "home" || page === "all" || page === "categories" ||
        (page === "new" && book.categories?.includes("new-books")) ||
        (page === "bestsellers" && book.match >= 93) ||
        (page === "store" && book.price <= 399) ||
        (page === "surprise" && book.match >= 88) ||
        (page === "bulk" && book.weight >= 350);
      return searchMatch && categoryMatch && tierMatch && pageMatch;
    });
    return [...result].sort((a, b) => sortBy === "price-low" ? a.price - b.price : sortBy === "weight" ? b.weight - a.weight : b.match - a.match);
  }, [query, allBooks, categoryFilter, tierFilter, sortBy, page]);

  const openPage = (nextPage) => {
    setPage(nextPage);
    setSelected(null);
    setQuery("");
    setCategoryFilter("all");
    setTierFilter("all");
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };
  const addCart = (book) => {
    setCart((items) => [...items, book]);
    notify(`${book.title} added to your cart`);
  };
  const toggleList = (book) => {
    setList((items) => items.includes(book.id) ? items.filter((id) => id !== book.id) : [...items, book.id]);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand text-brand" href="#home" aria-label="Books by Kilo home" onClick={(event) => { event.preventDefault(); openPage("home"); }}>
          <span>BOOKS BY</span><strong>KILO</strong>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <FiX /> : <FiMenu />}</button>
        <nav className={menuOpen ? "open" : ""}>
          {navItems.map(([label, value]) => (
            <a key={value} href={`#${value}`} className={page === value ? "active" : ""} onClick={(event) => { event.preventDefault(); openPage(value); }}>{label}</a>
          ))}
        </nav>
        <div className={`search ${searchOpen || query ? "open" : ""}`}>
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search books"><FiSearch /></button>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author or genre..." aria-label="Search title, author or genre" />
          {query && <button onClick={() => setQuery("")} aria-label="Clear search"><FiX /></button>}
        </div>
        <div className="header-actions">
          <button className="list-button" onClick={() => notify(`${list.length} books in My List`)}><FiHeart /> <span>My List</span></button>
          <button className="cart-button" onClick={() => notify(`${cart.length} books in your cart`)}><FiShoppingCart /> <span>Cart</span>{cart.length > 0 && <b>{cart.length}</b>}</button>
          <div className="profile-wrapper">
            <button className="account-button" aria-label="Account" onClick={() => setProfileOpen(!profileOpen)}><FiUser /></button>
            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-user-info">
                  <div className="profile-avatar"><FiUser /></div>
                  <div>
                    <strong>Prashant Shinde</strong>
                    <small>Reader Member</small>
                  </div>
                </div>
                <hr />
                <button onClick={() => { notify("My Orders coming soon"); setProfileOpen(false); }}>My Orders</button>
                <button onClick={() => { notify(`${list.length} books in My List`); setProfileOpen(false); }}>Saved Books ({list.length})</button>
                <button onClick={() => { notify("Account Settings"); setProfileOpen(false); }}>Settings</button>
                <hr />
                <button className="signout-btn" onClick={() => { notify("Signed out"); setProfileOpen(false); }}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main id="home">
        {selected ? (
          <ProductDetailPage
            book={selected}
            onBack={() => setSelected(null)}
            onCart={addCart}
            list={list}
            onSave={toggleList}
            allBooks={allBooks}
            onSelectBook={(b) => setSelected(b)}
          />
        ) : query || page !== "home" ? (
          <section className="search-results catalog-page">
            <span className="catalog-kicker">BOOKS BY KILO CATALOG</span>
            <div className="results-head"><h1>{query ? `Results for “${query}”` : navItems.find((item) => item[1] === page)?.[0]}</h1><span>{filtered.length} books found</span></div>
            <div className="catalog-toolbar">
              <div className="filter-group">
                {["all", "children", "fiction", "non-fiction", "teen-fiction", "collector"].map((filter) => <button key={filter} className={categoryFilter === filter ? "active" : ""} onClick={() => setCategoryFilter(filter)}>{filter === "all" ? "All genres" : filter.replace("-", " ")}</button>)}
              </div>
              <div className="catalog-selects">
                <select value={tierFilter} onChange={(event) => setTierFilter(event.target.value)} aria-label="Filter by tier"><option value="all">All prices</option><option value="standard">₹299/kg</option><option value="classic">₹399/kg</option><option value="premium">₹499/kg</option><option value="new">New books</option></select>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort books"><option value="match">Most relevant</option><option value="price-low">Price: low first</option><option value="weight">Heaviest first</option></select>
              </div>
            </div>
            <div className="results-grid">
              {filtered.map((book) => <BookCard key={book.id} book={book} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} saved={list.includes(book.id)} onSave={toggleList} />)}
            </div>
            {!filtered.length && <div className="empty">No matches yet. Try an author, genre or collection tier.</div>}
          </section>
        ) : (
          <>
            <section className="hero">
              <div className="hero-art">
                <img key={`backdrop-${featured.id}`} className="hero-backdrop" src={featured.image} alt="" aria-hidden="true" />
                {featured.isGoogleReview ? (
                  <div className="google-hero-badge-art">
                    <div className="thumb-style-g-badge">
                      <div className="g-art-circle"><FcGoogle size={32} /></div>
                      <div className="g-art-rating">4.8 ★</div>
                      <img className="g-art-stars" src={featured.starImage} alt="5 stars rating" />
                      <span className="g-art-count">379 Verified Reviews</span>
                    </div>
                  </div>
                ) : (
                  <img key={`book-${featured.id}`} className="hero-book" src={featured.image} alt={`${featured.title} cover`} />
                )}
              </div>
              {featured.isGoogleReview ? (
                <div className="hero-copy google-hero-copy">
                  <div className="google-review-header-flex">
                    <div>
                      <span className="eyebrow">VERIFIED GOOGLE REVIEWS</span>
                      <h1 className="google-hero-title">Google Rating <em>4.8</em></h1>
                    </div>
                    <div className="google-official-logo">
                      <FcGoogle size={32} />
                    </div>
                  </div>
                  <div className="google-reviews-meta">
                    <img className="google-star-strip" src={featured.starImage} alt="5 stars" />
                    <span className="google-reviews-badge">379 Reviews</span>
                  </div>
                  <p className="byline">over 50,000+ happy readers across India</p>
                  <p className="description">{featured.description}</p>
                  <div className="hero-actions">
                    <button className="cta" onClick={() => openPage("all")}><FiShoppingCart /> Shop Bestsellers <b>₹299/kg</b></button>
                    <button className="secondary" onClick={() => notify("Rated 4.8/5 on Google Reviews from 379+ customers")}><FiStar /> 379 Reviews</button>
                  </div>
                </div>
              ) : (
                <div className="hero-copy">
                  <span className="eyebrow">BOOKS BY KILO FEATURED</span>
                  <h1>{heroTitle}</h1>
                  <p className="byline">by {featured.author}</p>
                  <div className="hero-meta"><span><FiCheck /> Good Condition</span><span>{featured.weight}g</span><span>{featured.genre || featured.categories?.[0]}</span></div>
                  <p className="description">{featured.description || `A quality-checked Books by Kilo edition of ${featured.title}.`}</p>
                  <div className="hero-actions">
                    <button className="cta" onClick={() => addCart(featured)}><FiShoppingCart /> Add to Cart <b>₹{featured.price}/kg</b></button>
                    <button className="secondary" onClick={() => { setSelected(featured); window.scrollTo({ top: 0, behavior: "smooth" }); }}><FiInfo /> More Info</button>
                    <button className="text-button" onClick={() => toggleList(featured)}>{list.includes(featured.id) ? <FiCheck /> : <FiPlus />} My List</button>
                  </div>
                </div>
              )}
              <div className="hero-slider" aria-label="Featured books">
                <div className="hero-thumbnails">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      className={`hero-thumb-btn ${index === heroIndex ? "active" : ""}`}
                      onClick={() => setHeroIndex(index)}
                      aria-label={`Slide ${index + 1}: ${slide.title || 'Google Reviews'}`}
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
              <div className="top-ten-shelf">
                <Shelf shelf={{ title: "Top 10 Books This Week" }} items={[...allBooks].sort((a, b) => b.match - a.match).slice(0, 10)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} rank />
              </div>
              {shelves.slice(0, 2).map((shelf) => (
                <Shelf key={shelf.title} shelf={shelf} items={(shelf.key === "new-books" ? [...internetNewBooks, ...allBooks.filter((book) => book.categories?.includes(shelf.key))] : allBooks.filter((book) => book.categories?.includes(shelf.key))).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} />
              ))}

              <section className="discovery-section publisher-section">
                <div className="shelf-heading"><h2>Browse by publication</h2></div>
                <div className="publisher-grid">
                  {publishers.map((publisher, index) => (
                    <button key={publisher.name} style={{ "--publisher-index": index }} onClick={() => setQuery(publisher.name)} aria-label={`Browse ${publisher.name}`}>
                      <PublisherMark kind={publisher.mark} />
                    </button>
                  ))}
                </div>
              </section>

              {shelves.slice(2, 4).map((shelf) => (
                <Shelf key={shelf.title} shelf={shelf} items={allBooks.filter((book) => book.categories?.includes(shelf.key)).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} />
              ))}

              <section className="discovery-section genre-section" id="genres">
                <div className="shelf-heading"><h2>Explore by genre</h2></div>
                <div className="genre-grid">
                  {genres.map(([title, subtitle, image], index) => (
                    <button key={title} className={`genre-card genre-${index + 1}`} onClick={() => { setQuery(title); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <img src={image} alt="" />
                      <b className="genre-number">{String(index + 1).padStart(2, "0")}</b>
                      <span className="genre-meta">
                        <strong>{title}</strong>
                        <small>{subtitle}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="gradient-highlight">
                <div className="editor-copy">
                  <span className="eyebrow">CURATED FOR CURIOUS READERS</span>
                  <h2>Editor’s Picks</h2>
                  <p>Five books our team can’t stop recommending—fiction, ideas and beautiful editions, all priced by the kilo.</p>
                  <button onClick={() => openPage("bestsellers")}>Explore Editor’s Picks <FiChevronRight /></button>
                </div>
                <div className="editor-stack">
                  {[...allBooks].sort((a, b) => b.match - a.match).slice(0, 5).map((book, index) => (
                    <button key={book.id} style={{ "--editor-index": index }} onClick={() => { setSelected(book); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label={`View ${book.title}`}><img src={book.image} alt={`${book.title} cover`} /></button>
                  ))}
                </div>
              </section>

              {shelves.slice(4, 6).map((shelf) => (
                <Shelf key={shelf.title} shelf={shelf} items={allBooks.filter((book) => book.categories?.includes(shelf.key)).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} />
              ))}

              <section className="discovery-section language-section">
                <div className="shelf-heading"><h2>Read in your language</h2><span className="section-note">More languages, more stories</span></div>
                <div className="language-grid">
                  {languages.map(([language, native, image]) => (
                    <button key={language} onClick={() => notify(`${language} books selected`)}>
                      <span><strong>{native}</strong><small>{language}</small></span><img src={image} alt="" />
                    </button>
                  ))}
                </div>
              </section>



              {shelves.slice(6).map((shelf) => (
                <Shelf key={shelf.title} shelf={shelf} items={allBooks.filter((book) => book.categories?.includes(shelf.key)).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} />
              ))}
              <section className="collection-section" id="categories">
                <div className="shelf-heading"><h2>Explore every kind of reader</h2></div>
                <div className="collection-grid">
                  {collections.map((collection) => (
                    <button className="collection-card gradient-reader-card" key={collection.title} onClick={() => { setQuery(collection.title.replace(" Books", "")); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <img src={collection.image} alt="" />
                      <span><strong>{collection.title}</strong><small>{collection.subtitle}</small></span>
                      <FiChevronRight />
                    </button>
                  ))}
                </div>
              </section>

              <section className="social-media-section">
                <div className="social-card">
                  <div className="social-copy">
                    <span className="community-kicker">JOIN OUR COMMUNITY</span>
                    <h2>Follow @booksbykilo</h2>
                    <p>Join 50,000+ book lovers on Instagram & YouTube for daily unboxing videos, recommendations, and exclusive flash sales.</p>
                    <div className="social-actions">
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn instagram">
                        <FiInstagram /> Instagram <b>42K</b>
                      </a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                        <FiYoutube /> YouTube <b>18K</b>
                      </a>
                      <button onClick={() => notify("Joining Book Deals WhatsApp group...")} className="social-btn whatsapp">
                        <FiMessageCircle /> Deals Club <b>25K</b>
                      </button>
                    </div>
                  </div>
                  <div className="social-preview-grid">
                    <div className="social-preview-item">
                      <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=60" alt="Book stack" />
                      <span>Unboxing 5kg Stack 📚</span>
                    </div>
                    <div className="social-preview-item">
                      <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&auto=format&fit=crop&q=60" alt="Reading shelf" />
                      <span>Sunday Reader Shelf 💡</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </main>

      <footer>
        <div className="footer-brand"><div className="text-brand"><span>BOOKS BY</span><strong>KILO</strong></div><span>Find your people. Find your next book.</span></div>
        <div><strong>Browse</strong><a href="#allbooks">All Books</a><a href="#categories">Categories</a><a href="#newarrivals">New Arrivals</a></div>
        <div><strong>Discover</strong><a href="#surprisestack">Surprise Stack</a><a href="#bulkbooks">Bulk Purchase</a><a href="#bestsellers">Bestselling Authors</a></div>
        <div><strong>Help</strong><a href="#contact">Contact Us</a><a href="#faq">FAQ</a><a href="#orders">My Orders</a></div>
      </footer>

      {toast && <div className="toast"><FiCheck /> {toast}</div>}
    </div>
  );
}
