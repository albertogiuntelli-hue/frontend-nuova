import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        codice: "",
        nome: "",
        descrizione: "",
        prezzo: "",
        prezzo_scontato: "",
        categoria: "",
        disponibile: true
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/products", form);
            navigate("/admin/products");
        } catch (error) {
            console.error("Errore creazione prodotto:", error);
        }
    };

    return (
        <div>
            <h1>Aggiungi Prodotto</h1>

            <form onSubmit={handleSubmit} className="admin-form">
                <input name="codice" placeholder="Codice" onChange={handleChange} />
                <input name="nome" placeholder="Nome" onChange={handleChange} />
                <input name="descrizione" placeholder="Descrizione" onChange={handleChange} />
                <input name="prezzo" placeholder="Prezzo" onChange={handleChange} />
                <input name="prezzo_scontato" placeholder="Prezzo scontato" onChange={handleChange} />
                <input name="categoria" placeholder="Categoria" onChange={handleChange} />

                <button className="btn btn-primary">Salva</button>
            </form>
        </div>
    );
}
