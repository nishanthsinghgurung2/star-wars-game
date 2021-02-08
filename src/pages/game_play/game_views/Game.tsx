import React, { useCallback, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Entity } from '../../../client/client_types';
import { HistoryContext } from '../../../App';
import { Header } from '../../../shared/styles';
import Card from '../game_components/game_card';
import Controls from '../game_components/game_controls';
import useDeck from '../hooks/useDeck';
import useGameReducer, { PLAY, SET_MAX_PLAYERS } from '../hooks/useGameReducer';
import { Board } from '../mystyles';
import { RouterParams } from '../types';

export const IDENTITY_FIELDS = ['__typename', 'id', 'name'];

export const LOADING_MESSAGE = 'Loading...';
export const DEALING_MESSAGE = 'Dealing...';
export const ERROR_MESSAGE = 'Oooops! Something went wrong...';

const Game: React.FC = () => {
  const { suit } = useParams<RouterParams>();

  const { setHistory } = useContext(HistoryContext);

  const { loading, errors, deck, compField } = useDeck<Entity>(suit);

  const [{ hands, ...state }, dispatch] = useGameReducer();

  const play = useCallback(() => dispatch({ type: PLAY, payload: { deck, compField } }), [
    deck,
    compField,
  ]);

  useEffect(() => {
    if (state.history.length > 0)
      setHistory((history) => [...history, state.history[state.history.length - 1]]);
  }, [state.history]);

  useEffect(() => {
    if (!deck) return;
    dispatch({ type: SET_MAX_PLAYERS, payload: deck.length });
    play();
  }, [deck, compField, state.players]);

  return (
    <>
      <Header>
        <h3>{suit}</h3>
      </Header>
      {loading ? (
        <div>{LOADING_MESSAGE}</div>
      ) : Object.values(errors).some((v) => v != null) ? (
        <div>{ERROR_MESSAGE}</div>
      ) : (
        <Board variant={'primary'}>
          <Controls state={state} dispatch={dispatch} play={play} />
          {hands.map((card) => (
            <Card card={card} key={card.id} />
          ))}
        </Board>
      )}
    </>
  );
};

export default Game;
