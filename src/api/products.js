// frontend/src/api/products.js
import api from "./axios";

/*
 * API PRODOTTI
 * Tutte le chiamate puntano a:
 * http://localhost:5000/api/products
 */

// Ottiene tutti i prodotti
export const getProducts = async () => {
    try {
        const res = await api.get("/products");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
};

// Upload CSV prodotti
export const uploadProducts = async (formData) => {
    return api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

// Cancella tutti i prodotti
export const deleteProducts = async () => {
    return api.delete("/products/delete");
};
