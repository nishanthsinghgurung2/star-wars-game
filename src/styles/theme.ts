export interface IPalette {
  main: string;
  contrastText: string;
}

export interface Theme {
  borderRadius: string;
  color: string;
  background: string;
  palette: {
    dark: IPalette;
    light: IPalette;
    primary: IPalette;
    secondary: IPalette;
    success: IPalette;
    info: IPalette;
    warning: IPalette;
    danger: IPalette;
  };
}
// https://loading.io/color/feature/
export const defaultTheme: Theme = {
  borderRadius: '4px',
  color: '#FFF',
  background: '#0E0C0F',
  palette: {
    dark: {
      main: '#0E0C0F',
      contrastText: '#ffffff',
    },
    light: {
      main: '#6a737b',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#00a4e4',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#8a7967',
      contrastText: '#ffffff',
    },
    success: {
      main: '#c1d82f',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ffdd00',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#fbb034',
      contrastText: '#ffffff',
    },
    danger: {
      main: '#ff0000',
      contrastText: '#ffffff',
    },
  },
};

export const secondaryTheme: Theme = {
  borderRadius: '4px',
  color: '#FFF',
  background: '#0E0C0F',
  palette: {
    dark: {
      main: '#52565e',
      contrastText: '#ffffff',
    },
    light: {
      main: '#caccd1',
      contrastText: '#ffffff',
    },
    primary: {
      main: '#0a8ea0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#30c39e',
      contrastText: '#ffffff',
    },
    success: {
      main: '#30c39e',
      contrastText: '#ffffff',
    },
    info: {
      main: '#ffc845',
      contrastText: '#ffffff',
    },
    warning: {
      main: '#f48924',
      contrastText: '#ffffff',
    },
    danger: {
      main: '#f85a40',
      contrastText: '#ffffff',
    },
  },
};
