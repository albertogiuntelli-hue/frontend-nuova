// frontend/src/api/axios.js
import axios from "axios";

/*
 * CONFIGURAZIONE CORRETTA PER LA DASHBOARD
 *
 * Questo file usa la variabile ambiente VITE_API_URL
 * che deve essere impostata così nel file .env.local:
 *
 * VITE_API_URL=http://localhost:5000/api
 *
 * In questo modo:
 * api.get("/products") → http://localhost:5000/api/products
 * api.get("/promo")    → http://localhost:5000/api/promo
 * api.get("/orders")   → http://localhost:5000/api/orders
 */

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export default api;
