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

    userEvent.selectOptions(columnSelect, 'rotation_period');
    userEvent.selectOptions(comparisonSelect, 'igual a'); 
    // console.log(comparisonSelect.value)
    userEvent.clear(valueInput)
    userEvent.type(valueInput, '23'); 
    act(() =>  userEvent.click(filterButton));

    await waitFor(() => {
      const planetNames = screen.queryAllByTestId('planet-name');
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
  });
  