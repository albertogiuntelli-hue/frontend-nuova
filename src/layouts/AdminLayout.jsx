import Sidebar from "../components/Sidebar";
import "./AdminLayout.css";

export default function AdminLayout({ children }) {
    return (
        <div className="admin-layout">
            <Sidebar />

            <div className="admin-content">
                {children}
            </div>
        </div>
    );
}
