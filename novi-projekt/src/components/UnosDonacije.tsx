import { useState } from "react";
import axios from "axios";

function UnosDonacije(props) {
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
                    <input
                        type="text"
                        name="kategorija"
                        value={formaPodaci.kategorija}
                        onChange={promjenaUlaza}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tip:
                    <input
                        type="text"
                        name="tip"
                        value={formaPodaci.tip}
                        onChange={promjenaUlaza}
                        required
                    />
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
                        required
                    />
                </label>
            </div>
            <button type="submit">Nova donacija</button>
        </form>
    );
}

export default UnosDonacije;
