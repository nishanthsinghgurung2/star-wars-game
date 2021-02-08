import styled from 'styled-components';
import { CARD_SUIT_META } from './game_game/constants';
import { Container } from '../../styles/styles';

export const SuitButton = styled(Container)<{ url: string }>`
  background-image: url(${(props) => props.url});
  font-size: 6rem;
`;

export const Board = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
  grid-auto-rows: 50%;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
`;

export const CardContainer = styled(Container)`
  border-radius: 10px;
`;

export const CardHeader = styled(Container)<{ suit: string }>`
  padding: 1rem;
  background-image: url(${(props) => randomSuitImage(props.suit)});
`;

const randomSuitImage = (suit) => {
  if (!suit) return;
  const imgs = CARD_SUIT_META[suit].cardImgs;
  const randIndex = Math.round(Math.random() * (imgs.length - 1));
  return imgs[randIndex];
};

export const CardBody = styled(Container)`
  padding: 1rem;
  font-size: 1rem;
`;
export const CardBodyRow = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.75rem;
  font-size: 1rem;
`;

export const Label = styled.label``;

export const Span = styled.span`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 0.5rem;
  display: inline-block;
`;

export const ControlsContainer = styled(Container)`
  font-size: 1.5rem;
  column-gap: 5px;
`;
