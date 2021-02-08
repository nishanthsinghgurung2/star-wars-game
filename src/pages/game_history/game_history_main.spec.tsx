import '../game_play/game_components/node_modules/@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import * as Factory from 'factory.ts';
import faker from 'faker';
import * as React from 'react';
import { HistoryContext } from '../../App';
import { mockResponse, renderWithMocks } from '../../test_utils/helpers';
import { IHistory } from '../../App';
import History, { NO_HISTORY_MESSAGE } from './game_index';

export const historyFactory = Factory.Sync.makeFactory<IHistory>({
  id: Factory.each(() => faker.random.uuid()),
  winner: Factory.each(() => faker.random.number()),
  winningValue: Factory.each(() => faker.random.number()),
  time: Factory.each(() => new Date().toLocaleTimeString()),
  compField: Factory.each(() => faker.random.word()),
});

const customRender = (children, { providerProps, ...renderOptions }) => {
  return render(
    <HistoryContext.Provider {...providerProps}>{children}</HistoryContext.Provider>,
    renderOptions,
  );
};

it('History shows default value', () => {
  render(<History />);

  expect(screen.getByText(NO_HISTORY_MESSAGE)).toBeInTheDocument();
});

test('shows value from provider as expected', () => {
  const history = historyFactory.buildList(1);
  const providerProps = {
    value: {
      history: history,
      setHistory: () => void 0,
    },
  };
  customRender(<History />, { providerProps });

  expect(screen.getByTestId(/header-time/)).toHaveTextContent('Time');
  expect(screen.getByTestId(/header-winner/)).toHaveTextContent('Winner');
  expect(screen.getByTestId(/header-winningValue/)).toHaveTextContent('Winning Value');
  expect(screen.getByTestId(/header-compField/)).toHaveTextContent('Comp Field');

  expect(screen.getByTestId(/field-time-0/)).toHaveTextContent(history[0].time);
  expect(screen.getByTestId(/field-winner-0/)).toHaveTextContent(history[0].winner.toString());
  expect(screen.getByTestId(/field-winningValue-0/)).toHaveTextContent(
    history[0].winningValue.toString(),
  );
  expect(screen.getByTestId(/field-compField-0/)).toHaveTextContent(history[0].compField);
});

test('shows value from provider as expected', () => {
  const history = historyFactory.buildList(10, { compField: 'someCamelCaseName' });
  const providerProps = {
    value: {
      history: history,
      setHistory: () => void 0,
    },
  };
  customRender(<History />, { providerProps });

  expect(screen.getByTestId(/header-time/)).toHaveTextContent('Time');
  expect(screen.getByTestId(/header-winner/)).toHaveTextContent('Winner');
  expect(screen.getByTestId(/header-winningValue/)).toHaveTextContent('Winning Value');
  expect(screen.getByTestId(/header-compField/)).toHaveTextContent('Comp Field');

  expect(screen.getAllByTestId(/field-time-/).length).toEqual(10);
  expect(screen.getAllByTestId(/field-winner-/).length).toEqual(10);
  expect(screen.getAllByTestId(/field-winningValue-/).length).toEqual(10);
  expect(screen.getAllByTestId(/field-compField-/).length).toEqual(10);
});

it('renders loading state for (%s)', async () => {
  const mocks = mockResponse('starships', 0);
  renderWithMocks(mocks, <History />);

  // userEvent.click(screen.getByText(label), { button: 0 });
  // expect(screen.getByText(LOADING_MESSAGE)).toBeInTheDocument();
});
