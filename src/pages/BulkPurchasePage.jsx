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
  const [form, setForm] = useState({ name: "", mobile: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = "Wholesale Bulk Purchase | Books By Kilo";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.mobile.trim().length < 10) {
      notify("Please enter a valid 10-digit mobile number");
      return;
    }
    notify("Thank you! Give us your details and we will get back to you.");
    setSubmitted(true);
    setForm({ name: "", mobile: "", email: "" });
  };

  return (
    <div className="static-page bulk-page">
      {/* ── Banner Section with Form ── */}
      <div className="bulk-hero">
        <div className="bulk-hero-inner">
          <div className="bulk-hero-content">
            <span className="catalog-kicker">WHOLESALE BULK PURCHASE</span>
            <h1>Wholesale Bulk Purchase</h1>
            <p className="bulk-hero-description">
              Looking to stock up your bookstore, library, school, or personal collection? We offer high-quality, quality-checked preloved books in bulk at unbeatable per-kilogram prices.
            </p>
            <div className="bulk-hero-quick-contacts">
              <a
                href="https://wa.me/918828687287"
                target="_blank"
                rel="noreferrer"
                className="bulk-whatsapp-pill"
              >
                <FiMessageCircle /> Chat on WhatsApp (+91 8828687287)
              </a>
              <a href="mailto:support@booksbykilo.in" className="bulk-email-inline">
                <FiMail /> support@booksbykilo.in
              </a>
            </div>
          </div>

          <div className="bulk-form-card">
            <h3 className="bulk-form-title">Let's buy @ wholesale cost!</h3>
            <p className="bulk-form-subtitle">Give us your details and we will get back to you.</p>

            {submitted ? (
              <div className="bulk-success-card">
                <div className="bulk-success-icon"><FiCheck /></div>
                <h3>Thank You</h3>
                <p>We have received your details and our team will get in touch with you shortly.</p>
                <button className="cta" onClick={() => setSubmitted(false)}>Submit Another Inquiry</button>
              </div>
            ) : (
              <form className="bulk-lead-form" onSubmit={handleSubmit}>
                <div className="bulk-field">
                  <label htmlFor="bulk-name">Name</label>
                  <input
                    id="bulk-name"
                    required
                    type="text"
                    placeholder="Full Name"
                    maxLength={300}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>

                <div className="bulk-field">
                  <label htmlFor="bulk-mobile">Mobile Number</label>
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

                <div className="bulk-field">
                  <label htmlFor="bulk-email">Email ID</label>
                  <input
                    id="bulk-email"
                    required
                    type="email"
                    placeholder="Email Address"
                    maxLength={300}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  />
                </div>

                <button type="submit" className="cta bulk-submit-btn">
                  Submit Details
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

      {/* ── Wholesale Pricing Table ── */}
      <section className="bulk-section bulk-section-pricing">
        <div className="bulk-section-header">
          <span className="catalog-kicker">PRICING STRUCTURE</span>
          <h2>Wholesale Pricing</h2>
        </div>

        <div className="bulk-pricing-container">
          <div className="bulk-pricing-table-wrapper">
            <table className="bulk-pricing-table">
              <thead>
                <tr>
                  <th>Order Quantity</th>
                  <th>Price Per Kg</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>10 Kgs</strong></td>
                  <td><span className="price-tag">₹299</span> / kg</td>
                </tr>
                <tr>
                  <td><strong>50 Kgs</strong></td>
                  <td><span className="price-tag">₹249</span> / kg</td>
                </tr>
                <tr>
                  <td><strong>100 Kgs</strong></td>
                  <td><span className="price-tag">₹175</span> / kg</td>
                </tr>
                <tr className="bulk-pricing-special-row">
                  <td><strong>Above 100 Kgs</strong></td>
                  <td><span className="special-rate-badge">Special Bulk Rates Apply</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bulk-pricing-callout">
            <p className="bulk-pricing-callout-text">
              Ordering more than 100 Kgs? <strong>Get custom discounted rates!</strong>
            </p>
            <div className="bulk-pricing-callout-links">
              <a
                href="https://wa.me/918828687287"
                target="_blank"
                rel="noreferrer"
                className="bulk-whatsapp-btn"
              >
                <FiMessageCircle /> Chat on WhatsApp
              </a>
              <span className="bulk-pricing-or">
                or email us at <a href="mailto:support@booksbykilo.in">support@booksbykilo.in</a> or call{" "}
                <a href="tel:+918828687287">8828687287</a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Shipping & Delivery ── */}
      <section className="bulk-section bulk-section-shipping">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">LOGISTICS & DISPATCH</span>
          <h2>Shipping &amp; Delivery</h2>
          <p>We ship safely and securely all across India.</p>
        </div>

        <div className="bulk-shipping-cards-grid">
          <div className="bulk-shipping-box">
            <h4>Up to 50 Kgs</h4>
            <div className="bulk-shipping-price">
              <span className="amount">₹30</span>
              <span className="unit">per kg</span>
            </div>
          </div>

          <div className="bulk-shipping-box featured">
            <h4>Above 100 Kgs</h4>
            <div className="bulk-shipping-price">
              <span className="amount">₹15</span>
              <span className="unit">per kg</span>
            </div>
            <span className="bulk-shipping-discount-tag">Reduced Rate</span>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section className="bulk-section bulk-section-faq">
        <div className="bulk-section-header text-center">
          <span className="catalog-kicker">QUESTIONS & ANSWERS</span>
          <h2>Frequently Asked Questions</h2>
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
