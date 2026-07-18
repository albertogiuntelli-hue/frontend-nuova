import { useEffect, useState } from "react";
import api from "../api/api";
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

    const getOrderDate = (order) => {
        const raw =
            order.createdAt || // ordini nuovi
            order.data ||      // ordini vecchi
            null;

        if (!raw) return "—";

        const d = new Date(raw);
        if (isNaN(d.getTime())) return "—";

        return (
            d.toLocaleDateString("it-IT") +
            " – " +
            d.toLocaleTimeString("it-IT", {
                hour: "2-digit",
                minute: "2-digit",
            })
        );
    };

    // 🔵 STAMPA ORDINE ARCHIVIATO
    const stampaOrdine = (order) => {
        const logoUrl = "/logo.jpg";

        const prodottiHtml = order.prodotti
            .map((p) => {
                const isPeso = p.tipo === "S";
                const qty = isPeso ? `${p.peso} g` : `${p.quantita} pz`;

                const prezzoUnit =
                    p.prezzo_scontato > 0 ? p.prezzo_scontato : p.prezzo;

                const subtotal = isPeso
                    ? (p.peso / 1000) * prezzoUnit
                    : p.quantita * prezzoUnit;

                return `
                    <tr>
                        <td>${p.nome}</td>
                        <td>${qty}</td>
                        <td>€ ${prezzoUnit.toFixed(2)}</td>
                        <td>€ ${subtotal.toFixed(2)}</td>
                    </tr>
                `;
            })
            .join("");

        const html = `
            <html>
            <head>
                <title>Stampa Ordine</title>
                <style>
                    body { font-family: Arial; padding: 20px; }
                    h2 { text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                    .logo { width: 180px; display: block; margin: 0 auto 20px auto; }
                </style>
            </head>
            <body>
                <img src="${logoUrl}" class="logo" />
                <h2>Conferma Ordine</h2>

                <p><strong>Cliente:</strong> ${order.cliente?.nome || ""} ${order.cliente?.cognome || ""}</p>
                <p><strong>Telefono:</strong> ${order.cliente?.telefono || ""}</p>
                <p><strong>Indirizzo:</strong> ${order.cliente?.indirizzo || ""}</p>

                <table>
                    <thead>
                        <tr>
                            <th>Prodotto</th>
                            <th>Q.tà</th>
                            <th>Prezzo</th>
                            <th>Subtotale</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${prodottiHtml}
                    </tbody>
                </table>

                <h3 style="text-align:right; margin-top:20px;">
                    Totale: € ${(order.totale / 100).toFixed(2)}
                </h3>

                <p style="margin-top:40px; text-align:center;">
                    Grazie per aver ordinato da PlusMarket Giuntelli!
                </p>
            </body>
            </html>
        `;

        const win = window.open("", "_blank");
        win.document.write(html);
        win.document.close();
        win.print();
    };

    // 🔵 INVIO WHATSAPP
    const inviaWhatsApp = (order) => {
        const telefono = order.cliente?.telefono;
        if (!telefono) {
            alert("Telefono cliente mancante");
            return;
        }

        const prodottiMsg = order.prodotti
            .map((p) => {
                const isPeso = p.tipo === "S";
                const qty = isPeso ? `${p.peso} g` : `${p.quantita} pz`;
                const prezzoUnit = p.prezzo_scontato > 0 ? p.prezzo_scontato : p.prezzo;
                const subtotal = isPeso
                    ? (p.peso / 1000) * prezzoUnit
                    : p.quantita * prezzoUnit;

                return `• ${p.nome} — ${qty} — € ${subtotal.toFixed(2)}`;
            })
            .join("%0A");

        const totaleMsg = (order.totale / 100).toFixed(2);

        const msg =
            `Conferma ordine PlusMarket:%0A%0A` +
            `${prodottiMsg}%0A%0A` +
            `Totale: € ${totaleMsg}%0A%0A` +
            `Grazie per aver ordinato!`;

        const url = `https://wa.me/${telefono}?text=${msg}`;
        window.open(url, "_blank");
    };

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
                        <th>Azione</th>
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
                                        ? (p.peso / 1000) * prezzoUnit
                                        : p.quantita * prezzoUnit;

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

                            <td className="data-col">{getOrderDate(order)}</td>

                            <td>
                                <span
                                    className={`badge badge-${order.stato?.replace(
                                        " ",
                                        "-"
                                    )}`}
                                >
                                    {order.stato || "evaso"}
                                </span>
                            </td>

                            <td>
                                <button
                                    className="print-btn"
                                    onClick={() => stampaOrdine(order)}
                                >
                                    Stampa
                                </button>

                                <button
                                    className="whatsapp-btn"
                                    onClick={() => inviaWhatsApp(order)}
                                >
                                    WhatsApp
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
