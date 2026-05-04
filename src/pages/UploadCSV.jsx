// frontend/src/components/UploadCSV.jsx
import { useState, useRef } from "react";
import axios from "axios";
import "./UploadCSV.css";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // Stati per le date (solo promo)
    const [showDateBox, setShowDateBox] = useState(false);
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");

    const fileInputRef = useRef(null);
    const pendingType = useRef(null);

    // Quando clicchi "Carica CSV Promo"
    const handlePromoClick = () => {
        pendingType.current = "promo";
        setShowDateBox(true);
    };

    // Quando clicchi "Carica CSV Prodotti"
    const handleProductsClick = () => {
        pendingType.current = "products";
        fileInputRef.current.click();
    };

    // Conferma date → salva date → apri file picker
    const handleConfirmDates = async () => {
        if (!dataInizio || !dataFine) {
            alert("Inserisci entrambe le date");
            return;
        }

        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/promo/date`,
                {
                    data_inizio: dataInizio,
                    data_fine: dataFine
                }
            );
        } catch (err) {
            console.error("Errore salvataggio date:", err);
            alert("Errore nel salvataggio delle date");
            return;
        }

        setShowDateBox(false);
        fileInputRef.current.click();
    };

    // Upload effettivo del CSV
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);

        const type = pendingType.current;

        const endpoint =
            type === "products"
                ? `${import.meta.env.VITE_API_URL}/products/upload`
                : `${import.meta.env.VITE_API_URL}/promo/upload`;

        try {
            const res = await axios.post(endpoint, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            setMessage(res.data.message || "File caricato con successo!");
        } catch (error) {
            console.error("Errore upload CSV:", error);
            setMessage("Errore durante il caricamento del file.");
        }

        // Reset
        setFile(null);
        e.target.value = "";
        setDataInizio("");
        setDataFine("");
    };

    return (
        <div className="upload-page">
            <h2>Carica File CSV</h2>

            <div className="upload-box">
                <input
                    type="file"
                    accept=".csv"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />

                <button onClick={handleProductsClick}>
                    Carica CSV Prodotti
                </button>

                <button onClick={handlePromoClick}>
                    Carica CSV Promo
                </button>
            </div>

            {/* Box date per promo */}
            {showDateBox && (
                <div className="date-box">
                    <h4>Inserisci le date della promo</h4>

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

                    <button className="confirm-btn" onClick={handleConfirmDates}>
                        Continua
                    </button>
                </div>
            )}

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
