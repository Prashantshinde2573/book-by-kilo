import { createContext, useContext, useState, useMemo, useCallback } from "react";
import { getNormalizedBook, formatPrice } from "../data/books";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([2, 10, 15]);
  const [toast, setToast] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const notify = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 1800);
  }, []);

  const addCart = useCallback((rawBook) => {
    const normBook = getNormalizedBook(rawBook);
    if (!normBook) return;
    setCart((items) => {
      const existing = items.find((item) => item.id === normBook.id);
      if (existing) {
        return items.map((item) => item.id === normBook.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...items, { id: normBook.id, book: normBook, quantity: 1 }];
    });
    notify(`Added "${normBook.title}" (${formatPrice(normBook.salePrice)}) to cart`);
  }, [notify]);

  const updateCartQty = useCallback((bookId, delta) => {
    setCart((items) =>
      items
        .map((item) => {
          if (item.id === bookId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  }, []);

  const removeFromCart = useCallback((bookId) => {
    setCart((items) => items.filter((item) => item.id !== bookId));
    notify("Item removed from cart");
  }, [notify]);

  const clearCart = useCallback(() => {
    setCart([]);
    notify("Cart cleared");
  }, [notify]);

  const toggleList = useCallback((book) => {
    const normBook = getNormalizedBook(book);
    if (!normBook) return;
    setList((items) => items.includes(normBook.id) ? items.filter((id) => id !== normBook.id) : [...items, normBook.id]);
  }, []);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const value = {
    cart, list, toast, cartOpen,
    setCartOpen, notify,
    addCart, updateCartQty, removeFromCart, clearCart, toggleList,
    cartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside <AppProvider>");
  return ctx;
}
