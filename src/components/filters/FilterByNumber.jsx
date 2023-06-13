import React, { useContext, useState } from 'react';
import Context from '../../context/Context';

function FilterByNumber() {
  const {
    setOriginalPlanets,
    filteredPlanets,
  } = useContext(Context);
  const [columnOptions, setColumnOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [comparisonFilter, setComparisonFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState([]);

  function filterPlanetsByInputs(filters) {
    const allFilltersApplied = filteredPlanets.filter((planet) => filters // 3 - filtra
      .every((allFilters) => {
        switch (allFilters.comparison) {
        case 'maior que':
          return Number(planet[allFilters.column]) > Number(allFilters.value);
        case 'menor que':
          return Number(planet[allFilters.column]) < Number(allFilters.value);
        default:
          return Number(planet[allFilters.column]) === Number(allFilters.value);
        }
      }));
    setOriginalPlanets(allFilltersApplied);
  }

  function filterByNumber() {
    const newFilter = {
      column: columnFilter,
      comparison: comparisonFilter,
      value: valueFilter,
    };
    const filters = [...selectedFilters, newFilter]; // 1 - seta filtros ativos
    const selectedFiltersColumns = filters.map((filtered) => filtered.column);

    setColumnOptions((prev) => prev.filter((column) => !selectedFiltersColumns // 2 - remove ultimo filtro usado
      .includes(column)));

    setSelectedFilters(filters);
    filterPlanetsByInputs(filters);
    setColumnFilter(columnOptions[columnOptions.indexOf(columnFilter) + 1] // 4 - seleciona proximo filtro
       || columnOptions[0]);
  }

  function handleDeleteFilter(filterColumn) {
    const currentFilters = selectedFilters // 1 - remover um filtro dos selecionados
      .filter((prevFilter) => prevFilter.column !== filterColumn);

    setSelectedFilters(currentFilters);

    setColumnOptions((prev) => ([...prev, filterColumn])); // 2 - retorna o filtro para ser selecionado

    filterPlanetsByInputs(currentFilters); // 3 - filtrar com a nova quantidade de filtros
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
            {columnOptions
              .map((option, index) => (
                <option key={ index } value={ option }>{option}</option>
              ))}
            {/* <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option> */}
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
          type="button"
          onClick={ filterByNumber }
        >
          Filtrar
        </button>
      </form>
      <p>
        Filtros utilizados:
        {selectedFilters.map((filters, index) => (
          <span key={ index } data-testid="filter">
            <br />
            {` ${filters.column} ${filters.comparison} ${filters.value} `}
            <button
              type="button"
              onClick={ () => handleDeleteFilter(filters.column) }
            >
              X
            </button>

          </span>))}
        <span>
          <br />

          <button
            data-testid="button-remove-filters"
            type="button"
            onClick={ () => {
              setOriginalPlanets(filteredPlanets);
              setColumnOptions([
                'population',
                'orbital_period',
                'diameter',
                'rotation_period',
                'surface_water',
              ]);
              setColumnFilter('population');
              setComparisonFilter('maior que');
              setValueFilter(0);
              setSelectedFilters([]);
            } }
          >
            Remover todas filtragens
          </button>
        </span>
      </p>
    </div>
  );
}
export default FilterByNumber;
