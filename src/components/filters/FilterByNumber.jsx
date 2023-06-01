import React, { useContext, useState } from 'react';
import Context from '../../context/Context';

function FilterByNumber() {
  const {
    setOriginalPlanets,
    filteredPlanets,
  } = useContext(Context);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  function filterByNumber(event) {
    event.preventDefault();
    const filter = filteredPlanets.filter((planet) => {
      switch (comparisonFilter) { // switch para evitar excessos de if
      case 'maior que':
        return Number(planet[columnFilter]) > Number(valueFilter);
      case 'menor que':
        return Number(planet[columnFilter]) < Number(valueFilter);
      case 'igual a':
        return Number(planet[columnFilter]) === Number(valueFilter);
      default:
        return planet;
      }
    });
    setOriginalPlanets(filter);
  }

  return (
    <form onSubmit={ filterByNumber }>
      <label htmlFor="columnFilter">
        <select
          data-testid="column-filter"
          name="columnFilter"
          id="columnFilter"
          value={ columnFilter }
          onChange={ ({ target }) => setColumnFilter(target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparisonFilter">
        <select
          data-testid="comparison-filter"
          name="comparisonFilter"
          id="comparisonFilter"
          value={ comparisonFilter }
          onChange={ ({ target }) => setComparisonFilter(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valueFilter">
        <input
          data-testid="value-filter"
          type="number"
          name="valueFilter"
          id="valueFilter"
          min="0"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        type="submit"
      >
        Filtrar
      </button>
    </form>
  );
}
export default FilterByNumber;
