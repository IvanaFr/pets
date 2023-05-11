import axios from "axios";
import { useEffect, useState } from "react";
import UnosObavijesti from "../components/UnosObavijesti";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function Obavijesti() {
    const { userRole } = useContext(UserContext);

    const [podaci, postaviPodatke] = useState([]);
    const [showUnosObavijesti, setShowUnosObavijesti] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:3001/obavijesti").then((res) => {
            const sortiraniPodaci = res.data.sort(
                (a, b) => new Date(b.datum) - new Date(a.datum)
            );
            postaviPodatke(sortiraniPodaci);
        });
    }, []);

    const handleClick = () => {
        setShowUnosObavijesti(true);
    };

    const handlePromjenaOznake = (id, vazno) => {
        if (userRole === "admin") {
            axios
                .patch(`http://localhost:3001/obavijesti/${id}`, {
                    vazno: !vazno,
                })
                .then(() => {
                    const noviPodaci = podaci.map((podatak) => {
                        if (podatak.id === id) {
                            podatak.vazno = !vazno;
                        }
                        return podatak;
                    });
                    postaviPodatke(noviPodaci);
                });
        }
    };

    const handleBrisanje = (id) => {
        if (userRole === "admin") {
            axios.delete(`http://localhost:3001/obavijesti/${id}`).then(() => {
                const noviPodaci = podaci.filter(
                    (podatak) => podatak.id !== id
                );
                postaviPodatke(noviPodaci);
            });
        }
    };

    return (
        <div>
            <button onClick={handleClick}>Nova obavijest</button>
            {showUnosObavijesti && <UnosObavijesti dodaj={postaviPodatke} />}
            <h1>Obavijesti</h1>
            <div>
                {podaci.map((podatak) => {
                    return (
                        <div
                            className={`obavijesti ${
                                podatak.vazno ? "vazno" : ""
                            }`}
                            key={podatak.id}
                        >
                            <h3>{podatak.naslov}</h3>
                            <p>{podatak.datum}</p>
                            <p>{podatak.tekst}</p>
                            {podatak.vazno && <p className="vazno">VAŽNO</p>}
                            <button
                                onClick={() =>
                                    handlePromjenaOznake(
                                        podatak.id,
                                        podatak.vazno
                                    )
                                }
                            >
                                {podatak.vazno
                                    ? "Makni oznaku"
                                    : "Označi kao važno"}
                            </button>
                            <button onClick={() => handleBrisanje(podatak.id)}>
                                Obriši
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
