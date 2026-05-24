import api from "./api";

// GET /products
export const getProducts = async () => {
    try {
        const res = await api.get("/products");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
};

// POST /products/upload
export const uploadProducts = async (formData) => {
    try {
        const res = await api.post("/products/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data;
    } catch (error) {
        console.error("Errore upload prodotti:", error);
        throw error;
    }
};

// DELETE /products/delete
export const deleteProducts = async () => {
    try {
        const res = await api.delete("/products/delete");
        return res.data;
    } catch (error) {
        console.error("Errore eliminazione prodotti:", error);
        throw error;
    }
};
