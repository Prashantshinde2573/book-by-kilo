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
import { FaFire } from "react-icons/fa";

export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return "₹0";
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export function getNormalizedBook(book) {
  if (!book) return null;
  const weight = Number(book.weight) || 300; // actual weight in grams
  const ratePerKg = Number(book.ratePerKg) || (
    book.tier === "Premium" || book.tier === "New" || book.categories?.includes("new-books") ? 499 :
    book.tier === "Classic" || book.categories?.includes("classic") ? 399 :
    (book.price && book.price > 150 ? book.price : 299)
  );

  let salePrice = book.salePrice !== undefined && book.salePrice !== null && !isNaN(book.salePrice)
    ? Number(book.salePrice)
    : Math.max(29, Math.round((weight / 1000) * ratePerKg));

  let mrp = book.mrp !== undefined && book.mrp !== null && !isNaN(book.mrp)
    ? Number(book.mrp)
    : (book.originalPrice && !isNaN(book.originalPrice)
        ? Number(book.originalPrice)
        : Math.max(Math.round((salePrice * 2.5) / 10) * 10, salePrice + 150));

  if (mrp <= salePrice) {
    mrp = Math.round(salePrice * 2.2);
  }

  const discount = mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;

  return {
    ...book,
    id: book.id || String(Math.random()),
    title: book.title || "Untitled Book",
    author: book.author || "Unknown Author",
    image: book.image || "/books/alice.jpg",
    weight,
    weightUnit: book.weightUnit || "gm",
    ratePerKg,
    salePrice,
    mrp,
    discount,
    tier: book.tier || (ratePerKg >= 499 ? "Premium" : ratePerKg >= 399 ? "Classic" : "Standard"),
  };
}

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

const collections = [
  { title: "New Books", subtitle: "Up to 80% off", image: "/brand/new-books.webp", route: "brand-new-books" },
  { title: "Premium Books", subtitle: "Collector Editions", image: "/brand/premium.webp", route: "premium-books" },
  { title: "Non-Fiction", subtitle: "Books around us", image: "/brand/non-fiction.webp", route: "category-non-fiction" },
  { title: "Children Books", subtitle: "The best childhood", image: "/brand/children.webp", route: "category-children" },
  { title: "Classic Books", subtitle: "Evergreen Reads", image: "/brand/classic.webp", route: "classic-books" },
  { title: "Standard Books", subtitle: "Everyday Reads", image: "/brand/standard.webp", route: "standard-books" },
  { title: "Collector Books", subtitle: "Coffee table editions", image: "/brand/coffee.webp", route: "collector-books" },
  { title: "Surprise Stack", subtitle: "Starting ₹300", image: "/brand/surprise_banner.jpg", route: "surprise-stack" },
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

const authors = [
  { name: "J.K. Rowling", genre: "Fantasy & Magic" },
  { name: "Agatha Christie", genre: "Crime & Mystery" },
  { name: "Stephen King", genre: "Horror & Suspense" },
  { name: "Roald Dahl", genre: "Children's Classics" },
  { name: "Enid Blyton", genre: "Adventure & Mystery" },
  { name: "Ruskin Bond", genre: "Short Stories & Life" },
  { name: "Dan Brown", genre: "Thrillers & Symbols" },
  { name: "George R.R. Martin", genre: "Epic Fantasy" },
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
  ["Children", "Picture books, learning & wonder", "/brand/children.webp", "children"],
  ["Fiction", "Stories to disappear into", "/books/alice.jpg", "fiction"],
  ["Non-Fiction", "Ideas, lives & the real world", "/brand/non-fiction.webp", "non-fiction"],
  ["Classics", "Timeless books worth revisiting", "/brand/classic.webp", "classic-books"],
  ["Teen Fiction", "Bold stories for new generations", "/books/keira.jpg", "teen-fiction"],
  ["History", "People, places & turning points", "/catalog/9781416548485-better.jpg", "history"],
  ["Business", "Ideas that move careers forward", "/catalog/9780312541866-better.jpg", "business"],
  ["Biography", "Remarkable lives, honestly told", "/catalog/9781443408486-better.jpg", "biography"],
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

const bookQuotes = [
  {
    quote: "When you want something, all the universe conspires in helping you to achieve it.",
    book: "The Alchemist",
    author: "Paulo Coelho",
    image: "/books/alice.jpg",
  },
  {
    quote: "It is our choices that show what we truly are, far more than our abilities.",
    book: "Harry Potter & Chamber of Secrets",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg",
  },
  {
    quote: "Not all those who wander are lost.",
    book: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    image: "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg",
  },
  {
    quote: "Whatever our souls are made of, his and mine are the same.",
    book: "Wuthering Heights",
    author: "Emily Brontë",
    image: "/brand/classic.webp",
  },
  {
    quote: "The only way out of the labyrinth of suffering is to forgive.",
    book: "Looking for Alaska",
    author: "John Green",
    image: "/books/keira.jpg",
  },
  {
    quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
    book: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "/brand/coffee.webp",
  },
  {
    quote: "There is no friend as loyal as a book.",
    book: "A Moveable Feast",
    author: "Ernest Hemingway",
    image: "/brand/non-fiction.webp",
  },
  {
    quote: "Until I feared I would lose it, I never loved to read. One does not love breathing.",
    book: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "/brand/new-books.webp",
  },
];

const navItems = [
  ["Home", "home"],
  ["All Books", "all-books"],
  ["Categories", "categories"],
  ["Bulk Books", "bulk-books"],
  ["Bestsellers", "bestsellers"],
  ["New Arrivals", "new-arrivals"],
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

export function getPageMetadata(page, categoryFilter, query) {
  if (query) {
    return {
      kicker: "SEARCH RESULTS",
      title: `Search Results for “${query}”`,
      description: `Showing quality-checked pre-loved books matching “${query}”.`,
      parent: "Search",
    };
  }

  if (page.startsWith("category-")) {
    const slug = page.replace("category-", "");
    const categoryDetails = {
      fiction: { title: "Fiction Books", description: "Captivating novels, mystery thrillers, romance, and timeless stories to disappear into." },
      "non-fiction": { title: "Non-Fiction Books", description: "Inspiring biographies, history, science, business, and books about the real world." },
      children: { title: "Children Books", description: "Picture books, activity guides, early learning, and fairytale wonder for young readers." },
      "teen-fiction": { title: "Teen Fiction Books", description: "Bold young adult novels, fantasy sagas, coming-of-age stories, and teen romance." },
      collector: { title: "Coffee Table & Collector Books", description: "Stunning visual editions, art portfolios, photography, and luxury hardcovers." },
      history: { title: "History & Politics Books", description: "Fascinating historical accounts, world events, political memoirs, and documentaries." },
      business: { title: "Business & Leadership Books", description: "Career insights, economics, startup guides, and leadership wisdom." },
      biography: { title: "Biography & Memoir Books", description: "Inspiring personal journeys, memoirs, and stories of extraordinary lives." },
    }[slug] || { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Books`, description: `Browse quality-checked ${slug.replace(/-/g, " ")} books by weight.` };

    return {
      kicker: "GENRE COLLECTION",
      title: categoryDetails.title,
      description: categoryDetails.description,
      parent: "Categories",
    };
  }

  if (page.startsWith("publisher-")) {
    const pub = page.replace("publisher-", "");
    return {
      kicker: "PUBLISHER IMPRINT",
      title: `${pub} Books`,
      description: `Explore quality-checked pre-loved editions published by ${pub}.`,
      parent: "Publishers",
    };
  }

  if (page.startsWith("language-")) {
    const lang = page.replace("language-", "");
    return {
      kicker: "REGIONAL LITERATURE",
      title: `${lang} Books`,
      description: `Authentic pre-loved literature and popular titles in ${lang}.`,
      parent: "Languages",
    };
  }

  const pagesMap = {
    top10: { kicker: "CURATED COLLECTION", title: "Top 10 Bestselling Books", description: "The absolute must-reads of the season, ranked by popularity and reader ratings across India.", parent: "Collections" },
    "top-10-books": { kicker: "CURATED COLLECTION", title: "Top 10 Bestselling Books", description: "The absolute must-reads of the season, ranked by popularity and reader ratings across India.", parent: "Collections" },
    "recently-added": { kicker: "FRESH ARRIVALS", title: "Recently Added Books", description: "Freshly cataloged pre-loved titles arriving daily at our Mumbai warehouse.", parent: "Collections" },
    "brand-new-books": { kicker: "MINT CONDITION", title: "Brand New Books (Up to 80% Off)", description: "Unread, publisher-direct copies in pristine condition at unbelievable prices.", parent: "Collections" },
    premium: { kicker: "COLLECTOR EDITIONS", title: "Premium Books Collection", description: "Top-tier collectible hardcovers, art editions, and pristine titles.", parent: "Collections" },
    "premium-books": { kicker: "COLLECTOR EDITIONS", title: "Premium Books Collection", description: "Top-tier collectible hardcovers, art editions, and pristine titles.", parent: "Collections" },
    classic: { kicker: "EVERGREEN READS", title: "Classic Books Collection", description: "Timeless literature, popular fiction, and world classics.", parent: "Collections" },
    "classic-books": { kicker: "EVERGREEN READS", title: "Classic Books Collection", description: "Timeless literature, popular fiction, and world classics.", parent: "Collections" },
    standard: { kicker: "EVERYDAY READS", title: "Standard Books Collection", description: "Budget-friendly reads, children's stories, and popular paperbacks.", parent: "Collections" },
    "standard-books": { kicker: "EVERYDAY READS", title: "Standard Books Collection", description: "Budget-friendly reads, children's stories, and popular paperbacks.", parent: "Collections" },
    bestsellers: { kicker: "MOST POPULAR", title: "Bestseller Books", description: "India's most loved pre-loved titles ordered by over 50,000 book lovers.", parent: "Collections" },
    new: { kicker: "NEW ARRIVALS", title: "New Arrivals", description: "The latest additions to our Books by Kilo inventory.", parent: "Collections" },
    "new-arrivals": { kicker: "NEW ARRIVALS", title: "New Arrivals", description: "The latest additions to our Books by Kilo inventory.", parent: "Collections" },
    bulk: { kicker: "WHOLESALE & LIBRARIES", title: "Bulk Books & Wholesale Stacks", description: "Wholesale packages and curated sets for libraries, schools & avid collectors.", parent: "Collections" },
    "bulk-books": { kicker: "WHOLESALE & LIBRARIES", title: "Bulk Books & Wholesale Stacks", description: "Wholesale packages and curated sets for libraries, schools & avid collectors.", parent: "Collections" },
    surprise: { kicker: "MYSTERY BOX", title: "Surprise Stack Mystery Box", description: "Curated mystery boxes of unexpected hand-picked reads starting at ₹300.", parent: "Collections" },
    "surprise-stack": { kicker: "MYSTERY BOX", title: "Surprise Stack Mystery Box", description: "Curated mystery boxes of unexpected hand-picked reads starting at ₹300.", parent: "Collections" },
    "extra-discount": { kicker: "SPECIAL OFFER", title: "Extra Discount Sale", description: "Massive markdowns on top titles - best value for your rupee.", parent: "Collections" },
    "collector-books": { kicker: "SPECIALTY COLLECTION", title: "Coffee Table & Collector Books", description: "Stunning visual editions, art portfolios, photography, and luxury hardcovers.", parent: "Collections" },
    categories: { kicker: "ALL CATEGORIES", title: "Explore All Categories", description: "Choose by genre, pricing tier, publisher imprint, or language.", parent: "Catalogue" },
    all: { kicker: "COMPLETE CATALOGUE", title: "All Books Catalogue", description: "Browse our complete catalog of quality-checked pre-loved books.", parent: "Catalogue" },
    "all-books": { kicker: "COMPLETE CATALOGUE", title: "All Books Catalogue", description: "Browse our complete catalog of quality-checked pre-loved books.", parent: "Catalogue" },
  };

  return pagesMap[page] || {
    kicker: "BOOKS BY KILO",
    title: page.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    description: `Explore our quality-checked pre-loved book collection.`,
    parent: "Catalogue",
  };
}

function BookCard({ book, onOpen, onCart, saved, onSave, rank }) {
  const normBook = getNormalizedBook(book);
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

  if (!normBook) return null;

  return (
    <article className={`book-card ${rank ? "ranked" : ""} ${preview ? "preview-active" : ""}`}>
      {rank && <span className="rank-number">{rank}</span>}
      <button className="book-cover" onMouseEnter={schedulePreview} onMouseLeave={scheduleClose} onClick={() => onOpen(normBook)} aria-label={`View ${normBook.title}`}>
        <img className="cover-backdrop" src={normBook.image} alt="" aria-hidden="true" />
        <img className="cover-foreground" src={normBook.image} alt={`${normBook.title} by ${normBook.author}`} />
        {normBook.discount > 0 && (
          <span className="card-discount-pill">
            {normBook.discount}% OFF
          </span>
        )}
        <div className="cover-price-badge">
          <span className="card-sale-price">{formatPrice(normBook.salePrice)}</span>
          {normBook.mrp > normBook.salePrice && (
            <span className="card-mrp-price">MRP {formatPrice(normBook.mrp)}</span>
          )}
        </div>
      </button>
      {preview && createPortal(<div
        className="card-preview portal-preview"
        style={{ left: preview.left, top: preview.top, width: preview.width }}
        onMouseEnter={cancelTimers}
        onMouseLeave={scheduleClose}
      >
        <div className="preview-art">
          <img className="preview-blur" src={normBook.image} alt="" aria-hidden="true" />
          <img className="preview-cover" src={normBook.image} alt="" aria-hidden="true" />
        </div>
        <div className="preview-body">
          <strong>{normBook.title}</strong>
          <span className="preview-author">by {normBook.author}</span>
          <div className="preview-stats">
            <span className="match">{normBook.match || 95}% Match</span>
            <span>{normBook.tier}</span>
          </div>
          <p>{normBook.description || `A quality-checked Books by Kilo edition of ${normBook.title}.`}</p>
          <div className="preview-pricing-row" style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "10px" }}>
            <b style={{ color: "var(--soft-red)", fontSize: "20px", fontWeight: 800 }}>{formatPrice(normBook.salePrice)}</b>
            {normBook.mrp > normBook.salePrice && (
              <span style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "13px", fontWeight: 500 }}>
                {formatPrice(normBook.mrp)}
              </span>
            )}
            {normBook.discount > 0 && (
              <span style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", fontSize: "10px", fontWeight: 800, padding: "2px 6px", borderRadius: "4px" }}>
                {normBook.discount}% OFF
              </span>
            )}
          </div>
        </div>
        <div className="card-actions">
          <button className="preview-action primary" onClick={() => onOpen(normBook)} aria-label={`View ${normBook.title}`}><FiInfo /> View</button>
          <button className="preview-action" onClick={() => onCart(normBook)} aria-label={`Add ${normBook.title} to cart`}><FiShoppingCart /> Add • {formatPrice(normBook.salePrice)}</button>
          <button className={`preview-action list-action ${saved ? "saved" : ""}`} onClick={() => onSave(normBook)} aria-label={`${saved ? "Remove" : "Add"} ${normBook.title} ${saved ? "from" : "to"} My List`}>
            {saved ? <FiCheck /> : <FiHeart />} {saved ? "In My List" : "My List"}
          </button>
        </div>
      </div>, document.body)}
    </article>
  );
}

function Shelf({ shelf, items, onOpen, onCart, list, onSave, rank, onViewAll }) {
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

function BookQuotesSection({ quotes, onBookClick }) {
  const railRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (dir) => {
    if (!railRef.current) return;
    const scrollAmount = 360 * 2 * dir;
    railRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!railRef.current) return;
    const cardWidth = 350;
    const current = Math.round(railRef.current.scrollLeft / cardWidth);
    setActiveIdx(current % quotes.length);
  };

  return (
    <section className="quotes-section" id="quotes">
      <div className="shelf-heading">
        <div>
          <h2>Quotes</h2>
        </div>
      </div>
      <div className="quotes-carousel-wrapper">
        <div
          className="quotes-track"
          ref={railRef}
          onScroll={handleScroll}
        >
          {quotes.map((item, index) => (
            <article
              key={`${item.book}-${index}`}
              className="quote-card"
              onClick={() => onBookClick && onBookClick(item)}
            >
              <img
                src={item.image}
                alt={item.book}
                className="quote-card-bg"
              />
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
          <span
            key={q.book}
            className={`quote-dot ${activeIdx === idx ? "active" : ""}`}
          />
        ))}
      </div>
    </section>
  );
}

function CartDrawer({ open, onClose, cart, onUpdateQty, onRemove, onClear, onCheckout }) {
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const norm = getNormalizedBook(item.book || item);
    return sum + norm.salePrice * item.quantity;
  }, 0);
  const totalWeight = cart.reduce((sum, item) => {
    const norm = getNormalizedBook(item.book || item);
    return sum + norm.weight * item.quantity;
  }, 0);

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
              <button className="cta" onClick={onClose}>Explore Books</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ id, book, quantity }) => {
                const normBook = getNormalizedBook(book);
                return (
                  <div className="cart-item-row" key={id}>
                    <img src={normBook.image} alt={normBook.title} className="cart-item-thumb" />
                    <div className="cart-item-info">
                      <strong className="cart-item-title">{normBook.title}</strong>
                      <span className="cart-item-author">by {normBook.author}</span>

                      <div className="cart-item-price-row">
                        <span className="cart-item-sale-price">{formatPrice(normBook.salePrice)}</span>
                        {normBook.mrp > normBook.salePrice && (
                          <span className="cart-item-mrp">{formatPrice(normBook.mrp)}</span>
                        )}
                        {normBook.discount > 0 && (
                          <span className="cart-item-discount-badge">{normBook.discount}% OFF</span>
                        )}
                      </div>
                    </div>
                    <div className="cart-item-ctrl">
                      <div className="qty-picker">
                        <button onClick={() => onUpdateQty(id, -1)} aria-label="Decrease quantity"><FiMinus /></button>
                        <span>{quantity}</span>
                        <button onClick={() => onUpdateQty(id, 1)} aria-label="Increase quantity"><FiPlus /></button>
                      </div>
                      <button className="trash-btn" onClick={() => onRemove(id)} title="Remove item" aria-label="Remove item"><FiTrash2 /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line total">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="cta checkout-btn" onClick={onCheckout}>
              Proceed to Checkout • {formatPrice(totalPrice)}
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
  const normBook = getNormalizedBook(book);

  const recommendations = useMemo(() => {
    if (!normBook) return [];
    if (recFilter === "author") {
      const matchAuthor = allBooks.filter((b) => b.id !== normBook.id && b.author.toLowerCase() === normBook.author.toLowerCase());
      if (matchAuthor.length >= 2) return matchAuthor;
    }
    return allBooks.filter((b) => b.id !== normBook.id && (b.genre === normBook.genre || b.categories?.includes(normBook.categories?.[0])));
  }, [normBook, recFilter, allBooks]);

  if (!normBook) return null;

  return (
    <section className="pdp-page">
      <div className="pdp-top-bar">
        <button className="pdp-back-btn" onClick={onBack}>
          <FiChevronLeft /> Back
        </button>
      </div>

      <div className="pdp-main-card">
        <div className="pdp-visual">
          <img className="pdp-cover-full" src={normBook.image} alt={`${normBook.title} by ${normBook.author}`} />
        </div>

        <div className="pdp-details">
          <span className="eyebrow">{normBook.genre || "FEATURED BOOK"}</span>
          <h1 className="pdp-title">{normBook.title}</h1>
          <p className="byline">by {normBook.author}</p>

          <div className="pdp-price-box" style={{ display: "flex", alignItems: "baseline", gap: "10px", margin: "14px 0" }}>
            <span className="pdp-price">{formatPrice(normBook.salePrice)}</span>
            {normBook.mrp > normBook.salePrice && (
              <span className="pdp-mrp-price" style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "18px", fontWeight: 500 }}>
                {formatPrice(normBook.mrp)}
              </span>
            )}
            {normBook.discount > 0 && (
              <span className="pdp-discount-pill" style={{ background: "#fef2f2", color: "#ef4444", border: "1px solid #fca5a5", fontSize: "12px", fontWeight: 800, padding: "3px 8px", borderRadius: "6px" }}>
                {normBook.discount}% OFF
              </span>
            )}
          </div>

          <p className="description">{normBook.description || `A quality-checked Books by Kilo edition of ${normBook.title}.`}</p>

          <div className="hero-actions pdp-actions">
            <button className="cta" onClick={() => onCart(normBook)}>
              <FiShoppingCart /> Add to Cart • <b>{formatPrice(normBook.salePrice)}</b>
            </button>
            <button className={`secondary ${list.includes(normBook.id) ? "saved" : ""}`} onClick={() => onSave(normBook)}>
              {list.includes(normBook.id) ? <FiCheck /> : <FiHeart />} {list.includes(normBook.id) ? "In My List" : "Add to My List"}
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

  const rawBooksList = catalog.length ? catalog : books;
  const allBooks = useMemo(() => rawBooksList.map((b) => getNormalizedBook(b)), [rawBooksList]);

  // Routing and Hash Sync Logic
  const syncRouteFromHash = (currentHash) => {
    const hash = currentHash || window.location.hash || "#home";
    setSelected(null);

    if (hash.startsWith("#book/")) {
      const bookId = hash.replace("#book/", "");
      const foundBook = allBooks.find((b) => String(b.id) === String(bookId));
      if (foundBook) {
        setSelected(foundBook);
      }
      return;
    }

    if (hash.startsWith("#categories/")) {
      const categorySlug = hash.replace("#categories/", "");
      setPage(`category-${categorySlug}`);
      setCategoryFilter(categorySlug);
      setQuery("");
      return;
    }

    if (hash.startsWith("#publishers/")) {
      const pubName = decodeURIComponent(hash.replace("#publishers/", ""));
      setPage(`publisher-${pubName}`);
      setQuery("");
      return;
    }

    if (hash.startsWith("#languages/")) {
      const langName = decodeURIComponent(hash.replace("#languages/", ""));
      setPage(`language-${langName}`);
      setQuery("");
      return;
    }

    if (hash.startsWith("#search")) {
      const match = hash.match(/\?q=(.*)/);
      const searchVal = match ? decodeURIComponent(match[1]) : "";
      setPage("search");
      setQuery(searchVal);
      return;
    }

    const cleanRoute = hash.replace("#", "") || "home";
    setPage(cleanRoute);
    setQuery("");
    setCategoryFilter("all");
  };

  useEffect(() => {
    const handleHashChange = () => syncRouteFromHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    if (window.location.hash) {
      syncRouteFromHash(window.location.hash);
    }
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [allBooks.length]);

  const navigateTo = (targetPage, params = {}) => {
    setMenuOpen(false);
    setMegaOpen(false);
    setSelected(null);

    let hash = `#${targetPage}`;
    if (targetPage === "category" && params.category) {
      hash = `#categories/${params.category}`;
    } else if (targetPage === "publisher" && params.publisher) {
      hash = `#publishers/${encodeURIComponent(params.publisher)}`;
    } else if (targetPage === "language" && params.language) {
      hash = `#languages/${encodeURIComponent(params.language)}`;
    } else if (targetPage === "search" && params.query) {
      hash = `#search?q=${encodeURIComponent(params.query)}`;
    } else if (targetPage === "book" && params.bookId) {
      hash = `#book/${params.bookId}`;
    }

    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      syncRouteFromHash(hash);
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
  const heroTitle = featured && featured.title === "When It Snows"
    ? <>When It<br />Snows</>
    : featured && featured.title === "King Lear"
      ? <>The Adventure of<br />King Lear</>
      : featured?.title;

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
      const searchMatch = !value || [
        book.title,
        book.author,
        book.genre,
        book.tier,
        book.publisher,
        book.language,
        ...(book.categories || []),
      ].some((field) => String(field || "").toLowerCase().includes(value));

      const categoryMatch = categoryFilter === "all" || book.categories?.includes(categoryFilter);
      const tierMatch = tierFilter === "all" || book.tier?.toLowerCase() === tierFilter;

      let pageMatch = true;
      if (page === "home") {
        pageMatch = true;
      } else if (page === "all" || page === "all-books" || page === "categories") {
        pageMatch = true;
      } else if (page === "top10" || page === "top-10-books") {
        pageMatch = true;
      } else if (page === "recently-added") {
        pageMatch = true;
      } else if (page === "brand-new-books" || page === "new" || page === "new-arrivals") {
        pageMatch = book.categories?.includes("new-books") || book.tier === "New";
      } else if (page === "premium" || page === "premium-books") {
        pageMatch = book.tier === "Premium" || book.ratePerKg >= 499;
      } else if (page === "classic" || page === "classic-books") {
        pageMatch = book.tier === "Classic" || (book.ratePerKg >= 399 && book.ratePerKg < 499);
      } else if (page === "standard" || page === "standard-books") {
        pageMatch = book.tier === "Standard" || book.ratePerKg <= 299;
      } else if (page === "bestsellers") {
        pageMatch = book.match >= 90;
      } else if (page === "surprise" || page === "surprise-stack") {
        pageMatch = book.match >= 85;
      } else if (page === "bulk" || page === "bulk-books") {
        pageMatch = book.weight >= 300;
      } else if (page === "extra-discount") {
        pageMatch = book.salePrice <= 220 || book.discount >= 55;
      } else if (page === "collector-books") {
        pageMatch = book.categories?.includes("collector") || book.tier === "Premium";
      } else if (page.startsWith("category-")) {
        const slug = page.replace("category-", "");
        if (slug === "fiction") pageMatch = book.categories?.includes("fiction") || book.genre?.toLowerCase().includes("fiction");
        else if (slug === "non-fiction") pageMatch = book.categories?.includes("non-fiction") || book.genre?.toLowerCase().includes("non-fiction");
        else if (slug === "children") pageMatch = book.categories?.includes("children") || book.genre?.toLowerCase().includes("children");
        else if (slug === "teen-fiction") pageMatch = book.categories?.includes("teen-fiction") || book.genre?.toLowerCase().includes("teen");
        else if (slug === "collector") pageMatch = book.categories?.includes("collector") || book.tier === "Premium";
        else if (slug === "history") pageMatch = book.categories?.includes("history") || book.genre?.toLowerCase().includes("history") || book.title.toLowerCase().includes("history");
        else if (slug === "business") pageMatch = book.categories?.includes("business") || book.genre?.toLowerCase().includes("business");
        else if (slug === "biography") pageMatch = book.categories?.includes("biography") || book.genre?.toLowerCase().includes("biography");
        else pageMatch = book.categories?.includes(slug) || book.genre?.toLowerCase().includes(slug);
      } else if (page.startsWith("publisher-")) {
        const pubName = page.replace("publisher-", "").toLowerCase();
        pageMatch = (book.publisher && book.publisher.toLowerCase().includes(pubName)) ||
                    book.title.toLowerCase().includes(pubName) ||
                    book.author.toLowerCase().includes(pubName);
      } else if (page.startsWith("language-")) {
        const langName = page.replace("language-", "").toLowerCase();
        pageMatch = (book.language && book.language.toLowerCase().includes(langName)) ||
                    book.title.toLowerCase().includes(langName);
      }

      return searchMatch && categoryMatch && tierMatch && pageMatch;
    });

    if (page === "top10" || page === "top-10-books" || page === "bestsellers") {
      return [...result].sort((a, b) => b.match - a.match);
    }
    if (page === "extra-discount") {
      return [...result].sort((a, b) => a.salePrice - b.salePrice);
    }

    return [...result].sort((a, b) =>
      sortBy === "price-low"
        ? a.salePrice - b.salePrice
        : sortBy === "weight"
          ? b.weight - a.weight
          : b.match - a.match
    );
  }, [query, allBooks, categoryFilter, tierFilter, sortBy, page]);

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  };
  const addCart = (rawBook) => {
    const normBook = getNormalizedBook(rawBook);
    if (!normBook) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === normBook.id);
      if (existing) {
        return items.map((item) => item.id === normBook.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { id: normBook.id, book: normBook, quantity: 1 }];
    });
    notify(`Added "${normBook.title}" (${formatPrice(normBook.salePrice)}) to cart`);
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
    if (shelf.key === "new-books" || shelf.title.includes("Brand New")) {
      navigateTo("brand-new-books");
    } else if (shelf.key === "children" || shelf.title.includes("Children")) {
      navigateTo("category", { category: "children" });
    } else if (shelf.key === "teen-fiction" || shelf.title.includes("Teen")) {
      navigateTo("category", { category: "teen-fiction" });
    } else if (shelf.key === "fiction" || shelf.title.includes("Fiction / Non")) {
      navigateTo("category", { category: "fiction" });
    } else if (shelf.key === "premium" || shelf.title.includes("Premium")) {
      navigateTo("premium-books");
    } else if (shelf.key === "classic" || shelf.title.includes("Classic")) {
      navigateTo("classic-books");
    } else if (shelf.key === "standard" || shelf.title.includes("Standard")) {
      navigateTo("standard-books");
    } else if (shelf.key === "collector" || shelf.title.includes("Coffee Table")) {
      navigateTo("collector-books");
    } else if (shelf.title.includes("Top 10")) {
      navigateTo("top-10-books");
    } else if (shelf.title.includes("Recently Added")) {
      navigateTo("recently-added");
    } else if (shelf.title.includes("Extra Discount")) {
      navigateTo("extra-discount");
    } else {
      navigateTo("all-books");
    }
  };
  const toggleList = (book) => {
    const normBook = getNormalizedBook(book);
    if (!normBook) return;
    setList((items) => items.includes(normBook.id) ? items.filter((id) => id !== normBook.id) : [...items, normBook.id]);
  };
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const normFeatured = useMemo(() => getNormalizedBook(featured), [featured]);
  const pageMeta = useMemo(() => getPageMetadata(page, categoryFilter, query), [page, categoryFilter, query]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand text-brand" href="#home" aria-label="Books by Kilo home" onClick={(event) => { event.preventDefault(); navigateTo("home"); }}>
          <img src="/brand/logo.png" alt="Books by Kilo" className="site-logo-img" />
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
                    className={`mega-trigger ${page === "categories" || page.startsWith("category-") || megaOpen ? "active" : ""}`}
                    onClick={(event) => {
                      event.preventDefault();
                      navigateTo("categories");
                    }}
                  >
                    {label} <FiChevronDown className="mega-caret" />
                  </a>

                  {megaOpen && (
                    <div className="mega-dropdown">
                      <div className="mega-container">
                        <div className="mega-left-banner">
                          <span className="mega-badge"><FaFire /> PRE-LOVED BARGAINS</span>
                          <h3>Featured Collections</h3>
                          <p>Quality-checked pre-loved books at unbelievable prices. Shop by collection, genre or author!</p>
                          <button
                            className="mega-featured-btn"
                            onClick={() => navigateTo("all-books")}
                          >
                            Browse All Books <FiChevronRight />
                          </button>
                        </div>

                        <div className="mega-right-grid">
                          <span className="mega-grid-title">EXPLORE CATEGORIES &amp; SECTIONS</span>
                          <div className="mega-category-grid">
                            {[
                              { title: "Top 10 Books", image: "/books/pokemon.jpg", target: "top-10-books" },
                              { title: "Explore by Genre", image: "/books/alice.jpg", target: "categories" },
                              { title: "Recently Added Books", image: "/books/when-it-snows.jpg", target: "recently-added" },
                              { title: "Brand New Books", image: "/books/timetime.jpg", target: "brand-new-books" },
                              { title: "Bestsellers", image: "/books/king-lear.jpg", target: "bestsellers" },
                              { title: "Children Books", image: "/brand/children.webp", target: "category", category: "children" },
                              { title: "Teen Fiction", image: "/books/keira.jpg", target: "category", category: "teen-fiction" },
                              { title: "Fiction Books", image: "/brand/non-fiction.webp", target: "category", category: "fiction" },
                              { title: "Non-Fiction", image: "/brand/non-fiction.webp", target: "category", category: "non-fiction" },
                              { title: "Extra Discount Sale", image: "/books/umbrella-tree.jpg", target: "extra-discount" },
                              { title: "Coffee Table Books", image: "/books/dinosaurs.jpg", target: "collector-books" },
                              { title: "Surprise Stack", image: "/brand/surprise_banner.jpg", target: "surprise-stack" },
                            ].map((cat) => (
                              <button
                                key={cat.title}
                                className="mega-category-card"
                                onClick={() => {
                                  if (cat.category) {
                                    navigateTo("category", { category: cat.category });
                                  } else {
                                    navigateTo(cat.target);
                                  }
                                }}
                              >
                                <img className="mega-cat-img" src={cat.image} alt={cat.title} />
                                <span className="mega-cat-title">{cat.title}</span>
                              </button>
                            ))}
                          </div>
                        </div>
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
                  navigateTo(value);
                }}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <form className="search-field-pill" onSubmit={(e) => { e.preventDefault(); if (query.trim()) navigateTo("search", { query }); }}>
            <span className="search-icon-inside"><FiSearch /></span>
            <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); if (e.target.value.trim()) navigateTo("search", { query: e.target.value }); }} placeholder="Search title, author..." aria-label="Search title, author" />
          </form>

          <button className="cart-btn-trigger" onClick={() => setCartOpen(true)} aria-label="Open shopping cart">
            <FiShoppingCart />
            <span>Cart</span>
            {cartCount > 0 && <b>{cartCount}</b>}
          </button>

          <div style={{ position: "relative" }}>
            <button className="account-button" onClick={() => setProfileOpen(!profileOpen)} aria-label="User account"><FiUser /></button>

            {profileOpen && (
              <div className="profile-dropdown">
                <div className="profile-user-info">
                  <strong>Guest Reader</strong>
                  <small>reader@booksbykilo.in</small>
                </div>
                <hr />
                <button onClick={() => { notify("Saved to My List"); setProfileOpen(false); }}>My Wishlist ({list.length})</button>
                <button onClick={() => { notify("Orders history empty"); setProfileOpen(false); }}>My Orders</button>
                <button className="signout-btn" onClick={() => { notify("Signed out"); setProfileOpen(false); }}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {selected ? (
          <ProductDetailPage
            book={selected}
            onBack={() => {
              window.history.back();
            }}
            onCart={addCart}
            list={list}
            onSave={toggleList}
            allBooks={allBooks}
            onSelectBook={(b) => navigateTo("book", { bookId: b.id })}
          />
        ) : query || page !== "home" ? (
          <section className="search-results catalog-page">
            <div className="catalog-header-banner">
              <nav className="catalog-breadcrumbs" aria-label="Breadcrumbs">
                <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</a>
                <span className="sep">/</span>
                {pageMeta.parent && (
                  <>
                    <a href="#categories" onClick={(e) => { e.preventDefault(); navigateTo("categories"); }}>{pageMeta.parent}</a>
                    <span className="sep">/</span>
                  </>
                )}
                <strong className="current">{pageMeta.title}</strong>
              </nav>

              <div className="catalog-title-row">
                <div>
                  <span className="catalog-kicker">{pageMeta.kicker}</span>
                  <h1 className="catalog-title">{pageMeta.title}</h1>
                  <p className="catalog-description">{pageMeta.description}</p>
                </div>
                <div className="catalog-count-badge">
                  <strong>{filtered.length}</strong> {filtered.length === 1 ? 'Book' : 'Books'} found
                </div>
              </div>
            </div>

            <div className="catalog-toolbar">
              <div className="filter-group">
                {[
                  { label: "All genres", value: "all" },
                  { label: "Children", value: "children" },
                  { label: "Fiction", value: "fiction" },
                  { label: "Non-Fiction", value: "non-fiction" },
                  { label: "Teen Fiction", value: "teen-fiction" },
                  { label: "Collector", value: "collector" }
                ].map((item) => (
                  <button
                    key={item.value}
                    className={categoryFilter === item.value ? "active" : ""}
                    onClick={() => setCategoryFilter(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="catalog-selects">
                <select value={tierFilter} onChange={(event) => setTierFilter(event.target.value)} aria-label="Filter by tier">
                  <option value="all">All prices</option>
                  <option value="standard">Standard Tier (₹299)</option>
                  <option value="classic">Classic Tier (₹399)</option>
                  <option value="premium">Premium Tier (₹499)</option>
                  <option value="new">New books</option>
                </select>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} aria-label="Sort books">
                  <option value="match">Most relevant</option>
                  <option value="price-low">Price: low first</option>
                </select>
              </div>
            </div>

            {filtered.length > 0 ? (
              <div className="results-grid">
                {filtered.map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onOpen={(b) => navigateTo("book", { bookId: b.id })}
                    onCart={addCart}
                    saved={list.includes(book.id)}
                    onSave={toggleList}
                  />
                ))}
              </div>
            ) : (
              <div className="category-not-found">
                <h3>Category Not Found</h3>
                <p>We couldn't find any books matching this collection or filter. Explore our complete catalogue to discover thousands of pre-loved books.</p>
                <button className="cta" onClick={() => navigateTo("all-books")}>Browse All Books</button>
              </div>
            )}
          </section>
        ) : (
          <>
            <section
              className="hero"
              data-hero-title={typeof featured?.title === "string" ? featured.title : "featured"}
              data-hero-id={featured?.id}
            >
              <div className="hero-art">
                <img key={`backdrop-${featured?.id}`} className="hero-backdrop" src={featured?.image} alt="" aria-hidden="true" />
                {featured?.isGoogleReview ? (
                  <div className="google-rating-card-v2">
                    <div className="g-card-v2-left">
                      <div className="g-card-v2-logo-wrapper">
                        <FcGoogle size={48} />
                      </div>
                    </div>
                    <div className="g-card-v2-divider" />
                    <div className="g-card-v2-right">
                      <div className="g-card-v2-header">
                        <span className="g-card-v2-title">Google Rating</span>
                        <span className="g-card-v2-verified-badge" aria-label="Verified">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
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
                          <FcGoogle size={16} />
                          <span>Read our reviews on <strong>Google</strong></span>
                        </span>
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
                    <h1>Google Rating <em>4.8</em></h1>
                    <p className="byline">by 50,000+ Verified Readers Across India</p>
                    <div className="hero-meta">
                      <span><FiCheck /> 100% Authentic Books</span>
                      <span>4.8 / 5 Rating</span>
                      <span>1,248+ Reviews</span>
                    </div>
                    <p className="description">{googleReviewSlide.description}</p>
                    <div className="hero-actions">
                      <button className="cta" onClick={() => navigateTo("all-books")}>
                        <FiShoppingCart /> Shop Bestsellers
                      </button>
                      <button
                        className="secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open("https://www.google.com/search?q=booksbykilo+reviews", "_blank");
                        }}
                      >
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
                      <button className="secondary" onClick={() => navigateTo("book", { bookId: normFeatured.id })}><FiInfo /> More Info</button>
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
                <Shelf shelf={{ title: "Top 10 Books This Week" }} items={[...allBooks].sort((a, b) => b.match - a.match).slice(0, 10)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} rank />
              </div>

              {/* 2. Explore by Genre */}
              <section className="discovery-section genre-section" id="genres">
                <div className="shelf-heading">
                  <div>
                    <h2>Explore by Genre</h2>
                  </div>
                </div>
                <div className="genre-grid">
                  {genreItems.map(([title, subtitle, image, catKey], index) => (
                    <button
                      key={title}
                      className={`genre-card genre-${index + 1}`}
                      onClick={() => navigateTo(catKey === "classic-books" ? "classic-books" : "category", { category: catKey })}
                    >
                      <img src={image} alt={title} />
                      <b className="genre-number">{String(index + 1).padStart(2, "0")}</b>
                      <span className="genre-meta">
                        <strong>{title}</strong>
                        <small>{subtitle}</small>
                      </span>
                    </button>
                  ))}
                  {/* Desktop Surprise Stack Card */}
                  <button
                    className="genre-card genre-surprise desktop-surprise-card"
                    onClick={() => navigateTo("surprise-stack")}
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
                  onClick={() => navigateTo("surprise-stack")}
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
              <Shelf shelf={{ title: "Recently Added Books", subtitle: "Freshly stocked arrivals." }} items={allBooks.slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 4. Brand New Books */}
              <Shelf shelf={{ title: "Brand New Books", subtitle: "Straight from the press." }} items={[...internetNewBooks.map(getNormalizedBook), ...allBooks.filter((book) => book.categories?.includes("new-books"))].slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 5. Banner Mid */}
              <section className="gradient-highlight">
                <div className="editor-copy">
                  <span className="eyebrow">CURATED FOR CURIOUS READERS</span>
                  <h2>Bestseller Collections</h2>
                  <p style={{ color: "#cbd5e1", fontSize: "14px", marginTop: "4px" }}>Unbeatable deals on bestselling pre-loved titles.</p>
                  <button onClick={() => navigateTo("bestsellers")}>Explore Bestsellers <FiChevronRight /></button>
                </div>
                <div className="editor-stack">
                  {[...allBooks].sort((a, b) => b.match - a.match).slice(0, 5).map((book, index) => (
                    <button key={book.id} style={{ "--editor-index": index }} onClick={() => navigateTo("book", { bookId: book.id })} aria-label={`View ${book.title}`}><img src={book.image} alt={`${book.title} cover`} /></button>
                  ))}
                </div>
              </section>

              {/* 6. Children Books */}
              <Shelf shelf={{ title: "Children Books", subtitle: "Magic for little readers." }} items={allBooks.filter((book) => book.categories?.includes("children")).slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 7. Teen Fiction */}
              <Shelf shelf={{ title: "Teen Fiction", subtitle: "Captivating young adult reads." }} items={allBooks.filter((book) => book.categories?.includes("teen-fiction")).slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 8. Fiction / Non-Fiction */}
              <Shelf shelf={{ title: "Fiction / Non-Fiction", subtitle: "From wild imaginations to real facts." }} items={allBooks.filter((book) => book.categories?.includes("fiction") || book.categories?.includes("non-fiction")).slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 9. Explore by Authors */}
              <section className="discovery-section author-section" id="authors">
                <div className="shelf-heading">
                  <div>
                    <h2>Explore by Authors</h2>
                  </div>
                </div>
                <div className="author-grid">
                  {authors.map((author) => (
                    <button key={author.name} className="author-card" onClick={() => navigateTo("all-books", { query: author.name })} aria-label={`Browse books by ${author.name}`}>
                      <div className="author-info">
                        <strong>{author.name}</strong>
                        <small>{author.genre}</small>
                      </div>
                      <FiChevronRight className="author-arrow" />
                    </button>
                  ))}
                </div>
              </section>

              {/* 10. Extra Discount Sale */}
              <Shelf shelf={{ title: "Extra Discount Sale", subtitle: "Massive markdowns on top titles." }} items={[...allBooks].sort((a, b) => a.salePrice - b.salePrice).slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* 11. Explore by Regional Languages */}
              <section className="discovery-section language-section" id="languages">
                <div className="shelf-heading">
                  <div>
                    <h2>Explore by Regional Languages</h2>
                  </div>
                </div>
                <div className="language-grid">
                  {languages.map(([language, native, image]) => (
                    <button key={language} onClick={() => navigateTo("language", { language: language })}>
                      <span><strong>{native}</strong><small>{language}</small></span><img src={image} alt="" />
                    </button>
                  ))}
                </div>
              </section>

              {/* 12. Coffee Table Books */}
              <Shelf shelf={{ title: "Coffee Table Books", subtitle: "Stunning visual statements." }} items={allBooks.filter((book) => book.categories?.includes("collector") || book.tier === "Premium" || book.tier === "Classic").slice(0, 24)} onOpen={(b) => navigateTo("book", { bookId: b.id })} onCart={addCart} list={list} onSave={toggleList} onViewAll={handleViewAll} />

              {/* Quotes Section (Positioned Directly Above Choose by Pricing) */}
              <BookQuotesSection quotes={bookQuotes} onBookClick={(q) => navigateTo("all-books", { query: q.book })} />

              {/* 13. Choose by Pricing */}
              <section className="collection-section" id="categories">
                <div className="shelf-heading">
                  <div>
                    <h2>Choose by Pricing</h2>
                  </div>
                </div>
                <div className="collection-grid">
                  {collections.map((collection) => (
                    <button className="collection-card gradient-reader-card" key={collection.title} onClick={() => navigateTo(collection.route)}>
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
              <span>Authentic pre-loved books</span>
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>

          <div className="footer-right-col">
            <nav className="footer-vertical-nav">
              <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo("home"); }}>Home</a>
              <a href="#all-books" onClick={(e) => { e.preventDefault(); navigateTo("all-books"); }}>All Books</a>
              <a href="#categories" onClick={(e) => { e.preventDefault(); navigateTo("categories"); }}>Categories</a>
              <a href="#surprise-stack" onClick={(e) => { e.preventDefault(); navigateTo("surprise-stack"); }}>Surprise Stack</a>
              <a href="#bulk-books" onClick={(e) => { e.preventDefault(); navigateTo("bulk-books"); }}>Bulk Books</a>
              <a href="#bestsellers" onClick={(e) => { e.preventDefault(); navigateTo("bestsellers"); }}>Bestsellers</a>
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

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={updateCartQty}
        onRemove={removeFromCart}
        onClear={clearCart}
        onCheckout={() => {
          if (!cart.length) return;
          notify("Redirecting to secure checkout...");
        }}
      />

      {toast && <div className="toast"><FiCheck /> {toast}</div>}
    </div>
  );
}
