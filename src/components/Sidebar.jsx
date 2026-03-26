import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">Admin</h2>

            <nav className="sidebar-menu">

                <NavLink
                    to="/admin"
                    end
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    📊 Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    📦 Prodotti
                </NavLink>

                <NavLink
                    to="/admin/promo"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    🔥 Promo
                </NavLink>

                <NavLink
                    to="/admin/orders"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    🧾 Ordini
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    👤 Utenti
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    📂 Categorie
                </NavLink>

                <NavLink
                    to="/admin/upload"
                    className={({ isActive }) =>
                        isActive ? "sidebar-link active" : "sidebar-link"
                    }
                >
                    📤 Carica CSV
                </NavLink>

            </nav>
        </aside>
    );
}
