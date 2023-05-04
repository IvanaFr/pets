

import React, { useState, useEffect } from "react";
import axios from "axios";

export function Popis () {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Dohvaćanje podataka o životinjama
  useEffect(() => {
    axios.get("/api/animals").then((response) => {
      setAnimals(response.data);
      setFilteredAnimals(response.data);
    });
  }, []);

  // Filtriranje životinja
  const handleFilter = (event) => {
    const { name, value } = event.target;
    setSearch(value);
    const filtered = animals.filter(
      (animal) =>
        animal.type.toLowerCase().includes(value.toLowerCase()) ||
        animal.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredAnimals(filtered);
  };

  // Udomljavanje životinje
  const handleAdopt = (id) => {
    axios.put(`/api/animals/${id}`, { adopted: true }).then(() => {
      const updatedAnimals = animals.map((animal) =>
        animal.id === id ? { ...animal, adopted: true } : animal
      );
      setAnimals(updatedAnimals);
      setFilteredAnimals(updatedAnimals);
    });
  };

  // Uređivanje životinje
  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
  };

  // Ažuriranje životinje
  const handleUpdate = (id, updatedAnimal) => {
    axios.put(`/api/animals/${id}`, updatedAnimal).then(() => {
      const updatedAnimals = animals.map((animal) =>
        animal.id === id ? updatedAnimal : animal
      );
      setAnimals(updatedAnimals);
      setFilteredAnimals(updatedAnimals);
      setSelectedAnimal(null);
    });
  };

  return (
    <div>
      <h1>Animal Shelter</h1>
      <label>
        Filter by type or name:
        <input type="text" name="search" value={search} onChange={handleFilter} />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Status</th>
            {isAdmin && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredAnimals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.type}</td>
              <td>{animal.description}</td>
              <td>{animal.adopted ? "Adopted" : "Available"}</td>
              {isAdmin && (
                <td>
                  <button onClick={() => handleEdit(animal)}>Edit</button>
                  {!animal.adopted && (
                    <button onClick={() => handleAdopt(animal.id)}>Adopt</button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedAnimal && (
        <EditAnimal animal={selectedAnimal} onUpdate={handleUpdate} onCancel={() => setSelectedAnimal(null)} />
      )}
    </div>
  );
};

