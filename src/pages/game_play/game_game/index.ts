import { Entity } from '../../../client/client_types';

export const deal = (cards: Entity[], players: number): Entity[] => {
  if (players < 2 || players > cards.length)
    throw RangeError('Invalid number of players for deck size. Must be 2 < players < cards.length');
  return Array(players)
    .fill(0)
    .flatMap(() => {
      const ranIndex = Math.floor(Math.random() * (cards.length - 1));
      return cards.splice(ranIndex, 1);
    });
};

export const checkWinner = <T>(
  hands: T[],
  compField: keyof T,
): { index: number; value: number } => {
  if (hands.length < 2) throw RangeError('hands argument is not valid. Must be > 2');
  const values = hands.map((card) => parseFloat(card[compField]?.toString()) || 0);
  const value = Math.max(...values);
  const index = values.findIndex((cval) => cval === value);
  return { index, value };
};
