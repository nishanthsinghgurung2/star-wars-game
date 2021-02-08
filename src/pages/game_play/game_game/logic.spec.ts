import '../game_components/node_modules/@testing-library/jest-dom/extend-expect';
import { checkWinner, deal } from '.';
import { starshipFactory } from '../../../test_utils/facroties';

describe('.deal', () => {
  it('should fail if number of players less than 2', () => {
    const cards = starshipFactory.buildList(5);
    const players = 1;
    expect(() => deal(cards, players)).toThrowError();
  });
  it('should fail if number of players greater than number of cards', () => {
    const cards = starshipFactory.buildList(5);
    const players = 6;
    expect(() => deal(cards, players)).toThrowError();
  });
  it('should return random cards for a valid number of players', () => {
    const cards = starshipFactory.buildList(5);
    const players = 5;
    expect(deal(cards, players).length).toEqual(players);
  });
});

type TestType = { id: string; field: unknown };

const buildMockCardList = (n: number): TestType[] =>
  Array(n)
    .fill(0)
    .map((_, i) => ({ id: `id${i}`, field: i }));

describe('.checkWinner', () => {
  it('should throw an error if number of hands is less then 2', () => {
    const players = 1;

    const cards = buildMockCardList(players);

    expect(() => checkWinner<TestType>(cards, 'field')).toThrow();
  });
  it('should return the highest value and its index', () => {
    const players = 5;

    const cards = buildMockCardList(players);

    expect(checkWinner<TestType>(cards, 'field')).toEqual({ index: 4, value: 4 });
  });
  it.each([null, undefined, '', 'unknown'])(
    'should handle bad values (%s) for compField',
    (badValue) => {
      const players = 5;

      const cards = buildMockCardList(players);
      cards[0].field = badValue;

      expect(checkWinner<TestType>(cards, 'field')).toEqual({ index: 4, value: 4 });
    },
  );
});
