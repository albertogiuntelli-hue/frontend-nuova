import React, { useState } from "react";
import axios from "axios";

export default function UploadCSV({ type }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleUpload = async () => {
        if (!file) {
            setMessage("Seleziona un file CSV");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            // Endpoint corretto
            const endpoint =
                type === "promo"
                    ? "http://192.168.1.65:5000/api/promo/upload"
                    : "http://192.168.1.65:5000/api/products/upload";

            const res = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage("File caricato con successo");
        } catch (error) {
            console.error("Errore upload CSV:", error);
            setMessage("Errore durante il caricamento del file");
        }
    };

    return (
        <div>
            <h2>Carica File CSV</h2>
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Carica</button>
            <p>{message}</p>
        </div>
    );
}
