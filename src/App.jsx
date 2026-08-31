import { useEffect, useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { FiCheck } from "react-icons/fi";

import { AppProvider, useAppContext } from "./context/AppContext";
import { books, internetNewBooks, getNormalizedBook } from "./data/books";

import Header from "./components/Header";
import Footer from "./components/Footer";
import NewsChannelsBentoSection from "./components/NewsChannelsBentoSection";
import CartDrawer from "./components/CartDrawer";

import HomePage from "./pages/HomePage";
import CataloguePage from "./pages/CataloguePage";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage";
import SearchPage from "./pages/SearchPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import BulkPurchasePage from "./pages/BulkPurchasePage";
import SurpriseStackPage from "./pages/SurpriseStackPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// ─── Data loader ─────────────────────────────────────────────────────────────

function useAllBooks() {
  return useMemo(() => {
    return books.map((b) => getNormalizedBook(b));
  }, []);
}

// ─── Scroll restoration ───────────────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

// ─── Toast component ─────────────────────────────────────────────────────────

function Toast() {
  const { toast } = useAppContext();
  if (!toast) return null;
  return <div className="toast"><FiCheck /> {toast}</div>;
}

// ─── Inner app (inside AppProvider, has access to context) ────────────────────

function InnerApp() {
  const allBooks = useAllBooks();

  return (
    <div className="app-shell">
      <Header />
      <ScrollToTop />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage allBooks={allBooks} />} />
          <Route path="/catalogue" element={<CataloguePage allBooks={allBooks} />} />
          <Route path="/shop" element={<CataloguePage allBooks={allBooks} />} />
          <Route path="/category/surprise-stack" element={<SurpriseStackPage />} />
          <Route path="/category/:slug" element={<CategoryPage allBooks={allBooks} type="category" />} />
          <Route path="/collection/:slug" element={<CategoryPage allBooks={allBooks} type="collection" />} />
          <Route path="/product/:id" element={<ProductPage allBooks={allBooks} />} />
          <Route path="/search" element={<SearchPage allBooks={allBooks} />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage allBooks={allBooks} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/bulk-purchase" element={<BulkPurchasePage />} />
          <Route path="/surprise-stack" element={<SurpriseStackPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <NewsChannelsBentoSection />
      <Footer />
      <CartDrawer />
      <Toast />
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function App() {
  return (
    <AppProvider>
      <InnerApp />
    </AppProvider>
  );
}
