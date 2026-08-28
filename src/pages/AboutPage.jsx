import { useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FiCheckCircle, FiBookOpen, FiFeather, FiAward, 
  FiMapPin, FiPhone, FiMail, FiShoppingBag, FiStar, FiArrowRight 
} from "react-icons/fi";

export default function AboutPage() {
  useEffect(() => {
    document.title = "About Us : Books By Kilo | Spend Less. Read More.";
  }, []);

  const corePillars = [
    {
      icon: <FiBookOpen size={24} />,
      title: "Sold by Weight, Not by Printed MRP",
      desc: "BooksByKilo is a revolutionary attempt to sell books by weight and not by printed cost. Discover thousands of titles across all genres at prices you won't believe."
    },
    {
      icon: <FiFeather size={24} />,
      title: "Pre-Loved & Cherished Editions",
      desc: "We believe a book that has been owned, read and cherished only adds to its value. We curate a collection that strikes the perfect balance between quantity and quality."
    },
    {
      icon: <FiAward size={24} />,
      title: "Diverse Professional Team",
      desc: "A young, dynamic team of experienced professionals from diverse backgrounds working together to create genuine customer delight, supported by modern technology."
    },
    {
      icon: <FiMapPin size={24} />,
      title: "Omnichannel Destination",
      desc: "With our flagship offline experience store in Navi Mumbai and our nationwide e-commerce store, we connect readers everywhere with stories they'll treasure."
    }
  ];

  const guarantees = [
    "100% Quality Checked & Inspected",
    "Zero Pirated Copies — Authentic Only",
    "Fast Pan-India Home Delivery",
    "7-Day Easy Replacement Guarantee",
    "Transparent Per-Kg Tiered Pricing",
    "Dedicated Customer Support Team"
  ];

  return (
    <div className="about-us-page">
      
      {/* 1. Hero Header Banner */}
      <section className="about-hero-banner">
        <div className="about-hero-container">
          <span className="about-kicker">ABOUT BOOKSBYKILO</span>
          <h1 className="about-hero-title">
            Spend less. <span className="about-hero-highlight">Read more.</span>
          </h1>
          <p className="about-hero-subtitle">
            Welcome to BooksByKilo — where great literature meets circular sustainability. 
            We make reading accessible and joyful by selling genuine pre-loved books by weight.
          </p>
        </div>
      </section>

      {/* 2. Trust Stats Bar */}
      <section className="about-stats-bar">
        <div className="about-stats-container">
          <div className="about-stat-item">
            <span className="about-stat-number"><FiStar className="star-icon" /> 4.9 / 5</span>
            <span className="about-stat-label">Google Customer Rating</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">50,000+</span>
            <span className="about-stat-label">Happy Readers Across India</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">100,000+</span>
            <span className="about-stat-label">Books Recirculated</span>
          </div>
          <div className="about-stat-item">
            <span className="about-stat-number">Navi Mumbai</span>
            <span className="about-stat-label">Flagship Offline &amp; Online Store</span>
          </div>
        </div>
      </section>

      {/* 3. Core Story Section */}
      <section className="about-story-section">
        <div className="about-content-container">
          
          <div className="about-story-header">
            <span className="section-eyebrow">OUR PHILOSOPHY</span>
            <h2 className="section-heading">Books are your best companion in solitude</h2>
            <p className="section-subtext">
              You are never alone if you read. We love what we do and are fortunate to cultivate 
              a truly remarkable collection of books for readers of all ages and tastes.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="about-pillars-grid">
            {corePillars.map((p, idx) => (
              <div key={idx} className="about-pillar-card">
                <div className="pillar-icon-box">{p.icon}</div>
                <h3 className="pillar-title">{p.title}</h3>
                <p className="pillar-desc">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. The Mission & Vision Section */}
      <section className="about-vision-section">
        <div className="about-content-container">
          <div className="about-vision-grid">
            
            <div className="about-vision-text">
              <span className="section-eyebrow">OUR MISSION</span>
              <h2 className="section-heading">Building a Future for Readers</h2>
              <p className="vision-p">
                We are still at an exciting stage of our journey, looking forward to building a future 
                filled with new opportunities, new innovations, new books, and of course, our loyal customers!
              </p>
              <p className="vision-p">
                BooksByKilo is on a mission to provide the premier destination for book lovers at both 
                local and national levels — a platform that connects people with the books they’ll cherish, 
                a place that encourages the culture of reading, and a seamless, secure shopping experience.
              </p>
              
              {/* Checklist */}
              <div className="about-checklist">
                {guarantees.map((item, i) => (
                  <div key={i} className="about-check-item">
                    <FiCheckCircle className="check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="about-store-card">
              <div className="store-card-badge">EXPERIENCE STORE</div>
              <h3 className="store-card-title">Navi Mumbai Flagship</h3>
              <p className="store-card-desc">
                Visit our physical bookstore in Navi Mumbai to weigh your favorite stacks in person, 
                or order online for fast, safe pan-India shipping to your doorstep.
              </p>
              
              <div className="store-contact-list">
                <div className="store-contact-row">
                  <FiMapPin className="contact-icon" />
                  <span>Navi Mumbai, Maharashtra, India</span>
                </div>
                <div className="store-contact-row">
                  <FiPhone className="contact-icon" />
                  <a href="tel:08828687287">+91 88286 87287</a>
                </div>
                <div className="store-contact-row">
                  <FiMail className="contact-icon" />
                  <a href="mailto:support@booksbykilo.in">support@booksbykilo.in</a>
                </div>
              </div>

              <div className="store-card-actions">
                <Link to="/catalogue" className="about-btn-primary">
                  <FiShoppingBag /> Shop by Kilo <FiArrowRight />
                </Link>
                <Link to="/faq" className="about-btn-secondary">
                  FAQs &amp; Help Center
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
