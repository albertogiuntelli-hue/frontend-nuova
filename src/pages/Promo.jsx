// frontend/src/pages/Promo.jsx
import { useEffect, useState } from "react";
import { getPromo } from "../api/promo";
import UploadCSV from "../components/UploadCSV";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 Date promo
    const [dataInizio, setDataInizio] = useState(null);
    const [dataFine, setDataFine] = useState(null);

    // Carica promo
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

    // Carica date promo
    useEffect(() => {
        const loadDates = async () => {
            try {
                const res = await fetch("/promo/dates");
                const data = await res.json();
                setDataInizio(data.data_inizio);
                setDataFine(data.data_fine);
            } catch (err) {
                console.error("Errore caricamento date promo:", err);
            }
        };
        loadDates();
    }, []);

    // 🔥 Funzione immagine DEFINITIVA
    const getImage = (img) => {
        if (!img) return "/plusmarket-logo.png";

        const cleaned = img.trim().toLowerCase();

        const invalids = [
            "",
            "null",
            "undefined",
            "n/d",
            "-",
            "immagine",
            "immagine promo",
            "immagine_prodotto",
            "immagineprodotto"
        ];

        if (invalids.includes(cleaned) || cleaned.includes("immagine")) {
            return "/plusmarket-logo.png";
        }

        return img;
    };

    if (loading) return <h2>Caricamento promo...</h2>;

    return (
        <div className="promo-page">
            <h2>Offerte & Promo</h2>

            {/* 🔥 Banner date promo */}
            {dataInizio && dataFine && (
                <div className="promo-date-banner">
                    Offerte valide dal <strong>{dataInizio}</strong> al{" "}
                    <strong>{dataFine}</strong>
                </div>
            )}

            <UploadCSV type="promo" />

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
                                    src={getImage(p.immagine)}
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
