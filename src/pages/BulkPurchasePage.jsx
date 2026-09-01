import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCheck,
  FiTruck,
  FiBookOpen,
  FiClock,
  FiShield,
  FiLayers,
  FiTag,
  FiPhone,
  FiMail,
  FiMessageCircle,
  FiChevronDown,
  FiChevronUp,
  FiUser,
  FiPackage,
  FiArrowRight,
  FiPercent,
  FiAward,
} from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

const whyUsItems = [
  {
    icon: <FiBookOpen />,
    title: "Available Categories",
    desc: "Children | Teen Fiction | Fiction & Non-Fiction | Coffee Table Books",
    note: "Sold as assorted lots within any 1 chosen category.",
  },
  {
    icon: <FiTag />,
    title: "Wholesale Pricing",
    desc: "No individual title selection — keeping our per-kg prices unbeatable.",
  },
  {
    icon: <FiLayers />,
    title: "Binding Mix",
    desc: "A curated variety of Paperbacks, Hardcovers, and Boardbooks.",
  },
  {
    icon: <FiShield />,
    title: "Guaranteed Quality",
    desc: "Strict manual quality checks. No damages, zero pirated copies. 100% original books only.",
  },
  {
    icon: <FiTruck />,
    title: "Pan-India Delivery",
    desc: "Reliable shipping to every pin code across the country.",
  },
  {
    icon: <FiClock />,
    title: "Fast Dispatch",
    desc: "All orders packed and dispatched within 24–48 business hours.",
  },
];

const pricingTiers = [
  {
    qty: "10 Kgs",
    price: "299",
    unit: "/ kg",
    totalEst: "₹2,990 approx.",
    badge: "Starter Wholesale",
    highlight: false,
    features: [
      "Assorted lot in 1 category",
      "Paperback & Hardcover mix",
      "Manual quality checked",
      "Doorstep delivery across India",
    ],
  },
  {
    qty: "50 Kgs",
    price: "249",
    unit: "/ kg",
    totalEst: "₹12,450 approx.",
    badge: "Popular Choice",
    highlight: false,
    savings: "Save ~17% per kg",
    features: [
      "Standard shipping rate (₹30/kg)",
      "Choice of major genre categories",
      "Zero piracy guarantee",
      "GST Invoice (0% tax)",
    ],
  },
  {
    qty: "100 Kgs",
    price: "175",
    unit: "/ kg",
    totalEst: "₹17,500 approx.",
    badge: "Best Value",
    highlight: true,
    savings: "Save ~41% per kg",
    features: [
      "50% OFF shipping (₹15/kg)",
      "Live WhatsApp video preview",
      "Priority warehouse dispatch",
      "Dedicated account manager",
    ],
  },
  {
    qty: "100+ Kgs",
    price: "Custom",
    unit: "Bulk Rates",
    totalEst: "Maximum Volume Discount",
    badge: "Enterprise & Libraries",
    highlight: false,
    savings: "Special Quotation",
    features: [
      "Lowest wholesale price in India",
      "Custom pallet / container packing",
      "Direct transporter dispatch",
      "Flexible payment & terms",
    ],
  },
];

const bulkFaqs = [
  {
    q: "What is the condition of the books?",
    a: (
      <>
        <p>
          Every single book goes through a strict manual quality check before being packed to ensure absolutely no damage. We only source 100% original publishers' copies — no pirated books allowed.
        </p>
        <p>
          Still want to be sure? We've got you covered. Message us on WhatsApp at{" "}
          <a href="https://wa.me/918828687287" target="_blank" rel="noreferrer">
            +91 8828687287
          </a>{" "}
          and our team will gladly share a live video of your curated lot before shipping!
        </p>
      </>
    ),
  },
  {
    q: "Can I select specific titles for my bulk order?",
    a: (
      <p>
        In our wholesale segment, we do not offer individual title selection. If you are looking to handpick specific titles, you can easily browse and purchase them directly from our{" "}
        <Link to="/catalogue">Online Book Store</Link>.
      </p>
    ),
  },
  {
    q: "Do you deliver all over India?",
    a: <p>Yes! We provide reliable shipping services to pin codes across the entire country.</p>,
  },
  {
    q: "How long does it take for the order to be dispatched?",
    a: (
      <p>
        We value your time. All wholesale orders are safely packed and dispatched from our warehouse within{" "}
        <strong>24 to 48 business hours</strong>.
      </p>
    ),
  },
  {
    q: "How can I track my order?",
    a: (
      <p>
        Every order is shipped via reputed couriers with online tracking enabled. As soon as your order leaves our warehouse, we will share the tracking link and details with you via SMS/Email.
      </p>
    ),
  },
  {
    q: "Do you offer Cash on Delivery (COD) for bulk orders?",
    a: (
      <p>
        No, we do not offer COD for wholesale orders. However, if you are based in{" "}
        <strong>Mumbai or Navi Mumbai</strong>, you are most welcome to personally visit our physical store to check the book quality firsthand before making your purchase!
      </p>
    ),
  },
  {
    q: "Will I get a GST Invoice?",
    a: (
      <p>
        Yes, we provide a proper GST invoice for your business accounting. Please note that as per government regulations, there is{" "}
        <strong>0% GST on printed books</strong>, so no additional tax will be added to your bill.
      </p>
    ),
  },
  {
    q: "Can I get a further discount?",
    a: (
      <p>
        We offer special volume discounts for massive orders exceeding 100 Kgs. Get in touch with our team via{" "}
        <a href="https://wa.me/918828687287" target="_blank" rel="noreferrer">
          WhatsApp
        </a>{" "}
        or email us at <a href="mailto:support@booksbykilo.in">support@booksbykilo.in</a> for a custom quote.
      </p>
    ),
  },
];

export default function BulkPurchasePage() {
  const { notify } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    category: "Children",
    quantity: "50 Kgs",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    document.title = "Wholesale Bulk Purchase | Books By Kilo";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.mobile.trim().length < 10) {
      notify("Please enter a valid 10-digit mobile number");
      return;
    }
    notify("Thank you! Your wholesale inquiry has been received. Our team will contact you shortly.");
    setSubmitted(true);
  };

  const handleSelectTier = (qty) => {
    setForm((f) => ({ ...f, quantity: qty }));
    const formCard = document.getElementById("bulk-inquiry-form");
    if (formCard) {
      formCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="static-page bulk-page">
      {/* ── Banner Section with Form ── */}
      <div className="bulk-hero">
        <div className="bulk-hero-inner">
          <div className="bulk-hero-content">
            <span className="catalog-kicker">WHOLESALE BULK PURCHASE</span>
            <h1>Buy Pre-Loved Books in Bulk at Wholesale Prices</h1>
            <p className="bulk-hero-description">
              Looking to stock up your bookstore, library, school, cafe, or personal collection? We offer premium, quality-checked original preloved books in bulk starting from just 10 Kgs with unbeatable per-kilogram rates.
            </p>

            {/* Quick Trust Badges */}
            <div className="bulk-trust-pills">
              <div className="bulk-trust-pill">
                <FiTruck className="pill-icon" />
                <span>Pan-India Delivery</span>
              </div>
              <div className="bulk-trust-pill">
                <FiShield className="pill-icon" />
                <span>100% Original &amp; Checked</span>
              </div>
              <div className="bulk-trust-pill">
                <FiClock className="pill-icon" />
                <span>24-48h Dispatch</span>
              </div>
              <div className="bulk-trust-pill">
                <FiAward className="pill-icon" />
                <span>0% GST Invoice</span>
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="bulk-hero-quick-contacts">
              <a
                href="https://wa.me/918828687287"
                target="_blank"
                rel="noreferrer"
                className="bulk-whatsapp-pill"
                aria-label="Chat on WhatsApp"
              >
                <FiMessageCircle size={18} />
                <span>Chat on WhatsApp (+91 8828687287)</span>
              </a>
              <a
                href="tel:+918828687287"
                className="bulk-phone-pill"
                aria-label="Call Wholesale Team"
              >
                <FiPhone size={15} />
                <span>Call Us</span>
              </a>
              <a
                href="mailto:support@booksbykilo.in"
                className="bulk-email-pill"
                aria-label="Email Wholesale Team"
              >
                <FiMail size={15} />
                <span>support@booksbykilo.in</span>
              </a>
            </div>
          </div>

          <div id="bulk-inquiry-form" className="bulk-form-card">
            <div className="bulk-form-badge">
              <FiPackage />
              <span>Direct Wholesale Rates</span>
            </div>
            <h3 className="bulk-form-title">Request Wholesale Pricing</h3>
            <p className="bulk-form-subtitle">Share your requirements and we will send a customized lot quotation.</p>

            {submitted ? (
              <div className="bulk-success-card">
                <div className="bulk-success-icon"><FiCheck /></div>
                <h3>Inquiry Received!</h3>
                <p>Thank you, <strong>{form.name}</strong>. Our wholesale team will get in touch with you at <strong>{form.mobile}</strong> within a few hours.</p>
                <button
                  type="button"
                  className="bulk-submit-another-btn"
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", mobile: "", email: "", category: "Children", quantity: "50 Kgs" });
                  }}
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form className="bulk-lead-form" onSubmit={handleSubmit}>
                <div className="bulk-field">
                  <label htmlFor="bulk-name">Your Name</label>
                  <div className="bulk-input-wrap">
                    <FiUser className="bulk-input-icon" />
                    <input
                      id="bulk-name"
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      maxLength={300}
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="bulk-field">
                  <label htmlFor="bulk-mobile">Mobile Number (WhatsApp Enabled)</label>
                  <div className="bulk-input-wrap">
                    <FiPhone className="bulk-input-icon" />
                    <input
                      id="bulk-mobile"
                      required
                      type="tel"
                      placeholder="10-digit Mobile Number"
                      maxLength={10}
                      value={form.mobile}
                      onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, "") }))}
                    />
                  </div>
                </div>

                <div className="bulk-field">
                  <label htmlFor="bulk-email">Email Address</label>
                  <div className="bulk-input-wrap">
                    <FiMail className="bulk-input-icon" />
                    <input
                      id="bulk-email"
                      required
                      type="email"
                      placeholder="e.g. rahul@example.com"
                      maxLength={300}
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="bulk-fields-row">
                  <div className="bulk-field">
                    <label htmlFor="bulk-category">Preferred Category</label>
                    <select
                      id="bulk-category"
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      <option value="Children">Children's Books</option>
                      <option value="Teen Fiction">Teen &amp; Young Adult</option>
                      <option value="Fiction">Fiction &amp; Literature</option>
                      <option value="Non-Fiction">Non-Fiction &amp; Self-Help</option>
                      <option value="Coffee Table">Coffee Table Books</option>
                      <option value="Mixed Lot">Mixed Assorted Lot</option>
                    </select>
                  </div>

                  <div className="bulk-field">
                    <label htmlFor="bulk-qty">Approx. Quantity</label>
                    <select
                      id="bulk-qty"
                      value={form.quantity}
                      onChange={(e) => setForm((f) => ({ ...f, quantity: e.target.value }))}
                    >
                      <option value="10 Kgs">10 Kgs (Starter)</option>
                      <option value="50 Kgs">50 Kgs (₹249/kg)</option>
                      <option value="100 Kgs">100 Kgs (₹175/kg)</option>
                      <option value="Above 100 Kgs">100+ Kgs (Custom)</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="bulk-submit-btn">
                  <span>Get Wholesale Quote</span>
                  <FiArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── Why Us Section ── */}
      <section className="bulk-section bulk-section-whyus">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">OUR ADVANTAGES</span>
          <h2>Why Us</h2>
        </div>
        <div className="bulk-whyus-grid">
          {whyUsItems.map((item) => (
            <div key={item.title} className="bulk-whyus-card">
              <div className="bulk-whyus-icon">{item.icon}</div>
              <div className="bulk-whyus-info">
                <strong>{item.title}</strong>
                <p>{item.desc}</p>
                {item.note && <span className="bulk-whyus-note">{item.note}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Wholesale Pricing Section ── */}
      <section className="bulk-section bulk-section-pricing">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">PRICING STRUCTURE</span>
          <h2>Transparent Wholesale Per-Kg Tiers</h2>
          <p>Order assorted quality-checked book lots with heavy volume-based discounts.</p>
        </div>

        {/* Tier Cards Grid */}
        <div className="bulk-pricing-cards-grid">
          {pricingTiers.map((tier) => (
            <div
              key={tier.qty}
              className={`bulk-tier-card ${tier.highlight ? "featured" : ""}`}
            >
              {tier.badge && <span className="bulk-tier-badge">{tier.badge}</span>}
              <h3 className="bulk-tier-qty">{tier.qty}</h3>
              <div className="bulk-tier-price-row">
                <span className="bulk-tier-currency">₹</span>
                <span className="bulk-tier-amount">{tier.price}</span>
                <span className="bulk-tier-unit">{tier.unit}</span>
              </div>
              <p className="bulk-tier-est">{tier.totalEst}</p>
              {tier.savings && (
                <span className="bulk-tier-savings-pill">
                  <FiPercent size={12} /> {tier.savings}
                </span>
              )}

              <ul className="bulk-tier-features">
                {tier.features.map((feat, i) => (
                  <li key={i}>
                    <FiCheck className="feat-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={`bulk-tier-cta-btn ${tier.highlight ? "highlight" : ""}`}
                onClick={() => handleSelectTier(tier.qty)}
              >
                <span>Inquire for {tier.qty}</span>
                <FiArrowRight size={15} />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Rates Callout */}
        <div className="bulk-pricing-container">
          <div className="bulk-pricing-callout">
            <div className="bulk-pricing-callout-icon">
              <FiMessageCircle />
            </div>
            <div className="bulk-pricing-callout-content">
              <p className="bulk-pricing-callout-text">
                Ordering more than 100 Kgs or need an ongoing monthly supply for your bookstore/library?
              </p>
              <span className="bulk-pricing-callout-sub">
                Our wholesale managers will arrange special customized per-kg pricing and dedicated transport.
              </span>
            </div>
            <div className="bulk-pricing-callout-actions">
              <a
                href="https://wa.me/918828687287"
                target="_blank"
                rel="noreferrer"
                className="bulk-whatsapp-btn"
                aria-label="Chat on WhatsApp"
              >
                <FiMessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:+918828687287"
                className="bulk-phone-callout-btn"
                aria-label="Call Wholesale"
              >
                <FiPhone size={15} />
                <span>Call 8828687287</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shipping & Delivery ── */}
      <section className="bulk-section bulk-section-shipping">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">LOGISTICS &amp; DISPATCH</span>
          <h2>Safe &amp; Insured Pan-India Shipping</h2>
          <p>We pack every lot with multi-layer heavy-duty boxes to ensure zero damage during transit.</p>
        </div>

        <div className="bulk-shipping-cards-grid">
          <div className="bulk-shipping-box">
            <div className="shipping-box-top">
              <FiTruck className="shipping-icon" />
              <h4>Standard Wholesale (Up to 50 Kgs)</h4>
            </div>
            <div className="bulk-shipping-price">
              <span className="amount">₹30</span>
              <span className="unit">per kg across India</span>
            </div>
            <p className="shipping-box-desc">
              Reliable doorstep delivery via surface courier partners with online SMS/Email tracking enabled.
            </p>
            <div className="shipping-badge-wrap">
              <span className="shipping-sub-badge">24–48h Dispatch</span>
            </div>
          </div>

          <div className="bulk-shipping-box featured">
            <div className="shipping-box-top">
              <FiPackage className="shipping-icon highlight" />
              <h4>Heavy Wholesale (100 Kgs &amp; Above)</h4>
            </div>
            <div className="bulk-shipping-price">
              <span className="amount">₹15</span>
              <span className="unit">per kg across India</span>
            </div>
            <span className="bulk-shipping-discount-tag">50% Reduced Shipping Rate</span>
            <p className="shipping-box-desc">
              Special reduced freight logistics for bulk buyers and institutions with direct pallet dispatch.
            </p>
            <div className="shipping-badge-wrap">
              <span className="shipping-sub-badge highlight">Live Video Verification Before Dispatch</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section className="bulk-section bulk-section-faq">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">QUESTIONS &amp; ANSWERS</span>
          <h2>Frequently Asked Questions</h2>
          <p>Got questions about wholesale orders? Here is everything you need to know.</p>
        </div>

        <div className="bulk-faq-container">
          {bulkFaqs.map((faq, idx) => (
            <div
              key={idx}
              className={`bulk-faq-accordion-item ${openFaq === idx ? "open" : ""}`}
            >
              <button
                type="button"
                className="bulk-faq-accordion-header"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                aria-expanded={openFaq === idx}
              >
                <span>{faq.q}</span>
                <span className="faq-toggle-icon">
                  {openFaq === idx ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>
              {openFaq === idx && (
                <div className="bulk-faq-accordion-body">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
