import api from "./axios";

// Ottiene tutti gli utenti
export const getUsers = async () => {
    try {
        const res = await api.get("/api/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

// Elimina un utente
export const deleteUser = async (userId) => {
    return api.delete(`/api/users/${userId}`);
};
