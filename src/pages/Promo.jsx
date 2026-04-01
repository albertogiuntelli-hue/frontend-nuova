// frontend/src/pages/Promo.jsx
import { useEffect, useState } from "react";
import { getPromo, uploadPromo, deletePromo } from "../api/promo";
import UploadCSV from "../components/UploadCSV";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPromo = async () => {
        try {
            const data = await getPromo();
            setPromo(data);
        } catch (error) {
            console.error("Errore caricamento promo:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadPromo();
    }, []);

    if (loading) return <h2>Caricamento promo...</h2>;

    const getImage = (img) => {
        if (!img || img.trim() === "" || img.toLowerCase() === "null") {
            return "/plusmarket-logo.png";
        }
        return img;
    };

    return (
        <div className="promo-page">
            <h2>Offerte & Promo</h2>

            {/* 🔥 COMPONENTE UPLOAD CSV PER LE PROMO */}
            <UploadCSV />

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
