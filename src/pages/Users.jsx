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
                setUsers(data);
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
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Registrato il</th>
                    </tr>
                </thead>

                <tbody>
                    {users
                        .filter(u =>
                            u.id &&
                            u.id.toLowerCase() !== "id" &&
                            u.nome?.toLowerCase() !== "nome" &&
                            u.email?.toLowerCase() !== "email"
                        )
                        .map((u, index) => (
                            <tr key={index}>
                                <td>{u.id || "—"}</td>
                                <td>{u.nome || "—"}</td>
                                <td>{u.email || "—"}</td>
                                <td>{u.telefono || "—"}</td>
                                <td>{u.data_registrazione || "—"}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
