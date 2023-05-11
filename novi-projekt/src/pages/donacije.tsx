import axios from "axios";
import { useEffect, useState } from "react";
import UnosDonacije from "../components/UnosDonacije";

export function Donacije() {
    const [podatak, postaviPodatak] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/donacije")
            .then((res) => postaviPodatak(res.data));
    }, []);

    return (
        <div>
            <UnosDonacije dodaj={postaviPodatak} />
            <h1>Donacije</h1>
            <div>
                {podatak.map((podatak) => {
                    return (
                        <div key={podatak.id}>
                            <h3>{podatak.kategorija}</h3>
                            <p>{podatak.opis}</p>
                            <p>{podatak.tip}</p>
                            <p>{podatak.vrijednost}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
