import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiHeart, FiInfo, FiShoppingCart } from "react-icons/fi";
import { getNormalizedBook, formatPrice } from "../data/books";
import { useAppContext } from "../context/AppContext";

export default function BookCard({ book, rank }) {
  const navigate = useNavigate();
  const { addCart, list, toggleList } = useAppContext();
  const normBook = getNormalizedBook(book);
  const [preview, setPreview] = useState(null);
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const cancelTimers = () => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  };
  const schedulePreview = (event) => {
    cancelTimers();
    const rect = event.currentTarget.getBoundingClientRect();
    openTimer.current = window.setTimeout(() => {
      const width = Math.min(430, window.innerWidth - 32);
      const estimatedHeight = Math.min(590, window.innerHeight - 32);
      const halfHeight = estimatedHeight / 2;
      const left = Math.min(window.innerWidth - width / 2 - 16, Math.max(width / 2 + 16, rect.left + rect.width / 2));
      const centerY = Math.min(window.innerHeight - halfHeight - 16, Math.max(halfHeight + 16, rect.top + rect.height / 2));
      setPreview({ left, top: centerY, width });
    }, 500);
  };
  const scheduleClose = () => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setPreview(null), 120);
  };
  useEffect(() => {
    if (!preview) return undefined;
    const closePreview = () => setPreview(null);
    document.addEventListener("wheel", closePreview, { passive: true, capture: true });
    document.addEventListener("touchmove", closePreview, { passive: true, capture: true });
    document.addEventListener("scroll", closePreview, { passive: true, capture: true });
    window.addEventListener("resize", closePreview);
    return () => {
      document.removeEventListener("wheel", closePreview, true);
      document.removeEventListener("touchmove", closePreview, true);
      document.removeEventListener("scroll", closePreview, true);
      window.removeEventListener("resize", closePreview);
    };
  }, [preview]);

  if (!normBook) return null;
  const saved = list.includes(normBook.id);

  const openBook = () => navigate(`/product/${normBook.id}`);

  return (
    <article className={`book-card ${rank ? "ranked" : ""} ${preview ? "preview-active" : ""}`}>
      {rank && <span className="rank-number">{rank}</span>}
      <button className="book-cover" onMouseEnter={schedulePreview} onMouseLeave={scheduleClose} onClick={openBook} aria-label={`View ${normBook.title}`}>
        <img className="cover-backdrop" src={normBook.image} alt="" aria-hidden="true" />
        <img className="cover-foreground" src={normBook.image} alt={`${normBook.title} by ${normBook.author}`} />
        {normBook.discount > 0 && <span className="card-discount-pill">{normBook.discount}% OFF</span>}
        <div className="cover-price-badge">
          <span className="card-sale-price">{formatPrice(normBook.salePrice)}</span>
          {normBook.mrp > normBook.salePrice && <span className="card-mrp-price">MRP {formatPrice(normBook.mrp)}</span>}
        </div>
      </button>
      {preview && createPortal(
        <div
          className="card-preview portal-preview"
          style={{ left: preview.left, top: preview.top, width: preview.width }}
          onMouseEnter={cancelTimers}
          onMouseLeave={scheduleClose}
        >
          <div className="preview-art">
            <img className="preview-blur" src={normBook.image} alt="" aria-hidden="true" />
            <img className="preview-cover" src={normBook.image} alt="" aria-hidden="true" />
          </div>
          <div className="preview-body">
            <strong className="preview-title">{normBook.title}</strong>
            <span className="preview-author">by {normBook.author}</span>
            <p className="preview-desc">{normBook.description || `A quality-checked Books by Kilo edition of ${normBook.title}.`}</p>
            <div className="preview-pricing-row">
              <b className="preview-price">{formatPrice(normBook.salePrice)}</b>
              {normBook.mrp > normBook.salePrice && (
                <span className="preview-mrp">{formatPrice(normBook.mrp)}</span>
              )}
              {normBook.discount > 0 && (
                <span className="preview-discount-pill">{normBook.discount}% OFF</span>
              )}
            </div>
          </div>
          <div className="card-actions">
            <button className="preview-action primary" onClick={openBook}><FiInfo /> View</button>
            <button className="preview-action" onClick={() => addCart(normBook)}><FiShoppingCart /> Add • {formatPrice(normBook.salePrice)}</button>
            <button className={`preview-action list-action ${saved ? "saved" : ""}`} onClick={() => toggleList(normBook)}>
              {saved ? <FiCheck /> : <FiHeart />}
            </button>
          </div>
        </div>, document.body)}
    </article>
  );
}
