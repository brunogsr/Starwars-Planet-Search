import React, { useEffect, useState } from 'react';

function Table() {
  const [originalPlanets, setOriginalPlanets] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState('');

  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const dataWithoutResidents = data.results.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setOriginalPlanets(dataWithoutResidents);
        setPlanets(dataWithoutResidents);
      });
  }, []); // aula do course dia 1 useEffect

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterByName(value);
    const filteredPlanets = originalPlanets.filter((planet) => planet.name
      .toLowerCase().includes(value));
    setPlanets(filteredPlanets);
  };

  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Filtrar por nome"
        onChange={ handleChange }
        value={ filterByName }
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            planets.map((planet) => (
              <tr key={ planet.name }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
