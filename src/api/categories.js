// frontend/src/api/categories.js
// Le categorie sono opzionali: se non ci sono, restituiamo un array vuoto.
// Questo evita errori 404 e impedisce alla dashboard di crashare.

export const getCategories = async () => {
    return []; // Nessuna categoria, nessun errore
};
