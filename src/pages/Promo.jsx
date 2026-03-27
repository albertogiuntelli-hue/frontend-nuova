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

                        {/* Colonna immagine super compatta */}
                        <th style={{ width: "55px", textAlign: "center" }}>Img</th>
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

                            const imageSrc = p.image || "/plusmarket-logo.png";

                            return (
                                <tr key={index}>
                                    <td>{p.codice}</td>
                                    <td>{descrizione}</td>
                                    <td>{p.prezzo ? `${p.prezzo} €` : "—"}</td>

                                    <td style={{ textAlign: "center" }}>
                                        <img
                                            src={imageSrc}
                                            alt={descrizione}
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                objectFit: "contain",
                                                borderRadius: "4px",
                                                backgroundColor: "#fff",
                                                padding: "1px",
                                                display: "inline-block"
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
