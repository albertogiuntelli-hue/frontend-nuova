import React, { useState } from "react";
import "./UploadCSV.css";

const Upload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setMessage("Seleziona un file prima di caricare.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (response.ok) {
                setMessage("File caricato con successo!");
            } else {
                setMessage("Errore durante il caricamento.");
            }
        } catch (error) {
            console.error("Errore upload CSV:", error);
            setMessage("Errore di connessione al server.");
        }
    };

    return (
        <div className="upload-page">
            <h2>Carica File Promo</h2>

            <div className="upload-box">
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>Carica</button>
            </div>

            {message && <p className="upload-message">{message}</p>}
        </div>
    );
};

export default Upload;
