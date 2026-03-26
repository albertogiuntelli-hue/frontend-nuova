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
                    {promo
                        .filter(p => p.codice && p.codice.toLowerCase() !== "codice articolo")
                        .map((p, index) => {
                            const descrizione =
                                p.descrizione && p.descrizione.trim() !== ""
                                    ? p.descrizione
                                    : p.nome || "—";

                            // 🔥 fallback immagine corretto
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
