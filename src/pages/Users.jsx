// frontend/src/pages/Users.jsx
import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import "./Users.css";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getUsers();
                setUsers(data || []);
            } catch (error) {
                console.error("Errore caricamento utenti:", error);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2>Caricamento utenti...</h2>;

    return (
        <div className="users-page">
            <h2>Utenti Registrati</h2>

            <table className="users-table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Indirizzo</th>
                        <th>Note</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((u, index) => (
                        <tr key={index}>
                            <td>{u.nome || "—"}</td>
                            <td>{u.telefono || "—"}</td>
                            <td>{u.indirizzo || "—"}</td>
                            <td>{u.note || "—"}</td>
                            <td>{u.email || "—"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
