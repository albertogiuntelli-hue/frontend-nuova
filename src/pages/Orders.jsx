// frontend/src/pages/Orders.jsx
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../api/orders";
import "./Orders.css";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getOrders();
                setOrders(data || []);
            } catch (err) {
                console.error("Errore caricamento ordini:", err);
            }
            setLoading(false);
        };
        load();
    }, []);

    const handleStatusChange = async (index, newStatus) => {
        try {
            await updateOrderStatus(index, newStatus);
            const updated = [...orders];
            updated[index].stato = newStatus;
            setOrders(updated);
            alert("Stato aggiornato!");
        } catch {
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
                        <th>Nome</th>
                        <th>Telefono</th>
                        <th>Indirizzo</th>
                        <th className="prodotti-col">Prodotti</th>
                        <th>Totale</th>
                        <th>Data</th>
                        <th>Stato</th>
                        <th>Azione</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{order.cliente?.nome || "—"}</td>
                            <td>{order.cliente?.telefono || "—"}</td>
                            <td>{order.cliente?.indirizzo || "—"}</td>

                            {/* 🔥 PRODOTTI IMPAGINATI E PARZIALI CORRETTI */}
                            <td className="prodotti-col">
                                {order.prodotti?.map((p, i) => {
                                    const qty =
                                        p.productType === "pezzi"
                                            ? `${p.quantity || 1} pz`
                                            : `${p.weight || 0} g`;

                                    const basePrice =
                                        p.prezzo_scontato > 0
                                            ? p.prezzo_scontato
                                            : p.prezzo;

                                    const multiplier =
                                        p.productType === "pezzi"
                                            ? (p.quantity || 1)
                                            : (p.weight || 0) / 1000;

                                    const prezzo = (basePrice * multiplier).toFixed(2);

                                    return (
                                        <div key={i} className="prodotto-riga">
                                            • {p.nome} — {qty} — €{prezzo}
                                        </div>
                                    );
                                })}
                            </td>

                            <td>{order.totale} €</td>
                            <td>{new Date(order.data).toLocaleString()}</td>

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
