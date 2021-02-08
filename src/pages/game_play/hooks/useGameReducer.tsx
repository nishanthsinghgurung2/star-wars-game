import { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../../../client/client_types';
import { checkWinner, deal } from '../game_game';
import { IHistory } from '../../../App';
import { camelCaseToSentenceCase } from '../../../styles/helpers';

export type State = {
  hands: Entity[];
  players: number;
  maxPlayers: number;
  history: IHistory[];
};

export const ADD_PLAYER = 'ADD_PLAYER';
export const REMOVE_PLAYER = 'REMOVE_PLAYER';
export const SET_MAX_PLAYERS = 'SET_MAX_PLAYERS';
export const PLAY = 'PLAY';

export type Action<T> =
  | { type: typeof ADD_PLAYER }
  | { type: typeof REMOVE_PLAYER }
  | { type: typeof SET_MAX_PLAYERS; payload: number }
  | { type: typeof PLAY; payload: { deck: T[]; compField: keyof T } };

export const initState: State = {
  hands: [],
  players: 2,
  maxPlayers: 2,
  history: [],
};

function reducer(state: State, action: Action<Entity>): State {
  switch (action.type) {
    case ADD_PLAYER:
      return { ...state, players: Math.min(state.players + 1, state.maxPlayers) };
    case REMOVE_PLAYER:
      return { ...state, players: Math.max(2, state.players - 1) };
    case SET_MAX_PLAYERS:
      return { ...state, maxPlayers: action.payload };
    case PLAY:
      const { deck, compField } = action.payload;
      const hands = deal(deck.slice(), state.players);
      const winner = checkWinner(hands, compField);
      return {
        ...state,
        hands,
        history: [
          ...state.history,
          {
            id: uuidv4(),
            time: new Date().toLocaleTimeString(),
            winner: winner.index,
            winningValue: winner.value,
            compField: camelCaseToSentenceCase(compField),
          },
        ],
      };
    default:
      throw new Error();
  }
}

const useGameReducer = (): [State, React.Dispatch<Action<Entity>>] => {
  return useReducer(reducer, initState);
};

export default useGameReducer;
