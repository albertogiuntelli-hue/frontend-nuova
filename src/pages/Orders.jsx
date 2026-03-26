// frontend/src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/orders";
import "./Orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getOrders();
            setOrders(data);
            setLoading(false);
        };
        load();
    }, []);

    const handleStatusChange = async (index, newStatus) => {
        try {
            await updateOrderStatus(index, newStatus);

            // Aggiorna stato localmente senza ricaricare tutto
            const updated = [...orders];
            updated[index].stato = newStatus;
            setOrders(updated);

            alert("Stato aggiornato!");
        } catch (error) {
            alert("Errore aggiornamento stato ordine");
        }
    };

    if (loading) return <h2>Caricamento ordini...</h2>;

    return (
        <div className="orders-page">
            <h2>Ordini Ricevuti</h2>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefono</th>
                        <th>Indirizzo</th>
                        <th>Prodotti</th>
                        <th>Totale</th>
                        <th>Data</th>
                        <th>Stato</th>
                        <th>Azione</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.cliente}</td>
                            <td>{order.telefono}</td>
                            <td>{order.indirizzo}</td>
                            <td>
                                {order.prodotti.map((p, i) => (
                                    <div key={i}>
                                        {p.nome} x {p.quantita}
                                    </div>
                                ))}
                            </td>
                            <td>{order.totale} €</td>
                            <td>{new Date(order.data).toLocaleString()}</td>

                            {/* SELECT STATO */}
                            <td>
                                <select
                                    value={order.stato}
                                    onChange={(e) =>
                                        handleStatusChange(index, e.target.value)
                                    }
                                >
                                    <option value="in attesa">In attesa</option>
                                    <option value="in lavorazione">In lavorazione</option>
                                    <option value="evaso">Evaso</option>
                                    <option value="annullato">Annullato</option>
                                </select>
                            </td>

                            {/* BOTTONE AGGIORNA */}
                            <td>
                                <button
                                    onClick={() =>
                                        handleStatusChange(index, order.stato)
                                    }
                                >
                                    Aggiorna
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
