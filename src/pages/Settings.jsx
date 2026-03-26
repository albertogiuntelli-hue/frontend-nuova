// src/pages/Settings.jsx
import "./Settings.css";

export default function Settings() {
    return (
        <div className="settings-container">
            <h1>Impostazioni</h1>
            <p>
                Questa sezione è riservata alle impostazioni amministrative.
                Al momento non sono presenti configurazioni modificabili dal pannello.
            </p>
            <p style={{ marginTop: "10px", fontSize: "0.9rem", color: "#666" }}>
                Quando avremo definito le impostazioni da gestire (es. orari consegna, soglia minimo ordine,
                messaggi al cliente, ecc.), le aggiungeremo qui in modo sicuro.
            </p>
        </div>
    );
}
