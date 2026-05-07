import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPromoDates } from "../api/promo";
import "./Dashboard.css";

export default function Dashboard() {
    const [dates, setDates] = useState({
        data_inizio: null,
        data_fine: null
    });

    useEffect(() => {
        const loadDates = async () => {
            try {
                const d = await getPromoDates();
                setDates(d);
            } catch (err) {
                console.error("Errore caricamento date promo:", err);
            }
        };
        loadDates();
    }, []);

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard Amministrazione</h1>

            {/* Banner date promo attive */}
            {dates.data_inizio && dates.data_fine && (
                <div className="dashboard-promo-banner">
                    Promo attive dal <strong>{dates.data_inizio}</strong> al{" "}
                    <strong>{dates.data_fine}</strong>
                </div>
            )}

            <div className="dashboard-cards">

                <Link to="/admin/products" className="dashboard-card">
                    <h3>Prodotti</h3>
                    <p>Gestisci il catalogo</p>
                </Link>

                <Link to="/admin/promo" className="dashboard-card">
                    <h3>Promo</h3>
                    <p>Gestisci le offerte</p>
                </Link>

                <Link to="/admin/orders" className="dashboard-card">
                    <h3>Ordini</h3>
                    <p>Visualizza gli ordini</p>
                </Link>

                <Link to="/admin/orders/archive" className="dashboard-card">
                    <h3>Archivio Ordini</h3>
                    <p>Ordini completati</p>
                </Link>

                <Link to="/admin/users" className="dashboard-card">
                    <h3>Utenti</h3>
                    <p>Gestisci gli utenti</p>
                </Link>

                <Link to="/admin/categories" className="dashboard-card">
                    <h3>Categorie</h3>
                    <p>Gestisci le categorie</p>
                </Link>

            </div>
        </div>
    );
}
