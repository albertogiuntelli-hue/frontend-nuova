import api from "./api";

// GET /api/products
export const getProducts = async () => {
    try {
        const res = await api.get("/api/products");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
};

// POST /api/products/upload
export const uploadProducts = async (formData) => {
    try {
        const res = await api.post("/api/products/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        console.error("Errore upload prodotti:", error);
        throw error;
    }
};

// DELETE /api/products/delete
export const deleteProducts = async () => {
    try {
        const res = await api.delete("/api/products/delete");
        return res.data;
    } catch (error) {
        console.error("Errore eliminazione prodotti:", error);
        throw error;
    }
};
