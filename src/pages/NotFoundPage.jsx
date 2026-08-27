import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  useEffect(() => { document.title = "Page Not Found | Books By Kilo"; }, []);
  return (
    <div className="static-page pdp-page" style={{ textAlign: "center", paddingTop: "120px", paddingBottom: "120px" }}>
      <div style={{ fontSize: "120px", fontWeight: 900, color: "#f3f4f6", lineHeight: 1, fontFamily: "Oswald, sans-serif", letterSpacing: "-8px" }}>404</div>
      <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#111827", marginTop: "16px" }}>Page Not Found</h1>
      <p style={{ color: "#6b7280", maxWidth: "400px", margin: "16px auto" }}>The page you're looking for doesn't exist or has been moved.</p>
      <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "24px" }}>
        <Link to="/" className="cta">Go Home</Link>
        <Link to="/catalogue" className="secondary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>Browse Books</Link>
      </div>
    </div>
  );
}
