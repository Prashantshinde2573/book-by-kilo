import { useEffect, useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAppContext } from "../context/AppContext";

export default function ContactPage() {
  const { notify } = useAppContext();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  useEffect(() => { document.title = "Contact Us | Books By Kilo"; }, []);
  const handleSubmit = (e) => { e.preventDefault(); notify("Message sent! We'll get back to you soon."); setForm({ name: "", email: "", message: "" }); };

  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">GET IN TOUCH</span>
        <h1 className="catalog-title">Contact Us</h1>
        <p className="catalog-description">We'd love to hear from you.</p>
      </div>
      <div className="static-page-content">
        <div className="contact-layout">
          <div className="contact-info">
            <h2>Reach Us</h2>
            <p><strong>Email:</strong> <a href="mailto:support@booksbykilo.in">support@booksbykilo.in</a></p>
            <p><strong>Location:</strong> Mumbai, Maharashtra, India</p>
            <p><strong>Response Time:</strong> Within 24 hours</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Send a Message</h2>
            <input required type="text" placeholder="Your Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <input required type="email" placeholder="Your Email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            <textarea required rows={5} placeholder="Your message..." value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
            <button type="submit" className="cta"><FiSend /> Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
}
