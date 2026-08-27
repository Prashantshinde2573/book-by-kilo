import { FiCheck, FiMinus, FiPlus, FiShoppingCart, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { getNormalizedBook, formatPrice } from "../data/books";
import { useAppContext } from "../context/AppContext";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCartQty, removeFromCart, clearCart, notify } = useAppContext();
  const navigate = useNavigate();

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const norm = getNormalizedBook(item.book || item);
    return sum + norm.salePrice * item.quantity;
  }, 0);

  if (!cartOpen) return null;

  return (
    <div className="cart-drawer-overlay" onClick={() => setCartOpen(false)}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <div className="cart-drawer-title">
            <FiShoppingCart />
            <h3>Your Cart</h3>
            <span className="cart-badge-count">{totalCount} {totalCount === 1 ? "item" : "items"}</span>
          </div>
          <button className="cart-close-btn" onClick={() => setCartOpen(false)} aria-label="Close cart"><FiX /></button>
        </div>

        <div className="cart-drawer-body">
          {!cart.length ? (
            <div className="cart-empty">
              <div className="cart-empty-icon"><FiShoppingCart /></div>
              <h4>Your cart is empty</h4>
              <p>Discover great books by weight and fill your stack!</p>
              <button className="cta" onClick={() => { setCartOpen(false); navigate("/catalogue"); }}>Explore Books</button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map(({ id, book, quantity }) => {
                const normBook = getNormalizedBook(book);
                return (
                  <div className="cart-item-row" key={id}>
                    <img src={normBook.image} alt={normBook.title} className="cart-item-thumb" />
                    <div className="cart-item-info">
                      <strong className="cart-item-title">{normBook.title}</strong>
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
                      <button className="trash-btn" onClick={() => removeFromCart(id)} title="Remove item" aria-label="Remove item"><FiTrash2 /></button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line total">
              <span>Subtotal</span>
              <strong>{formatPrice(totalPrice)}</strong>
            </div>
            <button className="cta checkout-btn" onClick={() => { setCartOpen(false); navigate("/cart"); }}>
              View Cart & Checkout • {formatPrice(totalPrice)}
            </button>
            <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
          </div>
        )}
      </aside>
    </div>
  );
}
