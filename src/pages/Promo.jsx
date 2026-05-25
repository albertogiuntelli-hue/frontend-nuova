import { useEffect, useState } from "react";
import api from "../api/api";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    useEffect(() => {
        loadPromo();
    }, []);

    const loadPromo = async () => {
        try {
            const res = await api.get("/api/promo");   // CORRETTO
            const data = res.data || [];

            const parsed = data.map((row) => ({
                codice: row.codice,
                nome: row.descrizione,
                prezzo: row.prezzo,
                immagine: row.immagine,
            }));

            setPromo(parsed);
        } catch (err) {
            console.error("Errore caricamento promo:", err);
        }
        setLoading(false);
    };

    const uploadPromo = async () => {
        if (!file) {
            alert("Seleziona un file CSV");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            await api.post("/api/promo/upload", formData);   // CORRETTO
            alert("Promo caricate correttamente");
            loadPromo();
        } catch (err) {
            console.error("Errore upload promo:", err);
            alert("Errore caricamento promo");
        }
    };

    const deletePromo = async () => {
        if (!window.confirm("Sei sicuro di voler eliminare tutte le promo?")) return;

        try {
            await api.delete("/api/promo");   // CORRETTO
            alert("Promo eliminate");
            loadPromo();
        } catch (err) {
            console.error("Errore eliminazione promo:", err);
        }
    };

    const formatPrice = (value) => {
        if (value === null || value === undefined || value === "" || isNaN(value)) {
            return "—";
        }

        return Number(value).toFixed(2).replace(".", ",") + " €";
    };

    if (loading) return <h2>Caricamento promo...</h2>;

    return (
        <div className="promo-admin-container">
            <h1>Gestione Promo</h1>

            <div className="promo-upload-box">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <button onClick={uploadPromo}>Carica Promo</button>
                <button className="delete-btn" onClick={deletePromo}>
                    Elimina Promo
                </button>
            </div>

            <h2>Promo Attive</h2>

            <table className="promo-table">
                <thead>
                    <tr>
                        <th>Codice</th>
                        <th>Nome</th>
                        <th>Prezzo</th>
                        <th>Immagine</th>
                    </tr>
                </thead>
                <tbody>
                    {promo.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice}</td>
                            <td>{p.nome}</td>
                            <td>{formatPrice(p.prezzo)}</td>
                            <td>
                                <img
                                    src={p.immagine || "/placeholder.png"}
                                    alt={p.nome}
                                    className="promo-admin-image"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
