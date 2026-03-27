// frontend/src/pages/Promo.jsx
import { useEffect, useState } from "react";
import { getPromo } from "../api/promo";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getPromo();
                setPromo(data);
            } catch (error) {
                console.error("Errore caricamento promo:", error);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2>Caricamento promo...</h2>;

    // Stessa logica di Prodotti
    const getImage = (img) => {
        if (!img || img.trim() === "" || img.toLowerCase() === "null") {
            return "/plusmarket-logo.png"; // stesso percorso usato in Prodotti
        }
        return img;
    };

    return (
        <div className="promo-page">
            <h2>Offerte & Promo</h2>

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
                    {promo.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice || "—"}</td>
                            <td>{p.descrizione || p.nome || "—"}</td>
                            <td>{p.prezzo ? `${p.prezzo} €` : "—"}</td>

                            <td style={{ textAlign: "center" }}>
                                <img
                                    src={getImage(p.image)}
                                    alt="Immagine prodotto"
                                    style={{
                                        width: "60px",        // ← STESSA DIMENSIONE DI PRODOTTI
                                        height: "60px",       // ← STESSA DIMENSIONE DI PRODOTTI
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        borderRadius: "6px",
                                        padding: "4px",
                                        border: "1px solid #ddd" // ← STESSO BORDO DI PRODOTTI
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
