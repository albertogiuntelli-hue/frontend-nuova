import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState(null);

    useEffect(() => {
        const loadProduct = async () => {
            const res = await api.get("/products");
            const product = res.data.find((p) => p.id === parseInt(id));
            setForm(product);
        };
        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/products/${id}`, form);
            navigate("/admin/products");
        } catch (error) {
            console.error("Errore modifica prodotto:", error);
        }
    };

    if (!form) return <p>Caricamento...</p>;

    return (
        <div>
            <h1>Modifica Prodotto</h1>

            <form onSubmit={handleSubmit} className="admin-form">
                <input name="codice" value={form.codice} onChange={handleChange} />
                <input name="nome" value={form.nome} onChange={handleChange} />
                <input name="descrizione" value={form.descrizione} onChange={handleChange} />
                <input name="prezzo" value={form.prezzo} onChange={handleChange} />
                <input name="prezzo_scontato" value={form.prezzo_scontato} onChange={handleChange} />
                <input name="categoria" value={form.categoria} onChange={handleChange} />

                <button className="btn btn-primary">Salva modifiche</button>
            </form>
        </div>
    );
}
