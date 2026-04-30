// frontend/src/pages/Promo.jsx
import { useEffect, useState } from "react";
import { getPromo } from "../api/promo";
import UploadCSV from "../components/UploadCSV";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

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

    // 🔥 Funzione immagine DEFINITIVA
    const getImage = (img) => {
        if (!img) return "/plusmarket-logo.png";

        const cleaned = img.trim().toLowerCase();

        if (
            cleaned === "" ||
            cleaned === "null" ||
            cleaned === "undefined" ||
            cleaned === "n/d" ||
            cleaned === "-" ||
            cleaned === "immagine promo"
        ) {
            return "/plusmarket-logo.png";
        }

        return img;
    };

    if (loading) return <h2>Caricamento promo...</h2>;

    return (
        <div className="promo-page">
            <h2>Offerte & Promo</h2>

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

                            {/* ✔ Usa sempre p.descrizione */}
                            <td>{p.descrizione || "—"}</td>

                            {/* ✔ Prezzo già corretto */}
                            <td>
                                {p.prezzo
                                    ? Number(p.prezzo).toFixed(2) + " €"
                                    : "—"}
                            </td>

                            {/* ✔ Immagine corretta */}
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
