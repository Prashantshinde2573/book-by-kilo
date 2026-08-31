import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiShoppingCart } from "react-icons/fi";
import { getNormalizedBook, formatPrice } from "../data/books";
import { useAppContext } from "../context/AppContext";

export default function BookCard({ book, rank }) {
  const navigate = useNavigate();
  const { addCart } = useAppContext();
  const [added, setAdded] = useState(false);
  const normBook = getNormalizedBook(book);

  if (!normBook) return null;

  const openBook = () => navigate(`/product/${normBook.id}`);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (added) return;
    addCart(normBook);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article
      className={`book-card ${rank ? "ranked" : ""}`}
      onClick={openBook}
    >
      {rank && <span className="rank-number">{rank}</span>}
      <div className="book-cover">
        <img className="cover-backdrop" src={normBook.image} alt="" aria-hidden="true" />
        <img
          className="cover-foreground"
          src={normBook.image}
          alt={`${normBook.title} by ${normBook.author}`}
          onError={(e) => {
            e.currentTarget.src = "/brand/classic.webp";
          }}
        />
        {normBook.discount > 0 && <span className="card-discount-pill">{normBook.discount}% OFF</span>}
      </div>
      <div className="card-info">
        <h3 className="card-title" title={normBook.title}>{normBook.title}</h3>
        <div className="card-bottom-row">
          <div className="card-pricing-row">
            <span className="card-sale-price">{formatPrice(normBook.salePrice)}</span>
            {normBook.mrp > normBook.salePrice && (
              <span className="card-mrp-price">
                MRP <span className="card-mrp-val">{formatPrice(normBook.mrp)}</span>
              </span>
            )}
            {normBook.discount > 0 && (
              <span className="card-discount-tag">({normBook.discount}% OFF)</span>
            )}
          </div>
          <button
            type="button"
            className={`card-cart-btn ${added ? "added" : ""}`}
            onClick={handleAddToCart}
            aria-label={`Add ${normBook.title} to cart`}
            title={added ? "Added to cart" : "Add to cart"}
          >
            {added ? <FiCheck className="cart-icon check-icon" /> : <FiShoppingCart className="cart-icon" />}
          </button>
        </div>
      </div>
    </article>
  );
}
