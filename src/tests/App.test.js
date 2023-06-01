import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
describe('Testando StarWars Planets', () => {
  it('Testa se os inputs e selects funcionam corretamente', async () => {
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
      userEvent.type(nameInput, 'tatooine');
      await waitFor(() => {
        expect(screen.getByText(/tatooine/i)).toBeInTheDocument();
        expect(screen.getByText('200000')).toBeInTheDocument();
        expect(screen.getByText(/desert/i)).toBeInTheDocument();
        expect(screen.getByText('10465')).toBeInTheDocument();
        expect(screen.getByText(/arid/i)).toBeInTheDocument();
        expect(screen.getByText(/304/i)).toBeInTheDocument();
        expect(screen.getByText(/2014-12-09/i)).toBeInTheDocument();
        expect(screen.getByText(/2014-12-20T20:58:18.411000Z/i)).toBeInTheDocument();
        expect(screen.getByText('https://swapi.dev/api/planets/1/')).toBeInTheDocument();
    });
      userEvent.selectOptions(columnSelect, 'population');
      userEvent.selectOptions(comparisonSelect, 'maior que');
      userEvent.type(valueInput, '100000');
      userEvent.click(filterButton);
      await waitFor(() => {
        expect(screen.getByText(/naboo/i)).toBeInTheDocument();
        expect(screen.getByText('4500000000')).toBeInTheDocument();
        expect(screen.getByText('12120')).toBeInTheDocument();
      });
  });
});