import axios from "axios";
import { useEffect, useState } from "react";
import Unos from "../components/Unos";

export function Popis1() {
    const [podatak, postaviPodatak] = useState([]);
    const [vrsta, postaviVrstu] = useState("");
    const [udomljen, postaviUdomljen] = useState(false);
    const [pretraga, postaviPretragu] = useState("");

    useEffect(() => {
        let url = "http://localhost:3001/zivotinje/";
        if (vrsta !== "") {
            url += `?vrsta=${vrsta}`;
        }
        if (udomljen !== null) {
            const status = udomljen ? "udomljen" : "nijeudomljen";
            url += `${vrsta === "" ? "?" : "&"}status=${status}`;
        }

        axios.get(url).then((res) => postaviPodatak(res.data));
    }, [vrsta, udomljen]);

    const filtriraj = (podatak) => {
        if (
            podatak.ime.toLowerCase().includes(pretraga.toLowerCase()) ||
            podatak.vrsta.toLowerCase().includes(pretraga.toLowerCase())
        ) {
            return true;
        }
        {
            if (udomljen !== null) {
                if (udomljen && !podatak.udomljen) {
                    return false; // životinja nije udomljena, a tražimo samo udomljene
                } else if (!udomljen && podatak.udomljen) {
                    return false; // životinja je udomljena, a tražimo neudomljene
                }
            }
            return true;
        }
    };
    const udomiZivotinju = (id) => {
        axios
            .put(`http://localhost:3001/zivotinje/${id}`, {
                ...podatak.find((zivotinja) => zivotinja.id === id),
                udomljen: true,
            })
            .then(() => {
                // ažuriraj popis životinja
                const novaLista = [...podatak];
                const index = novaLista.findIndex(
                    (zivotinja) => zivotinja.id === id
                );
                novaLista[index].udomljen = true;
                postaviPodatak(novaLista);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h1>Popis</h1>
            <div>
                <label>Vrsta:</label>
                <select
                    id="vrsta"
                    onChange={(e) => postaviVrstu(e.target.value)}
                >
                    <option value="">Odaberi vrstu</option>
                    <option value="pas">Pas</option>
                    <option value="mačka">Mačka</option>
                </select>
                <label>Udomljena:</label>
                <select
                    id="udomljen"
                    value={udomljen}
                    onChange={(e) => {
                        console.log("New value of udomljena:", e.target.value);
                        postaviUdomljen(e.target.value);
                    }}
                >
                    <option value="">Odaberi</option>
                    <option value="true">Udomljen</option>
                    <option value="false">Nije udomljen</option>
                </select>
                <label>Pretraga:</label>
                <input
                    id="pretraga"
                    type="text"
                    value={pretraga}
                    onChange={(e) => postaviPretragu(e.target.value)}
                />
                {podatak.filter(filtriraj).map((podatak) => {
                    return (
                        <div key={podatak.id}>
                            <h3>{podatak.ime}</h3>
                            <p>{podatak.vrsta}</p>
                            <p>{podatak.godine}</p>
                            <p>{podatak.opis}</p>
                            <p>{podatak.pregled}</p>
                        </div>
                    );
                })}
            </div>
            <button onClick={() => udomiZivotinju(podatak.id)}>Udomi</button>
        </div>
    );
}
