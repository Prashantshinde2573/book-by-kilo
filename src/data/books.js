// ─── Utilities ───────────────────────────────────────────────────────────────

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

export function getPageMetadata(page, categoryFilter, query) {
  if (query) return { kicker: "SEARCH RESULTS", title: `Search Results for "${query}"`, description: `Showing quality-checked pre-loved books matching "${query}".`, parent: "Search" };
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

// ─── Static Books ─────────────────────────────────────────────────────────────

export const books = [
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

export const internetNewBooks = [
  { id: "new-departures", title: "Departure(s)", author: "Julian Barnes", image: "https://upload.wikimedia.org/wikipedia/en/6/62/Departure%28s%29_%28novel%29.png", categories: ["new-books", "fiction"], genre: "Fiction", tier: "New", price: 499, weight: 320, match: 97, description: "Julian Barnes blends fiction, memory and reflection in his 2026 novel." },
  { id: "new-half-his-age", title: "Half His Age", author: "Jennette McCurdy", image: "https://covers.openlibrary.org/b/isbn/9780593723739-L.jpg", categories: ["new-books", "fiction"], genre: "Fiction", tier: "New", price: 499, weight: 410, match: 95, description: "A provocative 2026 debut novel about power, desire and identity." },
  { id: "new-secret-secrets", title: "The Secret of Secrets", author: "Dan Brown", image: "https://covers.openlibrary.org/b/isbn/9780385546898-L.jpg", categories: ["new-books", "fiction"], genre: "Mystery & Thriller", tier: "New", price: 499, weight: 560, match: 98, description: "Robert Langdon returns in Dan Brown's bestselling mystery thriller." },
  { id: "new-alchemised", title: "Alchemised", author: "SenLinYu", image: "https://covers.openlibrary.org/b/isbn/9780593972700-L.jpg", categories: ["new-books", "fiction"], genre: "Fantasy", tier: "New", price: 499, weight: 720, match: 96, description: "An ambitious gothic fantasy debut filled with alchemy, memory and war." },
  { id: "new-typewriter", title: "The Typewriter and the Guillotine", author: "Mark Braude", image: "https://upload.wikimedia.org/wikipedia/en/thumb/6/67/The_Typewriter_and_the_Guillotine_%28Book_Cover%29.jpeg/500px-The_Typewriter_and_the_Guillotine_%28Book_Cover%29.jpeg", categories: ["new-books", "non-fiction"], genre: "History & Politics", tier: "New", price: 499, weight: 480, match: 91, description: "A gripping true story of journalism, crime and Paris on the eve of war." },
];

export const collections = [
  { title: "New Books", subtitle: "Up to 80% off", image: "/brand/new-books.webp", route: "brand-new-books" },
  { title: "Premium Books", subtitle: "Collector Editions", image: "/brand/premium.webp", route: "premium-books" },
  { title: "Non-Fiction", subtitle: "Books around us", image: "/brand/non-fiction.webp", route: "category-non-fiction" },
  { title: "Children Books", subtitle: "The best childhood", image: "/brand/children.webp", route: "category-children" },
  { title: "Classic Books", subtitle: "Evergreen Reads", image: "/brand/classic.webp", route: "classic-books" },
  { title: "Standard Books", subtitle: "Everyday Reads", image: "/brand/standard.webp", route: "standard-books" },
  { title: "Collector Books", subtitle: "Coffee table editions", image: "/brand/coffee.webp", route: "collector-books" },
  { title: "Surprise Stack", subtitle: "Starting ₹300", image: "/brand/surprise_banner.jpg", route: "surprise-stack" },
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
  ["Fiction", "Stories to disappear into", "/books/alice.jpg", "fiction"],
  ["Non-Fiction", "Ideas, lives & the real world", "/brand/non-fiction.webp", "non-fiction"],
  ["Classics", "Timeless books worth revisiting", "/brand/classic.webp", "classic-books"],
  ["Teen Fiction", "Bold stories for new generations", "/books/keira.jpg", "teen-fiction"],
  ["History", "People, places & turning points", "/catalog/9781416548485-better.jpg", "history"],
  ["Business", "Ideas that move careers forward", "/catalog/9780312541866-better.jpg", "business"],
  ["Biography", "Remarkable lives, honestly told", "/catalog/9781443408486-better.jpg", "biography"],
];

export const surpriseCard = ["Surprise Stack", "Unexpected reads, picked just for you.", "/brand/surprise_banner.jpg"];

export const languages = [
  ["English", "English", "/books/alice.jpg"],
  ["Hindi", "हिन्दी", "/books/king-lear.jpg"],
  ["Marathi", "मराठी", "/brand/classic.webp"],
  ["Bengali", "বাংলা", "/books/bright-eyes.jpg"],
  ["Gujarati", "ગુજરાતી", "/brand/non-fiction.webp"],
  ["Tamil", "தமிழ்", "/books/much-ado.jpg"],
];

export const bookQuotes = [
  { quote: "When you want something, all the universe conspires in helping you to achieve it.", book: "The Alchemist", author: "Paulo Coelho", image: "/books/alice.jpg" },
  { quote: "It is our choices that show what we truly are, far more than our abilities.", book: "Harry Potter & Chamber of Secrets", author: "J.K. Rowling", image: "https://covers.openlibrary.org/b/isbn/9780439064873-L.jpg" },
  { quote: "Not all those who wander are lost.", book: "The Fellowship of the Ring", author: "J.R.R. Tolkien", image: "https://covers.openlibrary.org/b/isbn/9780547928210-L.jpg" },
  { quote: "Whatever our souls are made of, his and mine are the same.", book: "Wuthering Heights", author: "Emily Brontë", image: "/brand/classic.webp" },
  { quote: "The only way out of the labyrinth of suffering is to forgive.", book: "Looking for Alaska", author: "John Green", image: "/books/keira.jpg" },
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

// slug → { category filter keys used in filter logic }
export const categorySlugMap = {
  fiction: { label: "Fiction Books", filter: (b) => b.categories?.includes("fiction") || b.genre?.toLowerCase().includes("fiction") },
  "non-fiction": { label: "Non-Fiction Books", filter: (b) => b.categories?.includes("non-fiction") || b.genre?.toLowerCase().includes("non-fiction") },
  "children-books": { label: "Children Books", filter: (b) => b.categories?.includes("children") || b.genre?.toLowerCase().includes("children") },
  "teen-fiction": { label: "Teen Fiction Books", filter: (b) => b.categories?.includes("teen-fiction") || b.genre?.toLowerCase().includes("teen") },
  "classic-books": { label: "Classic Books", filter: (b) => b.tier === "Classic" || b.genre?.toLowerCase().includes("classic") },
  "standard-books": { label: "Standard Books", filter: (b) => b.tier === "Standard" },
  "premium-books": { label: "Premium Books", filter: (b) => b.tier === "Premium" || b.ratePerKg >= 499 },
  "coffee-table-books": { label: "Coffee Table Books", filter: (b) => b.categories?.includes("collector") || b.tier === "Premium" },
  "surprise-stack": { label: "Surprise Stack", filter: (b) => b.match >= 85 },
  "books-in-bulk": { label: "Books in Bulk", filter: (b) => b.weight >= 300 },
  history: { label: "History Books", filter: (b) => b.categories?.includes("history") || b.genre?.toLowerCase().includes("history") },
  business: { label: "Business Books", filter: (b) => b.categories?.includes("business") || b.genre?.toLowerCase().includes("business") },
  biography: { label: "Biography Books", filter: (b) => b.categories?.includes("biography") || b.genre?.toLowerCase().includes("biography") },
};
