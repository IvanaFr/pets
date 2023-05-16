import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

function UnosDonacije(props) {
    const { adminRole } = useContext(UserContext);

    const [formaPodaci, postaviPodatke] = useState({
        kategorija: "",
        tip: "",
        vrijednost: "",
        opis: "",
    });

    function obradiPodatke(objekt) {
        return {
            kategorija: objekt.kategorija,
            tip: objekt.tip,
            vrijednost: objekt.vrijednost,
            opis: objekt.opis,
        };
    }

    const saljiPodatke = (event) => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci);

        axios.post("http://localhost:3001/donacije", zaSlanje).then((rez) => {
            props.dodaj((stanje) => [...stanje, rez.data]);
        });
    };
    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    return (
        <form onSubmit={saljiPodatke}>
            <p>Unos donacija</p>
            <div>
                <label>
                    Kategorija:
                    <select
                        name="kategorija"
                        value={formaPodaci.kategorija}
                        onChange={promjenaUlaza}
                        required
                    >
                        <option value="">Odaberite kategoriju</option>
                        <option value="tražimo">Tražimo</option>
                        <option value="nudi se">Nudi se</option>
                        <option value="donirano">Donirano</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Tip:
                    <select
                        name="tip"
                        value={formaPodaci.tip}
                        onChange={promjenaUlaza}
                        required
                    >
                        <option value="">Tip donacije</option>
                        <option value="hrana">Hrana</option>
                        <option value="ljekovi">Ljekovi</option>
                        <option value="igračke">Igračkee</option>
                        <option value="troškov">Vet. troškovi</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Vrijednost:
                    <input
                        type="text"
                        name="vrijednost"
                        value={formaPodaci.vrijednost}
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
                    />
                </label>
            </div>
            <button type="submit">Nova donacija</button>
        </form>
    );
}

export default UnosDonacije;
