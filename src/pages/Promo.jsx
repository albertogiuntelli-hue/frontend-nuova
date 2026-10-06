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
            const res = await api.get("/promo");
            const data = res.data || [];

            const parsed = data.map((row) => ({
                codice: row.codice,
                nome: row.nome,
                prezzo: row.prezzo,
                a_peso: row.a_peso,
                immagine: row.immagine
            }));

            setPromo(parsed);
        } catch (err) {
            console.error("Errore caricamento promo:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (value) => {
        if (!value) return "—";
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
                        <th>A peso</th>
                        <th>Immagine</th>
                    </tr>
                </thead>
                <tbody>
                    {promo.map((p, index) => (
                        <tr key={index}>
                            <td>{p.codice}</td>
                            <td>{p.nome || "—"}</td>
                            <td>{formatPrice(p.prezzo)}</td>
                            <td>{p.a_peso === "S" ? "Sì" : "No"}</td>
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
