// frontend/src/api/orders.js
import api from "./api";

// Ottiene tutti gli ordini
export const getOrders = async () => {
    try {
        const res = await api.get("/orders");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento ordini:", error);
        return [];
    }
};

// Aggiorna lo stato di un ordine
export const updateOrderStatus = async (orderId, stato) => {
    try {
        return await api.put(`/orders/${orderId}`, { stato });
    } catch (error) {
        console.error("Errore aggiornamento stato ordine:", error);
        throw error;
    }
};

// Ottiene gli ordini archiviati
export const getArchivedOrders = async () => {
    try {
        const res = await api.get("/orders/archive");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento archivio ordini:", error);
        return [];
    }
};
