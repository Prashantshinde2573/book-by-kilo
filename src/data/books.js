// ─── Real Books by Kilo Complete Dataset (Imported via optimized JSON) ─────────────
import rawBooks from "./books.json";

export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return "₹0";
  return `₹${Number(price).toLocaleString("en-IN")}`;
};

export function getNormalizedBook(book) {
  if (!book) return null;
  const weight = Number(book.weight) || 300;
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

  if (mrp <= salePrice) mrp = Math.round(salePrice * 2.2);
  const discount = mrp > salePrice ? Math.round(((mrp - salePrice) / mrp) * 100) : 0;

  const text = (String(book.title || "") + " " + String(book.author || "") + " " + String(book.genre || "") + " " + (book.categories || []).join(" ")).toLowerCase();
  
  let langs = ["English"];
  if (text.includes("gandhi")) {
    langs = ["Hindi", "Gujarati", "English"];
  } else if (text.includes("narayan") || text.includes("ramayana")) {
    langs = ["Tamil", "Hindi", "English"];
  } else if (text.includes("murti") || text.includes("murty") || text.includes("mahabharata")) {
    langs = ["Marathi", "Kannada", "Hindi", "English"];
  } else if (text.includes("ruskin") || text.includes("bond") || text.includes("tagore")) {
    langs = ["Hindi", "Bengali", "English"];
  } else if (text.includes("narayana murthy")) {
    langs = ["Marathi", "Kannada", "English"];
  } else if (text.includes("alpen") || text.includes("karfeld")) {
    langs = ["German", "English"];
  }

  const primaryLang = book.language || langs[0];

  return {
    ...book,
    id: book.id || String(Math.random()),
    title: book.title || "Untitled Book",
    author: book.author || "Unknown Author",
    image: book.image || "https://www.booksbykilo.in/media/staticimages/logo_t_5k.png",
    weight,
    weightUnit: book.weightUnit || "gm",
    ratePerKg,
    salePrice,
    mrp,
    discount,
    tier: book.tier || (ratePerKg >= 499 ? "Premium" : ratePerKg >= 399 ? "Classic" : "Standard"),
    language: primaryLang,
    languages: book.languages || langs,
    match: book.match || 90,
  };
}

export const categorySlugMap = {
  "children": "children-books",
  "children-books": "children-books",
  "teen": "teen-fiction",
  "teen-fiction": "teen-fiction",
  "fiction": "fiction",
  "non-fiction": "non-fiction",
  "classic": "classic-books",
  "classic-books": "classic-books",
  "standard": "standard-books",
  "standard-books": "standard-books",
  "premium": "premium-books",
  "premium-books": "premium-books",
  "new-books": "new-books",
  "collector": "coffee-table-books",
  "coffee-table-books": "coffee-table-books",
  "history": "history",
  "business": "business",
  "biography": "biography",
};

export function getPageMetadata(page) {
  if (page.startsWith("category-")) {
    const slug = page.replace("category-", "");
    const categoryDetails = {
      fiction: { title: "Fiction Books", description: "Captivating novels, mystery thrillers, romance, and timeless stories to disappear into." },
      "non-fiction": { title: "Non-Fiction Books", description: "Inspiring biographies, history, science, business, and books about the real world." },
      children: { title: "Children Books", description: "Picture books, activity guides, early learning, and fairytale wonder for young readers." },
      "children-books": { title: "Children Books", description: "Picture books, activity guides, early learning, and fairytale wonder for young readers." },
      "teen-fiction": { title: "Teen Fiction Books", description: "Bold young adult novels, fantasy sagas, coming-of-age stories, and teen romance." },
      collector: { title: "Coffee Table & Collector Books", description: "Stunning visual editions, art portfolios, photography, and luxury hardcovers." },
      "coffee-table-books": { title: "Coffee Table Books", description: "Stunning visual editions, art portfolios, photography, and luxury hardcovers." },
      history: { title: "History & Politics Books", description: "Fascinating historical accounts, world events, political memoirs, and documentaries." },
      business: { title: "Business & Leadership Books", description: "Career insights, economics, startup guides, and leadership wisdom." },
      biography: { title: "Biography & Memoir Books", description: "Inspiring personal journeys, memoirs, and stories of extraordinary lives." },
      "classic-books": { title: "Classic Books", description: "Timeless literature and world classics." },
      "standard-books": { title: "Standard Books", description: "Budget-friendly reads, children's stories, and popular paperbacks." },
      "premium-books": { title: "Premium Books", description: "Top-tier collectible hardcovers, art editions, and pristine titles." },
      "surprise-stack": { title: "Surprise Stack", description: "Curated mystery boxes of unexpected hand-picked reads." },
      "books-in-bulk": { title: "Books in Bulk", description: "Wholesale packages and curated sets for libraries, schools & avid collectors." },
    }[slug] || { title: `${slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())} Books`, description: `Browse quality-checked ${slug.replace(/-/g, " ")} books by weight.` };
    return { kicker: "GENRE COLLECTION", title: categoryDetails.title, description: categoryDetails.description, parent: "Categories" };
  }
  if (page.startsWith("publisher-")) {
    const pub = page.replace("publisher-", "");
    return { kicker: "PUBLISHER IMPRINT", title: `${pub} Books`, description: `Explore quality-checked pre-loved editions published by ${pub}.`, parent: "Publishers" };
  }
  if (page.startsWith("language-")) {
    const lang = page.replace("language-", "");
    return { kicker: "REGIONAL LITERATURE", title: `${lang} Books`, description: `Authentic pre-loved literature and popular titles in ${lang}.`, parent: "Languages" };
  }
  const pagesMap = {
    "top10": { kicker: "CURATED COLLECTION", title: "Top 10 Bestselling Books", description: "The absolute must-reads of the season.", parent: "Collections" },
    "top-10-books": { kicker: "CURATED COLLECTION", title: "Top 10 Bestselling Books", description: "The absolute must-reads of the season.", parent: "Collections" },
    "recently-added": { kicker: "FRESH ARRIVALS", title: "Recently Added Books", description: "Freshly cataloged pre-loved titles arriving daily.", parent: "Collections" },
    "brand-new-books": { kicker: "MINT CONDITION", title: "Brand New Books (Up to 80% Off)", description: "Unread, publisher-direct copies in pristine condition.", parent: "Collections" },
    "premium": { kicker: "COLLECTOR EDITIONS", title: "Premium Books Collection", description: "Top-tier collectible hardcovers, art editions, and pristine titles.", parent: "Collections" },
    "premium-books": { kicker: "COLLECTOR EDITIONS", title: "Premium Books Collection", description: "Top-tier collectible hardcovers, art editions, and pristine titles.", parent: "Collections" },
    "classic": { kicker: "EVERGREEN READS", title: "Classic Books Collection", description: "Timeless literature, popular fiction, and world classics.", parent: "Collections" },
    "classic-books": { kicker: "EVERGREEN READS", title: "Classic Books Collection", description: "Timeless literature, popular fiction, and world classics.", parent: "Collections" },
    "standard": { kicker: "EVERYDAY READS", title: "Standard Books Collection", description: "Budget-friendly reads, children's stories, and popular paperbacks.", parent: "Collections" },
    "standard-books": { kicker: "EVERYDAY READS", title: "Standard Books Collection", description: "Budget-friendly reads, children's stories, and popular paperbacks.", parent: "Collections" },
    "bestsellers": { kicker: "MOST POPULAR", title: "Bestseller Books", description: "India's most loved pre-loved titles.", parent: "Collections" },
    "new-arrivals": { kicker: "NEW ARRIVALS", title: "New Arrivals", description: "The latest additions to our Books by Kilo inventory.", parent: "Collections" },
    "bulk-books": { kicker: "WHOLESALE & LIBRARIES", title: "Bulk Books & Wholesale Stacks", description: "Wholesale packages for libraries, schools & avid collectors.", parent: "Collections" },
    "surprise-stack": { kicker: "MYSTERY BOX", title: "Surprise Stack Mystery Box", description: "Curated mystery boxes of unexpected hand-picked reads starting at ₹300.", parent: "Collections" },
    "extra-discount": { kicker: "SPECIAL OFFER", title: "Extra Discount Sale", description: "Massive markdowns on top titles.", parent: "Collections" },
    "collector-books": { kicker: "SPECIALTY COLLECTION", title: "Coffee Table & Collector Books", description: "Stunning visual editions, art portfolios, photography, and luxury hardcovers.", parent: "Collections" },
    "categories": { kicker: "ALL CATEGORIES", title: "Explore All Categories", description: "Choose by genre, pricing tier, publisher imprint, or language.", parent: "Catalogue" },
    "all": { kicker: "COMPLETE CATALOGUE", title: "All Books Catalogue", description: "Browse our complete catalog of quality-checked pre-loved books.", parent: "Catalogue" },
    "all-books": { kicker: "COMPLETE CATALOGUE", title: "All Books Catalogue", description: "Browse our complete catalog of quality-checked pre-loved books.", parent: "Catalogue" },
    "catalogue": { kicker: "COMPLETE CATALOGUE", title: "All Books Catalogue", description: "Browse our complete catalog of quality-checked pre-loved books.", parent: "Catalogue" },
  };
  return pagesMap[page] || { kicker: "BOOKS BY KILO", title: page.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()), description: `Explore our quality-checked pre-loved book collection.`, parent: "Catalogue" };
}

// ─── All Real Books from Books By Kilo (Official Covers & Data) ───────────────
export const books = rawBooks;

export const collections = [
  { title: "Brand New Books", subtitle: "Direct from publishers (Up to 80% off)", route: "brand-new-books", image: "/brand/new-books.webp" },
  { title: "Premium Books", subtitle: "₹499/kg (Hardcovers & Art editions)", route: "premium-books", image: "/brand/coffee.webp" },
  { title: "Non-Fiction", subtitle: "₹299/kg (Ideas, Science & Real World)", route: "category-non-fiction", image: "/brand/non-fiction.webp" },
  { title: "Children Books", subtitle: "₹299/kg (Stories & Learning)", route: "category-children", image: "/brand/children.webp" },
  { title: "Classic Books", subtitle: "₹399/kg (Timeless Literature)", route: "classic-books", image: "/brand/classic.webp" },
  { title: "Standard Books", subtitle: "₹299/kg (Everyday treasures)", route: "standard-books", image: "/brand/standard.webp" },
  { title: "Coffee Table Books", subtitle: "₹499/kg (Visual Statements)", route: "collector-books", image: "/brand/coffee.webp" },
  { title: "Surprise Stack", subtitle: "Curated mystery bundles from ₹300", route: "surprise-stack", image: "/brand/surprise_banner.jpg" },
];

export const publishers = [
  { name: "Penguin Random House", mark: "penguin" },
  { name: "HarperCollins", mark: "harper" },
  { name: "Scholastic", mark: "scholastic" },
  { name: "Macmillan", mark: "macmillan" },
  { name: "Hachette", mark: "hachette" },
  { name: "Usborne", mark: "usborne" },
  { name: "Oxford University Press", mark: "oxford" },
  { name: "Simon & Schuster", mark: "simon" },
];

export const authors = [
  { 
    name: "J.K. Rowling", 
    genre: "Fantasy & Magic", 
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Agatha Christie", 
    genre: "Crime & Mystery", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Stephen King", 
    genre: "Horror & Suspense", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Roald Dahl", 
    genre: "Children's Classics", 
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Enid Blyton", 
    genre: "Adventure & Mystery", 
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Ruskin Bond", 
    genre: "Short Stories & Life", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "Dan Brown", 
    genre: "Thrillers & Symbols", 
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80" 
  },
  { 
    name: "George R.R. Martin", 
    genre: "Epic Fantasy", 
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80" 
  },
];

export const genreItems = [
  ["Children", "Picture books, learning & wonder", "/brand/children.webp", "children-books"],
  ["Fiction", "Stories to disappear into", "/brand/children.webp", "fiction"],
  ["Non-Fiction", "Ideas, lives & the real world", "/brand/non-fiction.webp", "non-fiction"],
  ["Classics", "Timeless books worth revisiting", "/brand/classic.webp", "classic-books"],
  ["Teen Fiction", "Bold stories for new generations", "/brand/children.webp", "teen-fiction"],
  ["History", "People, places & turning points", "/brand/non-fiction.webp", "history"],
  ["Business", "Ideas that move careers forward", "/brand/non-fiction.webp", "business"],
  ["Biography", "Remarkable lives, honestly told", "/brand/classic.webp", "biography"],
];

export const surpriseCard = ["Surprise Stack", "Unexpected reads, picked just for you.", "/brand/surprise_banner.jpg"];

export const languages = [
  ["English", "English", "/brand/classic.webp"],
  ["Hindi", "हिन्दी", "/brand/non-fiction.webp"],
  ["Marathi", "मराठी", "/brand/classic.webp"],
  ["Bengali", "বাংলা", "/brand/children.webp"],
  ["Gujarati", "ગુજરાતી", "/brand/non-fiction.webp"],
  ["Tamil", "தமிழ்", "/brand/classic.webp"],
];

export const bookQuotes = [
  { quote: "When you want something, all the universe conspires in helping you to achieve it.", book: "The Alchemist", author: "Paulo Coelho", image: "/brand/classic.webp" },
  { quote: "It is our choices that show what we truly are, far more than our abilities.", book: "Harry Potter & Chamber of Secrets", author: "J.K. Rowling", image: "/brand/children.webp" },
  { quote: "Not all those who wander are lost.", book: "The Fellowship of the Ring", author: "J.R.R. Tolkien", image: "/brand/classic.webp" },
  { quote: "Whatever our souls are made of, his and mine are the same.", book: "Wuthering Heights", author: "Emily Brontë", image: "/brand/classic.webp" },
  { quote: "The only way out of the labyrinth of suffering is to forgive.", book: "Looking for Alaska", author: "John Green", image: "/brand/children.webp" },
  { quote: "So we beat on, boats against the current, borne back ceaselessly into the past.", book: "The Great Gatsby", author: "F. Scott Fitzgerald", image: "/brand/coffee.webp" },
  { quote: "There is no friend as loyal as a book.", book: "A Moveable Feast", author: "Ernest Hemingway", image: "/brand/non-fiction.webp" },
  { quote: "Until I feared I would lose it, I never loved to read. One does not love breathing.", book: "To Kill a Mockingbird", author: "Harper Lee", image: "/brand/new-books.webp" },
];

export const googleReviewSlide = {
  id: "google-review-slide",
  isGoogleReview: true,
  title: "Google Rating 4.8",
  author: "Verified Google Reviews",
  rating: "4.8",
  reviewsCount: "379 Reviews",
  description: "Rated 4.8 out of 5 stars by 379+ verified book lovers across India. Highest rated online store for authentic pre-loved books by weight.",
  image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900&auto=format&fit=crop&q=60",
};

export const internetNewBooks = [];
