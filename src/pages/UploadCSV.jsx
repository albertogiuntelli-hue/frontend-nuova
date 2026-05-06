import { useState, useRef } from "react";
import { uploadPromo } from "../api/promo";
import { uploadProducts } from "../api/products";

export default function UploadCSV({ type = "promo" }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // 🔥 SOLO PER PROMO: date
    const [showDateBox, setShowDateBox] = useState(false);
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");

    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (type === "promo") {
            setShowDateBox(true);
            return;
        }

        // prodotti + dashboard
        fileInputRef.current.click();
    };

    const handleConfirmDates = () => {
        if (!dataInizio || !dataFine) {
            alert("Inserisci entrambe le date");
            return;
        }

        setShowDateBox(false);
        fileInputRef.current.click();
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
        e.target.value = "";
    };

    return (
        <div className="upload-csv">
            <label className="upload-label" onClick={handleClick}>
                {loading ? "Caricamento..." : "Carica CSV"}
            </label>

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

                    <button onClick={handleConfirmDates}>
                        Continua e scegli il file
                    </button>
                </div>
            )}

            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleUpload}
                style={{ display: "none" }}
            />

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
