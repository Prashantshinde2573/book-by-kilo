import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiCheck, FiChevronLeft, FiHeart, FiShoppingCart } from "react-icons/fi";
import { getNormalizedBook, formatPrice } from "../data/books";
import { useAppContext } from "../context/AppContext";
import BookCard from "../components/BookCard";

export default function ProductPage({ allBooks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addCart, list, toggleList } = useAppContext();
  const [recFilter, setRecFilter] = useState("genre");

  const book = useMemo(() => {
    const found = allBooks.find((b) => String(b.id) === String(id));
    return found ? getNormalizedBook(found) : null;
  }, [allBooks, id]);

  useEffect(() => {
    if (book) document.title = `${book.title} | Books By Kilo`;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [book]);

  const recommendations = useMemo(() => {
    if (!book) return [];
    if (recFilter === "author") {
      const matchAuthor = allBooks.filter((b) => b.id !== book.id && b.author?.toLowerCase() === book.author?.toLowerCase());
      if (matchAuthor.length >= 2) return matchAuthor;
    }
    return allBooks.filter((b) => b.id !== book.id && (b.genre === book.genre || b.categories?.includes(book.categories?.[0])));
  }, [book, recFilter, allBooks]);

  if (!book) {
    return (
      <div className="pdp-page" style={{ textAlign: "center", paddingTop: "120px" }}>
        <h2>Book Not Found</h2>
        <p>This book doesn't exist or may have been removed.</p>
        <Link to="/catalogue" className="cta" style={{ display: "inline-flex", marginTop: "20px" }}>Browse All Books</Link>
      </div>
    );
  }

  const saved = list.includes(book.id);

  return (
    <section className="pdp-page">
      <div className="pdp-top-bar">
        <button className="pdp-back-btn" onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back
        </button>
      </div>

      <div className="pdp-main-card">
        <div className="pdp-visual">
          <img className="pdp-cover-full" src={book.image} alt={`${book.title} by ${book.author}`} />
        </div>

        <div className="pdp-details">
          <span className="eyebrow">{book.genre || "FEATURED BOOK"}</span>
          <h1 className="pdp-title">{book.title}</h1>
          <p className="byline">by {book.author}</p>

          <div className="pdp-price-box">
            <span className="pdp-price">{formatPrice(book.salePrice)}</span>
            {book.mrp > book.salePrice && (
              <span className="pdp-mrp-price">
                <span className="mrp-label">MRP</span> {formatPrice(book.mrp)}
              </span>
            )}
            {book.discount > 0 && (
              <span className="pdp-discount-pill">{book.discount}% OFF</span>
            )}
          </div>

          <p className="description">{book.description || `A quality-checked Books by Kilo edition of ${book.title}.`}</p>

          <div className="hero-actions pdp-actions">
            <button className="cta" onClick={() => addCart(book)}>
              <FiShoppingCart /> Add to Cart • <b>{formatPrice(book.salePrice)}</b>
            </button>
            <button className={`secondary ${saved ? "saved" : ""}`} onClick={() => toggleList(book)}>
              {saved ? <FiCheck /> : <FiHeart />} {saved ? "In My List" : "Add to My List"}
            </button>
          </div>

          <div className="pdp-guarantee-grid">
            <div><FiCheck /> 100% Authentic Quality-Checked</div>
            <div><FiCheck /> 7-Day Easy Replacement Guarantee</div>
            <div><FiCheck /> Fast Pan-India Delivery</div>
          </div>
        </div>
      </div>

      <div className="pdp-rec-section">
        <div className="pdp-rec-header">
          <div>
            <span className="pdp-rec-kicker">CURATED RECOMMENDATIONS</span>
            <h2>You Might Also Like</h2>
          </div>
          <div className="pdp-rec-tabs">
            <button className={recFilter === "genre" ? "active" : ""} onClick={() => setRecFilter("genre")}>Same Genre</button>
            <button className={recFilter === "author" ? "active" : ""} onClick={() => setRecFilter("author")}>Same Author</button>
          </div>
        </div>
        <div className="shelf-wrap">
          <div className="book-rail pdp-rec-rail">
            {recommendations.slice(0, 16).map((recBook) => (
              <BookCard key={`rec-${recBook.id}`} book={recBook} />
            ))}
            {!recommendations.length && <div className="empty">No other books found in this filter.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
