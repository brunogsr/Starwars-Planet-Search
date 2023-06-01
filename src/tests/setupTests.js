import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.get('https://swapi.dev/api/planets', (req, res, ctx) => {
    return res(
      ctx.json({
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
          },
        ],
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
