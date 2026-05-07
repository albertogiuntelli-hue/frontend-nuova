import { useState } from "react";
import axios from "axios";
import "./UploadCSV.css";

export default function UploadPromo({ dataInizio, dataFine }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const upload = async () => {
        if (!file) {
            setMessage("Seleziona un file CSV prima di caricare.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("data_inizio", dataInizio);
        formData.append("data_fine", dataFine);

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/promo/upload`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setMessage(res.data.message || "File promo caricato con successo!");
        } catch (error) {
            console.error("Errore upload promo:", error);
            setMessage("Errore durante il caricamento del file promo.");
        }
    };

    return (
        <div className="upload-box">
            <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files[0])}
            />

            <button onClick={upload} disabled={!dataInizio || !dataFine}>
                Carica CSV Promo
            </button>

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
