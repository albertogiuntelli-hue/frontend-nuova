import React, { useEffect, useState } from "react";
import api from "../api/api";

function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get("/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Errore nel caricamento prodotti:", error);
        }
    };

    return (
        <div className="page-container">
            <h1 className="page-title">Prodotti</h1>

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Descrizione</th>
                        <th>Prezzo</th>
                    </tr>
                </thead>

                <tbody>
                    {products.map((product) => (
                        <tr key={product.codice}>
                            <td>{product.codice}</td>
                            <td>{product.descrizione}</td>
                            <td>{(product.prezzo / 100).toFixed(2)} €</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Products;
