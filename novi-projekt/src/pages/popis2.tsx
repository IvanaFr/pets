import axios from "axios";
import { useEffect, useState } from "react";
import Unos from "../components/Unos";
import logo from "../assets/logo.png";

export function Popis2() {
    const [podatak, postaviPodatak] = useState([]);
    const [vrsta, postaviVrstu] = useState("");
    const [udomljen, postaviUdomljen] = useState(false);
    const [pretraga, postaviPretragu] = useState("");

    useEffect(() => {
        let url = "http://localhost:3001/zivotinje";
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
            return false;
        }
    };

    return (
        <div>
            <Unos dodaj={postaviPodatak} />
            <h1>Popis Životinja</h1>
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
                <div className="kartice">
                    {podatak.filter(filtriraj).map((podatak) => {
                        return (
                            <div className="kartica" key={podatak.id}>
                                <div className="kartica1">
                                    <div className="kartica-slika">
                                        <img src={logo} alt={podatak.ime} />
                                    </div>
                                    <div className="kartica-info">
                                        <h3>Ime: {podatak.ime}</h3>
                                        <p>Vrsta: {podatak.vrsta}</p>
                                        <p>Godine: {podatak.godine}</p>
                                    </div>
                                    <p className="kartica-status">
                                        Status: {podatak.udomljen}
                                    </p>
                                </div>
                                <div className="kartica2">
                                    <div className="kartica-opis">
                                        <p>Opis: {podatak.opis}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
