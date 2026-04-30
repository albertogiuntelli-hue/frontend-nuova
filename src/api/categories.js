import api from "./api";

export const getCategories = async () => {
    try {
        const res = await api.get("/categories");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento categorie:", error);
        return [];
    }
};
