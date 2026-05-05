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

    const formatPrice = (value) => {
        if (!value || isNaN(value)) return "—";
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
                        <th>Descrizione</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice}</td>
                            <td>{p.descrizione || p.nome || "—"}</td>
                            <td>{formatPrice(p.prezzo)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
