import '@testing-library/jest-dom/extend-expect';
import { render, screen, within } from '@testing-library/react';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CARD_SUIT_META } from '../game_game/constants';
import { entityFactories, entityStaticFactories } from '../../../test_utils/facroties';
import { camelCaseToSentenceCase } from '../../../styles/helpers';
import Card, { IDENTITY_FIELDS } from './game_card';

describe('<Card />', () => {
  describe.each(Object.entries(CARD_SUIT_META))('for type (%s)', (key, val) => {
    it('renders correctly', () => {
      const card = entityStaticFactories[key].build();

      const { container } = render(
        <MemoryRouter initialEntries={[val.path]}>
          <Card card={card} />
        </MemoryRouter>,
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it('should show humanly formated field name and field value correctly', () => {
      const card = entityFactories[key].build();

      render(
        <MemoryRouter initialEntries={[val.path]}>
          <Card card={card} />
        </MemoryRouter>,
      );

      const cardUi = screen.getByTestId(`card-test-id-${card.id}`);

      expect(within(cardUi).queryByText(card.id)).not.toBeInTheDocument();
      expect(within(cardUi).getByText(card.name)).toBeInTheDocument();

      Object.entries(card)
        .filter(([key]) => !IDENTITY_FIELDS.includes(key))
        .map(([key, val]) => {
          expect(within(cardUi).getByText(camelCaseToSentenceCase(key))).toBeInTheDocument();
          expect(within(cardUi).getByText(val as string)).toBeInTheDocument();
        });
    });
  });
});
