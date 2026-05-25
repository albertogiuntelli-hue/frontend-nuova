// frontend/src/api/promo.js
import api from "./api";

// GET /api/promo
export const getPromo = async () => {
    try {
        const res = await api.get("/api/promo");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento promo:", error);
        return [];
    }
};

// POST /api/promo/upload
export const uploadPromo = async (formData) => {
    try {
        const res = await api.post("/api/promo/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        console.error("Errore upload promo:", error);
        throw error;
    }
};

// DELETE /api/promo/delete
export const deletePromo = async () => {
    try {
        return await api.delete("/api/promo/delete");
    } catch (error) {
        console.error("Errore eliminazione promo:", error);
        throw error;
    }
};

// GET /api/promo/dates
export const getPromoDates = async () => {
    try {
        const res = await api.get("/api/promo/dates");
        return res.data || {};
    } catch (error) {
        console.error("Errore caricamento date promo:", error);
        return {};
    }
};

// POST /api/promo/date
export const savePromoDates = async (dates) => {
    try {
        const res = await api.post("/api/promo/date", dates);
        return res.data;
    } catch (error) {
        console.error("Errore salvataggio date promo:", error);
        throw error;
    }
};
