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

  function filterByNumber(event) {
    event.preventDefault();
    setColumnOptions((prev) => prev.filter((column) => column !== columnFilter));
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
        default:
          return Number(planet[allFilters.column]) === Number(allFilters.value);
        }
      }));
    setOriginalPlanets(allFilltersApplied);
    setColumnFilter(columnOptions[columnOptions.indexOf(columnFilter) + 1] // seleciona o próximo índice visualmente após apagar o índice anterior
    || columnOptions[0]); // para evitar undefined, retornará ao índice 0, caso tente ir ao índice 5 (que não existe, pois vai até o índice 4)

    // const columnOfTheFilters = selectedFilters;
    // console.log(selectedFilters);
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
          type="submit"
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
              data-testid="button-remove-filters"
              type="button"
              // onClick={ handleFilterRemove }
            >
              Remover Filtro Selecionado
            </button>

          </span>))}
      </p>
    </div>
  );
}
export default FilterByNumber;
