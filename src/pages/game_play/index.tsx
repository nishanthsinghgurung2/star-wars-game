import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import ChooseSuit from './game_views/Choose_game_Suit';
import Game from './game_views/Game';

const Play: React.FC = () => {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={`${match.url}/:suit`}>
          <Game />
        </Route>
        <Route path={match.url}>
          <ChooseSuit />
        </Route>
      </Switch>
    </>
  );
};

export default Play;
