// frontend/src/api/promo.js
import api from "./axios";

/*
 * API PROMO
 * Ora le promo vengono lette dagli stessi prodotti,
 * filtrando quelli che hanno un prezzo in offerta.
 */

export const getPromo = async () => {
    try {
        // 🔥 Carichiamo TUTTI i prodotti dal backend Railway
        const res = await api.get("/api/products");

        // 🔥 Filtriamo solo quelli che hanno un prezzo valido
        //    (puoi personalizzare il filtro come vuoi)
        const prodotti = Array.isArray(res.data) ? res.data : [];

        // Esempio: consideriamo "promo" i prodotti con prezzo > 0
        const promo = prodotti.filter(p => p.prezzo && p.prezzo > 0);

        return promo;
    } catch (error) {
        console.error("Errore caricamento promo:", error);
        return [];
    }
};

export const uploadPromo = async (formData) => {
    return api.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deletePromo = async () => {
    return api.delete("/api/delete");
};
