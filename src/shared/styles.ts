import styled from 'styled-components';
import { Container, VariantContainer } from '../styles/styles';

export const LayoutGrid = styled(VariantContainer)`
  background: ${(props) => props.theme.gridBackground};
  color: ${(props) => props.theme.color};
  font-family: 'Noto Sans', sans-serif;

  display: grid;
  height: 100%;
  grid-template-areas:
    'header'
    'main';
  grid-template-rows: 100px minmax(100px, auto);
`;

export const RowContainer = styled(Container)`
  flex-direction: row;
  justify-content: space-around;
`;

export const HighContainer = styled(VariantContainer)`
  height: 100%;
`;

export const Header = styled(Container)`
  grid-area: header;
`;

export const Main = styled(VariantContainer)`
  grid-area: main;
  height: 100%;
`;
