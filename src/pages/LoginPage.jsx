import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function LoginPage() {
  const { notify } = useAppContext();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  useEffect(() => { document.title = "Sign In | Books By Kilo"; }, []);
  const handleSubmit = (e) => { e.preventDefault(); notify("Signed in successfully!"); navigate("/"); };

  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">ACCOUNT</span>
        <h1 className="catalog-title">Sign In</h1>
      </div>
      <div className="static-page-content">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label htmlFor="login-email">Email</label>
            <input id="login-email" required type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
          </div>
          <div className="auth-field">
            <label htmlFor="login-password">Password</label>
            <input id="login-password" required type="password" placeholder="Your password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" className="cta" style={{ width: "100%", justifyContent: "center" }}>Sign In</button>
          <p style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#6b7280" }}>
            Don't have an account? <Link to="/register" style={{ color: "var(--soft-red)", fontWeight: 700 }}>Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
