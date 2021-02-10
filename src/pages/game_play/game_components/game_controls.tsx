import React, { useEffect, useState } from 'react';
import { Entity } from '../../../client/client_types';
import { IHistory } from '../../../App';
import { RowContainer } from '../../../shared/styles';
import { Container } from '../../../styles/styles';
import { Action, ADD_PLAYER, REMOVE_PLAYER, State } from '../hooks/useGameReducer';
import { ControlsContainer, Label, Span } from '../mystyles';

interface ControlsProps {
  play: () => void;
  state: Partial<State>;
  dispatch: React.Dispatch<Action<Entity>>;
}

const Controls: React.FC<ControlsProps> = ({
  state: { players, maxPlayers, history },
  dispatch,
  play,
}) => {
  const [currGame, setCurrGame] = useState<IHistory>();

  useEffect(() => {
    if (history.length === 0) return;
    setCurrGame(history[history.length - 1]);
  }, [history]);
  return (
    <Container>
      <ControlsContainer>
        {currGame ? `Winner: ${currGame.winner} | Value: ${currGame.winningValue}` : ''}
      </ControlsContainer>
      <ControlsContainer variant={'success'} as={'button'} onClick={() => play()}>
        Play Again
      </ControlsContainer>
      <ControlsContainer>
        <Label>Playing:</Label>
        <Span>
          {players} / {maxPlayers}
        </Span>
      </ControlsContainer>
      <RowContainer>
        <ControlsContainer
          variant={'success'}
          as={'button'}
          onClick={() => dispatch({ type: ADD_PLAYER })}
        >
          Add Player
        </ControlsContainer>
        <ControlsContainer
          variant={'danger'}
          as={'button'}
          onClick={() => dispatch({ type: REMOVE_PLAYER })}
        >
          Remove Player
        </ControlsContainer>
      </RowContainer>
    </Container>
  );
};

export default Controls;
