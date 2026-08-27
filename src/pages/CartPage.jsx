import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiMinus, FiPlus, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { getNormalizedBook, formatPrice } from "../data/books";
import { useAppContext } from "../context/AppContext";

export default function CartPage() {
  const { cart, updateCartQty, removeFromCart, clearCart, notify } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => { document.title = "Cart | Books By Kilo"; }, []);

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const norm = getNormalizedBook(item.book || item);
    return sum + norm.salePrice * item.quantity;
  }, 0);
  const totalWeight = cart.reduce((sum, item) => {
    const norm = getNormalizedBook(item.book || item);
    return sum + norm.weight * item.quantity;
  }, 0);

  return (
    <div className="static-page">
      <div className="page-header-banner">
        <span className="catalog-kicker">YOUR SHOPPING CART</span>
        <h1 className="catalog-title">Cart</h1>
      </div>

      {!cart.length ? (
        <div className="category-not-found" style={{ padding: "60px var(--page-gutter)", textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "16px", opacity: 0.2 }}><FiShoppingCart /></div>
          <h3>Your cart is empty</h3>
          <p>Discover great books by weight and fill your stack!</p>
          <Link to="/catalogue" className="cta" style={{ display: "inline-flex", marginTop: "16px" }}>Explore Books</Link>
        </div>
      ) : (
        <div className="cart-page-layout">
          <div className="cart-page-items">
            {cart.map(({ id, book, quantity }) => {
              const normBook = getNormalizedBook(book);
              return (
                <div className="cart-item-row cart-page-row" key={id}>
                  <img
                    src={normBook.image} alt={normBook.title}
                    className="cart-item-thumb cart-page-thumb"
                    onClick={() => navigate(`/product/${normBook.id}`)}
                    style={{ cursor: "pointer" }}
                  />
                  <div className="cart-item-info">
                    <strong className="cart-item-title" style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${normBook.id}`)}>
                      {normBook.title}
                    </strong>
                    <span className="cart-item-author">by {normBook.author}</span>
                    <div className="cart-item-price-row">
                      <span className="cart-item-sale-price">{formatPrice(normBook.salePrice)}</span>
                      {normBook.mrp > normBook.salePrice && <span className="cart-item-mrp">{formatPrice(normBook.mrp)}</span>}
                      {normBook.discount > 0 && <span className="cart-item-discount-badge">{normBook.discount}% OFF</span>}
                    </div>
                  </div>
                  <div className="cart-item-ctrl">
                    <div className="qty-picker">
                      <button onClick={() => updateCartQty(id, -1)} aria-label="Decrease quantity"><FiMinus /></button>
                      <span>{quantity}</span>
                      <button onClick={() => updateCartQty(id, 1)} aria-label="Increase quantity"><FiPlus /></button>
                    </div>
                    <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--soft-red)" }}>
                      {formatPrice(normBook.salePrice * quantity)}
                    </span>
                    <button className="trash-btn" onClick={() => removeFromCart(id)} title="Remove item"><FiTrash2 /></button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cart-page-summary">
            <h3>Order Summary</h3>
            <div className="cart-summary-line">
              <span>Subtotal ({totalCount} items)</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <div className="cart-summary-line">
              <span>Total weight</span>
              <span>{(totalWeight / 1000).toFixed(2)} kg</span>
            </div>
            <div className="cart-summary-line">
              <span>Shipping</span>
              <span style={{ color: "#16a34a", fontWeight: 700 }}>FREE</span>
            </div>
            <div className="cart-summary-line total" style={{ borderTop: "2px solid #e5e7eb", paddingTop: "12px", marginTop: "8px" }}>
              <span>Total</span>
              <strong style={{ color: "var(--soft-red)", fontSize: "22px" }}>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="cta checkout-btn" style={{ width: "100%", marginTop: "16px" }} onClick={() => notify("Redirecting to secure checkout...")}>
              Proceed to Checkout
            </button>
            <button className="clear-cart-btn" style={{ width: "100%", marginTop: "8px" }} onClick={clearCart}>Clear Cart</button>
            <div className="pdp-guarantee-grid" style={{ marginTop: "20px" }}>
              <div><FiCheck /> 100% Authentic</div>
              <div><FiCheck /> Easy Replacement</div>
              <div><FiCheck /> Free Delivery</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
