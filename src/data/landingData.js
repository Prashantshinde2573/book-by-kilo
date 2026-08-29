// ─── Landing Page Configurations & Data Helpers ─────────────────────────────

export const categoryConfigs = {
  "children-books": {
    title: "Children's Books",
    image: "/brand/children.webp",
    kicker: "CHILDREN & EARLY READERS",
    description: "Spark imagination and wonder with enchanting picture books, early learning guides, bedtime stories, and timeless fairytale classics for young readers.",
    cataloguePath: "/catalogue?category=children-books",
    accentColor: "#ec4899",
    perks: ["Ages 0–12 Years", "Quality-Checked Paperbacks", "Pristine Touch & Feel"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("children") || cats.includes("children-books") || g.includes("children") || g.includes("kids") || g.includes("picture") || g.includes("activity");
    },
  },
  fiction: {
    title: "Fiction Books",
    image: "/books/alice.jpg",
    kicker: "LITERARY FICTION & NOVELS",
    description: "Immerse yourself in captivating storytelling, contemporary novels, gripping thrillers, sweeping fantasy worlds, and unforgettable literary escapes.",
    cataloguePath: "/catalogue?category=fiction",
    accentColor: "#3b82f6",
    perks: ["Bestselling Authors", "Award-Winning Titles", "Unbeatable ₹/Kg Rates"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("fiction") || g.includes("fiction") || g.includes("novel") || g.includes("story") || g.includes("fantasy") || g.includes("thriller") || g.includes("mystery");
    },
  },
  "non-fiction": {
    title: "Non-Fiction Books",
    image: "/brand/non-fiction.webp",
    kicker: "IDEAS, SCIENCE & THE REAL WORLD",
    description: "Broaden your perspectives with insightful biographies, eye-opening world histories, real-world science, psychology, philosophy, and thought-provoking ideas.",
    cataloguePath: "/catalogue?category=non-fiction",
    accentColor: "#10b981",
    perks: ["Real-World Insights", "Popular Science & Tech", "Essential Knowledge"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("non-fiction") || cats.includes("nonfiction") || g.includes("non-fiction") || g.includes("history") || g.includes("business") || g.includes("biography") || g.includes("science");
    },
  },
  "classic-books": {
    title: "Classic Literature",
    image: "/brand/classic.webp",
    kicker: "TIMELESS & EVERGREEN",
    description: "Rediscover the greatest enduring masterpieces of world literature, Shakespearean drama, vintage heritage editions, and evergreen classics worth keeping forever.",
    cataloguePath: "/catalogue?category=classic-books",
    accentColor: "#f59e0b",
    perks: ["Masterpiece Editions", "Heritage Literature", "Essential Home Library"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return b.tier?.toLowerCase() === "classic" || cats.includes("classic") || cats.includes("classic-books") || g.includes("classic") || g.includes("literature");
    },
  },
  "teen-fiction": {
    title: "Teen & Young Adult",
    image: "/books/keira.jpg",
    kicker: "YOUNG ADULT & FANTASY",
    description: "Compelling young adult novels, magical fantasy sagas, dystopian adventures, coming-of-age journeys, and bold stories made for fearless young hearts.",
    cataloguePath: "/catalogue?category=teen-fiction",
    accentColor: "#8b5cf6",
    perks: ["YA Bestsellers", "Fantasy & Romance", "Trending Reader Picks"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("teen") || cats.includes("teen-fiction") || g.includes("teen") || g.includes("young adult") || g.includes("ya");
    },
  },
  "coffee-table-books": {
    title: "Coffee Table & Collector Books",
    image: "/brand/coffee.webp",
    kicker: "VISUAL STATEMENTS & LUXURY HARDCOVERS",
    description: "Lavish visual statements, fine art portfolios, iconic architectural photography, luxury oversized hardcovers, and prestigious collector's editions.",
    cataloguePath: "/catalogue?category=coffee-table-books",
    accentColor: "#d97706",
    perks: ["Premium Hardcovers", "Art & Photography", "Collector Quality"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("collector") || cats.includes("coffee-table-books") || b.tier === "Premium" || g.includes("coffee") || g.includes("art") || g.includes("photography");
    },
  },
  history: {
    title: "History & Politics",
    image: "/catalog/9781416548485-better.jpg",
    kicker: "TURNING POINTS & MEMOIRS",
    description: "Fascinating historical accounts, landmark political events, eyewitness memoirs, world chronicles, and the true stories that shaped civilization.",
    cataloguePath: "/catalogue?category=history",
    accentColor: "#ef4444",
    perks: ["World History", "Political Commentary", "Real Human Drama"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("history") || g.includes("history") || g.includes("politics") || g.includes("war");
    },
  },
  business: {
    title: "Business & Leadership",
    image: "/catalog/9780312541866-better.jpg",
    kicker: "GROWTH, STRATEGY & CAREERS",
    description: "Unlock actionable career strategies, startup case studies, economics, finance, personal mastery, and leadership wisdom from world-renowned thinkers.",
    cataloguePath: "/catalogue?category=business",
    accentColor: "#0ea5e9",
    perks: ["Startup Playbooks", "Finance & Investing", "Executive Wisdom"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("business") || g.includes("business") || g.includes("economics") || g.includes("leadership") || g.includes("finance");
    },
  },
  biography: {
    title: "Biography & Memoir",
    image: "/catalog/9781443408486-better.jpg",
    kicker: "EXTRAORDINARY LIVES",
    description: "Intimate and extraordinary life journeys of groundbreaking artists, world leaders, scientists, historical icons, and inspiring trailblazers.",
    cataloguePath: "/catalogue?category=biography",
    accentColor: "#14b8a6",
    perks: ["Autobiographies", "Iconic Memoirs", "Honest & Inspiring"],
    filterFn: (b) => {
      const g = String(b.genre || "").toLowerCase();
      const cats = (b.categories || []).map((c) => String(c).toLowerCase());
      return cats.includes("biography") || g.includes("biography") || g.includes("memoir") || g.includes("autobiography");
    },
  },
};

export const collectionConfigs = {
  "new-books": {
    title: "Brand New Books",
    image: "/brand/new-books.webp",
    kicker: "UNREAD & PRISTINE (UP TO 80% OFF)",
    description: "Unread, publisher-direct copies in pristine condition at a fraction of retail bookstore prices. Mint condition paperbacks, hardcovers, and boxed sets.",
    cataloguePath: "/catalogue?collection=new-books",
    accentColor: "#f43f5e",
    perks: ["Up to 80% Off MRP", "Publisher Direct", "100% Unread & Mint"],
    filterFn: (b) => b.tier?.toLowerCase() === "new" || (b.categories || []).includes("new-books"),
  },
  "premium-books": {
    title: "Premium Books Collection",
    image: "/brand/premium.webp",
    kicker: "COLLECTOR EDITIONS & HARDCOVERS",
    description: "Top-tier collectible hardcovers, art portfolios, and pristine editions curated for discerning readers and passionate book collectors.",
    cataloguePath: "/catalogue?price=500-above",
    accentColor: "#eab308",
    perks: ["Hardcover & Illustrated", "₹499/Kg Premium Tier", "Collector Grade"],
    filterFn: (b) => b.tier === "Premium" || (b.salePrice ?? b.price ?? 0) >= 499 || b.ratePerKg >= 499,
  },
  "standard-books": {
    title: "Standard Books Collection",
    image: "/brand/standard.webp",
    kicker: "EVERYDAY TREASURES",
    description: "Everyday fiction, gripping thrillers, inspiring stories, and popular paperbacks — the true joy of hunting pre-loved treasures by weight at ₹299/Kg.",
    cataloguePath: "/catalogue?price=200-349",
    accentColor: "#64748b",
    perks: ["Budget Friendly", "₹299/Kg Standard Tier", "Massive Variety"],
    filterFn: (b) => b.tier === "Standard" || ((b.salePrice ?? b.price ?? 0) >= 200 && (b.salePrice ?? b.price ?? 0) <= 349),
  },
  bestsellers: {
    title: "Bestselling Books",
    image: "/books/bright-eyes.jpg",
    kicker: "MOST LOVED & HIGHLY RATED",
    description: "The most read, reviewed, and beloved pre-loved books of the season. Hand-picked reader favorites that consistently top the reading charts.",
    cataloguePath: "/catalogue?collection=bestsellers",
    accentColor: "#ef4444",
    perks: ["Top Reader Ratings", "Trending Must-Reads", "Constantly Restocked"],
    filterFn: (b) => (b.match || 0) >= 90 || b.isBestseller === true,
  },
  "new-arrivals": {
    title: "Recently Added Books",
    image: "/brand/new-books.webp",
    kicker: "FRESH ARRIVALS DAILY",
    description: "Freshly sorted, weighed, and quality-verified copies arriving daily in our warehouse. Discover the latest pre-loved gems before they sell out.",
    cataloguePath: "/catalogue?collection=new-arrivals",
    accentColor: "#06b6d4",
    perks: ["Added This Week", "Daily Stock Updates", "First Dibs on Rare Copies"],
    filterFn: (b) => b.tier?.toLowerCase() === "new" || String(b.id).startsWith("new-") || String(b.id).startsWith("catalog-") || (b.categories || []).includes("new-books"),
  },
  "under-199": {
    title: "Extra Discount Sale (Under ₹199)",
    image: "/brand/standard.webp",
    kicker: "POCKET-FRIENDLY FINDS",
    description: "Unbeatable budget book deals! High quality pre-loved pocketbooks, paperbacks, and student essentials priced at or below ₹199.",
    cataloguePath: "/catalogue?collection=under-199",
    accentColor: "#f97316",
    perks: ["All Under ₹199", "Huge Markdowns", "Stock Up & Save"],
    filterFn: (b) => (b.salePrice ?? b.price ?? 0) <= 199,
  },
  classics: {
    title: "Classic & Vintage Books",
    image: "/brand/classic.webp",
    kicker: "EVERGREEN EDITIONS",
    description: "Timeless vintage editions, beloved drama, classic literature, and heritage paperbacks curated for long Sunday afternoons.",
    cataloguePath: "/catalogue?category=classic-books",
    accentColor: "#d97706",
    perks: ["Evergreen Literature", "₹399/Kg Classic Tier", "Enduring Stories"],
    filterFn: (b) => b.tier?.toLowerCase() === "classic" || String(b.genre || "").toLowerCase().includes("classic") || (b.categories || []).includes("classic"),
  },
  bulk: {
    title: "Bulk Books & Wholesale",
    image: "/brand/coffee.webp",
    kicker: "WHOLESALE STACKS & LIBRARIES",
    description: "Curated bulk packages and kilo boxes for institutional libraries, school book fairs, reading clubs, and cafes across India.",
    cataloguePath: "/bulk-purchase",
    accentColor: "#84cc16",
    perks: ["Wholesale Box Discounts", "Institutional Supply", "Pan-India Freight"],
    filterFn: (b) => (b.weight || 0) >= 200 || true,
  },
};

// Aliases for matching various slug inputs
const slugAliases = {
  children: "children-books",
  kids: "children-books",
  "childrens-books": "children-books",
  classics: "classic-books",
  classic: "classic-books",
  teen: "teen-fiction",
  "young-adult": "teen-fiction",
  nonfiction: "non-fiction",
  collector: "coffee-table-books",
  "collector-books": "coffee-table-books",
  "coffee-table": "coffee-table-books",
  "brand-new-books": "new-books",
  "brand-new": "new-books",
  "recently-added": "new-arrivals",
  "top-10-books": "bestsellers",
  "top-10": "bestsellers",
  top10: "bestsellers",
  "extra-discount": "under-199",
  "bulk-books": "bulk",
  "books-in-bulk": "bulk",
};

export function getLandingData(rawSlug, explicitType, allBooks = []) {
  const normalizedSlug = String(rawSlug || "").toLowerCase().trim();
  const canonicalSlug = slugAliases[normalizedSlug] || normalizedSlug;

  const isCollection = explicitType === "collection" || (!categoryConfigs[canonicalSlug] && Boolean(collectionConfigs[canonicalSlug]));
  
  let config = isCollection ? collectionConfigs[canonicalSlug] : categoryConfigs[canonicalSlug];

  // Fallback for custom or unknown slugs
  if (!config) {
    config = {
      title: canonicalSlug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()) + " Books",
      kicker: isCollection ? "CURATED COLLECTION" : "EXPLORE GENRE",
      description: `Explore our hand-picked, quality-checked selection of ${canonicalSlug.replace(/-/g, " ")} pre-loved books by weight.`,
      cataloguePath: isCollection ? `/catalogue?collection=${canonicalSlug}` : `/catalogue?category=${canonicalSlug}`,
      accentColor: "#ef4444",
      perks: ["100% Quality Checked", "Sold by Weight (Kg)", "Fast Pan-India Delivery"],
      filterFn: (b) => {
        const s = canonicalSlug.toLowerCase();
        const g = String(b.genre || "").toLowerCase();
        const cats = (b.categories || []).map((c) => String(c).toLowerCase());
        return cats.includes(s) || g.includes(s);
      },
    };
  }

  // Filter actual matching books
  const matchingBooks = allBooks.filter((b) => config.filterFn(b));
  const totalCount = matchingBooks.length;

  // Show up to 12 books without artificial duplication:
  // If >= 12 available -> show 12
  // If < 12 available -> show all available
  const featuredBooks = matchingBooks.slice(0, 12);

  // For hero visual showcase, pick 5 to 7 covers from matching books (or fallback if fewer than 5)
  let heroBooks = matchingBooks.slice(0, 7);
  if (heroBooks.length < 5 && allBooks.length > 0) {
    const existingHeroIds = new Set(heroBooks.map((b) => b.id));
    const extraForHero = allBooks.filter((b) => !existingHeroIds.has(b.id)).slice(0, 7 - heroBooks.length);
    heroBooks = [...heroBooks, ...extraForHero];
  }

  return {
    slug: canonicalSlug,
    type: isCollection ? "collection" : "category",
    title: config.title,
    kicker: config.kicker,
    description: config.description,
    cataloguePath: config.cataloguePath,
    accentColor: config.accentColor,
    perks: config.perks,
    featuredBooks,
    heroBooks,
    totalCount,
  };
}
