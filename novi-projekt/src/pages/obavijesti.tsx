import axios from "axios";
import { useEffect, useState } from "react";

export function Obavijesti() {
    const [podatak, postaviPodatak] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/obavijesti")
            .then((res) => postaviPodatak(res.data));
    }, []);

    return (
        <div>
            <h1>Obavijesti</h1>
            <div>
                {podatak.map((podatak) => {
                    return (
                        <div key={podatak.id}>
                            <h3>{podatak.naslov}</h3>
                            <p>{podatak.datum}</p>
                            <p>{podatak.tekst}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
