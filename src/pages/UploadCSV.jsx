import { useState } from "react";
import axios from "axios";
import "./UploadCSV.css";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const upload = async (type) => {
        if (!file) {
            setMessage("Seleziona un file CSV prima di caricare.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        // Endpoint corretti su Railway
        const endpoint =
            type === "products"
                ? `${import.meta.env.VITE_API_URL}/api/products/upload`
                : `${import.meta.env.VITE_API_URL}/api/upload`;

        try {
            const res = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage(res.data.message || "File caricato con successo!");
        } catch (error) {
            console.error("Errore upload CSV:", error);
            setMessage("Errore durante il caricamento del file.");
        }
    };

    return (
        <div className="upload-page">
            <h2>Carica File CSV</h2>

            <div className="upload-box">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button onClick={() => upload("products")}>
                    Carica CSV Prodotti
                </button>

                <button onClick={() => upload("promo")}>
                    Carica CSV Promo
                </button>
            </div>

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
