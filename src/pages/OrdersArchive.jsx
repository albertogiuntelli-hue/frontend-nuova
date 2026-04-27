import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Orders.css";

export default function OrdersArchive() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await api.get("/orders/archive");
                setOrders(res.data || []);
            } catch (err) {
                console.error("Errore caricamento archivio:", err);
            }
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <h2>Caricamento archivio...</h2>;

    return (
        <div className="orders-page">
            <h2>Archivio Ordini Evasi</h2>

            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Telefono</th>
                        <th>Indirizzo</th>
                        <th className="prodotti-col">Prodotti</th>
                        <th>Totale</th>
                        <th>Data</th>
                        <th>Stato</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>
                                {order.cliente?.nome || "—"}{" "}
                                {order.cliente?.cognome || ""}
                            </td>

                            <td>{order.cliente?.telefono || "—"}</td>
                            <td>{order.cliente?.indirizzo || "—"}</td>

                            <td className="prodotti-col">
                                {order.prodotti?.map((p, i) => {
                                    const isPeso = p.tipo === "S";

                                    const qty = isPeso
                                        ? `${p.peso} g`
                                        : `${p.quantita} pz`;

                                    const prezzoUnit =
                                        p.prezzo_scontato > 0
                                            ? p.prezzo_scontato
                                            : p.prezzo;

                                    const subtotal = isPeso
                                        ? (p.peso / 1000) * (prezzoUnit / 100)
                                        : p.quantita * (prezzoUnit / 100);

                                    return (
                                        <div key={i} className="prodotto-riga">
                                            <div className="prodotto-nome">
                                                {p.nome}
                                            </div>
                                            <div className="prodotto-info">
                                                <span>{qty}</span>
                                                <span>€ {subtotal.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </td>

                            <td className="totale-col">
                                € {(order.totale / 100).toFixed(2)}
                            </td>

                            <td className="data-col">
                                {new Date(order.createdAt).toLocaleDateString("it-IT")}{" "}
                                –{" "}
                                {new Date(order.createdAt).toLocaleTimeString("it-IT", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </td>

                            <td>
                                <span className="badge badge-evaso">Evaso</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
