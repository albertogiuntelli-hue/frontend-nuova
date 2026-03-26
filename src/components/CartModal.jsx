import "./CartModal.css";
import { useCart } from "../context/CartContext";

export default function CartModal({ isOpen, onClose }) {
    const { cart, addToCart, removeFromCart, clearCart } = useCart();

    if (!isOpen) return null;

    // Conversione sicura del prezzo
    const safePrice = (value) => {
        if (typeof value === "number") return value;
        if (!value) return 0;
        return parseFloat(String(value).replace(",", "."));
    };

    const total = cart
        .reduce((sum, item) => sum + safePrice(item.prezzo) * item.qty, 0)
        .toFixed(2)
        .replace(".", ",");

    const handleWhatsApp = () => {
        if (cart.length === 0) return;

        const righe = cart.map(
            (item) =>
                `- ${item.nome} x${item.qty} = ${(safePrice(item.prezzo) * item.qty)
                    .toFixed(2)
                    .replace(".", ",")} €`
        );

        const messaggio = `Nuovo ordine PlusMarket:%0A%0A${righe.join(
            "%0A"
        )}%0A%0ATotale: ${total} €`;

        // NUMERO DI ALBERTO
        const telefono = "393356039828";

        const url = `https://wa.me/${telefono}?text=${messaggio}`;
        window.open(url, "_blank");

        // 🟢 SVUOTA IL CARRELLO DOPO L’INVIO
        clearCart();

        // 🟢 CHIUDE IL MODAL
        onClose();
    };

    return (
        <div className="cart-modal-backdrop" onClick={onClose}>
            <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-modal-header">
                    <h2>Il tuo carrello</h2>
                    <button className="close-btn" onClick={onClose}>✕</button>
                </div>

                {cart.length === 0 ? (
                    <p className="empty-cart">Il carrello è vuoto.</p>
                ) : (
                    <>
                        <ul className="cart-items">
                            {cart.map((item) => (
                                <li key={item.id} className="cart-item">
                                    <div className="cart-item-info">
                                        <span className="cart-item-name">{item.nome}</span>
                                        <span className="cart-item-price">
                                            {safePrice(item.prezzo)
                                                .toFixed(2)
                                                .replace(".", ",")} €
                                        </span>
                                    </div>

                                    <div className="cart-item-actions">
                                        <button onClick={() => removeFromCart(item.id)}>-</button>
                                        <span className="cart-item-qty">{item.qty}</span>
                                        <button onClick={() => addToCart(item)}>+</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="cart-total">
                            Totale: {total} €
                        </div>

                        <div className="cart-modal-footer">
                            <button className="clear-btn" onClick={clearCart}>
                                Svuota carrello
                            </button>
                            <button className="whatsapp-btn" onClick={handleWhatsApp}>
                                Invia ordine via WhatsApp
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
