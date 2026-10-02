import UploadCSV from "../components/UploadCSV";

export default function CaricaCSV() {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Carica CSV</h1>

            {/* --- PRODOTTI DISATTIVATI TEMPORANEAMENTE --- */}
            {/*
            <h2>Prodotti</h2>
            <UploadCSV type="products" />

            <hr style={{ margin: "30px 0" }} />
            */}

            {/* --- PROMO ATTIVE --- */}
            <h2>Promo</h2>
            <UploadCSV type="promo" />
        </div>
    );
}
