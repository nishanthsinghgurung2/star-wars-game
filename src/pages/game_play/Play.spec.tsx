import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GraphQLError } from 'graphql';
import * as React from 'react';
import { SW_QUERIES } from '../../client/client_queries';
import { CARD_SUIT_META } from './game_game/constants';
import { doTimes, mockResponse, renderWithMocks } from '../../test_utils/helpers';
import { ERROR_MESSAGE, LOADING_MESSAGE } from './game_views/Game';
import Play from '.';

describe.each(Object.entries(CARD_SUIT_META).map(([key, { label }]) => [key, label]))(
  'testing data loading statuses for (%s)',
  (key, label) => {
    it('renders loading state for (%s)', () => {
      const mocks = mockResponse(key, 0);
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      expect(screen.getByText(LOADING_MESSAGE)).toBeDefined();
    });

    it('renders success state for (%s)', async () => {
      const mocks = mockResponse(key, 10);
      renderWithMocks(mocks, <Play />);
      userEvent.click(screen.getByText(label), { button: 0 });
      expect(await screen.findByText(/Play Again/i)).toBeDefined();
      expect((await screen.findAllByTestId(/card-test-id/i)).length).toEqual(2);
    });

    it.each([0, 1])(
      'renders game error state for (%i) records returned from sever',
      async (nRecords) => {
        const mocks = mockResponse(key, nRecords);
        renderWithMocks(mocks, <Play />);

        userEvent.click(screen.getByText(label), { button: 0 });
        expect(await screen.findByText(ERROR_MESSAGE)).toBeDefined();
      },
    );

    it('renders network error state for (%s)', async () => {
      const mocks = [
        {
          request: {
            query: SW_QUERIES[key].query,
          },
          error: new Error('An error occurred'),
        },
      ];
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      expect(await screen.findByText(ERROR_MESSAGE)).toBeDefined();
    });

    it('renders graphql error state (%s)', async () => {
      const mocks = [
        {
          request: {
            query: SW_QUERIES[key].query,
          },
          errors: [new GraphQLError('Error!')],
        },
      ];
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      expect(await screen.findByText(ERROR_MESSAGE)).toBeDefined();
    });

    it('renders correct number of cards after adding a player state (%s)', async () => {
      const mocks = mockResponse(key, 10);
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      const add = await screen.findByText(/Add Player/i);
      expect(add).toBeDefined();
      userEvent.click(add, { button: 0 });
      expect((await screen.findAllByTestId(/card-test-id/i)).length).toEqual(3);
    });

    it('does not allow removing players under minimum of 2 (%s)', async () => {
      const mocks = mockResponse(key, 10);
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      const remove = await screen.findByText(/Remove Player/i);
      doTimes(3, () => userEvent.click(remove, { button: 0 }));
      expect((await screen.findAllByTestId(/card-test-id/i)).length).toEqual(2);
    });

    it('does not allow adding players above maximum cards/players (%s)', async () => {
      const mocks = mockResponse(key, 3);
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      const add = await screen.findByText(/Add Player/i);
      expect(add).toBeDefined();
      doTimes(3, () => userEvent.click(add, { button: 0 }));
      expect((await screen.findAllByTestId(/card-test-id/i)).length).toEqual(3);
    });

    it('does not allow adding players above maximum cards/players (%s)', async () => {
      const mocks = mockResponse(key, 3);
      renderWithMocks(mocks, <Play />);

      userEvent.click(screen.getByText(label), { button: 0 });
      const play = await screen.findByText(/Play Again/i);
      expect(play).toBeDefined();
      userEvent.click(play, { button: 0 });
      expect((await screen.findAllByTestId(/card-test-id/i)).length).toEqual(2);
    });
  },
);
