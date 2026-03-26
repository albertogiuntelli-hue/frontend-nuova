// frontend/src/api/auth.js

import api from "./api";

export const loginRequest = async (username, password) => {
    const res = await api.post("/auth/login", { username, password });
    return res.data;
};
