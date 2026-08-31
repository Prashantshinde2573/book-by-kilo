import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BookCard from "./BookCard";

export default function Shelf({ shelf, items, rank, onViewAll }) {
  const id = `shelf-${shelf.title.replace(/\W/g, "-")}`;
  const railRef = useRef(null);
  const [scrollState, setScrollState] = useState({ left: false, right: true });

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    setScrollState({
      left: rail.scrollLeft > 6,
      right: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 6,
    });
  };

  const scroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".book-card");
    const cardWidth = card ? card.getBoundingClientRect().width : 220;
    const gap = typeof window !== "undefined" && window.innerWidth <= 640 ? 12 : window.innerWidth <= 1080 ? 18 : 24;
    const scrollAmount = rail.clientWidth || 5 * (cardWidth + gap);
    rail.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    rail.scrollLeft = 0;
    rail.scrollTo({ left: 0, behavior: "instant" });
    updateScrollState();

    const frameId = requestAnimationFrame(() => {
      if (rail && rail.scrollLeft !== 0 && !scrollState.left) {
        rail.scrollLeft = 0;
        updateScrollState();
      }
    });

    rail.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      cancelAnimationFrame(frameId);
      rail.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [shelf.title, items]);

  return (
    <section className="shelf-section">
      <div className="shelf-heading">
        <div>
          <h2>{shelf.title} {shelf.accent && <span>{shelf.accent}</span>}</h2>
        </div>
        {!rank && (
          <button 
            type="button" 
            className="shelf-view-all-btn"
            onClick={() => onViewAll?.(shelf)}
            aria-label={`View all ${shelf.title}`}
          >
            <span>View All</span>
            <FiChevronRight size={15} />
          </button>
        )}
      </div>
      <div className="shelf-wrap">
        <button 
          type="button"
          className={`rail-arrow left ${scrollState.left ? "available" : ""}`} 
          disabled={!scrollState.left} 
          onClick={() => scroll(-1)} 
          aria-label="Scroll shelf left"
        >
          <FiChevronLeft />
        </button>
        <div className="book-rail" id={id} ref={railRef}>
          {items.map((book, index) => (
            <BookCard key={`${shelf.title}-${book.id}`} book={book} rank={rank ? index + 1 : undefined} />
          ))}
        </div>
        <button 
          type="button"
          className={`rail-arrow right ${scrollState.right ? "available" : ""}`} 
          disabled={!scrollState.right} 
          onClick={() => scroll(1)} 
          aria-label="Scroll shelf right"
        >
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}
