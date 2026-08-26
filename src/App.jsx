import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
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
  FiLinkedin,
  FiMessageCircle,
  FiTrash2,
  FiGift,
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
  { title: "Surprise Stack", subtitle: "Starting ₹300", image: "/brand/surprise_banner.jpg" },
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
const genreItems = [
  ["Children", "Picture books, learning & wonder", "/brand/children.webp"],
  ["Fiction", "Stories to disappear into", "/books/alice.jpg"],
  ["Non-Fiction", "Ideas, lives & the real world", "/brand/non-fiction.webp"],
  ["Classics", "Timeless books worth revisiting", "/brand/classic.webp"],
  ["Teen Fiction", "Bold stories for new generations", "/books/keira.jpg"],
  ["History", "People, places & turning points", "/catalog/9781416548485-better.jpg"],
  ["Business", "Ideas that move careers forward", "/catalog/9780312541866-better.jpg"],
  ["Biography", "Remarkable lives, honestly told", "/catalog/9781443408486-better.jpg"],
];

const surpriseCard = ["Surprise Stack", "Unexpected reads, picked just for you.", "/brand/surprise_banner.jpg"];
const languages = [
  ["English", "English", "/books/alice.jpg"],
  ["Hindi", "हिन्दी", "/books/king-lear.jpg"],
  ["Marathi", "मराठी", "/brand/classic.webp"],
  ["Bengali", "বাংলা", "/books/bright-eyes.jpg"],
  ["Gujarati", "ગુજરાતી", "/brand/non-fiction.webp"],
  ["Tamil", "தமிழ்", "/books/much-ado.jpg"],
];
const megaCategories = [
  { title: "Top 10 Books", image: "/books/pokemon.jpg", target: "top10", filter: "all" },
  { title: "Explore by Genre", image: "/books/alice.jpg", target: "genres", filter: "all" },
  { title: "Recently Added Books", image: "/books/when-it-snows.jpg", target: "recent", filter: "all" },
  { title: "Brand New Books", image: "/books/timetime.jpg", target: "brandnew", filter: "new" },
  { title: "Banner Mid", image: "/books/king-lear.jpg", target: "bannermid", filter: "all" },
  { title: "Children Books", image: "/brand/children.webp", target: "children", filter: "children" },
  { title: "Teen Fiction", image: "/books/keira.jpg", target: "teen", filter: "teen-fiction" },
  { title: "Fiction / Non-Fiction", image: "/brand/non-fiction.webp", target: "fiction", filter: "fiction" },
  { title: "Explore by Publishers", image: "/brand/classic.webp", target: "publishers", filter: "all" },
  { title: "Extra Discount Sale", image: "/books/umbrella-tree.jpg", target: "sale", filter: "all" },
  { title: "Regional Languages", image: "/books/bright-eyes.jpg", target: "languages", filter: "all" },
  { title: "Coffee Table Books", image: "/books/dinosaurs.jpg", target: "coffeetable", filter: "collector" },
  { title: "Choose by Pricing (₹299/399/499 per kg)", image: "/books/big-kick.jpg", target: "pricing", filter: "all" },
];

const navItems = [
  ["Home", "home"],
  ["All Books", "all"],
  ["Categories", "categories"],
  ["Bulk Books", "bulk"],
  ["Bestsellers", "bestsellers"],
  ["New Arrivals", "new"],
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
        <div>
          <h2>{shelf.title} {shelf.accent && <span>{shelf.accent}</span>}</h2>
          {shelf.subtitle && <span className="shelf-subtitle">{shelf.subtitle}</span>}
        </div>
        {!rank && <button onClick={() => onViewAll?.(shelf)}>View All <FiChevronRight /></button>}
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

function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, onClear, onCheckout }) {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const totalWeight = cart.reduce((sum, item) => sum + (item.book.weight || 300) * item.quantity, 0);

  if (!open) return null;

  return (
    <div className="cart-drawer-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <FiShoppingCart />
            <h3>Your Cart</h3>
            <span className="cart-badge-count">{totalCount} {totalCount === 1 ? 'item' : 'items'}</span>
          </div>
          <button className="cart-close-btn" onClick={onClose} aria-label="Close cart"><FiX /></button>
        </div>

        <div className="cart-drawer-body">
          {!cart.length ? (
            <div className="cart-empty">
              <div className="cart-empty-icon"><FiShoppingCart /></div>
              <h4>Your cart is empty</h4>
              <p>Discover great books by weight and fill your stack!</p>
              <button className="cta" onClick={onClose}>Explore Catalog</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ id, book, quantity }) => (
                <div className="cart-item-row" key={id}>
                  <img src={book.image} alt={book.title} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <strong>{book.title}</strong>
                    <small>by {book.author}</small>
                    <span className="cart-item-price">₹{book.price}<small>/kg</small></span>
                  </div>
                  <div className="cart-item-ctrl">
                    <div className="qty-picker">
                      <button onClick={() => onUpdateQty(id, -1)} aria-label="Decrease quantity"><FiMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={() => onUpdateQty(id, 1)} aria-label="Increase quantity"><FiPlus /></button>
                    </div>
                    <button className="trash-btn" onClick={() => onRemove(id)} title="Remove item"><FiTrash2 /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span>Estimated Weight</span>
              <strong>{(totalWeight / 1000).toFixed(2)} kg</strong>
            </div>
            <div className="cart-summary-line total">
              <span>Total Amount</span>
              <strong>₹{totalPrice}</strong>
            </div>
            <button className="cta checkout-btn" onClick={onCheckout}>
              Proceed to Checkout • ₹{totalPrice}
            </button>
            <button className="clear-cart-btn" onClick={onClear}>Clear Cart</button>
          </div>
        )}
      </aside>
    </div>
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
  const [megaOpen, setMegaOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [sortBy, setSortBy] = useState("match");
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [list, setList] = useState([2, 10, 15]);
  const [toast, setToast] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const megaTimerRef = useRef(null);

  const handleMegaEnter = () => {
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    if (megaTimerRef.current) window.clearTimeout(megaTimerRef.current);
    megaTimerRef.current = window.setTimeout(() => {
      setMegaOpen(false);
    }, 200);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
    setMegaOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };
  const addCart = (book) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === book.id);
      if (existing) {
        return items.map((item) => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { id: book.id, book, quantity: 1 }];
    });
    notify(`Added "${book.title}" to cart`);
  };
  const updateCartQty = (bookId, delta) => {
    setCart((items) =>
      items
        .map((item) => {
          if (item.id === bookId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };
  const removeFromCart = (bookId) => {
    setCart((items) => items.filter((item) => item.id !== bookId));
    notify("Item removed from cart");
  };
  const clearCart = () => {
    setCart([]);
    notify("Cart cleared");
  };
  const handleViewAll = (shelf) => {
    setPage("all");
    setSelected(null);
    if (shelf.key) {
      setCategoryFilter(shelf.key);
      setQuery("");
    } else if (shelf.title.includes("Top 10")) {
      setCategoryFilter("all");
      setSortBy("match");
      setQuery("");
    } else {
      setQuery(shelf.title.replace(" Books", "").replace(" Recently Added", ""));
      setCategoryFilter("all");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleList = (book) => {
    setList((items) => items.includes(book.id) ? items.filter((id) => id !== book.id) : [...items, book.id]);
  };
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand text-brand" href="#home" aria-label="Books by Kilo home" onClick={(event) => { event.preventDefault(); openPage("home"); }}>
          <span>BOOKS BY</span><strong>KILO</strong>
        </a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <FiX /> : <FiMenu />}</button>
        <nav className={menuOpen ? "open" : ""}>
          {navItems.map(([label, value]) => {
            if (value === "categories") {
              return (
                <div
                  key={value}
                  className="mega-nav-item"
                  onMouseEnter={handleMegaEnter}
                  onMouseLeave={handleMegaLeave}
                >
                  <a
                    href="#categories"
                    className={`mega-trigger ${page === "categories" || megaOpen ? "active" : ""}`}
                    onClick={(event) => {
                      event.preventDefault();
                      setMegaOpen(!megaOpen);
                    }}
                  >
                    Categories <FiChevronDown className={`chevron-icon ${megaOpen ? "open" : ""}`} />
                  </a>

                  {megaOpen && (
                    <div
                      className="categories-mega-menu"
                      onMouseEnter={handleMegaEnter}
                      onMouseLeave={handleMegaLeave}
                    >
                      <div className="mega-featured-card">
                        <img className="mega-featured-bg" src="/brand/surprise_banner.jpg" alt="Featured" />
                        <div className="mega-featured-overlay" />
                        <div className="mega-featured-content">
                          <span className="mega-featured-badge">FEATURED COLLECTION</span>
                          <h3>Surprise Mystery Stack</h3>
                          <p>Hand-curated pre-loved books delivered by weight.</p>
                          <button
                            className="mega-featured-btn"
                            onClick={() => {
                              openPage("surprise");
                              setMegaOpen(false);
                            }}
                          >
                            Explore Now <FiChevronRight />
                          </button>
                        </div>
                      </div>

                      <div className="mega-category-grid">
                        {megaCategories.map((cat) => (
                          <button
                            key={cat.title}
                            className="mega-category-card"
                            onClick={() => {
                              setMegaOpen(false);
                              setMenuOpen(false);
                              if (page !== "home") setPage("home");
                              if (cat.filter && cat.filter !== "all") {
                                setCategoryFilter(cat.filter);
                                openPage("all");
                              } else {
                                const el = document.getElementById(cat.target) || document.querySelector(`.${cat.target}-shelf`);
                                if (el) {
                                  el.scrollIntoView({ behavior: "smooth" });
                                } else {
                                  openPage("all");
                                }
                              }
                            }}
                          >
                            <img className="mega-cat-img" src={cat.image} alt={cat.title} />
                            <span className="mega-cat-title">{cat.title}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            return (
              <a
                key={value}
                href={`#${value}`}
                className={page === value ? "active" : ""}
                onClick={(event) => {
                  event.preventDefault();
                  openPage(value);
                  setMegaOpen(false);
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>
        <div className={`search ${searchOpen || query ? "open" : ""}`}>
          <button onClick={() => setSearchOpen(!searchOpen)} aria-label="Search books"><FiSearch /></button>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title, author or genre..." aria-label="Search title, author or genre" />
          {query && <button onClick={() => setQuery("")} aria-label="Clear search"><FiX /></button>}
        </div>
        <div className="header-actions">
          <button className="list-button" onClick={() => notify(`${list.length} books in My List`)}><FiHeart /> <span>My List</span></button>
          <button className="cart-button" onClick={() => setCartOpen(true)} aria-label="Open cart"><FiShoppingCart /> <span>Cart</span>{cartCount > 0 && <b>{cartCount}</b>}</button>
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
            <section
              className="hero"
              data-hero-title={typeof featured.title === "string" ? featured.title : "featured"}
              data-hero-id={featured.id}
            >
              <div className="hero-art">
                <img key={`backdrop-${featured.id}`} className="hero-backdrop" src={featured.image} alt="" aria-hidden="true" />
                {featured.isGoogleReview ? (
                  <div className="google-rating-card-v2">
                    <div className="g-card-v2-left">
                      <div className="g-card-v2-logo-wrapper">
                        <FcGoogle size={54} />
                      </div>
                    </div>
                    <div className="g-card-v2-divider" />
                    <div className="g-card-v2-right">
                      <div className="g-card-v2-header">
                        <span className="g-card-v2-title">Google Rating</span>
                        <span className="g-card-v2-verified-badge" aria-label="Verified">
                          <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.79-4-4-4-.495 0-.965.084-1.4.238C14.55 2.475 13.18 1.6 11.6 1.6c-1.58 0-2.95.875-3.6 2.148-.435-.154-.905-.238-1.4-.238-2.21 0-4 1.79-4 4 0 .495.084.965.238 1.4C1.575 9.55.7 10.92.7 12.5c0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.79 4 4 4 .495 0 .965-.084 1.4-.238 1.4 1.273 2.77 2.148 4.35 2.148 1.58 0 2.95-.875 3.6-2.148.435.154.905.238 1.4.238 2.21 0 4-1.79 4-4 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6z" fill="#2563eb"/>
                            <path d="M9.8 16.2l-3.5-3.5 1.4-1.4 2.1 2.1 6.3-6.3 1.4 1.4-7.7 7.7z" fill="#ffffff"/>
                          </svg>
                        </span>
                      </div>
                      <div className="g-card-v2-score-row">
                        <span className="g-card-v2-score">4.8</span>
                        <span className="g-card-v2-scale">/ 5</span>
                      </div>
                      <div className="g-card-v2-stars">
                        <span className="g-star">★</span>
                        <span className="g-star">★</span>
                        <span className="g-star">★</span>
                        <span className="g-star">★</span>
                        <span className="g-star g-star-half">★</span>
                      </div>
                      <div className="g-card-v2-count">
                        Based on <strong className="g-count-num">1,248</strong> Google Reviews
                      </div>
                      <div className="g-card-v2-hr" />
                      <a
                        href="https://www.google.com/search?q=booksbykilo+reviews"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="g-card-v2-cta-btn"
                        onClick={(e) => {
                          e.preventDefault();
                          notify("Opening Google Reviews...");
                          window.open("https://www.google.com/search?q=booksbykilo+reviews", "_blank");
                        }}
                      >
                        <span className="g-cta-left">
                          <FcGoogle size={18} />
                          <span>Read our reviews on <strong className="g-brand-text"><span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span></strong></span>
                        </span>
                        <FiChevronRight size={16} className="g-cta-arrow" />
                      </a>
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
              {/* 1. Top 10 Books */}
              <div className="top-ten-shelf">
                <Shelf shelf={{ title: "Top 10 Books", subtitle: "The absolute must-reads of the season." }} items={[...allBooks].sort((a, b) => b.match - a.match).slice(0, 10)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} rank />
              </div>

              {/* 2. Explore by Genre */}
              <section className="discovery-section genre-section" id="genres">
                <div className="shelf-heading">
                  <div>
                    <h2>Explore by Genre</h2>
                    <span className="shelf-subtitle">Find your next story.</span>
                  </div>
                </div>
                <div className="genre-grid">
                  {genreItems.map(([title, subtitle, image], index) => (
                    <button
                      key={title}
                      className={`genre-card genre-${index + 1}`}
                      onClick={() => { setQuery(title); openPage("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    >
                      <img src={image} alt={title} />
                      <b className="genre-number">{String(index + 1).padStart(2, "0")}</b>
                      <span className="genre-meta">
                        <strong>{title}</strong>
                        <small>{subtitle}</small>
                      </span>
                    </button>
                  ))}
                  {/* Desktop Surprise Stack Card (Column 5, Spanning Rows 1-2) */}
                  <button
                    className="genre-card genre-surprise desktop-surprise-card"
                    onClick={() => { setQuery("Surprise Stack"); openPage("surprise"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  >
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
                  </button>
                </div>
              </section>

              {/* Mobile-only Standalone Surprise Stack Section */}
              <section className="surprise-standalone-section mobile-surprise-section" id="surprisestack">
                <button
                  className="genre-card genre-surprise-standalone"
                  onClick={() => { setQuery("Surprise Stack"); openPage("surprise"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
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
                </button>
              </section>

              {/* 3. Recently Added Books */}
              <Shelf shelf={{ title: "Recently Added Books", subtitle: "Freshly stocked arrivals." }} items={allBooks.slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 4. Brand New Books */}
              <Shelf shelf={{ title: "Brand New Books", subtitle: "Straight from the press." }} items={[...internetNewBooks, ...allBooks.filter((book) => book.categories?.includes("new-books"))].slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 5. Banner Mid */}
              <section className="gradient-highlight">
                <div className="editor-copy">
                  <span className="eyebrow">CURATED FOR CURIOUS READERS</span>
                  <h2>Banner Mid</h2>
                  <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "4px" }}>Unbeatable deals on bestselling reads.</p>
                  <button onClick={() => openPage("bestsellers")}>Explore Editor’s Picks <FiChevronRight /></button>
                </div>
                <div className="editor-stack">
                  {[...allBooks].sort((a, b) => b.match - a.match).slice(0, 5).map((book, index) => (
                    <button key={book.id} style={{ "--editor-index": index }} onClick={() => { setSelected(book); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label={`View ${book.title}`}><img src={book.image} alt={`${book.title} cover`} /></button>
                  ))}
                </div>
              </section>

              {/* 6. Children Books */}
              <Shelf shelf={{ title: "Children Books", subtitle: "Magic for little readers." }} items={allBooks.filter((book) => book.categories?.includes("children")).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 7. Teen Fiction */}
              <Shelf shelf={{ title: "Teen Fiction", subtitle: "Captivating young adult reads." }} items={allBooks.filter((book) => book.categories?.includes("teen-fiction")).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 8. Fiction / Non-Fiction */}
              <Shelf shelf={{ title: "Fiction / Non-Fiction", subtitle: "From wild imaginations to real facts." }} items={allBooks.filter((book) => book.categories?.includes("fiction") || book.categories?.includes("non-fiction")).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 9. Explore by Publishers */}
              <section className="discovery-section publisher-section">
                <div className="shelf-heading">
                  <div>
                    <h2>Explore by Publishers</h2>
                    <span className="shelf-subtitle">Shop your favorite imprints.</span>
                  </div>
                </div>
                <div className="publisher-grid">
                  {publishers.map((publisher, index) => (
                    <button key={publisher.name} style={{ "--publisher-index": index }} onClick={() => { setQuery(publisher.name); openPage("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label={`Browse ${publisher.name}`}>
                      <PublisherMark kind={publisher.mark} />
                    </button>
                  ))}
                </div>
              </section>

              {/* 10. Extra Discount Sale */}
              <Shelf shelf={{ title: "Extra Discount Sale", subtitle: "Massive markdowns on top titles." }} items={[...allBooks].sort((a, b) => a.price - b.price).slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 11. Regional Languages */}
              <section className="discovery-section language-section">
                <div className="shelf-heading">
                  <div>
                    <h2>Regional Languages</h2>
                    <span className="shelf-subtitle">Stories in your mother tongue.</span>
                  </div>
                </div>
                <div className="language-grid">
                  {languages.map(([language, native, image]) => (
                    <button key={language} onClick={() => { setQuery(language); openPage("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <span><strong>{native}</strong><small>{language}</small></span><img src={image} alt="" />
                    </button>
                  ))}
                </div>
              </section>

              {/* 12. Coffee Table Books */}
              <Shelf shelf={{ title: "Coffee Table Books", subtitle: "Stunning visual statements." }} items={allBooks.filter((book) => book.categories?.includes("collector") || book.tier === "Premium" || book.tier === "Classic").slice(0, 24)} onOpen={(b) => { setSelected(b); window.scrollTo({ top: 0, behavior: "smooth" }); }} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 13. Choose by Pricing */}
              <section className="collection-section" id="categories">
                <div className="shelf-heading">
                  <div>
                    <h2>Choose by Pricing</h2>
                    <span className="shelf-subtitle">Fill your shelves by weight.</span>
                  </div>
                </div>
                <div className="collection-grid">
                  {collections.map((collection) => (
                    <button className="collection-card gradient-reader-card" key={collection.title} onClick={() => { setQuery(collection.title.replace(" Books", "")); openPage("all"); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      <img src={collection.image} alt="" />
                      <span><strong>{collection.title}</strong><small>{collection.subtitle}</small></span>
                      <FiChevronRight />
                    </button>
                  ))}
                </div>
              </section>


            </div>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-top-row">
          <div className="footer-left-col">
            <div className="footer-socials">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FiInstagram size={20} /></a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FiYoutube size={20} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FiLinkedin size={20} /></a>
              <a href="https://wa.me" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FiMessageCircle size={20} /></a>
            </div>
            <a href="mailto:support@booksbykilo.in" className="footer-contact-email">
              support@booksbykilo.in
            </a>
            <div className="footer-address">
              <span>Books by Kilo HQ</span>
              <span>Authentic pre-loved books by weight</span>
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>

          <div className="footer-center-col">
            <div className="footer-cta-card">
              <span className="footer-cta-badge">PRE-LOVED BOOKS STORE</span>
              <button className="footer-cta-btn" onClick={() => openPage("all")}>
                Shop Bestsellers <b>₹299/kg</b>
              </button>
            </div>
          </div>

          <div className="footer-right-col">
            <nav className="footer-vertical-nav">
              <a href="#home" onClick={(e) => { e.preventDefault(); openPage("home"); }}>Home</a>
              <a href="#all" onClick={(e) => { e.preventDefault(); openPage("all"); }}>All Books</a>
              <a href="#categories" onClick={(e) => { e.preventDefault(); openPage("all"); }}>Categories</a>
              <a href="#surprise" onClick={(e) => { e.preventDefault(); openPage("surprise"); }}>Surprise Stack</a>
              <a href="#bulk" onClick={(e) => { e.preventDefault(); openPage("bulk"); }}>Bulk Books</a>
              <a href="#bestsellers" onClick={(e) => { e.preventDefault(); openPage("bestsellers"); }}>Bestsellers</a>
            </nav>
          </div>
        </div>

        <div className="footer-bottom-row">
          <a href="#terms" onClick={(e) => { e.preventDefault(); notify("Terms & Conditions"); }}>Terms & Conditions</a>
          <span className="footer-copyright">© 2026 Books by Kilo. All Rights Reserved.</span>
          <a href="#privacy" onClick={(e) => { e.preventDefault(); notify("Privacy Policy"); }}>Privacy Policy</a>
        </div>

        <div className="footer-bg-typography" aria-hidden="true">
          booksbykilo
        </div>
      </footer>

      {toast && <div className="toast"><FiCheck /> {toast}</div>}
    </div>
  );
}
