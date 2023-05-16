import axios from "axios";
import { useEffect, useState, useContext } from "react";
import UnosDonacije from "../components/UnosDonacije";
import { UserContext } from "../context/UserContext";
import Ad from "../components/Ad";

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

    const handleDonirano = (id) => {
        axios
            .put(`http://localhost:3001/donacije/${id}`, {
                donirano: true,
            })
            .then((res) => {
                const index = podatak.findIndex((d) => d.id === id);
                if (index !== -1) {
                    const noviPodaci = [...podatak];
                    noviPodaci[index].donirano = true;
                    postaviPodatak(noviPodaci);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleBrisanje = (id) => {
        axios
            .delete(`http://localhost:3001/donacije/${id}`)
            .then((res) => {
                const noviPodaci = podatak.filter((d) => d.id !== id);
                postaviPodatak(noviPodaci);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            {adminRole ? (
                <Ad dodaj={postaviPodatak} />
            ) : (
                <>
                    <h1>Donacije</h1>

                    <ul>
                        {podatak.map((podatak) => {
                            return (
                                <li key={podatak.id}>
                                    <h3>Kategorija {podatak.kategorija}</h3>
                                    <p>Opis {podatak.opis}</p>
                                    <p>Tip {podatak.tip}</p>
                                    <p>Vrijednost {podatak.vrijednost}</p>
                                    {adminRole && !podatak.donirano && (
                                        <button
                                            onClick={() =>
                                                handleDonirano(podatak.id)
                                            }
                                        >
                                            Označi kao donirano
                                        </button>
                                    )}
                                    {adminRole && (
                                        <button
                                            onClick={() =>
                                                handleBrisanje(podatak.id)
                                            }
                                        >
                                            Izbriši
                                        </button>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </>
            )}
        </div>
    );
}
