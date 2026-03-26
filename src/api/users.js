// frontend/src/api/users.js
import api from "./axios";

export const getUsers = async () => {
    try {
        const res = await api.get("/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

export const deleteUser = async (userId) => {
    return api.delete(`/users/${userId}`);
};
