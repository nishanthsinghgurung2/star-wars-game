import styled from 'styled-components';
import { IPalette, Theme } from './theme';

export interface IVariant {
  variant?: string;
  theme: Theme;
}

export const variantPalette = (props: IVariant): IPalette =>
  props.theme?.palette?.[props.variant] || props.theme?.palette?.dark;

export const VariantContainer = styled.div<IVariant>`
  background: ${(props) => variantPalette(props)?.main};
  color: ${(props) => variantPalette(props)?.contrastText};
`;

export const Container = styled(VariantContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem, rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  transition: all 500ms;
  overflow: hidden;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &.active,
  &:hover {
    color: ${(props) => props.theme?.palette?.primary?.main};
  }
`;

export const Navbar = styled.div``;
