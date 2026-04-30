import api from "./api";

export const getProducts = async () => {
    try {
        const res = await api.get("/products");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento prodotti:", error);
        return [];
    }
};

export const uploadProducts = async (formData) => {
    return api.post("/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
};

export const deleteProducts = async () => {
    return api.delete("/products/delete");
};
