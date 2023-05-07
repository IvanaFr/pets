import data from "../data/data.json";
console.log(data.donacije);
import axios from "axios";
import { useState } from "react";

export function Donacije () {
  const [podatak, postaviPodatak] = useState({
    id: null,
    kategorija: "",
    opis: "",
    tip: "",
    vrijednost: null,
  });

  function dohvatiPodatke() {
    axios.get("./data/data.json")
      .then(res => postaviPodatak(res.data.donacije[0]))
      .catch(err => console.log(err));
  }
  
    
    return (
      <div>
      <h1>Dohvat podataka</h1>
      <button onClick={dohvatiPodatke}>Dohvati podatke</button>
      <div>
        <h3>{podatak.kategorija}</h3>
        <p>{podatak.opis}</p>
        <p>{podatak.tip}</p>
        <p>{podatak.vrijednost}</p>
      </div>
    </div>
    )
}