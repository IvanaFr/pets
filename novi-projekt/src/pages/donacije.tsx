import axios from "axios";
import { useEffect, useState } from "react";

export function Donacije () {
  const [podatak, postaviPodatak] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/donacije")
      .then(res => postaviPodatak(res.data))      
  }, []);
      
    return (
      <div>
      <h1>Dohvat podataka</h1>
      <div>
        {podatak.map(podatak => {
          return (
            <div>
              <h3>{podatak.kategorija}</h3>
              <p>{podatak.opis}</p>
              <p>{podatak.tip}</p>
              <p>{podatak.vrijednost}</p>
            </div>
            )
        })}
              
      </div>
    </div>
    )
}