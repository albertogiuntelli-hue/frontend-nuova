import { useEffect, useState } from "react";
import axios from "axios";
import "./Promo.css"; // stesso stile della pagina promo

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
            setProducts(res.data);
        } catch (error) {
            console.error("Errore caricamento prodotti:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <h2>Caricamento prodotti...</h2>;

    return (
        <div className="promo-page">
            <h2>Prodotti</h2>

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
                    {products
                        .filter(p => p.codice && p.codice.toLowerCase() !== "codice articolo")
                        .map((p, index) => {
                            const descrizione =
                                p.descrizione && p.descrizione.trim() !== ""
                                    ? p.descrizione
                                    : p.nome || "—";

                            // 🔥 fallback immagine SICURO (esiste al 100%)
                            const imageSrc = "/logo.jpg";

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
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "contain",
                                                borderRadius: "6px",
                                                backgroundColor: "#fff",
                                                padding: "4px"
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
