import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Container } from '../styles/styles';
import Home from '../pages/game_home/game_index';
import PageNotFound from './PageNotFound';
import { Header, LayoutGrid, RowContainer } from './styles';
import Play from '../pages/game_play';
import History from '../pages/game_history/game_index';

interface LayoutProps {
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ toggleTheme }) => {
  return (
    <LayoutGrid>
      <Header>
        <RowContainer data-testid={'nav'} variant={'primary'}>
          <Container as={NavLink} to='/' exact>
            Home
          </Container>
          <Container as={NavLink} to='/boards'>
            Play
          </Container>
          <Container as={NavLink} to='/history'>
            History
          </Container>
          <Container as={'button'} onClick={() => toggleTheme()}>
            Theme
          </Container>
        </RowContainer>
      </Header>
      <LayoutGrid data-testid={'main'}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/boards' component={Play} />
          <Route path='/history' component={History} />
          <Route component={PageNotFound} />
        </Switch>
      </LayoutGrid>
    </LayoutGrid>
  );
};

export default Layout;
