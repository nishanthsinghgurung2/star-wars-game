import { MockedProvider } from '@apollo/client/testing';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { SW_QUERIES } from './client/client_queries';
import App from './App';
import { PAGE_NOT_FOUND_MESSAGE } from './shared/PageNotFound';
import { CARD_SUIT_META } from './pages/game_play/game_game/constants';
import { defaultTheme } from './styles/theme';
import { leftClick } from './test_utils/helpers';

let history = createMemoryHistory();

describe('render app level routs as expected', () => {
  beforeEach(() => {
    history = createMemoryHistory();
    const mocks = [
      {
        request: {
          query: SW_QUERIES.starships.query,
        },
        result: {
          data: {},
        },
      },
    ];
    render(
      <Router history={history}>
        <MockedProvider mocks={mocks} addTypename={true}>
          <ThemeProvider theme={defaultTheme}>
            <App />
          </ThemeProvider>
        </MockedProvider>
      </Router>,
    );
  });

  it('should render home page on root route', () => {
    expect(screen.getAllByText('STAR WARS').length).toEqual(2);
  });

  it.each(Object.values(CARD_SUIT_META).map(({ label, path }) => [label, path]))(
    'should render board option for (%i) on navigation to Play',
    (label) => {
      userEvent.click(screen.getByText(/Play/i), leftClick);
      expect(within(screen.getByTestId('main')).getByText(label)).toBeDefined();
    },
  );

  it('should render History page on history route', () => {
    const histNav = within(screen.getByTestId('nav')).getByText(/History/i);
    userEvent.click(histNav, leftClick);
    expect(within(screen.getByTestId('main')).getAllByText(/History/i).length).toEqual(2);
  });

  it('loads 404 page on a bad route', () => {
    history.push('/some/bad/route');
    expect(screen.getByText(PAGE_NOT_FOUND_MESSAGE)).toBeDefined();
  });
});
