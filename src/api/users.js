import api from "./axios";

export const getUsers = async () => {
    try {
        const res = await api.get("/api/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

export const deleteUser = async (userId) => {
    return api.delete(`/api/users/${userId}`);
};
