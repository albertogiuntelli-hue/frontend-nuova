import { Link } from "react-router-dom";
import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Dashboard Amministrazione</h1>

            <div className="dashboard-cards">
                <Link to="/admin/upload" className="dashboard-card">
                    <h3>Carica CSV</h3>
                    <p>Carica prodotti o promo</p>
                </Link>

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
