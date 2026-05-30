// frontend/src/api/api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-nuova-production.up.railway.app/api",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: false,
    timeout: 20000
});

export default api;
