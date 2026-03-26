import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Login automatico senza backend
    const login = () => {
        const fakeUser = { username: "admin" };
        setUser(fakeUser);
        localStorage.setItem("token", "FAKE_TOKEN");
    };

    // Logout semplice
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // All'avvio, considera l'utente già loggato
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setUser({ username: "admin" });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
