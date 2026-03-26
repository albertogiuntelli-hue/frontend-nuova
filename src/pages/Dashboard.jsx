import { useState } from "react";
import Products from "./Products";
import Promo from "./Promo";
import Orders from "./Orders";
import Users from "./Users";
import Categories from "./Categories";
import UploadCSV from "./UploadCSV";
import "./Dashboard.css";

export default function Dashboard() {
    const [page, setPage] = useState("products");

    return (
        <div className="dashboard">
            <h1>Dashboard Amministrazione</h1>

            <div className="stats-grid">
                <div className="stat-card" onClick={() => setPage("upload")}>
                    <h3>Carica CSV</h3>
                </div>

                <div className="stat-card" onClick={() => setPage("products")}>
                    <h3>Prodotti</h3>
                </div>

                <div className="stat-card" onClick={() => setPage("promo")}>
                    <h3>Promo</h3>
                </div>

                <div className="stat-card" onClick={() => setPage("orders")}>
                    <h3>Ordini</h3>
                </div>

                <div className="stat-card" onClick={() => setPage("users")}>
                    <h3>Utenti</h3>
                </div>

                <div className="stat-card" onClick={() => setPage("categories")}>
                    <h3>Categorie</h3>
                </div>
            </div>

            <div style={{ marginTop: "30px" }}>
                {page === "upload" && <UploadCSV />}
                {page === "products" && <Products />}
                {page === "promo" && <Promo />}
                {page === "orders" && <Orders />}
                {page === "users" && <Users />}
                {page === "categories" && <Categories />}
            </div>
        </div>
    );
}
