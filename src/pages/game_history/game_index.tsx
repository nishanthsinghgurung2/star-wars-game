import React, { useContext } from 'react';
import { HistoryContext } from '../../App';
import { Header } from '../../shared/styles';
import { camelCaseToSentenceCase } from '../../styles/helpers';
import { Table, TableContainer, Td, Th, THead, Tr } from './game_styles';

export const NO_HISTORY_MESSAGE = 'No History Yet...';

const History: React.FC = () => {
  const { history } = useContext(HistoryContext);
  return (
    <>
      <Header>
        <h3>History</h3>
      </Header>
      <TableContainer>
        <Table as={'table'} variant={'primary'}>
          <THead>
            <Tr>
              {history?.length > 0 &&
                Object.keys(history[0])
                  .filter((key) => key !== 'id')
                  .map((key) => (
                    <Th data-testid={`header-${key}`} key={key}>
                      {key && camelCaseToSentenceCase(key)}
                    </Th>
                  ))}
            </Tr>
          </THead>
          <tbody>
            {history?.length > 0 ? (
              history.map((game, i) => (
                <Tr key={game.id}>
                  {Object.entries(game)
                    .filter(([key]) => key !== 'id')
                    .map(([key, val]) => (
                      <Td data-testid={`field-${key}-${i}`} key={key}>
                        {val}
                      </Td>
                    ))}
                </Tr>
              ))
            ) : (
              <tr>
                <Td>{NO_HISTORY_MESSAGE}</Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default History;
