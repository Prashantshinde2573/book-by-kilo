import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function RegisterPage() {
  const { notify } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  useEffect(() => { document.title = "Create Account | Books By Kilo"; }, []);
  const handleSubmit = (e) => { e.preventDefault(); notify("Account created! Welcome to Books By Kilo."); navigate("/"); };

  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">JOIN US</span>
        <h1 className="catalog-title">Create Account</h1>
      </div>
      <div className="static-page-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="reg-name">Full Name</label>
            <input id="reg-name" required type="text" placeholder="Your name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          </div>
          <div className="auth-field">
            <label htmlFor="reg-email">Email</label>
            <input id="reg-email" required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="auth-field">
            <label htmlFor="reg-password">Password</label>
            <input id="reg-password" required type="password" placeholder="Choose a password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="cta" style={{ width: "100%", justifyContent: "center" }}>Create Account</button>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
            Already have an account? <Link to="/login" style={{ color: "var(--soft-red)", fontWeight: 700 }}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
