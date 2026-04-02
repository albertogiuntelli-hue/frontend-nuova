// frontend/src/api/promo.js
import api from "./axios";

export const getPromo = async () => {
    try {
        const res = await api.get("/promo");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento promo:", error);
        return [];
    }
};

export const uploadPromo = async (formData) => {
    return api.post("/promo/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deletePromo = async () => {
    return api.delete("/promo/delete");
};
