import { useState, useRef } from "react";
import api from "../api/axios";
import "./UploadCSV.css";

export default function UploadCSV({ type }) {
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");
    const [showDateBox, setShowDateBox] = useState(false);
    const fileInputRef = useRef(null);

    const handleClick = () => {
        // 🔥 Se è PROMO → mostra le date
        if (type === "promo") {
            setShowDateBox(true);
            return;
        }

        // 🔥 Se è PRODOTTI → apri direttamente il file picker
        if (type === "products") {
            fileInputRef.current.click();
            return;
        }

        // 🔥 Se arriva da Dashboard (senza type)
        // Chiediamo cosa vuole caricare
        alert("Seleziona prima se vuoi caricare PRODOTTI o PROMO.");
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        if (type === "promo") {
            formData.append("data_inizio", dataInizio);
            formData.append("data_fine", dataFine);
        }

        try {
            await api.post(`/api/upload-${type}`, formData);
            alert("File caricato con successo!");
            window.location.reload();
        } catch (err) {
            console.error("Errore upload:", err);
            alert("Errore nel caricamento del file.");
        }
    };

    return (
        <div className="upload-box">
            <button className="upload-btn" onClick={handleClick}>
                Carica CSV
            </button>

            {/* 🔥 Date solo per PROMO */}
            {showDateBox && type === "promo" && (
                <div className="date-box">
                    <label>Data inizio:</label>
                    <input
                        type="date"
                        value={dataInizio}
                        onChange={(e) => setDataInizio(e.target.value)}
                    />

                    <label>Data fine:</label>
                    <input
                        type="date"
                        value={dataFine}
                        onChange={(e) => setDataFine(e.target.value)}
                    />

                    <button
                        className="upload-btn"
                        onClick={() => fileInputRef.current.click()}
                        disabled={!dataInizio || !dataFine}
                    >
                        Continua e scegli il file
                    </button>
                </div>
            )}

            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleUpload}
            />
        </div>
    );
}
