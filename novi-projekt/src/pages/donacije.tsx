import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UnosDonacije from "../components/UnosDonacije";
import { UserContext } from "../context/UserContext";

export function Donacije() {
    const [podatak, postaviPodatak] = useState([]);
    const [showUnos, setShowUnos] = useState(false);

    const { adminRole } = useContext(UserContext);

    useEffect(() => {
        axios
            .get("http://localhost:3001/donacije")
            .then((res) => postaviPodatak(res.data));
    }, []);

    const handleClick = () => {
        setShowUnos(true);
    };

    return (
        <div>
            <h1>Donacije</h1>
            <button onClick={handleClick}>Nova donacija</button>
            {showUnos && <UnosDonacije dodaj={postaviPodatak} />}

            <div>
                {podatak.map((podatak) => {
                    return (
                        <div key={podatak.id}>
                            <h3>Kategorija {podatak.kategorija}</h3>
                            <p>Opis {podatak.opis}</p>
                            <p>Tip {podatak.tip}</p>
                            <p>Vrijednost {podatak.vrijednost}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
