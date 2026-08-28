import { useEffect, useState } from "react";
import { 
  FiPhone, FiMail, FiMapPin, FiClock, FiSend, 
  FiMessageSquare, FiExternalLink, FiCheckCircle 
} from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

export default function ContactPage() {
  const { notify } = useAppContext();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "Contact Us : Books By Kilo | Get In Touch";
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    notify("Thank you! Your message has been sent successfully.");
    setForm({ name: "", email: "", phone: "", subject: "General Inquiry", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="contact-us-page">
      
      {/* 1. Hero Header Banner */}
      <section className="contact-hero-banner">
        <div className="contact-hero-container">
          <span className="contact-kicker">CONTACT US</span>
          <h1 className="contact-hero-title">
            We’d love to <span className="contact-hero-highlight">hear from you.</span>
          </h1>
          <p className="contact-hero-subtitle">
            Have questions about buying books by weight, tracking an order, visiting our Navi Mumbai store, or bulk purchases? Our team is here to assist you.
          </p>
        </div>
      </section>

      {/* 2. Top Info Cards */}
      <section className="contact-cards-section">
        <div className="contact-content-container">
          <div className="contact-cards-grid">
            
            {/* Card 1: Phone */}
            <div className="contact-channel-card">
              <div className="channel-icon-box">
                <FiPhone size={22} />
              </div>
              <h3 className="channel-title">Call or WhatsApp</h3>
              <p className="channel-desc">Direct phone support for orders and general queries.</p>
              <a href="tel:08828687287" className="channel-link">
                +91 88286 87287
              </a>
              <span className="channel-subtext">Mon – Sun: 10:30 AM – 9:00 PM</span>
            </div>

            {/* Card 2: Email */}
            <div className="contact-channel-card">
              <div className="channel-icon-box">
                <FiMail size={22} />
              </div>
              <h3 className="channel-title">Email Support</h3>
              <p className="channel-desc">Send us your feedback, bulk requirements, or inquiries.</p>
              <a href="mailto:support@booksbykilo.in" className="channel-link">
                support@booksbykilo.in
              </a>
              <span className="channel-subtext">Response within 24 business hours</span>
            </div>

            {/* Card 3: Location */}
            <div className="contact-channel-card">
              <div className="channel-icon-box">
                <FiMapPin size={22} />
              </div>
              <h3 className="channel-title">Experience Store</h3>
              <p className="channel-desc">Shop No 6, Bhoomi Sagar, Sector 22, Kamothe, Navi Mumbai.</p>
              <a 
                href="https://www.google.com/maps/dir//Bhoomi+Sagar+Building,+Phase+II,+Sector+22,+Kamothe,+Panvel,+Navi+Mumbai,+Maharashtra+410206/@19.0138943,73.0983556,19z" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="channel-link"
              >
                Get Directions <FiExternalLink size={14} />
              </a>
              <span className="channel-subtext">Opp. Imperial Heights (410209)</span>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Main Form & Store Section */}
      <section className="contact-main-section">
        <div className="contact-content-container">
          <div className="contact-split-layout">
            
            {/* Left: Contact Form */}
            <div className="contact-form-card">
              <div className="form-card-header">
                <span className="section-eyebrow">MESSAGE US</span>
                <h2 className="form-card-title">Send a Message</h2>
                <p className="form-card-subtitle">
                  Fill out the form below and our customer support team will get back to you promptly.
                </p>
              </div>

              {submitted && (
                <div className="form-success-banner">
                  <FiCheckCircle size={18} />
                  <span>Your message has been sent successfully! We'll reply soon.</span>
                </div>
              )}

              <form className="contact-form-grid" onSubmit={handleSubmit}>
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input
                      id="contact-name"
                      required
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-email">Your Email *</label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number (Optional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contact-subject">Topic / Subject</label>
                    <select
                      id="contact-subject"
                      value={form.subject}
                      onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Status & Tracking">Order Status &amp; Tracking</option>
                      <option value="Store Visit & Timings">Store Visit &amp; Timings</option>
                      <option value="Bulk Purchase & Wholesale">Bulk Purchase &amp; Wholesale</option>
                      <option value="Sell / Donate Books">Sell / Donate Books</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  <FiSend /> Send Message
                </button>
              </form>
            </div>

            {/* Right: Store Experience & Map */}
            <div className="contact-location-card">
              <div className="store-detail-header">
                <span className="store-badge">VISIT OUR STORE</span>
                <h3 className="store-heading">Navi Mumbai Flagship</h3>
                <p className="store-address-text">
                  <strong>BooksByKilo</strong><br />
                  Bhoomi Sagar, Shop No 6, Sector 22, Plot No: 112/113,<br />
                  Opp. Imperial Heights, Kamothe, Navi Mumbai, Maharashtra — 410209.
                </p>
                
                <div className="store-hours-box">
                  <FiClock className="hours-icon" />
                  <div>
                    <strong>Store Operating Hours</strong>
                    <span>Monday to Sunday: 10:30 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Embedded Google Map */}
              <div className="contact-map-wrapper">
                <iframe
                  title="BooksByKilo Store Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d792.9931177845599!2d73.09835520077141!3d19.013894036930964!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e9d2aa21caef%3A0x66309284a03dcb46!2sBhoomi%20Sagar%20Building%2C%20Phase%20II%2C%20Sector%2022%2C%20Kamothe%2C%20Panvel%2C%20Navi%20Mumbai%2C%20Maharashtra%20410206!5e0!3m2!1sen!2sin!4v1617358185961!5m2!1sen!2sin"
                  width="100%"
                  height="260"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>

              <a
                href="https://www.google.com/maps/dir//Bhoomi+Sagar+Building,+Phase+II,+Sector+22,+Kamothe,+Panvel,+Navi+Mumbai,+Maharashtra+410206/@19.0138943,73.0983556,19z"
                target="_blank"
                rel="noopener noreferrer"
                className="directions-btn"
              >
                <FiMapPin /> Open in Google Maps <FiExternalLink />
              </a>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
