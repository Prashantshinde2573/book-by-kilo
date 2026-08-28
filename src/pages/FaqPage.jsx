import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  FiChevronDown, FiSearch, FiPhone, FiMail, 
  FiHelpCircle, FiShield, FiTruck, FiRefreshCw, FiCreditCard 
} from "react-icons/fi";

const allFaqs = [
  {
    category: "quality",
    categoryLabel: "Book Quality & Authenticity",
    q: "How good are the books?",
    a: "All products sold on BooksByKilo are thoroughly checked for quality. Though they are pre-loved and not brand new, every possible measure is taken to ensure they are complete, clean, and in desirable readable condition. Most of them can proudly be added to your permanent home library collection."
  },
  {
    category: "quality",
    categoryLabel: "Book Quality & Authenticity",
    q: "Are these books genuine?",
    a: "Yes, 100%. We strictly do not believe in or deal with piracy. All books sold by us are procured from legitimate publishers and vendors against official billing. You focus on reading the stories you love; leave the authenticity to us."
  },
  {
    category: "quality",
    categoryLabel: "Book Quality & Authenticity",
    q: "Where can I find book information not listed on BooksByKilo?",
    a: "We are always here to help! If you cannot find a specific book or author on our catalogue, simply email us at support@booksbykilo.in with the Book Title, Author, or ISBN. Our procurement team will track down the title and get it for you at a great discounted price."
  },
  {
    category: "shipping",
    categoryLabel: "Orders & Shipping",
    q: "How long will it take for my order to be delivered?",
    a: "We do our best to dispatch and deliver your orders within 2–3 business days. Depending on the delivery distance and season across India, it generally takes between 3 to 6 business days for doorstep arrival."
  },
  {
    category: "shipping",
    categoryLabel: "Orders & Shipping",
    q: "How do I check the status of my order?",
    a: "Once you place an order with us, we will keep you updated with real-time tracking via SMS and email. You can also contact our support desk via WhatsApp or phone for immediate status updates."
  },
  {
    category: "shipping",
    categoryLabel: "Orders & Shipping",
    q: "Do I have to wait at my house or office all day for delivery?",
    a: "No. Our logistics partners will notify you via SMS/call prior to the delivery attempt. We coordinate smooth delivery so you can relax and await your treasure stack."
  },
  {
    category: "shipping",
    categoryLabel: "Orders & Shipping",
    q: "Why does my order require a shipping fee / when is it free?",
    a: "Because our books are sold strictly by weight at very low prices, shipping is calculated on the actual weight of the package. We absorb a large part of logistics costs ourselves, and offer Free Shipping on orders above ₹1,000."
  },
  {
    category: "returns",
    categoryLabel: "Returns & Replacements",
    q: "What is your return & replacement policy?",
    a: "All products sold on BooksByKilo are checked for quality. We offer easy replacement under the following conditions: In case of transit damage or major defect, notify us within 24–48 hours of delivery with photos of the damaged item and packaging. Once approved, we will arrange a replacement of the same title or an equivalent weight selection."
  },
  {
    category: "returns",
    categoryLabel: "Returns & Replacements",
    q: "How do I return books purchased from BooksByKilo?",
    a: "Please follow these simple steps: 1) Click clear photos of the product and packaging showing the defect. 2) Email the images with your order ID to support@booksbykilo.in within 24–48 hours of delivery. 3) Our team will arrange a reverse pickup through our logistics partner and process your replacement."
  },
  {
    category: "payments",
    categoryLabel: "Payments & Promotions",
    q: "What payment methods does BooksByKilo accept?",
    a: "We accept all major secure online payment methods including UPI (Google Pay, PhonePe, Paytm), Credit Cards, Debit Cards, Net Banking, and Digital Wallets powered by our certified payment partners."
  },
  {
    category: "payments",
    categoryLabel: "Payments & Promotions",
    q: "How do I redeem a coupon on BooksByKilo?",
    a: "You can enter your promotional coupon code during checkout in the coupon field. The discount will instantly be applied to your order subtotal. Note that one coupon code can be redeemed per order."
  },
  {
    category: "payments",
    categoryLabel: "Payments & Promotions",
    q: "Where can I find special promotions, offers & bulk discounts?",
    a: "Follow our social media channels (@booksbykilo) for ongoing sales and limited discount codes. For bulk wholesale purchases (libraries, schools, cafes, or book clubs), visit our Bulk Purchase page or contact our team directly for custom kilo pricing."
  }
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Frequently Asked Questions : Books By Kilo | Help Center";
  }, []);

  const categories = [
    { id: "all", label: "All Questions", icon: <FiHelpCircle /> },
    { id: "quality", label: "Quality & Authenticity", icon: <FiShield /> },
    { id: "shipping", label: "Shipping & Orders", icon: <FiTruck /> },
    { id: "returns", label: "Returns & Policy", icon: <FiRefreshCw /> },
    { id: "payments", label: "Payments & Offers", icon: <FiCreditCard /> },
  ];

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = 
        !searchQuery || 
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.a.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="faq-page-wrapper">
      
      {/* 1. Hero Header Banner */}
      <section className="faq-hero-banner">
        <div className="faq-hero-container">
          <span className="faq-kicker">HELP &amp; SUPPORT</span>
          <h1 className="faq-hero-title">
            Frequently Asked <span className="faq-hero-highlight">Questions</span>
          </h1>
          <p className="faq-hero-subtitle">
            Everything you need to know about buying books by weight, condition quality checks, pan-India shipping, and replacements.
          </p>

          {/* Live Search */}
          <div className="faq-search-wrap">
            <FiSearch className="faq-search-icon" size={18} />
            <input
              type="text"
              className="faq-search-input"
              placeholder="Search by keyword (e.g. shipping, returns, quality, payment)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                type="button" 
                className="faq-search-clear" 
                onClick={() => setSearchQuery("")}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main FAQ Content Area */}
      <section className="faq-main-section">
        <div className="faq-content-container">
          
          {/* Category Filter Pills */}
          <div className="faq-category-pills">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`faq-cat-pill ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(0);
                }}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="faq-accordion-container">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div 
                    key={i} 
                    className={`faq-accordion-card ${isOpen ? "open" : ""}`}
                  >
                    <button
                      type="button"
                      className="faq-accordion-trigger"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <div className="faq-q-left">
                        <span className="faq-q-badge">{faq.categoryLabel}</span>
                        <h3 className="faq-q-text">{faq.q}</h3>
                      </div>
                      <div className={`faq-chevron-icon ${isOpen ? "rotated" : ""}`}>
                        <FiChevronDown size={20} />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="faq-accordion-body">
                        <p>{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="faq-empty-state">
                <p>No matching questions found for "<strong>{searchQuery}</strong>".</p>
                <button 
                  type="button" 
                  className="faq-reset-btn"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                >
                  View All Questions
                </button>
              </div>
            )}
          </div>

          {/* 3. Bottom Direct Support Banner */}
          <div className="faq-support-banner">
            <div className="faq-support-text">
              <h3>Still have questions?</h3>
              <p>Can’t find the answer you’re looking for? Reach out directly to our friendly customer support team.</p>
            </div>
            <div className="faq-support-actions">
              <a href="tel:08828687287" className="faq-cta-primary">
                <FiPhone /> Call +91 88286 87287
              </a>
              <Link to="/contact" className="faq-cta-secondary">
                <FiMail /> Contact Us
              </Link>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
