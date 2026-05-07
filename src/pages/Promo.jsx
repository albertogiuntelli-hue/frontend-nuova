import { useEffect, useState } from "react";
import { getPromo } from "../api/promo";
import UploadPromo from "../components/UploadPromo";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    // Date promo
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getPromo();
                setPromo(data || []);
            } catch (err) {
                console.error("Errore caricamento promo:", err);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2>Caricamento promo...</h2>;

    return (
        <div className="promo-page">
            <h2>Offerte & Promo</h2>

            {/* Box date */}
            <div className="promo-date-box">
                <label>Data inizio:</label>
                <input
                    type="date"
                    value={dataInizio}
                    onChange={(e) => setDataInizio(e.target.value)}
                />

                <label>Data fine:</label>
                <input
                    type="date"
                    value={dataFine}
                    onChange={(e) => setDataFine(e.target.value)}
                />
            </div>

            {/* Upload CSV promo */}
            <UploadPromo
                dataInizio={dataInizio}
                dataFine={dataFine}
            />

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
                            <td>
                                {p.prezzo
                                    ? Number(p.prezzo).toFixed(2) + " €"
                                    : "—"}
                            </td>
                            <td style={{ textAlign: "center" }}>
                                <img
                                    src={p.immagine || "/plusmarket-logo.png"}
                                    alt="Immagine promo"
                                    style={{
                                        width: "80px",
                                        height: "80px",
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
