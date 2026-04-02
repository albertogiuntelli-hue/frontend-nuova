// frontend/src/components/UploadCSV.jsx
import { useState } from "react";
import { uploadPromo } from "../api/promo";
import { uploadProducts } from "../api/products";

// ⚠️ IMPORT CSS RIMOSSO DEFINITIVAMENTE
// import "./UploadCSV.css";

export default function UploadCSV({ type = "promo" }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);
        setMessage("");

        try {
            if (type === "promo") {
                await uploadPromo(formData);
                setMessage("Promo caricate con successo!");
            } else {
                await uploadProducts(formData);
                setMessage("Prodotti caricati con successo!");
            }
        } catch (error) {
            console.error("Errore upload CSV:", error);
            setMessage("Errore durante il caricamento del file.");
        }

        setLoading(false);
    };

    return (
        <div className="upload-csv">
            <label className="upload-label">
                {loading ? "Caricamento..." : "Carica CSV"}
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />
            </label>

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
