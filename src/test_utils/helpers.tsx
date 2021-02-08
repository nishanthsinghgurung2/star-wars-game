import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SW_QUERIES } from '../client/client_queries';
import { BASE_SUIT_PATH } from '../pages/game_play/game_game/constants';
import { defaultTheme } from '../styles/theme';
import { peopleFactory, starshipFactory } from './facroties';

export const leftClick = { button: 0 };

export type IDoTimes = (times: number, action: () => void) => void;

export const doTimes: IDoTimes = (times, action) =>
  Array(times)
    .fill(0)
    .map((_) => action());

export const renderWithMocks = <Element,>(mocks, children) =>
  render(
    <MemoryRouter initialEntries={[BASE_SUIT_PATH]}>
      <ThemeProvider theme={defaultTheme}>
        <Route path={BASE_SUIT_PATH}>
          <MockedProvider mocks={mocks} addTypename={true}>
            {children}
          </MockedProvider>
        </Route>
      </ThemeProvider>
    </MemoryRouter>,
  );

export const mockData = (suit: string, count: number) =>
  ({
    starships: {
      allStarships: {
        totalCount: 10,
        starships: starshipFactory.buildList(count),
      },
    },
    people: {
      allPeople: {
        totalCount: 10,
        people: peopleFactory.buildList(count),
      },
    },
  }[suit]);

export const mockResponse = (suit: string, count: number) => [
  {
    request: {
      query: SW_QUERIES[suit].query,
    },
    result: {
      data: mockData(suit, count),
    },
  },
];
