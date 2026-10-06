import axios from "axios";

const api = axios.create({
    baseURL: "https://backend-nuova-production.up.railway.app/api",
    timeout: 20000
});

export default api;
