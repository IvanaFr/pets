import { useState } from "react";
import axios from "axios";

function Unos(props) {
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        vrsta: "",
        godine: "",
        opis: "",
        pregled: "",
    });

    function obradiPodatke(objekt) {
        return {
            ime: objekt.ime,
            vrsta: objekt.vrsta,
            cip: Boolean(objekt.cip),
            godine: Number(objekt.godine),
            opis: objekt.opis,
            pregled: objekt.pregled,
            udomljen: Boolean(objekt.udomljen),
        };
    }

    const saljiPodatke = (event) => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci);

        axios.post("http://localhost:3001/zivotinje", zaSlanje).then((rez) => {
            props.dodaj((stanje) => [...stanje, rez.data]);
        });
    };
    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    return (
        <div className="kartica">
            <form onSubmit={saljiPodatke}>
                <p>Unos nove životinje</p>
                <div>
                    <label>
                        Ime:
                        <input
                            type="text"
                            name="ime"
                            value={formaPodaci.ime}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Vrsta:
                        <input
                            type="text"
                            name="vrsta"
                            value={formaPodaci.vrsta}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Čip:
                        <input
                            type="radio"
                            name="cip"
                            checked={formaPodaci.cip}
                            onChange={promjenaUlaza}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Godine:
                        <input
                            type="number"
                            name="godine"
                            value={formaPodaci.godine}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Opis:
                        <input
                            type="text"
                            name="opis"
                            value={formaPodaci.opis}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Pregled:
                        <input
                            type="text"
                            name="pregled"
                            value={formaPodaci.pregled}
                            onChange={promjenaUlaza}
                            required
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Udomljen:
                        <input
                            type="radio"
                            name="udomljen"
                            checked={formaPodaci.udomljen}
                            onChange={promjenaUlaza}
                        />
                    </label>
                </div>
                <button type="submit">Nova životinja</button>
            </form>
        </div>
    );
}

export default Unos;
