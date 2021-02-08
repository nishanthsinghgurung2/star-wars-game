import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Header, Main } from '../../../shared/styles';
import { CARD_SUIT_META } from '../game_game/constants';
import { SuitButton } from '../mystyles';

export const ChooseSuitGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-rows: auto;
  height: inherit;
  width: inherit;
  padding: 1rem;
`;

const ChooseSuit: React.FC = () => {
  return (
    <>
      <Header>
        <h3>Choose Cards</h3>
      </Header>
      <Main>
        <ChooseSuitGrid>
          {Object.entries(CARD_SUIT_META).map(([key, { path, label, img }]) => (
            <SuitButton url={img} as={Link} variant={'light'} key={key} to={path}>
              {label}
            </SuitButton>
          ))}
        </ChooseSuitGrid>
      </Main>
    </>
  );
};

export default ChooseSuit;
