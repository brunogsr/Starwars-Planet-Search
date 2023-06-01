import React, { useContext, useState } from 'react';
import Context from '../../context/Context';

function FilterByName() {
  const {
    setOriginalPlanets,
    filteredPlanets,
  } = useContext(Context);
  const [inputToFilterByName, setFilterByName] = useState('');

  const handleChange = ({ target }) => {
    const { value } = target;
    setFilterByName(value);
    const filteredPlanetsByName = filteredPlanets.filter((planet) => planet.name
      .toLowerCase().includes(value));
    setOriginalPlanets(filteredPlanetsByName);
  };
  return (
    <div>
      <input
        data-testid="name-filter"
        placeholder="Filtrar por nome"
        onChange={ handleChange }
        value={ inputToFilterByName }
      />
    </div>
  );
}

export default FilterByName;
