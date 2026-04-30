import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import "./Products.css";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getProducts();
            setProducts(data || []);
            setLoading(false);
        };
        load();
    }, []);

    const getImage = (img) => {
        if (!img || img.trim() === "" || img.toLowerCase() === "null") {
            return "/plusmarket-logo.png";
        }
        return img;
    };

    const formatPrice = (value) => {
        if (!value || isNaN(value)) return "—";

        // ✔ Prezzo sempre in euro
        return Number(value).toFixed(2) + " €";
    };

    if (loading) return <h2>Caricamento prodotti...</h2>;

    return (
        <div className="products-page">
            <h2>Prodotti</h2>

            <table className="products-table">
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Nome</th>
                        <th>Prezzo</th>
                        <th>Immagine</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice}</td>
                            <td>{p.nome}</td>
                            <td>{formatPrice(p.prezzo)}</td>
                            <td>
                                <img
                                    src={getImage(p.immagine)}
                                    alt={p.nome}
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
