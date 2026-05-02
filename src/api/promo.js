import api from "./api";

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
    try {
        const res = await api.post("/promo/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        console.error("Errore upload promo:", error);
        throw error;
    }
};

export const deletePromo = async () => {
    try {
        return await api.delete("/promo/delete");
    } catch (error) {
        console.error("Errore eliminazione promo:", error);
        throw error;
    }
};

export const savePromoDates = async (dates) => {
    try {
        const res = await api.post("/promo/date", dates);
        return res.data;
    } catch (error) {
        console.error("Errore salvataggio date promo:", error);
        throw error;
    }
};

