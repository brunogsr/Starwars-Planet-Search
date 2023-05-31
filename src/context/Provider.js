import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [OriginalPlanets, setOriginalPlanets] = useState([]);
  useEffect(() => {
    fetch('https://swapi.dev/api/planets')
      .then((response) => response.json())
      .then((data) => {
        const dataWithoutResidents = data.results.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setOriginalPlanets(dataWithoutResidents);
        setFilteredPlanets(dataWithoutResidents);
      });
  }, []);

  const value = {
    OriginalPlanets,
    setOriginalPlanets,
    filteredPlanets,
    setFilteredPlanets,
  };

  return (
    <Context.Provider value={ value }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
