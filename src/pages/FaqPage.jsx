import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  { q: "What are pre-loved books?", a: "Pre-loved books are second-hand books that have been previously owned and read. All our books are quality-checked to ensure they are in good, readable condition." },
  { q: "How does Books By Kilo work?", a: "We sell books by weight. Browse our catalogue, add books to cart, and check out. You pay based on the weight of the books you select at our flat per-kg rates." },
  { q: "What are the pricing tiers?", a: "Standard Tier: ₹299/kg · Classic Tier: ₹399/kg · Premium Tier: ₹499/kg. Each tier represents the quality and condition of the books." },
  { q: "Do you ship across India?", a: "Yes! We offer fast pan-India delivery. Free shipping is available on orders above a minimum amount." },
  { q: "What is your return policy?", a: "We offer a 7-day easy replacement guarantee. If you're not satisfied with the condition of any book, contact us and we'll arrange a replacement." },
  { q: "Are the books authentic?", a: "100%. All books sold on Books By Kilo are authentic, genuine editions. We do not sell pirated or counterfeit books." },
  { q: "Do you offer bulk purchase discounts?", a: "Yes! We offer special pricing for bulk purchases. Contact us or visit our Bulk Books page for more details." },
  { q: "What is the Surprise Stack?", a: "The Surprise Stack is our mystery box offering. You'll receive a curated set of books handpicked by our team — a delightful surprise starting at ₹300." },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);
  useEffect(() => { document.title = "FAQ | Books By Kilo"; }, []);
  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">HELP CENTER</span>
        <h1 className="catalog-title">Frequently Asked Questions</h1>
        <p className="catalog-description">Everything you need to know about Books By Kilo.</p>
      </div>
      <div className="static-page-content">
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item ${open === i ? "open" : ""}`}>
              <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
                {faq.q}
                {open === i ? <FiChevronUp /> : <FiChevronDown />}
              </button>
              {open === i && <div className="faq-answer">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
