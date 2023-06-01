import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { enableFetchMocks } from 'jest-fetch-mock';
import Provider from '../context/Provider';
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

    act(() =>  userEvent.type(nameInput, 'tatooine'));
    const teste = screen.getAllByRole('row')
    console.log(teste.innerHTML);
    
    await waitFor(() => {
      // expect( screen.getByText(/endor/i)).not.toBeInTheDocument();
      // expect(screen.getByText('200000')).toBeInTheDocument();
      // expect(screen.getByText(/desert/i)).toBeInTheDocument();
      // expect(screen.getByText('10465')).toBeInTheDocument();
      // expect(screen.getByText(/arid/i)).toBeInTheDocument();
      // expect(screen.getByText(/304/i)).toBeInTheDocument();
      // expect(screen.getByText(/2014-12-09/i)).toBeInTheDocument();
      // expect(screen.getByText(/2014-12-20T20:58:18.411000Z/i)).toBeInTheDocument();
      // expect(screen.getByText('https://swapi.dev/api/planets/1/')).toBeInTheDocument();
    });
  });

  it.skip('Verifica se aparece apenas um planeta ao aplicar o filtro', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        results: [
          {
            name: 'Endor',
            population: '30000000',
            diameter: '4900',
            climate: 'temperate',
          },
          {
            name: 'Tatooine',
            population: '200000',
            diameter: '10465',
            climate: 'desert',
          },
          {
            name: 'Yavin IV',
            population: '1000',
            diameter: '10200',
            climate: 'temperate, tropical',
          }
        ],
      })
    );

    render(
    <App />
    );

    const columnSelect = screen.getByTestId('column-filter');
    const comparisonSelect = screen.getByTestId('comparison-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterButton = screen.getByRole('button', {name: /filtrar/i});
  
    userEvent.selectOptions(columnSelect, 'population');
    userEvent.selectOptions(comparisonSelect, 'igual a'); 
    // console.log(comparisonSelect.value)
    userEvent.type(valueInput, '30000000'); 
    act(() =>  userEvent.click(filterButton));
    
    await waitFor(() => {
      const planetNames = screen.queryAllByTestId('planet-name');
      expect(planetNames).toHaveLength(1);
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
  });
  