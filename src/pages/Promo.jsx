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
                    {promo.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice || "—"}</td>
                            <td>{p.descrizione || p.nome || "—"}</td>
                            <td>{p.prezzo ? `${p.prezzo} €` : "—"}</td>

                            {/* LOGO FISSO SEMPRE */}
                            <td style={{ textAlign: "center" }}>
                                <img
                                    src="/plusmarket-logo.png"
                                    alt="Logo PlusMarket"
                                    style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "contain",
                                        backgroundColor: "#fff",
                                        borderRadius: "4px",
                                        padding: "2px"
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
