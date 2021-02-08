import { ApolloProvider } from '@apollo/client';
import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { client } from './client/client';
import { GlobalStyles } from './GlobalStyle';
import Layout from './shared/Layout';
import { HighContainer } from './shared/styles';
import { defaultTheme, secondaryTheme } from './styles/theme';
export interface IHistory {
  id: string;
  compField: string;
  winner: number;
  winningValue: number;
  time: string;
}
interface IHistoryContext {
  history: IHistory[];
  setHistory: React.Dispatch<React.SetStateAction<IHistory[]>>;
}

export const HistoryContext = React.createContext<IHistoryContext>({
  history: [],
  setHistory: () => void 0,
});

const App: React.FC = () => {
  const [theme, setTheme] = React.useState(defaultTheme);

  const toggleTheme = () => {
    setTheme((theme) => (theme === defaultTheme ? secondaryTheme : defaultTheme));
  };

  const [history, setHistory] = useState<IHistory[]>([]);
  const value = { history, setHistory };

  return (
    <HighContainer className='App'>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <HistoryContext.Provider value={value}>
            <GlobalStyles />
            <Layout toggleTheme={toggleTheme} />
          </HistoryContext.Provider>
        </ThemeProvider>
      </ApolloProvider>
    </HighContainer>
  );
};

export default App;
