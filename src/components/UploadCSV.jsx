// frontend/src/components/UploadCSV.jsx
import { useState, useRef } from "react";
import { uploadPromo, savePromoDates } from "../api/promo";
import { uploadProducts } from "../api/products";

export default function UploadCSV({ type = "promo" }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [showDateBox, setShowDateBox] = useState(false);
    const [dataInizio, setDataInizio] = useState("");
    const [dataFine, setDataFine] = useState("");

    const fileInputRef = useRef(null);

    const handleClick = () => {
        if (type === "promo") {
            setShowDateBox(true);
        } else {
            fileInputRef.current.click();
        }
    };

    const handleConfirmDates = async () => {
        if (!dataInizio || !dataFine) {
            alert("Inserisci entrambe le date");
            return;
        }

        try {
            await savePromoDates({
                data_inizio: dataInizio,
                data_fine: dataFine
            });
        } catch (err) {
            console.error("Errore salvataggio date:", err);
            alert("Errore nel salvataggio delle date");
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
        setDataInizio("");
        setDataFine("");
        e.target.value = "";
    };

    return (
        <div className="upload-csv">
            <label className="upload-label" onClick={handleClick}>
                {loading ? "Caricamento..." : "Carica CSV"}
            </label>

            <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                onChange={handleUpload}
                style={{ display: "none" }}
            />

            {showDateBox && type === "promo" && (
                <div
                    style={{
                        marginTop: "15px",
                        padding: "15px",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        background: "#f9f9f9"
                    }}
                >
                    <h4>Inserisci le date della promo</h4>

                    <label>Data inizio:</label>
                    <input
                        type="date"
                        value={dataInizio}
                        onChange={(e) => setDataInizio(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />

                    <label>Data fine:</label>
                    <input
                        type="date"
                        value={dataFine}
                        onChange={(e) => setDataFine(e.target.value)}
                        style={{ display: "block", marginBottom: "10px" }}
                    />

                    <button
                        onClick={handleConfirmDates}
                        style={{
                            padding: "8px 15px",
                            background: "#28a745",
                            color: "#fff",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Continua
                    </button>
                </div>
            )}

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
}
