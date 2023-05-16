import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

const Ad = (props) => {
    const { adminRole } = useContext(UserContext);

    const { podatak, postaviPodatak } = props;
    const [donations, setDonations] = useState({
        tražimo: [],
        nudiSe: [],
        donirano: [],
    });
    const [type, setType] = useState(""); // Tip donacije
    const [amount, setAmount] = useState(""); // Iznos donacije
    const [description, setDescription] = useState(""); // Opis donacije

    const [formaPodaci, postaviPodatke] = useState({
        kategorija: "",
        tip: "",
        vrijednost: "",
        opis: "",
    });

    const šaljiPodatke = (event) => {
        event.preventDefault();
        console.log(formaPodaci);

        const zaSlanje = obradiPodatke(formaPodaci);

        axios.post("http://localhost:3001/donacije", zaSlanje).then((rez) => {
            // Dodajte kod za ažuriranje stanja ili obavijest o uspješnom unosu
        });

        postaviPodatke({
            kategorija: "",
            tip: "",
            vrijednost: "",
            opis: "",
        });
    };

    function promjenaUlaza(event) {
        const { name, value } = event.target;
        postaviPodatke({ ...formaPodaci, [name]: value });
    }

    // Funkcija za dodavanje nove donacije u kategoriju "tražimo"
    const addDonation = () => {
        if (type && amount && description) {
            const newDonation = { type, amount, description };
            setDonations((prevState) => ({
                ...prevState,
                tražimo: [...prevState.tražimo, newDonation],
            }));
            postaviPodatak([...podatak, newDonation]);
            setType("");
            setAmount("");
            setDescription("");
        }
    };

    const addDonation1 = () => {
        if (type && amount && description) {
            const newDonation1 = { type, amount, description };
            setDonations((prevState) => ({
                ...prevState,
                nudiSe: [...prevState.nudiSe, newDonation1],
            }));
            postaviPodatak([...podatak, newDonation1]);
            setType("");
            setAmount("");
            setDescription("");
        }
    };

    // JSX za prikaz tablice "tražimo"
    const renderTražimoTable = () => {
        return (
            <table className="kartica">
                <thead>
                    <tr>
                        <th>Tip</th>
                        <th>Iznos</th>
                        <th>Opis</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {donations.tražimo.map((donation, index) => (
                        <tr key={index}>
                            <td>{donation.type}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.description}</td>
                            <td>
                                <button onClick={() => markAsDonated(index)}>
                                    Donirano
                                </button>
                                <button onClick={() => deleteDonation(index)}>
                                    Izbriši
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // JSX za prikaz tablice "nudi se"

    const renderNudiSeTable = () => {
        return (
            <table className="kartica">
                <thead>
                    <tr>
                        <th>Tip</th>
                        <th>Iznos</th>
                        <th>Opis</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {donations.nudiSe.map((donation, index) => (
                        <tr key={index}>
                            <td>{donation.type}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.description}</td>
                            <td>
                                <button onClick={() => acceptDonation(index)}>
                                    Prihvati
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // JSX za prikaz tablice

    // JSX za prikaz tablice "donirano"
    const renderDoniranoTable = () => {
        return (
            <table className="kartica">
                <thead>
                    <tr>
                        <th>Tip</th>
                        <th>Iznos</th>
                        <th>Opis</th>
                        <th>Akcije</th>
                    </tr>
                </thead>
                <tbody>
                    {donations.donirano.map((donation, index) => (
                        <tr key={index}>
                            <td>{donation.type}</td>
                            <td>{donation.amount}</td>
                            <td>{donation.description}</td>
                            <td>
                                <button onClick={() => deleteDonation1(index)}>
                                    Briši
                                </button>
                                <button onClick={() => repeatRequest(donation)}>
                                    Ponovi zahtjev
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    // Funkcija za označavanje donacije kao "donirano"
    const markAsDonated = (donationIndex) => {
        const updatedDonations = [...donations.tražimo];
        const donatedDonation = updatedDonations.splice(donationIndex, 1)[0];
        setDonations((prevState) => ({
            ...prevState,
            tražimo: updatedDonations,
            donirano: [...prevState.donirano, donatedDonation],
        }));
    };

    // Funkcija za brisanje donacije iz kategorije "tražimo"
    const deleteDonation = (donationIndex) => {
        const updatedDonations = [...donations.tražimo];
        updatedDonations.splice(donationIndex, 1);
        setDonations((prevState) => ({
            ...prevState,
            tražimo: updatedDonations,
        }));
    };

    // Funkcija za prihvaćanje donacija iz kategorije "nudi se"
    const acceptDonation = (donationIndex) => {
        const acceptedDonation = donations.nudiSe[donationIndex];
        setDonations((prevState) => ({
            ...prevState,
            nudiSe: prevState.nudiSe.filter(
                (_, index) => index !== donationIndex
            ),
            donirano: [...prevState.donirano, acceptedDonation],
        }));
    };

    // Funkcija za brisanje donacije iz kategorije "donirano"
    const deleteDonation1 = (donationIndex) => {
        const updatedDonations = [...donations.donirano];
        updatedDonations.splice(donationIndex, 1);
        setDonations((prevState) => ({
            ...prevState,
            donirano: updatedDonations,
        }));
    };

    // Funkcija za ponavljanje zahtjeva iz kategorije "donirano"
    const repeatRequest = (donation) => {
        setDonations((prevState) => ({
            ...prevState,
            tražimo: [...prevState.tražimo, donation],
        }));
    };

    return (
        <div>
            <h2>Donacije</h2>
            <h3>Tražimo</h3>
            {renderTražimoTable()}
            <div>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Odaberi tip</option>
                    <option value="hrana">Hrana</option>
                    <option value="ljekovi">Ljekovi</option>
                    <option value="igračke">Igračke</option>
                    <option value="vet">Veterinarski troškovi</option>
                    {/* Dodajte ostale tipove donacija prema potrebi */}
                </select>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Unesi iznos"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Unesi opis"
                />
                <button onClick={addDonation}>Nova donacija</button>
            </div>

            <h3>Nudi se</h3>
            {renderNudiSeTable()}
            <div>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Odaberi tip</option>
                    <option value="hrana">Hrana</option>
                    <option value="ljekovi">Ljekovi</option>
                    <option value="igračke">Igračke</option>
                    <option value="vet">Veterinarski troškovi</option>
                    {/* Dodajte ostale tipove donacija prema potrebi */}
                </select>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Unesi iznos"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Unesi opis"
                />
                <button onClick={addDonation1}>Nova donacija</button>
            </div>

            <h3>Donirano</h3>
            {renderDoniranoTable()}
        </div>
    );
};

export default Ad;
