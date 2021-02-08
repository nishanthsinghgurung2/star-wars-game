import styled from 'styled-components';
import { Main } from '../../shared/styles';
import { VariantContainer } from '../../styles/styles';

export const TableContainer = styled(Main)`
  display: grid;
  overflow-y: auto;
`;

export const Table = styled(VariantContainer)`
  width: 75%;
  justify-self: center;
  padding: 1rem;
  font-size: 1.25rem;
  text-align: center;
  border-radius: 4px;
  border-collapse: collapse;
`;

export const THead = styled.thead`
  border-bottom: 1px solid white;
`;

export const Tr = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid white;
  }
`;

export const Th = styled.th`
  padding: 1rem;
`;
export const Td = styled.td`
  padding: 1rem;
`;
