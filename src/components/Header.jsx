import "./Header.css";
import LOGO from "../assets/LOGO-PLUSMARKET.png";

export default function Header() {
    return (
        <header className="admin-header">
            <div className="header-left">
                <img src={LOGO} alt="Logo" className="header-logo" />
                <h1 className="header-title">PlusMarket Admin</h1>
            </div>

            <div className="header-right">
                <span className="admin-user">👤 Admin</span>
            </div>
        </header>
    );
}
