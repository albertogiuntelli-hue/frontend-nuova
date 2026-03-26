// frontend/src/pages/Shop.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import "./Promo.css";

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (error) {
                console.error("Errore caricamento prodotti:", error);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2>Caricamento prodotti...</h2>;

    return (
        <div className="promo-page">
            <h2>Shop</h2>

            <table className="promo-table">
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Descrizione</th>
                        <th>Prezzo</th>
                        <th>Immagine</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p, index) => {
                        const descrizione =
                            p.descrizione && p.descrizione.trim() !== ""
                                ? p.descrizione
                                : p.nome || "—";

                        const imageSrc = p.image || "/images/plusmarket-logo.png";

                        return (
                            <tr key={index}>
                                <td>{p.codice}</td>
                                <td>{descrizione}</td>
                                <td>{p.prezzo ? `${p.prezzo} €` : "—"}</td>
                                <td>
                                    <img
                                        src={imageSrc}
                                        alt={descrizione}
                                        className="promo-img"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "contain",
                                            borderRadius: "6px",
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
