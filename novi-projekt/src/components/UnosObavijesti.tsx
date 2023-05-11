import { useState } from "react";
import axios from "axios";

function UnosObavijesti(props) {
    const [formaPodaci, postaviPodatke] = useState({
        naslov: "",
        datum: "",
        tekst: "",
        vazno: "",
    });

    function obradiPodatke(objekt) {
        return {
            naslov: objekt.naslov,
            datum: objekt.datum,
            tekst: objekt.tekst,
            vazno: Boolean(objekt.vazno),
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
                    Naslov:
                    <input
                        type="text"
                        name="naslov"
                        value={formaPodaci.naslov}
                        onChange={promjenaUlaza}
                        required
                        maxLength="20"
                    />
                </label>
            </div>
            <div>
                <label>
                    Datum:
                    <input
                        type="date"
                        name="datum"
                        value={formaPodaci.datum}
                        onChange={promjenaUlaza}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Tekst:
                    <textarea
                        type="text"
                        name="tekst"
                        value={formaPodaci.tekst}
                        onChange={promjenaUlaza}
                        required
                        minLength="10"
                        maxLength="200"
                    ></textarea>
                </label>
            </div>
            <div>
                <label>
                    Važno:
                    <input
                        type="radio"
                        name="vazno"
                        checked={formaPodaci.vazno}
                        onChange={promjenaUlaza}
                    />
                </label>
            </div>
            <button type="submit">Nova obavijest</button>
        </form>
    );
}

export default UnosObavijesti;
