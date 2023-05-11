import axios from "axios";
import { useEffect, useState } from "react";
import UnosObavijesti from "../components/UnosObavijesti";

export function Obavijesti() {
    const [podaci, postaviPodatke] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/obavijesti").then((res) => {
            const sortiraniPodaci = res.data.sort(
                (a, b) => new Date(b.datum) - new Date(a.datum)
            );
            postaviPodatke(sortiraniPodaci);
        });
    }, []);

    const handleBrisanje = (id) => {
        axios.delete(`http://localhost:3001/obavijesti/${id}`).then(() => {
            const noviPodaci = podaci.filter((podatak) => podatak.id !== id);
            postaviPodatke(noviPodaci);
        });
    };

    return (
        <div>
            <UnosObavijesti dodaj={postaviPodatke} />
            <h1>Obavijesti</h1>
            <div>
                {podaci.map((podatak) => {
                    return (
                        <div
                            className={`obavijesti ${
                                podatak.vazno ? "vazno" : ""
                            }`}
                            key={podatak.id}
                        >
                            <h3>{podatak.naslov}</h3>
                            <p>{podatak.datum}</p>
                            <p>{podatak.tekst}</p>
                            {podatak.vazno && <p className="vazno">VAŽNO</p>}
                            <button onClick={() => handleBrisanje(podatak.id)}>
                                Obriši
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
