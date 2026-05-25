import { useState } from "react";
import api from "../api/api";
import "./UploadCSV.css";

export default function UploadCSV({ type = "products", extraData = {} }) {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    const upload = async () => {
        if (!file) {
            setMessage("Seleziona un file CSV prima di caricare.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        for (const key in extraData) {
            if (extraData[key]) {
                formData.append(key, extraData[key]);
            }
        }

        const endpoint =
            type === "products"
                ? "/api/products/upload"
                : "/api/promo/upload";

        try {
            const res = await api.post(endpoint, formData, {
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
            <div className="upload-box">
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button onClick={upload}>
                    Carica CSV
                </button>
