import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import testData from '../../cypress/mocks/testData';

describe('Testando StarWars Planets', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
  global.fetch.mockResolvedValue({
    json: jest.fn().mockResolvedValue(testData),
  });
});
  afterEach(jest.restoreAllMocks)

  it('Testa se os inputs e selects estão na tela e se o name input funciona corretamente', async () => {
    render(<App />);
    const nameInput = screen.getByTestId('name-filter');
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByTestId('button-filter');

    expect(nameInput).toBeInTheDocument();
    expect(columnSelect).toBeInTheDocument();
    expect(comparisonSelect).toBeInTheDocument();
    expect(valueInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();

    const endor = await screen.findByText(/endor/i)
    const tatooine = await screen.findByText(/tatooine/i)

    act(() =>  userEvent.type(nameInput, 'tatooine'));
    // const teste = screen.getAllByRole('row')
    // console.log(teste.innerHTML);
    
    await waitFor(() => {
      expect(endor).not.toBeInTheDocument();
      expect(tatooine).toBeInTheDocument();

    });
  });

  it('Verifica se aparece apenas um planeta ao aplicar o filtro', async () => {
    render(
    <App />
    );
    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', {name: /filtrar/i});
    const tatooine = await screen.findByText(/tatooine/i)
    const endor = await screen.findByText(/endor/i)
    const coruscant = await screen.findByText(/coruscant/i)

    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'menor que'); 
    // console.log(comparisonSelect.value)
    userEvent.type(valueInput, '1000000000'); 
    act(() =>  userEvent.click(filterButton));
    await waitFor(() => {
      const planetNames = screen.queryAllByTestId('planet-name');
      expect(columnSelect).toHaveValue('orbital_period');
      expect(planetNames).toHaveLength(4);
      expect(tatooine).toBeInTheDocument()
      expect(endor).toBeInTheDocument()
      expect(coruscant).not.toBeInTheDocument()
    });

    userEvent.selectOptions(columnSelect, 'diameter');
    userEvent.selectOptions(comparisonSelect, 'maior que'); 
    // console.log(comparisonSelect.value)
    userEvent.clear(valueInput)
    userEvent.type(valueInput, '10200'); 
    act(() =>  userEvent.click(filterButton));

    await waitFor(() => {
      const planetNames = screen.queryAllByTestId('planet-name');
      expect(planetNames).toHaveLength(2);
      expect(tatooine).toBeInTheDocument()
      expect(endor).not.toBeInTheDocument()
      expect(coruscant).not.toBeInTheDocument()
    });

    userEvent.selectOptions(comparisonSelect, 'igual a'); 
    // console.log(comparisonSelect.value)
    userEvent.clear(valueInput)
    userEvent.type(valueInput, '23'); 
    act(() =>  userEvent.click(filterButton));

    await waitFor(() => {
      const planetNames = screen.queryAllByTestId('planet-name');
      expect(columnSelect).toHaveValue('surface_water');
      expect(planetNames).toHaveLength(1);
      expect(tatooine).toBeInTheDocument()
      expect(endor).not.toBeInTheDocument()
      expect(coruscant).not.toBeInTheDocument()
    });
    // await new Promise(resolve => setTimeout(resolve, 2000)); // pequeno atraso
    // const planetNames = screen.queryAllByTestId('planet-name');
    // expect(planetNames).toHaveLength(1); // faça a asserção novamente
    // userEvent.selectOptions(columnSelect, 'diameter');
    // userEvent.selectOptions(comparisonSelect, 'igual a');
    // userEvent.type(valueInput, '4900');
    // userEvent.click(filterButton);
    // await waitFor(() => {
    //     expect(screen.getByRole('cell', { name: 'Endor' })).toBeInTheDocument();
    //     expect(screen.getByRole('cell', { name: '30000000' })).toBeInTheDocument();
    //     expect(screen.getByRole('cell', { name: '4900' })).toBeInTheDocument();
    //     expect(screen.getByRole('cell', { name: 'temperate' })).toBeInTheDocument();
    //     const planetNames = screen.queryAllByTestId('planet-name');
    //   expect(planetNames).toHaveLength(4);
    //   });
    });
    it('Verifica se os filtros de "menor que", "igual a" e "maior que" funcionam corretamente', async () => {
      await act(() => render(
        <PlanetsProvider>
          <App />
        </PlanetsProvider>
      ));
      const planetName = screen.queryAllByTestId('planet-name');

      const columnSelect = screen.getByTestId('column-filter')
      const comparisonSelect = screen.getByTestId('comparison-filter')
      const numberInput = screen.getByRole('spinbutton');
      const filterButton = screen.getByRole('button', {  name: /filtrar/i})
  
      userEvent.selectOptions(columnSelect, 'surface_water');
      userEvent.selectOptions(comparisonSelect, 'menor que');
      userEvent.type(numberInput, '40');
      userEvent.click(filterButton);
  
      expect(await screen.findAllByRole('row')).toHaveLength(7);
      userEvent.clear(numberInput);
  
      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'igual a');
      userEvent.type(numberInput, '1000');
      userEvent.click(filterButton);
  
      expect(await screen.findAllByRole('row')).toHaveLength(2);
      userEvent.clear(numberInput);
  
      userEvent.selectOptions(columnSelect, 'diameter');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(numberInput, '12500');
      userEvent.click(filterButton);
  
      expect(await screen.findAllByRole('row')).toHaveLength(1);

      const buttonRemoveAllFilters = screen.getByTestId('button-remove-filters');
      const buttonFilter = await screen.findAllByTestId('button-filter');
  
    //   userEvent.click(buttonFilter);
    //   userEvent.click(buttonFilter);
      act(() =>  userEvent.click(buttonFilter));
  
      expect(screen.getAllByTestId('filter')).toHaveLength(5);
      expect(planetName).toHaveLength(10);

    
      userEvent.click(buttonRemoveAllFilters);
      expect(screen.queryAllByTestId('filter')).toHaveLength(0);
      expect(planetName).toHaveLength(10);

    });
  });
  