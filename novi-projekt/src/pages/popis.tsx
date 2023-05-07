import axios from "axios";
import { useEffect, useState } from "react";

export function Popis () {
  const [podatak, postaviPodatak] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/zivotinje")
      .then(res => postaviPodatak(res.data))      
  }, []);
      
    return (
      <div>
      <h1>Dohvat podataka</h1>
      <div>
        {podatak.map(podatak => {
          return (
            <div>
              <h3>{podatak.ime}</h3>
              <p>{podatak.vrsta}</p>
              <p>{podatak.godine}</p>
              <p>{podatak.opis}</p>
              <p>{podatak.pregled}</p>
            </div>
            )
        })}
              
      </div>
    </div>
    )
}

