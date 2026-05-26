import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import "./Products.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getProducts();
            setProducts(Array.isArray(data) ? data : []);
            setLoading(false);
        };
        load();
    }, []);

    const formatPrice = (value) => {
        if (value === undefined || value === null || isNaN(value)) return "—";
        return (value / 100).toFixed(2).replace(".", ",") + " €";
    };

    if (loading) return <h2>Caricamento prodotti...</h2>;

    return (
        <div className="products-page">
            <h2>Prodotti</h2>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Descrizione</th>
                        <th>Prezzo</th>
                        <th>A peso</th>
                        <th>Immagine</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice}</td>

                            {/* Descrizione corretta */}
                            <td>{p.nome || "—"}</td>

                            {/* Prezzo convertito da centesimi a euro */}
                            <td>{formatPrice(p.prezzo)}</td>

                            <td>{p.a_peso === "S" ? "Sì" : "No"}</td>

                            <td style={{ textAlign: "center" }}>
                                <img
                                    src={p.immagine || "/plusmarket-logo.png"}
                                    alt={p.nome}
                                    style={{
                                        width: "70px",
                                        height: "70px",
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        borderRadius: "6px",
                                        padding: "4px",
                                        border: "1px solid #ddd"
                                    }}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
