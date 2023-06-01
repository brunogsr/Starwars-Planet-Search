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
  const [selectedFilters, setSelectedFilters] = useState([]);

  function filterByNumber(event) {
    event.preventDefault();
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };

    const filters = [...selectedFilters, newFilter];
    setSelectedFilters(filters);

    const allFilltersApplied = filteredPlanets.filter((planet) => filters
      .every((allFilters) => {
        switch (allFilters.comparison) {
        case 'maior que':
          return Number(planet[allFilters.column]) > Number(allFilters.value);
        case 'menor que':
          return Number(planet[allFilters.column]) < Number(allFilters.value);
        case 'igual a':
          return Number(planet[allFilters.column]) === Number(allFilters.value);
        default:
          return true;
        }
      }));
    setOriginalPlanets(allFilltersApplied);
  }

  return (
    <div>

      <form>
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
          onClick={ filterByNumber }
        >
          Filtrar
        </button>
      </form>
      <p>
        Filtros utilizados:
        {selectedFilters.map((filters, index) => (
          <span key={ index } data-testid="teste">
            {` ${filters.column} ${filters.comparison} ${filters.value} `}
          </span>))}
      </p>
    </div>
  );
}
export default FilterByNumber;
