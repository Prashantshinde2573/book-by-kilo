import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import BookCard from "../components/BookCard";
import { getNormalizedBook } from "../data/books";
import { useAppContext } from "../context/AppContext";

export default function WishlistPage({ allBooks }) {
  const { list } = useAppContext();
  useEffect(() => { document.title = "My Wishlist | Books By Kilo"; }, []);
  const wishlistBooks = allBooks.filter((b) => list.includes(b.id)).map(getNormalizedBook);

  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">SAVED BOOKS</span>
        <h1 className="catalog-title">My Wishlist</h1>
        <p className="catalog-description">Books you've saved for later.</p>
      </div>

      {!wishlistBooks.length ? (
        <div className="category-not-found" style={{ padding: "60px var(--page-gutter)", textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px", opacity: 0.2 }}><FiHeart /></div>
          <h3>Your wishlist is empty</h3>
          <p>Save books you love and find them here anytime.</p>
          <Link to="/catalogue" className="cta" style={{ display: "inline-flex", marginTop: "16px" }}>Discover Books</Link>
        </div>
      ) : (
        <div style={{ padding: "0 var(--page-gutter) 60px" }}>
          <div className="results-grid">
            {wishlistBooks.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      )}
    </div>
  );
}
