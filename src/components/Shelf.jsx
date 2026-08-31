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
      left: rail.scrollLeft > 4,
      right: rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4,
    });
  };

  const scroll = (direction) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector(".book-card");
    const cardWidth = card ? card.getBoundingClientRect().width : 220;
    const gap = typeof window !== "undefined" && window.innerWidth > 1024 ? 32 : 14;
    const cardsToScroll = Math.max(1, Math.floor(rail.clientWidth / (cardWidth + gap)) - 1 || 3);
    const scrollAmount = cardsToScroll * (cardWidth + gap);
    rail.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
  };
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    // Explicitly enforce starting from the very first book on mount & update
    rail.scrollLeft = 0;
    rail.scrollTo({ left: 0, behavior: "instant" });
    updateScrollState();

    // Secondary frame check in case layout shifts after render
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
        {!rank && <button onClick={() => onViewAll?.(shelf)}>View All <FiChevronRight /></button>}
      </div>
      <div className="shelf-wrap">
        <button className={`rail-arrow left ${scrollState.left ? "available" : ""}`} disabled={!scrollState.left} onClick={() => scroll(-1)} aria-label="Scroll shelf left"><FiChevronLeft /></button>
        <div className="book-rail" id={id} ref={railRef}>
          {items.map((book, index) => (
            <BookCard key={`${shelf.title}-${book.id}`} book={book} rank={rank ? index + 1 : undefined} />
          ))}
        </div>
        <button className={`rail-arrow right ${scrollState.right ? "available" : ""}`} disabled={!scrollState.right} onClick={() => scroll(1)} aria-label="Scroll shelf right"><FiChevronRight /></button>
      </div>
    </section>
  );
}
