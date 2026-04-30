import api from "./api";

export const getUsers = async () => {
    try {
        const res = await api.get("/users");
        return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
        console.error("Errore caricamento utenti:", error);
        return [];
    }
};

export const registerUser = async (userData) => {
    try {
        const res = await api.post("/users/register", userData);
        return res.data;
    } catch (error) {
        console.error("Errore registrazione utente:", error);
        throw error;
    }
};

export const deleteUser = async (id) => {
    try {
        return await api.delete(`/users/${id}`);
    } catch (error) {
        console.error("Errore eliminazione utente:", error);
        throw error;
    }
};
