import { useEffect, useState } from "react";
import api from "../api/api";
import "./Promo.css";

export default function Promo() {
    const [promo, setPromo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPromo();
    }, []);

    const loadPromo = async () => {
        try {
            // CORRETTO: niente /api qui
            const res = await api.get("/promo");
            const data = res.data || [];

            const parsed = data.map((row) => ({
                codice: row.codice,
                nome: row.descrizione || row.nome,
                prezzo: row.prezzo,
                immagine: row.immagine,
            }));

            setPromo(parsed);
        } catch (err) {
            console.error("Errore caricamento promo:", err);
        } finally {
            setLoading(false);
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
            <h1>Promo Attive</h1>

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
